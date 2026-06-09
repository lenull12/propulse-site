"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { NICHES } from "@/lib/niches"

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const solutionsWrapRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
    setSolutionsOpen(true)
  }

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-white/5 bg-[#050505]/90 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
          
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 font-mono text-xl md:text-2xl font-black tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <span>Propulse<span className="text-accent">Dev</span></span>
            <span className="text-[10px] tracking-[1.5px] text-accent">★★★★★</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dropdown Solutions */}
            <div ref={solutionsWrapRef} className="relative" onMouseEnter={handleSolutionsEnter} onMouseLeave={handleSolutionsLeave}>
              <div className="flex items-center gap-0">
                <Link
                  href="/solutions"
                  onClick={() => setSolutionsOpen(false)}
                  className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${solutionsOpen ? "text-accent" : "text-white/80 hover:text-accent"}`}
                >
                  Solutions
                </Link>
                <button
                  type="button"
                  className={`flex cursor-pointer items-center p-1 text-sm font-medium transition-colors ${solutionsOpen ? "text-accent" : "text-white/80 hover:text-accent"}`}
                  aria-expanded={solutionsOpen}
                  aria-label="Ouvrir le menu solutions"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`} aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              <div className={`absolute right-[-20px] top-[calc(100%+16px)] w-72 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl transition-all duration-300 ${solutionsOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
                <div className="p-2">
                  <Link
                    href="/solutions/creation-site-web"
                    onClick={() => setSolutionsOpen(false)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent transition-transform group-hover:scale-110">
                      &lt;/&gt;
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Création de site web</span>
                      <span className="text-xs font-light text-white/35">Sites modernes & premium</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/solutions/seo-reputation-locale"
                    onClick={() => setSolutionsOpen(false)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent transition-transform group-hover:scale-110">
                      #
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">SEO & réputation locale</span>
                      <span className="text-xs font-light text-white/35">Visibilité & avis Google</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/a-propos" className="group relative text-sm font-medium text-white/80 transition-colors hover:text-accent">
              Qui sommes-nous
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link href="/blog" className="group relative text-sm font-medium text-white/80 transition-colors hover:text-accent">
              Blog
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link href="/tarifs" className="group relative text-sm font-medium text-white/80 transition-colors hover:text-accent">
              Tarifs
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Dropdown Démos */}
            <div ref={wrapRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-0">
                <Link
                  href="/demos"
                  onClick={() => setOpen(false)}
                  className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${open ? "text-accent" : "text-white/80 hover:text-accent"}`}
                >
                  Démos
                </Link>
                <button
                  type="button"
                  className={`flex cursor-pointer items-center p-1 text-sm font-medium transition-colors ${open ? "text-accent" : "text-white/80 hover:text-accent"}`}
                  aria-expanded={open}
                  aria-label="Ouvrir le menu des secteurs"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              <div className={`absolute right-[-20px] top-[calc(100%+16px)] w-80 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl transition-all duration-300 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
                <div className="p-2">
                  <Link
                    href="/demos"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent transition-transform group-hover:scale-110">
                      *
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Toutes les démos</span>
                      <span className="text-xs font-light text-white/35">Voir tous les secteurs</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto flex-shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <div className="mx-4 my-1 h-px bg-white/5" />
                  <p className="px-4 pb-2 pt-1 text-[10px] uppercase tracking-[3px] text-white/20">Par secteur</p>
                  <ul className="flex flex-col gap-0.5">
                    {Object.entries(NICHES).map(([slug, niche]) => (
                      <li key={slug}>
                        <Link
                          href={`/demos/${slug}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                        >
                          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-xl transition-transform group-hover:scale-110">{niche.icon}</span>
                          <span className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{niche.menuLabel}</span>
                            <span className="text-xs font-light text-white/35">{niche.menuSub}</span>
                          </span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto flex-shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
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
              className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_20px_rgba(200,240,0,0.4)]"
            >
              Prendre RDV
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex md:hidden flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] flex flex-col transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 pt-28 pb-10 flex-1 overflow-y-auto">

          {/* Liens principaux */}
          {[
            { label: "Qui sommes-nous", href: "/a-propos" },
            { label: "Blog", href: "/blog" },
            { label: "Tarifs", href: "/tarifs" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-3xl font-black text-foreground/80 hover:text-accent transition-colors py-2 border-b border-white/5"
            >
              {label}
            </Link>
          ))}

          {/* Solutions */}
          <div className="pt-2">
            <Link
              href="/solutions"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 border-b border-white/5 font-mono text-xl font-black text-accent/80 hover:text-accent transition-colors"
            >
              <span className="text-lg">✦</span>
              <span>Toutes les solutions</span>
            </Link>
            <p className="text-[10px] uppercase tracking-[3px] text-white/25 mb-3 mt-4">Nos offres</p>
            <Link
              href="/solutions/creation-site-web"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 border-b border-white/5 hover:text-accent transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">&lt;/&gt;</span>
              <span className="text-base font-medium text-foreground/70">Création de site web</span>
            </Link>
            <Link
              href="/solutions/seo-reputation-locale"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 border-b border-white/5 hover:text-accent transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">#</span>
              <span className="text-base font-medium text-foreground/70">SEO & réputation locale</span>
            </Link>
          </div>

          {/* Démos par secteur */}
          <div className="pt-2">
            <Link
              href="/demos"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 border-b border-white/5 font-mono text-xl font-black text-accent/80 hover:text-accent transition-colors"
            >
              <span className="text-lg">*</span>
              <span>Toutes les démos</span>
            </Link>
            <p className="text-[10px] uppercase tracking-[3px] text-white/25 mb-3 mt-4">Par secteur</p>
            {Object.entries(NICHES).map(([slug, niche]) => (
              <Link
                key={slug}
                href={`/demos/${slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 border-b border-white/5 hover:text-accent transition-colors"
              >
                <span className="text-xl">{niche.icon}</span>
                <span className="text-base font-medium text-foreground/70">{niche.menuLabel}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA bas de page */}
        <div className="px-6 pb-10">
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center rounded-full bg-accent py-4 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
          >
            Obtenir un audit gratuit
          </Link>
        </div>
      </div>
    </>
  )
}