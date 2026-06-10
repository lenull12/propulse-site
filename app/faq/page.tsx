"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

const FAQS = [
  {
    q: "Comment se fait le paiement ?",
    a: "En deux fois : 30% à la commande pour lancer le projet, 70% à la mise en ligne. Pas de frais cachés, pas de surprise. Paiement par virement bancaire.",
  },
  {
    q: "Combien coûte un site web professionnel ?",
    a: "Un site vitrine sur-mesure démarre à 1 000 €. Le prix final dépend du nombre de pages, des fonctionnalités souhaitées et de votre secteur d'activité. L'audit initial est toujours offert et sans engagement — c'est lui qui permet de chiffrer précisément votre projet. Nous travaillons en prix fixes, sans surprise.",
  },
  {
    q: "Combien de temps faut-il pour livrer mon site ?",
    a: "Comptez entre 1 et 3 semaines selon la complexité du projet. Dès la validation du devis, nous vous envoyons un planning détaillé avec chaque étape. Vous avez une visibilité complète sur l'avancement, et nous respectons les délais annoncés.",
  },
  {
    q: "Je n'ai aucune connaissance technique. Est-ce un problème ?",
    a: "Pas du tout — c'est même pour vous que nous travaillons. Nous nous occupons de tout : hébergement, nom de domaine, mises à jour de sécurité, sauvegardes. Vous recevez un site clé en main. Si vous le souhaitez, nous vous formons rapidement pour modifier votre contenu (textes, photos).",
  },
  {
    q: "Que se passe-t-il après la livraison du site ?",
    a: "Nous restons disponibles pour les ajustements post-livraison pendant 30 jours — c'est inclus. Au-delà, nous proposons trois formules d'abonnement mensuel (Zen, Performance, Business) qui incluent hébergement, mises à jour, sauvegardes et un nombre de modifications selon la formule choisie.",
  },
  {
    q: "Comment fonctionne le système d'avis Google ?",
    a: "Nous configurons un système automatisé qui envoie un SMS ou présente un QR code à vos clients satisfaits pour les inviter à laisser un avis 5 étoiles sur votre fiche Google. Les clients insatisfaits sont redirigés vers un formulaire privé — leur avis ne part pas sur Google. Résultat : votre note moyenne monte, votre réputation se renforce, et vous attirez plus de clients.",
  },
  {
    q: "Est-ce que mon site sera bien positionné sur Google ?",
    a: "Chaque site est construit avec les bonnes pratiques SEO dès la conception : structure technique optimisée, balises HTML, vitesse de chargement, design responsive mobile. Nous travaillons également votre fiche Google My Business en profondeur pour le référencement local. Le SEO prend du temps (3 à 6 mois) mais les bases sont solides dès le lancement.",
  },
  {
    q: "Qu'est-ce que le SEO local exactement ?",
    a: "Le SEO local, c'est l'art d'apparaître dans les résultats Google quand un client potentiel cherche un professionnel près de chez lui — par exemple 'avocat Paris 9e' ou 'expert-comptable Lyon'. Cela passe par l'optimisation de votre site ET de votre fiche Google My Business : mots-clés locaux, avis, photos, NAP (nom, adresse, téléphone), etc.",
  },
  {
    q: "Puis-je garder mon nom de domaine existant ?",
    a: "Oui, absolument. Nous nous occupons de transférer ou de conserver votre nom de domaine actuel. Vous pouvez aussi en acheter un nouveau via nous. Dans tous les cas, vous restez propriétaire de votre nom de domaine.",
  },
  {
    q: "Mon site sera-t-il adapté aux mobiles ?",
    a: "Oui, et c'est une priorité. Tous nos sites sont conçus en 'mobile-first' : ils s'adaptent parfaitement aux smartphones, tablettes et ordinateurs. Google pénalise les sites non adaptés aux mobiles, c'est donc un critère essentiel pour votre référencement.",
  },
  {
    q: "Proposez-vous des templates ou des sites sur-mesure ?",
    a: "100 % sur-mesure. Pas de templates WordPress, pas de solutions génériques. Chaque site est développé avec Next.js et React — les mêmes technologies utilisées par les plus grands sites mondiaux. Vous obtenez un site rapide, sécurisé et parfaitement adapté à votre image.",
  },
  {
    q: "Comment se déroule l'audit gratuit ?",
    a: "Vous nous contactez via le formulaire ou par email. Nous analysons votre site actuel, votre fiche Google My Business, votre positionnement face à vos concurrents locaux. Sous 24 à 48h, nous vous envoyons un rapport détaillé avec nos recommandations et un devis personnalisé — sans aucun engagement.",
  },
  {
    q: "Puis-je modifier mon site moi-même après la livraison ?",
    a: "Oui, si vous le souhaitez. Nous pouvons intégrer un système de gestion de contenu simple d'utilisation pour modifier vos textes, photos ou horaires. Sinon, nous nous en chargeons pour vous via la formule de maintenance mensuelle.",
  },
  {
    q: "Est-ce que l'abonnement est obligatoire ?",
    a: "Non. Votre site vous appartient, et l'hébergement ainsi que le nom de domaine vous sont offerts pendant 1 an. Vous pouvez choisir de ne pas souscrire d'abonnement. Les modifications seront alors facturées à la carte.",
  },
  {
    q: "Que contient l'abonnement Zen à 29 €/mois ?",
    a: "L'hébergement du site, le renouvellement du nom de domaine, les mises à jour de sécurité, les sauvegardes automatiques, le support prioritaire et 2 modifications par mois (texte, photo, horaire, etc.).",
  },
  {
    q: "Et les abonnements Performance et Business ?",
    a: "Performance (59 €/mois) inclut tout le Zen, plus un audit SEO mensuel, un suivi du classement Google et 5 modifications par mois. Business (89 €/mois) ajoute le filtrage des avis Google, un support prioritaire et 10 modifications par mois.",
  },
  {
    q: "Comment résilier mon abonnement ?",
    a: "Par email, à tout moment, sans frais. Le service s'arrête à la fin du mois en cours. Nous vous envoyons une archive complète de votre site (fichiers, base de données) et nous vous accompagnons pour transférer votre domaine si nécessaire. Aucune rétention : le site vous appartient.",
  },
  {
    q: "Que se passe-t-il après la première année d'hébergement offert ?",
    a: "Si vous avez un abonnement Zen, Performance ou Business, rien ne change — l'hébergement et le domaine sont inclus. Sinon, vous pouvez reprendre vos fichiers et héberger le site où vous le souhaitez, ou souscrire à un abonnement à tout moment.",
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative bg-[#050505] px-6 pt-36 pb-20 md:px-12 overflow-hidden bg-grid-cyber">
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c8f000] opacity-[0.02] blur-[180px] pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-[800px] text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent/40" />
              <p className="text-sm font-medium tracking-wide text-accent font-sans">FAQ</p>
              <span className="w-8 h-px bg-accent/40" />
            </div>
            <h1 className="font-mono text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.1] text-foreground mb-6">
              Des questions ?
              <br />
              <span className="text-white/30">Des réponses claires.</span>
            </h1>
            <p className="text-base font-light text-gray-400 max-w-[600px] mx-auto">
            Tout ce que vous devez savoir avant de nous confier votre projet. Vous ne trouvez pas votre réponse ?{" "}
              <Link href="/contact" className="text-accent hover:underline">Contactez-nous</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-[#050505] px-6 py-20 md:px-12 overflow-hidden border-t border-white/5">
          <div className="relative z-10 mx-auto max-w-[800px]">
            <div className="flex flex-col divide-y divide-white/5">
              {FAQS.map((faq, i) => (
                <div key={i} className="group">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer"
                  >
                    <span className={`font-mono text-base font-semibold transition-colors duration-300 ${open === i ? "text-accent" : "text-foreground group-hover:text-accent/70"}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-300 ${
                        open === i
                          ? "border-accent/40 bg-accent/10 rotate-45"
                          : "border-white/10 bg-white/[0.03] rotate-0"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={open === i ? "text-accent" : "text-white/40"}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: open === i ? "400px" : "0px" }}
                  >
                    <p className="text-sm font-light leading-relaxed text-gray-400 pb-6 max-w-[680px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative bg-[#050505] px-6 py-24 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
          <div className="relative z-10 mx-auto max-w-[700px] text-center">
            <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black text-foreground mb-6">
              Vous avez d&apos;autres questions ?
            </h2>
            <p className="text-base font-light text-gray-400 mb-10">
              Discutons de votre projet lors d&apos;un appel gratuit de 15 minutes. Aucun engagement.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(200,240,0,0.4)]"
            >
              Demander un audit gratuit
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

