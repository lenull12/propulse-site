"use client"

import { useState } from "react"
import { Reveal } from "@/components/ui/reveal"

const FAQS = [
  {
    q: "Combien coûte un site web ?",
    a: "Un site vitrine sur-mesure démarre à 1 000 €. Le prix final dépend du nombre de pages, des fonctionnalités et de votre secteur. L'audit initial est toujours offert et sans engagement — c'est lui qui permet de chiffrer précisément votre projet.",
  },
  {
    q: "Combien de temps pour livrer mon site ?",
    a: "Entre 1 et 3 semaines selon la complexité. Dès la validation du devis, nous vous envoyons un planning détaillé avec chaque étape. Vous avez une visibilité complète sur l'avancement du projet.",
  },
  {
    q: "Je n'ai aucune connaissance technique. Est-ce un problème ?",
    a: "C'est exactement pour vous que nous travaillons. Nous nous occupons de tout — hébergement, nom de domaine, mises à jour, sécurité. Vous recevez un site clé en main, avec une formation courte pour gérer votre contenu si vous le souhaitez.",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Nous restons disponibles pour les ajustements post-livraison pendant 30 jours. Au-delà, une maintenance mensuelle optionnelle est disponible pour les mises à jour, sauvegardes et suivi des performances.",
  },
  {
    q: "Comment fonctionne le système d'avis Google ?",
    a: "Nous configurons un système automatisé qui envoie un SMS ou un QR code à vos clients satisfaits pour les inviter à laisser un avis 5 étoiles. Les clients insatisfaits sont redirigés vers un formulaire privé — leur avis ne part pas sur Google. Résultat : votre note monte sans friction.",
  },
  {
    q: "Est-ce que mon site sera bien positionné sur Google ?",
    a: "Chaque site est construit avec les bonnes pratiques SEO dès le départ : structure technique, balises optimisées, vitesse de chargement, responsive mobile. Pour le référencement local, nous travaillons aussi votre fiche Google My Business. Le SEO prend du temps mais les bases sont solides dès le lancement.",
  },
  {
    q: "Comment se fait le paiement ?",
    a: "30% à la commande pour lancer le projet, 70% à la mise en ligne. Paiement par virement. Pas de frais cachés.",
  },
  {
    q: "L'abonnement est-il obligatoire ?",
    a: "Non. Votre site vous appartient, hébergement et domaine offerts 1 an. Vous pouvez souscrire un abonnement Zen (29 €), Performance (59 €) ou Business (89 €) quand vous le souhaitez. Résiliable à tout moment.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative bg-[#050505] px-6 py-32 md:px-12 overflow-hidden border-t border-white/5 bg-grid-cyber">
      <Reveal>
      <div className="relative z-10 mx-auto max-w-[800px]">
        {/* En-tête */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent/40" />
            <p className="text-sm font-medium tracking-wide text-accent font-sans">Questions fréquentes</p>
            <span className="w-8 h-px bg-accent/40" />
          </div>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-black leading-[1.15]">
            <span className="block text-foreground">Toutes vos questions,</span>
            <span className="block text-white/30">des réponses claires.</span>
          </h2>
        </div>

        {/* Accordéon */}
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
                style={{ maxHeight: open === i ? "300px" : "0px" }}
              >
                <p className="text-sm font-light leading-relaxed text-gray-400 pb-6 max-w-[680px]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  )
}