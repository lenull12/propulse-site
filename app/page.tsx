import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { HeroV2 } from "@/components/landing/hero-v2"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { Problem } from "@/components/landing/problem"
import { ProductCards } from "@/components/landing/product-cards"
import { DemosPreview } from "@/components/landing/demos-preview"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { Contact } from "@/components/landing/contact"
import { LiveMetrics } from "@/components/landing/live-metrics"
import { Marquee } from "@/components/landing/marquee"
import { MarqueeTech } from "@/components/landing/marquee-tech"
import { About } from "@/components/landing/about"
import { Faq } from "@/components/landing/faq"
import Image from "next/image"

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "PropulseDev",
            url: "https://propulsedev.fr",
            email: "contact@propulsedev.fr",
            telephone: "+33 6 95 38 27 56",
            founder: { "@type": "Person", name: "Raphaël Tran" },
            description:
              "Création de sites web haut de gamme et visibilité Google locale pour les professionnels indépendants.",
            areaServed: "FR",
            sameAs: ["https://propulsedev.fr"],
          }),
        }}
      />
      <SiteNav />
      <main>
        <HeroV2 />
        <FeatureGrid />
        <MarqueeTech />
        <Problem />
        <ProductCards />
        <LiveMetrics />
        <DemosPreview />
        <Marquee />
        <Services />
        <Process />
        <div className="-mt-32 hidden md:block">
          <Image
            src="/images/hands.webp"
            alt=""
            width={1440}
            height={480}
            className="h-auto w-full"
            priority={false}
          />
        </div>
        <About />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}