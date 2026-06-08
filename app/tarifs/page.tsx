import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Tarifs — PropulseDev",
  description: "Des formules claires et sans engagement pour les professionnels indépendants. Audit offert, site clé en main à partir de 1 000 €.",
  openGraph: {
    title: "Tarifs — PropulseDev",
    description: "Des formules claires et sans engagement. Audit offert.",
  },
}

const PLANS = [
  {
    name: "Starter",
    tagline: "Pour démander sans risque",
    price: "1 000",
    suffix: "€",
    period: "une fois",
    badge: null,
    popular: false,
    features: [
      "Site vitrine 1 page (mono-page)",
      "Design responsive mobile/tablette",
      "Formulaire de contact intégré",
      "Hébergement 12 mois offert",
      "Nom de domaine .fr offert 1 an",
      "SEO technique de base",
      "Configuration Google My Business",
      "Livré sous 5 à 7 jours",
    ],
    cta: "Choisir Starter",
    href: "/#contact",
  },
  {
    name: "Pro",
    tagline: "Le plus complet pour les indépendants",
    price: "2 000",
    suffix: "€",
    period: "une fois",
    badge: "Recommandé",
    popular: true,
    features: [
      "Site multipages (5 pages max)",
      "Design responsive + animations",
      "Blog / Actualités intégré",
      "Système d'avis Google automatisé",
      "QR code personnalisé (flyer, carte de visite)",
      "Pages légales (mentions, politique de confidentialité)",
      "SEO avancé (balises, structuration, sitemap)",
      "Formation gestion de contenu (30 min visio)",
      "Livré sous 1 à 2 semaines",
    ],
    cta: "Choisir Pro",
    href: "/#contact",
  },
  {
    name: "Premium",
    tagline: "La solution tout-en-un pour les pros",
    price: "3 500",
    suffix: "€",
    period: "une fois",
    badge: "Sur-mesure",
    popular: false,
    features: [
      "Site multipages (10 pages max)",
      "Design personnalisé avec votre charte",
      "Animations avancées et micro-interactions",
      "Dashboard de suivi des avis Google",
      "Page d'atterrissage campagne spécifique",
      "Générateur de QR codes dynamiques",
      "SEO complet + contenu rédigé par notre équipe",
      "Site éco-conçu (performances optimisées)",
      "Maintenance et mises à jour 3 mois offerts",
      "Audit trimestriel de performance",
      "Livré sous 2 à 4 semaines",
    ],
    cta: "Choisir Premium",
    href: "/#contact",
  },
]

export default function TarifsPage() {
  return (
    <>
      <SiteNav />

      {/* ============ HERO ============ */}
      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Tarifs</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            Des prix fixes,
            <br />
            <span className="text-white/30">zéro surprise.</span>
          </h1>
          <p className="max-w-[560px] text-base font-light leading-relaxed text-gray-400">
            Un audit gratuit et sans engagement pour chiffrer votre projet. Ensuite,
            vous choisissez la formule qui correspond à vos besoins. Pas de frais cachés,
            pas d'abonnement forcé.
          </p>
        </div>
      </section>

      {/* ============ GRILLE TARIFS ============ */}
      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[16px] border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.popular
                  ? "border-accent/30 bg-accent/[0.02] shadow-[0_0_40px_rgba(200,240,0,0.06)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] ${
                    plan.popular
                      ? "bg-accent text-black"
                      : "border border-white/10 bg-white/5 text-white/50"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              {/* En-tête */}
              <div className="mb-8">
                <h2 className="font-mono text-xl font-bold text-foreground">{plan.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{plan.tagline}</p>
              </div>

              {/* Prix */}
              <div className="mb-8">
                <span className="font-mono text-[clamp(36px,4vw,48px)] font-black text-foreground">
                  {plan.price}
                </span>
                <span className="ml-1 font-mono text-lg text-white/40">{plan.suffix}</span>
                <p className="mt-1 text-sm text-gray-500">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="mb-10 flex flex-1 flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-0.5 flex-shrink-0 text-accent"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm font-light leading-relaxed text-gray-400">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-accent text-black hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
                    : "border border-white/15 text-foreground hover:border-accent/40 hover:bg-accent/5"
                }`}
              >
                {plan.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION COMPLÉMENTAIRE ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-6 font-mono text-[clamp(24px,3vw,36px)] font-black leading-[1.15] text-foreground">
            Vous ne trouvez pas la formule qu'il vous faut ?
          </h2>
          <p className="mb-8 text-base font-light leading-relaxed text-gray-400">
            Chaque projet est unique. Nous pouvons assembler les options à la carte pour
            créer une offre sur-mesure. L'audit est gratuit et sans engagement.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
          >
            Demander un devis personnalisé
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============ COMPARAISON RAPIDE ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-mono text-[clamp(24px,3vw,36px)] font-black leading-[1.15] text-foreground">
              Ce qui est inclus <span className="text-white/30">dans chaque formule</span>
            </h2>
            <p className="text-sm font-light text-gray-500">Parce que la transparence, c'est la base.</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/5">
            {/* En-têtes colonnes */}
            <div className="grid grid-cols-4 border-b border-white/5 bg-white/[0.02]">
              <div className="px-5 py-4">
                <span className="text-[11px] font-medium uppercase tracking-[2px] text-white/30">Inclus</span>
              </div>
              {["Starter", "Pro", "Premium"].map((name) => (
                <div key={name} className="px-5 py-4 text-center">
                  <span className="text-sm font-semibold text-foreground">{name}</span>
                </div>
              ))}
            </div>

            {/* Lignes */}
            {[
              { label: "Design responsive", starter: true, pro: true, premium: true },
              { label: "Hébergement 12 mois", starter: true, pro: true, premium: true },
              { label: "Nom de domaine .fr", starter: true, pro: true, premium: true },
              { label: "Blog / Actualités", starter: false, pro: true, premium: true },
              { label: "Avis Google automatisé", starter: false, pro: true, premium: true },
              { label: "QR code personnalisé", starter: false, pro: true, premium: true },
              { label: "Formation gestion contenu", starter: false, pro: true, premium: true },
              { label: "Dashboard avis Google", starter: false, pro: false, premium: true },
              { label: "Maintenance offerte", starter: false, pro: false, premium: true },
              { label: "Audit performance", starter: false, pro: false, premium: true },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-4 border-b border-white/[0.03] last:border-0">
                <div className="px-5 py-4">
                  <span className="text-sm font-light text-gray-400">{row.label}</span>
                </div>
                {(["starter", "pro", "premium"] as const).map((key) => (
                  <div key={key} className="flex items-center justify-center px-5 py-4">
                    {row[key] ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="text-white/15 text-sm">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}