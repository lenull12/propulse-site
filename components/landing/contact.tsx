import Link from "next/link"

export function Contact() {
  return (
    <section id="contact" className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5">
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[640px] text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-accent/40" />
          <p className="text-sm font-medium tracking-wide text-accent font-sans">
            Prêt à démarrer ?
          </p>
          <span className="w-8 h-px bg-accent/40" />
        </div>

        <h2 className="mb-6 font-mono text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.15]">
          <span className="block text-foreground">On construit</span>
          <span className="block bg-gradient-to-r from-[#14b8a6] via-[#00f0ff] to-[#c8f000] bg-clip-text text-transparent">
            votre succès.
          </span>
        </h2>

        <p className="mb-10 text-base font-light leading-relaxed text-gray-400 max-w-[480px] mx-auto">
          Audit gratuit de votre site actuel ou estimation personnalisée pour votre futur projet. Choisissez la formule qui vous correspond.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-[640px] mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <span className="text-2xl mb-2 block">🎯</span>
            <p className="font-mono text-sm font-bold text-foreground mb-1">Audit gratuit</p>
            <p className="text-xs text-gray-500 font-light">
              Score SEO + 3 axes d&apos;amélioration.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <span className="text-2xl mb-2 block">📋</span>
            <p className="font-mono text-sm font-bold text-foreground mb-1">Estimation projet</p>
            <p className="text-xs text-gray-500 font-light">
              Budget, planning, objectifs.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <span className="text-2xl mb-2 block">💬</span>
            <p className="font-mono text-sm font-bold text-foreground mb-1">Autre demande</p>
            <p className="text-xs text-gray-500 font-light">
              Conseil, partenariat, question.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-block rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
        >
          Contactez-nous →
        </Link>
      </div>
    </section>
  )
}
