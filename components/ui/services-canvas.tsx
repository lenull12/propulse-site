"use client"

import { useEffect, useRef } from "react"

export function ServicesCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let time = 0

    const nodes = [
      { label: "Site", color: "255,255,255" },
      { label: "Fiche Google", color: "200,240,0" },
      { label: "Avis Clients", color: "255,255,255" },
      { label: "Croissance", color: "200,240,0" },
    ]

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      if (ctx) ctx.scale(dpr, dpr)
    }

    // Retourne les positions des 4 nœuds en forme de S
    function getNodePos(w: number, h: number) {
      const cx = w / 2
      const cy = h / 2
      const spread = Math.min(w, h) * 0.22
      const gap = spread * 0.5
      return [
        { x: cx - spread, y: cy - gap },
        { x: cx + spread, y: cy - gap },
        { x: cx - spread, y: cy + gap },
        { x: cx + spread, y: cy + gap },
      ]
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)
      time += 0.012

      const positions = getNodePos(w, h)
      const nodeR = Math.min(w, h) * 0.065

      // Lignes de chemin S
      ctx.beginPath()
      ctx.moveTo(positions[0].x, positions[0].y)
      ctx.lineTo(positions[1].x, positions[1].y)
      ctx.lineTo(positions[2].x, positions[2].y)
      ctx.lineTo(positions[3].x, positions[3].y)

      ctx.strokeStyle = "rgba(255,255,255,0.06)"
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 8])
      ctx.stroke()
      ctx.setLineDash([])

      // Second chemin parallèle (plus court, pour la profondeur)
      const offset = Math.min(w, h) * 0.015
      ctx.beginPath()
      ctx.moveTo(positions[0].x, positions[0].y - offset)
      ctx.lineTo(positions[1].x, positions[1].y + offset)
      ctx.lineTo(positions[2].x, positions[2].y - offset)
      ctx.lineTo(positions[3].x, positions[3].y + offset)
      ctx.strokeStyle = "rgba(200,240,0,0.03)"
      ctx.lineWidth = 0.8
      ctx.setLineDash([3, 10])
      ctx.stroke()
      ctx.setLineDash([])

      // Particules qui voyagent sur le chemin
      for (let p = 0; p < 6; p++) {
        const t = (time * 0.15 + p * 0.14) % 1
        const segment = t * 3
        const segIndex = Math.floor(segment)
        const segT = segment - segIndex
        const i = segIndex
        const j = i < 3 ? i + 1 : 3

        const x = positions[i].x + (positions[j].x - positions[i].x) * segT
        const y = positions[i].y + (positions[j].y - positions[i].y) * segT

        // Trainée lumineuse
        const trailLen = 6
        for (let k = trailLen; k >= 0; k--) {
          const trailT = Math.max(0, t - k * 0.008)
          const trailSeg = trailT * 3
          const trailSegIndex = Math.floor(trailSeg)
          const trailSegT = trailSeg - trailSegIndex
          const ti = trailSegIndex
          const tj = ti < 3 ? ti + 1 : 3
          if (tj > 3) continue
          const tx = positions[ti].x + (positions[tj].x - positions[ti].x) * trailSegT
          const ty = positions[ti].y + (positions[tj].y - positions[ti].y) * trailSegT
          const alpha = (1 - k / trailLen) * 0.4
          const size = (1 - k / trailLen) * 4
          ctx.beginPath()
          ctx.arc(tx, ty, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200,240,0,${alpha})`
          ctx.fill()
        }
      }

      // Nœuds
      for (let i = 0; i < nodes.length; i++) {
        const pos = positions[i]
        const node = nodes[i]
        const pulse = Math.sin(time * 1.2 + i * 1.8) * 0.3 + 0.7

        // Halo externe
        const haloGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeR * 2.5)
        const baseColor = node.color === "255,255,255" ? "255,255,255" : "200,240,0"
        haloGrad.addColorStop(0, `rgba(${baseColor},${0.06 * pulse})`)
        haloGrad.addColorStop(1, `rgba(${baseColor},0)`)
        ctx.fillStyle = haloGrad
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, nodeR * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Cercle extérieur
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, nodeR * 1.3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${node.color},${0.15 * pulse})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Cercle intérieur rempli
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, nodeR * 0.9, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${node.color},${0.04 * pulse})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${node.color},${0.25 * pulse})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Petits points en orbite autour du nœud
        for (let j = 0; j < 5; j++) {
          const a = time * 0.8 + i * 1.3 + j * 1.26
          const dist = nodeR * 1.6 + Math.sin(a * 2) * nodeR * 0.3
          const ox = pos.x + Math.cos(a) * dist
          const oy = pos.y + Math.sin(a) * dist
          ctx.beginPath()
          ctx.arc(ox, oy, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${node.color},${0.15 + Math.sin(a) * 0.1})`
          ctx.fill()
        }

        // Label
        ctx.font = `${Math.min(nodeR * 0.65, 13)}px "JetBrains Mono", monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = `rgba(${node.color},${0.5 + pulse * 0.2})`
        ctx.fillText(node.label, pos.x, pos.y + nodeR * 2 + 16)
      }

      // Particules de fond (ambiance)
      for (let i = 0; i < 30; i++) {
        const seed = i * 137.5
        const px = (Math.sin(seed) * 0.5 + 0.5) * w
        const py = (Math.cos(seed * 1.3) * 0.5 + 0.5) * h
        const drift = Math.sin(time * 0.3 + seed) * 5
        const alpha = 0.05 + Math.sin(time * 0.5 + i) * 0.02
        ctx.beginPath()
        ctx.arc(px + drift, py, 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
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
