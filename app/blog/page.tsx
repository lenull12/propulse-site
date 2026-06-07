import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ARTICLES } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Blog — Propulse Dev",
  description:
    "Conseils concrets pour booster votre visibilité en ligne : SEO local, avis Google, performance site web, et croissance digitale pour indépendants.",
  openGraph: {
    title: "Blog — Propulse Dev",
    description: "Conseils concrets pour booster votre visibilité en ligne.",
  },
}

export default function BlogIndexPage() {
  return (
    <>
      <SiteNav />

      <section className="border-b border-white/10 bg-background px-6 pb-20 pt-40 md:px-15">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-accent">Blog</p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-foreground">
            Des conseils concrets pour
            <br />
            <span className="text-white/30">booster votre activité en ligne.</span>
          </h1>
          <p className="max-w-[560px] text-base font-light leading-relaxed text-gray-400">
            Pas de théorie. Des actions que vous pouvez mettre en place dès demain pour gagner
            en visibilité et attirer plus de clients.
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-15">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col rounded-[16px] border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30"
            >
              {/* Catégorie */}
              <span className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[1.5px] text-accent">
                {article.category}
              </span>

              {/* Titre */}
              <h2 className="mb-3 font-mono text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                {article.title}
              </h2>

              {/* Extrait */}
              <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-gray-400">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span>{article.date}</span>
                <span className="h-3 w-px bg-white/10" />
                <span>{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  )
}