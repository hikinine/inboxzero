'use client'

import { Heart, Star, UserPlus, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

// "Water Drop Ripple": uma gota cai numa superfície d'água em perspectiva; no impacto saem respingos e três elipses
// concêntricas se espalham. Os selos boiando (indicações, avaliações, novos clientes) balançam exatamente quando a
// primeira onda passa por eles — metáfora do boca a boca de um cliente satisfeito. Tudo por keyframes num ciclo fixo.
const W = 420
const H = 300
const C = { x: 210, y: 196 }
const RX = 200
const RY = 56
const CYCLE = 3.4
const IMPACT = 0.18 // fração do ciclo em que a gota toca a água
const SPREAD = 0.6 // fração do ciclo que a onda leva até RX

const CHIPS: ReadonlyArray<{ x: number; y: number; label: string; Icon: LucideIcon; cls: string }> = [
  { x: 88, y: 178, label: '+18 indicações', Icon: UserPlus, cls: 'text-sky-500' },
  { x: 334, y: 186, label: '4,9 avaliações', Icon: Star, cls: 'text-amber-500' },
  { x: 214, y: 240, label: '+42 clientes', Icon: Users, cls: 'text-emerald-500' },
]

const SPLASH = [-34, -16, 0, 16, 34] as const

export default function WaterDropRipple() {
  return (
    <div className="relative overflow-hidden text-foreground" style={{ width: W, height: H }}>
      <p className="absolute inset-x-0 top-3 text-center text-sm font-semibold tracking-tight">Um cliente feliz gera ondas</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="wdr-water" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="rgb(14 165 233)" stopOpacity="0.28" />
            <stop offset="1" stopColor="rgb(14 165 233)" stopOpacity="0.04" />
          </radialGradient>
        </defs>
        <ellipse cx={C.x} cy={C.y} rx={RX} ry={RY + 14} fill="url(#wdr-water)" />
        {/* ondas */}
        {[0, 1, 2].map((i) => {
          const start = IMPACT + i * 0.07
          return (
            <motion.ellipse
              key={i}
              cx={C.x}
              cy={C.y}
              rx={RX}
              ry={RY}
              fill="none"
              stroke="rgb(14 165 233)"
              strokeWidth={2 - i * 0.4}
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: 'view-box', transformOrigin: `${C.x}px ${C.y}px` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.02, 0.02, 1, 1], opacity: [0, 0.9, 0, 0] }}
              transition={{ duration: CYCLE, times: [0, start, Math.min(start + SPREAD, 0.99), 1], ease: 'linear', repeat: Infinity }}
            />
          )
        })}
        {/* respingos */}
        {SPLASH.map((dx, i) => (
          <motion.circle
            key={i}
            cx={C.x}
            cy={C.y}
            r={i === 2 ? 3.5 : 2.5}
            fill="rgb(14 165 233)"
            initial={{ opacity: 0 }}
            animate={{ x: [0, 0, dx * 0.6, dx, dx], y: [0, 0, -34 - (i === 2 ? 18 : 0), 6, 6], opacity: [0, 0, 1, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, IMPACT, IMPACT + 0.1, IMPACT + 0.22, 1], repeat: Infinity }}
          />
        ))}
        {/* gota */}
        <motion.path
          d="M 0 -16 C 6 -6 10 0 10 6 A 10 10 0 0 1 -10 6 C -10 0 -6 -6 0 -16 Z"
          fill="rgb(14 165 233)"
          initial={{ x: C.x, y: 30, opacity: 0 }}
          animate={{ x: C.x, y: [30, 30, C.y - 6, C.y - 6, C.y - 6], opacity: [0, 1, 1, 0, 0], scaleY: [1, 1, 1.25, 0.4, 0.4] }}
          transition={{ duration: CYCLE, times: [0, 0.02, IMPACT, IMPACT + 0.02, 1], ease: ['linear', 'easeIn', 'linear', 'linear'], repeat: Infinity }}
        />
      </svg>

      {CHIPS.map((c) => {
        const d = Math.hypot((c.x - C.x) / RX, (c.y - C.y) / RY)
        const r = IMPACT + Math.min(d, 1) * SPREAD
        return (
          <motion.div
            key={c.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border bg-card/95 px-2.5 py-1 text-[11px] font-medium shadow-sm"
            style={{ left: c.x, top: c.y }}
            animate={{ y: [0, 0, -12, 4, 0, 0], rotate: [0, 0, -4, 3, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, r, r + 0.05, r + 0.1, r + 0.16, 1], repeat: Infinity }}
          >
            <c.Icon className={`size-3.5 ${c.cls}`} />
            {c.label}
          </motion.div>
        )
      })}

      <motion.span
        className="absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-500 text-white shadow"
        style={{ left: C.x, top: C.y }}
        animate={{ scale: [0, 0, 1.2, 1, 1, 0], opacity: [0, 0, 1, 1, 1, 0] }}
        transition={{ duration: CYCLE, times: [0, IMPACT, IMPACT + 0.06, IMPACT + 0.1, 0.9, 1], repeat: Infinity }}
      >
        <Heart className="size-3.5 fill-current" />
      </motion.span>
    </div>
  )
}
