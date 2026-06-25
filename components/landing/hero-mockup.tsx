"use client"

import { useState, useEffect } from "react"

const PROFESSIONS = [
  {
    name: "Avocats",
    tagline: "Crédibilité & visibilité pour votre cabinet",
    url: "/demos/avocats/chic/index.html",
  },
  {
    name: "Notaires",
    tagline: "Modernisez votre étude sans perdre votre âme",
    url: "/demos/notaires/chic/index.html",
  },
  {
    name: "Architectes",
    tagline: "Un portfolio qui parle à vos clients",
    url: "/demos/architectes/chic/index.html",
  },
  {
    name: "Experts-comptables",
    tagline: "Soyez trouvé par les entreprises de votre région",
    url: "/demos/experts-comptables/chic/index.html",
  },
]

export function HeroMockup() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % PROFESSIONS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mt-16 md:mt-20 relative w-full max-w-5xl mx-auto">
      {/* Écran principal Desktop */}
      <div className="relative z-10 rounded-xl border border-white/[0.08] bg-surface overflow-hidden shadow-[0_0_80px_rgba(200,240,0,0.05)] group/card">
        {/* Barre navigateur */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0a0a10]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-3 text-[10px] text-gray-600 font-mono truncate">propulsedev.fr</span>
        </div>

        {/* Iframe avec rotation des métiers */}
        <div className="relative bg-[#050505]" style={{ aspectRatio: "16/10" }}>
          {PROFESSIONS.map((p, i) => (
            <iframe
              key={p.url}
              src={p.url}
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              title={p.name}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}

          {/* Overlay gradient pour lisibilité du badge */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20 pointer-events-none" />

          {/* Badge métier + tagline */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-30 pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground tracking-wide whitespace-nowrap">
                {PROFESSIONS[current].name}
              </span>
              <p
                className="text-sm text-gray-300 font-light"
                key={current}
                style={{
                  animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                {PROFESSIONS[current].tagline}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de profession */}
      <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 md:gap-8">
        {PROFESSIONS.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setCurrent(i)}
            className="group/btn relative flex items-center gap-2"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                i === current ? "text-accent" : "text-gray-600 group-hover/btn:text-gray-400"
              }`}
            >
              {p.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
