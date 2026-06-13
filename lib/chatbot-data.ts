export type ChatSuggestion = {
  label: string
  nextId: string
}

export type ChatStep = {
  id: string
  message: string
  suggestions?: ChatSuggestion[]
  link?: { label: string; href: string }
}

export const CHAT_FLOW: Record<string, ChatStep> = {
  root: {
    id: "root",
    message: "Bonjour ! 👋 Comment puis-je vous aider ?",
    suggestions: [
      { label: "💰 Combien ça coûte ?", nextId: "pricing" },
      { label: "⏱ Délais de livraison", nextId: "delays" },
      { label: "🔧 Abonnements", nextId: "subscriptions" },
      { label: "📞 Nous contacter", nextId: "contact" },
    ],
  },

  pricing: {
    id: "pricing",
    message:
      "Un site vitrine sur-mesure démarre à **1 000 €** (offre Starter). Tout se fait en prix fixe, sans surprise :\n\n• **Starter** — 1 000 € : site vitrine complet + SEO\n• **Pro** — 2 000 € : Starter + fonctionnalités avancées\n• **Premium** — 3 500 € : Pro + design sur-mesure poussé\n\nLe paiement se fait en deux fois : 30% à la commande, 70% à la mise en ligne.",
    suggestions: [
      { label: "🔧 Quels sont les abonnements ?", nextId: "subscriptions" },
      { label: "⬅️ Retour", nextId: "root" },
    ],
    link: { label: "📄 Voir les tarifs détaillés →", href: "/tarifs" },
  },

  delays: {
    id: "delays",
    message:
      "Comptez entre **1 et 3 semaines** selon la complexité du projet.\n\nDès la validation du devis, vous recevez un planning détaillé avec chaque étape. Vous avez une visibilité complète sur l'avancement.",
    suggestions: [
      { label: "💰 Combien ça coûte ?", nextId: "pricing" },
      { label: "⬅️ Retour", nextId: "root" },
    ],
    link: { label: "📞 Demander un audit gratuit →", href: "/contact" },
  },

  subscriptions: {
    id: "subscriptions",
    message:
      "Nous proposons trois formules d'abonnement mensuel, résiliables à tout moment :\n\n• **Zen** — 29 €/mois : hébergement, domaine, màj sécurité, backups, 2 modifs/mois\n• **Performance** — 59 €/mois : Zen + audit SEO mensuel + suivi classement, 5 modifs/mois\n• **Business** — 89 €/mois : Performance + filtrage avis Google + prioritaire, 10 modifs/mois\n\nL'abonnement n'est pas obligatoire — votre site vous appartient.",
    suggestions: [
      { label: "💰 Voir les offres Starter / Pro", nextId: "pricing" },
      { label: "⬅️ Retour", nextId: "root" },
    ],
    link: { label: "📄 Voir les abonnements →", href: "/tarifs" },
  },

  contact: {
    id: "contact",
    message:
      "Vous pouvez nous contacter directement via le formulaire de contact, ou par email à **contact@propulsedev.fr**.\n\nNous répondons sous 24h en semaine.",
    suggestions: [
      { label: "⬅️ Retour", nextId: "root" },
    ],
    link: { label: "📝 Aller au formulaire →", href: "/contact" },
  },
}