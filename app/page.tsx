import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { DemosPreview } from "@/components/landing/demos-preview"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { Testimonials } from "@/components/landing/testimonials"
import { Contact } from "@/components/landing/contact"
import { LiveMetrics } from "@/components/landing/live-metrics"
import { Marquee } from "@/components/landing/marquee"
import { Faq } from "@/components/landing/faq"

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <LiveMetrics />
        <DemosPreview />
        <Services />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}