import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { OUTILS } from "@/lib/outils"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Outils gratuits — PropulseDev",
  description:
    "Simulateur de site, analyse PageSpeed, analyse SEO et générateur de balises méta. Des outils gratuits pour votre projet web.",
  openGraph: {
    title: "Outils gratuits — PropulseDev",
    description: "Simulateur, analyse SEO, PageSpeed et plus. Gratuit.",
  },
}

const ICONS: Record<string, React.ReactNode> = {
  simulateur: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  ),
  pagespeed: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  ),
  "seo-checker": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  "meta-generator": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8f000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  ),
}

const CTA_LABELS: Record<string, string> = {
  simulateur: "Configurer",
  pagespeed: "Analyser",
  "seo-checker": "Analyser",
  "meta-generator": "Générer",
}

export default function OutilsPage() {
  return (
    <>
      <SiteNav forceDark />
      <main className="min-h-screen bg-[#050505] pt-24 pb-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase mb-4">
              Outils gratuits
            </div>
            <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Des outils pour votre projet web
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base leading-relaxed text-white/50">
              Simulez votre futur site, auditez votre présence en ligne, analysez votre SEO et bien plus.
              Tous nos outils sont gratuits, sans inscription.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {OUTILS.map(outil => (
              <Link
                key={outil.id}
                href={outil.href}
                className="group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-surface p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(200,240,0,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-lg transition-transform group-hover:scale-110">
                    {ICONS[outil.id]}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{outil.title}</h2>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {outil.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-accent mt-auto">
                  {CTA_LABELS[outil.id] || "Accéder"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
