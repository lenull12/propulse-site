"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const visible = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const halo = haloRef.current
    if (!dot || !ring || !halo) return

    let mouseX = 0
    let mouseY = 0
    let haloX = 0
    let haloY = 0
    let rafId: number

    const show = () => {
      if (visible.current) return
      visible.current = true
      dot.style.opacity = "1"
      ring.style.opacity = "1"
      halo.style.opacity = "0.6"
    }

    const hide = () => {
      visible.current = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
      halo.style.opacity = "0"
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Positionne dot et ring immédiatement
      dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`
      ring.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`
      show()
    }

    const animate = () => {
      haloX += (mouseX - haloX) * 0.08
      haloY += (mouseY - haloY) * 0.08
      halo.style.transform = `translate(${haloX - 75}px, ${haloY - 75}px)`
      rafId = requestAnimationFrame(animate)
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

    // Masque le curseur quand la souris quitte la fenêtre
    const onMouseLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) hide()
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onMouseLeave)

    const clickables = document.querySelectorAll("a, button, [role='button']")
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn)
      el.addEventListener("mouseleave", onHoverOut)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn)
        el.removeEventListener("mouseleave", onHoverOut)
      })
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={haloRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0"
        style={{
          willChange: "transform",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,240,0,0.25) 0%, rgba(200,240,0,0.08) 40%, transparent 70%)",
          filter: "blur(8px)",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          willChange: "transform",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(200,240,0,0.6)",
          boxShadow: "0 0 12px rgba(200,240,0,0.3)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.3s ease",
        }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#c8f000",
          boxShadow: "0 0 8px rgba(200,240,0,0.9)",
          willChange: "transform",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />
    </>
  )
}