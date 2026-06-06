"use client"

import { useState } from "react"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get("prenom") as string)?.trim()
    const email = (data.get("email") as string)?.trim()
    const site = (data.get("site") as string)?.trim()

    if (!name || !email) {
      setError("Merci de remplir votre prénom et votre mail.")
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("https://formspree.io/f/mzdqbwva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: name, site, email }),
      })

      if (response.ok) {
        setStatus("success")
      } else {
        setStatus("idle")
        setError("Une erreur est survenue, veuillez réessayer.")
      }
    } catch {
      setStatus("idle")
      setError("Une erreur est survenue, veuillez réessayer.")
    }
  }

  return (
    <section id="contact" className="bg-background px-6 py-25 md:px-15">
      <div className="mx-auto max-w-[560px] text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[3px] text-accent">Passons à l&apos;action</p>
        <h2 className="mb-0 font-serif text-[clamp(28px,3vw,44px)] font-black leading-[1.2] text-foreground">
          Obtenez votre audit
          <br />
          gratuit aujourd&apos;hui.
        </h2>
        <p className="mb-10 mt-6 text-base font-light leading-relaxed text-gray-400">
          Entrez l&apos;URL de votre site et votre mail. Je vous envoie votre rapport sous 24h.
        </p>

        {status === "success" ? (
          <div className="py-10 text-center">
            <p className="mb-4 text-3xl" aria-hidden="true">
              ✅
            </p>
            <p className="text-lg font-medium text-accent">Demande reçue !</p>
            <p className="mt-2 text-sm text-gray-400">Je vous envoie votre audit sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
            <input
              type="text"
              name="prenom"
              placeholder="Votre prénom"
              required
              className="rounded-[12px] border border-white/10 bg-white/5 px-5 py-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent"
            />
            <input
              type="url"
              name="site"
              placeholder="URL de votre site (ex: www.mongarage.fr)"
              className="rounded-[12px] border border-white/10 bg-white/5 px-5 py-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent"
            />
            <input
              type="email"
              name="email"
              placeholder="Votre adresse mail"
              required
              className="rounded-[12px] border border-white/10 bg-white/5 px-5 py-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-[12px] bg-accent px-4 py-4 text-base font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,240,0,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? "Envoi en cours..." : "Recevoir mon audit gratuit"}
            </button>
            {error && <p className="text-center text-sm text-danger">{error}</p>}
          </form>
        )}

        <p className="mt-4 text-center text-xs text-gray-400">
          Aucun engagement. Aucune carte bleue. Juste un rapport utile.
        </p>
      </div>
    </section>
  )
}
