import { NextRequest, NextResponse } from "next/server"

interface MobileFriendlyResponse {
  mobileFriendliness: "MOBILE_FRIENDLY" | "NOT_MOBILE_FRIENDLY" | "UNKNOWN"
  issues: Array<{ message: string; severity: string }>
  screenshot: string | null
}

export async function POST(request: NextRequest) {
  const key = process.env.PAGESPEED_API_KEY
  if (!key) {
    return NextResponse.json({ error: "Clé API non configurée" }, { status: 500 })
  }

  let body: { url: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 })
  }

  const { url } = body
  if (!url || !/^https?:\/\/.+/.test(url)) {
    return NextResponse.json({ error: "URL invalide" }, { status: 400 })
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
    return NextResponse.json({ error: "Timeout — l'API Google n'a pas répondu dans les 30s" }, { status: 504 })
  }

  if (!googleRes.ok) {
    const errText = await googleRes.text()
    return NextResponse.json({ error: `Erreur API Google: ${googleRes.status}`, details: errText }, { status: googleRes.status })
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

  return NextResponse.json(result)
}
