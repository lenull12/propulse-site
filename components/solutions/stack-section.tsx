"use client"

import { useState } from "react"
import Image from "next/image"

interface StackItem {
  name: string
  badge: string
  icon: string
  desc: string
  detail: string
  benefits: string[]
}

const STACK: StackItem[] = [
  {
    name: "Next.js",
    badge: "Framework",
    icon: "/svg/nextdotjs.svg",
    desc:
      "Next.js est bien plus qu'un framework React : c'est le standard de facto pour les sites web modernes. Utilisé par TikTok, Twitch, Notion et des milliers d'entreprises, il combine génération de pages statiques ultra-rapides et rendu serveur dynamique selon les besoins de chaque page. Résultat : votre site charge en moins d'une seconde, Google le référence parfaitement (SEO natif sans plugin), et l'''expérience développeur permet de livrer plus vite, sans sacrifier la qualité. Pas de CMS lent, pas de plugins qui ralentissent — juste du code propre et efficace.",
    detail:
      "Next.js permet de générer des pages statiques ultra-rapides tout en gardant la flexibilité du rendu serveur. Résultat : des sites qui chargent instantanément, un SEO parfait, et une expérience développeur incomparable.",
    benefits: ["Pages statiques ultra-rapides", "SEO parfait dès la conception", "Scalable sans réécriture"],
  },
  {
    name: "React",
    badge: "Bibliothèque",
    icon: "/svg/react.svg",
    desc:
      "React est la bibliothèque JavaScript la plus utilisée au monde, créée et maintenue par Meta (Facebook, Instagram, WhatsApp). Son modèle à composants permet de construire des interfaces riches et interactives sans rechargement de page, exactement comme les applis que vos clients utilisent tous les jours. Netflix, Airbnb, Uber, Pinterest — tous font confiance à React pour gérer des millions d'''utilisateurs simultanés sans ralentir. Pour votre site, \u00e7a se traduit par une navigation fluide, des pages qui réagissent instantanément, et une base de code maintenable dans la durée.",
    detail:
      "React permet de créer des interfaces utilisateur complexes sans rechargement de page. Chaque élément est un composant réutilisable, ce qui rend le code plus propre, plus maintenable et plus rapide à faire évoluer.",
    benefits: ["UI réactive sans rechargement", "Composants réutilisables", "\u00c9cosystème mature et fiable"],
  },
  {
    name: "TypeScript",
    badge: "Langage",
    icon: "/svg/typescript.svg",
    desc:
      "TypeScript est aujourd'''hui le langage obligatoire dans toute la tech. Créé par Microsoft, il ajoute du typage statique à JavaScript — concrètement, \u00e7a signifie que des bugs entiers disparaissent avant m\u00eame d'''arriver en production. Microsoft (Office 365, Teams), Google, Airbnb et Slack ont converti des millions de lignes de code vers TypeScript pour cette raison. Pour vous, c'''est la garantie d'''un site fiable, sans bug surprise, et d'''une maintenance sereine : votre site continue de fonctionner parfaitement longtemps après sa mise en ligne.",
    detail:
      "TypeScript ajoute du typage statique à JavaScript. Concrètement : moins de bugs en production, un code qui se documente tout seul, et une maintenance sereine sur le long terme.",
    benefits: ["Zéro bug de type en production", "Code auto-documenté", "Maintenance sereine"],
  },
  {
    name: "Tailwind CSS",
    badge: "CSS",
    icon: "/svg/tailwindcss.svg",
    desc:
      "Tailwind CSS change complètement la fa\u00e7on dont on con\u00e7oit le design web. Fini les fichiers CSS interminables, les conflits de classes et les styles inutilisés qui ralentissent le chargement. Avec Tailwind, chaque style s'''applique directement dans le HTML via des classes utilitaires, ce qui permet de créer un design unique, cohérent et parfaitement responsive sans jamais écrire une ligne de CSS personnalisé. Le résultat : un développement plus rapide, un site plus léger, et une liberté de design totale.",
    detail:
      "Tailwind CSS permet de créer des designs uniques directement dans le HTML. Fini les fichiers CSS interminables, les conflits de classes, et les styles inutilisés qui ralentissent le chargement.",
    benefits: ["Design unique et cohérent", "Pas de CSS inutilisé", "Développement rapide"],
  },
  {
    name: "Vercel",
    badge: "Hébergement",
    icon: "/svg/vercel.svg",
    desc:
      "Vercel est la plateforme d'''hébergement créée par les auteurs de Next.js, et c'''est aujourd'''hui le standard pour les sites modernes. Déploiement en un clic, CDN mondial intégré, scaling automatique : votre site supporte aussi bien 10 visiteurs que 10 000 sans aucun réglage. La NBA, Washington Post et Sony font confiance à Vercel pour leur fiabilité. Plus besoin de gérer des serveurs, des certificats SSL ou des mises à jour — tout est automatisé, vous vous concentrez sur votre activité.",
    detail:
      "Vercel est la plateforme d'''hébergement créée par les auteurs de Next.js. Déploiement en un clic, scaling automatique, CDN mondial, et une fiabilité qui fait tourner des sites comme NBA et Washington Post.",
    benefits: ["Déploiement instantané", "CDN mondial intégré", "Fiabilité professionnelle"],
  },
  {
    name: "Lighthouse",
    badge: "Performance",
    icon: "/svg/lighthouse.svg",
    desc:
      "Google Lighthouse est l'''outil officiel de Google pour mesurer la qualité d'''un site web : performance, accessibilité, SEO et bonnes pratiques. Un score Lighthouse 95+ est un signal fort envoyé à Google pour le classement dans les résultats de recherche, et c'''est aussi la garantie d'''une expérience fluide pour vos visiteurs — pages qui chargent en moins d'''une seconde, navigation sans accroc, site utilisable par tous. Avec notre stack, vous atteignez ce score sans effort, et on vous fournit un rapport complet à chaque livraison.",
    detail:
      "Google Lighthouse mesure la performance, l'''accessibilité et le SEO de votre site. Avec notre stack, vous décrochez 95+ sans effort — un signal fort pour Google et une expérience fluide pour vos visiteurs.",
    benefits: ["Meilleur classement Google", "Expérience utilisateur fluide", "Audit automatisé inclus"],
  },
]

