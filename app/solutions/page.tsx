import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Solutions — PropulseDev",
  description:
    "Découvrez nos solutions pour booster votre visibilité en ligne : création de site web sur mesure et SEO & réputation locale pour professionnels indépendants.",
  openGraph: {
    title: "Solutions — PropulseDev",
    description: "Création de site web et SEO local pour indépendants.",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — PropulseDev",
    description: "Création de site web et SEO local pour indépendants.",
    images: ["/og-default.svg"],
  },
}

const SOLUTIONS = [
  {
    slug: "creation-site-web",
    title: "Création de site web",
    tagline: "Un site qui vous ressemble et qui convertit",
    description:
      "Des sites sur-mesure, rapides et optimisés SEO, construits avec les technologies les plus avancées. Zéro template, zéro compromis.",
    features: [
      "Next.js / React — performance extrême",
      "Design unique, adapté à votre identité",
      "Pagespeed 95+, Core Web Vitals optimisés",
      "SEO local intégré dès la conception",
      "Responsive mobile-first",
      "Livré clé en main avec formation",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    slug: "seo-reputation-locale",
    title: "SEO & réputation locale",
    tagline: "Soyez trouvé, soyez choisi",
    description:
      "Apparaissez en tête des résultats Google dans votre ville et gérez votre réputation en ligne automatiquement.",
    features: [
      "Audit SEO complet de votre site actuel",
      "Optimisation Google My Business",
      "Stratégie de mots-clés locaux",
      "Système automatisé de collecte d'avis",
      "Filtrage des avis négatifs",
      "Suivi mensuel du classement",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
  },
]

export default function SolutionsPage() {
  return (
    <>
      <SiteNav />

      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Solutions</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            Tout ce qu&apos;il vous faut.<br />
            <span className="text-white/30">Rien de superflu.</span>
          </h1>
          <p className="max-w-[560px] text-base font-light leading-relaxed text-gray-400">
            Deux solutions complémentaires pour transformer votre présence en ligne en machine à clients.
            Audit gratuit, prix fixes, résultat garanti.
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-accent/20 hover:bg-accent/[0.02] hover:shadow-[inset_0_0_20px_rgba(200,240,0,0.03)]"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(200,240,0,0.15)]">
                    {s.icon}
                  </div>
                  <div>
                    <h2 className="font-mono text-xl font-bold text-foreground mb-1">{s.title}</h2>
                    <p className="text-sm font-medium text-accent/80">{s.tagline}</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto mt-2 shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                <p className="text-sm font-light text-gray-400 leading-relaxed mb-6">{s.description}</p>

                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="2" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[0.02] px-6 py-25 text-center md:px-15">
        <div className="mx-auto flex max-w-[600px] flex-col items-center gap-5">
          <h2 className="font-mono text-[clamp(28px,3vw,42px)] font-black leading-[1.2] text-balance text-foreground">
            Vous ne savez pas par où commencer ?
          </h2>
          <p className="text-[15px] font-light leading-relaxed text-gray-400">
            Commencez par un audit gratuit de votre situation actuelle. Nous analysons votre site,
            votre concurrence locale et votre fiche Google, puis nous vous envoyons un rapport
            personnalisé sous 24h — sans engagement.
          </p>
          <Link
            href="/contact"
            className="mt-2 inline-block rounded-full bg-accent px-9 py-3.5 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,240,0,0.3)]"
          >
            Demander un audit gratuit
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
