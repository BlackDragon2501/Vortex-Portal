'use client'

// Simbolos nicaraguenses del portal HUD, dibujados en SVG propio por
// Vortex Company (sin marcas ni activos de terceros):
//  - NicaraguaFlag: bandera ondeando (filtro feTurbulence animado)
//  - Guardabarranco: ave nacional posada sobre el anillo del portal
//  - Crow: cuervo negro (totem del fundador) con ojo teal holografico

export function WaveFilterDef() {
  // Definicion unica del filtro de ondulacion (se renderiza una vez)
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      <defs>
        <filter id="hudWave">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="2" result="noise" seed="7">
            <animate
              attributeName="baseFrequency"
              values="0.02 0.09; 0.028 0.11; 0.02 0.09"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

/* ---------- Bandera de Nicaragua (3 franjas + escudo simplificado) ---------- */
export function NicaraguaFlag({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 180 110" className={className} style={style} role="img" aria-label="Bandera de Nicaragua">
      <defs>
        <linearGradient id="flagSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#2df2d0" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <g filter="url(#hudWave)">
        {/* franjas */}
        <rect x="0" y="0" width="180" height="36.7" fill="#1273C4" />
        <rect x="0" y="36.7" width="180" height="36.6" fill="#f4f8f7" />
        <rect x="0" y="73.3" width="180" height="36.7" fill="#1273C4" />

        {/* escudo simplificado: triangulo, volcanes, arcoiris y gorro */}
        <g>
          {/* arcoiris sobre el triangulo */}
          <path d="M76 47 A14 14 0 0 1 104 47" fill="none" stroke="#D65454" strokeWidth="1.6" />
          <path d="M78.5 47 A11.5 11.5 0 0 1 101.5 47" fill="none" stroke="#F0C93D" strokeWidth="1.6" />
          <path d="M81 47 A9 9 0 0 1 99 47" fill="none" stroke="#4CAF7D" strokeWidth="1.6" />
          {/* triangulo */}
          <path d="M90 44 L73 70 L107 70 Z" fill="none" stroke="#E8A33D" strokeWidth="1.8" strokeLinejoin="round" />
          {/* gorro frijio */}
          <path d="M86.5 53 A3.5 3.5 0 0 1 93.5 53 L92.5 56 L87.5 56 Z" fill="#C64848" />
          {/* cinco volcanes */}
          <path d="M78 70 L81.5 62 L85 70 Z" fill="#3E7BD6" />
          <path d="M83.5 70 L87 60.5 L90.5 70 Z" fill="#3E7BD6" />
          <path d="M89 70 L92.5 62 L96 70 Z" fill="#3E7BD6" />
          <path d="M94.5 70 L97.5 63.5 L100.5 70 Z" fill="#3E7BD6" />
          <path d="M73.5 70 L75.5 65 L77.5 70 Z" fill="#3E7BD6" />
          {/* mar */}
          <path d="M76 71.5 Q83 69.5 90 71.5 T104 71.5" fill="none" stroke="#3E7BD6" strokeWidth="1.4" />
        </g>
      </g>
      {/* brillo holografico + borde */}
      <rect x="0" y="0" width="180" height="110" fill="url(#flagSheen)" />
      <rect x="1" y="1" width="178" height="108" fill="none" stroke="rgba(45,242,208,0.35)" strokeWidth="1.5" />
    </svg>
  )
}

/* ---------- Guardabarranco (turquoise-browed motmot), posado ---------- */
export function Guardabarranco({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 112" className={className} style={style} role="img" aria-label="Guardabarranco, ave nacional de Nicaragua">
      <g className="hud-bird-swing">
        {/* sombra HUD */}
        <ellipse cx="50" cy="98" rx="24" ry="3" fill="rgba(45,242,208,0.12)" />
        {/* rama / percha */}
        <line x1="2" y1="95" x2="118" y2="95" stroke="rgba(45,242,208,0.4)" strokeWidth="2" strokeLinecap="round" />
        {/* cola de raqueta: dos plumas largas con puntas de palita */}
        <path d="M30 58 Q16 72 9 90" fill="none" stroke="#1e8f74" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="8.6" cy="92" rx="5" ry="3" fill="#37d5b4" transform="rotate(-40 8.6 92)" />
        <path d="M35 60 Q25 78 22 90" fill="none" stroke="#2fbf8f" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="21.6" cy="92" rx="5" ry="3" fill="#37d5b4" transform="rotate(-24 21.6 92)" />
        {/* patas */}
        <line x1="45" y1="72" x2="43" y2="93" stroke="#c99439" strokeWidth="2.4" />
        <line x1="55" y1="72" x2="55" y2="93" stroke="#c99439" strokeWidth="2.4" />
        {/* cuerpo esmeralda */}
        <path d="M28 58 Q32 44 50 40 Q70 36 82 46 Q88 52 86 60 Q84 70 70 74 Q52 78 38 72 Q28 66 28 58 Z" fill="#2fbf8f" />
        {/* ala plegada */}
        <path d="M34 54 Q44 46 62 48 Q76 50 80 58 Q76 66 58 68 Q44 66 34 54 Z" fill="#1e8f74" />
        {/* pecho naranja con punto negro */}
        <path d="M60 52 Q72 50 80 56 Q86 62 82 68 Q74 74 64 70 Q58 62 60 52 Z" fill="#e8924a" />
        <circle cx="72" cy="60" r="2.4" fill="#0d1a17" />
        {/* cabeza grande */}
        <circle cx="70" cy="34" r="14" fill="#2fbf8f" />
        {/* corona negra */}
        <path d="M58 28 Q62 18 72 20 Q82 20 84 30 Q76 24 66 27 Q60 29 58 28 Z" fill="#0d1a17" />
        {/* ceja turquesa (la firma del guardabarranco) */}
        <path d="M60 31 Q70 25 81 30" fill="none" stroke="#3ee0f0" strokeWidth="4" strokeLinecap="round" />
        {/* mascara negra + ojo */}
        <path d="M62 37 Q69 34 77 39" fill="none" stroke="#0d1a17" strokeWidth="5" strokeLinecap="round" />
        <circle cx="71" cy="38" r="2.8" fill="#0d1a17" />
        <circle cx="72" cy="37" r="1" fill="#eafff9" />
        {/* pico */}
        <path d="M83 40 Q91 43 96 49 Q89 50 83 47 Z" fill="#0d1a17" />
      </g>
    </svg>
  )
}

/* ---------- Cuervo negro (totem del fundador), posado ---------- */
export function Crow({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 130 104" className={className} style={style} role="img" aria-label="Cuervo negro, totem del fundador de Vortex Company">
      <defs>
        <filter id="crowGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#2df2d0" floodOpacity="0.45" />
        </filter>
      </defs>
      {/* sombra HUD */}
      <ellipse cx="62" cy="93" rx="30" ry="3" fill="rgba(45,242,208,0.10)" />
      {/* percha */}
      <line x1="6" y1="90" x2="124" y2="90" stroke="rgba(45,242,208,0.4)" strokeWidth="2" strokeLinecap="round" />
      <line x1="98" y1="90" x2="106" y2="84" stroke="rgba(45,242,208,0.25)" strokeWidth="1.4" />
      {/* cuerpo negro con filo teal */}
      <g filter="url(#crowGlow)">
        <path
          d="M112 30 Q120 36 116 44 Q124 50 122 58 Q118 70 104 74 Q86 80 66 80 Q46 80 34 72 Q24 64 26 52 Q28 42 40 38 Q52 32 66 34 Q84 30 98 28 Q106 26 112 30 Z"
          fill="#0a0e0d"
          stroke="rgba(45,242,208,0.4)"
          strokeWidth="1.6"
        />
        {/* cola en cuña hacia arriba-derecha */}
        <path d="M108 62 Q124 66 128 76 Q118 78 104 74 Z" fill="#0a0e0d" stroke="rgba(45,242,208,0.35)" strokeWidth="1.4" />
        {/* cabeza */}
        <path d="M40 30 Q30 24 20 28 Q12 32 12 40 Q14 50 26 52 Q38 54 44 48 Q48 40 40 30 Z" fill="#0a0e0d" stroke="rgba(45,242,208,0.4)" strokeWidth="1.6" />
        {/* pico fuerte hacia la izquierda */}
        <path d="M14 36 Q4 38 2 42 Q10 44 18 44 Z" fill="#0a0e0d" stroke="rgba(45,242,208,0.45)" strokeWidth="1.2" />
        {/* ala marcada */}
        <path d="M56 44 Q74 40 92 46 Q104 50 104 58 Q92 68 72 68 Q56 66 50 56 Q50 48 56 44 Z" fill="#101614" stroke="rgba(45,242,208,0.18)" strokeWidth="1.2" />
        {/* ojo teal holografico */}
        <circle cx="30" cy="38" r="3.2" fill="#2df2d0" className="hud-core" />
        <circle cx="30" cy="38" r="1.2" fill="#052a22" />
      </g>
      {/* patas */}
      <line x1="58" y1="80" x2="56" y2="88" stroke="#0a0e0d" strokeWidth="2.6" />
      <line x1="72" y1="80" x2="72" y2="88" stroke="#0a0e0d" strokeWidth="2.6" />
      <line x1="58" y1="80" x2="56" y2="88" stroke="rgba(45,242,208,0.3)" strokeWidth="0.8" />
      <line x1="72" y1="80" x2="72" y2="88" stroke="rgba(45,242,208,0.3)" strokeWidth="0.8" />
    </svg>
  )
}
