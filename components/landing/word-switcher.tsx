"use client"

import { useEffect, useState } from "react"

const WORDS = [
  "travailler pour vous",
  "générer des clients",
  "charger instantanément",
  "automatiser vos ventes",
  "propulser votre marque",
]

export function WordSwitcher() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState<"visible" | "exiting" | "hidden" | "entering">("visible")

  useEffect(() => {
    let mounted = true
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const schedule = () => {
      const t0 = setTimeout(() => {
        if (!mounted) return
        setStep("exiting")

        const t1 = setTimeout(() => {
          if (!mounted) return
          setIndex((prev) => (prev + 1) % WORDS.length)
          setStep("hidden")

          const t2 = setTimeout(() => {
            if (!mounted) return
            setStep("entering")

            const t3 = setTimeout(() => {
              if (!mounted) return
              setStep("visible")
              schedule()
            }, 30)
            timeouts.push(t3)
          }, 30)
          timeouts.push(t2)
        }, 400)
        timeouts.push(t1)
      }, 3500)
      timeouts.push(t0)
    }
    schedule()

    return () => {
      mounted = false
      timeouts.forEach(clearTimeout)
    }
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
    <span className="inline-block gradient-text-safe">
      <span
        className={`inline-block font-mono text-nowrap transform ${classes}`}
        style={{
          color: "#c8f000",
        }}
      >
        {WORDS[index]}
      </span>
    </span>
  )
}
