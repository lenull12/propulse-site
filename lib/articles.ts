export type Article = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  content: string[]
  image: string
}

export const ARTICLES: Article[] = [
  {
    slug: "passer-de-3-a-5-etoiles-google",
    category: "Google Avis",
    title: "Comment passer de 3★ à 5★ sur Google sans supplier vos clients",
    excerpt:
      "Le système d'avis automatisé qui transforme vos clients satisfaits en ambassadeurs — sans forcer, sans spam, sans perdre de temps.",
    image: "photo1",
    date: "10 juin 2026",
    readTime: "4 min",
    content: [
      "Vous le savez : 90% des gens lisent les avis avant de choisir un professionnel. Une note de 3,5★ ou pire, pas d'avis du tout, et vous perdez des clients sans le savoir.",
      "Le problème, c'est que demander un avis à chaque client est chronophage. Et souvent, seuls les clients mécontents prennent le temps d'écrire — ce qui fait baisser votre note.",
      "**La solution que nous avons construite pour nos clients :**",
      "1. **Un déclencheur automatique** — après une prestation, votre client reçoit un SMS ou flashe un QR code sur votre carte de visite.",
      "2. **Un filtre intelligent** — si le client est satisfait, il est redirigé vers Google pour laisser un avis 5★. Sinon, il arrive sur un formulaire privé où il peut s'exprimer sans impacter votre note publique.",
      "3. **Un tableau de bord** — vous voyez en temps réel le nombre d'avis collectés et l'évolution de votre note.",
      "Résultat : nos clients passent de 3,5★ à 5★ en 2 à 4 semaines, sans rien faire. Le système tourne tout seul.",
      "Vous voulez le même système ? Nous l'intégrons dans toutes nos formules Pro et Premium.",
    ],
  },
  {
    slug: "vitesse-site-critere-numero-1",
    category: "Site web",
    title: "Vitesse de site : le critère n°1 qui fait fuir vos clients (et que Google adore)",
    excerpt:
      "Un site qui met plus d'une seconde à charger, c'est 30% de visiteurs en moins. Voici pourquoi la vitesse est devenue le critère le plus important pour votre business.",
    image: "photo2",
    date: "3 juin 2026",
    readTime: "5 min",
    content: [
      "C'est un fait : personne n'attend plus. Quand un client clique sur votre site depuis Google, il s'attend à ce que la page s'affiche instantanément. Si ça prend plus d'une seconde, il repart.",
      "Et ce n'est pas juste une impression : Google le confirme. Le moteur de recherche utilise la vitesse de chargement comme critère de classement. Un site lent sera moins bien positionné, quel que soit son contenu.",
      "**Pourquoi la plupart des sites sont lents :**",
      "- **WordPress** : des plugins en cascade, un thème lourd, des images non optimisées. Résultat : 3 à 5 secondes de chargement.",
      "- **Hébergement mutualisé** : votre site partage un serveur avec 50 autres sites. Forcément, ça rame.",
      "- **Pas de mise en cache** : chaque visiteur recharge la page depuis zéro.",
      "**Comment nous construisons nos sites :**",
      "Nous utilisons Next.js, un framework React qui pré-construit les pages à l'avance. Concrètement, votre site existe déjà sous forme de fichiers HTML prêts à l'emploi. Quand un visiteur arrive, il voit la page instantanément — pas de temps de chargement, pas d'attente.",
      "Résultat : un score de 95+ sur Google PageSpeed, un bonus de classement dans les résultats, et des visiteurs qui restent sur votre site.",
      "Et contrairement à WordPress, pas de mise à jour à faire, pas de plugins à surveiller. Le site est stable, rapide, et le reste dans le temps.",
    ],
  },
  {
    slug: "google-my-business-fiche-negligee",
    category: "SEO",
    title: "Google My Business : la fiche que 90% des professionnels négligent",
    excerpt:
      "Votre fiche Google est souvent la première chose que vos prospects voient de vous. Pourtant, très peu de professionnels l'optimisent vraiment.",
    image: "photo3",
    date: "25 mai 2026",
    readTime: "4 min",
    content: [
      "Vous tapez 'avocat Paris' ou 'plombier Lyon' sur Google. Qu'est-ce qui apparaît en premier ? Ce n'est pas un site web, c'est une carte avec des fiches d'établissements. C'est ce qu'on appelle le 'top 3 local'.",
      "Si votre fiche Google My Business est mal renseignée, vous n'apparaissez pas dans ce top 3. Vous laissez des clients potentiels à vos concurrents sans même le savoir.",
      "**Les erreurs les plus courantes :**",
      "- **Catégorie mal choisie** — Google ne sait pas exactement ce que vous faites, il vous classe mal.",
      "- **Horaires incomplets** — un client arrive un dimanche, voit 'horaires non renseignés', il appelle ailleurs.",
      "- **Photos absentes** — les fiches avec photos reçoivent 40% de clics en plus.",
      "- **Avis non gérés** — des réponses automatiques ou pas de réponse du tout. Ça donne une impression d'abandon.",
      "**Ce que nous optimisons pour nos clients :**",
      "- Catégorie principale et secondaires parfaitement adaptées à votre métier",
      "- Descriptions riches en mots-clés locaux (ville, métier, spécialité)",
      "- Photos professionnelles du lieu et des réalisations",
      "- Réponses aux avis (positives et négatives) avec un ton adapté",
      "- Posts Google réguliers pour signaler à Google que votre fiche est active",
      "Le résultat : vous apparaissez dans le top 3 local pour les recherches de votre secteur, et vos prospects vous trouvent avant vos concurrents.",
    ],
  },
  {
    slug: "site-vitrine-ou-multipages",
    category: "Business",
    title: "Site vitrine ou site multipages : lequel choisir pour mon activité ?",
    excerpt:
      "Vous hésitez entre un site simple d'une page ou un site plus complet avec plusieurs rubriques ? Voici les critères pour faire le bon choix.",
    image: "photo4",
    date: "18 mai 2026",
    readTime: "4 min",
    content: [
      "C'est la première question que nos clients nous posent : 'J'ai besoin de combien de pages ?' La réponse dépend de votre activité, de vos objectifs et de vos clients.",
      "**Le site vitrine (1 page)** — Idéal pour :",
      "- Un professionnel qui veut une présence en ligne simple",
      "- Une activité où le bouche-à-oreille est le principal canal d'acquisition",
      "- Un budget serré (à partir de 1 000 €)",
      "- Vous voulez juste : présentation + contact + avis Google",
      "Le site vitrine est efficace si votre objectif est d'être trouvé sur Google et de donner une carte de visite numérique à vos clients.",
      "**Le site multipages** — Idéal pour :",
      "- Un professionnel qui veut montrer son expertise en détail",
      "- Un besoin de référencement avancé (chaque page cible des mots-clés différents)",
      "- Des services variés (chaque service mérite sa propre page)",
      "- Un blog pour attirer du trafic régulier",
      "Le site multipages coûte plus cher (à partir de 2 000 €) mais il est bien plus puissant pour le référencement et la crédibilité.",
      "**Notre conseil :** si vous débutez, commencez par un site vitrine bien fait. Vous pourrez toujours ajouter des pages plus tard. L'essentiel est d'avoir un site rapide, bien référencé, et qui inspire confiance.",
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}

export function getCategories(): string[] {
  return [...new Set(ARTICLES.map((a) => a.category))]
}

export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}