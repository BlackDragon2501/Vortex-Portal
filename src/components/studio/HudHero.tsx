'use client'

// Decorados del hero de Vórtex Studio: terminal de arranque con contador
// 0-100% en bucle infinito y panel de telemetría con barras verde neón/cian
// animadas. (El escorpión holo vive en HudScorpion.tsx.) Todo SVG/CSS puro
// (cero assets externos), coherente con el estilo HUD teal.

import { useEffect, useState } from 'react'

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
