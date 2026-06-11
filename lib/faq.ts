export type FaqItem = {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: "Comment se fait le paiement ?",
    a: "En deux fois : 30% à la commande pour lancer le projet, 70% à la mise en ligne. Pas de frais cachés, pas de surprise. Paiement par virement bancaire.",
  },
  {
    q: "Combien coûte un site web professionnel ?",
    a: "Un site vitrine sur-mesure démarre à 1 000 €. Le prix final dépend du nombre de pages, des fonctionnalités souhaitées et de votre secteur d'activité. L'audit initial est toujours offert et sans engagement — c'est lui qui permet de chiffrer précisément votre projet. Nous travaillons en prix fixes, sans surprise.",
  },
  {
    q: "Combien de temps faut-il pour livrer mon site ?",
    a: "Comptez entre 1 et 3 semaines selon la complexité du projet. Dès la validation du devis, nous vous envoyons un planning détaillé avec chaque étape. Vous avez une visibilité complète sur l'avancement, et nous respectons les délais annoncés.",
  },
  {
    q: "Je n'ai aucune connaissance technique. Est-ce un problème ?",
    a: "Pas du tout — c'est même pour vous que nous travaillons. Nous nous occupons de tout : hébergement, nom de domaine, mises à jour de sécurité, sauvegardes. Vous recevez un site clé en main. Si vous le souhaitez, nous vous formons rapidement pour modifier votre contenu (textes, photos).",
  },
  {
    q: "Que se passe-t-il après la livraison du site ?",
    a: "Nous restons disponibles pour les ajustements post-livraison pendant 30 jours — c'est inclus. Au-delà, nous proposons trois formules d'abonnement mensuel (Zen, Performance, Business) qui incluent hébergement, mises à jour, sauvegardes et un nombre de modifications selon la formule choisie.",
  },
  {
    q: "Comment fonctionne le système d'avis Google ?",
    a: "Nous configurons un système automatisé qui envoie un SMS ou présente un QR code à vos clients satisfaits pour les inviter à laisser un avis 5 étoiles sur votre fiche Google. Les clients insatisfaits sont redirigés vers un formulaire privé — leur avis ne part pas sur Google. Résultat : votre note moyenne monte, votre réputation se renforce, et vous attirez plus de clients.",
  },
  {
    q: "Est-ce que mon site sera bien positionné sur Google ?",
    a: "Chaque site est construit avec les bonnes pratiques SEO dès la conception : structure technique optimisée, balises HTML, vitesse de chargement, design responsive mobile. Nous travaillons également votre fiche Google My Business en profondeur pour le référencement local. Le SEO prend du temps (3 à 6 mois) mais les bases sont solides dès le lancement.",
  },
  {
    q: "Qu'est-ce que le SEO local exactement ?",
    a: "Le SEO local, c'est l'art d'apparaître dans les résultats Google quand un client potentiel cherche un professionnel près de chez lui — par exemple 'avocat Paris 9e' ou 'expert-comptable Lyon'. Cela passe par l'optimisation de votre site ET de votre fiche Google My Business : mots-clés locaux, avis, photos, NAP (nom, adresse, téléphone), etc.",
  },
  {
    q: "Puis-je garder mon nom de domaine existant ?",
    a: "Oui, absolument. Nous nous occupons de transférer ou de conserver votre nom de domaine actuel. Vous pouvez aussi en acheter un nouveau via nous. Dans tous les cas, vous restez propriétaire de votre nom de domaine.",
  },
  {
    q: "Mon site sera-t-il adapté aux mobiles ?",
    a: "Oui, et c'est une priorité. Tous nos sites sont conçus en 'mobile-first' : ils s'adaptent parfaitement aux smartphones, tablettes et ordinateurs. Google pénalise les sites non adaptés aux mobiles, c'est donc un critère essentiel pour votre référencement.",
  },
  {
    q: "Proposez-vous des templates ou des sites sur-mesure ?",
    a: "100 % sur-mesure. Pas de templates WordPress, pas de solutions génériques. Chaque site est développé avec Next.js et React — les mêmes technologies utilisées par les plus grands sites mondiaux. Vous obtenez un site rapide, sécurisé et parfaitement adapté à votre image.",
  },
  {
    q: "Comment se déroule l'audit gratuit ?",
    a: "Vous nous contactez via le formulaire ou par email. Nous analysons votre site actuel, votre fiche Google My Business, votre positionnement face à vos concurrents locaux. Sous 24 à 48h, nous vous envoyons un rapport détaillé avec nos recommandations et un devis personnalisé — sans aucun engagement.",
  },
  {
    q: "Puis-je modifier mon site moi-même après la livraison ?",
    a: "Oui, si vous le souhaitez. Nous pouvons intégrer un système de gestion de contenu simple d'utilisation pour modifier vos textes, photos ou horaires. Sinon, nous nous en chargeons pour vous via la formule de maintenance mensuelle.",
  },
  {
    q: "Est-ce que l'abonnement est obligatoire ?",
    a: "Non. Votre site vous appartient, et l'hébergement ainsi que le nom de domaine vous sont offerts pendant 1 an. Vous pouvez choisir de ne pas souscrire d'abonnement. Les modifications seront alors facturées à la carte.",
  },
  {
    q: "Que contient l'abonnement Zen à 29 €/mois ?",
    a: "L'hébergement du site, le renouvellement du nom de domaine, les mises à jour de sécurité, les sauvegardes automatiques, le support prioritaire et 2 modifications par mois (texte, photo, horaire, etc.).",
  },
  {
    q: "Et les abonnements Performance et Business ?",
    a: "Performance (59 €/mois) inclut tout le Zen, plus un audit SEO mensuel, un suivi du classement Google et 5 modifications par mois. Business (89 €/mois) ajoute le filtrage des avis Google, un support prioritaire et 10 modifications par mois.",
  },
  {
    q: "Comment résilier mon abonnement ?",
    a: "Par email, à tout moment, sans frais. Le service s'arrête à la fin du mois en cours. Nous vous envoyons une archive complète de votre site (fichiers, base de données) et nous vous accompagnons pour transférer votre domaine si nécessaire. Aucune rétention : le site vous appartient.",
  },
  {
    q: "Que se passe-t-il après la première année d'hébergement offert ?",
    a: "Si vous avez un abonnement Zen, Performance ou Business, rien ne change — l'hébergement et le domaine sont inclus. Sinon, vous pouvez reprendre vos fichiers et héberger le site où vous le souhaitez, ou souscrire à un abonnement à tout moment.",
  },
]

export { FAQS }