export function StackSection() {
  const [selected, setSelected] = useState<StackItem>(STACK[0])

  return (
    <div className="lg:grid lg:grid-cols-[2fr_5fr] lg:gap-12 lg:items-start">
      {/* Liste verticale de cartes */}
      <div className="space-y-3">
        {STACK.map((s, i) => (
          <div
            key={s.name}
            onClick={() => setSelected(s)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-300 ${
              selected.name === s.name
                ? "border-accent/30 bg-accent/[0.03]"
                : "border-white/10 bg-white/[0.02] hover:border-accent/30"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src={s.icon}
                alt={s.name}
                width={20}
                height={20}
                className="w-5 h-5 brightness-0 invert"
              />
            </div>
            <span className="font-mono text-sm font-semibold text-foreground">{s.name}</span>
            <span className="ml-auto font-mono text-[10px] text-white/30">{s.badge}</span>
          </div>
        ))}
      </div>

      {/* Panneau détail — desktop */}
      <div className="hidden lg:block">
        <div className="sticky top-32 rounded-xl border border-accent/10 bg-accent/[0.02] p-8 lg:p-10">
          <div className="mb-5 flex items-center gap-3 border-b border-white/5 pb-5">
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                src={selected.icon}
                alt={selected.name}
                width={24}
                height={24}
                className="w-6 h-6 brightness-0 invert"
              />
            </div>
            <div>
              <span className="font-mono text-base font-semibold text-foreground">{selected.name}</span>
              <span className="block font-mono text-xs text-white/30">{selected.badge}</span>
            </div>
          </div>
          <p className="mb-4 text-base leading-relaxed text-white/80">{selected.detail}</p>
          <p className="mb-5 text-base leading-relaxed text-gray-400">{selected.desc}</p>
          <div className="flex flex-wrap gap-2">
            {selected.benefits.map((b) => (
              <span
                key={b}
                className="rounded-full border border-accent/10 bg-accent/5 px-3 py-1 font-mono text-xs text-accent/70"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau détail — mobile */}
      <div className="mt-5 lg:hidden">
        <div className="rounded-xl border border-accent/10 bg-accent/[0.02] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
              <Image
                src={selected.icon}
                alt={selected.name}
                width={20}
                height={20}
                className="w-5 h-5 brightness-0 invert"
              />
            </div>
            <span className="font-mono text-sm font-semibold text-foreground">{selected.name}</span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-white/80">{selected.detail}</p>
          <p className="mb-4 text-sm leading-relaxed text-gray-400">{selected.desc}</p>
          <div className="flex flex-wrap gap-2">
            {selected.benefits.map((b) => (
              <span
                key={b}
                className="rounded-full border border-accent/10 bg-accent/5 px-2.5 py-1 font-mono text-[11px] text-accent/70"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
