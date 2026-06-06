const PROBLEMS = [
  {
    icon: "⚡",
    title: "Vitesse de chargement catastrophique",
    text: "Un site qui met plus de 3 secondes à charger perd 53% de ses visiteurs avant même qu'ils n'aient pu voir votre offre.",
    size: "lg:col-span-7",
  },
  {
    icon: "📱",
    title: "Inadapté aux mobiles",
    text: "Plus de 80% de vos clients potentiels vous cherchent depuis leur smartphone. Si votre site n'est pas optimisé, ils passeront au suivant.",
    size: "lg:col-span-5",
  },
  {
    icon: "⭐",
    title: "Avis négatifs ignorés",
    text: "Un seul avis à 1 étoile non géré ou sans réponse peut détruire instantanément la confiance de dizaines de prospects.",
    size: "lg:col-span-5",
  },
  {
    icon: "🎯",
    title: "Absence d'appels à l'action",
    text: "Votre site informe mais ne convertit pas. Sans boutons clairs et formulaires optimisés, vos visiteurs repartent bredouilles.",
    size: "lg:col-span-7",
  },
]

export function Problem() {
  return (
    <section className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5">
      {/* Lueur subtile en arrière-plan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,240,0,0.02)_0%,rgba(5,5,5,0)_60%)] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-xs font-semibold uppercase tracking-[3px] text-accent">La dure réalité</p>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15] text-foreground">
              Ce que vos prospects voient
              <br />
              quand ils vous cherchent sur Google.
            </h2>
          </div>
          <p className="max-w-[380px] text-sm font-light leading-relaxed text-gray-400">
            Aujourd&apos;hui, une présence en ligne négligée ou obsolète ne fait pas que vous rendre invisible : elle offre activement des clients à vos concurrents.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {PROBLEMS.map((p, index) => (
            <div
              key={index}
              className={`group relative rounded-[16px] border border-white/5 bg-[#0a0a0a]/60 p-8 md:p-10 transition-all duration-500 hover:border-white/10 hover:bg-[#0c0c0c] hover:-translate-y-1 overflow-hidden ${p.size}`}
            >
              {/* Effet lumineux lors du survol */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />
              
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl transition-transform group-hover:scale-110" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-sm md:text-base font-light leading-relaxed text-gray-400">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
