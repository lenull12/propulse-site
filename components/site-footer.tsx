import Link from "next/link"

const FOOTER_LINKS = {
  Services: [
    { label: "Audit gratuit", href: "/#contact" },
    { label: "Refonte de site", href: "/#services" },
    { label: "Réputation Google", href: "/#services" },
    { label: "Voir les démos", href: "/demos" },
  ],
  Process: [
    { label: "Comment ça marche", href: "/#process" },
    { label: "Nos secteurs", href: "/demos" },
    { label: "Tarifs", href: "/#services" },
  ],
  Légal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Contact", href: "/#contact" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#050505] px-6 pt-16 pb-8 md:px-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Colonne marque */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link
              href="/"
              className="font-mono text-2xl font-black tracking-tight text-foreground w-fit"
            >
              Propulse<span className="text-accent">Dev</span>
            </Link>
            <p className="text-sm font-light leading-relaxed text-white/40 max-w-[280px]">
              Sites web haut de gamme et visibilité Google locale pour les professionnels indépendants.
            </p>
            <a
              href="mailto:raphael@propulsedev.fr"
              className="text-sm text-accent/70 hover:text-accent transition-colors w-fit"
            >
              raphael@propulsedev.fr
            </a>
            {/* Badge statut */}
            <div className="inline-flex items-center gap-2 mt-2 w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[11px] text-white/40 font-mono">Tout est opérationnel</span>
            </div>
          </div>

          {/* Colonnes liens */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/25 mb-4">
                  {category}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/45 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20 font-light">
            © 2026 PropulseDev — Tous droits réservés
          </p>
          <p className="text-[12px] text-white/20 font-light font-mono">
            Fait avec ♥ en Île-de-France
          </p>
        </div>

      </div>
    </footer>
  )
}