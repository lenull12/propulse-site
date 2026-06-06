import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { Contact } from "@/components/landing/contact"

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
