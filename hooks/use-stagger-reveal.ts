"use client"

import { useEffect, useRef } from "react"

export function useStaggerReveal(delay = 120) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]

    children.forEach((child) => {
      child.style.opacity = "0"
      child.style.transform = "translateY(20px)"
      child.style.transition = "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)"
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = "1"
                child.style.transform = "translateY(0)"
              }, i * delay)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [delay])

  return containerRef
}