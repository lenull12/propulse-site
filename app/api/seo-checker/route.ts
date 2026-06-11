import { NextRequest, NextResponse } from "next/server"

interface SEOCheckerResponse {
  title: string | null
  titleLength: number
  metaDescription: string | null
  metaDescLength: number
  h1s: string[]
  h1Count: number
  totalImages: number
  imagesWithoutAlt: number
  hasRobots: boolean
  robotsContent: string | null
  hasCanonical: boolean
  canonicalHref: string | null
  hasOGTitle: boolean
  hasOGDescription: boolean
  hasOGImage: boolean
  hasViewport: boolean
  langAttr: string | null
}

export async function POST(request: NextRequest) {
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

  let html: string
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) })
    if (!res.ok) {
      return NextResponse.json({ error: `Erreur HTTP ${res.status} — le site n'a pas répondu correctement` }, { status: 502 })
    }
    html = await res.text()
  } catch {
    return NextResponse.json({ error: "Impossible de récupérer le contenu de l'URL" }, { status: 504 })
  }

  const extract = (pattern: RegExp, group = 1): string | null => {
    const match = html.match(pattern)
    return match ? (match[group] || "").trim() || null : null
  }

  const title = extract(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const metaDescription = extract(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || extract(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)
  const robotsContent = extract(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i) || extract(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i)
  const canonicalHref = extract(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || extract(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i)
  const langAttr = extract(/<html[^>]+lang=["']([^"']*)["']/i)

  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)
  const h1s = h1Matches
    ? h1Matches.map(h => h.replace(/<[^>]*>/g, "").trim()).filter(Boolean)
    : []

  const imgMatches = html.match(/<img[^>]*>/gi) || []
  let totalImages = 0
  let imagesWithoutAlt = 0
  for (const img of imgMatches) {
    if (/src=["'][^"']*["']/i.test(img)) {
      totalImages++
      if (!/alt=["'][^"']*["']/i.test(img)) {
        imagesWithoutAlt++
      }
    }
  }

  const result: SEOCheckerResponse = {
    title,
    titleLength: title ? title.length : 0,
    metaDescription,
    metaDescLength: metaDescription ? metaDescription.length : 0,
    h1s,
    h1Count: h1s.length,
    totalImages,
    imagesWithoutAlt,
    hasRobots: robotsContent !== null,
    robotsContent,
    hasCanonical: canonicalHref !== null,
    canonicalHref,
    hasOGTitle: /<meta[^>]+property=["']og:title["']/i.test(html),
    hasOGDescription: /<meta[^>]+property=["']og:description["']/i.test(html),
    hasOGImage: /<meta[^>]+property=["']og:image["']/i.test(html),
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    langAttr,
  }

  return NextResponse.json(result)
}
