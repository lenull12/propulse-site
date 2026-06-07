import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Solutions — Propulse Dev",
  description:
    "Nous construisons des sites Next.js/React qui rapportent des clients. Audit offert, avis Google automatisés, SEO technique natif.",
  openGraph: {
    title: "Solutions — Propulse Dev",
    description: "Des sites qui rapportent des clients. Expertise Next.js & React.",
  },
}

const STACK = [
  { label: "Next.js", desc: "Framework React leader" },
  { label: "React", desc: "Composants dynamiques" },
  { label: "TypeScript", desc: "Code fiable et durable" },
  { label: "Tailwind CSS", desc: "Design sur-mesure" },
  { label: "Vercel", desc: "Hébergement professionnel" },
  { label: "Pagespeed 95+", desc: "Performances garanties" },
]

const DIFFS = [
  {
    icon: "⚡",
    title: "Next.js / React",
    subtitle: "Framework utilisé par TikTok, Netflix, Uber",
    points: [
      "Votre site charge en moins d'une seconde — pas de temps mort, pas de visiteurs perdus",
      "Google récompense les sites rapides : meilleur classement dans les résultats",
      "Architecture moderne qui évolue avec votre activité sans tout casser",
    ],
  },
  {
    icon: "🎯",
    title: "SEO technique natif",
    subtitle: "Le référencement est codé dans l'ADN du site",
    points: [
      "Structure sémantique parfaitement lisible par Google (pas de bidouillage après coup)",
      "Balises, sitemap, données structurées — tout est prêt dès le lancement",
      "Vous gagnez en visibilité sans dépendre des pubs Google Ads",
    ],
  },
  {
    icon: "⭐",
    title: "Avis Google intelligent",
    subtitle: "Un système qui transforme vos clients en ambassadeurs",
    points: [
      "Après chaque prestation, vos clients satisfaits reçoivent un lien ou QR code pour laisser un avis 5★",
      "Les avis négatifs sont redirigés vers un formulaire privé — ils n'atteignent pas votre fiche publique",
      "Votre note Google grimpe naturellement, votre taux de conversion aussi",
    ],
  },
]

const AVANT_APRES: [string, string][] = [
  ["Site lent, pas trouvé sur Google", "Site 95+ Pagespeed, première page dès le lancement"],
  ["Avis négatifs ou inexistants", "Avis 5★ collectés automatiquement après chaque client"],
  ["Visibilité par hasard", "Flux régulier de prospects via Google Maps et le référencement local"],
  ["Vous perdez du temps avec la technique", "Vous vous concentrez sur votre métier, on gère tout"],
]

const SECTEURS = [
  { icon: "⚖️", label: "Avocats" },
  { icon: "📊", label: "Experts-comptables" },
  { icon: "🏛️", label: "Architectes" },
  { icon: "🏪", label: "Commerçants" },
  { icon: "🔧", label: "Artisans" },
  { icon: "🏥", label: "Professionnels de santé" },
]

