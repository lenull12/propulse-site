"use client"

import { useEffect, useState, useRef } from "react"
import { Typewriter } from "@/components/ui/typewriter"
import { Reveal } from "@/components/ui/reveal"

const STEPS = [
  {
    num: "01",
    title: "Audit initial offert",
    tagline: "Analyse complète & plan d'action",
    text: "Nous analysons votre site actuel et votre fiche Google My Business en 24h. Nous repérons les failles de performance, de SEO et de conversion, puis nous vous envoyons un rapport détaillé avec des actions concrètes.",
    details: [
      "Analyse technique approfondie",
      "Évaluation de l'expérience mobile",
      "Plan d'action priorisé",
    ],
  },
  {
    num: "02",
    title: "Refonte de site sur-mesure",
    tagline: "Conception, développement & SEO",
    text: "Nous développons votre nouveau site web en utilisant les technologies les plus rapides du marché (Next.js/React). Le site est construit sur-mesure pour votre secteur, ultra-rapide sur mobile, et optimisé pour le référencement naturel.",
    details: [
      "Performance Google PageSpeed > 95%",
      "Design adapté à votre image de marque",
      "Formulaires de contact optimisés",
    ],
  },
  {
    num: "03",
    title: "Automatisation de la croissance",
    tagline: "Réputation & avis Google automatisés",
    text: "Nous mettons en place un système automatisé qui invite vos clients satisfaits à laisser un avis 5 étoiles sur votre fiche Google, tout en filtrant les avis négatifs. Votre autorité locale grandit toute seule.",
    details: [
      "Système de collecte par SMS / QR Codes",
      "Gestion automatisée des réclamations",
      "Rapports mensuels de performance",
    ],
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => prev + 2)
    }, 100)
  }

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  useEffect(() => {
    if (progress >= 100) {
      setActiveStep((curr) => (curr + 1) % STEPS.length)
      setProgress(0)
    }
  }, [progress])

  const handleStepClick = (idx: number) => {
    setActiveStep(idx)
    setProgress(0)
  }

  return (
    <section id="process" className="relative bg-background px-6 py-32 md:px-12 overflow-hidden border-t border-white/5 ">
      {/* Halo lumineux en arrière-plan */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-accent/40" />
          <p className="text-sm font-medium tracking-wide text-accent font-sans">La méthode</p>
        </div>
        
        <h2 className="mb-16 font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground">
          <Typewriter
            lines={["Un processus fluide.", "Zéro friction,", "des résultats rapides."]}
            speed={50}
            triggerOnView
            lineClassName={[
              "block",
              "block text-gray-500",
              "block text-accent",
            ]}
          />
        </h2>

        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Liste des étapes à gauche (col-span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep
              return (
                <button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className={`group relative text-left p-6 rounded-[16px] border transition-all duration-500 overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-surface border-white/10"
                      : "bg-transparent border-transparent hover:border-white/5 hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`font-mono text-3xl font-black transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-white/20 group-hover:text-white/40"
                      }`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-mono font-bold text-lg text-foreground">{step.title}</h3>
                      <span className="text-xs font-light text-white/45">{step.tagline}</span>
                    </div>
                  </div>

                  {/* Barre de progression en bas */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                      <div
                        className="h-full bg-accent origin-left transition-transform duration-100 ease-linear"
                        style={{ transform: `scaleX(${progress / 100})` }}
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Détails de l'étape active à droite (col-span 7) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full flex flex-col justify-between rounded-[20px] border border-white/5 bg-surface/40 p-8 md:p-12 relative overflow-hidden">
              {/* Filigrane géant en arrière-plan */}
              <div className="absolute -right-6 -bottom-10 font-mono text-[180px] font-black text-white/[0.01] select-none pointer-events-none">
                {STEPS[activeStep].num}
              </div>
              
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1.5 rounded-md inline-block mb-6">
                  {STEPS[activeStep].tagline}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {STEPS[activeStep].title}
                </h3>
                
                <p className="text-sm md:text-base font-light leading-relaxed text-gray-400 mb-8 max-w-[580px]">
                  {STEPS[activeStep].text}
                </p>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-4">
                  Livrables & Garanties
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STEPS[activeStep].details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-light text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}