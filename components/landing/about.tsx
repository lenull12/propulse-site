"use client"

import { useEffect, useRef } from "react"

const VALUES = [
  {
    number: "50+",
    label: "Sites livrés",
  },
  {
    number: "4.9",
    label: "Note moyenne",
  },
  {
    number: "12+",
    label: "Ans d'expérience",
  },
  {
    number: "3j",
    label: "Audit offert sous 24h",
  },
]

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const targets = el.querySelectorAll(".reveal")
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#000000] px-6 py-32 md:px-12 overflow-hidden"
    >
      {/* Halo lumineux */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#14b8a6] opacity-[0.015] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* En-tête */}
        <div className="inline-flex items-center gap-3 mb-4 reveal opacity-0">
          <span className="w-8 h-px bg-accent/40" />
          <p className="text-sm font-medium tracking-wide text-accent font-sans">
            Qui sommes-nous
          </p>
        </div>

        <h2 className="mb-8 font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground reveal opacity-0">
          <span className="block">Une équipe dédiée à</span>
          <span className="block text-accent">
            votre croissance locale
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16">
          {/* Colonne texte */}
          <div className="reveal opacity-0">
            <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-gray-400">
              <p>
                PropulseDev naît d&apos;un constat simple : les indépendants et les
                professionnels de proximité — avocats, architectes, experts-comptables,
                restaurateurs, artisans — méritent une présence en ligne à la hauteur
                de leur expertise. Pourtant, la plupart sont noyés dans la masse des
                résultats Google, invisibles aux yeux de leurs futurs clients.
              </p>
              <p>
                Nous sommes une équipe de développeurs et d&apos;experts SEO passionnés,
                avec plus de 12 ans d&apos;expérience cumulée dans la conception de sites
                web performants. Notre spécialité ? Allier un design moderne et technique
                — construit avec les frameworks les plus avancés (Next.js, React) — à
                une stratégie de référencement local ultra-ciblée.
              </p>
              <p>
                Mais ce qui nous distingue vraiment, c&apos;est notre approche de la
                <span className="text-foreground"> réputation en ligne</span>. Nous ne
                nous arrêtons pas à la livraison du site : nous mettons en place un
                système qui transforme vos clients satisfaits en ambassadeurs sur
                Google, via la gestion automatisée de vos avis. Votre fiche Google My
                Business devient votre meilleur commercial, actif 24h/24.
              </p>
              <p className="text-gray-300">
                <span className="text-accent font-semibold">Notre promesse :</span> un
                site qui ne se contente pas d&apos;exister, mais qui trouve des clients
                pour vous. Chaque jour.
              </p>
            </div>
          </div>

          {/* Colonne stats / valeurs */}
          <div className="flex flex-col justify-between gap-8 reveal opacity-0">
            {/* Chiffres clés */}
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-500 hover:border-accent/20 hover:bg-accent/[0.02]"
                >
                  <p className="font-mono text-4xl md:text-5xl font-black text-accent">
                    {v.number}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">
                    {v.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Carte mission */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent/[0.03] to-transparent p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-lg">
                  🎯
                </span>
                <p className="font-mono text-sm font-bold text-foreground">
                  Notre mission
                </p>
              </div>
              <p className="text-sm font-light leading-relaxed text-gray-400">
                Redonner aux indépendants et aux professions libérales la visibilité
                qu&apos;ils méritent sur Google. Nous combinons design technique,
                SEO local et gestion d&apos;avis pour faire de chaque site un véritable
                outil de croissance.
              </p>
            </div>
          </div>
        </div>

        {/* Barre d'expertise */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 reveal opacity-0">
          {[
            {
              icon: "⚡",
              title: "Design technique",
              desc: "Next.js, React, Tailwind — les technologies les plus rapides du marché pour une expérience utilisateur irréprochable.",
            },
            {
              icon: "📍",
              title: "SEO local",
              desc: "Optimisation complète de votre fiche Google My Business et stratégie de mots-clés géolocalisés.",
            },
            {
              icon: "⭐",
              title: "Gestion d'avis",
              desc: "Système automatisé qui collecte et filtre les avis pour maintenir une note parfaite sur votre profil Google.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <span className="block text-2xl mb-4">{item.icon}</span>
              <h3 className="font-mono font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
