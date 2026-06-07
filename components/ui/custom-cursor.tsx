"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const halo = haloRef.current
    if (!dot || !ring || !halo) return

    let mouseX = 0
    let mouseY = 0
    let haloX = 0
    let haloY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      ring.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`
      dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`
    }

    const animate = () => {
      haloX += (mouseX - haloX) * 0.08
      haloY += (mouseY - haloY) * 0.08
      halo.style.transform = `translate(${haloX - 75}px, ${haloY - 75}px)`
      requestAnimationFrame(animate)
    }

    const onEnter = () => {
      ring.style.opacity = "1"
      halo.style.opacity = "0.6"
      dot.style.opacity = "1"
    }

    const onLeave = () => {
      ring.style.opacity = "0"
      halo.style.opacity = "0"
      dot.style.opacity = "0"
    }

    const onHoverIn = () => {
      ring.style.width = "40px"
      ring.style.height = "40px"
      ring.style.borderColor = "rgba(200,240,0,0.8)"
    }

    const onHoverOut = () => {
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderColor = "rgba(200,240,0,0.5)"
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
      {/* Halo flou traînant (arrière-plan) */}
      <div
        ref={haloRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0 transition-opacity duration-500"
        style={{
          willChange: "transform",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,240,0,0.25) 0%, rgba(200,240,0,0.08) 40%, transparent 70%)",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />
      {/* Cercle extérieur (curseur visuel principal) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-[width,height,border-color,opacity] duration-200"
        style={{
          willChange: "transform",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(200,240,0,0.6)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.4), 0 0 12px rgba(200,240,0,0.3), inset 0 0 6px rgba(200,240,0,0.15)",
        }}
        aria-hidden="true"
      />
      {/* Point central (suit exactement la souris) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-300"
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#c8f000",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.5), 0 0 8px rgba(200,240,0,0.9)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  )
}