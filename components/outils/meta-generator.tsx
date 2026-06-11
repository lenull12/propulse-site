"use client"

import { useState, useMemo } from "react"

type MetaForm = {
  siteName: string
  pageTitle: string
  description: string
  url: string
  imageUrl: string
  twitterSite: string
}

const INITIAL_FORM: MetaForm = {
  siteName: "",
  pageTitle: "",
  description: "",
  url: "",
  imageUrl: "",
  twitterSite: "",
}

export function MetaGenerator() {
  const [form, setForm] = useState<MetaForm>(INITIAL_FORM)
  const [copied, setCopied] = useState<string | null>(null)

  const update = (partial: Partial<MetaForm>) => setForm(f => ({ ...f, ...partial }))

  const ogImage = form.imageUrl || "https://propulsedev.fr/og-default.jpg"

  const generatedHTML = useMemo(() => {
    const title = form.pageTitle ? `${form.pageTitle}${form.siteName ? ` | ${form.siteName}` : ""}` : ""
    const lines = [
      `<!-- Primary Meta Tags -->`,
      title ? `<title>${title}</title>` : "",
      form.description ? `<meta name="description" content="${form.description}" />` : "",
      ``,
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="website" />`,
      form.url ? `<meta property="og:url" content="${form.url}" />` : "",
      title ? `<meta property="og:title" content="${title}" />` : "",
      form.description ? `<meta property="og:description" content="${form.description}" />` : "",
      `<meta property="og:image" content="${ogImage}" />`,
      ``,
      `<!-- Twitter -->`,
      `<meta property="twitter:card" content="summary_large_image" />`,
      form.url ? `<meta property="twitter:url" content="${form.url}" />` : "",
      title ? `<meta property="twitter:title" content="${title}" />` : "",
      form.description ? `<meta property="twitter:description" content="${form.description}" />` : "",
      `<meta property="twitter:image" content="${ogImage}" />`,
      form.twitterSite ? `<meta name="twitter:site" content="${form.twitterSite}" />` : "",
    ]
    return lines.filter(Boolean).join("\n")
  }, [form, ogImage])

  const searchPreview = useMemo(() => {
    if (!form.pageTitle && !form.description) return null
    const title = form.pageTitle ? `${form.pageTitle}${form.siteName ? ` | ${form.siteName}` : ""}` : ""
    return { title, desc: form.description }
  }, [form])

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch { }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Nom du site</label>
          <input
            type="text"
            value={form.siteName}
            onChange={e => update({ siteName: e.target.value })}
            placeholder="PropulseDev"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Titre de la page</label>
          <input
            type="text"
            value={form.pageTitle}
            onChange={e => update({ pageTitle: e.target.value })}
            placeholder="Création de site web"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">Méta description</label>
          <textarea
            value={form.description}
            onChange={e => update({ description: e.target.value })}
            placeholder="Découvrez nos solutions de création de site web pour indépendants..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors resize-none"
          />
          {form.description && (
            <p className={`text-xs mt-1 ${form.description.length <= 160 ? "text-green-500" : "text-red-500"}`}>
              {form.description.length} / 160 caractères
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">URL de la page</label>
          <input
            type="url"
            value={form.url}
            onChange={e => update({ url: e.target.value })}
            placeholder="https://propulsedev.fr/solutions/creation-site-web"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">URL de l&apos;image (partage réseaux)</label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={e => update({ imageUrl: e.target.value })}
            placeholder="https://propulsedev.fr/og-image.jpg"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">Compte X/Twitter (optionnel)</label>
          <input
            type="text"
            value={form.twitterSite}
            onChange={e => update({ twitterSite: e.target.value })}
            placeholder="@propulsedev"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {searchPreview && (
        <div className="p-5 rounded-xl border border-white/10 bg-white/5">
          <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">Aperçu dans Google</p>
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-green-700 mb-1">propulsedev.fr</p>
            <p className="text-blue-700 text-lg font-semibold mb-1 hover:underline cursor-pointer">{searchPreview.title}</p>
            <p className="text-gray-600 text-sm">{searchPreview.desc}</p>
          </div>
        </div>
      )}

      {(form.pageTitle || form.description) && (
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white/40 uppercase tracking-wider">Code HTML à copier</p>
            <button
              type="button"
              onClick={() => copyToClipboard(generatedHTML, "html")}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              {copied === "html" ? "Copié !" : "Copier"}
            </button>
          </div>
          <pre className="bg-surface border border-white/10 rounded-xl p-4 text-xs text-white/70 overflow-x-auto whitespace-pre font-mono leading-relaxed">
            {generatedHTML}
          </pre>
        </div>
      )}
    </div>
  )
}
