import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import type { ReactNode } from "react"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { ChatBot } from "@/components/ui/chatbot"
import "./globals.css"

const preloadHero = "/images/herolanding.webp"


const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://propulsedev.fr"),
  title: "PropulseDev — Croissance digitale B2B",
  description:
    "Nous aidons les professionnels indépendants à transformer leur présence en ligne en machine à clients : audit, refonte web et gestion automatisée de la réputation Google.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "PropulseDev",
    title: "PropulseDev — Croissance digitale B2B",
    description:
      "Nous aidons les professionnels indépendants à transformer leur présence en ligne en machine à clients.",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PropulseDev — Croissance digitale B2B",
    description:
      "Nous aidons les professionnels indépendants à transformer leur présence en ligne en machine à clients.",
    images: ["/og-default.svg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PropulseDev",
              url: "https://propulsedev.fr",
            }),
          }}
        />
        <link rel="preload" as="image" href={preloadHero} fetchPriority="high" />
        <CustomCursor />
        <ChatBot />
        {children}
      </body>
    </html>
  )
}