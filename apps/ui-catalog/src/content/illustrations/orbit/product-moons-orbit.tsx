'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'

// "Product Moons Orbit": sistema de produtos visto de cima. A plataforma é o sol (com coroa girando); CRM, Checkout e
// Automação são planetas em degradê, cada um em sua órbita e velocidade, e cada planeta tem uma lua — um recurso
// dele (Pipeline, Pix, Fluxos) — girando em volta. Rótulos de planetas e luas contra-giram para ficarem em pé.
const SIZE = 400
const C = SIZE / 2
type Planet = { name: string; moon: string; r: number; size: number; dur: number; moonDur: number; start: number; grad: string; moonTone: string }
const PLANETS: ReadonlyArray<Planet> = [
  { name: 'CRM', moon: 'Pipeline', r: 82, size: 30, dur: 16, moonDur: 4, start: 20, grad: 'from-sky-400 to-blue-600', moonTone: 'bg-sky-300' },
  { name: 'Checkout', moon: 'Pix', r: 130, size: 38, dur: 26, moonDur: 5, start: 160, grad: 'from-emerald-400 to-teal-600', moonTone: 'bg-emerald-300' },
  { name: 'Automação', moon: 'Fluxos', r: 178, size: 34, dur: 38, moonDur: 6, start: 280, grad: 'from-violet-400 to-fuchsia-600', moonTone: 'bg-violet-300' },
]

function Upright({ dur, from, children, className }: { dur: number; from: number; children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ rotate: -from }} animate={{ rotate: -from - 360 }} transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}>
      {children}
    </motion.div>
  )
}

export default function ProductMoonsOrbit() {
  return (
    <div className="relative text-foreground" style={{ width: SIZE, height: SIZE }}>
      {/* estrelas */}
      {Array.from({ length: 26 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-0.5 rounded-full bg-foreground"
          style={{ left: (i * 137) % SIZE, top: (i * 89 + 31) % SIZE }}
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i % 7) * 0.3 }}
        />
      ))}

      {PLANETS.map((p) => (
        <div key={`o-${p.name}`} className="absolute rounded-full border border-border" style={{ left: C - p.r, top: C - p.r, width: p.r * 2, height: p.r * 2 }} />
      ))}

      {PLANETS.map((p) => (
        <motion.div
          key={p.name}
          className="absolute"
          style={{ left: C - p.r, top: C - p.r, width: p.r * 2, height: p.r * 2 }}
          initial={{ rotate: p.start }}
          animate={{ rotate: p.start + 360 }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'linear' }}
        >
          {/* planeta no topo da órbita */}
          <div className="absolute" style={{ left: p.r, top: 0 }}>
            {/* lua */}
            <motion.div
              className="absolute"
              style={{ left: -(p.size / 2 + 14), top: -(p.size / 2 + 14), width: p.size + 28, height: p.size + 28 }}
              animate={{ rotate: 360 }}
              transition={{ duration: p.moonDur, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-border/70" />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <span className={`block size-2.5 rounded-full ${p.moonTone} shadow`} />
              </div>
            </motion.div>
            <span
              className={`absolute rounded-full bg-gradient-to-br shadow-lg ${p.grad}`}
              style={{ left: -p.size / 2, top: -p.size / 2, width: p.size, height: p.size, boxShadow: 'inset -6px -6px 12px rgb(0 0 0 / 0.25)' }}
            />
            <Upright dur={p.dur} from={p.start} className="absolute left-0 top-0">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-center leading-tight" style={{ top: p.size / 2 + 16 }}>
                <span className="block text-[11px] font-semibold">{p.name}</span>
                <span className="block text-[9px] text-muted-foreground">+ {p.moon}</span>
              </span>
            </Upright>
          </div>
        </motion.div>
      ))}

      {/* sol */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute -inset-5 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent, rgb(251 191 36 / 0.45), transparent 30%, rgb(251 146 60 / 0.4), transparent 60%, rgb(251 191 36 / 0.45), transparent)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative flex size-[60px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-[10px] font-semibold text-white shadow-xl">
          Plataforma
        </div>
      </div>
    </div>
  )
}
