import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { MobileFriendlyTool } from "@/components/outils/mobile-friendly"

export const metadata: Metadata = {
  title: "Test Mobile Friendly — PropulseDev",
  description:
    "Vérifiez si votre site est optimisé pour le mobile. Détectez les problèmes d'affichage sur smartphone avec Google Mobile-Friendly Test.",
}

export default function MobileFriendlyPage() {
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
              Test Mobile Friendly
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/50">
              Vérifiez si votre site s&apos;affiche correctement sur mobile. Basé sur le Google Mobile-Friendly Test officiel.
            </p>
          </div>
          <MobileFriendlyTool />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
