import Link from "next/link"
import { PhoneReveal } from "@/components/ui/phone-reveal"

const FOOTER_LINKS = {
  Services: [
    { label: "Solutions", href: "/solutions" },
    { label: "À propos", href: "/a-propos" },
    { label: "Audit gratuit", href: "/contact" },
    { label: "Voir les démos", href: "/demos" },
  ],
  Ressources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Comment ça marche", href: "/#process" },
  ],
  Légal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
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
              href="mailto:contact@propulsedev.fr"
              className="text-sm text-accent/70 hover:text-accent transition-colors w-fit"
            >
              contact@propulsedev.fr
            </a>
            <PhoneReveal className="text-white/40 hover:text-white/60" />
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-accent transition-colors w-fit cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contactez-nous
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
