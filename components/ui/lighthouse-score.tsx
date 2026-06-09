export function LighthouseScore() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-28">
      {/* Cercle de fond */}
      <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,.05)" strokeWidth="6" />
      {/* Cercle de progression */}
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="#c8f000"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="314"
        strokeDashoffset="0"
        transform="rotate(-90 60 60)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="314"
          to="0"
          dur="1.2s"
          begin="0.3s"
          fill="freeze"
        />
      </circle>
      {/* Score */}
      <text
        x="60"
        y="52"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#c8f000"
        fontSize="32"
        fontWeight="800"
        fontFamily="JetBrains Mono, monospace"
      >
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1s" fill="freeze" />
        100
      </text>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(255,255,255,.3)"
        fontSize="8"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
      >
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1.2s" fill="freeze" />
        SCORE
      </text>
    </svg>
  )
}
