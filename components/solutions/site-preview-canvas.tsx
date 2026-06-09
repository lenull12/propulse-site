"use client"

import { useEffect, useRef } from "react"

const W = 480
const H = 360

export function SitePreviewCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const c = ctx
    let frameId: number
    let start = performance.now()

    function draw(t: number) {
      const elapsed = (t - start) / 1000
      c.clearRect(0, 0, W, H)

      /* ── Window frame ── */
      const r = 10
      c.beginPath()
      c.roundRect(0, 0, W, H, r)
      c.fillStyle = "#111118"
      c.fill()
      c.strokeStyle = "rgba(255,255,255,0.08)"
      c.lineWidth = 1
      c.stroke()

      /* ── Title bar ── */
      const tbY = 0
      const tbH = 34
      c.fillStyle = "#0a0a0f"
      c.beginPath()
      c.roundRect(0, tbY, W, tbH, [r, r, 0, 0])
      c.fill()

      // Dots
      const dotColors = ["#ff5f57", "#febc2e", "#28c840"]
      const dotR = 4
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.arc(20 + i * 18, tbY + tbH / 2, dotR, 0, Math.PI * 2)
        c.fillStyle = dotColors[i]
        c.globalAlpha = 0.6
        c.fill()
      }
      c.globalAlpha = 1

      // URL text
      c.fillStyle = "rgba(255,255,255,0.15)"
      c.font = "10px ui-monospace, monospace"
      c.textAlign = "center"
      c.fillText("propulse.dev", W / 2, tbY + tbH / 2 + 3.5)

      /* ── Nav bar ── */
      const navY = tbH
      const navH = 34
      c.fillStyle = "rgba(255,255,255,0.02)"
      c.fillRect(0, navY, W, navH)

      const navItems = ["Accueil", "Services", "Réalisations", "Contact"]
      const navStartX = 24
      for (let i = 0; i < navItems.length; i++) {
        c.fillStyle = i === 0 ? "#c8f000" : "rgba(255,255,255,0.3)"
        c.font = "9px ui-sans-serif, sans-serif"
        c.textAlign = "left"
        c.fillText(navItems[i], navStartX + i * 52, navY + navH / 2 + 3)
      }

      // CTA nav button
      c.fillStyle = "#c8f000"
      c.beginPath()
      c.roundRect(W - 80, navY + 7, 64, 20, 10)
      c.fill()
      c.fillStyle = "#050505"
      c.font = "bold 8px ui-sans-serif, sans-serif"
      c.textAlign = "center"
      c.fillText("Contact", W - 48, navY + navH / 2 + 3)

      /* ── Hero gradient block ── */
      const heroY = navY + navH + 16
      const heroH = 110
      const heroX = 20
      const heroW = W - 40

      const grad = c.createLinearGradient(heroX, heroY, heroX + heroW, heroY + heroH)
      const shift = Math.sin(elapsed * 0.3) * 0.15
      grad.addColorStop(0 + shift, "rgba(20, 184, 166, 0.25)")
      grad.addColorStop(0.5 + shift, "rgba(0, 240, 255, 0.15)")
      grad.addColorStop(1 + shift, "rgba(200, 240, 0, 0.25)")

      c.fillStyle = grad
      c.beginPath()
      c.roundRect(heroX, heroY, heroW, heroH, 8)
      c.fill()

      // Glow overlay
      const glow = c.createRadialGradient(heroX + heroW / 2, heroY + heroH / 2, 10, heroX + heroW / 2, heroY + heroH / 2, 80)
      glow.addColorStop(0, `rgba(200, 240, 0, ${0.04 + Math.sin(elapsed * 0.5) * 0.02})`)
      glow.addColorStop(1, "rgba(200, 240, 0, 0)")
      c.fillStyle = glow
      c.beginPath()
      c.roundRect(heroX, heroY, heroW, heroH, 8)
      c.fill()

      // Decorative lines inside hero
      for (let i = 0; i < 3; i++) {
        const ly = heroY + 30 + i * 28
        const lw = 140 - i * 30
        c.fillStyle = "rgba(255,255,255,0.06)"
        c.beginPath()
        c.roundRect(heroX + 30, ly, lw, 6, 3)
        c.fill()
      }

      // Accent accent
      c.fillStyle = "#c8f000"
      c.beginPath()
      c.roundRect(heroX + 30, heroY + 18, 48, 4, 2)
      c.fill()

      /* ── Content below hero ── */
      const contentY = heroY + heroH + 20

      // Title
      c.fillStyle = "rgba(255,255,255,0.85)"
      c.font = "bold 14px ui-monospace, monospace"
      c.textAlign = "left"
      c.fillText("Site web premium", heroX, contentY + 14)

      // Subtitle lines
      for (let i = 0; i < 3; i++) {
        c.fillStyle = "rgba(255,255,255,0.15)"
        c.beginPath()
        c.roundRect(heroX, contentY + 26 + i * 12, 220 - i * 30, 5, 2.5)
        c.fill()
      }

      /* ── CTA ── */
      const ctaY = contentY + 66
      c.fillStyle = "#c8f000"
      c.beginPath()
      c.roundRect(heroX, ctaY, 130, 28, 14)
      c.fill()

      const ctaPulse = 0.3 + Math.sin(elapsed * 1.2) * 0.08
      c.shadowColor = "rgba(200, 240, 0, 0.4)"
      c.shadowBlur = 15 * ctaPulse
      c.fillStyle = "#c8f000"
      c.beginPath()
      c.roundRect(heroX, ctaY, 130, 28, 14)
      c.fill()
      c.shadowBlur = 0

      c.fillStyle = "#050505"
      c.font = "bold 10px ui-sans-serif, sans-serif"
      c.textAlign = "center"
      c.fillText("Audit gratuit", heroX + 65, ctaY + 17)

      /* ── Stats row ── */
      const statsY = ctaY + 50
      const stats = [
        { val: "95+", label: "Pagespeed" },
        { val: "100%", label: "Responsive" },
        { val: "50+", label: "Sites lancés" },
      ]
      for (let i = 0; i < stats.length; i++) {
        const sx = heroX + i * 100 + 10
        c.fillStyle = "#c8f000"
        c.font = "bold 13px ui-monospace, monospace"
        c.textAlign = "left"
        c.fillText(stats[i].val, sx, statsY + 12)

        c.fillStyle = "rgba(255,255,255,0.25)"
        c.font = "8px ui-sans-serif, sans-serif"
        c.fillText(stats[i].label, sx, statsY + 24)
      }

      // Separator line before stats
      c.fillStyle = "rgba(255,255,255,0.06)"
      c.fillRect(heroX, statsY - 12, heroW, 1)

      // Subtle scan line overlay
      c.fillStyle = `rgba(255,255,255,${0.015 + Math.sin(elapsed * 20) * 0.005})`
      c.fillRect(0, ((elapsed * 60) % H) | 0, W, 1)

      frameId = requestAnimationFrame(draw)
    }

    frameId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", maxWidth: W, height: "auto", aspectRatio: `${W}/${H}` }}
      className="rounded-2xl"
      aria-label="Aperçu animé d'un site web premium"
    />
  )
}
