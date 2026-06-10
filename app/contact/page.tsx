import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { MultiStepForm } from "@/components/ui/multi-step-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact & Sales — PropulseDev",
  description:
    "Parlons de votre projet. Audit gratuit ou estimation personnalisée pour votre site web professionnel et votre visibilité Google locale.",
}

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen flex flex-col bg-[#050505]">
        <div className="flex-1 flex items-center justify-center px-6 py-8 md:py-12">
          <div className="w-full max-w-[660px]">
            <div className="text-center mb-5 space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-accent font-sans">
                CONTACTEZ-NOUS
              </p>
              <p className="text-sm text-white/60">Nous répondons en moins de 24h</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl p-6 md:p-10">
              <MultiStepForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
