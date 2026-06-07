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
    const prenom = (data.get("prenom") as string)?.trim()
    const email = (data.get("email") as string)?.trim()
    const phone = (data.get("phone") as string)?.trim()
    const site = (data.get("site") as string)?.trim()
    const description = (data.get("description") as string)?.trim()

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")
    const phoneValid = phone.length === 0 || /^\d{10}$/.test(phone)

    if (!emailValid || !phoneValid) {
      setError("Merci de renseigner un email valide et un numéro de téléphone à 10 chiffres (ou laissez le champ vide).")
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, email, phone, site, description }),
      })

      if (response.ok) {
        setStatus("success")
      } else {
        const payload = await response.json().catch(() => null)
        setStatus("idle")
        setError(payload?.error || "Une erreur est survenue, veuillez réessayer.")
      }
    } catch {
      setStatus("idle")
      setError("Une erreur est survenue, veuillez réessayer.")
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

        <h2 className="mb-6 font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15]">
          <span className="block text-foreground">Obtenez votre audit</span>
          <span className="block bg-gradient-to-r from-[#a855f7] via-[#00f0ff] to-[#c8f000] bg-clip-text text-transparent">
            gratuit aujourd'hui.
          </span>
        </h2>

        <p className="mb-12 text-base font-light leading-relaxed text-gray-400">
          Décrivez votre besoin en quelques lignes. Indiquez votre numéro de téléphone ou votre mail pour être recontacté sous 24h.
        </p>

        {status === "success" ? (
          <div className="rounded-2xl border border-accent/25 bg-[#0a0a0a]/60 py-12 px-8 text-center shadow-[0_8px_30px_rgba(200,240,0,0.05)] animate-fade-up">
            <p className="mb-4 text-4xl" aria-hidden="true">
              ✅
            </p>
            <p className="text-xl font-bold text-accent">Demande reçue avec succès !</p>
            <p className="mt-3 text-sm text-gray-400 font-light">Je commence l'analyse de votre besoin. Vous recevrez mon retour par retour sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="prenom"
                placeholder="Votre prénom"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Votre numéro de téléphone (facultatif)"
                className="rounded-xl border border-white/5 bg-[#0a0a0a]/60 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:bg-[#0c0c0c] focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
              />
              <input
                type="url"
                name="site"
                placeholder="URL de votre entreprise (facultatif)"
                className="rounded-xl border border-white/5 bg-[#0a0a0a]/60 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:bg-[#0c0c0c] focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
              />
            </div>

            <textarea
              name="description"
              rows={4}
              placeholder="Décrivez votre besoin ou votre projet (facultatif)"
              className="rounded-xl border border-white/5 bg-[#0a0a0a]/60 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:bg-[#0c0c0c] focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2 rounded-xl bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
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
