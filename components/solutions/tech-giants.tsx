"use client"

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/ui/reveal"

interface Company {
  name: string
  logo: string
}

interface TechGroup {
  tech: string
  logo: string
  by: string
  companies: Company[]
}

const GROUPS: TechGroup[] = [
  {
    tech: "React",
    logo: "/svg/react.svg",
    by: "Meta",
    companies: [
      { name: "Meta", logo: "/svg/meta.svg" },
      { name: "Netflix", logo: "/svg/netflix.svg" },
      { name: "Airbnb", logo: "/svg/airbnb.svg" },
      { name: "Uber", logo: "/svg/uber.svg" },
      { name: "Pinterest", logo: "/svg/pinterest.svg" },
      { name: "Reddit", logo: "/svg/reddit.svg" },
    ],
  },
  {
    tech: "Next.js",
    logo: "/svg/nextdotjs.svg",
    by: "Vercel",
    companies: [
      { name: "TikTok", logo: "/svg/tiktok.svg" },
      { name: "Twitch", logo: "/svg/twitch.svg" },
      { name: "Notion", logo: "/svg/notion.svg" },
      { name: "Nike", logo: "/svg/nike.svg" },
      { name: "Target", logo: "/svg/target.svg" },
    ],
  },
  {
    tech: "TypeScript",
    logo: "/svg/typescript.svg",
    by: "Microsoft",
    companies: [
      { name: "Google", logo: "/svg/google.svg" },
      { name: "Asana", logo: "/svg/asana.svg" },
      { name: "Medium", logo: "/svg/medium.svg" },
      { name: "Lyft", logo: "/svg/lyft.svg" },
    ],
  },
]

export function TechGiants() {
  return (
    <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/30 mb-6">
              <span className="w-8 h-px bg-white/20" />
              La preuve par l'exemple
            </span>
            <h2 className="font-mono text-[clamp(28px,4.5vw,48px)] font-black leading-[1.1] tracking-tight text-foreground">
              La même stack
              <br />
              <span className="text-white/30">que les géants.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {GROUPS.map((g, i) => (
            <Reveal key={g.tech} delay={i * 150}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                {/* En-tête tech */}
                <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Image
                      src={g.logo}
                      alt={g.tech}
                      width={32}
                      height={32}
                      className="w-8 h-8 brightness-0 invert"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-base font-semibold text-foreground">{g.tech}</span>
                    <span className="block font-mono text-xs text-white/30">{g.by}</span>
                  </div>
                </div>
                {/* Liste entreprises */}
                <div className="space-y-4">
                  {g.companies.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 brightness-0 invert opacity-60"
                      />
                      <span className="text-sm text-white/70">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={450}>
          <div className="mt-14 border-t border-white/10 pt-14 text-center">
            <p className="mx-auto mb-6 max-w-[600px] font-mono text-base leading-relaxed text-white/60">
              Bénéficiez de la même architecture que les géants du web.
              Votre site professionnel, avec les technologies des plus grandes plateformes, à portée de main.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
            >
              Démarrer votre projet
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

