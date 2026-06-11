interface MobileFriendlyRequest {
  url: string
}

interface MobileFriendlyResponse {
  mobileFriendliness: "MOBILE_FRIENDLY" | "NOT_MOBILE_FRIENDLY" | "UNKNOWN"
  issues: Array<{ message: string; severity: string }>
  screenshot: string | null
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

  let body: MobileFriendlyRequest
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "JSON invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { url } = body
  if (!url || !/^https?:\/\/.+/.test(url)) {
    return new Response(JSON.stringify({ error: "URL invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  let googleRes: Response
  try {
    googleRes = await fetch("https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, key }),
      signal: AbortSignal.timeout(30_000),
    })
  } catch {
    return new Response(JSON.stringify({ error: "Timeout — l'API Google n'a pas répondu dans les 30s" }), {
      status: 504,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!googleRes.ok) {
    const errText = await googleRes.text()
    return new Response(JSON.stringify({ error: `Erreur API Google: ${googleRes.status}`, details: errText }), {
      status: googleRes.status,
      headers: { "Content-Type": "application/json" },
    })
  }

  const data = await googleRes.json()

  const issues = (data.mobileFriendlyIssues || []).map((i: { rule: string; severity: string }) => ({
    message: i.rule || "Problème non spécifié",
    severity: i.severity || "WARNING",
  }))

  const result: MobileFriendlyResponse = {
    mobileFriendliness: data.testStatus?.status === "COMPLETE"
      ? (data.mobileFriendliness || "UNKNOWN")
      : "UNKNOWN",
    issues,
    screenshot: data.screenshot?.data || null,
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
