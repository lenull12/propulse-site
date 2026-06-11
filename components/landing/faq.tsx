"use client"

import { useState } from "react"
import { Reveal } from "@/components/ui/reveal"
import { FAQS } from "@/lib/faq"

const LANDING_FAQS = [FAQS[1], FAQS[2], FAQS[3], FAQS[4], FAQS[5], FAQS[6], FAQS[0], FAQS[13]]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
      <Reveal>
      <div className="relative z-10 mx-auto max-w-[800px]">
        {/* En-tête */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent/40" />
            <p className="text-sm font-medium tracking-wide text-accent font-sans">Questions fréquentes</p>
            <span className="w-8 h-px bg-accent/40" />
          </div>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-black leading-[1.15]">
            <span className="block text-foreground">Toutes vos questions,</span>
            <span className="block text-white/30">des réponses claires.</span>
          </h2>
        </div>

        {/* Accordéon */}
        <div className="flex flex-col divide-y divide-white/5">
          {LANDING_FAQS.map((faq, i) => (
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
                style={{ maxHeight: open === i ? "300px" : "0px" }}
              >
                <p className="text-sm font-light leading-relaxed text-gray-400 pb-6 max-w-[680px]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  )
}