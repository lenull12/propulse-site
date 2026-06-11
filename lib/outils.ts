export type OutilStatus = "ready" | "soon"

export type Outil = {
  id: string
  title: string
  description: string
  href: string
  status: OutilStatus
}

export const OUTILS: Outil[] = [
  {
    id: "simulateur",
    title: "Simulateur de site",
    description:
      "Configurez votre futur site en quelques clics : secteur, style, couleurs et fonctionnalités. Obtenez un aperçu en direct et une estimation de devis.",
    href: "/simulateur",
    status: "ready",
  },
  {
    id: "pagespeed",
    title: "Analyse PageSpeed",
    description:
      "Entrez l'URL de votre site pour un diagnostic complet basé sur Google PageSpeed Insights. Scores de performance, Core Web Vitals et recommandations d'amélioration.",
    href: "/outils/pagespeed",
    status: "ready",
  },
  {
    id: "seo-checker",
    title: "Analyse SEO",
    description:
      "Analysez les balises HTML essentielles de votre site : title, meta description, balises Hn, images, robots et Open Graph.",
    href: "/outils/seo-checker",
    status: "ready",
  },
  {
    id: "meta-generator",
    title: "Générateur de balises méta",
    description:
      "Générez facilement les balises meta, Open Graph et Twitter Card de vos pages. Copiez-collez le code optimisé SEO directement dans votre site.",
    href: "/outils/meta-generator",
    status: "ready",
  },
]
