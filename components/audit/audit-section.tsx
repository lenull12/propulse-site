"use client"

import { useState, useCallback } from "react"
import { getAuditTranslation } from "@/lib/audit-descriptions"

type AuditResults = {
  scores: {
    performance: number | null
    accessibility: number | null
    seo: number | null
    bestPractices: number | null
  }
  audits: Record<string, {
    title: string
    description: string
    score: number | null
    numericValue: number | null
    displayValue: string
    category: string
  }>
  recommendations: Array<{
    id: string
    title: string
    description: string
    score: number
  }>
  loadingExperience: {
    overallCategory: string
    metrics: Record<string, {
      percentile: number
      category: string
    }>
  } | null
}

type ResultsMap = {
  mobile: AuditResults | null
  desktop: AuditResults | null
}

type Strategy = "mobile" | "desktop"

function ScoreRing({ value, label, size = 100 }: { value: number | null; label: string; size?: number }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = value != null ? circumference * (1 - value / 100) : circumference
  const color = value == null ? "rgba(255,255,255,0.1)"
    : value >= 90 ? "#22c55e"
    : value >= 50 ? "#eab308"
    : "#ef4444"

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />
        {value != null && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-bold" style={{ color }}>{value != null ? value : "—"}</span>
      </div>
      <span className="text-xs text-white/50 font-medium text-center leading-tight max-w-[90px]">{label}</span>
    </div>
  )
}

function fetchResults(url: string, strategy: Strategy): Promise<AuditResults> {
  return fetch("/api/pagespeed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, strategy }),
  }).then(async res => {
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.details || err.error || `Erreur ${res.status}`)
    }
    return res.json()
  })
}

function MobileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function DesktopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

