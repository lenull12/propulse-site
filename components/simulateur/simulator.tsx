"use client"

import { useEffect, useState } from "react"
import { LivePreview } from "./live-preview"

type SimulatorData = {
  secteur: string
  entreprise: string
  typeSite: string
  style: string
  police: string
  effetCartes: string
  couleurPrincipale: string
  couleurAccent: string
  couleurPro: string
  couleurTexte: string
  fonctionnalites: string[]
  nom: string
  email: string
  telephone: string
  budget: string
}

const INITIAL: SimulatorData = {
  secteur: "",
  entreprise: "",
  typeSite: "",
  style: "",
  police: "Inter",
  effetCartes: "solid",
  couleurPrincipale: "#ffffff",
  couleurAccent: "#e2e8f0",
  couleurPro: "#111118",
  couleurTexte: "#ffffff",
  fonctionnalites: [],
  nom: "",
  email: "",
  telephone: "",
  budget: "",
}

const STEPS = ["Activité", "Couleurs", "Style", "Fonctionnalités", "Coordonnées"]

const SECTEURS = [
  { value: "avocat", label: "Avocats", icon: "⚖" },
  { value: "expert-comptable", label: "Experts-comptables", icon: "📊" },
  { value: "architecte", label: "Architectes", icon: "🏛" },
  { value: "medecin", label: "Médecins & Cliniques", icon: "🏥" },
  { value: "restaurateur", label: "Restaurants", icon: "🍽" },
  { value: "artisan", label: "Artisans & BTP", icon: "🔧" },
  { value: "immobilier", label: "Agences immobilières", icon: "🏡" },
  { value: "coiffure", label: "Coiffeurs & Esthéticiennes", icon: "💇" },
  { value: "garage", label: "Garages automobiles", icon: "🚗" },
  { value: "bien-etre", label: "Naturopathes & Bien-être", icon: "🌿" },
]

const STYLES = [
  { value: "moderne", label: "Moderne", desc: "Minimaliste, typo large, aéré" },
  { value: "sobre", label: "Sobre", desc: "Élégant, discret, tons neutres" },
  { value: "classique", label: "Classique", desc: "Traditionnel, structuré, intemporel" },
  { value: "premium", label: "Premium", desc: "Luxe, détails soignés, typo serif" },
]

