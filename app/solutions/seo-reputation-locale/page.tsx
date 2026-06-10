import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { SeoDeliverables } from "@/components/solutions/seo-deliverables"
import { SeoResults } from "@/components/solutions/seo-results"

export const metadata: Metadata = {
  title: "SEO & réputation locale — PropulseDev",
  description:
    "Référencement local, SEO technique, gestion automatisée de votre réputation Google. On vous rend visible partout où vos clients vous cherchent.",
  openGraph: {
    title: "SEO & réputation locale — PropulseDev",
    description: "Référencement local, SEO technique, gestion automatisée de votre réputation Google.",
  },
}

const FEATURES = [
  {
    num: "01",
    title: "Référencement local",
    desc: "Google My Business optimisé, ancrage géographique, données structurées locales. Vous apparaissez dans le Local Pack et les premiers résultats Google.",
  },
  {
    num: "02",
    title: "Avis 5★ sans effort",
    desc: "QR code → lien personnalisé → vos clients satisfaits laissent un avis public. Les mécontents atterrissent sur un formulaire privé — votre note reste impeccable.",
  },
  {
    num: "03",
    title: "SEO natif",
    desc: "Sitemap, balises, données structurées : tout est codé dans l'ADN du site, pas ajouté après coup. Prêt pour Google dès le lancement, sans plugin ni extension.",
  },
  {
    num: "04",
    title: "Suivi transparent",
    desc: "Rapport mensuel complet : positions Google, évolution des avis, trafic, recommandations concrètes. Vous voyez exactement ce qui fonctionne.",
  },
]

const PROCESS = [
  {
    step: "01",
    title: "Audit complet",
    desc: "On analyse votre présence en ligne : site actuel, fiches Google, avis, concurrents. On identifie les opportunités et les urgences.",
  },
  {
    step: "02",
    title: "Optimisation technique",
    desc: "On met en place les fondations SEO : balises, données structurées, sitemap, Google My Business, ancrage local dans chaque page.",
  },
  {
    step: "03",
    title: "Système d'avis",
    desc: "On déploie votre QR code personnalisé, on configure le filtre des avis négatifs, on forme votre équipe à collecter les 5★.",
  },
  {
    step: "04",
    title: "Suivi mensuel",
    desc: "Rapport personnalisé chaque mois : positions, avis, trafic. On ajuste la stratégie en continu pour maximiser votre visibilité.",
  },
]

