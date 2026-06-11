"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { NICHES } from "@/lib/niches"
import { PhoneReveal } from "@/components/ui/phone-reveal"

type MenuType = "solutions" | "demos" | "outils" | "ressources"

export function SiteNav({ forceDark }: { forceDark?: boolean }) {
  const [activeMenu, setActiveMenu] = useState<MenuType | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showMenu = (menu: MenuType | null) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(menu)
  }

  const scheduleHide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    if (!activeMenu) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeMenu])

  const pathname = usePathname()

  const isActive = {
    solutions: pathname.startsWith("/solutions/"),
    demos: pathname.startsWith("/demos"),
    outils: pathname === "/outils" || pathname.startsWith("/outils/"),
    tarifs: pathname === "/tarifs",
    blog: pathname.startsWith("/blog"),
    ressources: pathname === "/a-propos" || pathname === "/faq",
  }

  const navBg = forceDark || scrolled || menuOpen || activeMenu
    ? "border-b border-white/5 bg-[#050505]/90 backdrop-blur-lg"
    : "border-b border-transparent bg-transparent"

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={scheduleHide}
      >
        <nav className={`transition-all duration-500 ${navBg}`}>
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
              {/* Solutions */}
              <button
                type="button"
                onMouseEnter={() => showMenu("solutions")}
                onClick={() => showMenu(activeMenu === "solutions" ? null : "solutions")}
                className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive.solutions || activeMenu === "solutions" ? "text-accent" : "text-white/80 hover:text-accent"
                }`}
                aria-expanded={activeMenu === "solutions"}
                aria-label="Ouvrir le menu solutions"
              >
                Solutions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${activeMenu === "solutions" ? "rotate-180" : ""}`} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Démos */}
              <button
                type="button"
                onMouseEnter={() => showMenu("demos")}
                onClick={() => showMenu(activeMenu === "demos" ? null : "demos")}
                className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive.demos || activeMenu === "demos" ? "text-accent" : "text-white/80 hover:text-accent"
                }`}
                aria-expanded={activeMenu === "demos"}
                aria-label="Ouvrir le menu des secteurs"
              >
                Démos
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${activeMenu === "demos" ? "rotate-180" : ""}`} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Outils */}
              <button
                type="button"
                onMouseEnter={() => showMenu("outils")}
                onClick={() => showMenu(activeMenu === "outils" ? null : "outils")}
                className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive.outils || activeMenu === "outils" ? "text-accent" : "text-white/80 hover:text-accent"
                }`}
                aria-expanded={activeMenu === "outils"}
                aria-label="Ouvrir le menu outils"
              >
                Outils
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${activeMenu === "outils" ? "rotate-180" : ""}`} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Tarifs */}
              <Link href="/tarifs" onMouseEnter={() => setActiveMenu(null)} className={`group relative text-sm font-medium transition-colors ${isActive.tarifs ? "text-accent" : "text-white/80 hover:text-accent"}`}>
                Tarifs
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </Link>

              {/* Blog */}
              <Link href="/blog" onMouseEnter={() => setActiveMenu(null)} className={`group relative text-sm font-medium transition-colors ${isActive.blog ? "text-accent" : "text-white/80 hover:text-accent"}`}>
                Blog
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </Link>

              {/* Ressources */}
              <button
                type="button"
                onMouseEnter={() => showMenu("ressources")}
                onClick={() => showMenu(activeMenu === "ressources" ? null : "ressources")}
                className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive.ressources || activeMenu === "ressources" ? "text-accent" : "text-white/80 hover:text-accent"
                }`}
                aria-expanded={activeMenu === "ressources"}
                aria-label="Ouvrir le menu ressources"
              >
                Ressources
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${activeMenu === "ressources" ? "rotate-180" : ""}`} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <Link
                href="/contact"
                className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_20px_rgba(200,240,0,0.4)]"
              >
                Prendre RDV
              </Link>
              <PhoneReveal className="rounded-full bg-accent px-5 py-2 text-xs font-semibold text-black transition-all hover:shadow-[0_0_20px_rgba(200,240,0,0.4)]" revealedClassName="text-black" label="Appelez-nous" />
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

        {/* Dropdown central */}
        {activeMenu && (
          <div
            className="mx-auto max-w-[700px] px-6 pb-6 animate-slideDown"
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }}
          >
            <div className="rounded-xl border border-white/10 bg-[#050505] shadow-2xl py-8 px-6">

              {/* Solutions */}
              {activeMenu === "solutions" && (
                <div className="flex flex-col gap-3 max-w-sm">
                  <Link
                    href="/solutions/creation-site-web"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
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
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                        <line x1="10" y1="3" x2="8" y2="21" />
                        <line x1="16" y1="3" x2="14" y2="21" />
                      </svg>
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
              )}

              {/* Démos */}
              {activeMenu === "demos" && (
                <div>
                  <Link
                    href="/demos"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5 w-fit"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent transition-transform group-hover:scale-110">
                      *
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Toutes les démos</span>
                      <span className="text-xs font-light text-white/35">Voir tous les secteurs</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2 shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <div className="h-px bg-white/5 my-3" />
                  <p className="text-[10px] uppercase tracking-[3px] text-white/30 mb-4">Par secteur</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                    {Object.entries(NICHES).map(([slug, niche]) => (
                      <Link
                        key={slug}
                        href={`/demos/${slug}`}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                      >
                        <span className="text-lg shrink-0">{niche.icon}</span>
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{niche.menuLabel}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Outils */}
              {activeMenu === "outils" && (
                <div className="flex flex-col gap-2 max-w-xs">
                  <Link
                    href="/outils"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent transition-transform group-hover:scale-110">
                      *
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Tous les outils</span>
                      <span className="text-xs font-light text-white/35">Simulateur, audit et plus</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <div className="h-px bg-white/5 mx-4" />
                  <Link
                    href="/simulateur"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Simulateur de site</span>
                      <span className="text-xs font-light text-white/35">Configurez votre futur site</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/outils/pagespeed"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Analyse PageSpeed</span>
                      <span className="text-xs font-light text-white/35">Diagnostic de performance</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/outils/seo-checker"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Analyse SEO</span>
                      <span className="text-xs font-light text-white/35">Balises et contenu</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/outils/meta-generator"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 17l6-6-6-6" />
                        <path d="M12 19h8" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Générateur de balises méta</span>
                      <span className="text-xs font-light text-white/35">Title, meta, OG et Twitter</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Ressources */}
              {activeMenu === "ressources" && (
                <div className="flex flex-col gap-2 max-w-xs">
                  <Link
                    href="/a-propos"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">À propos</span>
                      <span className="text-xs font-light text-white/35">Notre agence</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/faq"
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">FAQ</span>
                      <span className="text-xs font-light text-white/35">Réponses aux questions</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setActiveMenu(null)}
        />
      )}

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] flex flex-col transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 pt-28 pb-10 flex-1 overflow-y-auto">

          {/* Liens principaux */}
          {[
            { label: "Tarifs", href: "/tarifs" },
            { label: "Blog", href: "/blog" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`font-mono text-3xl font-black transition-colors py-2 border-b border-white/5 ${pathname === href ? "text-accent" : "text-foreground/80 hover:text-accent"}`}
            >
              {label}
            </Link>
          ))}

          {/* Solutions */}
          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-[3px] text-white/25 mb-3 mt-4">Solutions</p>
            <Link
              href="/solutions/creation-site-web"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/solutions/creation-site-web" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">Création de site web</span>
            </Link>
            <Link
              href="/solutions/seo-reputation-locale"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/solutions/seo-reputation-locale" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9" />
                  <line x1="4" y1="15" x2="20" y2="15" />
                  <line x1="10" y1="3" x2="8" y2="21" />
                  <line x1="16" y1="3" x2="14" y2="21" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">SEO & réputation locale</span>
            </Link>
          </div>

          {/* Outils */}
          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-[3px] text-white/25 mb-3 mt-4">Outils</p>
            <Link
              href="/outils"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/outils" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                *
              </span>
              <span className="text-base font-medium text-foreground/70">Tous les outils</span>
            </Link>
            <Link
              href="/simulateur"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/simulateur" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">Simulateur de site</span>
            </Link>
            <Link
              href="/outils/pagespeed"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/outils/pagespeed" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">Analyse PageSpeed</span>
            </Link>
            <Link
              href="/outils/seo-checker"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/outils/seo-checker" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">Analyse SEO</span>
            </Link>
            <Link
              href="/outils/meta-generator"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/outils/meta-generator" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17l6-6-6-6" />
                  <path d="M12 19h8" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">Générateur de balises méta</span>
            </Link>
          </div>

          {/* Démos par secteur */}
          <div className="pt-2">
            <Link
              href="/demos"
              onClick={() => setMenuOpen(false)}
              className={`font-mono text-xl font-black transition-colors py-2 ${pathname === "/demos" || pathname.startsWith("/demos/") ? "text-accent" : "text-accent/80 hover:text-accent"}`}
            >
              Toutes les démos
            </Link>
            <p className="text-[10px] uppercase tracking-[3px] text-white/25 mb-3 mt-4">Par secteur</p>
            {Object.entries(NICHES).map(([slug, niche]) => (
              <Link
                key={slug}
                href={`/demos/${slug}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === `/demos/${slug}` ? "text-accent" : "hover:text-accent"}`}
              >
                <span className="text-xl">{niche.icon}</span>
                <span className="text-base font-medium text-foreground/70">{niche.menuLabel}</span>
              </Link>
            ))}
          </div>

          {/* Ressources */}
          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-[3px] text-white/25 mb-3 mt-4">Ressources</p>
            <Link
              href="/a-propos"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/a-propos" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">À propos</span>
            </Link>
            <Link
              href="/faq"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 py-3 border-b border-white/5 transition-colors ${pathname === "/faq" ? "text-accent" : "hover:text-accent"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
              <span className="text-base font-medium text-foreground/70">FAQ</span>
            </Link>
          </div>
        </div>

        {/* CTA bas de page */}
        <div className="px-6 pb-10">
          <Link
            href="/contact"
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
