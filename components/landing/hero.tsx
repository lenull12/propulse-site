import Link from "next/link"
import Image from "next/image"
import { WordSwitcher } from "./word-switcher"
import { ParticlesBackground } from "./particles-background"


export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Particules de fond */}
      <ParticlesBackground
        count={40}
        connectDistance={100}
        color="200,240,0"
        className="opacity-30"
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_760px] gap-8 lg:gap-20">
          {/* Colonne texte */}
          <div className="self-center min-w-0">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="text-xs font-medium tracking-[2px] uppercase text-accent/80 font-mono">★★★★★ Avis Google certifiés</p>
            </div>

            <h1 className="mb-6 font-mono text-[clamp(1.5rem,3vw,3.5rem)] font-black leading-[1.15] tracking-tight text-foreground text-left">
              <span className="block text-balance">Votre site internet devrait</span>
              <span className="block"><WordSwitcher /></span>
            </h1>

            <p className="mb-8 max-w-[640px] text-sm md:text-base font-light leading-relaxed text-gray-400">
              Des sites internet sur-mesure et performants pour les professionnels.
              <br className="hidden sm:block" />
              Optimiser votre visibilité locale, c&apos;est attirer de nouveaux clients.
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/[0.04] px-4 py-1.5 text-xs font-semibold text-accent">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sites à partir de 1 000 €
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/contact"
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
                <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[2px] text-gray-400">Audit livré sous 48h</p>
              </div>
              <div>
                <p className="font-mono text-3xl md:text-5xl font-black text-foreground">+200<span className="text-accent">%</span></p>
                <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[2px] text-gray-400">Trafic Google</p>
              </div>
            </div>
          </div>

          {/* Colonne image */}
          <div className="flex justify-center self-start lg:-mt-16 mt-8">
            <div className="relative w-full aspect-[5/4]">
              <Image
                src="/images/herolanding.webp"
                alt=""
                aria-hidden="true"
                fill
                priority
                className="object-contain object-top"
                sizes="760px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
