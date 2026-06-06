"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedStatProps {
  value: number
  suffix?: string
  label: string
  showBar?: boolean // true pour les %
}

export function AnimatedStat({ value, suffix = "", label, showBar = false }: AnimatedStatProps) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  const hasDecimal = value % 1 !== 0

  useEffect(() => {
    if (!started) return
    const start = performance.now()

    function step(now: number) {
      const progress = Math.min((now - start) / 2000, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const raw = eased * value
      setDisplay(hasDecimal ? Number(raw.toFixed(1)) : Math.round(raw))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [started, value, hasDecimal])

  return (
    <div ref={ref}>
      {/* Chiffre */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-5xl lg:text-6xl font-black text-accent">
          {started ? display : 0}{suffix}
        </span>
      </div>

      {/* Barre de progression horizontale */}
      {showBar && (
        <div className="mt-4 h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${started ? display : 0}%`,
              background: "linear-gradient(to right, #c8f000, #00f0ff)",
              transition: "width 2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      )}

      {/* Label */}
      <span className="block text-sm text-gray-400 font-mono mt-2">{label}</span>
    </div>
  )
}