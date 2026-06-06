export function CyberGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25" aria-hidden="true">
      {/* Grille fine répétitive */}
      <div className="absolute inset-0 bg-grid-cyber" />

      {/* Lignes structurelles horizontales */}
      <div className="absolute h-px bg-white/5 top-0 left-0 right-0" />
      <div className="absolute h-px bg-white/5 top-[25%] left-0 right-0" />
      <div className="absolute h-px bg-white/5 top-[50%] left-0 right-0" />
      <div className="absolute h-px bg-white/5 top-[75%] left-0 right-0" />
      <div className="absolute h-px bg-white/5 bottom-0 left-0 right-0" />

      {/* Lignes structurelles verticales */}
      <div className="absolute w-px bg-white/5 left-[10%] top-0 bottom-0" />
      <div className="absolute w-px bg-white/5 left-[25%] top-0 bottom-0" />
      <div className="absolute w-px bg-white/5 left-[50%] top-0 bottom-0" />
      <div className="absolute w-px bg-white/5 left-[75%] top-0 bottom-0" />
      <div className="absolute w-px bg-white/5 right-[10%] top-0 bottom-0" />
      
      {/* Effet de lueur radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0)_40%,rgba(5,5,5,0.85)_80%)]" />
    </div>
  )
}
