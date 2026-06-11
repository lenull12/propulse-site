"use client"

import { useState } from "react"

type SEOResult = {
  title: string | null
  titleLength: number
  metaDescription: string | null
  metaDescLength: number
  h1s: string[]
  h1Count: number
  totalImages: number
  imagesWithoutAlt: number
  imagesWithoutAltSrcs: string[]
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

function CheckIcon() {
  return <span className="text-green-500 shrink-0">✓</span>
}

function CrossIcon() {
  return <span className="text-red-500 shrink-0">✗</span>
}

function WarningIcon() {
  return <span className="text-yellow-500 shrink-0">⚠</span>
}

function StatusIcon({ ok }: { ok: boolean }) {
  return ok ? <CheckIcon /> : <CrossIcon />
}

export function SEOChecker() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<SEOResult | null>(null)

  const handleAnalyze = async () => {
    if (!url.trim()) return
    if (!/^https?:\/\/.+/.test(url.trim())) {
      setError("L'URL doit commencer par http:// ou https://")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch("/api/seo-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || `Erreur ${res.status}`)
      }
      setResult(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'analyse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAnalyze()}
          placeholder="https://www.exemple.fr"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
        />
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !url.trim()}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            loading || !url.trim()
              ? "bg-white/10 text-white/30 cursor-not-allowed"
              : "bg-accent text-black hover:shadow-[0_0_25px_rgba(200,240,0,0.3)]"
          }`}
        >
          {loading ? "Analyse en cours..." : "Analyser"}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${result.title && result.titleLength >= 30 && result.titleLength <= 60 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
              <p className="text-xs text-white/40 mb-1">Title</p>
              <p className="text-sm text-foreground font-medium truncate">{result.title || "Manquant"}</p>
              <p className="text-xs text-white/40 mt-1">{result.titleLength} caractères{(result.title && (result.titleLength < 30 || result.titleLength > 60)) ? " (idéal: 30-60)" : ""}</p>
            </div>
            <div className={`p-4 rounded-xl border ${result.metaDescription && result.metaDescLength >= 120 && result.metaDescLength <= 160 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
              <p className="text-xs text-white/40 mb-1">Meta description</p>
              <p className="text-sm text-foreground font-medium truncate">{result.metaDescription || "Manquante"}</p>
              <p className="text-xs text-white/40 mt-1">{result.metaDescLength} caractères{(result.metaDescription && (result.metaDescLength < 120 || result.metaDescLength > 160)) ? " (idéal: 120-160)" : ""}</p>
            </div>
            <div className={`p-4 rounded-xl border ${result.h1Count === 1 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
              <p className="text-xs text-white/40 mb-1">Balise H1</p>
              <p className="text-sm text-foreground font-medium">{result.h1Count > 0 ? result.h1s[0] || "Vide" : "Manquante"}</p>
              <p className="text-xs text-white/40 mt-1">{result.h1Count === 0 ? "Aucune H1" : result.h1Count === 1 ? "1 H1 ✓" : `${result.h1Count} H1 détectées (1 recommandée)`}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-xs text-white/40 mb-3">Balises obligatoires</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={result.hasViewport} />
                  <span className="text-white/70">Viewport (responsive)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={!!result.langAttr} />
                  <span className="text-white/70">Attribut lang sur &lt;html&gt;</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={result.hasCanonical} />
                  <span className="text-white/70">URL canonique</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={result.hasRobots} />
                  <span className="text-white/70">Balise robots</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-xs text-white/40 mb-3">Open Graph (partage réseaux)</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={result.hasOGTitle} />
                  <span className="text-white/70">og:title</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={result.hasOGDescription} />
                  <span className="text-white/70">og:description</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <StatusIcon ok={result.hasOGImage} />
                  <span className="text-white/70">og:image</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-sm mb-1">
              {result.imagesWithoutAlt === 0 ? <CheckIcon /> : <WarningIcon />}
              <span className="text-white/70">
                {result.totalImages > 0
                  ? `${result.totalImages - result.imagesWithoutAlt}/${result.totalImages} images avec attribut alt`
                  : "Aucune image détectée"}
              </span>
            </div>
            {result.imagesWithoutAltSrcs.length > 0 && (
              <div className="mt-2 space-y-1">
                {result.imagesWithoutAltSrcs.slice(0, 5).map((src, i) => (
                  <p key={i} className="text-xs text-white/40 truncate pl-5">
                    {src}
                  </p>
                ))}
                {result.imagesWithoutAltSrcs.length > 5 && (
                  <p className="text-xs text-white/25 pl-5">
                    et {result.imagesWithoutAltSrcs.length - 5} autre{result.imagesWithoutAltSrcs.length - 5 > 1 ? "s" : ""}...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
