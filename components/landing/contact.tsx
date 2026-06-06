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
      setError("Merci de remplir votre pr\u00e9nom et votre mail.")
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
        setError("Une erreur est survenue, veuillez r\u00e9essayer.")
      }
    } catch {
      setStatus("idle")
      setError("Une erreur est survenue, veuillez r\u00e9essayer.")
    }
  }

  return (
    <section id="contact" className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5">
      {/* Halo de fond */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[640px] text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-accent/40" />
          <p className="text-sm font-medium tracking-wide text-accent font-sans">Passons à l'action</p>
          <span className="w-8 h-px bg-accent/40" />
        </div>
        
        <h2 className="mb-6 font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground">
          Obtenez votre audit
          <br />
          gratuit aujourd'hui.
        </h2>
        
        <p className="mb-12 text-base font-light leading-relaxed text-gray-400">
          Entrez l'URL de votre site internet et votre adresse email. Je vous envoie votre rapport technique complet sous 24h.
        </p>

        {status === "success" ? (
          <div className="rounded-2xl border border-accent/25 bg-[#0a0a0a]/60 py-12 px-8 text-center shadow-[0_8px_30px_rgba(200,240,0,0.05)] animate-fade-up">
            <p className="mb-4 text-4xl" aria-hidden="true">
              ✅
            </p>
            <p className="text-xl font-bold text-accent">Demande reçue avec succès !</p>
            <p className="mt-3 text-sm text-gray-400 font-light">Je commence l'analyse de votre site. Vous recevrez votre rapport complet par e-mail sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="prenom"
                placeholder="Votre pr\u00e9nom"
                required
                className="rounded-xl border border-white/5 bg-[#0a0a0a]/60 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:bg-[#0c0c0c] focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre adresse mail"
                required
                className="rounded-xl border border-white/5 bg-[#0a0a0a]/60 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:bg-[#0c0c0c] focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
              />
            </div>
            <input
              type="url"
              name="site"
              placeholder="URL de votre site (ex: https://mon-entreprise.fr)"
              className="w-full rounded-xl border border-white/5 bg-[#0a0a0a]/60 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:bg-[#0c0c0c] focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2 rounded-xl bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {status === "loading" ? "Analyse en cours..." : "Recevoir mon audit gratuit"}
            </button>
            {error && <p className="text-center text-sm text-danger mt-2">{error}</p>}
          </form>
        )}

        <p className="mt-6 text-center text-xs text-gray-500 font-light">
          Aucun engagement. Aucune carte bancaire requise. Juste de la valeur brute.
        </p>
      </div>
    </section>
  )
}