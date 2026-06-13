import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { DesignCard } from "@/components/hub/design-card"
import { getAllNicheSlugs, getNiche } from "@/lib/niches"

type PageProps = {
  params: Promise<{ niche: string }>
}

export function generateStaticParams() {
  return getAllNicheSlugs().map((niche) => ({ niche }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche } = await params
  const data = getNiche(niche)
  if (!data) return { title: "Démos — PropulseDev" }
  return {
    title: `${data.title} — Démos PropulseDev`,
    description: data.subtitle,
  }
}

export default async function HubPage({ params }: PageProps) {
  const { niche } = await params
  const data = getNiche(niche)

  if (!data) {
    notFound()
  }

  return (
    <>
      <SiteNav />

      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Retour
          </Link>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">{data.tag}</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            {data.title}
          </h1>
          <p className="max-w-[560px] text-base font-light leading-relaxed text-gray-400">{data.subtitle}</p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.designs.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        </div>
      </section>

      <p className="px-6 pb-12 text-center text-[12px] text-white/40">
        Les noms, personnes, adresses et photos sont fictifs — à but illustratif uniquement.
      </p>

      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-25 text-center md:px-15">
        <div className="mx-auto flex max-w-[600px] flex-col items-center gap-5">
          <p className="text-[11px] uppercase tracking-[3px] text-accent">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <h2 className="font-mono text-[clamp(28px,3vw,42px)] font-black leading-[1.2] text-balance text-foreground">
            Chaque site est créé
            <br />
            sur mesure pour vous.
          </h2>
          <p className="text-[15px] font-light leading-relaxed text-gray-400">
            Ces démos sont des exemples de ce que je peux réaliser. Votre site sera entièrement personnalisé selon votre
            identité, vos couleurs et vos besoins.
          </p>
          <Link
            href="/contact"
            className="mt-2 inline-block rounded-full bg-accent px-9 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,240,0,0.3)]"
          >
            Demander un site sur mesure
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
