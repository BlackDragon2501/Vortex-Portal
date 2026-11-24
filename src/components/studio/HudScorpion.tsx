'use client'

// Enjambre de escorpiones holográficos de Vortex Company: la mascota-tótem
// de Vórtex Studio. SVG puro estilo HUD teal (pinzas que palpan, 8 patas
// articuladas, cola en S con aguijón brillante) que pasea por TODA la
// pantalla siguiendo trayectorias de Lissajous animadas por fotogramas
// (requestAnimationFrame): movimiento continuo a 60 fps, gira hacia la
// dirección de la marcha y frena suavemente en las curvas.
//
// Ahora patrulla todo el enjambre: la madre (grande, al frente) y diez
// fieras EXACTAMENTE del mismo tamaño con ruta, velocidad y profundidad
// propias, para que la familia Vortex recorra el portal entero.

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

function ScorpionSvg() {
  return (
    <svg viewBox="0 0 130 76" className="block w-full h-auto">
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
  )
}

/* ---------- un escorpión: ruta de Lissajous parametrizada ---------- */
interface ScorpionConfig {
  /** tamaño CSS (clamp) */
  size: string
  /** avance del tiempo por milisegundo (velocidad de la marcha) */
  speed: number
  /** frecuencias y fases del lazo de Lissajous */
  fx: number
  fy: number
  phaseX: number
  phaseY: number
  /** amplitudes (0-0.5) en fracción de pantalla */
  ax: number
  ay: number
  /** punto inicial dentro del ciclo */
  start: number
  /** transparencia (las fieras, un poco más holo) */
  opacity: number
  /** clase de profundidad z */
  z: string
  /** pose fija si el usuario prefiere movimiento reducido */
  pose: string
  /** visibilidad responsive (p. ej. las fieras extra solo en desktop) */
  className?: string
}

function Scorpion({ cfg }: { cfg: ScorpionConfig }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // con preferencia de movimiento reducido, cada quien queda posado quieto
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = cfg.pose
      return
    }
    let raf = 0
    let t = cfg.start
    let last = performance.now()
    // tamaño cacheado (se recalcula solo al redimensionar) para que el bucle
    // no lea el DOM cada fotograma: con 11 escorpiones, cero layout thrashing
    let w = el.offsetWidth
    let h = el.offsetHeight
    const onResize = () => {
      w = el.offsetWidth
      h = el.offsetHeight
    }
    window.addEventListener('resize', onResize)
    const step = (now: number) => {
      const dt = Math.min(50, now - last)
      last = now
      t += dt * cfg.speed
      const W = window.innerWidth
      const H = window.innerHeight
      // lazo de Lissajous que recorre toda la pantalla
      const x = W * (0.5 + cfg.ax * Math.sin(cfg.fx * t + cfg.phaseX))
      const y = H * (0.5 + cfg.ay * Math.sin(cfg.fy * t + cfg.phaseY))
      // dirección de la marcha -> el escorpión mira hacia donde va
      const dx = cfg.ax * W * cfg.fx * Math.cos(cfg.fx * t + cfg.phaseX)
      const dy = cfg.ay * H * cfg.fy * Math.cos(cfg.fy * t + cfg.phaseY)
      const ang = Math.atan2(dy, dx) * (180 / Math.PI)
      el.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - h / 2).toFixed(1)}px) rotate(${ang.toFixed(1)}deg)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [cfg])

  return (
    <div
      ref={ref}
      className={'hud-scorpion fixed left-0 top-0 pointer-events-none ' + cfg.z + (cfg.className ? ' ' + cfg.className : '')}
      style={{ opacity: cfg.opacity, willChange: 'transform' }}
      aria-hidden
    >
      <div style={{ width: cfg.size }}>
        <ScorpionSvg />
      </div>
    </div>
  )
}

/* ---------- el enjambre Vortex: la madre al frente + su camada de fieras ---------- */
// Todas las fieras nacen EXACTAMENTE del mismo tamaño; lo que las distingue
// es su ruta de Lissajous, su velocidad y su transparencia (profundidad).
const FIERA_SIZE = 'clamp(42px, 4.2vw, 64px)'

const FLEET: ScorpionConfig[] = [
  // LA MADRE: la única grande, camina al frente (z-20)
  {
    size: 'clamp(64px, 7vw, 108px)',
    speed: 0.00024,
    fx: 1,
    fy: 2,
    phaseX: 0,
    phaseY: 1.3,
    ax: 0.44,
    ay: 0.42,
    start: 0.8,
    opacity: 1,
    z: 'z-20',
    pose: 'translate(70vw, 18vh) rotate(-10deg)',
  },
  // LAS 10 FIERAS: mismo tamaño para todas, cada una con su ruta, su paso y
  // su capa de profundidad; en móvil solo acompañan las 4 primeras
  ...Array.from({ length: 10 }, (_, i) => ({
    size: FIERA_SIZE,
    speed: 0.00017 + (i % 5) * 0.000037,
    fx: 0.9 + (i % 4) * 0.13,
    fy: 1.28 + (i % 3) * 0.24,
    phaseX: i * 0.63,
    phaseY: i * 1.07 + 0.5,
    ax: 0.4 + (i % 2) * 0.04,
    ay: 0.38 + (i % 3) * 0.03,
    start: i * 2.17 + 1.4,
    opacity: 0.5 + (i % 5) * 0.1,
    z: i % 2 === 0 ? 'z-10' : 'z-0',
    pose: `translate(${(6 + i * 8.7).toFixed(1)}vw, ${(i % 2 === 0 ? 10 : 66) + (i % 3) * 7}vh) rotate(${(i % 2 === 0 ? -1 : 1) * (8 + i * 1.3)}deg)`,
    className: i < 4 ? undefined : 'hidden md:block',
  })),
]

export function HudScorpions() {
  return (
    <>
      {FLEET.map((cfg, i) => (
        <Scorpion key={i} cfg={cfg} />
      ))}
    </>
  )
}
