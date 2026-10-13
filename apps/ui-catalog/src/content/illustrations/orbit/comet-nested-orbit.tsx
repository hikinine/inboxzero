'use client'

import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

// "Comet Nested Orbit": três órbitas elípticas aninhadas, cada uma inclinada num ângulo, com um cometa percorrendo
// a trajetória — a cabeça brilhante segue um offset-path e a cauda é feita de partículas atrasadas que encolhem e
// somem. Estrelas cintilam ao fundo e o núcleo respira com halo. Velocidades e sentidos diferentes por órbita.
const SIZE = 380
const C = SIZE / 2
type Orbit = { rx: number; ry: number; tilt: number; dur: number; reverse?: boolean; head: string; tail: string }
const ORBITS: ReadonlyArray<Orbit> = [
  { rx: 74, ry: 40, tilt: -25, dur: 5, head: 'bg-sky-400 text-sky-400', tail: 'bg-sky-400' },
  { rx: 128, ry: 62, tilt: 18, dur: 8, reverse: true, head: 'bg-violet-400 text-violet-400', tail: 'bg-violet-400' },
  { rx: 176, ry: 84, tilt: 62, dur: 11, head: 'bg-amber-400 text-amber-400', tail: 'bg-amber-400' },
]
const TAIL = 9

function ellipsePath({ rx, ry, tilt, reverse }: Orbit) {
  const t = (tilt * Math.PI) / 180
  const pts: string[] = []
  const n = 72
  for (let k = 0; k <= n; k++) {
    const a = ((reverse ? -k : k) / n) * Math.PI * 2
    const ex = Math.cos(a) * rx
    const ey = Math.sin(a) * ry
    const x = C + ex * Math.cos(t) - ey * Math.sin(t)
    const y = C + ex * Math.sin(t) + ey * Math.cos(t)
    pts.push(`${k === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return `${pts.join(' ')} Z`
}

const STARS = Array.from({ length: 34 }, (_, i) => ({ x: (i * 157 + 23) % SIZE, y: (i * 101 + 47) % SIZE, s: i % 5 === 0 ? 2 : 1, d: 1.5 + (i % 5) * 0.5 }))

export default function CometNestedOrbit() {
  return (
    <div className="relative overflow-hidden text-foreground" style={{ width: SIZE, height: SIZE }}>
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{ left: s.x, top: s.y, width: s.s, height: s.s }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.d, repeat: Infinity, delay: (i % 6) * 0.4 }}
        />
      ))}

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden>
        {ORBITS.map((o, i) => (
          <path key={i} d={ellipsePath(o)} fill="none" stroke="var(--border)" strokeWidth="1.2" strokeDasharray={i === 1 ? '3 5' : undefined} />
        ))}
      </svg>

      {ORBITS.map((o, oi) => {
        const d = ellipsePath(o)
        return Array.from({ length: TAIL }).map((_, k) => {
          const isHead = k === 0
          const size = isHead ? 10 : Math.max(2, 7 - k * 0.6)
          return (
            <motion.span
              key={`${oi}-${k}`}
              className={`absolute left-0 top-0 rounded-full ${isHead ? o.head : o.tail}`}
              style={{
                width: size,
                height: size,
                offsetPath: `path('${d}')`,
                offsetRotate: '0deg',
                opacity: isHead ? 1 : 0.75 - k * 0.08,
                boxShadow: isHead ? '0 0 12px 3px currentColor' : undefined,
              }}
              initial={{ offsetDistance: `${-k * 1.2}%` }}
              animate={{ offsetDistance: [`${-k * 1.2}%`, `${100 - k * 1.2}%`] }}
              transition={{ duration: o.dur, repeat: Infinity, ease: 'linear' }}
            />
          )
        })
      })}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.span className="absolute -inset-6 rounded-full bg-primary/20 blur-xl" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Sparkles className="size-5" />
        </span>
      </div>
    </div>
  )
}
