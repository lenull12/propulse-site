import sharp from "sharp"
import fs from "fs"
import path from "path"

const SHARED = "public/demos/notaires/shared"
const files = [
  "dubois.png",
  "martin.png",
  "lambert.png",
  "petit.png",
  "notaire1.jpg",
  "notaire2.jpg",
  "notaire3.jpg",
]

async function main() {
  for (const file of files) {
    const input = path.join(SHARED, file)
    const output = path.join(SHARED, file.replace(/\.(png|jpg)$/, ".webp"))
    if (fs.existsSync(output)) {
      console.log(`SKIP ${file} → ${path.basename(output)} (already exists)`)
      continue
    }
    const ext = path.extname(file).toLowerCase()
    const isPersona = ext === ".png"
    await sharp(input)
      .resize(isPersona ? 400 : 1920, undefined, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: isPersona ? 80 : 75 })
      .toFile(output)
    console.log(`OK ${file} → ${path.basename(output)}`)
  }
  console.log("Done")
}

main().catch(console.error)
