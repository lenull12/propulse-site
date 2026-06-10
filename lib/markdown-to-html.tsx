import type { ReactNode } from "react"

/**
 * Convertit une ligne de markdown basique en JSX.
 * Supporte : **gras**, listes - et 1.
 */
export function renderLine(line: string, key: number, light?: boolean): ReactNode {
  const trimmed = line.trim()
  const strongClass = light ? "text-gray-900" : "text-foreground"
  const bodyClass = light ? "text-gray-600" : "text-gray-400"
  const headingClass = light ? "text-gray-900" : "text-foreground"

  // Ligne vide
  if (!trimmed) return null

  // Titre markdown
  if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
    return (
      <h3 key={key} className={`mb-4 mt-8 font-mono text-lg font-bold ${headingClass} first:mt-0`}>
        {trimmed.replace(/\*\*/g, "")}
      </h3>
    )
  }

  // Liste numérotée
  const numMatch = trimmed.match(/^\d+\.\s+(.+)/)
  if (numMatch) {
    return (
      <li key={key} className={`ml-5 mb-2 list-decimal text-base font-light leading-relaxed ${bodyClass} pl-1`}>
        <span
          dangerouslySetInnerHTML={{
            __html: numMatch[1].replace(/\*\*(.+?)\*\*/g, `<strong class='${strongClass}'>$1</strong>`),
          }}
        />
      </li>
    )
  }

  // Liste à puce
  const dashMatch = trimmed.match(/^-\s+(.+)/)
  if (dashMatch) {
    return (
      <li key={key} className={`ml-5 mb-2 list-disc text-base font-light leading-relaxed ${bodyClass} pl-1`}>
        <span
          dangerouslySetInnerHTML={{
            __html: dashMatch[1].replace(/\*\*(.+?)\*\*/g, `<strong class='${strongClass}'>$1</strong>`),
          }}
        />
      </li>
    )
  }

  // Paragraphe simple avec gras
  const html = trimmed.replace(/\*\*(.+?)\*\*/g, `<strong class='${strongClass}'>$1</strong>`)
  return (
    <p key={key} className={`mb-5 text-base font-light leading-relaxed ${bodyClass} last:mb-0`}>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </p>
  )
}