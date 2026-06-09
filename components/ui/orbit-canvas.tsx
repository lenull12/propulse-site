"use client"

import { useEffect, useRef } from "react"

const DOTS = [
  { label: "Visibilité", color: "200,240,0" },
  { label: "Confiance", color: "20,184,166" },
  { label: "Avis", color: "255,255,255" },
]

export function OrbitCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let angle = 0

    function draw() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const orbitR = Math.min(w, h) * 0.28

      angle += 0.008

      for (let i = 0; i < 3; i++) {
        const theta = angle + (i * Math.PI * 2) / 3
        const x = cx + Math.cos(theta) * orbitR
        const y = cy + Math.sin(theta) * orbitR

        const showLabel = Math.sin(theta) > 0.7
        const labelAlpha = Math.max(0, (Math.sin(theta) - 0.7) / 0.3)

        // Trail — arc segment behind each dot
        ctx.beginPath()
        ctx.arc(cx, cy, orbitR, theta - 0.4, theta)
        ctx.strokeStyle = `rgba(${DOTS[i].color},${0.15})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
        gradient.addColorStop(0, `rgba(${DOTS[i].color},0.15)`)
        gradient.addColorStop(1, `rgba(${DOTS[i].color},0)`)
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Dot
        ctx.beginPath()
        ctx.arc(x, y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOTS[i].color},0.9)`
        ctx.fill()
        ctx.shadowColor = `rgba(${DOTS[i].color},0.5)`
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0

        // Orbit ring (subtle)
        if (i === 0) {
          ctx.beginPath()
          ctx.arc(cx, cy, orbitR, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(255,255,255,0.03)"
          ctx.lineWidth = 1
          ctx.setLineDash([4, 8])
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Label
        if (showLabel && labelAlpha > 0.05) {
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"
          ctx.font = `bold ${Math.min(w, h) * 0.045}px 'Inter', sans-serif`
          ctx.fillStyle = `rgba(${DOTS[i].color},${0.3 + labelAlpha * 0.7})`
          ctx.fillText(DOTS[i].label, x, y - orbitR * 0.35)
        }
      }

      // Center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 2, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,0.08)"
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}
