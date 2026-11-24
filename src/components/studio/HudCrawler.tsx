'use client'

// Decorados del hero de Vórtex Studio: araña web-crawler cyberpunk que recorre
// las líneas del túnel holográfico, terminal de arranque con contador 0-100%
// en bucle infinito y panel de telemetría con barras verde neón/cian animadas.
// Todo SVG/CSS puro (cero assets externos), coherente con el estilo HUD teal.

import { useEffect, useState } from 'react'

/* ---------- araña web-crawler (caminata infinita sobre el anillo) ---------- */
// Cada pierna se anima rotando alrededor de su punto de anclaje exacto
// (transform-box: view-box + transform-origin en px del viewBox).
const LEGS: Array<{ d: string; x: number; y: number; delay: number }> = [
  { d: 'M52 46 L34 30 L19 34', x: 52, y: 46, delay: 0 },
  { d: 'M50 52 L27 47 L12 56', x: 50, y: 52, delay: 0.18 },
  { d: 'M50 59 L27 66 L13 77', x: 50, y: 59, delay: 0.36 },
  { d: 'M53 66 L36 81 L25 89', x: 53, y: 66, delay: 0.54 },
  { d: 'M68 46 L86 30 L101 34', x: 68, y: 46, delay: 0.18 },
  { d: 'M70 52 L93 47 L108 56', x: 70, y: 52, delay: 0.36 },
  { d: 'M70 59 L93 66 L107 77', x: 70, y: 59, delay: 0.54 },
  { d: 'M67 66 L84 81 L95 89', x: 67, y: 66, delay: 0 },
]

const JOINTS: Array<[number, number]> = [
  [34, 30],
  [27, 47],
  [27, 66],
  [36, 81],
  [86, 30],
  [93, 47],
  [93, 66],
  [84, 81],
]

export function HudSpider() {
  return (
    <div className="hud-spider-crawl absolute z-0 w-[11%]" aria-hidden>
      <svg
        viewBox="0 0 120 92"
        className="w-full"
        style={{ filter: 'drop-shadow(0 0 7px rgba(45,242,208,0.3))' }}
      >
        {/* 8 piernas articuladas (ciclo de caminata cruzado) */}
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
        {/* juntas cian */}
        {JOINTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="#22e6ff" opacity="0.85" />
        ))}
        <g className="hud-spider-body">
          {/* sensores cian */}
          <path
            d="M56 22 L54 17 M64 22 L66 17"
            stroke="rgba(34,230,255,0.8)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="54" cy="16" r="1.3" fill="#22e6ff" />
          <circle cx="66" cy="16" r="1.3" fill="#22e6ff" />
          {/* abdomen con circuito */}
          <ellipse cx="60" cy="36" rx="13.5" ry="15.5" fill="#07231c" stroke="rgba(45,242,208,0.8)" strokeWidth="1.6" />
          <path d="M60 26 V33 M54 38 H66" stroke="rgba(45,242,208,0.45)" strokeWidth="1" fill="none" />
          <path d="M60 41 l4 2.5 v5 l-4 2.5 l-4 -2.5 v-5 Z" fill="none" stroke="rgba(45,242,208,0.55)" strokeWidth="1" />
          {/* cefalotórax + visor holográfico */}
          <ellipse cx="60" cy="57" rx="8.5" ry="7.5" fill="#07231c" stroke="rgba(45,242,208,0.9)" strokeWidth="1.6" />
          <circle cx="60" cy="57" r="4" fill="#8effe4" className="hud-core" />
          {/* quelíceros */}
          <path d="M57 64 V69 M63 64 V69" stroke="rgba(45,242,208,0.7)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  )
}

/* ---------- terminal de arranque: "Iniciando..." 0% -> 100% en bucle ---------- */
const BOOT_TICKS = 112 // tick 0..112 => 0..100% (~4 s), luego pausa "listo" y reinicia

export function HudBootTerminal() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    // con preferencia de movimiento reducido, el contador queda en 100%
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTick(BOOT_TICKS)
      return
    }
    const id = window.setInterval(() => setTick((t) => (t >= 134 ? 0 : t + 1)), 36)
    return () => window.clearInterval(id)
  }, [])
  const pct = Math.min(100, Math.round((tick / BOOT_TICKS) * 100))
  const ready = tick >= BOOT_TICKS + 1
  return (
    <div
      className="hud-panel absolute bottom-[21%] left-[1%] z-0 hidden w-[27%] rounded-md px-3 py-2 md:block"
      aria-hidden
    >
      <span className="hud-corner hud-corner-tl" />
      <span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" />
      <span className="hud-corner hud-corner-br" />
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.16em] text-teal-300/90">
        <span className="flex items-center gap-1.5">
          <span className="hud-live-dot inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
          VORTEX://BOOT
        </span>
        <span
          className="font-bold tabular-nums text-teal-100"
          style={{ textShadow: '0 0 8px rgba(45,242,208,0.5)' }}
        >
          {pct}%
        </span>
      </div>
      <p className="mt-1 truncate font-mono text-[10px] text-teal-200/85">
        <span className="text-teal-400">&gt;</span>{' '}
        {ready ? 'inicio completo · grid 100% local' : 'Iniciando...'}
        <span className="hud-caret" />
      </p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-teal-400/10">
        <div className="hud-boot-bar h-full rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

/* ---------- telemetría: barras HUD verde neón + cian ---------- */
const BARS: Array<{ h: number; c: string; d: string; dur: string }> = [
  { h: 42, c: '#2df2d0', d: '0s', dur: '2.8s' },
  { h: 66, c: '#22e6ff', d: '0.5s', dur: '3.4s' },
  { h: 30, c: '#2df2d0', d: '1.05s', dur: '2.5s' },
  { h: 58, c: '#22e6ff', d: '0.2s', dur: '3.8s' },
  { h: 48, c: '#2df2d0', d: '0.85s', dur: '2.9s' },
  { h: 70, c: '#22e6ff', d: '1.35s', dur: '3.2s' },
  { h: 36, c: '#2df2d0', d: '0.3s', dur: '2.6s' },
  { h: 62, c: '#22e6ff', d: '1.6s', dur: '3.6s' },
]

export function HudChartBars() {
  return (
    <div
      className="hud-panel absolute bottom-[21%] right-[1%] z-0 hidden w-[24%] rounded-md px-3 py-2 md:block"
      aria-hidden
    >
      <span className="hud-corner hud-corner-tl" />
      <span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" />
      <span className="hud-corner hud-corner-br" />
      <div className="flex items-center justify-between text-[8px] tracking-[0.22em] text-teal-300/80">
        <span>TELEMETRÍA</span>
        <span className="flex items-center gap-1 text-teal-200/90">
          <span className="hud-live-dot inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
          EN VIVO
        </span>
      </div>
      <svg viewBox="0 0 150 74" className="mt-1 w-full">
        {BARS.map((b, i) => (
          <rect
            key={i}
            x={9 + i * 17}
            y={68 - b.h}
            width="9"
            height={b.h}
            rx="2"
            fill={b.c}
            opacity="0.82"
            className="hud-chart-bar"
            style={{ animationDelay: b.d, animationDuration: b.dur, filter: `drop-shadow(0 0 4px ${b.c})` }}
          />
        ))}
        <line x1="4" y1="69.5" x2="146" y2="69.5" stroke="rgba(45,242,208,0.4)" strokeWidth="1" />
      </svg>
    </div>
  )
}
