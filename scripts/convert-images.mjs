import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs"
import { join, parse, dirname } from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ARTICLES_PATH = join(__dirname, "..", "lib", "articles.ts")
const IMG_DIR = join(__dirname, "..", "public", "images", "blog")

// Read articles.ts and extract slug + image pairs
const content = readFileSync(ARTICLES_PATH, "utf-8")
const lines = content.split("\n")

const articles = []
let currentSlug = null

for (const line of lines) {
  const cleaned = line.replace(/\r$/, "")
  const slugMatch = cleaned.match(/^\s+slug:\s+"(.+)",$/)
  if (slugMatch) currentSlug = slugMatch[1]

  const imageMatch = cleaned.match(/^\s+image:\s+"(photo\d+)",$/)
  if (imageMatch && currentSlug) {
    articles.push({ slug: currentSlug, photo: imageMatch[1] })
  }
}

console.log(`Found ${articles.length} articles in articles.ts`)
articles.forEach((a) => console.log(`  ${a.photo} → ${a.slug}`))

// Ensure output directory exists
if (!existsSync(IMG_DIR)) {
  mkdirSync(IMG_DIR, { recursive: true })
}

// Process each file in public/images/blog/ (skip existing .webp)
const blogFiles = readdirSync(IMG_DIR).filter((f) => f !== ".gitkeep" && !f.endsWith(".webp"))

let converted = 0

for (const fileName of blogFiles) {
  const parsed = parse(fileName)
  const photoName = parsed.name // e.g., "photo1"
  const article = articles.find((a) => a.photo === photoName)

  if (!article) {
    console.log(`  ⚠ No article found for ${fileName}, skipping`)
    continue
  }

  const inputPath = join(IMG_DIR, fileName)
  const outputPath = join(IMG_DIR, `${article.slug}.webp`)

  try {
    await sharp(inputPath)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .webp({ quality: 80 })
      .toFile(outputPath)

    console.log(`  ✅ ${fileName} → ${article.slug}.webp (1200×630)`)
    converted++
  } catch (err) {
    console.log(`  ❌ ${fileName}: ${err.message}`)
  }
}

// Update articles.ts with new paths (line-by-line to avoid duplicates)
if (converted > 0) {
  const newLines = lines.map((line) => {
    const cleaned = line.replace(/\r$/, "")
    for (const article of articles) {
      const blogFile = blogFiles.find((f) => parse(f).name === article.photo)
      if (!blogFile) continue
      const oldStr = `image: "${article.photo}",`
      if (cleaned.startsWith(oldStr) || cleaned.trim() === oldStr) {
        return line.replace(cleaned, `image: "/images/blog/${article.slug}.webp",`)
      }
    }
    return line
  })

  writeFileSync(ARTICLES_PATH, newLines.join("\n"), "utf-8")
  console.log(`\n✅ Updated ${converted} image paths in articles.ts`)
} else {
  console.log("\n⚠ No images converted, articles.ts not modified")
}

console.log("\nDone!")
