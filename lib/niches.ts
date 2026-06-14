// ============================================
// CONFIG DES NICHES — Hub dynamique unifié
// Pour ajouter une niche : ajoute une entrée ici.
// Pour ajouter un design : ajoute un objet dans "designs".
// ============================================

export type Design = {
  id: string
  tag: string
  title: string
  description: string
  badge: string
  /** URL relative servie depuis /public (démo HTML statique) */
  url: string
}

export type Niche = {
  /** icône emoji utilisée dans le menu Démos */
  icon: string
  /** libellé court pour le menu déroulant */
  menuLabel: string
  menuSub: string
  tag: string
  title: string
  subtitle: string
  designs: Design[]
}

export const NICHES: Record<string, Niche> = {
  avocats: {
    icon: "⚖️",
    menuLabel: "Avocats",
    menuSub: "Cabinets juridiques indépendants",
    tag: "Secteur juridique",
    title: "Cabinets d'avocats",
    subtitle:
      "Des sites qui inspirent confiance, rigueur et prestige. Chaque design est pensé pour convertir un justiciable hésitant en client.",
    designs: [
      {
        id: "chic",
        tag: "Premium",
        title: "Le Prestige",
        description:
          "Design sobre et luxueux, typographie serif élégante, palette or et noir. Idéal pour les cabinets haut de gamme.",
        badge: "Populaire",
        url: "/demos/avocats/chic/index.html",
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Moderne",
        description:
          "Design épuré et dynamique, sections claires, forte lisibilité mobile. Parfait pour les avocats qui veulent se démarquer.",
        badge: "Nouveau",
        url: "/demos/avocats/moderne/index.html",
      },
      {
        id: "classique",
        tag: "Institutionnel",
        title: "Le Classique",
        description:
          "Design sobre et institutionnel, couleurs neutres, structure rassurante. Pour les cabinets établis qui veulent inspirer confiance.",
        badge: "Sobre",
        url: "/demos/avocats/classique/index.html",
      },
    ],
  },

  "experts-comptables": {
    icon: "📊",
    menuLabel: "Experts comptables",
    menuSub: "Cabinets d'expertise comptable",
    tag: "Secteur comptable",
    title: "Experts comptables",
    subtitle:
      "Des sites qui reflètent rigueur, fiabilité et expertise. Pensés pour rassurer les dirigeants de PME avant qu'ils ne décrochent leur téléphone.",
    designs: [
      {
        id: "chic",
        tag: "Premium",
        title: "Le Prestige",
        description:
          "Design corporate et raffiné, palette bleu nuit et blanc, typographie soignée. Pour les cabinets qui gèrent de grands comptes.",
        badge: "Populaire",
        url: "/demos/experts-comptables/chic/index.html",
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Moderne",
        description:
          "Design clair et structuré, mise en avant des chiffres clés et des services. Idéal pour attirer les TPE et indépendants.",
        badge: "Nouveau",
        url: "/demos/experts-comptables/moderne/index.html",
      },
    ],
  },

  notaires: {
    icon: "📜",
    menuLabel: "Notaires",
    menuSub: "Études notariales",
    tag: "Secteur notarial",
    title: "Études notariales",
    subtitle:
      "Des sites qui incarnent la rigueur et la tradition notariale, avec une présentation moderne. Chaque design est pensé pour rassurer vos clients dès la première visite.",
    designs: [
      {
        id: "chic",
        tag: "Premium",
        title: "Le Chic",
        description:
          "Design luxueux noir et or, pour une étude qui veut marquer sa différence. Ambiance cabinet d'exception.",
        badge: "Nouveau",
        url: "/demos/notaires/chic/index.html",
      },
      {
        id: "classique",
        tag: "Institutionnel",
        title: "Le Classique",
        description:
          "Design sobre et institutionnel, palette marine et or, typographie serif élégante. Idéal pour les études établies qui veulent inspirer confiance.",
        badge: "Populaire",
        url: "/demos/notaires/classique/index.html",
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Moderne",
        description:
          "Design épuré et contemporain, bento grid moderne, palette crème et marine. Parfait pour les études qui veulent moderniser leur image.",
        badge: "Nouveau",
        url: "/demos/notaires/moderne/index.html",
      },
    ],
  },

  architectes: {
    icon: "🏛️",
    menuLabel: "Architectes",
    menuSub: "Cabinets d'architecture indépendants",
    tag: "Secteur créatif",
    title: "Architectes",
    subtitle:
      "Des sites à la hauteur de votre vision créative. Mise en valeur de vos réalisations, storytelling fort et expérience immersive.",
    designs: [
      {
        id: "chic",
        tag: "Portfolio",
        title: "Le Portfolio",
        description:
          "Design minimaliste et aéré, grandes photos plein écran, typographie architecturale. Pour les architectes qui laissent leurs projets parler.",
        badge: "Populaire",
        url: "/demos/architectes/chic/index.html",
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Studio",
        description:
          "Design sombre et sophistiqué, animations subtiles, présentation du cabinet et de l'équipe. Pour un cabinet avec une identité forte.",
        badge: "Nouveau",
        url: "/demos/architectes/moderne/index.html",
      },
    ],
  },
}

export function getNiche(slug: string): Niche | undefined {
  return NICHES[slug]
}

export function getAllNicheSlugs(): string[] {
  return Object.keys(NICHES)
}
