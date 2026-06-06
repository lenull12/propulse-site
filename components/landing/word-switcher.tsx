"use client"

import { useEffect, useState } from "react"

const WORDS = [
  "travailler pour vous.",
  "générer des clients.",
  "charger instantanément.",
  "automatiser vos ventes.",
  "propulser votre marque.",
]

export function WordSwitcher() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState<"visible" | "exiting" | "hidden" | "entering">("visible")

  useEffect(() => {
    const interval = setInterval(() => {
      // Lance l'animation de sortie
      setStep("exiting")
      
      // Une fois la transition de sortie terminée (400ms), change de mot et le place en bas (caché)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length)
        setStep("hidden")
        
        // Court délai avant de commencer l'animation d'entrée
        setTimeout(() => {
          setStep("entering")
          
          // Glisse vers sa position finale
          setTimeout(() => {
            setStep("visible")
          }, 30)
        }, 30)
      }, 400)
      
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  // Détermination des classes CSS pour l'animation
  let classes = ""
  if (step === "visible") {
    classes = "translate-y-0 opacity-100 blur-0 transition-all duration-500 ease-out"
  } else if (step === "exiting") {
    classes = "-translate-y-3 opacity-0 blur-md transition-all duration-400 ease-in"
  } else if (step === "hidden") {
    classes = "translate-y-3 opacity-0 blur-md"
  } else if (step === "entering") {
    classes = "translate-y-3 opacity-0 blur-md transition-all duration-500 ease-out"
  }

  return (
    <span className="inline-block">
      <span
        className={`inline-block font-mono bg-gradient-to-r from-[#c8f000] via-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent transform ${classes}`}
      >
        {WORDS[index]}
      </span>
    </span>
  )
}
