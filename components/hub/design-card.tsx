import type { Design } from "@/lib/niches"

export function DesignCard({ design }: { design: Design }) {
  return (
    <a
      href={design.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.02] transition-all hover:-translate-y-1.5 hover:border-accent/30"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a1a1a]">
        <iframe
          src={design.url}
          loading="lazy"
          title={design.title}
          scrolling="no"
          className="h-[200%] w-[200%] origin-top-left scale-50 border-0"
        />
        {/* overlay capte les clics pour que toute la carte soit cliquable */}
        <span className="absolute inset-0 z-10" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-7">
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-accent">{design.tag}</p>
        <h3 className="font-serif text-[22px] font-bold text-foreground">{design.title}</h3>
        <p className="flex-1 text-sm font-light leading-relaxed text-gray-400">{design.description}</p>
        <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-accent transition-all group-hover:gap-2.5">
            Voir la démo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-gray-400">
            {design.badge}
          </span>
        </div>
      </div>
    </a>
  )
}
