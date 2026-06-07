"use client"

import { AnimatedLines } from "./animated-lines"
import { AnimatedStat } from "./animated-stat"
import { Typewriter } from "@/components/ui/typewriter"

export function Problem() {
  const problems = [
    {
      value: 76,
      suffix: "%",
      showBar: true,
      statLabel: "visites dans la journée",
      title: "Fiche Google My Business",
      text: "76 % des recherches locales mènent à une visite sur le site dans la journée.\nVotre fiche Google est votre vitrine principale.",
    },
    {
      value: 53,
      suffix: "%",
      showBar: true,
      statLabel: "taux de rebond",
      title: "Vitesse catastrophique",
      text: "Un site qui met plus de 3 secondes à charger perd plus de la moitié de ses visiteurs avant même qu'ils ne voient votre offre.",
    },
    {
      value: 80,
      suffix: "%",
      showBar: true,
      statLabel: "de recherches mobiles",
      title: "Inadapté aux mobiles",
      text: "Vos clients vous cherchent sur leur smartphone. Si votre site n'est pas optimisé,\nils partent chez le concurrent en 3 clics.",
    },
    {
      value: 4.2,
      suffix: "",
      showBar: false,
      statLabel: "note moyenne Google",
      title: "Avis non gérés",
      text: "Un seul avis à 1 étoile ignoré peut faire chuter votre note et repousser des dizaines de prospects qui vous comparaient.",
    },
  ]

  return (
    <section className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,240,0,0.02)_0%,rgba(5,5,5,0)_60%)] pointer-events-none" />
      <AnimatedLines opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* En-tête */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">Ce que vos clients voient quand ils vous cherchent</p>
            </div>
            <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-foreground">
              <Typewriter lines={["Invisible sur Google,", "invisible pour vos clients."]} speed={50} triggerOnView lineClassName={["block font-black", "block font-black text-white/35"]} />
            </h2>
          </div>
          <div className="lg:col-span-5 relative">
            <img
              src="/images/sphere.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-w-[400px] mx-auto lg:ml-auto lg:mr-0 opacity-80 select-none pointer-events-none drop-shadow-[0_0_40px_rgba(200,240,0,0.08)]"
            />
          </div>
        </div>

        {/* Grille 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group relative rounded-[16px] border border-white/5 bg-[#0a0a0a]/80 p-8 md:p-10 transition-all duration-500 hover:border-white/10 hover:-translate-y-1"
            >
              {/* Titre en gros (style COMPUTE) */}
              <h3 className="text-3xl md:text-4xl font-mono font-black text-foreground mb-4 leading-tight transition-transform duration-500 group-hover:translate-x-1">
                {p.title}
              </h3>

              {/* Texte en gris (style COMPUTE) */}
              <p className="text-base font-light leading-relaxed text-gray-400 mb-8 whitespace-pre-line">
                {p.text}
              </p>

              {/* Chiffre animé + barre */}
              <AnimatedStat
                value={p.value}
                suffix={p.suffix}
                label={p.statLabel}
                showBar={p.showBar}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}