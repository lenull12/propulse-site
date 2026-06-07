"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
      requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    const onLeave = () => {
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    // Grossit le ring sur les éléments cliquables
    const onHoverIn = () => {
      ring.style.width = "40px"
      ring.style.height = "40px"
      ring.style.borderColor = "rgba(200,240,0,0.6)"
    }
    const onHoverOut = () => {
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderColor = "rgba(200,240,0,0.3)"
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)

    const clickables = document.querySelectorAll("a, button, [role='button']")
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn)
      el.addEventListener("mouseleave", onHoverOut)
    })

    const raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn)
        el.removeEventListener("mouseleave", onHoverOut)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Point central */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      {/* Anneau suiveur */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-accent/30 opacity-0 transition-[width,height,border-color,opacity] duration-200"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
    </>
  )
}