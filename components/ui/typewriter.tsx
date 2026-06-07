"use client"

import { useEffect, useState, useRef } from "react"

interface TypewriterProps {
  lines: string[]
  speed?: number
  wrapperClassName?: string
  lineClassName?: string | string[]
  triggerOnView?: boolean
}

export function Typewriter({
  lines,
  speed = 45,
  wrapperClassName = "",
  lineClassName,
  triggerOnView = false,
}: TypewriterProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [started, setStarted] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    if (triggerOnView) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setStarted(true)
              observer.disconnect()
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(rootRef.current)
      return () => observer.disconnect()
    } else {
      setStarted(true)
    }
  }, [triggerOnView])

  useEffect(() => {
    if (!started || lines.length === 0) return

    setDisplayedLines(lines.map(() => ""))
    let lineIndex = 0
    let charIndex = 0

    const timers: number[] = []

    const clearAll = () => {
      timers.forEach((id) => {
        window.clearTimeout(id)
        window.clearInterval(id)
      })
      timers.length = 0
    }

    const typeLine = () => {
      const tick = () => {
        charIndex += 1
        setDisplayedLines((prev) => {
          const next = [...prev]
          const current = lines[lineIndex]
          next[lineIndex] = current.slice(0, Math.min(charIndex, current.length))
          return next
        })

        if (charIndex < lines[lineIndex].length) {
          const id = window.setTimeout(tick, speed)
          timers.push(id)
        } else if (lineIndex + 1 < lines.length) {
          lineIndex += 1
          charIndex = 0
          setDisplayedLines((prev) => {
            const next = [...prev]
            next[lineIndex] = ""
            return next
          })
          const id = window.setTimeout(typeLine, 120)
          timers.push(id)
        }
      }

      const id = window.setTimeout(tick, speed)
      timers.push(id)
    }

    typeLine()

    return clearAll
  }, [started, lines.join("\n"), speed])

  const getLineClass = (idx: number) => {
    if (!lineClassName) return undefined
    if (Array.isArray(lineClassName)) return lineClassName[idx]
    return lineClassName
  }

  return (
    <div ref={rootRef} className={wrapperClassName}>
      {displayedLines.map((line, idx) => (
        <span key={idx} className={getLineClass(idx)}>
          {line}
        </span>
      ))}
    </div>
  )
}
