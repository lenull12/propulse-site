Tu es un développeur frontend React/Next.js. Ta tâche : créer UN SEUL composant et modifier UN SEUL fichier pour ajouter une section "product cards" Webflow-style à la homepage de PropulseDev.

RÈGLES DU PROJET (strictes)
- Pas de point-virgule
- Exports nommés (export function X), pas de default export
- Pas de commentaires dans le code
- Privilégier classes Tailwind au CSS custom
- next/link pour navigation interne
- Composant client → "use client" en haut
- Font: font-mono = JetBrains Mono, font-sans = Inter
- Palette: bg = #050505, text = #ffffff, accent = #c8f000, accent-foreground = #050505, surfaces = #111118
- Pas de balise <style> inline — utilise les animations Tailwind ou classes CSS déjà dans globals.css
- Animations existantes dans globals.css: animate-fade-up, animate-shimmer-accent, scroll-reveal, animate-float, animate-pulse-glow, cta-arrow
- Le projet a déjà un composant ParticlesBackground et useStaggerReveal

═══════════════════════════════════
FICHIER À CRÉER
═══════════════════════════════════
PATH: C:/Users/Admin/Documents/Projects/PropulseDev/components/landing/product-cards.tsx

Structure du composant:

"use client"

import Link from "next/link"
import { ParticlesBackground } from "./particles-background"

const CARDS = [
  {
    number: "01",
    title: "Site moderne",
    subtitle: "Stack Next.js, vitesse 95+/100, design sur-mesure.",
    description: "Un site qui charge en moins d'une seconde et qui inspire confiance dès les 3 premières secondes. Pas de template, pas de builder — du code propre, pensé pour convertir.",
    cta: "Voir nos sites",
    href: "/solutions/creation-site-web",
    featured: true,
  },
  {
    number: "02",
    title: "Chatbot IA intégré",
    subtitle: "Répond à vos clients 24h/24, même absent du cabinet.",
    description: "Un assistant intelligent directement sur votre site qui qualifie les demandes, répond aux questions fréquentes et transmet les rendez-vous qualifiés dans votre boîte mail.",
    cta: "Voir la démo",
    href: "/solutions",
    featured: false,
  },
  {
    number: "03",
    title: "Clé en main",
    subtitle: "Hébergement, sécurité, mises à jour — zéro maintenance.",
    description: "Vous n'avez rien à gérer. Domaine, hébergement, certificat SSL, sauvegardes : tout est inclus et on s'occupe de tout pendant un an.",
    cta: "Voir les inclus",
    href: "/solutions/creation-site-web",
    featured: false,
  },
]

