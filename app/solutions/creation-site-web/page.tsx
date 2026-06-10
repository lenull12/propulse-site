import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { StackSection } from "@/components/solutions/stack-section"
import { TechGiants } from "@/components/solutions/tech-giants"
import { SecuritySection } from "@/components/solutions/security-section"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Création de site web — PropulseDev",
  description:
    "Des sites Next.js/React sur mesure, rapides, sécurisés et optimisés SEO. Design premium, zéro template, livré clé en main.",
  openGraph: {
    title: "Création de site web — PropulseDev",
    description: "Des sites Next.js/React sur mesure, rapides et optimisés SEO.",
  },
}

const FEATURES = [
  {
    num: "01",
    title: "Vitesse extrême",
    desc: "Pagespeed 95+, chargement en moins d'une seconde, Core Web Vitals optimisés. Google classe mieux les sites rapides — vos visiteurs ne fuient pas pendant le chargement.",
  },
  {
    num: "02",
    title: "Design sur mesure",
    desc: "Chaque pixel est pensé pour votre identité, vos clients et vos objectifs. Aucun template, aucun compromis — votre site vous ressemble et se démarque.",
  },
  {
    num: "03",
    title: "Architecture robuste",
    desc: "Next.js + TypeScript, hébergement professionnel Vercel, zéro plugin. Votre site reste rapide, sécurisé et évolutif sans ralentir avec le temps.",
  },
  {
    num: "04",
    title: "Mobile d'abord",
    desc: "Plus de 70% des visiteurs arrivent par smartphone. Navigation fluide, design responsive natif — votre site est impeccable sur tous les écrans.",
  },
]

const ALTERNATIVES = [
  {
    title: "WordPress & CMS",
    desc: "Sites lents, failles de sécurité récurrentes, dépendance aux plugins tiers. Chaque mise à jour peut casser votre site — et votre référencement.",
  },
  {
    title: "Templates & thèmes",
    desc: "Le même design que des centaines d'autres sites. Code boursouflé, performances médiocres, personnalisation limitée — zéro identité de marque.",
  },
  {
    title: "Constructeurs (Wix, Shopify…)",
    desc: "Abonnement mensuel opaque, code propriétaire verrouillé, SEO bridé. Vous louez votre site, vous ne le possédez pas.",
  },
  {
    title: "Agencies low-cost",
    desc: "Code jetable, zéro stratégie, pas de suivi. Vous payez deux fois : un site médiocre, puis sa reconstruction complète.",
  },
]

const PROCESS = [
  {
    step: "01",
    title: "Audit & stratégie",
    desc: "On analyse votre marché, vos concurrents et vos objectifs. On vous propose une architecture sur mesure, pas un copier-coller.",
  },
  {
    step: "02",
    title: "Conception & design",
    desc: "Maquettes, choix graphiques, validation. Vous voyez votre site prendre forme avant qu'une ligne de code soit écrite.",
  },
  {
    step: "03",
    title: "Développement & intégration",
    desc: "On code votre site dans les règles de l'art : Next.js, responsive, SEO natif, performances. Tout est testé avant d'aller plus loin.",
  },
  {
    step: "04",
    title: "Livraison & suivi",
    desc: "Mise en ligne, configuration, formation. On ne disparaît pas : 30 jours d'ajustements inclus, et on reste joignable après.",
  },
]

