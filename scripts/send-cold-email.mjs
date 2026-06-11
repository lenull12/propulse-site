import { readFileSync, writeFileSync } from 'fs'

const envRaw = readFileSync('.env.local', 'utf-8')
const apiKey = envRaw
  .split('\n')
  .find(l => l.startsWith('COLD_EMAIL_API_KEY='))
  ?.split('=')[1]
  ?.trim()

if (!apiKey) {
  console.error('✗ COLD_EMAIL_API_KEY introuvable dans .env.local')
  process.exit(1)
}

function buildEmailHtml(p) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden">
          <tr><td style="padding:32px 32px 0;font-size:15px;line-height:1.7;color:#1a1a1a">
            <p style="margin:0 0 20px">Maître ${p.first_name},</p>

            <p style="margin:0 0 20px">Je me permets de vous contacter après avoir étudié la présence en ligne de votre cabinet. Votre expertise reconnue en <b>${p.practice_area}</b> à ${p.city} a particulièrement retenu mon attention.</p>

            <p style="margin:0 0 20px">En analysant votre site internet, j'ai remarqué que sa structure actuelle ne valorise pas pleinement votre savoir-faire face aux nouveaux critères du web en 2026 (notamment la vitesse de chargement sur mobile et la conversion des visiteurs en clients). À l'heure où les justiciables comparent énormément en ligne, un site parfaitement optimisé est devenu le <b>premier vecteur de réassurance</b>.</p>

            <p style="margin:0 0 20px">J'ai identifié 2 ou 3 ajustements techniques et visuels simples sur votre site ${p.firm_site} qui permettraient de <b>capter davantage de demandes qualifiées</b> sur ${p.city}.</p>

            <p style="margin:0 0 20px">Pour vous projeter concrètement, je vous propose de vous préparer <b>gratuitement et sans engagement une maquette visuelle</b> de ce que pourrait être une version modernisée de votre site.</p>

            <p style="margin:0 0 20px">Seriez-vous ouvert à ce que je vous l'envoie par e-mail la semaine prochaine ?</p>

            <p style="margin:0 0 8px">Bien cordialement,</p>

            <p style="margin:0 0 2px"><b>Raphaël TRAN</b></p>
            <p style="margin:0 0 2px">Développeur web / Consultant en visibilité digitale</p>
            <p style="margin:0 0 2px"><b>PropulseDev</b></p>
            <p style="margin:0 0 2px">06 95 38 27 56</p>
            <p style="margin:0"><a href="https://propulsedev.fr" style="color:#c8f000;text-decoration:none;font-weight:600">propulsedev.fr</a></p>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim()
}

async function sendEmail(p) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'PropulseDev <contact@propulsedev.fr>',
      reply_to: 'contact@propulsedev.fr',
      to: [p.email],
      subject: `Proposition de modernisation de votre site — Cabinet ${p.first_name}`,
      html: buildEmailHtml(p),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`API Resend ${res.status}: ${err}`)
  }

  return res.json()
}

const args = {}
for (const a of process.argv.slice(2)) {
  const m = a.match(/^--(\w+)=(.+)$/)
  if (m) { args[m[1]] = m[2] } else if (a.startsWith('--')) { args[a.slice(2)] = true }
}

if (args['import-csv']) {
  const csvPath = 'c:\\Users\\Admin\\Documents\\Propulse Dev\\Mail\\Prospect\\Prospect.csv'
  const csvRaw = readFileSync(csvPath, 'latin1')
  const lines = csvRaw.trim().split('\n')
  const header = lines[0].split(';').map(c => c.trim())
  const sentIdx = header.indexOf('Sent')

  const prospects = lines.slice(1)
    .filter(line => {
      const cols = line.split(';')
      if (!cols[0] || !cols[0].trim()) return false
      if (sentIdx >= 0 && cols[sentIdx]?.trim().toLowerCase() === 'oui') return false
      return true
    })
    .map(line => {
      const cols = line.split(';')
      const url = (cols[4] || '').trim()
      const firm_site = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')
      return {
        email: (cols[0] || '').trim(),
        first_name: (cols[1] || '').trim(),
        practice_area: (cols[2] || '').trim(),
        city: (cols[3] || '').trim(),
        firm_site,
      }
    })

  const content = `export const prospects = ${JSON.stringify(prospects, null, 2)}`
  writeFileSync('data/prospects.mjs', content, 'utf-8')
  console.log(`✓ ${prospects.length} prospects importés dans data/prospects.mjs`)
  process.exit(0)
}

let prospects = []

if (args.all) {
  const mod = await import('../data/prospects.mjs')
  prospects = mod.prospects
} else if (args.index !== undefined) {
  const mod = await import('../data/prospects.mjs')
  const idx = parseInt(args.index)
  if (idx < 0 || idx >= mod.prospects.length) {
    console.error(`✗ Index ${idx} invalide (0-${mod.prospects.length - 1})`)
    process.exit(1)
  }
  prospects = [mod.prospects[idx]]
} else if (args.email && args.first_name) {
  prospects = [{
    email: args.email,
    first_name: args.first_name,
    practice_area: args.practice_area || '',
    city: args.city || '',
    firm_site: args.firm_site || '',
  }]
} else {
  console.error('Usage :')
  console.error('  node scripts/send-cold-email.mjs --import-csv     ← importer le CSV dans data/prospects.mjs')
  console.error('  node scripts/send-cold-email.mjs --all            ← envoyer à tous')
  console.error('  node scripts/send-cold-email.mjs --index=0        ← envoyer au prospect N')
  console.error('  node scripts/send-cold-email.mjs --email=x@y --first_name=...')
  process.exit(1)
}

if (prospects.length === 0) {
  console.log('→ Aucun prospect à contacter.')
  process.exit(0)
}

let sent = 0
let failed = 0

for (let i = 0; i < prospects.length; i++) {
  const p = prospects[i]

  console.log(`\n${'='.repeat(50)}`)
  console.log(`Prospect ${i + 1}/${prospects.length}`)
  console.log(`  Email        : ${p.email}`)
  console.log(`  Nom          : ${p.first_name}`)
  console.log(`  Spécialité   : ${p.practice_area}`)
  console.log(`  Ville        : ${p.city}`)
  console.log(`  Site         : ${p.firm_site}`)
  console.log(`  Objet        : Proposition de modernisation de votre site — Cabinet ${p.first_name}`)
  console.log(`${'='.repeat(50)}`)

  try {
    await sendEmail(p)
    console.log(`  ✓ Envoyé à ${p.first_name} (${p.email})`)
    sent++
  } catch (err) {
    console.error(`  ✗ Échec : ${err.message}`)
    failed++
  }

  if (i < prospects.length - 1) {
    console.log(`  → Attente 30s avant le prochain envoi...`)
    await new Promise(r => setTimeout(r, 30000))
  }
}

console.log(`\nTerminé. ${sent} envoyé(s), ${failed} échec(s).`)
