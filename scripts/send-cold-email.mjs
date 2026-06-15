import { readFileSync, writeFileSync } from 'fs'
import { niches, buildSubject, buildFullEmail } from '../lib/cold-email-config.mjs'

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
  const config = niches[p.niche] || niches['avocat']
  const subject = buildSubject(p, config)
  const bodyText = buildFullEmail(p, config)

  const bodyHtml = bodyText
    .split('\n')
    .map(line => {
      if (!line) return '<br>'
      return `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#1a1a1a;font-family:Inter,Helvetica,Arial,sans-serif">${line.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')

  return {
    subject,
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden">
          <tr><td style="padding:32px 32px 0;font-size:14px;line-height:1.6;color:#1a1a1a;font-family:Inter,Helvetica,Arial,sans-serif">
${bodyHtml}
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim(),
  }
}

async function sendEmail(p) {
  const { subject, html } = buildEmailHtml(p)
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
      subject,
      html,
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
      const has_site = url !== 'NA' && url.startsWith('http')
      const firm_site = has_site ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '') : ''
      const niche = (cols[5] || 'avocat').trim().toLowerCase()
      const httpsCol = (cols[6] || '').trim().toLowerCase()
      return {
        email: (cols[0] || '').trim(),
        first_name: (cols[1] || '').trim(),
        niche: niches[niche] ? niche : 'avocat',
        practice_area: has_site ? (cols[2] || '').trim() : '',
        city: (cols[3] || '').trim(),
        firm_site,
        has_site,
        https: has_site ? httpsCol !== 'oui' : false,
      }
    })

  const content = `export const prospects = ${JSON.stringify(prospects, null, 2)}`
  writeFileSync('data/prospects.mjs', content, 'utf-8')
  console.log(`✓ ${prospects.length} prospects importés dans data/prospects.mjs`)
  process.exit(0)
}

if (args.schedule) {
  const target = new Date(args.schedule)
  const now = Date.now()
  const diff = target.getTime() - now
  if (diff > 0) {
    const hours = Math.floor(diff / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    console.log(`⏳ Attente jusqu'au ${target.toLocaleString('fr-FR')} — ${hours}h${mins} restantes`)
    await new Promise(r => setTimeout(r, diff))
    console.log(`▶ Envoi déclenché à ${new Date().toLocaleString('fr-FR')}\n`)
  }
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
    niche: args.niche || 'avocat',
    practice_area: args.practice_area || '',
    city: args.city || '',
    firm_site: args.firm_site || '',
    has_site: !!args.firm_site,
    https: args.https !== 'oui',
  }]
} else {
  console.error('Usage :')
  console.error('  node scripts/send-cold-email.mjs --import-csv                ← importer le CSV dans data/prospects.mjs')
  console.error('  node scripts/send-cold-email.mjs --all                       ← envoyer à tous')
  console.error('  node scripts/send-cold-email.mjs --all --schedule=YYYY-MM-DDTHH:mm  ← planifier l\'envoi')
  console.error('  node scripts/send-cold-email.mjs --index=0                   ← envoyer au prospect N')
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
  const config = niches[p.niche] || niches['avocat']
  const { subject } = buildEmailHtml(p)

  console.log(`\n${'='.repeat(50)}`)
  console.log(`Prospect ${i + 1}/${prospects.length}`)
  console.log(`  Email        : ${p.email}`)
  console.log(`  Nom          : ${p.first_name}`)
  console.log(`  Niche        : ${p.niche}`)
  console.log(`  Spécialité   : ${p.practice_area}`)
  console.log(`  Ville        : ${p.city}`)
  console.log(`  Site         : ${p.has_site ? p.firm_site + (p.https === false ? ' (⚠ non sécurisé)' : '') : '(pas de site)'}`)
  console.log(`  Objet        : ${subject}`)
  console.log(`${'='.repeat(50)}`)
  console.log()
  console.log(buildFullEmail(p, config))
  console.log()

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
