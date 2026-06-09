import Link from "next/link"
import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { MockupCode } from "@/components/ui/mockup-code"
import { AvatarR } from "@/components/ui/avatar-r"
import { LighthouseScore } from "@/components/ui/lighthouse-score"
import { MiniMap } from "@/components/ui/mini-map"

export const metadata: Metadata = {
  title: "À propos — PropulseDev",
  description:
    "Découvrez PropulseDev : le studio spécialisé dans la création de sites web performants et la visibilité Google locale pour les professionnels indépendants.",
}

const VALUES = [
  { number: "50+", label: "Sites livrés" },
  { number: "4.9", label: "Note moyenne" },
  { number: "12+", label: "Ans d'expérience" },
  { number: "24h", label: "Audit offert sous 24h" },
]

const MANIFESTE = [
  "Le constat est implacable : des milliers d'indépendants et de professions libérales n'ont pas de site, ou pire, un site obsolète qui dessert leur image. Templates génériques, pages qui mettent 6 secondes à charger — ce n'est pas une vitrine, c'est un repoussoir à clients.",
  "Nous avons fait le choix inverse : du design haut de gamme, du code sur-mesure, zéro superflu. Chaque site PropulseDev est une expérience — rapide, élégante, pensée pour convertir le visiteur en client dès la première seconde.",
  "Parce qu'à l'ère du mobile et de Google, un site obsolète ou inexistant n'est pas une option. C'est un handicap concurrentiel direct. Nous sommes là pour le transformer en avantage.",
]

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ── Hero ── */}
        <section className="relative bg-[#050505] px-6 pt-36 pb-20 md:px-12 overflow-hidden bg-grid-cyber">
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#14b8a6] opacity-[0.015] blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent/40" />
                <p className="text-sm font-medium tracking-wide text-accent font-sans">Le Studio</p>
              </div>
              <h1 className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.1] text-foreground mb-6">
                <span className="text-foreground">Propulse</span><span className="text-accent">Dev</span>{" "}
                <span className="animate-shimmer-accent">l&apos;excellence numérique</span>
              </h1>
              <p className="text-base md:text-lg font-light leading-relaxed text-gray-400 max-w-[540px] mb-8">
                Nous ne construisons pas seulement des sites web — nous bâtissons des{" "}
                <strong className="text-foreground font-medium">machines à clients</strong>{" "}
                pour les professionnels.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
                >
                  Demander un audit gratuit
                </Link>
                <Link
                  href="/demos"
                  className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-foreground"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </div>

            <div className="hidden md:flex justify-center">
              <MockupCode />
            </div>
          </div>
        </section>

        {/* ── Manifeste ── */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent/40" />
                <p className="text-sm font-medium tracking-wide text-accent font-sans">Le manifeste</p>
                <span className="w-8 h-px bg-accent/40" />
              </div>
              <h2 className="font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
                Pourquoi le sur-mesure a gagné
              </h2>
            </div>
            <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-gray-400">
              {MANIFESTE.map((p, i) => (
                <p key={i} className="scroll-reveal">
                  {p}
                </p>
              ))}
            </div>

            {/* Valeurs — layout inspiré v0-compute-11 */}
            <div className="scroll-reveal mt-16">
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                {["Prix fixes", "Moins de 2 secondes", "Support permanent"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-accent/15 bg-accent/[0.04] px-4 py-2 text-xs font-medium text-accent tracking-wide"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="1.5" className="h-6 w-6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ),
                    title: "Transparence",
                    desc: "Prix fixes, pas de surprises. Vous savez exactement ce que vous payez et ce que vous obtenez.",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="1.5" className="h-6 w-6" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    ),
                    title: "Performance",
                    desc: "Les technologies les plus rapides du marché pour un site qui charge en moins de 2 secondes.",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="1.5" className="h-6 w-6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                    title: "Accompagnement",
                    desc: "On ne disparaît pas après la livraison. Nous restons disponibles à chaque étape.",
                  },
                ].map((v) => (
                  <div
                    key={v.title}
                    className="group relative flex items-start gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-accent/20 hover:bg-accent/[0.02] hover:shadow-[inset_0_0_20px_rgba(200,240,0,0.03)]"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(200,240,0,0.15)]">
                      {v.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono font-semibold text-foreground mb-1">{v.title}</h4>
                      <p className="text-sm font-light text-gray-400 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Chiffres ── */}
        <section className="relative bg-[#050505] px-6 py-20 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center"
                >
                  <p className="font-mono text-3xl md:text-5xl font-black text-accent">{v.number}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">{v.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bento Grid ── */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent/40" />
                <p className="text-sm font-medium tracking-wide text-accent font-sans">L&apos;expertise</p>
                <span className="w-8 h-px bg-accent/40" />
              </div>
              <h2 className="font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
                Ce que nous maîtrisons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ADN Technique — span 1 col, 2 rows */}
              <div className="group md:col-span-1 md:row-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(200,240,0,0.04)] flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <AvatarR />
                  <div>
                    <h3 className="font-mono font-bold text-foreground text-lg mb-2">L&apos;ADN technique</h3>
                    <p className="text-sm font-light text-gray-400 leading-relaxed">
                      Développeur et architecte de chaque site, je conçois personnellement chaque projet
                      avec les technologies les plus avancées — Next.js, TypeScript, Tailwind CSS —
                      pour un résultat qui allie performance, design et référencement.
                    </p>
                  </div>
                </div>

                {/* Terminal block */}
                <div className="flex-1 rounded-xl border border-white/5 bg-[#0a0a0a] p-5 transition-all duration-500 group-hover:border-accent/10">
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-white/20">Terminal</span>
                  </div>
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex items-center gap-2 text-white/40">
                      <span className="text-white/20">$</span>
                      <span>next build</span>
                    </div>
                    <div className="text-accent/80">▲ Next.js 15.5.19</div>
                    <div className="flex items-center gap-2 text-green-400/80">
                      <span>✓</span>
                      <span>Compilé avec succès en 2.3s</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400/80">
                      <span>✓</span>
                      <span>20 pages statiques générées</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400/80">
                      <span>✓</span>
                      <span>Score Lighthouse : 100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-white/5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse-dot" />
                      <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-pulse-dot" style={{ animationDelay: "0.5s" }} />
                    </span>
                    <span className="text-[11px] font-medium text-green-400/80">Prêt pour la production</span>
                  </div>
                </div>
              </div>

              {/* Performance Absolue */}
              <div className="md:col-span-1 rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(200,240,0,0.04)] text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <LighthouseScore />
                  <div>
                    <h3 className="font-mono font-bold text-foreground text-lg mb-2">Performance absolue</h3>
                    <p className="text-sm font-light text-gray-400 leading-relaxed">
                      Zéro script superflu. Vos futurs clients n&apos;attendront jamais
                      que votre page charge.
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO Local & Visibilité */}
              <div className="md:col-span-1 rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(200,240,0,0.04)] text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <MiniMap />
                  <div>
                    <h3 className="font-mono font-bold text-foreground text-lg mb-2">SEO local & visibilité</h3>
                    <p className="text-sm font-light text-gray-400 leading-relaxed">
                      Nous codons pour Google. Votre activité s&apos;impose là où vos clients
                      vous cherchent : en tête des résultats locaux.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sécurité */}
              <div className="md:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(200,240,0,0.04)]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="1.5" className="h-7 w-7">
                      <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-foreground text-lg mb-2 text-center md:text-left">Sécurité</h3>
                    <p className="text-sm font-light text-gray-400 leading-relaxed text-center md:text-left">
                      Architecture moderne, protection Cloudflare native contre les attaques
                      et disponibilité garantie à 99,9 %.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Nos clients ── */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent/40" />
                <p className="text-sm font-medium tracking-wide text-accent font-sans">Nos clients</p>
                <span className="w-8 h-px bg-accent/40" />
              </div>
              <h2 className="font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
                Des indépendants, une méthode
              </h2>
              <p className="mt-4 text-base font-light text-gray-400 max-w-[600px] mx-auto">
                Nous accompagnons les professionnels qui veulent être visibles localement
                et inspirer confiance dès la première visite.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: "⚖️", title: "Avocats", desc: "Cabinets juridiques et avocats indépendants" },
                { icon: "📊", title: "Experts-comptables", desc: "Cabinets d'expertise comptable" },
                { icon: "🏛️", title: "Architectes", desc: "Cabinets d'architecture" },
                { icon: "🍽️", title: "Restaurateurs", desc: "Restaurants, brasseries, traiteurs" },
                { icon: "🔧", title: "Artisans", desc: "Électriciens, plombiers, paysagistes" },
                { icon: "🏠", title: "Agents immobiliers", desc: "Agences et chasseurs immobiliers" },
              ].map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-500 hover:border-accent/20 hover:bg-accent/[0.02] hover:shadow-[inset_0_0_20px_rgba(200,240,0,0.03)]"
                >
                  <span className="block text-3xl mb-4 transition-transform duration-500 group-hover:scale-110">{c.icon}</span>
                  <h3 className="font-mono font-bold text-foreground text-sm mb-1">{c.title}</h3>
                  <p className="text-xs font-light text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-sm font-light text-gray-500 max-w-[500px] mx-auto leading-relaxed">
              Vous ne trouvez pas votre métier dans cette liste&nbsp;? Vous voulez un site personnel&nbsp;?
              <br />
              <span className="text-accent/70">Ce n&apos;est pas un problème.</span>{" "}
              Chaque projet est unique, on s&apos;adapte à votre activité.
            </p>
          </div>
        </section>

        {/* ── Side Info ── */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent/40" />
                <p className="text-sm font-medium tracking-wide text-accent font-sans">Une question de confiance</p>
              </div>
              <h2 className="mb-6 font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
                Un studio, un développeur, un engagement
              </h2>
              <p className="text-base font-light leading-relaxed text-gray-400">
                PropulseDev est une entreprise individuelle dirigée par Raphaël Tran,
                basée en région parisienne. Chaque projet est porté de A à Z par un développeur unique,
                garantissant une qualité sans intermédiaire. Nous collaborons avec un réseau
                de partenaires de confiance quand l&apos;expertise complémentaire est nécessaire.
              </p>
            </div>

            <div className="space-y-6">
              {/* Statut légal */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-white/30 mb-1">Statut légal</p>
                <p className="font-mono font-bold text-foreground text-base">
                  PropulseDev <span className="font-light text-white/50">—</span>{" "}
                  <span className="font-light text-white/50">Entreprise individuelle</span>
                </p>
              </div>

              {/* SIREN */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-white/30 mb-1">SIREN</p>
                <p className="font-mono font-bold text-accent text-lg tracking-wider">106 025 208</p>
              </div>

              {/* Stack */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-white/30 mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "Tailwind CSS", "Cloudflare", "Vercel"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disponibilité */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex items-center gap-4">
                <span className="flex h-3 w-3 relative">
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse-dot" />
                  <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-pulse-dot" style={{ animationDelay: "0.5s" }} />
                </span>
                <p className="text-sm font-medium text-foreground">
                  Disponible pour de nouveaux projets ce mois-ci
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative bg-[#050505] px-6 py-24 md:py-32 md:px-12 overflow-hidden border-t border-white/5 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8f000] opacity-[0.015] blur-[200px] pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-[700px]">
            <h2 className="font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground mb-6">
              Votre site actuel est-il un frein pour votre activité&nbsp;?
            </h2>
            <p className="text-base font-light text-gray-400 leading-relaxed mb-10 max-w-[520px] mx-auto">
              Découvrez en 24h ce qui bloque votre visibilité Google et comment y remédier
              — sans engagement.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(200,240,0,0.35)]"
            >
              Demander mon mini-audit technique gratuit
              <span className="cta-arrow inline-block" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
