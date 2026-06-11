"use client"

import { useState } from "react"

type MobileResult = {
  mobileFriendliness: "MOBILE_FRIENDLY" | "NOT_MOBILE_FRIENDLY" | "UNKNOWN"
  issues: Array<{ message: string; severity: string }>
  screenshot: string | null
}

const ISSUE_LABELS: Record<string, string> = {
  "UseLegibleFontSizes": "Tailles de police trop petites",
  "ConfigureViewport": "Viewport non configuré",
  "SizeContentToViewport": "Contenu plus large que l'écran",
  "SizeTapTargetsAppropriately": "Éléments tactiles trop proches",
  "AvoidPlugins": "Utilisation de plugins incompatibles",
  "FastClickPlugin": "Plugin FastClick manquant",
}

export function MobileFriendlyTool() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<MobileResult | null>(null)

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
      const res = await fetch("/api/mobile-friendly", {
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

  const isFriendly = result?.mobileFriendliness === "MOBILE_FRIENDLY"

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
          {loading ? "Analyse en cours..." : "Tester"}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className={`p-6 rounded-xl border text-center ${
            isFriendly
              ? "border-green-500/20 bg-green-500/5"
              : "border-red-500/20 bg-red-500/5"
          }`}>
            <div className={`text-4xl mb-3 ${isFriendly ? "" : ""}`}>
              {isFriendly ? "📱" : "⚠️"}
            </div>
            <p className="text-lg font-bold text-foreground">
              {isFriendly ? "Site compatible mobile" : "Problèmes détectés"}
            </p>
            <p className="text-sm text-white/50 mt-1">
              {isFriendly
                ? "Votre site s'affiche correctement sur les appareils mobiles."
                : result.mobileFriendliness === "NOT_MOBILE_FRIENDLY"
                  ? "Des problèmes d'affichage mobile ont été détectés."
                  : "Le test n'a pas pu aboutir. Réessayez."}
            </p>
          </div>

          {result.issues.length > 0 && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">
                {result.issues.length} problème{result.issues.length > 1 ? "s" : ""} à corriger
              </p>
              <div className="space-y-2">
                {result.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className={issue.severity === "ERROR" ? "text-red-500" : "text-yellow-500"}>
                      {issue.severity === "ERROR" ? "●" : "○"}
                    </span>
                    <span className="text-white/70">
                      {ISSUE_LABELS[issue.message] || issue.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.screenshot && (
            <div>
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Aperçu mobile</p>
              <img
                src={`data:image/png;base64,${result.screenshot}`}
                alt="Aperçu mobile du site"
                className="w-full max-w-[360px] mx-auto rounded-xl border border-white/10"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
