"use client"

import { useEffect, useRef } from "react"

const RESULTS = [
  { title: "Concurrent A — Expert reconnu", url: "www.concurrent-a.fr", desc: "Plus de 15 ans d'expérience au service de vos projets." },
  { title: "Concurrent B — Référence locale", url: "www.concurrent-b.com", desc: "Solutions professionnelles adaptées à vos besoins." },
  { title: "Concurrent C — Le spécialiste", url: "www.concurrent-c.com", desc: "Un accompagnement sur-mesure pour chaque client." },
  { title: "Votre site — Personne ne vous trouve", url: "www.votre-site.fr", desc: "Pourtant, votre offre mérite d'être vue." },
]

export function SearchPhantom({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let time = 0
    const CYCLE_DURATION = 8000
    const FADE_IN = 2000
    const HOLD = 3000
    const FADE_OUT = 1500
    const HIDDEN = 1500

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
      const t = time % CYCLE_DURATION
      let phantomAlpha = 0
      if (t < FADE_IN) {
        phantomAlpha = t / FADE_IN
      } else if (t < FADE_IN + HOLD) {
        phantomAlpha = 1
      } else if (t < FADE_IN + HOLD + FADE_OUT) {
        phantomAlpha = 1 - (t - FADE_IN - HOLD) / FADE_OUT
      } else {
        phantomAlpha = 0
      }

      const searchY = h * 0.08
      const searchH = h * 0.12
      const tabY = searchY + searchH + h * 0.02
      const tabH = h * 0.06
      const resultsY = tabY + tabH + h * 0.04
      const rowH = (h - resultsY - h * 0.04) / 4
      const resultLeft = w * 0.08
      const resultW = w * 0.84

      // Search bar
      ctx.beginPath()
      ctx.roundRect(w * 0.06, searchY, w * 0.88, searchH, searchH / 2)
      ctx.fillStyle = "rgba(255,255,255,0.04)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255,255,255,0.08)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Magnifying glass icon
      const glassX = w * 0.10
      const glassY = searchY + searchH / 2
      ctx.beginPath()
      ctx.arc(glassX, glassY - 4, searchH * 0.15, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.2)"
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(glassX + searchH * 0.1, glassY - 4 + searchH * 0.1)
      ctx.lineTo(glassX + searchH * 0.2, glassY - 4 + searchH * 0.22)
      ctx.stroke()

      // Search text
      ctx.fillStyle = "rgba(255,255,255,0.25)"
      ctx.font = `${searchH * 0.3}px sans-serif`
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("votre activité + ville", w * 0.14, searchY + searchH / 2)

      // Tabs
      const tabs = ["Tous", "Images", "Maps", "Shopping", "Plus"]
      let tabX = w * 0.06
      ctx.font = `${tabH * 0.45}px sans-serif`
      for (let i = 0; i < tabs.length; i++) {
        ctx.fillStyle = i === 0 ? "rgba(200,240,0,0.7)" : "rgba(255,255,255,0.25)"
        ctx.fillText(tabs[i], tabX, tabY + tabH / 2)
        if (i === 0) {
          ctx.beginPath()
          ctx.moveTo(tabX, tabY + tabH)
          ctx.lineTo(tabX + ctx.measureText(tabs[i]).width, tabY + tabH)
          ctx.strokeStyle = "rgba(200,240,0,0.5)"
          ctx.lineWidth = 2
          ctx.stroke()
        }
        tabX += ctx.measureText(tabs[i]).width + w * 0.04
      }

      // Divider under tabs
      ctx.beginPath()
      ctx.moveTo(w * 0.06, tabY + tabH + 2)
      ctx.lineTo(w * 0.94, tabY + tabH + 2)
      ctx.strokeStyle = "rgba(255,255,255,0.04)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Results
      for (let i = 0; i < 4; i++) {
        const ry = resultsY + i * rowH + rowH * 0.08
        const isPhantom = i === 3
        const alpha = isPhantom ? phantomAlpha : 1
        if (alpha <= 0.01) continue

        const r = RESULTS[i]

        // Title
        ctx.fillStyle = `rgba(200,240,0,${0.5 + alpha * 0.3})`
        ctx.font = `bold ${rowH * 0.22}px sans-serif`
        ctx.textBaseline = "top"
        ctx.fillText(r.title, resultLeft, ry)

        // URL
        ctx.fillStyle = `rgba(255,255,255,${0.15 + alpha * 0.15})`
        ctx.font = `${rowH * 0.16}px sans-serif`
        ctx.fillText(r.url, resultLeft, ry + rowH * 0.28)

        // Description
        ctx.fillStyle = `rgba(255,255,255,${0.12 + alpha * 0.12})`
        ctx.font = `${rowH * 0.16}px sans-serif`
        ctx.fillText(r.desc, resultLeft, ry + rowH * 0.52)

        // Phantom indicator — subtle glow on the last result
        if (isPhantom && alpha > 0.3) {
          ctx.beginPath()
          ctx.roundRect(resultLeft - w * 0.01, ry - rowH * 0.04, resultW + w * 0.02, rowH * 0.85, 8)
          ctx.fillStyle = `rgba(200,240,0,${alpha * 0.03})`
          ctx.fill()
        }
      }

      // Stats counter
      ctx.fillStyle = "rgba(255,255,255,0.08)"
      ctx.font = `${rowH * 0.14}px sans-serif`
      ctx.textBaseline = "bottom"
      ctx.textAlign = "left"
      ctx.fillText(`Environ 0 résultat${phantomAlpha > 0.5 ? " (dont le vôtre, brièvement)" : ""}`, resultLeft, h - h * 0.02)

      time += 32
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
