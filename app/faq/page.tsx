"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { FAQS } from "@/lib/faq"

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative bg-[#050505] px-6 pt-36 pb-20 md:px-12 overflow-hidden bg-grid-cyber">
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-[800px] text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">FAQ</p>
              <span className="w-8 h-px bg-accent/40" />
            </div>
            <h1 className="font-mono text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.1] text-foreground mb-6">
              Des questions ?
              <br />
              <span className="text-white/30">Des réponses claires.</span>
            </h1>
            <p className="text-base font-light text-gray-400 max-w-[600px] mx-auto">
            Tout ce que vous devez savoir avant de nous confier votre projet. Vous ne trouvez pas votre réponse ?{" "}
              <Link href="/contact" className="text-accent hover:underline">Contactez-nous</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-[#050505] px-6 py-20 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[800px]">
            <div className="flex flex-col divide-y divide-white/5">
              {FAQS.map((faq, i) => (
                <div key={i} className="group">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer"
                  >
                    <span className={`font-mono text-base font-semibold transition-colors duration-300 ${open === i ? "text-accent" : "text-foreground group-hover:text-accent/70"}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-300 ${
                        open === i
                          ? "border-accent/40 bg-accent/10 rotate-45"
                          : "border-white/10 bg-white/[0.03] rotate-0"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={open === i ? "text-accent" : "text-white/40"}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: open === i ? "400px" : "0px" }}
                  >
                    <p className="text-sm font-light leading-relaxed text-gray-400 pb-6 max-w-[680px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
          <div className="relative z-10 mx-auto max-w-[700px] text-center">
            <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black text-foreground mb-6">
              Vous avez d&apos;autres questions ?
            </h2>
            <p className="text-base font-light text-gray-400 mb-10">
              Discutons de votre projet lors d&apos;un appel gratuit de 15 minutes. Aucun engagement.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
            >
              Demander un audit gratuit
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

