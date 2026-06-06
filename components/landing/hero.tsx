import Link from "next/link"
import { HeroScore } from "./hero-score"

export function Hero() {
  return (
    <section className="mx-auto grid min-h-screen max-w-[1200px] grid-cols-1 items-center gap-10 px-6 pb-20 pt-30 md:grid-cols-2 md:gap-15 md:px-15">
      <div className="animate-fade-up [animation-delay:100ms]">
        <p className="mb-5 text-xs font-medium uppercase tracking-[3px] text-accent">Solutions digitales B2B</p>
        <h1 className="mb-6 font-serif text-[clamp(36px,4vw,58px)] font-black leading-[1.1] text-balance text-foreground">
          Votre site internet devrait
          <br />
          <em className="italic text-accent">travailler pour vous.</em>
        </h1>
        <p className="mb-10 max-w-[480px] text-base font-light leading-relaxed text-gray-400">
          J&apos;aide les professionnels indépendants à transformer leur présence en ligne en machine à clients — grâce
          à l&apos;audit, la refonte web et la gestion automatisée de leur réputation Google.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="inline-block rounded-full bg-accent px-8 py-3.5 text-[15px] font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,240,0,0.3)]"
          >
            Obtenir un audit gratuit
          </Link>
          <Link
            href="#services"
            className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-[15px] font-normal text-foreground transition-all hover:-translate-y-0.5 hover:border-white"
          >
            Voir les services
          </Link>
        </div>
      </div>

      <HeroScore />
    </section>
  )
}
