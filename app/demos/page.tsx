import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { NICHES } from "@/lib/niches"

export const metadata: Metadata = {
  title: "Nos démos — PropulseDev",
  description: "Explorez nos designs par secteur d'activité",
}

export default function DemosIndexPage() {
  return (
    <>
      <SiteNav />

      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Démos</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            Nos démos
          </h1>
          <p className="max-w-[560px] text-base font-light leading-relaxed text-gray-400">
            Sélectionnez un secteur pour explorer les designs disponibles.
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(NICHES).map(([slug, niche]) => (
            <Link
              key={slug}
              href={`/demos/${slug}`}
              className="group flex flex-col gap-4 rounded-[12px] border border-white/10 bg-white/[0.02] p-8 transition-all hover:-translate-y-1.5 hover:border-accent/30"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-3xl">
                {niche.icon}
              </span>
              <h2 className="font-mono text-2xl font-bold text-foreground">{niche.title}</h2>
              <p className="flex-1 text-sm font-light leading-relaxed text-gray-400">{niche.menuSub}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-accent transition-all group-hover:gap-2.5">
                Voir les designs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="px-6 pb-12 text-center text-[12px] text-white/40">
        Les noms, personnes, adresses et photos sont fictifs — à but illustratif uniquement.
      </p>

      <SiteFooter />
    </>
  )
}
