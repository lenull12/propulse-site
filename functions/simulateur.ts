interface SimulateurBody {
  secteur: string
  entreprise: string
  typeSite: string
  style: string
  couleurPrincipale: string
  couleurAccent: string
  couleurPro: string
  fonctionnalites: string[]
  nom: string
  email: string
  telephone: string
  budget: string
}

const SECTEURS: Record<string, string> = {
  avocat: "Avocat",
  artisan: "Artisan",
  architecte: "Architecte",
  restaurateur: "Restaurateur",
  kine: "Kinésithérapeute",
  dentiste: "Chirurgien-dentiste",
  "expert-comptable": "Expert-comptable",
  notaire: "Notaire",
  autre: "Autre",
}

const TYPES: Record<string, string> = {
  vitrine: "Site vitrine",
  multipages: "Multi-pages",
  portfolio: "Portfolio",
  blog: "Blog & contenu",
}

const STYLES: Record<string, string> = {
  moderne: "Moderne",
  sobre: "Sobre",
  classique: "Classique",
  premium: "Premium",
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  const { request, env } = context
  const body: SimulateurBody = await request.json()

  const secteurLabel = SECTEURS[body.secteur] || body.secteur
  const typeLabel = TYPES[body.typeSite] || body.typeSite
  const styleLabel = STYLES[body.style] || body.style
  const fcts = body.fonctionnalites?.length ? body.fonctionnalites.join(", ") : "—"

  const html = `
    <h2 style="margin:0 0 20px;font-family:sans-serif">Nouvelle simulation — ${body.nom}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Nom</td><td style="padding:8px 12px">${body.nom}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Email</td><td style="padding:8px 12px">${body.email || "—"}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Téléphone</td><td style="padding:8px 12px">${body.telephone || "—"}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Secteur</td><td style="padding:8px 12px">${secteurLabel}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Entreprise / Cabinet</td><td style="padding:8px 12px">${body.entreprise || "—"}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Type de site</td><td style="padding:8px 12px">${typeLabel}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Style</td><td style="padding:8px 12px">${styleLabel}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Couleur principale</td><td style="padding:8px 12px"><span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${body.couleurPrincipale};vertical-align:middle;margin-right:6px;border:1px solid #ddd"></span>${body.couleurPrincipale}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Couleur accent</td><td style="padding:8px 12px"><span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${body.couleurAccent};vertical-align:middle;margin-right:6px;border:1px solid #ddd"></span>${body.couleurAccent}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Couleur professionnelle</td><td style="padding:8px 12px"><span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${body.couleurPro};vertical-align:middle;margin-right:6px;border:1px solid #ddd"></span>${body.couleurPro}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Fonctionnalités</td><td style="padding:8px 12px">${fcts}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Budget</td><td style="padding:8px 12px">${body.budget || "Non précisé"}</td></tr>
    </table>
  `

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY || env.COLD_EMAIL_API_KEY}`,
    },
    body: JSON.stringify({
      from: "PropulseDev <contact@propulsedev.fr>",
      reply_to: body.email || "contact@propulsedev.fr",
      to: [env.CONTACT_EMAIL ?? "contact@propulsedev.fr"],
      subject: `Nouvelle simulation — ${body.nom} (${secteurLabel})`,
      html,
    }),
  })

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Erreur d'envoi" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
