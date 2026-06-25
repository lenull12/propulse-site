"use client"

import { useEffect, useRef, useState } from "react"

const METRICS = [
  { label: "Score PageSpeed moyen", value: 97, suffix: "/100", decimals: 0 },
  { label: "Avis Google générés", value: 340, suffix: "+", decimals: 0 },
  { label: "Taux de conversion moyen", value: 4.8, suffix: "%", decimals: 1 },
  { label: "Délai de livraison moyen", value: 12, suffix: " jours", decimals: 0 },
]

function Counter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const duration = 2200
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(decimals > 0 ? Number((eased * value).toFixed(decimals)) : Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value, decimals])

  return (
    <span ref={ref} className="font-mono text-[clamp(2.8rem,4vw,4.5rem)] font-black text-accent leading-none">
      {display}{suffix}
    </span>
  )
}

export function LiveMetrics() {
  return (
    <section className="relative bg-background px-6 py-24 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Grille de fond subtile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <p className="text-xs font-medium tracking-[3px] uppercase text-gray-400">Résultats en chiffres</p>
          </div>
          <h2 className="font-mono text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.15] text-foreground">
          <span className="block">Des résultats mesurables,</span>
          <span className="block text-gray-400">pas des promesses.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04] rounded-2xl overflow-hidden">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center gap-3 bg-surface px-8 py-12 text-center">
              <Counter value={m.value} suffix={m.suffix} decimals={m.decimals} />
              <span className="text-xs font-medium uppercase tracking-[2px] text-gray-400 leading-relaxed">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}