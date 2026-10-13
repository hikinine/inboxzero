'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'

// "Timezone Globe Orbit": um globo em SVG que gira (continentes pontilhados correndo dentro do recorte circular, com
// terminador dia/noite) e, em volta, relógios de cidades num anel giratório. O relógio avança rápido — um minuto por
// tique — e cada chip mostra hora local com sol ou lua conforme o horário; os chips contra-giram para ficarem em pé.
const SIZE = 380
const C = SIZE / 2
const GR = 78
const RING = 150
const DURATION = 50
const CITIES = [
  { city: 'São Paulo', off: 0 },
  { city: 'Lisboa', off: 4 },
  { city: 'Nova York', off: -1 },
  { city: 'Tóquio', off: 12 },
  { city: 'Sydney', off: 14 },
  { city: 'Dubai', off: 7 },
] as const

// "continentes" pontilhados: blocos de pontos com semente fixa, desenhados duas vezes para o loop horizontal
const LAND_W = 320
const DOTS = (() => {
  const blobs = [
    { x: 30, y: -30, w: 46, h: 40 },
    { x: 60, y: 20, w: 30, h: 56 },
    { x: 140, y: -44, w: 70, h: 34 },
    { x: 160, y: -6, w: 36, h: 50 },
    { x: 240, y: -36, w: 60, h: 44 },
    { x: 262, y: 26, w: 34, h: 24 },
  ]
  const out: { x: number; y: number }[] = []
  for (const b of blobs) {
    for (let x = 0; x < b.w; x += 7) {
      for (let y = 0; y < b.h; y += 7) {
        const nx = x / b.w - 0.5
        const ny = y / b.h - 0.5
        if (nx * nx + ny * ny < 0.24) out.push({ x: b.x + x, y: b.y + y })
      }
    }
  }
  return out
})()

const fmt = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440
  return { h: Math.floor(m / 60), text: `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}` }
}

export default function TimezoneGlobeOrbit() {
  const [mins, setMins] = useState(14 * 60 + 32)

  useEffect(() => {
    const id = setInterval(() => setMins((m) => m + 1), 120)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative text-foreground" style={{ width: SIZE, height: SIZE }}>
      <div className="absolute rounded-full border border-dashed border-border" style={{ inset: C - RING }} />

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" role="img" aria-label="Globo girando com relógios de fusos horários em órbita">
        <defs>
          <clipPath id="tzg-clip">
            <circle cx={C} cy={C} r={GR} />
          </clipPath>
          <radialGradient id="tzg-shade" cx="0.35" cy="0.35" r="0.75">
            <stop offset="0" stopColor="var(--card)" />
            <stop offset="1" stopColor="var(--muted)" />
          </radialGradient>
          <linearGradient id="tzg-night" x1="0" x2="1">
            <stop offset="0.45" stopColor="var(--foreground)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        <circle cx={C} cy={C} r={GR + 10} fill="var(--primary)" opacity="0.06" />
        <circle cx={C} cy={C} r={GR} fill="url(#tzg-shade)" stroke="var(--border)" />
        <g clipPath="url(#tzg-clip)">
          {[-0.6, -0.3, 0, 0.3, 0.6].map((k) => (
            <ellipse key={k} cx={C} cy={C + k * GR} rx={GR * Math.sqrt(1 - k * k)} ry={GR * 0.08 * Math.sqrt(1 - k * k)} fill="none" stroke="var(--border)" strokeWidth="0.8" />
          ))}
          <motion.g animate={{ x: [0, -LAND_W] }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
            {[0, LAND_W].map((dx) =>
              DOTS.map((d, i) => <circle key={`${dx}-${i}`} cx={C - GR + d.x + dx} cy={C + d.y} r="1.9" fill="var(--primary)" opacity="0.7" />),
            )}
          </motion.g>
          <rect x={C - GR} y={C - GR} width={GR * 2} height={GR * 2} fill="url(#tzg-night)" />
        </g>
        <circle cx={C} cy={C} r={GR} fill="none" stroke="var(--foreground)" strokeOpacity="0.15" />
      </svg>

      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}>
        {CITIES.map((c, i) => {
          const a = (i / CITIES.length) * Math.PI * 2 - Math.PI / 2
          const x = C + Math.cos(a) * RING
          const y = C + Math.sin(a) * RING
          const t = fmt(mins + c.off * 60)
          const day = t.h >= 6 && t.h < 18
          return (
            <motion.div
              key={c.city}
              className="absolute"
              style={{ left: x, top: y }}
              animate={{ rotate: -360 }}
              transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
            >
              <div className={`-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border px-2 py-1 shadow-sm ${i === 0 ? 'border-primary bg-card' : 'bg-card'}`}>
                <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  {day ? <Sun className="size-2.5 text-amber-500" /> : <Moon className="size-2.5 text-indigo-400" />}
                  {c.city}
                </div>
                <div className="font-mono text-sm font-semibold tabular-nums leading-tight">{t.text}</div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
