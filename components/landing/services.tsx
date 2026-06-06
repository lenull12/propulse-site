const SERVICES = [
  {
    number: "01",
    title: "Audit de performance",
    text: "Analyse complète de votre site et de votre fiche Google. Rapport détaillé des points faibles avec plan d'action prioritaire.",
    price: "Gratuit",
    featured: false,
  },
  {
    number: "02",
    title: "Refonte de site web",
    text: "Site ultra-rapide, optimisé mobile, conçu pour convertir vos visiteurs en clients. Score PageSpeed garanti au-dessus de 95/100.",
    price: "À partir de 1 000 €",
    featured: true,
  },
  {
    number: "03",
    title: "Gestion réputation Google",
    text: "Système automatisé de collecte d'avis positifs et de filtrage des réclamations. Votre note Google remonte en 15 jours.",
    price: "À partir de 49 € / mois",
    featured: false,
  },
]

export function Services() {
  return (
    <section id="services" className="bg-background px-6 py-25 md:px-15">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-xs font-medium uppercase tracking-[3px] text-accent">Ce que je fais</p>
        <h2 className="mb-15 font-serif text-[clamp(28px,3vw,44px)] font-black leading-[1.2] text-balance text-foreground">
          Trois leviers pour
          <br />
          accélérer votre business.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.number}
              className={
                s.featured
                  ? "rounded-[12px] border border-accent bg-accent px-8 py-10 text-ink transition-transform hover:-translate-y-1"
                  : "rounded-[12px] border border-white/10 bg-white/[0.02] px-8 py-10 transition-all hover:-translate-y-1 hover:border-white/20"
              }
            >
              <div className={`mb-5 font-serif text-5xl font-black leading-none ${s.featured ? "text-ink/40" : "text-white/40"}`}>
                {s.number}
              </div>
              <h3 className={`mb-3 text-xl font-medium ${s.featured ? "text-ink" : "text-foreground"}`}>{s.title}</h3>
              <p className={`text-sm font-light leading-relaxed ${s.featured ? "text-ink/80" : "text-gray-400"}`}>
                {s.text}
              </p>
              <p className={`mt-6 text-base font-medium ${s.featured ? "text-ink" : "text-foreground"}`}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
