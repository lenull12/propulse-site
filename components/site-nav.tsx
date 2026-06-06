"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { NICHES } from "@/lib/niches"

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-background/85 px-6 py-5 backdrop-blur-md md:px-15">
      <Link href="/" className="font-serif text-[22px] font-black tracking-tight text-foreground">
        Propulse<span className="text-accent">Dev</span>
        <span className="ml-3 align-middle text-[13px] tracking-[2px] text-accent">★★★★★</span>
      </Link>

      <div className="flex items-center gap-6">
        <div ref={wrapRef} className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((v) => !v)
            }}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              open ? "text-accent" : "text-white/70 hover:text-accent"
            }`}
            aria-expanded={open}
            aria-haspopup="true"
          >
            Démos
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div
            className={`absolute right-[-20px] top-[calc(100%+16px)] w-80 overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl transition-all ${
              open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="p-2">
              <p className="px-4 pb-2 pt-3 text-[10px] uppercase tracking-[3px] text-white/25">Choisissez un secteur</p>
              <ul className="flex flex-col gap-0.5">
                {Object.entries(NICHES).map(([slug, niche]) => (
                  <li key={slug}>
                    <Link
                      href={`/demos/${slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-xl">
                        {niche.icon}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{niche.menuLabel}</span>
                        <span className="text-xs font-light text-white/35">{niche.menuSub}</span>
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ml-auto flex-shrink-0 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link
          href="/#contact"
          className="rounded-full bg-paper px-6 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-px hover:bg-accent"
        >
          Prendre RDV
        </Link>
      </div>
    </nav>
  )
}
