"use client"

import Link from "next/link"
import { WordSwitcher } from "./word-switcher"
import { ParticlesBackground } from "./particles-background"
import { HeroMockup } from "./hero-mockup"

export function HeroV2() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <ParticlesBackground
        count={30}
        connectDistance={80}
        color="200,240,0"
        className="opacity-15"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 md:px-10 lg:px-16 py-24">
        {/* Badge disponibilité */}
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/10 bg-accent/[0.03] px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium text-accent/80 tracking-wide">
            Disponible — 3 places ce mois
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-10 font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground text-center">
          <span className="block font-normal text-foreground">Votre site devrait</span>
          <span className="block mt-3">
            <WordSwitcher />
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-6 max-w-xl text-center text-lg md:text-xl text-gray-400 font-light leading-relaxed">
          Sites web sur-mesure pour professionnels indépendants.
          Design premium, SEO local, zéro maintenance.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(200,240,0,0.35)]"
          >
            Obtenir un audit gratuit
            <span className="cta-arrow text-lg">&rarr;</span>
          </Link>
          <Link
            href="/demos"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline-offset-4 hover:underline"
          >
            Voir une démo
          </Link>
        </div>

        {/* Mockup device wall rotatif */}
        <HeroMockup />

        {/* Social proof stats */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="font-mono text-3xl md:text-4xl font-bold text-foreground">5<span className="text-accent">★</span></p>
            <p className="mt-1.5 text-xs text-gray-500 tracking-wide">Avis Google</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl md:text-4xl font-bold text-foreground">95<span className="text-accent">+</span></p>
            <p className="mt-1.5 text-xs text-gray-500 tracking-wide">Score PageSpeed</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl md:text-4xl font-bold text-foreground">48h</p>
            <p className="mt-1.5 text-xs text-gray-500 tracking-wide">Audit livré</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl md:text-4xl font-bold text-foreground">+200<span className="text-accent">%</span></p>
            <p className="mt-1.5 text-xs text-gray-500 tracking-wide">Trafic Google</p>
          </div>
        </div>
      </div>
    </section>
  )
}
