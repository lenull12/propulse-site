import Link from "next/link"
import { WordSwitcher } from "./word-switcher"


export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden">
      {/* Vidéo — desktop uniquement */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center opacity-80 hidden md:block"
      >
        <source src="/videos/seamless.mp4" type="video/mp4" />
      </video>

      {/* Fallback mobile — fond gradient simple, zéro chargement */}
      <div
        className="absolute inset-0 z-0 md:hidden"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(200,240,0,0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(168,85,247,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="lg:max-w-[55%]">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="text-xs font-medium tracking-[2px] uppercase text-accent/80 font-mono">★★★★★ Avis Google certifiés</p>
          </div>

          {/* H1 — 2 lignes max */}
          <h1 className="mb-6 font-mono text-[clamp(1.6rem,4vw,5.2rem)] font-black leading-[1.15] tracking-tight text-foreground text-left">
            <span className="block text-balance">Votre site internet devrait</span>
            <span className="block mt-1 text-nowrap"><WordSwitcher /></span>
          </h1>

          <p className="mb-8 max-w-[640px] text-sm md:text-base font-light leading-relaxed text-gray-400">
            Des sites internet sur-mesure et performants pour les professionnels.
            <br className="hidden sm:block" />
            Optimiser votre visibilité locale, c'est sécuriser vos futurs clients.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="#contact"
              className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
            >
              Obtenir un audit gratuit
            </Link>
            <Link
              href="#services"
              className="inline-block rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:border-white/20"
            >
              Voir les services
            </Link>
          </div>

          {/* Stats — 2 colonnes sur mobile, 4 sur md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-14 max-w-[820px]">
            <div>
              <p className="font-mono text-3xl md:text-5xl font-black text-foreground">5<span className="text-accent">★</span></p>
              <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[2px] text-gray-400">Avis Google</p>
            </div>
            <div>
              <p className="font-mono text-3xl md:text-5xl font-black text-foreground">95<span className="text-accent">+</span></p>
              <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[2px] text-gray-400">Vitesse site</p>
            </div>
            <div>
              <p className="font-mono text-3xl md:text-5xl font-black text-foreground">24h</p>
              <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[2px] text-gray-400">Audit livré</p>
            </div>
            <div>
              <p className="font-mono text-3xl md:text-5xl font-black text-foreground">+200<span className="text-accent">%</span></p>
              <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[2px] text-gray-400">Trafic Google</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}