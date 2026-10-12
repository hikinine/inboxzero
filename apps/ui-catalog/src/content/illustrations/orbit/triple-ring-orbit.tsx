'use client'

import { motion } from 'motion/react'

// "Triple Ring Orbit": três anéis concêntricos, cada um com um arco e uma "conta" girando em velocidade e sentido
// próprios (horário, anti-horário, horário); marcações no anel externo e núcleo pulsando. Puramente geométrico.
const RINGS = [
  { r: 46, duration: 5, reverse: false, sweep: 120, color: 'var(--primary)', width: 3, bead: 6 },
  { r: 84, duration: 9, reverse: true, sweep: 70, color: 'var(--foreground)', width: 2, bead: 5 },
  { r: 124, duration: 16, reverse: false, sweep: 210, color: 'var(--muted-foreground)', width: 1.5, bead: 4 },
] as const

// arco que termina (ou começa, no sentido inverso) na "conta", posicionada no ângulo 0 (lado direito)
function arc(r: number, sweep: number, reverse: boolean) {
  const rad = (sweep * Math.PI) / 180
  const large = sweep > 180 ? 1 : 0
  const px = r + r * Math.cos(rad)
  const py = r + r * Math.sin(rad)
  const qx = r + r * Math.cos(-rad)
  const qy = r + r * Math.sin(-rad)
  return reverse ? `M ${r * 2} ${r} A ${r} ${r} 0 ${large} 1 ${px} ${py}` : `M ${qx} ${qy} A ${r} ${r} 0 ${large} 1 ${r * 2} ${r}`
}

export default function TripleRingOrbit() {
  return (
    <div className="relative size-[300px] text-foreground">
      {RINGS.map((ring) => (
        <div key={ring.r} className="absolute left-1/2 top-1/2" style={{ width: ring.r * 2, height: ring.r * 2, marginLeft: -ring.r, marginTop: -ring.r }}>
          <svg viewBox={`0 0 ${ring.r * 2} ${ring.r * 2}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <circle cx={ring.r} cy={ring.r} r={ring.r} fill="none" stroke="var(--border)" strokeWidth="1" />
            {ring.r === 124 &&
              Array.from({ length: 36 }, (_, i) => {
                const a = (i / 36) * Math.PI * 2
                const len = i % 3 === 0 ? 6 : 3
                return (
                  <line
                    key={i}
                    x1={ring.r + (ring.r - len) * Math.cos(a)}
                    y1={ring.r + (ring.r - len) * Math.sin(a)}
                    x2={ring.r + ring.r * Math.cos(a)}
                    y2={ring.r + ring.r * Math.sin(a)}
                    stroke="var(--border)"
                    strokeWidth="1"
                  />
                )
              })}
          </svg>
          <motion.svg
            viewBox={`0 0 ${ring.r * 2} ${ring.r * 2}`}
            className="absolute inset-0 size-full overflow-visible"
            aria-hidden
            animate={{ rotate: ring.reverse ? -360 : 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
          >
            <path d={arc(ring.r, ring.sweep, ring.reverse)} fill="none" stroke={ring.color} strokeWidth={ring.width} strokeLinecap="round" strokeOpacity="0.7" />
            <circle cx={ring.r * 2} cy={ring.r} r={ring.bead + 5} fill={ring.color} fillOpacity="0.2" />
            <circle cx={ring.r * 2} cy={ring.r} r={ring.bead} fill={ring.color} />
          </motion.svg>
        </div>
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25"
        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-lg"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
