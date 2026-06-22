import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "CGV — PropulseDev",
  description: "Conditions générales de vente de PropulseDev, agence de développement web et SEO.",
}

const SECTIONS = [
  {
    title: "1. Prestations",
    content: (
      <>
        <p>PropulseDev propose les prestations suivantes :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Création de site web sur-mesure (formules Starter, Pro, Premium)</li>
          <li>Audit SEO et analyse de performance</li>
          <li>Abonnements mensuels (Zen, Performance, Business)</li>
          <li>Modifications et maintenance à la carte</li>
        </ul>
        <p>Chaque prestation est détaillée dans le devis accepté par le client.</p>
      </>
    ),
  },
  {
    title: "2. Devis et commande",
    content: (
      <>
        <p>Le devis est valable 30 jours à compter de son envoi. La commande est considérée comme ferme après signature du devis par le client et versement de l&apos;acompte. Aucun travail de conception ou de développement ne commence avant la réception de l&apos;acompte.</p>
      </>
    ),
  },
  {
    title: "3. Paiement",
    content: (
      <>
        <p>Pour les créations de site : 30% du montant total à la commande, 70% à la mise en ligne. Le paiement s&apos;effectue par virement bancaire.</p>
        <p>Pour le renouvellement annuel hébergement/domaine (59 € TTC) : la facture est émise à la date anniversaire de la mise en ligne. Le paiement est dû sous 15 jours. Passé ce délai, le site peut être mis hors ligne jusqu&apos;à régularisation.</p>
        <p>Pour les abonnements mensuels : la mensualité est due le 1er de chaque mois. En cas de retard de paiement, des pénalités de trois fois le taux d&apos;intérêt légal sont applicables. Passé un délai de 15 jours après relance, l&apos;abonnement peut être suspendu.</p>
      </>
    ),
  },
  {
    title: "4. Livraison et réception",
    content: (
      <>
        <p>Le site est livré sur un environnement de preview accessible au client. Le client dispose de 14 jours calendaires pour tester le site et demander des ajustements. La mise en ligne définitive a lieu après validation écrite du client (email accepté). Passé ce délai sans réponse, le site est considéré comme accepté.</p>
        <p>Une fois le site en ligne, PropulseDev assure gratuitement pendant 12 mois la maintenance courante : mises à jour de sécurité des dépendances, surveillance de l&apos;uptime, backups hebdomadaires et renouvellement du nom de domaine. Au-delà, ces services sont facturés 59 € TTC par an (renouvellement domaine + hébergement + maintenance).</p>
      </>
    ),
  },
  {
    title: "5. Abonnements mensuels",
    content: (
      <>
        <p>Les abonnements mensuels sont sans engagement et résiliables à tout moment par email. La résiliation prend effet à la fin du mois en cours. Aucun remboursement partiel n&apos;est effectué pour un mois entamé. En cas de non-paiement, l&apos;abonnement est suspendu après une relance de 15 jours.</p>
        <p>Le client peut souscrire, changer ou résilier son abonnement à tout moment. Le contenu des abonnements est détaillé sur la page tarifs du site.</p>
      </>
    ),
  },
  {
    title: "6. Propriété intellectuelle",
    content: (
      <>
        <p>Le site web livré (design, code source, contenu créé par PropulseDev) devient la propriété exclusive du client après paiement intégral du solde.</p>
        <p>PropulseDev se réserve le droit de mentionner le projet dans son portfolio et ses communications commerciales, sauf opposition écrite du client.</p>
        <p>Le client est seul responsable du contenu qu&apos;il fournit (textes, photographies, logo, marque) et garantit disposer de tous les droits nécessaires sur ces éléments, notamment au regard du droit d&apos;auteur et du RGPD.</p>
      </>
    ),
  },
  {
    title: "7. Nom de domaine",
    content: (
      <>
        <p>Le nom de domaine offert la 1ʳᵉ année dans le cadre des formules est un domaine standard de premier niveau (.fr, .com, .net, .org). Tout surcoût lié à un nom de domaine premium ou à une extension exotique est à la charge du client et sera mentionné dans le devis.</p>
        <p>À compter de la 2ᵉ année, le nom de domaine est renouvelé automatiquement dans le cadre de l&apos;offre de renouvellement à 59 € TTC par an (domaine + hébergement + maintenance sécurité). Le client est prévenu 30 jours avant chaque renouvellement.</p>
        <p>En cas de résiliation de l&apos;abonnement mensuel ou de l&apos;offre de renouvellement, le nom de domaine est transféré au client sur demande écrite. Le client reste propriétaire de son nom de domaine en toutes circonstances.</p>
      </>
    ),
  },
  {
    title: "8. Responsabilité",
    content: (
      <>
        <p>PropulseDev s&apos;engage à une obligation de moyens dans la réalisation des prestations. La responsabilité de PropulseDev ne saurait être engagée dans les cas suivants :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Indisponibilité totale ou partielle du site liée à l&apos;hébergeur Cloudflare ou à toute autre infrastructure tierce</li>
          <li>Modifications apportées au site par le client ou un tiers sans l&apos;intervention de PropulseDev</li>
          <li>Non-respect par le client des recommandations techniques ou de sécurité</li>
          <li>Dommages indirects tels que perte de chiffre d&apos;affaires, perte de clientèle, atteinte à l&apos;image</li>
          <li>Cas de force majeure tels que définis par la jurisprudence française</li>
        </ul>
        <p>La garantie de PropulseDev est limitée au montant total de la prestation concernée (forfait site ou abonnement mensuel).</p>
      </>
    ),
  },
  {
    title: "9. Données personnelles",
    content: (
      <>
        <p>Les données personnelles collectées (nom, email, téléphone) sont utilisées exclusivement dans le cadre de la relation commerciale. Elles ne sont ni revendues, ni partagées avec des tiers. Conformément au RGPD, le client dispose d&apos;un droit d&apos;accès, de rectification et de suppression de ses données. Pour exercer ce droit : <a href="mailto:contact@propulsedev.fr" className="text-accent/70 hover:text-accent transition-colors">contact@propulsedev.fr</a>.</p>
      </>
    ),
  },
  {
    title: "10. Résiliation",
    content: (
      <>
        <p>Le client peut résilier son abonnement mensuel à tout moment (cf. article 5). En cas de résiliation, PropulseDev remet au client une archive complète du site (fichiers statifs) et accompagne le transfert du nom de domaine si nécessaire. Aucune rétention de données n&apos;est pratiquée.</p>
        <p>PropulseDev peut résilier l&apos;abonnement en cas de non-paiement après une relance restée sans réponse pendant 30 jours.</p>
      </>
    ),
  },
  {
    title: "11. Litiges",
    content: (
      <>
        <p>Les présentes conditions générales sont soumises au droit français. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable avant toute action judiciaire. À défaut d&apos;accord amiable, le tribunal compétent est celui du siège de PropulseDev.</p>
      </>
    ),
  },
]

export default function CgvPage() {
  return (
    <>
      <SiteNav />

      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Retour
          </Link>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Légal</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            Conditions générales de vente
          </h1>
          <p className="text-sm font-light text-gray-500">
            Dernière mise à jour : juin 2026
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <div className="flex flex-col gap-12">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 font-mono text-xl font-bold text-foreground">{section.title}</h2>
                <div className="flex flex-col gap-3 text-sm font-light leading-relaxed text-gray-400">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
