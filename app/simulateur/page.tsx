import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Simulator } from "@/components/simulateur/simulator"

export const metadata: Metadata = {
  title: "Simulateur de site — PropulseDev",
  description:
    "Configurez votre futur site en quelques clics : secteur, style, couleurs, fonctionnalités. Aperçu en direct et devis personnalisé.",
  openGraph: {
    title: "Simulateur de site — PropulseDev",
    description: "Configurez votre site en quelques clics. Aperçu en direct.",
  },
}

export default function SimulateurPage() {
  return (
    <>
      <SiteNav forceDark />
      <main className="min-h-screen bg-[#050505] pt-24 pb-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <Simulator />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