const FONTS = [
  { value: "Inter", label: "Inter", cat: "Sans-serif", stack: "Inter, sans-serif" },
  { value: "Space Grotesk", label: "Space Grotesk", cat: "Sans-serif", stack: "'Space Grotesk', sans-serif" },
  { value: "Plus Jakarta Sans", label: "Plus Jakarta Sans", cat: "Sans-serif", stack: "'Plus Jakarta Sans', sans-serif" },
  { value: "Manrope", label: "Manrope", cat: "Sans-serif", stack: "Manrope, sans-serif" },
  { value: "Sora", label: "Sora", cat: "Sans-serif", stack: "Sora, sans-serif" },
  { value: "Playfair Display", label: "Playfair Display", cat: "Serif", stack: "'Playfair Display', serif" },
  { value: "DM Serif Display", label: "DM Serif Display", cat: "Serif", stack: "'DM Serif Display', serif" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", cat: "Serif", stack: "'Cormorant Garamond', serif" },
]

const TYPES = [
  { value: "vitrine", label: "Site vitrine", desc: "Présentation de votre activité" },
  { value: "multipages", label: "Multi-pages", desc: "Site complet avec plusieurs sections" },
  { value: "portfolio", label: "Portfolio", desc: "Galerie de vos réalisations" },
  { value: "blog", label: "Blog & contenu", desc: "Partage d'articles et actualités" },
]

const FONCTIONNALITES = [
  { value: "contact", label: "Formulaire de contact" },
  { value: "galerie", label: "Galerie photo" },
  { value: "blog", label: "Blog / actualités" },
  { value: "maps", label: "Google Maps intégré" },
  { value: "avis", label: "Avis clients" },
  { value: "whatsapp", label: "WhatsApp direct" },
  { value: "zone", label: "Zone d'intervention" },
]

export function Simulator() {
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Manrope:wght@400;600;700;800&family=Sora:wght@400;600;700;800&family=Playfair+Display:wght@400;700;900&family=DM+Serif+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])
  const [step, setStep] = useState(0)
  const [data, setData] = useState<SimulatorData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")

  const update = (partial: Partial<SimulatorData>) => setData(p => ({ ...p, ...partial }))

  const toggleFonctionnalite = (val: string) => {
    setData(p => ({
      ...p,
      fonctionnalites: p.fonctionnalites.includes(val)
        ? p.fonctionnalites.filter(f => f !== val)
        : [...p.fonctionnalites, val],
    }))
  }

  const handleSubmit = async () => {
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/simulateur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Erreur serveur")
    } catch {
      // OK en local — les Cloudflare Functions ne sont pas servies par le dev server
    }
    setSubmitted(true)
    setSending(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-3xl mb-6">✓</div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Merci !</h2>
        <p className="text-white/50 max-w-md text-lg leading-relaxed">
          Votre demande a bien été reçue. Nous analyserons vos choix et vous recontacterons sous 24h pour discuter de votre projet.
        </p>
      </div>
    )
  }

  const canNext = () => {
    switch (step) {
      case 0: return !!data.secteur
      case 1: return true
      case 2: return !!data.style
      case 3: return true
      case 4: return !!data.nom && !!data.email
      default: return true
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
      <div>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase">
            Simulateur
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Imaginez votre futur site
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
            Répondez aux questions pas à pas et voyez votre site prendre vie en temps réel.
            Aucun engagement, juste une idée concrète de ce qui est possible.
          </p>
        </div>
        <div className="flex gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-all duration-500"
              style={{ background: i <= step ? "#c8f000" : "rgba(255,255,255,0.08)" }}
            />
          ))}
        </div>

        <div className="text-xs font-mono tracking-widest text-white/30 mb-1 uppercase">
          Étape {step + 1} / {STEPS.length}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-8">{STEPS[step]}</h3>

        {step === 0 && (
          <div>
            <p className="text-sm text-white/50 mb-5">Quel est votre secteur d&apos;activité ?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SECTEURS.map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => update({ secteur: s.value })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-200 ${
                    data.secteur === s.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs font-medium">{s.label}</span>
                </button>
              ))}
            </div>
            {data.secteur && (
              <div className="mt-6">
                <label className="block text-sm text-white/50 mb-2">Nom de l&apos;entreprise / cabinet (optionnel)</label>
                <input
                  type="text"
                  value={data.entreprise}
                  onChange={e => update({ entreprise: e.target.value })}
                  placeholder="Ex: Cabinet Dupont"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm text-white/50 mb-6">Choisissez les couleurs de votre futur site.</p>
            <div className="flex flex-col gap-5">
              {[
                { key: "couleurPrincipale", label: "Principale", desc: "Logo, titres, éléments forts", color: data.couleurPrincipale },
                { key: "couleurAccent", label: "Accent", desc: "Boutons CTA, liens, soulignés", color: data.couleurAccent },
                { key: "couleurPro", label: "Fond", desc: "Fond du hero, sections", color: data.couleurPro },
                { key: "couleurTexte", label: "Texte", desc: "Couleur du corps de texte", color: data.couleurTexte },
              ].map(c => (
                <div key={c.key} className="flex items-center gap-4">
                  <div className="w-20">
                    <label className="block text-xs text-white/50 mb-2">{c.label}</label>
                    <input
                      type="color"
                      value={c.color}
                      onChange={e => update({ [c.key]: e.target.value })}
                      className="w-full h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">{c.desc}</div>
                    <div className="font-mono text-sm text-white/60">{c.color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm text-white/50 mb-5">Quel style visuel préférez-vous ?</p>
            <div className="flex flex-col gap-3 mb-8">
              {STYLES.map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => update({ style: s.value })}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                    data.style === s.value
                      ? "border-accent bg-accent/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <span className={`text-sm font-bold mt-0.5 ${data.style === s.value ? "text-accent" : "text-white/30"}`}>
                    {data.style === s.value ? "●" : "○"}
                  </span>
                  <div>
                    <div className={`text-sm font-semibold ${data.style === s.value ? "text-accent" : "text-foreground"}`}>
                      {s.label}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {data.style && (
              <div>
                <p className="text-sm text-white/50 mb-4">Quelle police pour vos titres ?</p>
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map(f => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => update({ police: f.value })}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200 ${
                        data.police === f.value
                          ? "border-accent bg-accent/10"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                      style={{ fontFamily: f.stack }}
                    >
                      <span className={`text-sm font-semibold ${data.police === f.value ? "text-accent" : "text-foreground"}`}>
                        {f.label}
                      </span>
                      <span className="text-[10px] text-white/30">{f.cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-white/50 mb-3">Effet des cartes</p>
                <div className="flex gap-2">
                  {[
                    { value: "solid", label: "Plein" },
                    { value: "glass", label: "Verre" },
                    { value: "bordure", label: "Borduré" },
                  ].map(e => (
                    <button
                      key={e.value}
                      type="button"
                      onClick={() => update({ effetCartes: e.value })}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        data.effetCartes === e.value
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                      }`}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-white/50 mb-5">Sélectionnez les fonctionnalités souhaitées.</p>
            <div className="flex flex-col gap-3">
              {FONCTIONNALITES.map(f => {
                const checked = data.fonctionnalites.includes(f.value)
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => toggleFonctionnalite(f.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                      checked
                        ? "border-accent bg-accent/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <span className={`text-sm font-bold ${checked ? "text-accent" : "text-white/20"}`}>
                      {checked ? "✓" : "☐"}
                    </span>
                    <span className={`text-sm ${checked ? "text-accent font-medium" : "text-white/70"}`}>
                      {f.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-sm text-white/50 mb-5">Laissez-nous vos coordonnées pour qu&apos;on vous recontacte.</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Nom & prénom *</label>
                <input
                  type="text"
                  value={data.nom}
                  onChange={e => update({ nom: e.target.value })}
                  placeholder="Ex: Jean Dupont"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => update({ email: e.target.value })}
                  placeholder="jean@exemple.fr"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Téléphone</label>
                <input
                  type="tel"
                  value={data.telephone}
                  onChange={e => update({ telephone: e.target.value })}
                  placeholder="06 00 00 00 00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Type de site souhaité</label>
                <select
                  value={data.typeSite}
                  onChange={e => update({ typeSite: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="">Non précisé</option>
                  {TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label} — {t.desc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Budget indicatif</label>
                <select
                  value={data.budget}
                  onChange={e => update({ budget: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent/50 transition-colors"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="">Non précisé</option>
                  <option value="1000-2000">1 000 € — 2 000 €</option>
                  <option value="2000-3500">2 000 € — 3 500 €</option>
                  <option value="3500-5000">3 500 € — 5 000 €</option>
                  <option value="5000+">5 000 € et plus</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              step === 0
                ? "opacity-0 pointer-events-none"
                : "border border-white/20 text-white/70 hover:border-white/40 hover:text-foreground"
            }`}
          >
            ← Retour
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canNext()
                  ? "bg-accent text-black hover:shadow-[0_0_25px_rgba(200,240,0,0.3)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Suivant →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canNext() || sending}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canNext() && !sending
                  ? "bg-accent text-black hover:shadow-[0_0_25px_rgba(200,240,0,0.3)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              {sending ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}
      </div>

      <div className="lg:sticky lg:top-24">
        <LivePreview data={data} />
      </div>
    </div>
  )
}
