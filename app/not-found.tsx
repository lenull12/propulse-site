import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[3px] text-accent">Erreur 404</p>
        <h1 className="font-mono text-[clamp(32px,4vw,52px)] font-black leading-[1.1] text-balance text-foreground">
          Cette page n&apos;existe pas.
        </h1>
        <p className="max-w-[440px] text-base font-light leading-relaxed text-gray-400">
          Le secteur ou la page que vous cherchez n&apos;est pas disponible. Revenez à l&apos;accueil pour explorer nos
          démos.
        </p>
        <Link
          href="/"
          className="mt-2 inline-block rounded-full bg-accent px-8 py-3.5 text-[15px] font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,240,0,0.3)]"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
