'use client'

import { motion } from 'motion/react'

// "Grid Network Beam": grade 3x3 de nós ligados aos vizinhos; feixes com ritmo "aleatório" (semente fixa, mesma
// coreografia em todo render) percorrem as arestas e acendem o nó de chegada. Só geometria e tokens do tema.
const XS = [80, 200, 320]
const YS = [60, 150, 240]
const R = 15
const NODES = YS.flatMap((y, r) => XS.map((x, c) => ({ id: r * 3 + c, x, y })))

const EDGES: Array<[number, number]> = []
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    const id = r * 3 + c
    if (c < 2) EDGES.push([id, id + 1])
    if (r < 2) EDGES.push([id, id + 3])
  }
}

// pseudo-aleatório determinístico
const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const BEAMS = EDGES.map(([a, b], i) => {
  const flip = rnd(i) > 0.5
  const from = NODES[flip ? b : a]!
  const to = NODES[flip ? a : b]!
  const dx = Math.sign(to.x - from.x)
  const dy = Math.sign(to.y - from.y)
  const d = `M ${from.x + dx * R} ${from.y + dy * R} L ${to.x - dx * R} ${to.y - dy * R}`
  const duration = 0.8 + rnd(i + 10) * 0.8
  const delay = rnd(i + 20) * 3
  const gap = 1 + rnd(i + 30) * 3
  return { key: `${a}-${b}`, d, to: to.id, duration, delay, gap }
})

export default function GridNetworkBeam() {
  return (
    <div className="relative h-[300px] w-[400px] text-foreground">
      <svg viewBox="0 0 400 300" className="size-full" role="img" aria-label="Rede em grade com feixes percorrendo as conexões entre nós vizinhos">
        {/* trilhos */}
        {BEAMS.map((b) => (
          <path key={`rail-${b.key}`} d={b.d} stroke="var(--border)" strokeWidth="1.5" />
        ))}

        {/* feixes: um brilho largo e um núcleo fino na mesma posição */}
        {BEAMS.map((b) => (
          <g key={`beam-${b.key}`}>
            <motion.path
              d={b.d}
              stroke="var(--primary)"
              strokeWidth="8"
              strokeOpacity="0.18"
              strokeLinecap="round"
              initial={{ pathLength: 0.32, pathSpacing: 1, pathOffset: 0 }}
              animate={{ pathLength: 0.32, pathSpacing: 1, pathOffset: 1 }}
              transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, repeatDelay: b.gap, ease: 'easeInOut' }}
            />
            <motion.path
              d={b.d}
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0.32, pathSpacing: 1, pathOffset: 0 }}
              animate={{ pathLength: 0.32, pathSpacing: 1, pathOffset: 1 }}
              transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, repeatDelay: b.gap, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {/* flash no nó de chegada, sincronizado com o fim de cada feixe */}
        {BEAMS.map((b) => {
          const n = NODES[b.to]!
          return (
            <motion.circle
              key={`flash-${b.key}`}
              cx={n.x}
              cy={n.y}
              r={R}
              fill="var(--primary)"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.45, 0], scale: [1, 1.5, 2] }}
              transition={{ duration: 0.7, delay: b.delay + b.duration, repeat: Infinity, repeatDelay: b.duration + b.gap - 0.7, ease: 'easeOut' }}
            />
          )
        })}

        {/* nós */}
        {NODES.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={R} fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r={n.id === 4 ? 5 : 4} fill={n.id === 4 ? 'var(--primary)' : 'var(--muted-foreground)'} />
          </g>
        ))}
      </svg>
    </div>
  )
}
