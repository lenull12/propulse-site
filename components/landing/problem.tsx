const PROBLEMS = [
  {
    icon: "⚡",
    title: "Site trop lent",
    text: "Un site qui met plus de 3 secondes à charger perd 53% de ses visiteurs avant même qu'ils aient vu votre offre.",
  },
  {
    icon: "📱",
    title: "Non adapté mobile",
    text: "80% de vos clients vous cherchent depuis leur téléphone. Si votre site est illisible, ils appellent le concurrent.",
  },
  {
    icon: "⭐",
    title: "Avis négatifs non gérés",
    text: "Un seul avis 1 étoile sans réponse détruit la confiance de dizaines de prospects potentiels chaque mois.",
  },
  {
    icon: "🎯",
    title: "Aucun appel à l'action",
    text: "Votre site informe mais ne convertit pas. Sans bouton clair, vos visiteurs repartent sans vous contacter.",
  },
]

export function Problem() {
  return (
    <section className="bg-paper px-6 py-25 text-ink md:px-15">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-15 max-w-[600px] font-serif text-[clamp(28px,3vw,44px)] font-black leading-[1.2] text-balance">
          Ce que vos clients voient
          <br />
          quand ils vous cherchent sur Google.
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              className="rounded-[12px] border border-gray-200 bg-gray-100 p-8 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              <span className="mb-4 block text-3xl" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="mb-2.5 text-lg font-medium text-ink">{p.title}</h3>
              <p className="text-sm font-light leading-relaxed text-gray-600">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
