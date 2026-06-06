"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { WordSwitcher } from "./word-switcher"

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function onTimeUpdate() {
      if (!video) return
      if (video.duration && video.duration - video.currentTime <= 1) {
        setFading(true)
      } else {
        setFading(false)
      }
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    return () => video.removeEventListener("timeupdate", onTimeUpdate)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Vidéo de fond */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center opacity-80"
      >
        <source src="/videos/seamless%20loop.mp4" type="video/mp4" />
      </video>

      {/* Overlay noir de fondu à 1s de la fin */}
      <div
        className="absolute inset-0 z-[1] bg-black pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{ opacity: fading ? 1 : 0 }}
      />

      {/* Overlays gradients pour la lisibilité */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* Halos lumineux d'ambiance */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#c8f000] opacity-10 blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#a855f7] opacity-[0.06] blur-[120px] pointer-events-none" />

      {/* Contenu principal centré */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 text-center">
        <div className="max-w-[900px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-accent/40" />
            <p className="text-xs font-semibold uppercase tracking-[3px] text-accent">Solutions digitales B2B</p>
          </div>
          
          <h1 className="mb-6 font-mono text-[clamp(2.5rem,5.5vw,5.2rem)] font-black leading-[1.05] tracking-tight text-foreground">
            Votre site internet
            <br />
            devrait <span className="block mt-1"><WordSwitcher /></span>
          </h1>
          
          <p className="mb-10 max-w-[580px] text-base md:text-lg font-light leading-relaxed text-gray-400 mx-auto">
            J'aide les professionnels indépendants à transformer leur présence en ligne en machine à clients — grâce à l'audit de performance, la refonte web ultra-rapide et la gestion automatisée de leur réputation Google.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-block rounded-full bg-accent px-9 py-4 text-[15px] font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
            >
              Obtenir un audit gratuit
            </Link>
            <Link
              href="#services"
              className="inline-block rounded-full border border-white/10 bg-white/5 px-9 py-4 text-[15px] font-medium text-foreground transition-all hover:bg-white/10 hover:border-white/20"
            >
              Voir les services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}