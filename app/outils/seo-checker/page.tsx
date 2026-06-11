import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { SEOChecker } from "@/components/outils/seo-checker"

export const metadata: Metadata = {
  title: "Analyse SEO — PropulseDev",
  description:
    "Analysez les balises HTML de votre site : title, meta description, balises Hn, images alt, robots et Open Graph.",
}

export default function SEOCheckerPage() {
  return (
    <>
      <SiteNav forceDark />
      <main className="min-h-screen bg-[#050505] pt-24 pb-20">
        <div className="mx-auto max-w-[700px] px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase mb-4">
              Outil gratuit
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Analyse SEO
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/50">
              Vérifiez les balises essentielles de n&apos;importe quelle page web : title, méta description, H1, images, robots et balises Open Graph.
            </p>
          </div>
          <SEOChecker />
          <div className="mt-12 text-center">
            <p className="text-sm text-white/40 mb-4">
              Des problèmes détectés ? Nous pouvons optimiser le SEO de votre site pour vous.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(200,240,0,0.3)] transition-all duration-200"
            >
              Demander un audit SEO complet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
