"use client"

import { useState } from "react"

export function PhoneReveal({ className = "", label = "Afficher le numéro", revealedClassName }: { className?: string; label?: string; revealedClassName?: string }) {
  const [show, setShow] = useState(false)
  const phone = process.env.NEXT_PUBLIC_PHONE ?? ""

  if (!phone) return null

  return (
    <button
      onClick={() => setShow(true)}
      className={`w-fit text-sm transition-colors cursor-pointer ${className}`}
    >
      {show ? (
        <span className={`font-mono tracking-wider ${revealedClassName ?? "text-accent"}`}>
          📞{" "}
          {phone.replace(/(\d{2})(?=\d)/g, "$1 ")}
        </span>
      ) : (
        <span className="hover:opacity-70 transition-opacity">
          📞 {label}
        </span>
      )}
    </button>
  )
}
