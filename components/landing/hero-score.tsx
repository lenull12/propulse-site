"use client"

import { useEffect, useState } from "react"

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(progress * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

export function HeroScore() {
  const before = useCountUp(34)
  const after = useCountUp(98)

  return (
    <div className="flex animate-fade-up flex-col gap-4 [animation-delay:300ms]">
      <div className="rounded-[12px] border border-white/10 bg-white/[0.04] p-7">
        <p className="mb-3 text-xs uppercase tracking-[2px] text-gray-400">Score de performance</p>
        <div className="mb-1 font-serif text-6xl font-black leading-none text-danger">{before}</div>
        <p className="mb-4 text-[13px] text-gray-400">avant Propulse Dev</p>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-danger transition-[width] duration-700 ease-out"
            style={{ width: `${before}%` }}
          />
        </div>
      </div>

      <div className="rounded-[12px] border border-accent bg-accent p-7">
        <p className="mb-3 text-xs uppercase tracking-[2px] text-ink/70">Score de performance</p>
        <div className="mb-1 font-serif text-6xl font-black leading-none text-ink">{after}</div>
        <p className="mb-4 text-[13px] text-ink/70">après Propulse Dev</p>
        <div className="h-1.5 overflow-hidden rounded-full bg-black/25">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-700 ease-out"
            style={{ width: `${after}%` }}
          />
        </div>
      </div>
    </div>
  )
}
