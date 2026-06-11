import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { getArticle, getAllArticleSlugs, getRelatedArticles } from "@/lib/articles"
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
    title: `${article.title} — PropulseDev`,
    description: article.metaDesc,
    keywords: article.metaKeywords.join(", "),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDesc,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "PropulseDev",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav forceDark />

      <article className="bg-[#faf9f6] px-6 pt-40 pb-24 md:px-15">
        <div className="mx-auto max-w-[800px]">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-gray-600">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-gray-600">
              Blog
            </Link>
            <span>/</span>
            <span className="max-w-[200px] truncate text-gray-500">{article.title}</span>
          </nav>

          {/* Catégorie */}
          <span className="mb-4 inline-flex w-fit rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[1.5px] text-gray-500">
            {article.category}
          </span>

          {/* Titre */}
          <h1 className="mb-4 font-mono text-[clamp(28px,3.5vw,42px)] font-black leading-[1.15] text-gray-900">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mb-10 flex items-center gap-4 text-base text-gray-400">
            <span>{article.date}</span>
            <span className="h-3 w-px bg-gray-200" />
            <span>{article.readTime}</span>
          </div>

          {/* Contenu */}
          <div className="flex flex-col">
            {article.content.map((line, i) => renderLine(line, i, true))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
            <p className="mb-5 text-lg font-medium text-gray-900">
              Vous voulez le même résultat pour votre activité ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-base font-semibold text-white transition-all hover:scale-[1.02]"
            >
              Discutons de votre projet
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Articles liés */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 font-mono text-xl font-bold text-gray-900">
                Articles liés
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <span className="mb-2 inline-flex w-fit rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[1.5px] text-gray-500">
                      {r.category}
                    </span>
                    <h3 className="font-mono text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-gray-600">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <SiteFooter />
    </>
  )
}
