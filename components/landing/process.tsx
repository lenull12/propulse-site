const STEPS = [
  {
    num: 1,
    title: "Audit gratuit",
    text: "J'analyse votre site et votre fiche Google en 24h. Vous recevez un rapport clair avec les points à corriger en priorité.",
  },
  {
    num: 2,
    title: "Appel de 15 minutes",
    text: "On discute de vos objectifs et je vous présente la solution adaptée à votre situation. Sans engagement.",
  },
  {
    num: 3,
    title: "Mise en place",
    text: "Je m'occupe de tout. Vous n'avez rien à faire. Résultats visibles sous 15 jours.",
  },
]

export function Process() {
  return (
    <section className="bg-gray-100 px-6 py-25 text-ink md:px-15">
      <div className="mx-auto max-w-[800px]">
        <p className="mb-4 text-xs font-medium uppercase tracking-[3px] text-ink/50">Comment ça marche</p>
        <h2 className="mb-15 font-serif text-[clamp(28px,3vw,44px)] font-black leading-[1.2] text-ink">
          Simple. Rapide. Efficace.
        </h2>
        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <div key={step.num}>
              <div className="flex items-start gap-7">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink text-base font-bold text-paper">
                  {step.num}
                </div>
                <div className="pb-10">
                  <h3 className="mb-2 text-lg font-medium text-ink">{step.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-gray-600">{step.text}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && <div className="ml-[23px] h-10 w-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
