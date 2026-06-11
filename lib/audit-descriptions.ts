export type AuditTranslation = {
  title: string
  description: string
}

export const AUDIT_TRANSLATIONS: Record<string, AuditTranslation> = {
  "render-blocking-resources": {
    title: "Ressources bloquant l'affichage",
    description: "Certains fichiers CSS et JavaScript retardent l'affichage de votre page. Nous pouvons optimiser leur chargement pour que vos visiteurs voient le contenu plus rapidement.",
  },
  "uses-responsive-images": {
    title: "Images non adaptées à l'écran",
    description: "Vos images sont plus grandes que nécessaire. En les redimensionnant et en utilisant des formats modernes, nous pouvons réduire leur poids sans perte de qualité.",
  },
  "offscreen-images": {
    title: "Images hors-écran",
    description: "Des images invisibles au premier écran sont chargées trop tôt. Nous pouvons les charger au moment où l'utilisateur les voit, ce qui accélère l'affichage initial.",
  },
  "modern-image-formats": {
    title: "Formats d'image obsolètes",
    description: "L'utilisation de formats comme WebP ou AVIF réduit considérablement le poids des images. C'est l'un des leviers les plus efficaces pour améliorer vos performances.",
  },
  "uses-optimized-images": {
    title: "Images non optimisées",
    description: "Vos images ne sont pas compressées. Une simple optimisation peut réduire leur poids de 30 à 80 % sans perte de qualité visible.",
  },
  "total-byte-weight": {
    title: "Poids total de la page trop élevé",
    description: "Votre page pèse plus de 1,6 Mo. Un site plus léger se charge plus vite, particulièrement sur mobile et en 4G.",
  },
  "uses-text-compression": {
    title: "Compression Gzip/Brotli inactive",
    description: "Votre serveur n'envoie pas les fichiers compressés. Activer la compression peut réduire le poids de vos pages de 70 %.",
  },
  "unminified-javascript": {
    title: "JavaScript non compressé",
    description: "Les fichiers JavaScript non minifiés contiennent des espaces et commentaires inutiles. Nous pouvons automatiser cette optimisation.",
  },
  "unminified-css": {
    title: "CSS non compressé",
    description: "Vos fichiers CSS peuvent être allégés en supprimant les espaces et commentaires superflus, ce qui accélère leur téléchargement.",
  },
  "unused-javascript": {
    title: "JavaScript inutilisé",
    description: "Du code JS est chargé mais jamais exécuté. En ne chargeant que ce qui est nécessaire, nous pouvons réduire le temps de chargement.",
  },
  "unused-css-rules": {
    title: "CSS inutilisé",
    description: "Une partie de votre CSS ne sert pas sur cette page. Nous pouvons extraire et ne charger que les styles réellement nécessaires.",
  },
  "server-response-time": {
    title: "Temps de réponse serveur trop long",
    description: "Votre serveur met plus de 200 ms à répondre. Nous pouvons optimiser votre hébergement et la configuration serveur pour améliorer ce délai.",
  },
  "first-contentful-paint": {
    title: "Premier affichage trop lent (FCP)",
    description: "Le premier contenu visible met trop de temps à apparaître. Nous pouvons prioriser les ressources critiques pour un affichage plus rapide.",
  },
  "largest-contentful-paint": {
    title: "Contenu principal trop long à s'afficher (LCP)",
    description: "L'élément le plus important de votre page met du temps à s'afficher. C'est un critère clé pour Google et pour l'expérience de vos visiteurs.",
  },
  "cumulative-layout-shift": {
    title: "Instabilité visuelle excessive (CLS)",
    description: "Des éléments de votre page bougent pendant le chargement, ce qui peut faire cliquer vos visiteurs au mauvais endroit.",
  },
  "first-meaningful-paint": {
    title: "Contenu utile trop long à apparaître",
    description: "Le contenu principal de votre page n'est pas visible assez rapidement. Nous pouvons optimiser l'ordre de chargement des éléments.",
  },
  "speed-index": {
    title: "Indice de vitesse (Speed Index)",
    description: "La progression visuelle du chargement de votre page n'est pas optimale. Un affichage progressif améliore la perception de vos visiteurs.",
  },
  "interactive": {
    title: "Temps avant interactivité (TTI)",
    description: "Vos visiteurs doivent attendre avant de pouvoir interagir avec la page. Nous pouvons réduire ce délai en optimisant le JavaScript.",
  },
  "total-blocking-time": {
    title: "Temps de blocage total (TBT)",
    description: "Le navigateur est bloqué par des tâches longues, empêchant l'utilisateur d'interagir avec la page.",
  },
  "bootup-time": {
    title: "Temps d'exécution JavaScript trop long",
    description: "Vos scripts JS mettent trop de temps à s'exécuter. En les optimisant, nous rendons votre site plus réactif.",
  },
  "mainthread-work-breakdown": {
    description: "Le thread principal de votre navigateur est surchargé. Nous pouvons répartir les tâches plus efficacement pour un chargement plus fluide.",
    title: "Surcharge du thread principal",
  },
  "dom-size": {
    title: "DOM trop volumineux",
    description: "Votre page contient trop d'éléments HTML, ce qui ralentit le navigateur. Un code plus léger s'affiche et se manipule plus rapidement.",
  },
  "critical-request-chains": {
    title: "Chaînes de requêtes critiques trop longues",
    description: "Le chargement de vos ressources dépend d'une série de requêtes qui ralentissent l'affichage. Nous pouvons réduire cette cascade.",
  },
  "uses-rel-preload": {
    title: "Préchargement non optimisé",
    description: "Certaines ressources importantes ne sont pas préchargées. En priorisant les bons éléments, nous accélérons le rendu initial.",
  },
  "uses-rel-prefetch": {
    title: "Préchargement de navigation non utilisé",
    description: "Les pages suivantes ne sont pas préchargées. Cette technique permet une navigation quasi-instantanée pour vos visiteurs.",
  },
  "efficient-animated-content": {
    title: "Contenu animé inefficace",
    description: "Vos animations utilisent un format lourd. Le GIF peut être remplacé par du WebM ou des animations CSS plus légères.",
  },
  "video-formats": {
    title: "Formats vidéo inefficaces",
    description: "Vos vidéos ne sont pas dans un format optimisé. Un encodage adapté peut réduire leur poids sans perte de qualité.",
  },
  "third-party-summary": {
    title: "Trop de ressources tierces",
    description: "Des services externes (analytics, réseaux sociaux, publicités) ralentissent votre site. Nous pouvons les charger différemment pour limiter leur impact.",
  },
  "third-party-facades": {
    title: "Widgets tiers non optimisés",
    description: "Les intégrations tierces (chat, vidéos, maps) sont chargées immédiatement. Nous pouvons les différer au moment où l'utilisateur interagit.",
  },
  "uses-long-cache-ttl": {
    title: "Cache navigateur sous-optimisé",
    description: "Vos ressources statiques ne sont pas mises en cache assez longtemps. Un meilleur cache permet un chargement instantané au retour de vos visiteurs.",
  },
  "timing-budget": {
    title: "Budget de performance dépassé",
    description: "Votre page dépasse les seuils de performance recommandés. Nous pouvons vous aider à identifier et corriger les éléments les plus coûteux.",
  },
  "font-display": {
    title: "Polices non optimisées",
    description: "Les polices web ne sont pas configurées pour un affichage rapide. Nous pouvons éviter que les textes soient invisibles pendant le chargement.",
  },
  "no-document-write": {
    title: "Document.write() utilisé",
    description: "Cette méthode JavaScript obsolète bloque le rendu de la page. Nous pouvons la remplacer par des alternatives modernes.",
  },
  "meta-description": {
    title: "Meta description manquante",
    description: "Votre page n'a pas de meta description. Cela impacte votre taux de clic dans les résultats de recherche.",
  },
  "http-status-code": {
    title: "Code HTTP incorrect",
    description: "Votre page retourne un code HTTP qui peut perturber les moteurs de recherche. Nous pouvons vérifier et corriger la configuration.",
  },
  "is-crawlable": {
    title: "Page non indexable par Google",
    description: "Les moteurs de recherche ne peuvent pas explorer correctement votre page. Votre référencement en est directement impacté.",
  },
  "robots-txt": {
    title: "Robots.txt bloquant",
    description: "Votre fichier robots.txt peut empêcher Google d'explorer certaines pages importantes.",
  },
  "plugins": {
    title: "Plugins incompatibles",
    description: "Votre page utilise des technologies (Flash, Silverlight) qui ne fonctionnent pas sur mobile et ne sont plus supportées.",
  },
  "viewport": {
    title: "Viewport non configuré",
    description: "Votre page n'est pas optimisée pour les écrans mobiles. C'est essentiel pour le référencement local et l'expérience utilisateur.",
  },
  "tap-targets": {
    title: "Éléments tactiles trop petits",
    description: "Les boutons et liens sont trop proches ou trop petits sur mobile. Vos visiteurs peuvent cliquer sur le mauvais élément.",
  },
  "content-width": {
    title: "Contenu plus large que l'écran",
    description: "Votre page dépasse la largeur de l'écran sur mobile, forçant l'utilisateur à zoomer et défiler horizontalement.",
  },
  "color-contrast": {
    title: "Contraste des couleurs insuffisant",
    description: "Le texte manque de contraste par rapport à l'arrière-plan, ce qui le rend difficile à lire pour certains visiteurs.",
  },
  "image-alt": {
    title: "Attributs alt manquants",
    description: "Des images n'ont pas d'attribut alt. Cela impacte l'accessibilité et le référencement de vos images dans Google.",
  },
  "document-title": {
    title: "Titre de page manquant ou trop court",
    description: "Votre page n'a pas de titre ou il est trop court. Le titre est le premier élément vu dans les résultats de recherche.",
  },
  "html-has-lang": {
    title: "Attribut lang manquant",
    description: "La balise HTML n'a pas d'attribut lang. Cela aide Google à comprendre la langue de votre site pour un meilleur référencement.",
  },
  "link-text": {
    title: "Texte de lien non descriptif",
    description: "Certains liens utilisent des textes vagues comme 'cliquez ici'. Des textes de lien clairs améliorent le SEO et l'accessibilité.",
  },
  "valid-source-maps": {
    title: "Sourcemaps incorrectes",
    description: "Les fichiers de correspondance (sourcemaps) de votre code sont invalides. Cela n'impacte pas vos visiteurs mais complique le débogage.",
  },
  "uses-http2": {
    title: "HTTP/2 non activé",
    description: "Votre serveur n'utilise pas HTTP/2. Ce protocole moderne accélère considérablement le chargement des ressources multiples.",
  },
  "no-vulnerable-libraries": {
    title: "Bibliothèques JavaScript obsolètes",
    description: "Votre site utilise des versions de bibliothèques contenant des failles de sécurité connues. Une mise à jour est recommandée.",
  },
  "user-timings": {
    title: "Marqueurs de performance personnalisés absents",
    description: "L'absence de métriques personnalisées rend difficile le suivi précis de la performance de vos fonctionnalités clés.",
  },
  "network-rtt": {
    title: "Temps d'allers-retours réseau élevé",
    description: "La latence réseau entre vos visiteurs et votre serveur est trop élevée. Nous pouvons optimiser la localisation de votre hébergement.",
  },
  "network-server-latency": {
    title: "Latence serveur excessive",
    description: "Votre serveur met du temps à répondre aux requêtes réseau. Une optimisation de la configuration peut résoudre ce problème.",
  },
  "performance-budget": {
    title: "Budget de performance dépassé",
    description: "Votre page dépasse les limites recommandées pour plusieurs métriques de performance. Nous pouvons prioriser les corrections les plus impactantes.",
  },
  "non-composited-animations": {
    title: "Animations non optimisées",
    description: "Certaines animations ne sont pas accélérées par le GPU, ce qui peut causer des saccades visibles.",
  },
  "duplicated-javascript": {
    title: "JavaScript dupliqué",
    description: "Le même code JavaScript est chargé plusieurs fois. Nous pouvons mutualiser ces ressources pour alléger vos pages.",
  },
  "legacy-javascript": {
    title: "JavaScript obsolète",
    description: "Du code JavaScript pour anciens navigateurs est envoyé à tous les visiteurs, même ceux utilisant des navigateurs modernes. Nous pouvons le conditionner.",
  },
  "preload-lcp-image": {
    title: "Image principale non préchargée",
    description: "L'image la plus importante de votre page n'est pas préchargée. En la chargeant plus tôt, nous améliorons le temps d'affichage.",
  },
  "largest-contentful-paint-image": {
    title: "Image LCP trop lente",
    description: "L'image qui constitue le plus grand élément de votre page met trop de temps à charger. C'est un levier important pour la performance perçue.",
  },
}

export function getAuditTranslation(id: string): AuditTranslation | null {
  return AUDIT_TRANSLATIONS[id] || null
}
