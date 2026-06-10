"use client"

import Image from "next/image"

const BRANDS = [
  { name: "Netflix", svg: "/svg/netflix.svg" },
  { name: "Airbnb", svg: "/svg/airbnb.svg" },
  { name: "TikTok", svg: "/svg/tiktok.svg" },
  { name: "Notion", svg: "/svg/notion.svg" },
  { name: "Twitch", svg: "/svg/twitch.svg" },
  { name: "Uber", svg: "/svg/uber.svg" },
  { name: "Reddit", svg: "/svg/reddit.svg" },
  { name: "Pinterest", svg: "/svg/pinterest.svg" },
  { name: "Google", svg: "/svg/google.svg" },
  { name: "Meta", svg: "/svg/meta.svg" },
  { name: "Medium", svg: "/svg/medium.svg" },
  { name: "Nike", svg: "/svg/nike.svg" },
  { name: "Target", svg: "/svg/target.svg" },
  { name: "Lyft", svg: "/svg/lyft.svg" },
  { name: "Asana", svg: "/svg/asana.svg" },
]

export function MarqueeTech() {
  return (
    <div className="relative bg-[#050505] border-y border-white/5 py-10 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

      <div className="mx-auto max-w-[1400px] px-6 mb-8 text-center">
        <p className="text-sm font-medium tracking-wide text-accent font-sans">
          La même technologie que les plus grands.
        </p>
        <p className="mt-1 text-xs text-white/60 lg:text-white/30 font-light">
          Netflix, Airbnb, Google, Uber, TikTok... utilisent la stack qu&apos;on utilise pour vos projets.
        </p>
      </div>

      <div
        className="flex gap-16 w-max items-center"
        style={{
          animation: "marqueeTechScroll 40s linear infinite",
        }}
      >
        {BRANDS.concat(BRANDS).map((brand, i) => (
          <div
            key={i}
            className="flex items-center gap-4 flex-shrink-0"
          >
            <Image
              src={brand.svg}
              alt={brand.name}
              width={24}
              height={24}
              className="w-6 h-6 opacity-60 brightness-0 invert transition-all duration-300 hover:opacity-90"
            />
            <span className="text-sm text-white/70 lg:text-white/50 font-light tracking-wide transition-all duration-300 hover:text-white/80">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeTechScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
