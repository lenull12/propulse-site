import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { getArticle, getAllArticleSlugs } from "@/lib/articles"
import { renderLine } from "@/lib/markdown-to-html"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Propulse Dev`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <>
      <SiteNav />

      <article className="bg-background px-6 pt-40 pb-24 md:px-15">
        <div className="mx-auto max-w-[720px]">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/30">
            <Link href="/" className="hover:text-accent transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Catégorie */}
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[1.5px] text-accent">
            {article.category}
          </span>

          {/* Titre */}
          <h1 className="mb-4 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-foreground">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mb-10 flex items-center gap-4 text-sm text-white/30">
            <span>{article.date}</span>
            <span className="h-3 w-px bg-white/10" />
            <span>{article.readTime}</span>
          </div>

          {/* Contenu */}
          <div className="flex flex-col">
            {article.content.map((line, i) => renderLine(line, i))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-xl border border-white/5 bg-white/[0.02] p-8 text-center">
            <p className="mb-4 text-base font-medium text-foreground">
              Vous voulez le même résultat pour votre activité ?
            </p>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,240,0,0.4)]"
            >
              Découvrir mes solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </>
  )
}