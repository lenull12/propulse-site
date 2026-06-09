export function MiniMap() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-28">
      {/* Cercle extérieur */}
      <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,.04)" strokeWidth="1" />
      <circle cx="60" cy="60" r="40" stroke="rgba(255,255,255,.03)" strokeWidth=".5" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="28" stroke="rgba(255,255,255,.03)" strokeWidth=".5" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="16" stroke="rgba(255,255,255,.03)" strokeWidth=".5" strokeDasharray="4 4" />
      {/* Point central (cible) */}
      <circle cx="60" cy="60" r="4" fill="#c8f000" fillOpacity=".3" />
      <circle cx="60" cy="60" r="2" fill="#c8f000" />
      {/* Points satellites */}
      <circle cx="60" cy="20" r="2.5" fill="rgba(200,240,0,.5)" />
      <circle cx="95" cy="40" r="2.5" fill="rgba(200,240,0,.5)" />
      <circle cx="90" cy="80" r="2.5" fill="rgba(200,240,0,.5)" />
      <circle cx="30" cy="75" r="2.5" fill="rgba(200,240,0,.5)" />
      <circle cx="35" cy="35" r="2" fill="rgba(200,240,0,.3)" />
      <circle cx="75" cy="95" r="2" fill="rgba(200,240,0,.3)" />
      <circle cx="25" cy="55" r="1.5" fill="rgba(200,240,0,.2)" />
      <circle cx="70" cy="15" r="1.5" fill="rgba(200,240,0,.2)" />
      {/* Animations points */}
      <circle cx="60" cy="60" r="8" fill="none" stroke="rgba(200,240,0,.1)" strokeWidth="1">
        <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from=".6" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="8" fill="none" stroke="rgba(200,240,0,.1)" strokeWidth="1">
        <animate attributeName="r" from="8" to="20" dur="2s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" from=".6" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
