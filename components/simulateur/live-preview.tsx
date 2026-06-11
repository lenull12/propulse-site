"use client"

import { useEffect, useState } from "react"
import { SECTEURS, STYLES } from "@/lib/simulateur-data"

const FALLBACK_DATA = SECTEURS.avocat

type LivePreviewProps = {
  data: {
    secteur: string
    entreprise: string
    typeSite: string
    style: string
    police: string
    effetCartes: string
    couleurPrincipale: string
    couleurAccent: string
    couleurPro: string
    couleurTexte: string
  }
}

const CTA_TEXTS: Record<string, string> = {
  avocat: "Prendre rendez-vous",
  architecte: "Demander un devis",
  restaurateur: "Réserver",
  medecin: "Prendre rendez-vous",
  immobilier: "Demander un devis",
  coiffure: "Réserver",
  garage: "Demander un devis",
  "bien-etre": "Prendre rendez-vous",
}

const CTA_TITLES: Record<string, string> = {
  avocat: "Besoin d'un conseil juridique ?",
  architecte: "Un projet à concrétiser ?",
  artisan: "Des travaux à prévoir ?",
  restaurateur: "Une nouvelle carte à promouvoir ?",
  medecin: "Besoin d'un rendez-vous ?",
  immobilier: "Un projet immobilier ?",
  coiffure: "Besoin d'un changement ?",
  garage: "Un problème mécanique ?",
  "bien-etre": "Prêt à prendre soin de vous ?",
}

