'use client'

import { motion } from 'motion/react'

// "Spinning Gears": três engrenagens engrenadas girando em sentidos opostos, com velocidades proporcionais ao
// número de dentes (como num mecanismo real). Caminhos SVG gerados por função; fase inicial calculada para encaixar.
const MODULE = 10 // raio primitivo = MODULE * dentes / 2

function gearPath(teeth: number, hole: number) {
  const rp = (MODULE * teeth) / 2
  const ro = rp + 6
  const ri = rp - 6
  const step = (Math.PI * 2) / teeth
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const seq: Array<[number, number]> = [
      [ri, a],
      [ro, a + step * 0.17],
      [ro, a + step * 0.36],
      [ri, a + step * 0.53],
    ]
    for (const [r, ang] of seq) pts.push(`${(r * Math.cos(ang)).toFixed(2)} ${(r * Math.sin(ang)).toFixed(2)}`)
  }
  return `M ${pts.join(' L ')} Z M ${hole} 0 A ${hole} ${hole} 0 1 0 ${-hole} 0 A ${hole} ${hole} 0 1 0 ${hole} 0 Z`
}

const BASE = 12 // segundos por volta da engrenagem principal
const GEARS = [
  // principal: dente centrado em -45° (direção da B) e em 165° (direção da C)
  { id: 'a', teeth: 12, x: 170, y: 150, dir: 1, phase: -45 - 0.265 * 30, fill: 'var(--primary)', opacity: 1, hole: 16 },
  // B: vale centrado em 135° (direção da A)
  { id: 'b', teeth: 8, x: 170 + 100 * Math.cos(-Math.PI / 4), y: 150 + 100 * Math.sin(-Math.PI / 4), dir: -1, phase: 135 - 0.765 * 45, fill: 'var(--foreground)', opacity: 0.8, hole: 10 },
  // C: vale centrado em -15° (direção da A)
  { id: 'c', teeth: 10, x: 170 + 110 * Math.cos((165 * Math.PI) / 180), y: 150 + 110 * Math.sin((165 * Math.PI) / 180), dir: -1, phase: -15 - 0.765 * 36, fill: 'var(--muted-foreground)', opacity: 0.7, hole: 12 },
] as const

export default function SpinningGears() {
  return (
    <div className="relative h-[260px] w-[300px] text-foreground">
      {GEARS.map((g) => {
        const ro = (MODULE * g.teeth) / 2 + 6
        const size = ro * 2 + 4
        return (
          <motion.div
            key={g.id}
            className="absolute"
            style={{ left: g.x - size / 2, top: g.y - size / 2, width: size, height: size }}
            animate={{ rotate: [g.phase, g.phase + g.dir * 360] }}
            transition={{ duration: (BASE * g.teeth) / 12, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`} className="size-full overflow-visible" aria-hidden>
              <path d={gearPath(g.teeth, g.hole)} fill={g.fill} fillOpacity={g.opacity} fillRule="evenodd" />
              <circle r={g.hole - 5} fill={g.fill} fillOpacity={g.opacity * 0.35} />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}
