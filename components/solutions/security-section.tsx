"use client"

const ITEMS = [
  {
    num: "01",
    title: "HTTPS & SSL inclus",
    desc: "Certificat automatique renouvelé sans intervention. Données chiffrées de bout en bout. Le cadenas vert s'affiche, Google valorise ce signal de confiance. Aucune manipulation technique requise.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M100 25 L145 45 L145 90 Q145 125 100 138 Q55 125 55 90 L55 45 Z" fill="url(#shieldGrad)" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <path d="M100 30 L138 48 L138 85 Q138 115 100 128 Q62 115 62 85 L62 48 Z" fill="currentColor" opacity="0.04" />
        <rect x="88" y="68" width="24" height="28" rx="4" fill="currentColor" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </rect>
        <path d="M94 68 L94 58 Q94 48 100 48 Q106 48 106 58 L106 68" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="100" cy="80" r="3" fill="#050505" />
        <rect x="98" y="82" width="4" height="6" fill="#050505" />
        <g opacity="0.3">
          <line x1="45" y1="30" x2="55" y2="40" stroke="currentColor" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="0s" repeatCount="indefinite" />
          </line>
          <line x1="155" y1="30" x2="145" y2="40" stroke="currentColor" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </line>
          <line x1="35" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </line>
          <line x1="165" y1="55" x2="150" y2="55" stroke="currentColor" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="0.9s" repeatCount="indefinite" />
          </line>
        </g>
        <circle cx="100" cy="150" r="3" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Protection Cloudflare",
    desc: "Votre site est distribué sur 330+ data centers dans le monde. Pare-feu applicatif, protection DDoS, cache intelligent. Les attaques sont bloquées avant d'atteindre votre site — sans que vous ayez à lever le petit doigt.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <circle cx="100" cy="75" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="100" cy="75" r="5" fill="currentColor" opacity="0.3">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
        </circle>
        <g>
          <line x1="100" y1="75" x2="155" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="160" cy="37" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="0s" repeatCount="indefinite" />
          </circle>
          <circle cx="160" cy="37" r="2" fill="currentColor" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="0s" repeatCount="indefinite" />
          </circle>
        </g>
        <g>
          <line x1="100" y1="75" x2="140" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="145" cy="125" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25">
            <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="145" cy="125" r="2" fill="currentColor" opacity="0.25">
            <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
          </circle>
        </g>
        <g>
          <line x1="100" y1="75" x2="60" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="55" cy="125" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25">
            <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="125" r="2" fill="currentColor" opacity="0.25">
            <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </g>
        <g>
          <line x1="100" y1="75" x2="45" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="40" cy="37" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="37" r="2" fill="currentColor" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
          </circle>
        </g>
        <rect x="75" y="142" width="50" height="4" rx="2" fill="currentColor" opacity="0.1">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="85" y="150" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.3;0.08" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </rect>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Zéro vulnérabilité",
    desc: "Pas de WordPress, pas de plugins tiers, pas de failles connues. Chaque ligne de code est audité, signé et déployé via une pipeline sécurisée. Fini les mises à jour de sécurité urgentes un dimanche soir — votre site reste sûr sans que vous y pensiez.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <rect x="30" y="40" width="140" height="100" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
        <path d="M100 25 L145 45 L145 60 Q145 70 100 75 Q55 70 55 60 L55 45 Z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
        <rect x="45" y="60" width="110" height="6" rx="2" fill="currentColor" opacity="0.1">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="45" y="72" width="80" height="6" rx="2" fill="currentColor" opacity="0.08" />
        <rect x="45" y="84" width="95" height="6" rx="2" fill="currentColor" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.25;0.08" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
        </rect>
        <rect x="45" y="96" width="60" height="6" rx="2" fill="currentColor" opacity="0.06" />
        <g>
          <line x1="148" y1="55" x2="175" y2="28" stroke="#c8f000" strokeWidth="1.5" opacity="0.6" />
          <line x1="155" y1="55" x2="182" y2="28" stroke="#c8f000" strokeWidth="1.5" opacity="0.6" />
          <line x1="148" y1="28" x2="175" y2="55" stroke="#c8f000" strokeWidth="1.5" opacity="0.6" />
          <line x1="155" y1="28" x2="182" y2="55" stroke="#c8f000" strokeWidth="1.5" opacity="0.6" />
          <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
        </g>
        <rect x="155" y="100" width="6" height="14" rx="2" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="1.2s" begin="0s" repeatCount="indefinite" />
        </rect>
        <rect x="165" y="96" width="6" height="18" rx="2" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
        </rect>
        <rect x="175" y="92" width="6" height="22" rx="2" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
        </rect>
        <circle cx="100" cy="145" r="2" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Tranquillité totale",
    desc: "Monitoring 24/7, backups automatisés, maintenance zero-effort. Si un incident survient, on réagit avant même que vous le remarquiez. Pendant ce temps, vous gérez votre métier — on gère la technique. Votre site reste rapide, sécurisé et à jour, sans que vous y pensiez.",
    svg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <circle cx="100" cy="80" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15">
          <animate attributeName="r" values="35;40;35" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.05;0.15" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="80" r="25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1">
          <animate attributeName="r" values="25;30;25" dur="4s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.03;0.1" dur="4s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="80" r="18" fill="#c8f000" fillOpacity="0.03" stroke="#c8f000" strokeWidth="1" strokeOpacity="0.3" />
        <polyline points="88,78 97,87 113,70" fill="none" stroke="#c8f000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
          <animate attributeName="stroke-dasharray" values="0,40;40,0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="40;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        </polyline>
        <g opacity="0.25">
          <rect x="70" y="130" width="60" height="3" rx="1.5" fill="currentColor">
            <animate attributeName="opacity" values="0.25;0.6;0.25" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="75" y="136" width="50" height="3" rx="1.5" fill="currentColor">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          <rect x="80" y="142" width="40" height="3" rx="1.5" fill="currentColor">
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur="3s" begin="1s" repeatCount="indefinite" />
          </rect>
        </g>
        <circle cx="100" cy="155" r="2" fill="currentColor" opacity="0.15">
          <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
]

export function SecuritySection() {
  return (
    <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
            <span className="w-8 h-px bg-white/20" />
            Sécurité
          </span>
          <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
            Un site à l'abri,
            <br />
            <span className="text-white/30">du code au navigateur.</span>
          </h2>
          <p className="mt-5 max-w-[600px] text-sm font-light leading-relaxed text-gray-400">
            Pas de maintenance, pas de vulnérabilité, pas de surprise. Votre tranquillité d'esprit est incluse.
          </p>
        </div>

        <div>
          {ITEMS.map((item, i) => (
            <div key={item.num} className="group transition-all duration-700" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-16 border-b border-white/10">
                <div className="shrink-0">
                  <span className="font-mono text-sm text-white/30">{item.num}</span>
                </div>
                <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-mono text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed">{item.desc}</p>
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
