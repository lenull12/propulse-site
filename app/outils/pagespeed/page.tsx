import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuditSection } from "@/components/audit/audit-section"

export const metadata: Metadata = {
  title: "Analyse PageSpeed — PropulseDev",
  description:
    "Analysez la performance de votre site avec Google PageSpeed Insights. Scores, Core Web Vitals et recommandations d'amélioration.",
  openGraph: {
    title: "Analyse PageSpeed — PropulseDev",
    description: "Diagnostic complet de votre site basé sur Google PageSpeed Insights.",
  },
}

export default function PageSpeedPage() {
  return (
    <>
      <SiteNav forceDark />
      <main className="min-h-screen bg-[#050505] pt-24 pb-20">
        <div className="mx-auto max-w-[900px] px-6">
          <AuditSection standalone />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