export function ProductCards() {
  return (
    <section className="scroll-reveal relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden lg:py-32 border-t border-white/5">
      <ParticlesBackground count={40} connectDistance={100} color="200,240,0" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent/40" />
            <p className="text-sm font-medium tracking-wide text-accent font-sans">Ce que vous obtenez</p>
          </div>
          <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground">
            Tout est inclus.<br />
            <span className="text-white/40">Zéro mauvaise surprise.</span>
          </h2>
        </div>

        {/* Grid 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card) => (
            <div
              key={card.number}
              className={`group relative flex flex-col rounded-[16px] border p-8 md:p-10 transition-all duration-500 hover:-translate-y-1.5 ${
                card.featured
                  ? "border-accent/20 bg-[#0d0d08] shadow-[0_12px_40px_rgba(200,240,0,0.05)]"
                  : "border-white/5 bg-[#0a0a0a] hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(200,240,0,0.08)]"
              }`}
            >
              {/* Numéro */}
              <div className="mb-6 font-mono text-5xl font-black text-white/10">
                {card.number}
              </div>

              {/* Visuel SVG */}
              <div className="mb-8 w-full h-40 flex items-center justify-center">
                {card.number === "01" && <BrowserMockup />}
                {card.number === "02" && <ChatbotConversation />}
                {card.number === "03" && <IconSequence />}
              </div>

              {/* Titre */}
              <h3 className="mb-2 font-mono text-2xl font-bold text-foreground">
                {card.title}
              </h3>

              {/* Sous-titre bénéfice */}
              <p className="mb-4 text-sm font-medium text-accent">
                {card.subtitle}
              </p>

              {/* Description */}
              <p className="mb-8 flex-1 text-sm font-light leading-relaxed text-gray-400">
                {card.description}
              </p>

              {/* CTA */}
              <Link
                href={card.href}
                className={`inline-flex items-center gap-2 self-start rounded-full border px-5 py-2 text-xs font-semibold transition-all ${
                  card.featured
                    ? "border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_8px_20px_rgba(200,240,0,0.3)]"
                    : "border-white/10 text-white/70 hover:text-white hover:border-accent/40"
                }`}
              >
                {card.cta}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cta-arrow">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrowserMockup() {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect x="20" y="10" width="240" height="160" rx="8" fill="#0d0d0d" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="20" y="10" width="240" height="28" rx="8" fill="none" />
      <rect x="20" y="28" width="240" height="10" fill="#0d0d0d" />
      <circle cx="36" cy="24" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="24" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="64" cy="24" r="4" fill="currentColor" opacity="0.3" />
      <rect x="80" y="18" width="120" height="12" rx="6" fill="currentColor" opacity="0.06" />
      <rect x="40" y="55" width="120" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="40" y="70" width="160" height="6" rx="3" fill="currentColor" opacity="0.08" />
      <rect x="40" y="85" width="100" height="6" rx="3" fill="currentColor" opacity="0.08" />
      <rect x="40" y="105" width="200" height="50" rx="5" fill="#c8f000" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <circle cx="230" cy="130" r="5" fill="#c8f000" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function ChatbotConversation() {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <g opacity="0">
        <rect x="30" y="20" width="160" height="28" rx="12" fill="currentColor" opacity="0.08" />
        <rect x="38" y="28" width="100" height="4" rx="2" fill="currentColor" opacity="0.15" />
        <rect x="38" y="36" width="80" height="4" rx="2" fill="currentColor" opacity="0.1" />
        <animate attributeName="opacity" values="0;1;1" dur="4s" begin="0s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.15;1" />
      </g>
      <g opacity="0">
        <rect x="100" y="62" width="150" height="28" rx="12" fill="#c8f000" opacity="0.15" />
        <rect x="112" y="70" width="110" height="4" rx="2" fill="#c8f000" opacity="0.3" />
        <rect x="112" y="78" width="60" height="4" rx="2" fill="#c8f000" opacity="0.2" />
        <animate attributeName="opacity" values="0;1;1" dur="4s" begin="1.2s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.15;1" />
      </g>
      <g opacity="0">
        <rect x="30" y="104" width="180" height="40" rx="12" fill="currentColor" opacity="0.08" />
        <rect x="38" y="112" width="140" height="4" rx="2" fill="currentColor" opacity="0.15" />
        <rect x="38" y="120" width="120" height="4" rx="2" fill="currentColor" opacity="0.1" />
        <rect x="38" y="128" width="160" height="4" rx="2" fill="currentColor" opacity="0.1" />
        <circle cx="190" cy="124" r="8" fill="#c8f000" opacity="0.2" />
        <polyline points="186,124 189,127 194,121" fill="none" stroke="#c8f000" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <animate attributeName="opacity" values="0;1;1" dur="4s" begin="2.4s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.15;1" />
      </g>
    </svg>
  )
}

function IconSequence() {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <g>
        <rect x="55" y="55" width="28" height="24" rx="5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.9;0.9" dur="6s" begin="0s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
        </rect>
        <path d="M 62 55 L 62 47 Q 62 39 69 39 Q 76 39 76 47 L 76 55" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.9;0.9" dur="6s" begin="0s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
        </path>
      </g>
      <line x1="95" y1="67" x2="125" y2="67" stroke="currentColor" strokeWidth="1.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.5;0.5" dur="6s" begin="1.5s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
      </line>
      <polyline points="120,63 126,67 120,71" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.5;0.5" dur="6s" begin="1.5s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
      </polyline>
      <g>
        <path d="M 155 75 Q 155 65 165 62 Q 172 55 182 58 Q 192 55 198 62 Q 208 62 208 72 Q 208 78 202 80 L 158 80 Q 150 80 150 75 Q 150 67 155 75 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.9;0.9" dur="6s" begin="2s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
        </path>
      </g>
      <line x1="215" y1="67" x2="245" y2="67" stroke="currentColor" strokeWidth="1.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.5;0.5" dur="6s" begin="3.5s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
      </line>
      <polyline points="240,63 246,67 240,71" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.5;0.5" dur="6s" begin="3.5s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
      </polyline>
      <g>
        <circle cx="260" cy="67" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.9;0.9" dur="6s" begin="4s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
          <animate attributeName="stroke" values="currentColor;#c8f000;#c8f000" dur="6s" begin="4s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
        </circle>
        <polyline points="254,67 258,71 266,63" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
          <animate attributeName="opacity" values="0.3;1;1" dur="6s" begin="4.5s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
          <animate attributeName="stroke" values="currentColor;#c8f000;#c8f000" dur="6s" begin="4.5s" repeatCount="indefinite" fill="freeze" keyTimes="0;0.1;1" />
        </polyline>
      </g>
    </svg>
  )
}

═══════════════════════════════════
FICHIER À MODIFIER
═══════════════════════════════════
PATH: C:/Users/Admin/Documents/Projects/PropulseDev/app/page.tsx

1. Ajouter l'import: import { ProductCards } from "@/components/landing/product-cards"
   (à ajouter avec les autres imports de landing)
2. Insérer <ProductCards /> dans le <main>, APRÈS <Capabilities /> et AVANT <LiveMetrics />

La section modifiée du <main> doit être:
        <Hero />
        <MarqueeTech />
        <Problem />
        <Capabilities />
        <ProductCards />
        <LiveMetrics />

IMPORTANT: ne touche à RIEN d'autre dans page.tsx. Juste l'import et l'insertion du composant.

═══════════════════════════════════
VÉRIFICATION
═══════════════════════════════════
Après avoir créé et modifié les fichiers, fais un build pour vérifier que tout compile:
cd C:/Users/Admin/Documents/Projects/PropulseDev && npx next build 2>&1 | tail -25

Le build doit passer sans erreur. Si erreur, corrige-la.

Réponds en français avec un résumé de ce que tu as fait.
