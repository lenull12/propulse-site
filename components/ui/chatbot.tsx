"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { CHAT_FLOW, type ChatStep } from "@/lib/chatbot-data"

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

type Message = {
  text: string
  isBot: boolean
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState<Message[]>([{ text: CHAT_FLOW.root.message, isBot: true }])
  const [currentStep, setCurrentStep] = useState<ChatStep>(CHAT_FLOW.root)

  const goToStep = useCallback((nextId: string) => {
    const step = CHAT_FLOW[nextId]
    if (!step) return
    setHistory((prev) => [...prev, { text: step.message, isBot: true }])
    setCurrentStep(step)
  }, [])

  const handleSuggestion = useCallback(
    (nextId: string) => {
      setHistory((prev) => [...prev, { text: nextId === "root" ? "🏠 Retour à l'accueil" : "", isBot: false }])
      goToStep(nextId)
    },
    [goToStep],
  )

  const toggleOpen = useCallback(() => {
    if (!open) {
      // Réinitialiser quand on rouvre
      setHistory([{ text: CHAT_FLOW.root.message, isBot: true }])
      setCurrentStep(CHAT_FLOW.root)
    }
    setOpen((prev) => !prev)
  }, [open])

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(200,240,0,0.3)]"
        aria-label="Ouvrir le chat"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {/* Panneau de chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] animate-slideUp rounded-2xl border border-white/10 bg-surface shadow-2xl">
          {/* En-tête */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
              P
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">PropulseDev</p>
              <p className="text-[11px] text-green-400">● En ligne</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto px-5 py-4">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.isBot
                      ? "rounded-tl-sm border border-white/10 bg-white/5 text-foreground"
                      : "rounded-tr-sm bg-accent/20 text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="border-t border-white/10 px-5 py-3">
            {currentStep.suggestions && currentStep.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentStep.suggestions.map((s) => (
                  <button
                    key={s.nextId}
                    onClick={() => handleSuggestion(s.nextId)}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] text-foreground transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {currentStep.link && (
              <Link
                href={currentStep.link.href}
                onClick={() => setOpen(false)}
                className="mt-3 block text-center text-[13px] font-medium text-accent transition-colors hover:text-accent/80"
              >
                {currentStep.link.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}