export default function CreationSiteWebPage() {
  return (
    <>
      <SiteNav />

      {/* ============ HERO ============ */}
      <section className="border-b border-white/10 bg-[#000000] px-6 pb-24 pt-40 md:px-15">
        <div className="mx-auto max-w-[1400px] lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:items-center">
          {/* Left — text */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Création</p>
            <h1 className="mb-8 font-mono text-[clamp(32px,4.5vw,52px)] font-black leading-[1.1] text-balance text-foreground">
              Bénéficiez d&apos;un site web
              <br />
              <span className="text-accent">premium sur-mesure</span>
            </h1>

            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Design unique et haut de gamme
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Performance exceptionnelle
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sécurité accrue
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
            >
              Obtenir un audit gratuit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* 3 badges accent */}
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5 text-[11px] font-medium text-accent">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Pagespeed 95+
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5 text-[11px] font-medium text-accent">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Design sur mesure
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5 text-[11px] font-medium text-accent">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18" />
                </svg>
                Mobile-first
              </span>
            </div>
          </div>

          {/* Right — image preview */}
          <div className="relative mt-12 flex justify-center lg:mt-0">
            <Image
              src="/images/heroweb.png"
              alt="Aperçu d'un site web premium"
              width={720}
              height={540}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* ============ BÉNÉFICES ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
              <span className="w-8 h-px bg-white/20" />
              Pourquoi nous choisir
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              Des sites qui font la
              <br />
              <span className="text-white/30">différence.</span>
            </h2>
          </div>

          <div>
            {FEATURES.map((f, i) => (
              <div key={f.num} className="group transition-all duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-white/10">
                  <div className="shrink-0">
                    <span className="font-mono text-sm text-white/30">{f.num}</span>
                  </div>
                  <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="font-mono text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:translate-x-2 transition-transform duration-500">
                        {f.title}
                      </h3>
                      <p className="text-base text-gray-400 leading-relaxed">{f.desc}</p>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-48 h-40 text-foreground">
                        {i === 0 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <rect x="30" y="20" width="140" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
                            <g>
                              <rect x="40" y="35" width="120" height="10" rx="2" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.8;0.15" dur="2s" begin="0s" repeatCount="indefinite" />
                                <animate attributeName="width" values="20;120;20" dur="2s" begin="0s" repeatCount="indefinite" />
                              </rect>
                              <rect x="40" y="51" width="120" height="10" rx="2" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.8;0.15" dur="2s" begin="0.15s" repeatCount="indefinite" />
                                <animate attributeName="width" values="20;120;20" dur="2s" begin="0.15s" repeatCount="indefinite" />
                              </rect>
                              <rect x="40" y="67" width="120" height="10" rx="2" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.8;0.15" dur="2s" begin="0.3s" repeatCount="indefinite" />
                                <animate attributeName="width" values="20;120;20" dur="2s" begin="0.3s" repeatCount="indefinite" />
                              </rect>
                              <rect x="40" y="83" width="120" height="10" rx="2" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.8;0.15" dur="2s" begin="0.45s" repeatCount="indefinite" />
                                <animate attributeName="width" values="20;120;20" dur="2s" begin="0.45s" repeatCount="indefinite" />
                              </rect>
                              <rect x="40" y="99" width="120" height="10" rx="2" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.8;0.15" dur="2s" begin="0.6s" repeatCount="indefinite" />
                                <animate attributeName="width" values="20;120;20" dur="2s" begin="0.6s" repeatCount="indefinite" />
                              </rect>
                            </g>
                            <circle cx="100" cy="145" r="3" fill="currentColor" opacity="0.3">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        )}
                        {i === 1 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <rect x="30" y="25" width="60" height="45" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                            <rect x="100" y="25" width="70" height="45" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                            <rect x="30" y="80" width="140" height="55" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                            <rect x="30" y="25" width="60" height="45" rx="3" fill="currentColor" opacity="0.06">
                              <animate attributeName="opacity" values="0.06;0.18;0.06" dur="3s" repeatCount="indefinite" />
                            </rect>
                            <rect x="30" y="80" width="140" height="55" rx="3" fill="currentColor" opacity="0.04">
                              <animate attributeName="opacity" values="0.04;0.12;0.04" dur="3s" begin="1s" repeatCount="indefinite" />
                            </rect>
                            <line x1="45" y1="40" x2="75" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="0s" repeatCount="indefinite" />
                            </line>
                            <line x1="45" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
                            <rect x="115" y="35" width="40" height="8" rx="2" fill="currentColor" opacity="0.1">
                              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" begin="0.5s" repeatCount="indefinite" />
                            </rect>
                            <rect x="115" y="47" width="30" height="8" rx="2" fill="currentColor" opacity="0.08" />
                            <rect x="45" y="95" width="110" height="8" rx="2" fill="currentColor" opacity="0.08">
                              <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2s" begin="0.8s" repeatCount="indefinite" />
                            </rect>
                            <rect x="45" y="110" width="80" height="8" rx="2" fill="currentColor" opacity="0.06" />
                            <rect x="45" y="125" width="60" height="6" rx="2" fill="currentColor" opacity="0.04" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <path d="M100 20L150 40L150 90Q150 130 100 145Q50 130 50 90L50 40Z" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M100 35L135 50L135 85Q135 115 100 128Q65 115 65 85L65 50Z" fill="currentColor" opacity="0.1">
                              <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite" />
                            </path>
                            <rect x="85" y="75" width="30" height="22" rx="3" fill="currentColor" />
                            <path d="M90 75L90 65Q90 55 100 55Q110 55 110 65L110 75" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="100" cy="85" r="3" fill="#050505" />
                            <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0">
                              <animate attributeName="y1" values="40;120;40" dur="3s" repeatCount="indefinite" />
                              <animate attributeName="y2" values="40;120;40" dur="3s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" />
                            </line>
                          </svg>
                        )}
                        {i === 3 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <rect x="75" y="20" width="50" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                            <rect x="85" y="32" width="30" height="55" rx="2" fill="currentColor" opacity="0.08">
                              <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.3" />
                            <rect x="140" y="58" width="4" height="16" rx="1" fill="currentColor" opacity="0.2">
                              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" begin="0s" repeatCount="indefinite" />
                            </rect>
                            <rect x="148" y="50" width="4" height="24" rx="1" fill="currentColor" opacity="0.2">
                              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="156" y="42" width="4" height="32" rx="1" fill="currentColor" opacity="0.2">
                              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                            </rect>
                            <rect x="164" y="34" width="4" height="40" rx="1" fill="currentColor" opacity="0.2">
                              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
                            </rect>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STACK TECHNIQUE ============ */}
      <section className="relative overflow-hidden border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div
          className="pointer-events-none absolute inset-0 text-white opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
              <span className="w-8 h-px bg-white/20" />
              Notre stack
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              Une pile technique
              <br />
              <span className="text-white/30">pensée pour la performance.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] font-mono text-sm leading-relaxed text-white/40">
              Les mêmes technologies qui propulsent les plus grandes plateformes mondiales — de la performance au référencement, tout est pensé pour durer.
            </p>
          </div>

          <StackSection />
        </div>
      </section>

      <TechGiants />

      <SecuritySection />

      {/* ============ ALTERNATIVES ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
              <span className="w-8 h-px bg-white/20" />
              Pourquoi pas les autres
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              WordPress, templates, Wix…
              <br />
              <span className="text-white/30">pourquoi ça vous freine.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-sm font-light leading-relaxed text-gray-400">
              La plupart des solutions «&nbsp;prêtes à l'emploi&nbsp;» vous vendent de la simplicité. 
              Mais derrière, ce sont des compromis sur la performance, la sécurité et votre image.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ALTERNATIVES.map((a) => (
              <div key={a.title} className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-accent/20">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-1 w-10 rounded-full bg-accent/40" />
                  <svg className="h-4 w-4 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold text-foreground">{a.title}</h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA DÉMOS ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-16 md:px-15">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="mb-5 text-base font-light leading-relaxed text-gray-400">
            Assez de théorie&nbsp;? Voyez par vous-même ce qu&apos;on livre.
          </p>
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-7 py-3 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_30px_rgba(200,240,0,0.3)]"
          >
            Voir nos sites de démonstration
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
              <span className="w-8 h-px bg-white/20" />
              Comment on travaille
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              De l'idée au lancement,
              <br />
              <span className="text-white/30">on est avec vous.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PROCESS.map((p) => (
              <div key={p.step} className="flex items-start gap-5 rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-sm font-bold text-accent">
                  {p.step}
                </span>
                <div>
                  <h3 className="mb-1 font-mono text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-gray-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="mb-4 font-mono text-[clamp(28px,3.5vw,36px)] font-black leading-[1.15] text-foreground">
            Prêt à passer à la vitesse supérieure ?
          </h2>
          <p className="mb-8 text-base font-light leading-relaxed text-gray-400">
            On vous offre un audit complet de votre présence en ligne. 24h, sans engagement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
          >
            Audit gratuit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

