import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Capabilities } from "@/components/landing/capabilities"
import { DemosPreview } from "@/components/landing/demos-preview"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { Testimonials } from "@/components/landing/testimonials"
import { Contact } from "@/components/landing/contact"
import { LiveMetrics } from "@/components/landing/live-metrics"
import { Marquee } from "@/components/landing/marquee"
import { About } from "@/components/landing/about"
import { Faq } from "@/components/landing/faq"
import Image from "next/image"

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Capabilities />
        <LiveMetrics />
        <DemosPreview />
        <Services />
        <Process />
        <div className="-mt-32 hidden md:block">
          <Image
            src="/images/hands.png"
            alt=""
            width={1440}
            height={480}
            className="h-auto w-full"
            priority={false}
          />
        </div>
        <About />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}