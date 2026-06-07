"use client"

import { useEffect, useRef } from "react"

const ITEMS = [
  { icon: "⚖️", label: "Avocats" },
  { icon: "📊", label: "Experts-comptables" },
  { icon: "🏛️", label: "Architectes" },
  { icon: "🏥", label: "Médecins & Cliniques" },
  { icon: "🍽️", label: "Restaurants" },
  { icon: "🔧", label: "Artisans & BTP" },
  { icon: "🏡", label: "Agences immobilières" },
  { icon: "💈", label: "Coiffeurs & Esthéticiens" },
  { icon: "🚗", label: "Garages automobiles" },
  { icon: "🌿", label: "Naturopathes & Bien-être" },
]

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Duplique les items pour le scroll infini
    track.innerHTML += track.innerHTML
  }, [])

  return (
    <div className="relative bg-[#050505] border-y border-white/5 py-5 overflow-hidden">
      {/* Dégradés sur les bords pour l'effet de fondu */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

      <div
        ref={trackRef}
        className="flex gap-0 w-max"
        style={{
          animation: "marqueeScroll 30s linear infinite",
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 border-r border-white/5 whitespace-nowrap"
          >
            <span className="text-xl" aria-hidden="true">{item.icon}</span>
            <span className="text-sm font-medium text-white/70 tracking-wide">{item.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}