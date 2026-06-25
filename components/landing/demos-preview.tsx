"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NICHES } from "@/lib/niches"
import { Reveal } from "@/components/ui/reveal"

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function DemosPreview() {
  const niches = Object.entries(NICHES)
  const [activeSlug, setActiveSlug] = useState(niches[0]?.[0] ?? "avocats")
  const [designIndex, setDesignIndex] = useState(0)

  const active = NICHES[activeSlug]
  const designs = active?.designs ?? []
  const currentDesign = designs[designIndex]

  useEffect(() => {
    setDesignIndex(0)
  }, [activeSlug])

  const goPrev = () => {
    setDesignIndex((prev) => (prev > 0 ? prev - 1 : designs.length - 1))
  }

  const goNext = () => {
    setDesignIndex((prev) => (prev < designs.length - 1 ? prev + 1 : 0))
  }

  return (
    <section className="relative bg-[#f5f4f0] px-6 py-32 md:px-12 overflow-hidden border-t border-black/5">
      <Reveal>
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide text-gray-600 mb-4">Réalisations</p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-gray-900">
            Des sites qui marchent
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed text-gray-600">
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

          <div className="relative w-full max-w-[1080px]">
            {/* Flèche gauche */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-black/10 bg-white/80 text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:bg-[#c8f000] hover:text-black hover:border-[#c8f000] hover:shadow-[0_0_20px_rgba(200,240,0,0.25)]"
              aria-label="Design précédent"
            >
              <ArrowLeft />
            </button>

            <div className="relative w-full rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm">
              {/* Barre titre fenêtre */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-black/5">
                <span className="h-3 w-3 rounded-full bg-black/10" />
                <span className="h-3 w-3 rounded-full bg-black/10" />
                <span className="h-3 w-3 rounded-full bg-black/10" />
                <span className="ml-3 text-xs text-gray-500 font-mono">
                  propulse.dev — {active.title} / {currentDesign?.title ?? ""}
                </span>

                {/* Bouton ouvrir dans un nouvel onglet */}
                {currentDesign && (
                  <a
                    href={currentDesign.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#c8f000] transition-colors"
                  >
                    Ouvrir
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}

                {/* Indicateur de page mobile */}
                <span className="text-[11px] text-gray-500 font-mono md:hidden">
                  {designIndex + 1}/{designs.length}
                </span>
              </div>

              {currentDesign ? (
                <div className="relative w-full" style={{ height: "680px" }}>
                  <iframe
                    src={currentDesign.url}
                    title={currentDesign.title}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                  <p className="text-lg font-medium text-gray-700">Aucun design disponible</p>
                </div>
              )}
            </div>

            {/* Flèche droite */}
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-black/10 bg-white/80 text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:bg-[#c8f000] hover:text-black hover:border-[#c8f000] hover:shadow-[0_0_20px_rgba(200,240,0,0.25)]"
              aria-label="Design suivant"
            >
              <ArrowRight />
            </button>

            {/* Dots indicateurs + navigation mobile */}
            {designs.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-5">
                {/* Prev mobile */}
                <button
                  onClick={goPrev}
                  className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-black/10 text-gray-600 transition-all hover:bg-[#c8f000] hover:text-black"
                  aria-label="Design précédent"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  {designs.map((design, i) => (
                    <button
                      key={design.id}
                      onClick={() => setDesignIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === designIndex
                          ? "w-6 bg-gray-800"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Design : ${design.title}`}
                    />
                  ))}
                </div>

                {/* Next mobile */}
                <button
                  onClick={goNext}
                  className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-black/10 text-gray-600 transition-all hover:bg-[#c8f000] hover:text-black"
                  aria-label="Design suivant"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-[12px] text-gray-600">
            Les noms, personnes, adresses et photos sont fictifs — à but illustratif uniquement.
          </p>

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
      </Reveal>
    </section>
  )
}
