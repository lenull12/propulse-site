const DATA = [
  {
    name: "SEO technique",
    badge: "Référencement naturel",
    icon: "M15.5 15.5L19 19M10 17a7 7 0 100-14 7 7 0 000 14z",
    detail:
      "Les fondations techniques qui parlent à Google — sans plugin, sans compromis.",
    items: [
      "Balises title & meta uniques par page",
      "Données structurées Schema.org",
      "Sitemap XML & robots.txt",
      "Core Web Vitals optimisés",
      "Balisage Open Graph",
      "URLs propres et sémantiques",
    ],
  },
  {
    name: "Google My Business",
    badge: "Visibilité locale",
    icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z",
    detail:
      "Votre fiche GMB optimisée pour dominer le Local Pack et apparaître dans Google Maps.",
    items: [
      "Fiche GMB complète et vérifiée",
      "Catégorisation & mots-clés locaux",
      "Citations locales NAP cohérentes",
      "Posts & photos réguliers",
      "Système d'avis 5★ automatisé",
      "Suivi position Local Pack",
    ],
  },
  {
    name: "Suivi & reporting",
    badge: "Abonnement mensuel",
    icon: "M3 3v18h18M7 16l4-8 4 4 4-6",
    detail:
      "Un accompagnement continu avec des rapports concrets — pas de jargon, que des résultats.",
    items: [
      "Rapport mensuel personnalisé",
      "Suivi positions Google",
      "Analyse des avis & tendances",
      "Recommandations actionnables",
      "Ajustements SEO continus",
      "Support réactif sous 24h",
    ],
  },
]

export function SeoDeliverables() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {DATA.map((d) => (
        <div
          key={d.name}
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-accent/20"
        >
          <div className="mb-5 flex items-center justify-between">
            <svg className="h-6 w-6 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d={d.icon} />
            </svg>
            <span className="rounded-full border border-accent/10 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] text-accent/60">
              {d.badge}
            </span>
          </div>

          <h3 className="mb-2 font-mono text-base font-semibold text-foreground">{d.name}</h3>
          <p className="mb-5 text-sm leading-relaxed text-gray-400">{d.detail}</p>

          <div className="space-y-2 border-t border-white/5 pt-4">
            {d.items.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm leading-relaxed text-white/50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
