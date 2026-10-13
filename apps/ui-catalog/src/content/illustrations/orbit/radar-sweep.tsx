'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// "Radar Sweep": radar com anéis, mira e um feixe cônico girando (rastro em conic-gradient). Cada alvo acende
// exatamente quando o feixe passa por ele — o atraso é derivado do ângulo — e vai se apagando até a próxima volta,
// com etiqueta de lead e distância. O azimute atual aparece no rodapé.
const SIZE = 280
const R = SIZE / 2
const PERIOD = 4

const TARGETS = [
  { angle: 38, dist: 0.72, label: 'Ana Ribeiro', meta: '1,2 km', hot: true },
  { angle: 112, dist: 0.45, label: 'Café Aurora', meta: '650 m', hot: false },
  { angle: 205, dist: 0.82, label: 'Pedro Alves', meta: '2,8 km', hot: true },
  { angle: 286, dist: 0.55, label: 'Loja Bento', meta: '1,9 km', hot: false },
  { angle: 330, dist: 0.3, label: 'Clínica Sol', meta: '400 m', hot: false },
] as const

export default function RadarSweep() {
  const [az, setAz] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => setAz(Math.floor((((performance.now() - start) / 1000) % PERIOD) * (360 / PERIOD))), 80)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex h-[340px] w-[360px] flex-col items-center justify-center gap-3 text-foreground">
      <div className="relative overflow-hidden rounded-full border bg-card shadow-inner" style={{ width: SIZE, height: SIZE }}>
        {/* anéis e mira */}
        {[0.25, 0.5, 0.75].map((f) => (
          <div key={f} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/20" style={{ width: SIZE * f, height: SIZE * f }} />
        ))}
        <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/20" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/20" />

        {/* feixe */}
        <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: PERIOD, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,color-mix(in_oklab,var(--color-emerald-500)_45%,transparent)_360deg)]" />
          <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-t from-emerald-500/20 to-emerald-400" />
        </motion.div>

        {/* alvos */}
        {TARGETS.map((t) => {
          const a = ((t.angle - 90) * Math.PI) / 180
          const x = R + Math.cos(a) * R * t.dist
          const y = R + Math.sin(a) * R * t.dist
          const delay = (t.angle / 360) * PERIOD
          const labelLeft = x < R
          return (
            <motion.div
              key={t.label}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 1, 0.08] }}
              transition={{ duration: PERIOD, times: [0, 0.1, 0.95], delay, repeat: Infinity, ease: 'easeOut' }}
            >
              <motion.span
                className={`absolute -left-3 -top-3 size-6 rounded-full border ${t.hot ? 'border-rose-400' : 'border-emerald-400'}`}
                animate={{ scale: [0.3, 1.6], opacity: [1, 0] }}
                transition={{ duration: 0.9, delay, repeat: Infinity, repeatDelay: PERIOD - 0.9, ease: 'easeOut' }}
              />
              <span className={`absolute -left-1 -top-1 size-2 rounded-full ${t.hot ? 'bg-rose-500 ring-4 ring-rose-500/25' : 'bg-emerald-400 ring-4 ring-emerald-400/25'}`} />
              <span className={`absolute top-1.5 whitespace-nowrap rounded border bg-background/90 px-1 py-px text-[9px] leading-tight shadow-sm ${labelLeft ? 'right-2' : 'left-2'}`}>
                <span className="font-medium">{t.label}</span> <span className="text-muted-foreground">· {t.meta}</span>
              </span>
            </motion.div>
          )
        })}

        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" />
      </div>

      <div className="flex w-[280px] items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-rose-500" /> 2 leads quentes
        </span>
        <span className="tabular-nums">AZ {String(az).padStart(3, '0')}° · raio 3 km</span>
      </div>
    </div>
  )
}
