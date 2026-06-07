"use client"

import { useState } from "react"
import Link from "next/link"
import { NICHES } from "@/lib/niches"

const PREVIEW_BY_NICHE: Record<string, { type: "iframe" | "placeholder"; src?: string; alt: string }> = {
  avocats: {
    type: "iframe",
    src: "/demos/avocats/chic/index.html",
    alt: "Aperçu site avocat",
  },
  "experts-comptables": {
    type: "placeholder",
    alt: "Aperçu site expert-comptable",
  },
  architectes: {
    type: "placeholder",
    alt: "Aperçu site architecte",
  },
}

export function DemosPreview() {
  const niches = Object.entries(NICHES)
  const [activeSlug, setActiveSlug] = useState(niches[0]?.[0] ?? "avocats")
  const active = NICHES[activeSlug]
  const preview = PREVIEW_BY_NICHE[activeSlug]

  return (
    <section className="relative bg-[#f5f4f0] px-6 py-32 md:px-12 overflow-hidden border-t border-black/5">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide text-gray-500 mb-4">Réalisations</p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-gray-900">
            Des sites qui marchent
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed text-gray-500">
            Sélectionnez un secteur et découvrez un aperçu des designs réalisés.
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-3">
            {niches.map(([slug, niche]) => (
              <button
                key={slug}
                onClick={() => setActiveSlug(slug)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeSlug === slug
                    ? "bg-[#c8f000] text-black shadow-lg"
                    : "bg-white text-gray-700 hover:bg-[#c8f000]/10 border border-black/10"
                }`}
              >
                {niche.title} <span className="ml-1">{niche.icon}</span>
              </button>
            ))}
          </div>

          <div className="w-full max-w-[1080px]">
            <div className="relative w-full rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-black/5">
                <span className="h-3 w-3 rounded-full bg-black/10" />
                <span className="h-3 w-3 rounded-full bg-black/10" />
                <span className="h-3 w-3 rounded-full bg-black/10" />
                <span className="ml-3 text-xs text-gray-400 font-mono">propulse.dev — {active.title}</span>
              </div>

              {preview.type === "iframe" && preview.src ? (
                <div className="relative w-full" style={{ height: "680px" }}>
                  <iframe
                    src={preview.src}
                    title={preview.alt}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <span className="text-6xl mb-4">{active.icon}</span>
                  <p className="text-lg font-medium text-gray-700">Aperçu bientôt disponible</p>
                  <p className="text-base text-gray-500 mt-2">Revenez découvrir le design {active.title.toLowerCase()}.</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-medium text-gray-900 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Voir toutes les démos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
