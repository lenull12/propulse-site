import type { ReactNode } from "react"

function inlineHtml(line: string, light?: boolean): string {
  const strongClass = light ? "text-gray-900" : "text-foreground"
  return line.replace(/\*\*(.+?)\*\*/g, `<strong class='${strongClass}'>$1</strong>`)
}

function renderLine(line: string, key: number, light?: boolean): ReactNode {
  const trimmed = line.trim()
  const bodyClass = light ? "text-gray-600" : "text-gray-400"
  const headingClass = light ? "text-gray-900" : "text-foreground"

  if (!trimmed) return null

  if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
    return (
      <h3 key={key} className={`mb-4 mt-8 font-mono text-lg font-bold ${headingClass} first:mt-0`}>
        {trimmed.replace(/\*\*/g, "")}
      </h3>
    )
  }

  return (
    <p key={key} className={`mb-5 text-base font-light leading-relaxed ${bodyClass} last:mb-0`}>
      <span dangerouslySetInnerHTML={{ __html: inlineHtml(trimmed, light) }} />
    </p>
  )
}

export function renderContent(content: string[], light?: boolean): ReactNode[] {
  const result: ReactNode[] = []
  let i = 0
  let keyCounter = 0

  while (i < content.length) {
    const trimmed = content[i].trim()
    if (!trimmed) {
      i++
      continue
    }

    keyCounter++
    const strongClass = light ? "text-gray-900" : "text-foreground"
    const bodyClass = light ? "text-gray-600" : "text-gray-400"

    const numMatch = trimmed.match(/^\d+\.\s+(.+)/)
    if (numMatch) {
      const items: ReactNode[] = []
      while (i < content.length) {
        const t = content[i].trim()
        const m = t.match(/^\d+\.\s+(.+)/)
        if (!m) break
        items.push(
          <li key={`${keyCounter}-${items.length}`} className="mb-2 text-base font-light leading-relaxed last:mb-0">
            <span
              className={bodyClass}
              dangerouslySetInnerHTML={{ __html: inlineHtml(m[1], light) }}
            />
          </li>
        )
        i++
      }
      result.push(
        <ol key={keyCounter} className={`mb-5 ml-5 list-decimal pl-1 ${bodyClass}`}>
          {items}
        </ol>
      )
      continue
    }

    const dashMatch = trimmed.match(/^-\s+(.+)/)
    if (dashMatch) {
      const items: ReactNode[] = []
      while (i < content.length) {
        const t = content[i].trim()
        const m = t.match(/^-\s+(.+)/)
        if (!m) break
        items.push(
          <li key={`${keyCounter}-${items.length}`} className="mb-2 text-base font-light leading-relaxed last:mb-0">
            <span
              className={bodyClass}
              dangerouslySetInnerHTML={{ __html: inlineHtml(m[1], light) }}
            />
          </li>
        )
        i++
      }
      result.push(
        <ul key={keyCounter} className={`mb-5 ml-5 list-disc pl-1 ${bodyClass}`}>
          {items}
        </ul>
      )
      continue
    }

    result.push(renderLine(content[i], keyCounter, light))
    i++
  }

  return result
}
