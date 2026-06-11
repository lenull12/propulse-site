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
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
