import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { MetaGenerator } from "@/components/outils/meta-generator"

export const metadata: Metadata = {
  title: "Générateur de balises méta — PropulseDev",
  description:
    "Générez les balises meta, Open Graph et Twitter Card de vos pages. Copiez-collez le code optimisé SEO.",
}

export default function MetaGeneratorPage() {
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
              Générateur de balises méta
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/50">
              Remplissez les champs ci-dessous pour générer les balises meta, Open Graph et Twitter Card prêtes à l&apos;emploi.
            </p>
          </div>
          <MetaGenerator />
          <div className="mt-12 text-center">
            <p className="text-sm text-white/40 mb-4">
              Besoin d&apos;un site complet avec des balises méta optimisées ? Nous nous chargeons de tout.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(200,240,0,0.3)] transition-all duration-200"
            >
              Créer mon site
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
