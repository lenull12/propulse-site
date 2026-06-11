interface PageSpeedRequest {
  url: string
  strategy: "mobile" | "desktop"
}

interface PageSpeedResponse {
  scores: {
    performance: number | null
    accessibility: number | null
    seo: number | null
    bestPractices: number | null
  }
  audits: Record<string, { title: string; description: string; score: number | null; numericValue: number | null; displayValue: string; category: string }>
  recommendations: Array<{ id: string; title: string; description: string; score: number }>
  loadingExperience: {
    overallCategory: string
    metrics: Record<string, { percentile: number; distributions: number[]; category: string }>
  } | null
}

const AUDIT_LABELS: Record<string, { title: string; category: string }> = {
  "first-contentful-paint": { title: "First Contentful Paint (FCP)", category: "performance" },
  "largest-contentful-paint": { title: "Largest Contentful Paint (LCP)", category: "performance" },
  "total-blocking-time": { title: "Total Blocking Time (TBT)", category: "performance" },
  "cumulative-layout-shift": { title: "Cumulative Layout Shift (CLS)", category: "performance" },
  "speed-index": { title: "Speed Index", category: "performance" },
  "interactive": { title: "Time to Interactive (TTI)", category: "performance" },
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  const { request, env } = context
  const key = env.PAGESPEED_API_KEY
  if (!key) {
    return new Response(JSON.stringify({ error: "Clé API non configurée" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  let body: PageSpeedRequest
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "JSON invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { url, strategy } = body
  if (!url || !/^https?:\/\/.+/.test(url)) {
    return new Response(JSON.stringify({ error: "URL invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${key}&strategy=${strategy || "mobile"}`

  let googleRes: Response
  try {
    googleRes = await fetch(apiUrl, { signal: AbortSignal.timeout(30_000) })
  } catch {
    return new Response(JSON.stringify({ error: "Timeout — le service Google n'a pas répondu dans les 30s" }), {
      status: 504,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!googleRes.ok) {
    const errText = await googleRes.text()
    const isForbidden = googleRes.status === 403
    return new Response(JSON.stringify({
      error: isForbidden
        ? "Erreur API Google: 403 — voir les détails ci-dessous"
        : `Erreur API Google: ${googleRes.status}`,
      details: isForbidden
        ? { body: errText.slice(0, 2000), requestUrl: apiUrl.replace(key, "***") }
        : errText,
    }), {
      status: isForbidden ? 200 : googleRes.status,
      headers: { "Content-Type": "application/json" },
    })
  }

  const data = await googleRes.json()
  const lr = data.lighthouseResult
  if (!lr) {
    return new Response(JSON.stringify({ error: "Réponse inattendue de l'API" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    })
  }

  const result: PageSpeedResponse = {
    scores: {
      performance: lr.categories?.performance?.score != null ? Math.round(lr.categories.performance.score * 100) : null,
      accessibility: lr.categories?.accessibility?.score != null ? Math.round(lr.categories.accessibility.score * 100) : null,
      seo: lr.categories?.seo?.score != null ? Math.round(lr.categories.seo.score * 100) : null,
      bestPractices: lr.categories?.["best-practices"]?.score != null ? Math.round(lr.categories["best-practices"].score * 100) : null,
    },
    audits: {},
    recommendations: [],
    loadingExperience: data.loadingExperience || null,
  }

  const importantAudits = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
    "speed-index",
    "interactive",
  ]

  for (const id of importantAudits) {
    const audit = lr.audits?.[id]
    if (audit) {
      const label = AUDIT_LABELS[id]
      result.audits[id] = {
        title: label?.title || id,
        description: audit.description || "",
        score: audit.score != null ? Math.round(audit.score * 100) : null,
        numericValue: audit.numericValue ?? null,
        displayValue: audit.displayValue || "",
        category: label?.category || "performance",
      }
    }
  }

  const recommendations: Array<{ id: string; title: string; description: string; score: number }> = []
  if (lr.audits) {
    for (const [id, audit] of Object.entries(lr.audits) as [string, any][]) {
      if (audit.score != null && audit.score < 0.9 && audit.title && !id.startsWith("_") && audit.details?.type !== "filmstrip") {
        recommendations.push({
          id,
          title: audit.title,
          description: audit.description || "",
          score: Math.round(audit.score * 100),
        })
      }
    }
  }
  recommendations.sort((a, b) => a.score - b.score)
  result.recommendations = recommendations.slice(0, 20)

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