export function AuditSection({ standalone }: { standalone?: boolean }) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ResultsMap>({ mobile: null, desktop: null })
  const [activeStrategy, setActiveStrategy] = useState<Strategy>("mobile")
  const [error, setError] = useState("")
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null)

  const activeResults = results[activeStrategy]

  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) return
    if (!/^https?:\/\/.+/.test(url.trim())) {
      setError("L'URL doit commencer par http:// ou https://")
      return
    }

    setLoading(true)
    setError("")
    setResults({ mobile: null, desktop: null })

    try {
      const [mobileData, desktopData] = await Promise.all([
        fetchResults(url.trim(), "mobile"),
        fetchResults(url.trim(), "desktop"),
      ])
      setResults({ mobile: mobileData, desktop: desktopData })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'analyse")
    } finally {
      setLoading(false)
    }
  }, [url])

  const current = activeResults
  const otherStrategy = activeStrategy === "mobile" ? "desktop" : "mobile"
  const otherReady = results[otherStrategy] !== null

  return (
    <section className={standalone ? "" : "mt-32 pt-16 border-t border-white/5"}>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase mb-4">
          Audit gratuit
        </div>
        <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Analysez la performance de votre site
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base leading-relaxed text-white/50">
          Entrez l&apos;URL de votre site pour un diagnostic complet basé sur Google PageSpeed Insights.
          Découvrez ce qui freine votre classement et comment l&apos;améliorer.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-surface rounded-2xl border border-white/10 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
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
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyse en cours...
                </span>
              ) : (
                "Analyser"
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs text-white/40">Stratégie :</span>
            <div className="flex bg-white/5 rounded-lg p-0.5">
              {(["mobile", "desktop"] as Strategy[]).map(s => {
                const active = s === activeStrategy
                const hasData = results[s] !== null
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={!hasData}
                    onClick={() => {
                      setActiveStrategy(s)
                      setExpandedRecommendation(null)
                    }}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                      active
                        ? "bg-accent text-black"
                        : hasData
                          ? "text-white/50 hover:text-white/80 cursor-pointer"
                          : "text-white/20 cursor-not-allowed"
                    }`}
                  >
                    {s === "mobile" ? <MobileIcon /> : <DesktopIcon />}
                    {s === "mobile" ? "Mobile" : "Desktop"}
                    {hasData && !active && (
                      <span className="ml-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                    )}
                  </button>
                )
              })}
            </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/25">
            ⏱ L&apos;analyse peut prendre jusqu&apos;à 30 secondes — Google analyse votre site en temps réel.
          </p>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 space-y-6 animate-pulse">
            <div className="flex justify-center gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-[100px] h-[100px] rounded-full bg-white/5" />
                  <div className="w-20 h-3 rounded bg-white/5" />
                </div>
              ))}
            </div>
            <div className="h-20 rounded-xl bg-white/5" />
          </div>
        )}

        {!loading && current && (
          <>
            <div className="mt-10">
              <h3 className="text-lg font-bold text-foreground mb-6 text-center">Scores généraux</h3>
              <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
                <ScoreRing value={current.scores.performance} label="Performance" />
                <ScoreRing value={current.scores.accessibility} label="Accessibilité" />
                <ScoreRing value={current.scores.seo} label="SEO" />
                <ScoreRing value={current.scores.bestPractices} label="Bonnes pratiques" />
              </div>
            </div>

            {current.loadingExperience?.overallCategory && (
              <div className="mt-10 p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-foreground mb-4">Core Web Vitals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(current.loadingExperience.metrics).map(([key, metric]) => {
                    const labelMap: Record<string, string> = {
                      FIRST_CONTENTFUL_PAINT_MS: "FCP",
                      LARGEST_CONTENTFUL_PAINT_MS: "LCP",
                      CUMULATIVE_LAYOUT_SHIFT_SCORE: "CLS",
                      INTERACTION_TO_NEXT_PAINT: "INP",
                    }
                    const color = metric.category === "FAST" ? "#22c55e"
                      : metric.category === "AVERAGE" ? "#eab308"
                      : "#ef4444"
                    return (
                      <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                        <div>
                          <div className="text-sm font-medium text-foreground">{labelMap[key] || key}</div>
                          <div className="text-xs text-white/40">
                            {metric.percentile} ms
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {current.recommendations.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-foreground mb-4">Recommandations</h3>
                <p className="text-sm text-white/40 mb-6">
                  {current.recommendations.length} opportunités d&apos;amélioration détectées.
                  Cliquez sur une recommandation pour plus de détails.
                </p>
                <div className="space-y-2">
                  {current.recommendations.map(rec => {
                    const translation = getAuditTranslation(rec.id)
                    return (
                      <div key={rec.id} className="rounded-xl border border-white/10 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedRecommendation(expandedRecommendation === rec.id ? null : rec.id)}
                          className="w-full flex items-center gap-3 p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              rec.score >= 80 ? "bg-emerald-500"
                              : rec.score >= 50 ? "bg-yellow-500"
                              : rec.score >= 30 ? "bg-orange-500"
                              : "bg-red-500"
                            }`}
                          />
                          <span className="flex-1 text-sm font-medium text-foreground">
                            {translation ? translation.title : rec.title}
                          </span>
                          <span className={`whitespace-nowrap text-[11px] font-bold tracking-wider uppercase ${
                            rec.score >= 80 ? "text-emerald-500"
                            : rec.score >= 50 ? "text-yellow-500"
                            : rec.score >= 30 ? "text-orange-500"
                            : "text-red-500"
                          }`}>
                            {rec.score >= 80 ? "MODÉRÉ"
                            : rec.score >= 50 ? "IMPORTANT"
                            : rec.score >= 30 ? "URGENT"
                            : "CRITIQUE"}
                          </span>
                          <svg
                            className={`w-4 h-4 text-white/30 transition-transform ${
                              expandedRecommendation === rec.id ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {expandedRecommendation === rec.id && (
                          <div className="px-4 pb-4 pt-0">
                            <div className="pl-5 text-sm text-white/50 leading-relaxed border-l border-white/10">
                              {translation ? translation.description : (rec.description || "Aucun détail supplémentaire.")}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-10 text-center">
              <p className="text-sm text-white/40 mb-4">
                Ces résultats vous parlent ? Nous pouvons vous aider à corriger chaque point.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(200,240,0,0.3)] transition-all duration-200"
              >
                Demander un audit complet
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
