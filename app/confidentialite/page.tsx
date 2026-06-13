import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Politique de confidentialité — PropulseDev",
  description:
    "Politique de confidentialité de PropulseDev : quelles données sont collectées, pourquoi, et quels sont vos droits selon le RGPD.",
}

export default function ConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <div className="flex flex-col gap-12">
            {[
              {
                title: "Introduction",
                content: (
                  <>
                    <p>PropulseDev s&apos;engage à protéger la vie privée des visiteurs de son site. Cette politique de confidentialité explique quelles données nous collectons, pourquoi nous les collectons, et quels sont vos droits en matière de protection des données.</p>
                    <p>Conformément au Règlement Général sur la Protection des Données (RGPD), nous traitons vos données de manière transparente, confidentielle et sécurisée.</p>
                  </>
                ),
              },
              {
                title: "Données collectées",
                content: (
                  <>
                    <p>Nous collectons uniquement les données que vous nous fournissez volontairement via le formulaire de contact :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Informations relatives à votre projet (besoins, budget, délais)</li>
                    </ul>
                    <p className="mt-3">Nous ne collectons aucune donnée sensible (données de santé, opinions politiques, etc.).</p>
                  </>
                ),
              },
              {
                title: "Finalité du traitement",
                content: (
                  <>
                    <p>Les données collectées via le formulaire de contact sont utilisées exclusivement pour :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Répondre à votre demande de devis ou d&apos;information</li>
                      <li>Vous contacter dans le cadre de votre projet</li>
                      <li>Vous envoyer des communications liées à votre demande</li>
                    </ul>
                    <p className="mt-3">Nous n&apos;utilisons pas vos données à des fins commerciales sans votre consentement explicite.</p>
                  </>
                ),
              },
              {
                title: "Destinataires des données",
                content: (
                  <>
                    <p>Vos données sont destinées exclusivement à PropulseDev. Elles ne sont ni vendues, ni partagées avec des tiers, sauf obligation légale.</p>
                    <p>Les données peuvent transiter par les services suivants, qui agissent en tant que sous-traitants et respectent le RGPD :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cloudflare (hébergement du site)</li>
                      <li>Resend (envoi d&apos;emails)</li>
                      <li>Hostinger (messagerie)</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Durée de conservation",
                content: (
                  <>
                    <p>Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis pendant un maximum de 3 ans à compter du dernier contact.</p>
                    <p>Passé ce délai, elles sont supprimées ou anonymisées.</p>
                  </>
                ),
              },
              {
                title: "Vos droits RGPD",
                content: (
                  <>
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Droit d&apos;accès</strong> — obtenir confirmation que vos données sont traitées et en recevoir une copie</li>
                      <li><strong>Droit de rectification</strong> — demander la correction de données inexactes</li>
                      <li><strong>Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
                      <li><strong>Droit à la limitation</strong> — restreindre le traitement de vos données</li>
                      <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
                      <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement de vos données</li>
                    </ul>
                    <p className="mt-3">Pour exercer ces droits, contactez-nous à <a href="mailto:contact@propulsedev.fr" className="text-accent/70 hover:text-accent transition-colors">contact@propulsedev.fr</a>.</p>
                  </>
                ),
              },
              {
                title: "Cookies",
                content: (
                  <>
                    <p>Ce site n&apos;utilise pas de cookies tiers à des fins publicitaires ou de traçage. Aucun cookie de suivi, d&apos;analyse ou de réseaux sociaux n&apos;est déposé lors de votre visite.</p>
                    <p>Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés (session, préférences d&apos;affichage). Ils ne collectent aucune donnée personnelle.</p>
                  </>
                ),
              },
              {
                title: "Sécurité",
                content: (
                  <>
                    <p>Nous mettons en œuvre les mesures de sécurité suivantes pour protéger vos données :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Chiffrement HTTPS (SSL/TLS) sur l&apos;ensemble du site</li>
                      <li>Protection Cloudflare contre les attaques DDoS et les intrusions</li>
                      <li>Accès restreint aux données collectées</li>
                      <li>Mises à jour de sécurité régulières</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Contact",
                content: (
                  <>
                    <p>Pour toute question relative à cette politique de confidentialité ou à l&apos;exercice de vos droits, vous pouvez nous contacter :</p>
                    <p>Email : <a href="mailto:contact@propulsedev.fr" className="text-accent/70 hover:text-accent transition-colors">contact@propulsedev.fr</a></p>
                    <p>Responsable du traitement : Raphaël Tran, PropulseDev</p>
                  </>
                ),
              },
            ].map((section) => (
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
