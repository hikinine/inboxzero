'use client'

import type { LucideIcon } from 'lucide-react'
import { Laptop, Router, Smartphone, Tablet, Tv } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Wifi Signal Ripple": roteador emitindo arcos de Wi-Fi em semicírculo que se expandem (scale com origem no
// roteador) e somem. Cada aparelho pisca exatamente quando a onda chega até ele — o atraso sai da distância — e
// mostra as barras de sinal proporcionais à proximidade. Três ondas defasadas em loop.
const W = 400
const H = 300
const C = { x: 200, y: 252 }
const R0 = 36
const R1 = 250
const WAVE = 2.4
const GAP = 0.8

const DEVICES: ReadonlyArray<{ x: number; y: number; Icon: LucideIcon; label: string }> = [
  { x: 76, y: 168, Icon: Laptop, label: 'Notebook' },
  { x: 160, y: 72, Icon: Smartphone, label: 'Celular' },
  { x: 296, y: 92, Icon: Tv, label: 'Smart TV' },
  { x: 336, y: 196, Icon: Tablet, label: 'Tablet' },
]

export default function WifiSignalRipple() {
  const arc = `M ${C.x - R0} ${C.y} A ${R0} ${R0} 0 0 1 ${C.x + R0} ${C.y}`
  return (
    <div className="relative overflow-hidden text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={arc}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="text-sky-500"
            style={{ transformBox: 'view-box', transformOrigin: `${C.x}px ${C.y}px` }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, R1 / R0], opacity: [0.9, 0] }}
            transition={{ duration: WAVE, delay: i * GAP, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {/* arcos fixos de referência */}
        {[70, 120, 170].map((r) => (
          <path key={r} d={`M ${C.x - r} ${C.y} A ${r} ${r} 0 0 1 ${C.x + r} ${C.y}`} fill="none" stroke="var(--border)" strokeDasharray="2 6" />
        ))}
      </svg>

      {DEVICES.map((d) => {
        const dist = Math.hypot(d.x - C.x, d.y - C.y)
        const reach = ((dist - R0) / (R1 - R0)) * WAVE
        const bars = dist < 150 ? 4 : dist < 175 ? 3 : 2
        return (
          <div key={d.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: d.x, top: d.y }}>
            <motion.span
              className="relative flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 0.45, delay: reach, repeat: Infinity, repeatDelay: GAP - 0.45, ease: 'easeOut' }}
            >
              <motion.span
                className="absolute inset-0 rounded-xl ring-2 ring-sky-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.45, delay: reach, repeat: Infinity, repeatDelay: GAP - 0.45, ease: 'easeOut' }}
              />
              <d.Icon className="size-5" />
            </motion.span>
            <span className="mt-1 flex items-end gap-0.5">
              {[0, 1, 2, 3].map((b) => (
                <span key={b} className={cn('w-1 rounded-sm', b < bars ? 'bg-sky-500' : 'bg-muted')} style={{ height: 3 + b * 2 }} />
              ))}
            </span>
            <span className="text-[9px] text-muted-foreground">{d.label}</span>
          </div>
        )
      })}

      <div className="absolute flex -translate-x-1/2 flex-col items-center" style={{ left: C.x, top: C.y - 22 }}>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
          <Router className="size-6" />
        </span>
      </div>
      <div className="absolute bottom-1 right-3 font-mono text-[10px] text-muted-foreground">5 GHz · 512 Mbps</div>
    </div>
  )
}
