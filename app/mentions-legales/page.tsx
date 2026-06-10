import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Mentions légales — PropulseDev",
  description: "Mentions légales de PropulseDev, agence de développement web et SEO pour professionnels indépendants.",
}

export default function MentionsLegalesPage() {
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
            Mentions légales
          </h1>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <div className="flex flex-col gap-12">
            {[
              {
                title: "Éditeur du site",
                content: (
                  <>
                    <p>PropulseDev</p>
                    <p>Contact : Raphaël — développeur web freelance</p>
                    <p>Email : <a href="mailto:raphael@propulsedev.fr" className="text-accent/70 hover:text-accent transition-colors">raphael@propulsedev.fr</a></p>
                  </>
                ),
              },
              {
                title: "Hébergement",
                content: (
                  <>
                    <p>Cloudflare, Inc.</p>
                    <p>101 Townsend St</p>
                    <p>San Francisco, CA 94107, États-Unis</p>
                    <p><a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-accent/70 hover:text-accent transition-colors">cloudflare.com</a></p>
                  </>
                ),
              },
              {
                title: "Propriété intellectuelle",
                content: (
                  <>
                    <p>L&apos;ensemble des contenus figurant sur le site propulsedev.fr (textes, graphismes, images, animations, icônes, etc.) est la propriété exclusive de PropulseDev, sauf mention contraire.</p>
                    <p>Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation écrite préalable est interdite.</p>
                  </>
                ),
              },
              {
                title: "Responsabilité",
                content: (
                  <>
                    <p>PropulseDev s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, PropulseDev ne peut garantir l&apos;exhaustivité ou l&apos;absence de modification par un tiers.</p>
                    <p>PropulseDev décline toute responsabilité en cas de dommage direct ou indirect résultant de l&apos;utilisation du site.</p>
                  </>
                ),
              },
              {
                title: "Données personnelles",
                content: (
                  <>
                    <p>Les informations recueillies via le formulaire de contact sont destinées exclusivement à PropulseDev et ne sont en aucun cas partagées avec des tiers.</p>
                    <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à <a href="mailto:raphael@propulsedev.fr" className="text-accent/70 hover:text-accent transition-colors">raphael@propulsedev.fr</a>.</p>
                  </>
                ),
              },
              {
                title: "Cookies",
                content: (
                  <>
                    <p>Ce site n&apos;utilise pas de cookies tiers à des fins publicitaires ou de traçage. Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés.</p>
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