export function LivePreview({ data }: LivePreviewProps) {
  const secteur = SECTEURS[data.secteur] || FALLBACK_DATA
  const style = STYLES[data.style] || STYLES.moderne
  const [mounted, setMounted] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [floatY, setFloatY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setStatsVisible(true), 400)
    let frame: number
    let start = performance.now()
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000
      setFloatY(Math.sin(elapsed * 0.6) * 4)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frame); clearTimeout(t) }
  }, [])

  const fontStack = (() => {
    const map: Record<string, string> = {
      Inter: "Inter, sans-serif",
      "Space Grotesk": "'Space Grotesk', sans-serif",
      "Plus Jakarta Sans": "'Plus Jakarta Sans', sans-serif",
      Manrope: "Manrope, sans-serif",
      Sora: "Sora, sans-serif",
      "Playfair Display": "'Playfair Display', serif",
      "DM Serif Display": "'DM Serif Display', serif",
      "Cormorant Garamond": "'Cormorant Garamond', serif",
    }
    return map[data.police] || "Inter, sans-serif"
  })()

  const logoText = data.entreprise || "Mon Site"
  const textColor = data.couleurTexte || "#ffffff"
  const isLight = () => {
    const hex = data.couleurTexte || "#ffffff"
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 128
  }
  const textMuted = isLight() ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"
  const bgColor = data.couleurPro

  const ctaText = CTA_TEXTS[data.secteur] || "Demander un devis"
  const ctaTitle = CTA_TITLES[data.secteur] || "Prêt à développer votre activité ?"
  const footerEmail = data.entreprise
    ? `contact@${data.entreprise.toLowerCase().replace(/[^a-z0-9]/g, "")}.fr`
    : "contact@monsite.fr"

  const cardStyle = data.effetCartes === "glass"
    ? { background: `${textColor}06`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: `1px solid ${textColor}12` }
    : data.effetCartes === "bordure"
    ? { background: "transparent", border: `2px solid ${textColor}15` }
    : { background: `${textColor}08`, border: style.border }

  return (
    <div
      className="overflow-hidden rounded-t-xl border border-white/10 shadow-2xl transition-all duration-700"
      style={{
        transform: mounted ? `translateY(${floatY}px)` : "translateY(20px)",
        opacity: mounted ? 1 : 0,
        boxShadow: `0 30px 80px ${data.couleurAccent}15`,
        borderRadius: 12,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 bg-[#1c1c1e] px-5 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-[#2c2c2e] px-3 py-1.5 font-mono text-[11px] text-white/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span className="flex-1 truncate">propulsedev.fr</span>
          <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 text-[9px] text-accent">SSL</span>
        </div>
      </div>

      {/* Page content */}
      <div
        className="transition-all duration-500"
        style={{ background: bgColor }}
      >
        {/* Nav */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${textColor}15` }}>
          <div style={{ color: data.couleurPrincipale, fontWeight: 800, fontSize: 18, fontFamily: fontStack }}>
            {logoText}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-5 text-[11px] uppercase tracking-widest" style={{ color: textMuted }}>
              <span>Services</span>
              <span>À propos</span>
              <span>Blog</span>
              <span>Contact</span>
            </div>
            <span className="font-mono text-[11px] tracking-wide" style={{ color: textMuted }}>📞 01 23 45 67 89</span>
          </div>
        </div>

        {/* Hero */}
        <div
          className="flex flex-col sm:flex-row gap-6 px-6"
          style={{ paddingTop: style.spacing, paddingBottom: style.spacing }}
        >
          <div className={`flex-1 ${style.layout === "center" ? "text-center" : ""}`}>
            {style.decorator === "ornament" && (
              <div className="text-2xl mb-3" style={{ color: data.couleurAccent }}>✦ ✦ ✦</div>
            )}
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[3px] mb-4" style={{ background: `${data.couleurAccent}15`, color: data.couleurAccent }}>
              Site professionnel
            </div>
            <h1
              className="font-black leading-tight transition-all duration-500"
              style={{
                fontSize: style.titleSize,
                fontFamily: fontStack,
                color: textColor,
                letterSpacing: data.style === "moderne" ? "-0.02em" : "normal",
              }}
            >
              {secteur.accroche.charAt(0).toUpperCase() + secteur.accroche.slice(1)}
            </h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: textColor, opacity: 0.55, maxWidth: style.layout === "center" ? "480px" : "400px", margin: style.layout === "center" ? "12px auto 0" : "12px 0 0" }}>
              Nous mettons notre expertise à votre service pour vous offrir un accompagnement sur mesure, adapté à vos besoins.
            </p>
            <div className="mt-6" style={{ textAlign: style.layout === "center" ? "center" : "left" }}>
              <span
                className="inline-block px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: data.couleurAccent,
                  color: "#000",
                  borderRadius: style.radius,
                  boxShadow: `0 4px 20px ${data.couleurAccent}40`,
                  fontFamily: fontStack,
                }}
              >
                {ctaText}
              </span>
            </div>
          </div>
            <div className="flex-1 relative">
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ borderRadius: style.radius, boxShadow: style.shadow }}
            >
              <img
                src={secteur.hero}
                alt={data.secteur}
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div style={{ padding: style.spacing, background: `${textColor}05` }}>
          <h2
            className="text-center text-lg font-bold mb-6"
            style={{
              color: textColor,
              fontFamily: fontStack,
            }}
          >
            Nos services
            {style.decorator === "ornament" && <div className="text-xs mt-1" style={{ color: data.couleurAccent }}>✦ ✦ ✦</div>}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {secteur.services.map((s, i) => (
              <div
                key={i}
                className="text-center transition-all duration-500 hover:scale-[1.02]"
                style={{
                  padding: 16,
                  borderRadius: style.radius,
                  ...cardStyle,
                }}
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: textColor }}>{s.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: textMuted }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8" style={{ borderTop: `1px solid ${textColor}10`, paddingTop: style.spacing }}>
            {secteur.stats.map((stat, i) => (
              <div
                key={i}
                className="text-center transition-all duration-500"
                style={{
                  transform: statsVisible ? "translateY(0)" : "translateY(16px)",
                  opacity: statsVisible ? 1 : 0,
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className="mb-2 flex justify-center">
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: data.couleurAccent }} />
                </div>
                <div className="text-xl font-black leading-none mb-1" style={{ color: textColor }}>{stat.value}</div>
                <div className="text-[11px]" style={{ color: textMuted }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Avis client */}
        <div style={{ padding: style.spacing }}>
          <div
            className="mx-auto max-w-md text-center transition-all duration-500"
            style={{
              padding: 20,
              background: `${data.couleurAccent}10`,
              borderRadius: style.radius,
              border: `1px solid ${data.couleurAccent}20`,
            }}
          >
            <div className="text-sm tracking-[3px] mb-1" style={{ color: "#f59e0b" }}>★★★★★</div>
            <p className="text-sm italic leading-relaxed" style={{ color: textColor }}>
              &ldquo;{secteur.avis.texte}&rdquo;
            </p>
            <div className="mt-2 text-xs font-semibold" style={{ color: textMuted }}>— {secteur.avis.nom}</div>
          </div>
        </div>

        {/* CTA final */}
        <div
          className="px-6 py-8 text-center transition-all duration-500"
          style={{ background: `${data.couleurAccent}15` }}
        >
          <div className="text-lg font-bold mb-2" style={{ color: textColor, fontFamily: fontStack }}>
            {ctaTitle}
          </div>
          <div className="text-xs mb-5" style={{ color: textMuted }}>
            Un site professionnel en quelques semaines, sans mauvaises surprises.
          </div>
          <span
            className="inline-block px-7 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: data.couleurAccent,
              color: "#000",
              borderRadius: style.radius,
              boxShadow: `0 4px 20px ${data.couleurAccent}40`,
              fontFamily: fontStack,
            }}
          >
            {ctaText}
          </span>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${textColor}10` }}>
          <div className="px-6 py-6 grid grid-cols-3 gap-6 text-center sm:text-left">
            <div>
              <div style={{ color: data.couleurPrincipale, fontWeight: 800, fontSize: 15, fontFamily: fontStack }}>{logoText}</div>
              <div className="mt-1 text-[10px] leading-relaxed" style={{ color: textMuted }}>Votre partenaire de confiance</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: textColor }}>Liens</div>
              <div className="flex flex-col gap-1 text-[10px]" style={{ color: textMuted }}>
                <span>Services</span>
                <span>À propos</span>
                <span>Blog</span>
                <span>Contact</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: textColor }}>Contact</div>
              <div className="flex flex-col gap-1 text-[10px]" style={{ color: textMuted }}>
                <span>📞 01 23 45 67 89</span>
                <span>{footerEmail}</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 text-center text-[10px]" style={{ color: textMuted, borderTop: `1px solid ${textColor}10` }}>
            © {new Date().getFullYear()} — {logoText} · Tous droits réservés
          </div>
        </div>
      </div>
    </div>
  )
}
