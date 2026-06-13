import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ARTICLES, getCategories, slugifyCategory } from "@/lib/articles"

const hasImage = (path: string) => path && (path.startsWith("/") || path.startsWith("http"))

export const metadata: Metadata = {
  title: "Blog — PropulseDev",
  description:
    "Conseils concrets pour booster votre visibilité en ligne : SEO local, avis Google, performance site web, et croissance digitale pour indépendants.",
  openGraph: {
    title: "Blog — PropulseDev",
    description: "Conseils concrets pour booster votre visibilité en ligne.",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — PropulseDev",
    description: "Conseils concrets pour booster votre visibilité en ligne.",
    images: ["/og-default.svg"],
  },
}

const CATEGORIES = getCategories()

export default function BlogIndexPage() {
  return (
    <>
      <SiteNav forceDark />

      <section className="bg-[#faf9f6] px-6 pb-12 pt-32 md:px-15">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-gray-400">
            Blog
          </p>
          <h1 className="mb-5 font-mono text-[clamp(36px,5vw,60px)] font-black leading-[1.1] text-balance text-gray-900">
            Des conseils concrets pour
            <br />
            <span className="text-gray-400">booster votre activité en ligne.</span>
          </h1>
           <p className="mb-10 text-lg font-light leading-relaxed text-gray-600">
            Pas de théorie. Des actions que vous pouvez mettre en place dès demain pour
            gagner en visibilité et attirer plus de clients.
          </p>

          {/* Tags filtre */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#tous"
              className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
            >
              Tous
            </a>
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#categorie-${slugifyCategory(cat)}`}
                className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Article vedette */}
      <section className="bg-[#faf9f6] px-6 pb-16 md:px-15">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[3px] text-gray-400">
            À la une
          </p>
          <Link
            href={`/blog/${ARTICLES[0].slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:flex-row"
          >
            {hasImage(ARTICLES[0].image) ? (
              <Image
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                width={480}
                height={320}
                className="h-64 object-cover lg:h-full lg:w-[480px] lg:shrink-0"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-400 text-sm font-mono lg:h-auto lg:w-[480px] lg:shrink-0" />
            )}
            <div className="flex flex-1 flex-col p-8">
              <span className="mb-3 inline-flex w-fit rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[1.5px] text-gray-500">
                {ARTICLES[0].category}
              </span>
              <h2 className="mb-3 font-mono text-2xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-gray-600 lg:text-3xl">
                {ARTICLES[0].title}
              </h2>
              <p className="mb-6 flex-1 text-base font-light leading-relaxed text-gray-500">
                {ARTICLES[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{ARTICLES[0].date}</span>
                <span className="h-3 w-px bg-gray-200" />
                <span>{ARTICLES[0].readTime}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[#faf9f6] px-6 pb-24 md:px-15" id="tous">
        <div className="mx-auto max-w-[1200px]">
          {CATEGORIES.map((cat) => {
            const articles = ARTICLES.filter((a) => a.category === cat)
            return (
              <div key={cat} id={`categorie-${slugifyCategory(cat)}`} className="mb-16 scroll-mt-28">
                <h2 className="mb-8 font-mono text-2xl font-bold text-gray-900">
                  {cat}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      {hasImage(article.image) ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={400}
                          height={225}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-400 text-sm font-mono" />
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        {/* Catégorie */}
                        <span className="mb-3 inline-flex w-fit rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[1.5px] text-gray-500">
                          {article.category}
                        </span>

                        {/* Titre */}
                        <h3 className="mb-2 font-mono text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-gray-600">
                          {article.title}
                        </h3>

                        {/* Extrait */}
                        <p className="mb-4 flex-1 text-base font-light leading-relaxed text-gray-500">
                          {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{article.date}</span>
                          <span className="h-3 w-px bg-gray-200" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
