"use client"

const TESTIMONIALS = [
  {
    quote:
      "Depuis la refonte, je reçois 3 à 4 nouveaux clients par semaine directement depuis Google. Le site est rapide, clair et mes clients me font des compliments.",
    name: "Maître Claire Dubois",
    role: "Avocate — Cabinet Dubois & Associés",
    initials: "CD",
  },
  {
    quote:
      "L'audit gratuit m'a permis de comprendre pourquoi je n'étais pas visible. 2 mois après, je suis en première page sur mes mots-clés locaux.",
    name: "Maître Thomas Leroy",
    role: "Avocat en droit des affaires",
    initials: "TL",
  },
  {
    quote:
      "La navigation est fluide, le design inspire confiance. Mes clients me disent que le site les a rassurés avant de me contacter.",
    name: "Sophie Martin",
    role: "Expert-comptable — Cabinet Martin & Fils",
    initials: "SM",
  },
]

import { Reveal } from "@/components/ui/reveal"

export function Testimonials() {
  return (
    <section className="relative bg-[#f5f4f0] px-6 py-24 md:px-12 overflow-hidden border-t border-black/5">
      <Reveal>
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-wide text-gray-500 mb-3">Témoignages</p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-gray-900">
            Ce que disent nos clients.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-center text-center gap-5 rounded-2xl border border-black/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-lg font-bold text-gray-700">
                {t.initials}
              </div>
              <blockquote className="text-base font-light leading-relaxed text-gray-700">
                « {t.quote} »
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500 mt-1">{t.role}</p>
              </div>
              <div className="flex gap-1 text-[#c8f000]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.133 9.41l8.2-1.192z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  )
}
