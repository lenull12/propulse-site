import type { ReactNode } from "react"

/**
 * Convertit une ligne de markdown basique en JSX.
 * Supporte : **gras**, listes - et 1.
 */
export function renderLine(line: string, key: number): ReactNode {
  const trimmed = line.trim()

  // Ligne vide
  if (!trimmed) return null

  // Titre markdown
  if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
    return (
      <h3 key={key} className="mb-3 mt-6 font-mono text-base font-bold text-foreground first:mt-0">
        {trimmed.replace(/\*\*/g, "")}
      </h3>
    )
  }

  // Liste numérotée
  const numMatch = trimmed.match(/^\d+\.\s+(.+)/)
  if (numMatch) {
    return (
      <li key={key} className="ml-5 list-decimal text-sm font-light leading-relaxed text-gray-400 pl-1">
        <span
          dangerouslySetInnerHTML={{
            __html: numMatch[1].replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground'>$1</strong>"),
          }}
        />
      </li>
    )
  }

  // Liste à puce
  const dashMatch = trimmed.match(/^-\s+(.+)/)
  if (dashMatch) {
    return (
      <li key={key} className="ml-5 list-disc text-sm font-light leading-relaxed text-gray-400 pl-1">
        <span
          dangerouslySetInnerHTML={{
            __html: dashMatch[1].replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground'>$1</strong>"),
          }}
        />
      </li>
    )
  }

  // Paragraphe simple avec gras
  const html = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground'>$1</strong>")
  return (
    <p key={key} className="mb-4 text-sm font-light leading-relaxed text-gray-400 last:mb-0">
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </p>
  )
}