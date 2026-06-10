"use client"

import { useState } from "react"
import { Turnstile } from "@marsidev/react-turnstile"
import { PhoneReveal } from "@/components/ui/phone-reveal"
import Link from "next/link"

const BUDGETS = ["<1 000€", "1 000–2 000€", "2 000–4 000€", "4 000€+"]
const TIMINGS = ["1–2 semaines", "1 mois", "2–3 mois", "Pas de date fixe"]
const OBJECTIVES = [
  { value: "site-vitrine", label: "Site vitrine" },
  { value: "seo-local", label: "SEO local" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "refonte", label: "Refonte complète" },
  { value: "avis-google", label: "Gestion avis Google" },
  { value: "blog", label: "Blog / contenu" },
  { value: "autre", label: "Autre" },
]

type FormDataState = {
  type: "audit" | "estimation" | "autre" | null
  prenom: string
  email: string
  phone: string
  site: string
  budget: string | null
  timing: string | null
  objectives: string[]
  description: string
  hasWebsite: boolean | null
  companyName: string
}

const initialForm: FormDataState = {
  type: null,
  prenom: "",
  email: "",
  phone: "",
  site: "",
  budget: null,
  timing: null,
  objectives: [],
  description: "",
  hasWebsite: null,
  companyName: "",
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)] appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          backgroundSize: "12px",
        }}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111] text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormDataState>(initialForm)
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  function update<K extends keyof FormDataState>(key: K, value: FormDataState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleObjective(val: string) {
    setForm((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(val)
        ? prev.objectives.filter((o) => o !== val)
        : [...prev.objectives, val],
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!turnstileToken) {
      setError("Veuillez valider le captcha.")
      return
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || "")
    const phoneValid = form.phone.length === 0 || /^[\d\s\+\-\.\(\)]{9,15}$/.test(form.phone)

    if (!emailValid || !phoneValid) {
      setError("Merci de renseigner un email valide et un numéro de téléphone à 10 chiffres (ou laissez le champ vide).")
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          token: turnstileToken,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setForm(initialForm)
        setTurnstileToken(null)
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

  function canGoNext(): boolean {
    if (step === 0) return form.type !== null
    if (step === 1) {
      if (form.type === "audit") {
        if (form.hasWebsite === null) return false
        if (form.hasWebsite) return form.site.trim().length > 0
        return form.companyName.trim().length > 0
      }
      return true
    }
    return true
  }

  const stepLabels = ["Parcours", "Détails", "Contact"]

  return (
    <div className="w-full max-w-[580px] mx-auto">
      {status !== "success" && (
        <>
          <p className="text-center mb-6 leading-relaxed space-y-1">
            <span className="block text-base text-foreground font-medium">Nous souhaitons répondre au mieux à votre demande.</span>
            <span className="block text-sm text-white/40">Pour cela, nous avons besoin de quelques informations.</span>
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-bold transition-all duration-500 ${
                  i < step
                    ? "bg-accent text-black"
                    : i === step
                      ? "bg-accent/20 text-accent border border-accent/40"
                      : "bg-white/5 text-white/20"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`hidden sm:block text-xs font-mono ${i === step ? "text-accent font-bold" : "text-white/20"}`}>
                {stepLabels[i]}
              </span>
              {i < 2 && (
                <div className={`h-px w-6 md:w-10 transition-colors duration-500 ${i < step ? "bg-accent/60" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>
      </>
      )}

      {status === "success" ? (
        <div className="rounded-2xl border border-accent/25 bg-[#0a0a0a]/60 py-12 px-6 text-center">
          <p className="mb-3 text-4xl" aria-hidden="true">✅</p>
          <p className="text-xl font-bold text-accent">Demande reçue avec succès !</p>
          <p className="mt-3 text-sm text-gray-400 font-light">Nous analysons votre besoin et vous recontactons sous 24h.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="relative min-h-[280px]">
            {/* Étape 0 — Choix du parcours */}
            {step === 0 && (
              <div className="animate-fade-up space-y-4">
                <Select
                  label="Type de demande"
                  value={form.type ?? ""}
                  onChange={(v) => {
                    if (v === "audit" || v === "estimation" || v === "autre") {
                      update("type", v)
                    }
                  }}
                  placeholder="Sélectionnez..."
                  options={[
                    { value: "audit", label: "🎯 Audit gratuit" },
                    { value: "estimation", label: "📋 Estimation projet" },
                    { value: "autre", label: "Autre" },
                  ]}
                  required
                />
                {form.type && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/50 leading-relaxed">
                    {form.type === "audit" && (
                      <><strong className="text-white/70">Analyse complète de votre présence en ligne :</strong> performance technique, SEO on-page, maillage interne, vitesse de chargement, compatibilité mobile et optimisation Google Business Profile. Vous recevrez un rapport détaillé avec un score sur 100 et 3 axes d&apos;amélioration prioritaires — même sans site internet.</>
                    )}
                    {form.type === "estimation" && (
                      <><strong className="text-white/70">Étude personnalisée de votre projet web :</strong> définition du périmètre, choix technologiques (Next.js, Tailwind, hébergement), architecture du contenu, stratégie SEO intégrée et planning de déploiement. Nous vous fournissons une fourchette de budget et un calendrier réaliste adaptés à vos objectifs.</>
                    )}
                    {form.type === "autre" && (
                      <>Vous avez une demande spécifique, un besoin particulier ou vous souhaitez simplement échanger avant de vous lancer ? Décrivez-nous votre projet et nous vous répondrons sous 24h avec une première orientation.</>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Étape 1 — Détails */}
            {step === 1 && form.type && (
              <div className="text-left animate-fade-up space-y-4">
                {form.type === "audit" ? (
                  <>
                    <Select
                      label="Avez-vous un site internet ?"
                      value={form.hasWebsite === null ? "" : form.hasWebsite ? "oui" : "non"}
                      onChange={(v) => {
                        update("hasWebsite", v === "oui")
                        if (v === "oui") update("companyName", "")
                        else update("site", "")
                      }}
                      placeholder="Sélectionnez..."
                      options={[
                        { value: "oui", label: "Oui" },
                        { value: "non", label: "Non" },
                      ]}
                      required
                    />

                    {form.hasWebsite === true && (
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">URL de votre site</label>
                        <input
                          type="url"
                          value={form.site}
                          onChange={(e) => update("site", e.target.value)}
                          placeholder="https://votresite.fr"
                          required
                          className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
                        />
                      </div>
                    )}
                    {form.hasWebsite === false && (
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Nom de votre entreprise</label>
                        <input
                          type="text"
                          value={form.companyName}
                          onChange={(e) => update("companyName", e.target.value)}
                          placeholder="Ex: Boulangerie Dupont"
                          required
                          className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Qu&apos;est-ce qui vous préoccupe ?</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        rows={3}
                        placeholder="Lenteur, design vieillot, aucun visiteur, mauvais classement Google..."
                        className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)] resize-none"
                      />
                    </div>
                  </>
                ) : form.type === "estimation" ? (
                  <>
                    <Select
                      label="Budget estimé"
                      value={form.budget ?? ""}
                      onChange={(v) => update("budget", v === "autre" ? "Autre" : v)}
                      placeholder="Sélectionnez..."
                      options={[
                        ...BUDGETS.map((b) => ({ value: b, label: b })),
                        { value: "autre", label: "Autre" },
                      ]}
                    />

                    <Select
                      label="Timing souhaité"
                      value={form.timing ?? ""}
                      onChange={(v) => update("timing", v === "autre" ? "Autre" : v)}
                      placeholder="Sélectionnez..."
                      options={[
                        ...TIMINGS.map((t) => ({ value: t, label: t })),
                        { value: "autre", label: "Autre" },
                      ]}
                    />

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Objectifs</label>
                      <div className="grid grid-cols-2 gap-2">
                        {OBJECTIVES.map((obj) => (
                          <label
                            key={obj.value}
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all cursor-pointer ${
                              form.objectives.includes(obj.value)
                                ? "border-accent/60 bg-accent/10 text-accent"
                                : "border-white/10 bg-[#0a0a0a]/60 text-white/50 hover:border-white/20"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={form.objectives.includes(obj.value)}
                              onChange={() => toggleObjective(obj.value)}
                              className="accent-accent"
                            />
                            {obj.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Parlez-nous de votre projet</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        rows={2}
                        placeholder="Type d'activité, idées, pages souhaitées..."
                        className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)] resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Décrivez votre demande</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      rows={4}
                      placeholder="Expliquez-nous votre besoin..."
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)] resize-none"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Étape 2 — Coordonnées */}
            {step === 2 && (
              <div className="text-left animate-fade-up space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/40 space-y-1 mb-3">
                  <p><span className="text-white/60 font-medium">Type :</span> {form.type === "audit" ? "Audit gratuit" : form.type === "estimation" ? "Estimation projet" : "Autre"}</p>
                  {form.type === "estimation" && form.budget && <p><span className="text-white/60 font-medium">Budget :</span> {form.budget}</p>}
                  {form.type === "estimation" && form.timing && <p><span className="text-white/60 font-medium">Timing :</span> {form.timing}</p>}
                  {form.objectives.length > 0 && (
                    <p><span className="text-white/60 font-medium">Objectifs :</span> {form.objectives.map((o) => OBJECTIVES.find((obj) => obj.value === o)?.label).join(", ")}</p>
                  )}
                  {form.site && <p><span className="text-white/60 font-medium">Site :</span> {form.site}</p>}
                  {form.companyName && <p><span className="text-white/60 font-medium">Entreprise :</span> {form.companyName}</p>}
                </div>

                <input
                  type="text"
                  value={form.prenom}
                  onChange={(e) => update("prenom", e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Votre adresse mail"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Votre téléphone (facultatif)"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0a]/80 px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-gray-500 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(200,240,0,0.08)]"
                />

                <div className="flex justify-center my-2">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !turnstileToken}
                  className="w-full mt-2 rounded-xl bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`text-sm transition-colors cursor-pointer ${
                step === 0 ? "invisible" : "text-white/40 hover:text-white/70"
              }`}
            >
              ← Retour
            </button>

            <span className="text-xs text-white/20 font-mono">
              {step + 1} / 3
            </span>

            {step < 2 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                disabled={!canGoNext()}
                className="text-sm text-accent border border-white/20 rounded-xl px-5 py-2 hover:bg-accent/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Continuer →
              </button>
            )}
          </div>
        </form>
      )}

      {/* Besoin immédiat */}
      {status !== "success" && (
        <>
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <span className="text-white/30 text-xs">Besoin immédiat ?</span>
          <PhoneReveal className="text-white/40 hover:text-white/60" />
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </Link>
        </div>
        </>
      )}

      {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
    </div>
  )
}
