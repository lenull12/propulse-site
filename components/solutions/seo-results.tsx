"use client"

import { useState, useEffect, useRef } from "react"

const COMPARISONS = [
  {
    icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z",
    label: "Position Google",
    before: "Page 5+",
    after: "Top 3 local",
  },
  {
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    label: "Avis clients",
    before: "3.2 ★",
    after: "4.8 ★",
  },
  {
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    label: "Trafic mensuel",
    before: "0 visiteurs",
    after: "+240 %",
  },
  {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    label: "Pagespeed",
    before: "45 / 100",
    after: "95+",
  },
]

const METRICS = [
  {
    icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10m-3 0a3 3 0 105 0 3 3 0 10-5 0",
    label: "Visibilité Google",
    before: "Page 5+",
    after: "Top 3 local",
    target: 85,
  },
  {
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    label: "Avis clients",
    before: "3.2 ★",
    after: "4.8 ★",
    target: 90,
  },
  {
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    label: "Trafic organique",
    before: "0 visiteurs",
    after: "+240 %",
    target: 100,
  },
]

const TIMELINE = [
  {
    before: "Aucune présence Google Maps — invisibilité locale",
    after: "Fiche GMB optimisée, Local Pack, Google Maps — visibilité totale",
  },
  {
    before: "Avis inexistants ou négatifs — zéro preuve sociale",
    after: "Avis 5★ automatisés — vos clients deviennent vos meilleurs vendeurs",
  },
  {
    before: "Site sans suivi — vous pilotez à l'aveugle",
    after: "Rapport mensuel + ajustements continus — vous maîtrisez tout",
  },
]

function MetricBar({ value }: { value: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setWidth(value))
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] via-[#00f0ff] to-[#c8f000] transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[0]
  index: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`relative rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
        <div className="sm:text-right">
          <span className="text-[11px] font-medium uppercase tracking-[2px] text-white/25">Avant</span>
          <p className="mt-1 text-sm leading-relaxed text-white/40">{item.before}</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full border border-accent/20 bg-accent/5">
          <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="sm:text-left">
          <span className="text-[11px] font-medium uppercase tracking-[2px] text-accent">Après</span>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">{item.after}</p>
        </div>
      </div>
    </div>
  )
}

export function SeoResults() {
  const [metricsVisible, setMetricsVisible] = useState(false)
  const [compareVisible, setCompareVisible] = useState(false)
  const metricsRef = useRef<HTMLDivElement>(null)
  const compareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = metricsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = compareRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCompareVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Section 1 — Metrics bars */}
      <div ref={metricsRef}>
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-3 font-mono text-sm text-white/30 mb-6">
            <span className="h-px w-8 bg-white/20" />
            Avant / Après
          </span>
          <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
            Des résultats qui parlent
            <br />
            <span className="text-white/30">d&apos;eux-mêmes.</span>
          </h2>
        </div>

        <div className={`mb-20 grid gap-5 md:grid-cols-3 transition-all duration-700 ${metricsVisible ? "opacity-100" : "opacity-0"}`}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
            >
              <svg className="mb-4 h-6 w-6 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={m.icon} />
              </svg>
              <span className="text-[11px] font-medium uppercase tracking-[2px] text-white/30">{m.label}</span>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-sm text-white/25 line-through">{m.before}</span>
                <span className="font-mono text-2xl font-black text-accent">{m.after}</span>
              </div>
              {metricsVisible && <MetricBar value={m.target} />}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Tableau comparatif */}
      <div ref={compareRef} className="mb-20">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-3 font-mono text-sm text-white/30 mb-3">
            <span className="h-px w-8 bg-white/20" />
            Avant vs Après
          </span>
          <h3 className="font-mono text-xl font-bold text-foreground md:text-2xl">
            Ce qui change concrètement
          </h3>
        </div>

        <div className="mx-auto max-w-[700px] space-y-3">
          {COMPARISONS.map((c, i) => (
            <div
              key={c.label}
              className={`flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-700 ${
                compareVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <svg className="hidden h-5 w-5 shrink-0 text-white/30 sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={c.icon} />
              </svg>

              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-medium uppercase tracking-[2px] text-white/30">{c.label}</span>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-sm text-white/25 line-through">{c.before}</span>
                  <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <span className="font-mono text-lg font-black text-accent">{c.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Timeline */}
      <div>
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-3 font-mono text-sm text-white/30 mb-3">
            <span className="h-px w-8 bg-white/20" />
            La transformation
          </span>
          <h3 className="font-mono text-xl font-bold text-foreground md:text-2xl">
            Avant / Après, point par point
          </h3>
        </div>

        <div className="mx-auto max-w-[800px] space-y-4">
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