export default function SolutionsPage() {
  return (
    <>
      <SiteNav />

      {/* ============ HERO ============ */}
      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Expertise</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            On construit des sites
            <br />
            <span className="text-white/30">qui rapportent des clients.</span>
          </h1>
          <p className="mb-6 max-w-[600px] text-base font-light leading-relaxed text-gray-400">
            Une équipe spécialisée Next.js & React. On ne fait pas du tape-à-l'œil.
            On construit des outils de croissance qui transforment votre présence en ligne en revenus.
          </p>

          {/* Pile technique en badges */}
          <div className="mb-10 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/50"
              >
                <span className="text-accent/60">◆</span>
                {s.label}
                <span className="hidden sm:inline text-white/20">— {s.desc}</span>
              </span>
            ))}
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
          >
            Obtenir un audit gratuit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============ CE QUI NOUS DIFFÉRENCIE ============ */}
      <section className="bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <h2 className="mb-3 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-foreground">
              Ce qui nous différencie
            </h2>
            <p className="text-sm font-light text-gray-500">
              Une compétence technique. Un résultat business.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {DIFFS.map((item) => (
              <div
                key={item.title}
                className="group rounded-[16px] border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20"
              >
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-3xl">{item.icon}</span>
                <h3 className="mb-1 font-mono text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mb-5 text-sm text-gray-500">{item.subtitle}</p>
                <ul className="flex flex-col gap-3">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-gray-400">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent/60" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMENT ON TRAVAILLE ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-foreground">
              Comment on travaille
            </h2>
            <p className="text-sm font-light text-gray-500">Transparence, rigueur, et un seul interlocuteur.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                step: "01",
                title: "Audit honnête",
                desc: "Nous regardons votre situation réelle. Si nous ne pouvons pas vous aider, nous le disons clairement. Pas de promesses en l'air.",
              },
              {
                step: "02",
                title: "Construction sur mesure",
                desc: "Chaque ligne de code est écrite pour votre métier. Pas de WordPress, pas de templates, pas de plugins qui ralentissent.",
              },
              {
                step: "03",
                title: "Transparence totale",
                desc: "Vous avez un planning précis, un prix fixe annoncé dès le départ, et un contact unique : notre équipe.",
              },
              {
                step: "04",
                title: "Suivi post-lancement",
                desc: "Nous ne disparaissons pas après la mise en ligne. 30 jours d'ajustements inclus. Et après, nous restons disponibles.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-sm font-bold text-accent">
                  {item.step}
                </span>
                <div>
                  <h3 className="mb-1 font-mono text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CE QUE ÇA CHANGE POUR VOUS ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-foreground">
              Ce que ça change <span className="text-white/30">concrètement</span>
            </h2>
            <p className="text-sm font-light text-gray-500">Avant / Après PropulseDev.</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/5">
            {AVANT_APRES.map(([avant, apres], i) => (
              <div
                key={i}
                className={`grid grid-cols-1 gap-4 p-6 md:grid-cols-2 md:gap-8 ${
                  i < AVANT_APRES.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-xs">❌</span>
                  <span className="text-sm font-light leading-relaxed text-gray-500">{avant}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs">✅</span>
                  <span className="text-sm font-light leading-relaxed text-gray-300">{apres}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POURQUOI NEXT.JS ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-6 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-foreground">
            Pourquoi Next.js ?
          </h2>
          <p className="mb-4 text-base font-light leading-relaxed text-gray-400">
            C'est la même technologie que des sites comme <strong className="text-foreground">LVMH, TikTok ou Le Figaro</strong>.
          </p>
          <p className="mb-4 text-base font-light leading-relaxed text-gray-400">
            Concrètement, votre site est <strong className="text-foreground">pré-construit</strong> : il s'affiche instantanément
            au lieu de se charger sous les yeux du visiteur. Résultat : <strong className="text-accent">Google lui donne un bonus
            de classement</strong> et vos visiteurs ne fuient pas pendant le chargement.
          </p>
          <p className="text-base font-light leading-relaxed text-gray-400">
            Et comme le code est écrit avec <strong className="text-foreground">React + TypeScript</strong>, il est plus fiable,
            plus facile à faire évoluer, et bien plus rapide qu'un site WordPress classique.
          </p>
        </div>
      </section>

      {/* ============ POUR QUI ON TRAVAILLE ============ */}
      <section className="border-t border-white/5 bg-background px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-foreground">
              Pour qui on travaille
            </h2>
            <p className="text-sm font-light text-gray-500">Des professionnels qui veulent passer à la vitesse supérieure.</p>
          </div>

          <div className="mx-auto grid max-w-[700px] grid-cols-2 gap-4 sm:grid-cols-3">
            {SECTEURS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-6 text-center transition-colors hover:border-accent/10"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-sm font-medium text-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-light text-gray-500">
            Et d'autres métiers. <Link href="/#contact" className="text-accent underline underline-offset-2 hover:no-underline">Demandez-nous.</Link>
          </p>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="border-t border-white/5 bg-[#050505] px-6 py-24 md:px-15">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="mb-4 font-mono text-[clamp(28px,3.5vw,36px)] font-black leading-[1.15] text-foreground">
            Vous voulez savoir ce que ça donnerait pour votre activité ?
          </h2>
          <p className="mb-8 text-base font-light leading-relaxed text-gray-400">
            Nous vous offrons un audit complet de votre présence en ligne. 24h, sans engagement.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
          >
            Audit gratuit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}