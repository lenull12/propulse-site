import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { DemosPreview } from "@/components/landing/demos-preview"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { CodingImage } from "@/components/landing/coding-image"
import { Contact } from "@/components/landing/contact"

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <DemosPreview />
        <Services />
        <Process />
        <CodingImage />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
