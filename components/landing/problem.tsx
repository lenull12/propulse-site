"use client"
import { useStaggerReveal } from "@/hooks/use-stagger-reveal"
import { AnimatedLines } from "./animated-lines"
import { AnimatedStat } from "./animated-stat"
import { Typewriter } from "@/components/ui/typewriter"
import { SearchPhantom } from "@/components/ui/search-phantom"


const tags = [
  { label: "Problème n°1", color: "text-accent border-accent/30 bg-accent/5" },
  { label: "Alerte rouge", color: "text-red-400 border-red-400/30 bg-red-400/5" },
  { label: "Cas fréquent", color: "text-blue-400 border-blue-400/30 bg-blue-400/5" },
  { label: "Piège silencieux", color: "text-amber-400 border-amber-400/30 bg-amber-400/5" },
]

export function Problem() {
  const gridRef = useStaggerReveal(80)
  const problems = [
    {
      value: 76,
      suffix: "%",
      showBar: true,
      statLabel: "des prospects finissent chez un concurrent mieux référencé",
      title: "Personne ne vous trouve",
      text: "Vous avez construit votre activité, votre savoir-faire, votre réputation. Pourtant, quand un client tape votre métier et votre ville sur Google, ce n'est pas vous qui apparaissez en premier. Votre concurrent capte l'appel à votre place.",
    },
    {
      value: 53,
      suffix: "%",
      showBar: true,
      statLabel: "de visiteurs perdus avant d'avoir vu votre offre",
      title: "Votre site fait fuir les clients",
      text: "Un prospect clique sur votre lien. Il attend. Une seconde… deux secondes… trois secondes. Il quitte. Sur dix visiteurs, plus de cinq repartiront sans voir ce que vous proposez.",
    },
    {
      value: 80,
      suffix: "%",
      showBar: true,
      statLabel: "des recherches locales passent par un smartphone",
      title: "Perdu sur mobile",
      text: "Vos clients vous cherchent sur leur téléphone, entre deux rendez-vous. Mais votre site les accueille avec un texte microscopique, des boutons qui se chevauchent, une navigation impossible. En trois clics, ils sont chez votre concurrent.",
    },
    {
      value: 4.2,
      suffix: "",
      showBar: false,
      statLabel: "note moyenne des indépendants sur Google",
      title: "Les avis vous échappent",
      text: "Un client mécontent laisse 1★. Vous ne répondez pas. Les semaines passent. Ce seul avis fait fuir des prospects. Vos clients satisfaits ne laissent jamais d'avis. Votre note ne reflète pas votre vrai niveau.",
    },
  ]

  return (
    <section className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,240,0,0.02)_0%,rgba(5,5,5,0)_60%)] pointer-events-none" />
      <AnimatedLines opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">Ce que vos clients voient quand ils vous cherchent sur Google</p>
            </div>
            <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-foreground">
              <Typewriter lines={["Invisible sur Google,", "invisible pour vos clients."]} speed={50} triggerOnView lineClassName={["block font-black", "block font-black text-white/35"]} />
            </h2>
          </div>
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <SearchPhantom className="w-[400px] h-[400px] opacity-80" />
          </div>
        </div>

        <div ref={gridRef} className="flex flex-col gap-1">
          {problems.map((p, i) => (
            <div key={i} className="group relative">
              <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr_220px] gap-6 lg:gap-6 items-start py-8 lg:py-10 px-6 lg:px-10 rounded-[16px] transition-all duration-500 hover:bg-white/[0.02]">
                <div className="flex lg:flex-col items-center lg:items-start gap-2 lg:gap-3">
                  <span className="font-mono text-[56px] lg:text-[72px] font-black text-white/[0.06] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border whitespace-nowrap ${tags[i].color}`}>
                    {tags[i].label}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl lg:text-3xl font-mono font-black mb-3 leading-tight">
                    <span className="text-foreground">{p.title}</span>
                  </h3>
                  <p className="text-sm lg:text-base font-light leading-relaxed text-gray-400">
                    {p.text}
                  </p>
                </div>
                <div className="lg:pt-2">
                  <AnimatedStat
                    value={p.value}
                    suffix={p.suffix}
                    label={p.statLabel}
                    showBar={p.showBar}
                  />
                </div>
              </div>
              {i < problems.length - 1 && (
                <div className="mx-6 lg:mx-10 h-px bg-white/[0.04]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
