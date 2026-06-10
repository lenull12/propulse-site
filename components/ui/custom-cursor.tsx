"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches)
  }, [])

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const visible = useRef(false)

  useEffect(() => {
    if (isMobile) return

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
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      ring.style.left = `${mouseX}px`
      ring.style.top = `${mouseY}px`
      show()
    }

    const animate = () => {
      haloX += (mouseX - haloX) * 0.08
      haloY += (mouseY - haloY) * 0.08
      halo.style.transform = `translate(${haloX - 75}px, ${haloY - 75}px)`
      rafId = requestAnimationFrame(animate)
    }

    const onHoverIn = () => {
      ring.style.width = "38px"
      ring.style.height = "38px"
      ring.style.borderColor = "rgba(200,240,0,0.9)"
    }

    const onHoverOut = () => {
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderColor = "rgba(200,240,0,0.6)"
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) hide()
    }

    const onMouseEnter = () => show()

    function attach(el: Element) {
      el.addEventListener("mouseenter", onHoverIn)
      el.addEventListener("mouseleave", onHoverOut)
    }

    function detach(el: Element) {
      el.removeEventListener("mouseenter", onHoverIn)
      el.removeEventListener("mouseleave", onHoverOut)
    }

    function syncClickables() {
      document.querySelectorAll("a, button, [role='button']").forEach(attach)
    }

    const observer = new MutationObserver(() => {
      syncClickables()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    syncClickables()

    function startLoop() {
      rafId = requestAnimationFrame(animate)
    }

    if ("requestIdleCallback" in window) {
      requestIdleCallback(startLoop, { timeout: 500 })
    } else {
      setTimeout(startLoop, 200)
    }

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={haloRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,240,0,0.25) 0%, rgba(200,240,0,0.08) 40%, transparent 70%)",
          filter: "blur(8px)",
          transition: "opacity 0.3s ease",
          transform: "translate(-75px, -75px)",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(200,240,0,0.6)",
          boxShadow: "0 0 12px rgba(200,240,0,0.3), 0 0 0 2px rgba(0,0,0,0.25)",
          transform: "translate(-50%, -50%)",
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
          boxShadow: "0 0 8px rgba(200,240,0,0.9), 0 0 0 2px rgba(0,0,0,0.3)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />
    </>
  )
}
