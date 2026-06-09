"use client"

import { useState, useEffect, useCallback } from "react"
import { NICHES } from "@/lib/niches"

const SLUGS = Object.keys(NICHES)

type Item = {
  slug: string
  icon: string
  niche: string
  title: string
  tag: string
  description: string
  badge: string
}

const ALL: Item[] = SLUGS.flatMap((slug) => {
  const n = NICHES[slug]
  return n.designs.map((d) => ({
    slug,
    icon: n.icon,
    niche: n.menuLabel,
    title: d.title,
    tag: d.tag,
    description: d.description,
    badge: d.badge,
  }))
})

const GRADIENTS = [
  "from-[#14b8a6]/30 via-[#00f0ff]/20 to-[#c8f000]/30",
  "from-[#c8f000]/30 via-[#14b8a6]/20 to-[#00f0ff]/30",
  "from-[#00f0ff]/30 via-[#c8f000]/20 to-[#14b8a6]/30",
]

export function HeroDemo() {
  const [index, setIndex] = useState(0)
  const current = ALL[index]

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ALL.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const goTo = useCallback((i: number) => setIndex(i), [])

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 md:p-8 shadow-[0_0_60px_rgba(200,240,0,0.06)]">
        {/* Gradient decorative block */}
        <div
          className={`absolute top-0 right-0 left-0 h-32 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} opacity-60`}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-white/40">
              <span className="text-lg">{current.icon}</span>
              {current.niche}
            </span>
            <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[1px] text-accent">
              {current.badge}
            </span>
          </div>

          {/* Main content */}
          <div className="mb-8">
            <h3 className="mb-2 font-mono text-2xl font-bold text-foreground">
              {current.title}
            </h3>
            <span className="inline-block rounded-full border border-white/10 px-4 py-1 text-[11px] font-medium uppercase tracking-[1px] text-white/40">
              {current.tag}
            </span>
            <p className="mt-5 text-sm leading-relaxed text-gray-400">
              {current.description}
            </p>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2">
            {ALL.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Design ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
