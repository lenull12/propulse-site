"use client"

import { ParticlesBackground } from "./particles-background"

const ITEMS = [
  {
    number: "01",
    title: <>Un site qui vous rend <span className="animate-shimmer-accent">visible</span></>,
    text: "Site optimisé SEO local + fiche Google My Business structurée. Quand un prospect cherche votre métier dans votre ville, c'est vous qu'il trouve — pas vos concurrents.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <clipPath id="mapClip">
            <rect x="30" y="20" width="140" height="120" rx="4" />
          </clipPath>
        </defs>
        <rect x="30" y="20" width="140" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <g clipPath="url(#mapClip)">
          <circle cx="100" cy="80" r="8" fill="currentColor" opacity="0.8">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <rect x="40" y="35" width="30" height="4" rx="2" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="45" width="50" height="4" rx="2" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.2s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="55" width="40" height="4" rx="2" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.4s" repeatCount="indefinite" />
          </rect>
          <rect x="120" y="100" width="40" height="4" rx="2" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="120" y="110" width="30" height="4" rx="2" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.8s" repeatCount="indefinite" />
          </rect>
          <rect x="120" y="120" width="20" height="4" rx="2" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="1s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    ),
  },
  {
    number: "02",
    title: <>Une vitrine qui inspire <span className="animate-shimmer-accent">confiance</span></>,
    text: "Design premium, témoignages visibles, présentation claire de votre savoir-faire. En 3 secondes, le prospect sait qui vous êtes et pourquoi vous choisir.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <path d="M 100 20 L 150 40 L 150 90 Q 150 130 100 145 Q 50 130 50 90 L 50 40 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <path d="M 100 35 L 135 50 L 135 85 Q 135 115 100 128 Q 65 115 65 85 L 65 50 Z" fill="currentColor" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2s" repeatCount="indefinite" />
        </path>
        <rect x="90" y="70" width="20" height="25" rx="3" fill="currentColor" opacity="0.6" />
        <path d="M 94 70 L 94 62 Q 94 55 100 55 Q 106 55 106 62 L 106 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="80" r="3" fill="#050505" />
        <rect x="98" y="82" width="4" height="6" fill="#050505" />
        <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0">
          <animate attributeName="y1" values="40;120;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="40;120;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0">
          <animate attributeName="y1" values="50;130;50" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="50;130;50" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.3;0" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </line>
      </svg>
    ),
  },
  {
    number: "03",
    title: <>Des avis qui travaillent <span className="animate-shimmer-accent">pour vous</span></>,
    text: "Système automatisé de collecte d'avis : vos clients satisfaits laissent une évaluation, les insatisfaits sont traités en privé. Votre note Google monte, votre taux de conversion aussi.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <circle cx="100" cy="80" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <circle cx="100" cy="80" r="4" fill="currentColor" opacity="0.6">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <g>
          <line x1="100" y1="80" x2="145" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0s" repeatCount="indefinite" />
          </line>
          <polygon points="150,52 148,60 142,56" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0s" repeatCount="indefinite" />
          </polygon>
        </g>
        <g>
          <line x1="100" y1="80" x2="130" y2="125" stroke="currentColor" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </line>
          <polygon points="134,128 126,130 128,122" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </polygon>
        </g>
        <g>
          <line x1="100" y1="80" x2="70" y2="125" stroke="currentColor" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </line>
          <polygon points="66,128 74,130 72,122" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </polygon>
        </g>
        <g>
          <line x1="100" y1="80" x2="55" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.9s" repeatCount="indefinite" />
          </line>
          <polygon points="50,52 52,60 58,56" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.9s" repeatCount="indefinite" />
          </polygon>
        </g>
        <circle cx="45" cy="55" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="15;45;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="155" cy="55" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="15;45;15" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
]

export function Capabilities() {
  return (
    <section className="scroll-reveal relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden lg:py-32 border-t border-white/5">
      <ParticlesBackground count={50} connectDistance={100} color="200,240,0" />
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent/40" />
            <p className="text-sm font-medium tracking-wide text-accent font-sans">Nos solutions</p>
          </div>
          <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground">
            Tout ce qu&apos;il vous faut.<br />
            <span className="text-white/40">Rien de superflu.</span>
          </h2>
        </div>

        <div>
          {ITEMS.map((item) => (
            <div key={item.number} className="group relative">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-16 border-b border-white/5">
                <div className="shrink-0">
                  <span className="font-mono text-sm text-white/40">{item.number}</span>
                </div>
                <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-mono font-black mb-4 text-foreground transition-transform duration-500 group-hover:translate-x-2">
                      {item.title}
                    </h3>
                    <p className="text-base lg:text-lg text-white/50 leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <div className="w-48 h-40 text-white/70">
                      {item.svg}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
