export function MockupCode() {
  const lines = [
    { width: 60, delay: 0 },
    { width: 80, delay: 0.15 },
    { width: 45, delay: 0.3 },
    { width: 70, delay: 0.45 },
    { width: 55, delay: 0.6 },
    { width: 85, delay: 0.75 },
    { width: 40, delay: 0.9 },
    { width: 65, delay: 1.05 },
  ]

  return (
    <div className="animate-float">
      <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full drop-shadow-[0_0_30px_rgba(200,240,0,0.06)]">
        {/* Écran */}
        <rect x="10" y="10" width="300" height="200" rx="8" stroke="rgba(255,255,255,.08)" strokeWidth="1" fill="rgba(255,255,255,.015)" />
        {/* Barre titre */}
        <circle cx="32" cy="30" r="4" fill="rgba(255,255,255,.15)" />
        <circle cx="46" cy="30" r="4" fill="rgba(255,255,255,.1)" />
        <circle cx="60" cy="30" r="4" fill="rgba(200,240,0,.3)" />
        <line x1="80" y1="30" x2="200" y2="30" stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeLinecap="round" />
        {/* Lignes de code */}
        {lines.map((l, i) => (
          <rect
            key={i}
            x={24}
            y={52 + i * 20}
            width={l.width}
            height={6}
            rx={3}
            fill="rgba(200,240,0,.12)"
            className="origin-left"
          >
            <animate
              attributeName="width"
              from="0"
              to={l.width}
              dur="0.6s"
              begin={`${l.delay}s`}
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.3s"
              begin={`${l.delay}s`}
              fill="freeze"
            />
          </rect>
        ))}
        {/* Accent line (highlighted) */}
        <rect x={24} y={112} width={70} height={6} rx={3} fill="rgba(200,240,0,.35)">
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.45s" fill="freeze" />
        </rect>
        <rect x={24} y={152} width={50} height={6} rx={3} fill="rgba(200,240,0,.08)">
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.9s" fill="freeze" />
        </rect>
        {/* Pied / socle */}
        <rect x="100" y="218" width="120" height="4" rx="2" fill="rgba(255,255,255,.04)" />
        <rect x="130" y="230" width="60" height="4" rx="2" fill="rgba(255,255,255,.03)" />
        {/* Glow subtil */}
        <rect x="8" y="8" width="304" height="204" rx="10" stroke="rgba(200,240,0,.03)" strokeWidth="4" />
      </svg>
    </div>
  )
}
