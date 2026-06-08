import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY ?? "")
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "raphael@propulsedev.fr"
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? ""

export async function POST(request: Request) {
  try {
    const { prenom, email, phone, site, description, token } = await request.json()

    // Vérification du token Turnstile
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: TURNSTILE_SECRET, response: token }),
    })
    const verifyData = await verify.json()
    if (!verifyData.success) {
      return NextResponse.json({ error: "Validation anti-spam échouée." }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: "PropulseDev <raphael@propulsedev.fr>",
      to: [TO_EMAIL],
      subject: `Nouveau contact — ${prenom}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif">
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Prénom</td><td style="padding:8px 12px">${prenom}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Email</td><td style="padding:8px 12px">${email}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Téléphone</td><td style="padding:8px 12px">${phone || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Site</td><td style="padding:8px 12px">${site || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Message</td><td style="padding:8px 12px;white-space:pre-wrap">${description || "—"}</td></tr>
        </table>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue, veuillez réessayer." },
      { status: 500 }
    )
  }
}
