"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { NICHES } from "@/lib/niches"

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", onClick)

    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-[#050505]/70 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-3 font-mono text-2xl font-black tracking-tight text-foreground transition-opacity hover:opacity-90">
          <span>Propulse<span className="text-accent">Dev</span></span>
          <span className="text-[11px] tracking-[1.5px] text-accent flex items-center h-full">★★★★★</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/solutions"
            className="group hidden sm:relative sm:inline-block text-sm font-medium text-white/60 transition-colors hover:text-accent"
          >
            Solutions
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link
            href="/blog"
            className="group hidden sm:relative sm:inline-block text-sm font-medium text-white/60 transition-colors hover:text-accent"
          >
            Blog
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link
            href="/tarifs"
            className="group hidden sm:relative sm:inline-block text-sm font-medium text-white/60 transition-colors hover:text-accent"
          >
            Tarifs
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <div ref={wrapRef} className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setOpen((v) => !v)
              }}
              className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${
                open ? "text-accent" : "text-white/60 hover:text-accent"
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
                strokeWidth="2.5"
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              className={`absolute right-[-20px] top-[calc(100%+16px)] w-80 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl transition-all duration-300 ${
                open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="p-2">
                <p className="px-4 pb-2 pt-3 text-[10px] uppercase tracking-[3px] text-white/20">Choisissez un secteur</p>
                <ul className="flex flex-col gap-0.5">
                  {Object.entries(NICHES).map(([slug, niche]) => (
                    <li key={slug}>
                      <Link
                        href={`/demos/${slug}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-xl transition-transform group-hover:scale-110">
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
                          strokeWidth="2.5"
                          className="ml-auto flex-shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent"
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
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(200,240,0,0.4)]"
          >
            Prendre RDV
          </Link>
        </div>
      </div>
    </nav>
  )
}