export default function SeoReputationLocalePage() {
  return (
    <>
      <SiteNav />

      {/* ============ HERO ============ */}
      <section className="border-b border-white/10 bg-[#000000] px-6 pb-24 pt-40 md:px-15">
        <div className="mx-auto max-w-[1400px] lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:items-center">
          {/* Left — text */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Visibilité</p>
            <h1 className="mb-8 font-mono text-[clamp(32px,4.5vw,52px)] font-black leading-[1.1] text-balance text-foreground">
              Dominez votre SEO
              <br />
              <span className="text-accent">et votre réputation locale.</span>
            </h1>

            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Visibilité Google Maps & Local Pack
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Avis 5★ sans effort
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                SEO technique natif
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all mb-10 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
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
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Google My Business
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5 text-[11px] font-medium text-accent">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Avis 5★
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5 text-[11px] font-medium text-accent">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                SEO technique
              </span>
            </div>
          </div>

          {/* Right — image preview */}
          <div className="relative mt-12 flex justify-center lg:mt-0">
            <Image
              src="/images/seo.webp"
              alt="Aperçu SEO & réputation locale"
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
              Ce qu'on vous apporte
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              Plus de visibilité,
              <br />
              <span className="text-white/30">plus de clients.</span>
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
                            <line x1="40" y1="30" x2="160" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <line x1="40" y1="55" x2="160" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <line x1="40" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <line x1="40" y1="105" x2="160" y2="105" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <line x1="60" y1="20" x2="60" y2="115" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <line x1="100" y1="20" x2="100" y2="115" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <line x1="140" y1="20" x2="140" y2="115" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                            <path d="M100 40Q100 25 110 25Q120 25 120 40Q120 50 110 60Q100 50 100 40Z" fill="currentColor" opacity="0.15">
                              <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite" />
                            </path>
                            <circle cx="110" cy="40" r="4" fill="currentColor" opacity="0.4" />
                            <circle cx="110" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
                              <animate attributeName="r" values="5;28" dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        )}
                        {i === 1 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <g opacity="0.8">
                              <polygon points="40,25 42.5,32.5 50,32.5 44,37 46,44 40,40 34,44 36,37 30,32.5 37.5,32.5" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.5s" begin="0s" repeatCount="indefinite" />
                              </polygon>
                              <polygon points="65,25 67.5,32.5 75,32.5 69,37 71,44 65,40 59,44 61,37 55,32.5 62.5,32.5" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.5s" begin="0.15s" repeatCount="indefinite" />
                              </polygon>
                              <polygon points="90,25 92.5,32.5 100,32.5 94,37 96,44 90,40 84,44 86,37 80,32.5 87.5,32.5" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                              </polygon>
                              <polygon points="115,25 117.5,32.5 125,32.5 119,37 121,44 115,40 109,44 111,37 105,32.5 112.5,32.5" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.5s" begin="0.45s" repeatCount="indefinite" />
                              </polygon>
                              <polygon points="140,25 142.5,32.5 150,32.5 144,37 146,44 140,40 134,44 136,37 130,32.5 137.5,32.5" fill="currentColor" opacity="0.15">
                                <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
                              </polygon>
                            </g>
                            <rect x="75" y="65" width="50" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                            <rect x="80" y="70" width="14" height="14" fill="currentColor" opacity="0.12" />
                            <rect x="98" y="70" width="22" height="6" fill="currentColor" opacity="0.1" />
                            <rect x="80" y="88" width="22" height="6" fill="currentColor" opacity="0.1" />
                            <rect x="106" y="88" width="14" height="10" fill="currentColor" opacity="0.1" />
                            <path d="M55 85Q65 75 80 85Q95 95 110 85Q125 75 145 85" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="3 3">
                              <animate attributeName="strokeDashoffset" values="0;-6" dur="1s" repeatCount="indefinite" />
                            </path>
                          </svg>
                        )}
                        {i === 2 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <rect x="35" y="25" width="90" height="110" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                            <rect x="45" y="38" width="70" height="6" rx="1.5" fill="currentColor" opacity="0.15">
                              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0s" repeatCount="indefinite" />
                            </rect>
                            <rect x="45" y="50" width="60" height="5" rx="1.5" fill="currentColor" opacity="0.08" />
                            <rect x="45" y="60" width="50" height="5" rx="1.5" fill="currentColor" opacity="0.08" />
                            <rect x="45" y="75" width="65" height="6" rx="1.5" fill="currentColor" opacity="0.15">
                              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.3s" repeatCount="indefinite" />
                            </rect>
                            <rect x="45" y="87" width="55" height="5" rx="1.5" fill="currentColor" opacity="0.08" />
                            <rect x="45" y="97" width="45" height="5" rx="1.5" fill="currentColor" opacity="0.08" />
                            <rect x="45" y="112" width="60" height="6" rx="1.5" fill="currentColor" opacity="0.15">
                              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.6s" repeatCount="indefinite" />
                            </rect>
                            <circle cx="155" cy="80" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2">
                              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <path d="M148 80L153 85L162 75" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                            </path>
                          </svg>
                        )}
                        {i === 3 && (
                          <svg viewBox="0 0 200 160" className="w-full h-full">
                            <rect x="30" y="20" width="140" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
                            <rect x="40" y="30" width="30" height="6" rx="2" fill="currentColor" opacity="0.15" />
                            <rect x="40" y="42" width="20" height="4" rx="1.5" fill="currentColor" opacity="0.08" />
                            <polyline points="50,120 70,100 90,110 110,80 130,90 150,60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3">
                              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                            </polyline>
                            <circle cx="50" cy="120" r="3" fill="currentColor" opacity="0.4" />
                            <circle cx="70" cy="100" r="3" fill="currentColor" opacity="0.4" />
                            <circle cx="90" cy="110" r="3" fill="currentColor" opacity="0.4" />
                            <circle cx="110" cy="80" r="4" fill="currentColor" opacity="0.6">
                              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="130" cy="90" r="3" fill="currentColor" opacity="0.4" />
                            <circle cx="150" cy="60" r="4" fill="currentColor" opacity="0.6">
                              <animate attributeName="r" values="3;5;3" dur="2s" begin="1s" repeatCount="indefinite" />
                            </circle>
                            <rect x="35" y="120" width="130" height="1" fill="currentColor" opacity="0.1" />
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

      {/* ============ LIVRABLES SEO ============ */}
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
              Ce qu'on met en place
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              Des actions concrètes,
              <br />
              <span className="text-white/30">pas de la poudre aux yeux.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] font-mono text-sm leading-relaxed text-white/40">
              Chaque point est codé, configuré ou déployé — rien n&apos;est laissé au hasard.
            </p>
          </div>

          <SeoDeliverables />
        </div>
      </section>

      {/* ============ RÉSULTATS AVANT/APRÈS ============ */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#000000] px-6 py-24 md:px-15">
        <SeoResults />
      </section>

      {/* ============ COMMENT ON FAIT ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
              <span className="w-8 h-px bg-white/20" />
              Notre méthode
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              Une approche structurée
              <br />
              <span className="text-white/30">pour des résultats concrets.</span>
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
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="mb-4 font-mono text-[clamp(28px,3.5vw,36px)] font-black leading-[1.15] text-foreground">
            Vous voulez dominer Google Maps ?
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

