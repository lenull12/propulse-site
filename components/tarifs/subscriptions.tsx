"use client"

import { useState } from "react"
import Link from "next/link"

const MONTHLY_PRICES = { zen: 29, performance: 59, business: 89 }
const DISCOUNT = 0.2

type PlanKey = "zen" | "performance" | "business"

const PLANS: {
  key: PlanKey
  name: string
  tagline: string
  badge: string | null
  popular: boolean
  features: string[]
  cta?: string
}[] = [
  {
    key: "zen",
    name: "Zen",
    tagline: "L'essentiel pour la tranquillité",
    badge: null,
    popular: false,
    features: [
      "Hébergement Cloudflare — CDN mondial",
      "Domaine .fr renouvelé + SSL automatique",
      "Protection DDoS & firewall Cloudflare",
      "Mises à jour sécurité & dépendances",
      "Backups automatiques hebdomadaires",
      "Cache edge — chargement < 1s",
      "2 modifications par mois",
    ],
  },
  {
    key: "performance",
    name: "Performance",
    tagline: "Le choix malin pour la croissance",
    badge: "Recommandé",
    popular: true,
    features: [
      "Tout Zen inclus",
      "Cache edge prioritaire",
      "Audit SEO mensuel complet",
      "Rapport PageSpeed & Core Web Vitals",
      "Suivi classement Google (Local Pack)",
      "Analyse concurrents locale",
      "Recommandations SEO actionnables",
      "5 modifications par mois",
    ],
  },
  {
    key: "business",
    name: "Business",
    tagline: "La totale pour dominer Google",
    badge: "Tout compris",
    popular: false,
    features: [
      "Tout Performance inclus",
      "Filtrage intelligent des avis Google",
      "Page de redirection avis personnalisée",
      "QR code campagne d'avis",
      "Suivi & analyse des avis",
      "Support prioritaire",
      "10 modifications par mois",
    ],
  },
]

function yearlyPrice(monthly: number) {
  return Math.round(monthly * 12 * (1 - DISCOUNT))
}

export function Subscriptions() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-14 text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-white/30">Optionnel</p>
          <h2 className="mb-3 font-mono text-[clamp(24px,3vw,36px)] font-black leading-[1.15] text-foreground">
            Options <span className="text-white/30">de suivi mensuel</span>
          </h2>
          <p className="text-sm font-light text-gray-500">
            Des abonnements facultatifs pour ceux qui veulent aller plus loin. Résiliables à tout moment.
          </p>
        </div>

        {/* Toggle mensuel / annuel */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium transition-colors ${yearly ? "text-white/30" : "text-foreground"}`}>Mensuel</span>
          <button
            type="button"
            onClick={() => setYearly(!yearly)}
            className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-white/20"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-accent shadow-sm transition-transform duration-300 ${
                yearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${yearly ? "text-foreground" : "text-white/30"}`}>
            Annuel <span className="text-accent font-semibold">-20%</span>
          </span>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => {
            const monthly = MONTHLY_PRICES[plan.key]
            const displayPrice = yearly ? String(yearlyPrice(monthly)) : String(monthly)
            const periodLabel = yearly ? "an" : "mois"
            const yearlySaving = Math.round(monthly * 12 * DISCOUNT)

            return (
              <div
                key={plan.key}
                className={`relative flex flex-col rounded-[16px] border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.popular
                    ? "border-accent/30 bg-accent/[0.02] shadow-[0_0_40px_rgba(200,240,0,0.06)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
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

                {yearly && (
                  <span className="absolute -top-3 right-6 rounded-full bg-accent/15 border border-accent/30 px-3 py-0.5 text-[10px] font-semibold text-accent">
                    Économisez {yearlySaving}€
                  </span>
                )}

                <div className="mb-8">
                  <h2 className="font-mono text-xl font-bold text-foreground">{plan.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{plan.tagline}</p>
                </div>

                <div className="mb-8">
                  <span className="font-mono text-[clamp(36px,4vw,48px)] font-black text-foreground">
                    {displayPrice}
                  </span>
                  <span className="ml-1 font-mono text-lg text-white/40">€</span>
                  <p className="mt-1 text-sm text-gray-500">par {periodLabel}</p>
                  <p className="mt-1 text-xs text-white/20 font-light">
                    {yearly ? `Soit ${Math.round(yearlyPrice(monthly) / 12)} €/mois` : "Sans engagement, résiliable à tout moment"}
                  </p>
                </div>

                <ul className="mb-10 flex flex-1 flex-col gap-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm font-light leading-relaxed text-gray-400">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-accent text-black hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
                      : "border border-white/15 text-foreground hover:border-accent/40 hover:bg-accent/5"
                  }`}
                >
                  {plan.cta || "Choisir " + plan.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Encart C'est quoi 1 modification */}
        <div className="mt-12 mx-auto max-w-[600px] rounded-xl border border-white/5 bg-white/[0.02] px-6 py-8 md:px-10">
          <h3 className="mb-6 font-mono text-lg font-bold text-foreground text-center">
            C&apos;est quoi <span className="text-accent">1 modification</span> ?
          </h3>
          <div className="divide-y divide-white/5">
            {[
              { action: "Modifier un texte, une photo, un horaire, un lien", count: "1" },
              { action: "Publier 1 article de blog", count: "1" },
              { action: "Nouvelle page", count: "2" },
              { action: "Nouvelle section", count: "3" },
              { action: "Refonte / gros changement", count: "Devis dédié" },
            ].map((row) => (
              <div key={row.action} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm text-gray-400">{row.action}</span>
                <span className={`font-mono font-bold text-sm flex-shrink-0 ${row.count === "Devis dédié" ? "text-accent" : "text-accent"}`}>
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Encart "Pas d'abonnement ?" */}
        <div className="mt-10 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-8 text-center">
          <h3 className="mb-3 font-mono text-lg font-bold text-foreground">
            Vous ne voulez pas d&apos;abonnement ?
          </h3>
          <p className="mb-5 text-sm font-light text-gray-400 max-w-[600px] mx-auto">
            Pas de souci &mdash; votre site vous appartient, hébergement et domaine offerts pendant 1 an.
            Au-delà, vous pouvez reprendre vos fichiers et héberger le site où vous voulez.
            <br />
            Les modifications sont facturées à la carte.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span>Texte : 30 €</span>
            <span>Photo : 25 €</span>
            <span>Nouvelle section : 80 €</span>
            <span>Nouvelle page : 150-300 €</span>
          </div>
        </div>
      </div>
    </section>
  )
}
