import Link from "next/link"
import { WordSwitcher } from "./word-switcher"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center bg-[#050505] overflow-hidden">
      {/* Vidéo de fond */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center opacity-80"
      >
        <source src="/videos/seamless.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient pour la lisibilité du texte */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* Contenu principal — texte à gauche (7/12), vidéo occupe l'espace à droite */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <div className="lg:max-w-[55%]">
          <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="text-xs font-medium tracking-[2px] uppercase text-accent/80 font-mono">★★★★★ Avis Google certifiés</p>
          </div>
          
          <h1 className="mb-6 font-mono text-[clamp(2.5rem,5.5vw,5.2rem)] font-black leading-[1.05] tracking-tight text-foreground text-left">
            <span className="block whitespace-nowrap">Votre site internet devrait</span>
            <span className="block mt-1 whitespace-nowrap"><WordSwitcher /></span>
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="#contact"
              className="inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
            >
              Obtenir un audit gratuit
            </Link>
            <Link
              href="#services"
              className="inline-block rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:border-white/20"
            >
              Voir les services
            </Link>
          </div>

          {/* 4 colonnes de chiffres clés (sous les CTAs) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 max-w-[820px]">
            <div>
              <p className="font-mono text-4xl md:text-5xl font-black text-foreground">5<span className="text-accent">★</span></p>
              <p className="mt-2 text-[11px] uppercase tracking-[2px] text-gray-400">Avis Google</p>
            </div>
            <div>
              <p className="font-mono text-4xl md:text-5xl font-black text-foreground">95<span className="text-accent">+</span></p>
              <p className="mt-2 text-[11px] uppercase tracking-[2px] text-gray-400">Vitesse site</p>
            </div>
            <div>
              <p className="font-mono text-4xl md:text-5xl font-black text-foreground">24h</p>
              <p className="mt-2 text-[11px] uppercase tracking-[2px] text-gray-400">Audit livré</p>
            </div>
            <div>
              <p className="font-mono text-4xl md:text-5xl font-black text-foreground">+200<span className="text-accent">%</span></p>
              <p className="mt-2 text-[11px] uppercase tracking-[2px] text-gray-400">Trafic Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}