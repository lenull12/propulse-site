"use client"

import { useEffect, useState } from "react"

export function PhoneReveal({ className = "", label = "📞 Appelez-nous" }: { className?: string; label?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avant hydratation : placeholder sans numéro — protège des scrapers HTML
  if (!mounted) {
    return (
      <span className={`text-sm transition-colors ${className}`}>
        📞 Appelez-nous
      </span>
    )
  }

  // Après hydratation : numéro visible et cliquable sans clic intermédiaire
  const phone = process.env.NEXT_PUBLIC_PHONE ?? ""
  if (!phone) return null

  return (
    <a
      href={`tel:${phone}`}
      className={`text-sm transition-colors cursor-pointer ${className}`}
    >
      <span className="font-mono tracking-wider">
        📞{" "}
        {phone.replace(/(\d{2})(?=\d)/g, "$1 ")}
      </span>
    </a>
  )
}
