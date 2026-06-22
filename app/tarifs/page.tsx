import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Subscriptions } from "@/components/tarifs/subscriptions"
import { PricingBars } from "@/components/ui/pricing-bars"

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
    tagline: "Pour démarrer sans risque",
    price: "1 000",
    suffix: "€",
    period: "une fois",
    badge: null,
    popular: false,
    features: [
      "Site vitrine 1 page (mono-page)",
      "Design responsive mobile/tablette",
      "Formulaire de contact intégré",
      "Stack Next.js + Tailwind CSS",
      "Hébergement Cloudflare Pages — CDN mondial",
      "Mises à jour sécurité incluses 1 an",
      "Certificat SSL automatique",
      "Protection DDoS & firewall Cloudflare",
      "SEO technique de base",
      "Configuration Google My Business",
      "Optimisation images WebP",
      "Sitemap XML + balises Open Graph",
      "Livré sous 5 à 7 jours",
    ],
    cta: "Choisir Starter",
    href: "/contact",
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
      "Stack Next.js + Tailwind CSS",
      "Hébergement Cloudflare Pages — CDN mondial",
      "Mises à jour sécurité incluses 1 an",
      "Certificat SSL automatique",
      "Protection DDoS & firewall Cloudflare",
      "Cache edge — temps de chargement < 1s",
      "Score PageSpeed 95+ garanti",
      "Images WebP & format moderne",
      "SEO avancé (balises, structuration, sitemap)",
      "Données structurées Schema.org",
      "Sitemap XML + balises Open Graph",
      "Configuration Google My Business",
      "Pages légales (mentions, politique de confidentialité)",
      "QR code personnalisé (flyer, carte de visite)",
      "Formation gestion de contenu (30 min visio)",
      "Livré sous 1 à 2 semaines",
    ],
    cta: "Choisir Pro",
    href: "/contact",
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
      "Design personnalisé avec votre charte graphique",
      "Animations avancées & micro-interactions",
      "Page d'atterrissage campagne dédiée",
      "Blog / Actualités intégré",
      "Stack Next.js + Tailwind CSS",
      "Hébergement Cloudflare Pages — CDN mondial",
      "Mises à jour sécurité incluses 1 an",
      "Certificat SSL automatique",
      "Protection DDoS & firewall Cloudflare",
      "Cache edge — temps de chargement < 1s",
      "Score PageSpeed 98+ garanti",
      "Images WebP, AVIF & lazy loading",
      "SEO complet + contenu rédigé par notre équipe",
      "Données structurées Schema.org avancé",
      "Sitemap XML + balises Open Graph",
      "Configuration Google My Business optimisée",
      "Pages légales (mentions, politique de confidentialité)",
      "Site éco-conçu (performances optimisées)",
      "QR code dynamique personnalisé",
      "Générateur de QR codes illimité",
      "Formation gestion de contenu (30 min visio)",
      "Monitoring 24/7 & backups automatisés",
      "Audit trimestriel de performance",
      "Livré sous 2 à 4 semaines",
    ],
    cta: "Choisir Premium",
    href: "/contact",
  },
]

