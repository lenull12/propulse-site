"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  z: number
  r: number
}

export function GlobeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let rotation = 0
    let points: Point[] = []

    const NUM_POINTS = 80
    const CONNECTION_DIST = 150
    const RADIUS_RATIO = 0.38

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    function generatePoints(w: number, h: number) {
      const r = Math.min(w, h) * RADIUS_RATIO
      points = []
      for (let i = 0; i < NUM_POINTS; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        points.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
          r: 1.5 + Math.random() * 1.5,
        })
      }
    }

    function project(p: Point, angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const xz = p.x * cos - p.z * sin
      const zz = p.x * sin + p.z * cos
      return { x: xz, y: p.y, z: zz }
    }

    function draw() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2

      ctx.clearRect(0, 0, w, h)

      rotation += 0.004

      const projected = points.map((p) => ({
        ...project(p, rotation),
        radius: p.r,
      }))

      projected.sort((a, b) => a.z - b.z)

      // Connexions
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x
          const dy = projected[i].y - projected[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const avgZ = (projected[i].z + projected[j].z) / 2
            const maxZ = Math.min(w, h) * RADIUS_RATIO
            const alpha = Math.max(0, (1 - dist / CONNECTION_DIST) * (0.5 + avgZ / maxZ * 0.5))
            ctx.beginPath()
            ctx.moveTo(cx + projected[i].x, cy + projected[i].y)
            ctx.lineTo(cx + projected[j].x, cy + projected[j].y)
            ctx.strokeStyle = `rgba(200, 240, 0, ${alpha * 0.25})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Points
      for (const p of projected) {
        const maxZ = Math.min(w, h) * RADIUS_RATIO
        const alpha = 0.4 + (p.z / maxZ) * 0.6
        const size = p.radius * (0.6 + (p.z / maxZ) * 0.4)
        ctx.beginPath()
        ctx.arc(cx + p.x, cy + p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 240, 0, ${alpha})`
        ctx.fill()
        ctx.shadowColor = "rgba(200, 240, 0, 0.3)"
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Halo
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.45)
      gradient.addColorStop(0, "rgba(200, 240, 0, 0.04)")
      gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.02)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w, h) * 0.45, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(draw)
    }

    function init() {
      if (!canvas) return
      resize()
      const rect = canvas.getBoundingClientRect()
      generatePoints(rect.width, rect.height)
      draw()
    }

    init()

    const onResize = () => {
      if (!canvas) return
      resize()
      const rect = canvas.getBoundingClientRect()
      generatePoints(rect.width, rect.height)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
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
