"use client"
import { useStaggerReveal } from "@/hooks/use-stagger-reveal"
import { ParticlesBackground } from "./particles-background"
import { Typewriter } from "@/components/ui/typewriter"
import Image from "next/image"

const SERVICES = [
  {
    number: "01",
    title: "Audit de performance",
    text: "Analyse complète de votre écosystème digital. J'identifie les points bloquants qui vous font perdre des clients au quotidien.",
    features: [
      "Audit technique SEO complet",
      "Analyse de vitesse Google PageSpeed",
      "Rapport détaillé sous 24 heures",
    ],
    price: "Offert & Sans engagement",
    featured: false,
  },
  {
    number: "02",
    title: "Refonte de site web",
    text: "Création d'un site sur-mesure d'une rapidité extrême, optimisé pour transformer vos simples visiteurs en clients actifs.",
    features: [
      "Vitesse de chargement garantie > 95%",
      "Structure UX pensée pour la conversion",
      "Optimisation SEO locale poussée",
    ],
    price: "À partir de 1 000 €",
    featured: true,
  },
  {
    number: "03",
    title: "Gestion réputation Google",
    text: "Automatisation de la récolte d'avis positifs et traitement privé des insatisfactions pour propulser votre note Google.",
    features: [
      "Campagnes automatisées par SMS/Email",
      "Filtrage intelligent des réclamations",
      "Amélioration de la note en 15 jours",
    ],
    price: "À partir de 49 € / mois",
    featured: false,
  },
]

export function Services() {
  const gridRef = useStaggerReveal(150)
  return (
    <section id="services" className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
      <ParticlesBackground count={50} connectDistance={100} color="200,240,0" />
      {/* Halo lumineux d'ambiance en fond */}
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#c8f000] opacity-[0.03] blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">Notre expertise à votre service</p>
            </div>
            <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground">
              <Typewriter lines={["Votre site.", "Votre fiche Google.", "Votre croissance"]} speed={50} triggerOnView lineClassName={["block", "block text-white/50", "block text-accent"]} />
            </h2>
          </div>
          <div className="lg:col-span-5 relative">
            <Image
              src="/images/futuristicweb.webp"
              alt=""
              aria-hidden="true"
              width={600}
              height={500}
              className="w-full h-auto mx-auto lg:ml-auto lg:mr-0 opacity-90 select-none pointer-events-none"
            />
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.number}
              className={`group relative flex flex-col justify-between rounded-[16px] border p-8 md:p-10 transition-all duration-500 hover:-translate-y-1.5 ${
                s.featured
                  ? "border-accent/40 bg-[#0d0d08] shadow-[0_12px_40px_rgba(200,240,0,0.05)]"
                  : "border-white/5 bg-[#0a0a0a]/60 hover:border-white/10"
              }`}
            >
              {s.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  Populaire
                </span>
              )}
              
              <div>
                <div className={`mb-8 font-mono text-5xl font-black leading-none ${s.featured ? "text-accent/30" : "text-white/10"}`}>
                  {s.number}
                </div>
                
                <h3 className="mb-4 text-2xl font-mono font-bold text-foreground">{s.title}</h3>
                <p className="mb-8 text-sm font-light leading-relaxed text-gray-400">{s.text}</p>
                
                <ul className="mb-10 flex flex-col gap-3.5">
                  {s.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-light text-gray-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-accent flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <span className={`text-base font-semibold ${s.featured ? "text-accent" : "text-foreground"}`}>
                  {s.price}
                </span>
                <a
                  href="#contact"
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all hover:-translate-y-0.5 ${
                    s.featured
                      ? "bg-accent text-accent-foreground hover:shadow-[0_8px_20px_rgba(200,240,0,0.3)]"
                      : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {s.number === "01" ? "Demander →" : "Commencer →"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