export default function TarifsPage() {
  return (
    <>
      <SiteNav />

      {/* ============ HERO ============ */}
      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 md:flex-row md:gap-16">
          <div className="flex-1 max-w-[640px]">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Tarifs</p>
            <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
              Votre site clé en main,
              <br />
              <span className="text-white/30">domaine + hébergement offerts.</span>
            </h1>
            <p className="max-w-[560px] text-base font-light leading-relaxed text-gray-400">
              Audit gratuit pour chiffrer votre projet. Vous choisissez votre formule, on s&apos;occupe de tout :
              création, hébergement, domaine, sécurité, mises à jour. Paiement en deux fois&nbsp;:
              <span className="text-foreground"> 30% à la commande, 70% à la mise en ligne</span>.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.03] px-5 py-2">
              <span className="text-accent text-sm font-medium">✓ Domaine .fr + hébergement Cloudflare offerts 1 an</span>
            </div>
          </div>
          <div className="flex-1 w-full max-w-[400px]">
            <PricingBars />
          </div>
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
                <p className="mt-1 text-xs text-white/30 font-light">30% à la commande</p>
              </div>

              {/* Offert 1 an */}
              <div className="mb-6 rounded-lg border border-accent/20 bg-accent/[0.03] px-4 py-3 text-center">
                <p className="text-xs font-medium text-accent leading-relaxed">
                  Domaine .fr + Hébergement Cloudflare<br className="sm:hidden" /> offerts pendant 1 an
                </p>
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

      {/* ============ SÉCURITÉ & HÉBERGEMENT ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-20 md:px-15">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Sérénité</p>
          <h2 className="mb-4 font-mono text-[clamp(24px,3vw,36px)] font-black leading-[1.15] text-foreground">
            On s&apos;occupe de tout<span className="text-white/30">, même après la livraison</span>
          </h2>
          <p className="mb-8 text-sm font-light leading-relaxed text-gray-400 max-w-[600px] mx-auto">
            Votre site est livré clé en main et nous assurons sa maintenance courante
            (mises à jour de sécurité, monitoring, backups) pendant toute la première année.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[700px] mx-auto">
            {[
              { icon: "🛡️", title: "Sécurité", desc: "SSL, pare-feu, mises à jour, monitoring 24/7" },
              { icon: "☁️", title: "Hébergement", desc: "Cloudflare Pages, cache edge mondial, uptime 99.9%" },
              { icon: "🔁", title: "Backups", desc: "Sauvegardes automatiques hebdomadaires" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-left">
                <span className="text-xl mb-2 block">{item.icon}</span>
                <p className="font-mono text-sm font-bold text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-white/10 bg-accent/[0.02] px-6 py-6 max-w-[600px] mx-auto">
            <p className="text-sm text-gray-300 font-light">
              <span className="text-accent font-semibold">Après la 1ʳᵉ année</span>, votre domaine et votre hébergement sont renouvelés
              automatiquement pour <span className="text-foreground font-semibold">seulement 59 €/an</span>.
              Pas de surprise, pas de frais cachés.
            </p>
          </div>
        </div>
      </section>

      {/* ============ COMPARAISON RAPIDE ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Comparatif</p>
            <h2 className="mb-3 font-mono text-[clamp(24px,3vw,36px)] font-black leading-[1.15] text-foreground">
              Tout ce qui est inclus <span className="text-white/30">dans chaque formule</span>
            </h2>
            <p className="text-sm font-light text-gray-500">Comparez et choisissez celle qui vous correspond.</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/5">
            {/* En-têtes colonnes */}
            <div className="grid grid-cols-4 border-b border-white/5 bg-white/[0.02]">
              <div className="px-5 py-4">
                <span className="text-[11px] font-medium uppercase tracking-[2px] text-white/30">Fonctionnalité</span>
              </div>
              {[{ name: "Starter", badge: "Pour démarrer" }, { name: "Pro", badge: "Recommandé" }, { name: "Premium", badge: "Sur-mesure" }].map(({ name, badge }) => (
                <div key={name} className="px-3 py-4 text-center">
                  <span className={`text-sm font-semibold ${badge === "Recommandé" ? "text-accent" : "text-foreground"}`}>{name}</span>
                  <p className="text-[10px] uppercase tracking-[1px] text-white/30 mt-0.5">{badge}</p>
                </div>
              ))}
            </div>

            {/* Lignes */}
            {[
              // === DESIGN & PAGES ===
              { label: "Pages incluses", starter: "1", pro: "5", premium: "10" },
              { label: "Design responsive", starter: true, pro: true, premium: true },
              { label: "Animations", starter: false, pro: true, premium: true },
              { label: "Animations avancées & micro-interactions", starter: false, pro: false, premium: true },
              { label: "Design personnalisé (charte incluse)", starter: false, pro: false, premium: true },

              // === TECHNOLOGIE ===
              { label: "Stack Next.js + Tailwind CSS", starter: true, pro: true, premium: true },
              { label: "Hébergement Cloudflare — CDN mondial", starter: true, pro: true, premium: true },
              { label: "Certificat SSL automatique", starter: true, pro: true, premium: true },
              { label: "Protection DDoS & firewall", starter: true, pro: true, premium: true },
              { label: "Cache edge — chargement < 1s", starter: true, pro: true, premium: true },
              { label: "Score PageSpeed 95+ garanti", starter: false, pro: true, premium: true },
              { label: "Score PageSpeed 98+ garanti", starter: false, pro: false, premium: true },
              { label: "Images WebP", starter: true, pro: true, premium: true },
              { label: "Images AVIF & lazy loading", starter: false, pro: false, premium: true },
              { label: "Site éco-conçu", starter: false, pro: false, premium: true },

              // === SEO & VISIBILITÉ ===
              { label: "SEO technique (balises, sitemap)", starter: true, pro: true, premium: true },
              { label: "SEO avancé (structuration, Schema.org)", starter: false, pro: true, premium: true },
              { label: "SEO complet + contenu rédigé", starter: false, pro: false, premium: true },
              { label: "Données structurées Schema.org", starter: false, pro: true, premium: true },
              { label: "Google My Business configuré", starter: true, pro: true, premium: true },
              { label: "Sitemap XML + Open Graph", starter: true, pro: true, premium: true },

              // === FONCTIONNALITÉS ===
              { label: "Formulaire de contact", starter: true, pro: true, premium: true },
              { label: "Blog / Actualités", starter: false, pro: true, premium: true },
              { label: "QR code personnalisé", starter: false, pro: true, premium: true },
              { label: "QR code dynamique & générateur illimité", starter: false, pro: false, premium: true },
              { label: "Pages légales (mentions, CGV, RGPD)", starter: false, pro: true, premium: true },
              { label: "Page d'atterrissage campagne dédiée", starter: false, pro: false, premium: true },

              // === ACCOMPAGNEMENT ===
              { label: "Formation gestion contenu (30 min)", starter: false, pro: true, premium: true },
              { label: "Nom de domaine .fr offert 1 an*", starter: true, pro: true, premium: true },
              { label: "Monitoring 24/7 & backups", starter: false, pro: false, premium: true },
              { label: "Audit trimestriel de performance", starter: false, pro: false, premium: true },

              // === LIVRAISON ===
              { label: "Délai de livraison", starter: "5-7 jours", pro: "1-2 sem.", premium: "2-4 sem." },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] transition-colors">
                <div className="px-5 py-3.5">
                  <span className="text-sm font-light text-gray-400">{row.label}</span>
                </div>
                {(["starter", "pro", "premium"] as const).map((key) => {
                  const val = row[key]
                  return (
                    <div key={key} className="flex items-center justify-center px-3 py-3.5">
                      {val === true ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : val === false ? (
                        <span className="text-white/10 text-sm">—</span>
                      ) : (
                        <span className="text-sm text-white/40">{val}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-white/20">
              Toutes les formules incluent l'hébergement, le nom de domaine et la stack technique Next.js + Cloudflare.
              Les fonctionnalités liées aux avis Google sont disponibles via l'abonnement Business.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DEVIS PERSONNALISÉ ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-6 font-mono text-[clamp(24px,3vw,36px)] font-black leading-[1.15] text-foreground">
            Vous ne trouvez pas la formule qu&apos;il vous faut ?
          </h2>
          <p className="mb-8 text-base font-light leading-relaxed text-gray-400">
            Chaque projet est unique. Nous pouvons assembler les options à la carte pour
            créer une offre sur-mesure. L&apos;audit est gratuit et sans engagement.
          </p>
          <Link
            href="/contact"
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

      <Subscriptions />

      <SiteFooter />
    </>
  )
}
