import { NextResponse } from "next/server"

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_URL ?? ""

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prenom, email, phone, site, description } = body

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
        body: JSON.stringify({ prenom, email, phone, site, description }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'envoi." },
        { status: response.status }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch (e) {
    console.error("Contact API error:", e)
    return NextResponse.json(
      { error: "Une erreur est survenue, veuillez réessayer." },
      { status: 500 }
    )
  }
}