'use client'

// Escorpión holográfico de Vortex Company: la mascota-tótem de Vórtex Studio.
// SVG puro estilo HUD teal (pinzas que palpan, 8 patas articuladas, cola en S
// con aguijón brillante) que pasea por TODA la pantalla siguiendo una
// trayectoria de Lissajous animada por fotogramas (requestAnimationFrame):
// movimiento continuo a 60 fps, gira hacia la dirección de la marcha y frena
// suavemente en las curvas. Mismo tamaño que la antigua web-crawler.

import { useEffect, useRef } from 'react'

/* ---------- anatomía SVG (mirando a la derecha) ---------- */
// Cada pata rota alrededor de su anclaje exacto (transform-box: view-box).
const LEGS: Array<{ d: string; x: number; y: number; delay: number }> = [
  // lado superior
  { d: 'M60 33 L46 24 L34 21', x: 60, y: 33, delay: 0 },
  { d: 'M66 31 L58 16 L48 11', x: 66, y: 31, delay: 0.14 },
  { d: 'M73 31 L71 15 L63 9', x: 73, y: 31, delay: 0.28 },
  { d: 'M80 34 L84 20 L79 13', x: 80, y: 34, delay: 0.42 },
  // lado inferior (fase cruzada = trote diagonal)
  { d: 'M60 47 L46 56 L36 58', x: 60, y: 47, delay: 0.14 },
  { d: 'M66 49 L58 62 L50 65', x: 66, y: 49, delay: 0.28 },
  { d: 'M73 49 L71 63 L64 68', x: 73, y: 49, delay: 0.42 },
  { d: 'M80 46 L84 58 L79 64', x: 80, y: 46, delay: 0 },
]

const JOINTS: Array<[number, number]> = [
  [46, 24],
  [58, 16],
  [71, 15],
  [84, 20],
  [46, 56],
  [58, 62],
  [71, 63],
  [84, 58],
]

const TAIL_JOINTS: Array<[number, number]> = [
  [24, 20],
  [15, 21],
  [11, 29],
  [13, 38],
  [19, 45],
]

export function HudScorpion() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // con preferencia de movimiento reducido, queda posado en una esquina
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = 'translate(70vw, 18vh) rotate(-10deg)'
      return
    }
    let raf = 0
    let t = 0.8 // punto de partida fijo dentro del paseo
    let last = performance.now()
    const step = (now: number) => {
      const dt = Math.min(50, now - last)
      last = now
      t += dt * 0.00024 // ciclo completo ≈ 26 s
      const W = window.innerWidth
      const H = window.innerHeight
      // lazo de Lissajous 1:2 que recorre toda la pantalla (6%-94% x 8%-92%)
      const x = W * (0.5 + 0.44 * Math.sin(t))
      const y = H * (0.5 + 0.42 * Math.sin(2 * t + 1.3))
      // dirección de la marcha -> el escorpión mira hacia donde va
      const dx = 0.44 * W * Math.cos(t)
      const dy = 0.84 * H * Math.cos(2 * t + 1.3)
      const ang = Math.atan2(dy, dx) * (180 / Math.PI)
      const w = el.offsetWidth
      const h = el.offsetHeight
      el.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - h / 2).toFixed(1)}px) rotate(${ang.toFixed(1)}deg)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className="hud-scorpion fixed left-0 top-0 z-20 pointer-events-none"
      aria-hidden
    >
      <svg
        viewBox="0 0 130 76"
        style={{ width: 'clamp(52px, 5.5vw, 84px)' }}
        className="block"
      >
        {/* 8 patas articuladas (trote diagonal) */}
        {LEGS.map((l, i) => (
          <path
            key={i}
            d={l.d}
            fill="none"
            stroke="rgba(45,242,208,0.78)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hud-leg"
            style={{ transformOrigin: `${l.x}px ${l.y}px`, animationDelay: `${l.delay}s` }}
          />
        ))}
        {/* juntas cian de las patas */}
        {JOINTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill="#22e6ff" opacity="0.85" />
        ))}

        {/* cola en S con aguijón holográfico (ondeo lento) */}
        <g className="hud-tail-wave">
          <circle cx="34" cy="28" r="4.5" fill="#07231c" stroke="rgba(45,242,208,0.8)" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="4.1" fill="#07231c" stroke="rgba(45,242,208,0.8)" strokeWidth="1.5" />
          <circle cx="15" cy="21" r="3.7" fill="#07231c" stroke="rgba(45,242,208,0.8)" strokeWidth="1.4" />
          <circle cx="11" cy="29" r="3.4" fill="#07231c" stroke="rgba(45,242,208,0.8)" strokeWidth="1.4" />
          <circle cx="13" cy="38" r="3.1" fill="#07231c" stroke="rgba(45,242,208,0.8)" strokeWidth="1.4" />
          <circle cx="19" cy="45" r="2.8" fill="#07231c" stroke="rgba(45,242,208,0.85)" strokeWidth="1.4" />
          {TAIL_JOINTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.2" fill="#22e6ff" opacity="0.8" />
          ))}
          {/* aguijón */}
          <path d="M19 45 Q26 50 34 48" fill="none" stroke="rgba(45,242,208,0.85)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="34" cy="48" r="1.9" fill="#8effe4" className="hud-core" />
        </g>

        <g className="hud-scorpion-body">
          {/* pinzas en garra que palpan */}
          <g className="hud-claw-a">
            <path d="M64 35 Q80 28 92 26" fill="none" stroke="rgba(45,242,208,0.8)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M92 26 Q102 19 105 27 M92 26 Q103 29 104 35" fill="none" stroke="rgba(45,242,208,0.9)" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="92" cy="26" r="1.7" fill="#22e6ff" />
          </g>
          <g className="hud-claw-b">
            <path d="M64 45 Q80 52 92 54" fill="none" stroke="rgba(45,242,208,0.8)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M92 54 Q102 61 105 53 M92 54 Q103 51 104 45" fill="none" stroke="rgba(45,242,208,0.9)" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="92" cy="54" r="1.7" fill="#22e6ff" />
          </g>

          {/* abdomen segmentado con circuito */}
          <ellipse cx="52" cy="40" rx="13" ry="10" fill="#07231c" stroke="rgba(45,242,208,0.85)" strokeWidth="1.6" />
          <path d="M46 31.5 V48.5 M52 30.5 V49.5 M58 31.5 V48.5" stroke="rgba(45,242,208,0.4)" strokeWidth="1" fill="none" />
          <path d="M52 35.5 l3.8 2.2 v4.6 l-3.8 2.2 l-3.8 -2.2 v-4.6 Z" fill="none" stroke="rgba(45,242,208,0.55)" strokeWidth="1" />

          {/* cefalotórax + ojos holográficos */}
          <ellipse cx="72" cy="40" rx="10" ry="8.5" fill="#07231c" stroke="rgba(45,242,208,0.9)" strokeWidth="1.6" />
          <circle cx="78" cy="36.5" r="1.7" fill="#8effe4" className="hud-core" />
          <circle cx="78" cy="43.5" r="1.7" fill="#8effe4" className="hud-core" style={{ animationDelay: '0.8s' }} />
        </g>
      </svg>
    </div>
  )
}
