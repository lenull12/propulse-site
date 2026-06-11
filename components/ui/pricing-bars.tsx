"use client"

import { useEffect, useRef } from "react"

const BARS = [
  { price: "1 000", label: "Starter", height: 0.4, opacity: 0.35 },
  { price: "2 000", label: "Pro", height: 0.7, opacity: 0.55 },
  { price: "3 500", label: "Premium", height: 1, opacity: 0.8 },
]

export function PricingBars() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let startTime: number | null = null
    let t = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = (time - startTime) / 1000
      t = elapsed

      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const barCount = BARS.length
      const gap = w * 0.08
      const totalGap = gap * (barCount - 1)
      const barWidth = (w - totalGap) / barCount * 0.55
      const spacing = (w - barWidth * barCount - totalGap) / (barCount + 1)

      // Animation de montée au démarrage (1.2s)
      const growProgress = Math.min(1, elapsed / 1.2)
      // easeOutCubic
      const easeOut = 1 - Math.pow(1 - growProgress, 3)

      // Ligne de base
      const floorY = h * 0.82
      const maxHeight = floorY - h * 0.12

      // Pulse lent continu
      const pulse = 1 + Math.sin(t * 0.8) * 0.02

      BARS.forEach((bar, i) => {
        const x = spacing * (i + 1) + barWidth * i + gap * i
        const targetBarHeight = maxHeight * bar.height
        const currentHeight = targetBarHeight * easeOut
        const y = floorY - currentHeight

        const alpha = bar.opacity * pulse

        // Glow sous la barre
        const glow = ctx.createRadialGradient(
          x + barWidth / 2, y + currentHeight / 2, 0,
          x + barWidth / 2, y + currentHeight / 2, currentHeight * 0.8
        )
        glow.addColorStop(0, `rgba(200, 240, 0, ${alpha * 0.15})`)
        glow.addColorStop(1, "rgba(200, 240, 0, 0)")
        ctx.fillStyle = glow
        ctx.fillRect(x - barWidth * 0.5, y - currentHeight * 0.2, barWidth * 2, currentHeight * 1.5)

        // Barre arrondie
        const radius = 4
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + barWidth - radius, y)
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
        ctx.lineTo(x + barWidth, floorY)
        ctx.lineTo(x, floorY)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()

        ctx.fillStyle = `rgba(200, 240, 0, ${alpha * 0.15})`
        ctx.fill()
        ctx.strokeStyle = `rgba(200, 240, 0, ${alpha * 0.7})`
        ctx.lineWidth = 1.2
        ctx.shadowColor = `rgba(200, 240, 0, ${alpha * 0.2})`
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0

        // Prix au-dessus de la barre
        if (growProgress > 0.6) {
          const priceAlpha = Math.min(1, (growProgress - 0.6) / 0.4)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * priceAlpha})`
          ctx.font = "600 18px 'JetBrains Mono', monospace"
          ctx.textAlign = "center"
          ctx.fillText(`${bar.price}€`, x + barWidth / 2, y - 10)
        }

        // Label sous la barre
        ctx.fillStyle = `rgba(255, 255, 255, ${0.35 * Math.min(1, growProgress / 0.5)})`
        ctx.font = "500 10px 'JetBrains Mono', monospace"
        ctx.textAlign = "center"
        ctx.fillText(bar.label, x + barWidth / 2, floorY + 22)
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="h-full w-full min-h-[240px]"
      aria-hidden="true"
    />
  )
}
