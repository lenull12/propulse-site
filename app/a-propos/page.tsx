import Link from "next/link"
import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Contact } from "@/components/landing/contact"

export const metadata: Metadata = {
  title: "Qui sommes-nous — PropulseDev",
  description:
    "Découvrez l'équipe PropulseDev : développeurs et experts SEO spécialisés dans la création de sites web performants et la visibilité Google locale pour les professionnels indépendants.",
}

const VALUES = [
  { number: "50+", label: "Sites livrés" },
  { number: "4.9", label: "Note moyenne" },
  { number: "12+", label: "Ans d'expérience" },
  { number: "3j", label: "Audit offert sous 24h" },
]

const TEAM = [
  {
    initial: "R",
    name: "Raphaël",
    role: "Fondateur & Développeur Lead",
    desc: "Expert en développement web et SEO local. Il conçoit chaque site sur-mesure avec les technologies les plus avancées du marché.",
  },
  {
    initial: "C",
    name: "Clara",
    role: "Designer UX/UI",
    desc: "Elle transforme la vision de nos clients en expériences visuelles percutantes qui inspirent confiance dès la première seconde.",
  },
  {
    initial: "A",
    name: "Alexandre",
    role: "Stratège SEO & Réputation",
    desc: "Spécialiste du référencement local et de la gestion d'avis Google. Il déploie les stratégies qui propulsent nos clients en tête des recherches.",
  },
]

const MILESTONES = [
  { year: "2018", text: "Première mission de refonte web pour un cabinet d'avocats parisien." },
  { year: "2020", text: "Spécialisation en SEO local et développement sur-mesure avec Next.js." },
  { year: "2022", text: "Lancement de notre système de gestion automatisée des avis Google." },
  { year: "2024", text: "50 sites livrés et une équipe de 3 experts dédiés à la croissance digitale." },
  { year: "2026", text: "PropulseDev accompagne des professionnels dans toute la France." },
]

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative bg-[#050505] px-6 pt-36 pb-20 md:px-12 overflow-hidden bg-grid-cyber">
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#a855f7] opacity-[0.015] blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1000px] text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">Qui sommes-nous</p>
              <span className="w-8 h-px bg-accent/40" />
            </div>
            <h1 className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.1] text-foreground mb-6">
              Une équipe dédiée à votre{" "}
              <span className="bg-gradient-to-r from-[#a855f7] via-[#00f0ff] to-[#c8f000] bg-clip-text text-transparent">
                croissance locale
              </span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-400 max-w-[700px] mx-auto mb-10">
              Nous ne construisons pas seulement des sites web — nous bâtissons des{" "}
              <strong className="text-foreground font-medium">machines à clients</strong>{" "}
              pour les indépendants et professions libérales.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
              >
                Demander un audit gratuit
              </Link>
              <Link
                href="/demos"
                className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-foreground"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </section>

        {/* Histoire */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">Notre histoire</p>
            </div>
            <h2 className="mb-12 font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
              D&apos;une conviction à une mission
            </h2>
            <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-gray-400 max-w-[800px]">
              <p>
                Tout commence en 2018, lors d&apos;une première mission de refonte pour un cabinet d&apos;avocats
                parisien. Le constat est frappant : un excellent avocat, mais invisible sur Google.
                En repensant entièrement son site et en optimisant sa fiche Google My Business,
                ses rendez-vous ont doublé en trois mois.
              </p>
              <p>
                Cette expérience a révélé un besoin massif : des milliers de professionnels talentueux
                — avocats, architectes, experts-comptables, artisans — passent à côté de clients
                parce que leur présence en ligne ne reflète pas leur compétence.
              </p>
              <p>
                PropulseDev est né de ce constat. Nous avons réuni une équipe aux compétences
                complémentaires — développement web, design, SEO, gestion de la réputation —
                pour offrir une solution complète, du site à la visibilité Google.
              </p>
            </div>
          </div>
        </section>

        {/* Chronologie */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
          <div className="relative z-10 mx-auto max-w-[800px]">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">Notre parcours</p>
            </div>
            <h2 className="mb-16 font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
              Les étapes clés
            </h2>
            <div className="relative pl-8 border-l border-white/10">
              {MILESTONES.map((m, i) => (
                <div key={i} className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-accent bg-[#050505]" />
                  <span className="font-mono text-sm font-bold text-accent">{m.year}</span>
                  <p className="mt-2 text-base font-light text-gray-400 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chiffres */}
        <section className="relative bg-[#050505] px-6 py-20 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center"
                >
                  <p className="font-mono text-3xl md:text-5xl font-black text-accent">{v.number}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">{v.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent/40" />
                <p className="text-sm font-medium tracking-wide text-accent font-sans">L&apos;équipe</p>
                <span className="w-8 h-px bg-accent/40" />
              </div>
              <h2 className="font-mono text-[clamp(2rem,3.5vw,3rem)] font-black text-foreground">
                Des experts à votre service
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-accent/20 hover:bg-accent/[0.02]"
                >
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-3xl font-black text-accent font-mono">
                    {member.initial}
                  </div>
                  <h3 className="font-mono font-bold text-foreground text-lg mb-1">{member.name}</h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent/70 mb-4">{member.role}</p>
                  <p className="text-sm font-light text-gray-400 leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & valeurs */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[1000px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl mb-5">🎯</span>
                <h3 className="font-mono font-bold text-foreground text-xl mb-4">Notre mission</h3>
                <p className="text-sm font-light text-gray-400 leading-relaxed">
                  Redonner aux indépendants et aux professions libérales la visibilité qu&apos;ils méritent
                  sur Google. Nous combinons design technique, SEO local et gestion d&apos;avis pour faire
                  de chaque site un véritable outil de croissance.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl mb-5">🧭</span>
                <h3 className="font-mono font-bold text-foreground text-xl mb-4">Notre approche</h3>
                <p className="text-sm font-light text-gray-400 leading-relaxed">
                  Pas de templates, pas de solution générique. Chaque projet commence par un audit
                  approfondi de votre activité, de vos concurrents et de votre marché local. Nous
                  construisons ensuite une stratégie sur-mesure qui vous ressemble.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔒",
                  title: "Transparence",
                  desc: "Prix fixes, pas de surprises. Vous savez exactement ce que vous payez et ce que vous obtenez.",
                },
                {
                  icon: "⚡",
                  title: "Performance",
                  desc: "Nous utilisons les technologies les plus rapides pour que votre site charge en moins de 2 secondes.",
                },
                {
                  icon: "🤝",
                  title: "Accompagnement",
                  desc: "On ne disparaît pas après la livraison. Nous restons disponibles pour vous aider à chaque étape.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
                >
                  <span className="block text-2xl mb-3">{v.icon}</span>
                  <h4 className="font-mono font-semibold text-foreground mb-2">{v.title}</h4>
                  <p className="text-sm font-light text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
