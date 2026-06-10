interface ContactBody {
  prenom: string
  email: string
  phone?: string
  site?: string
  description?: string
  type: string
  budget?: string
  timing?: string
  objectives?: string[]
  hasWebsite?: boolean
  companyName?: string
  token: string
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  const { request, env } = context
  const body: ContactBody = await request.json()

  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.token }),
  })
  const verifyData = await verify.json()
  if (!verifyData.success) {
    return new Response(JSON.stringify({ error: "Validation anti-spam échouée." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const typeLabel =
    body.type === "audit" ? "Audit gratuit" : body.type === "estimation" ? "Estimation projet" : "Formulaire simple"

  const objectivesHtml = body.objectives?.length
    ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Objectifs</td><td style="padding:8px 12px">${body.objectives.join(", ")}</td></tr>`
    : ""

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "PropulseDev <contact@propulsedev.fr>",
      to: [env.CONTACT_EMAIL ?? "contact@propulsedev.fr"],
      subject: `Nouveau contact [${typeLabel}] — ${body.prenom}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif">
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Type</td><td style="padding:8px 12px;font-family:sans-serif">${typeLabel}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Prénom</td><td style="padding:8px 12px;font-family:sans-serif">${body.prenom}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Email</td><td style="padding:8px 12px;font-family:sans-serif">${body.email}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Téléphone</td><td style="padding:8px 12px;font-family:sans-serif">${body.phone || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Site</td><td style="padding:8px 12px;font-family:sans-serif">${body.site || "—"}</td></tr>
          ${body.hasWebsite === false ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">A un site</td><td style="padding:8px 12px;font-family:sans-serif">Non — audit fiche Google</td></tr>` : ""}
          ${body.companyName ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Entreprise</td><td style="padding:8px 12px;font-family:sans-serif">${body.companyName}</td></tr>` : ""}
          ${body.budget ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Budget</td><td style="padding:8px 12px;font-family:sans-serif">${body.budget}</td></tr>` : ""}
          ${body.timing ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Timing</td><td style="padding:8px 12px;font-family:sans-serif">${body.timing}</td></tr>` : ""}
          ${objectivesHtml.replace("font-family:sans-serif;", "font-family:sans-serif")}
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;font-family:sans-serif">Message</td><td style="padding:8px 12px;font-family:sans-serif;white-space:pre-wrap">${body.description || "—"}</td></tr>
        </table>
      `,
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
