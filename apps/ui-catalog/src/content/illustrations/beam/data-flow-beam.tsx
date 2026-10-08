'use client'

import { motion } from 'motion/react'
import { Database, FileText, Globe, Server, Sparkles, Zap } from 'lucide-react'

// Ilustração "Data Flow Beam": feixes de luz percorrem os conectores entre nós de um pipeline.
// Herda cores do tema (tokens do shadcn) e anima com motion. Sem props obrigatórias.
const NODES = [
  { id: 'prompt', x: 60, y: 160, label: 'Prompt', Icon: FileText },
  { id: 'model', x: 280, y: 60, label: 'Modelo', Icon: Sparkles },
  { id: 'api', x: 280, y: 260, label: 'API', Icon: Globe },
  { id: 'db', x: 500, y: 110, label: 'Postgres', Icon: Database },
  { id: 'cache', x: 500, y: 210, label: 'Cache', Icon: Server },
  { id: 'out', x: 700, y: 160, label: 'Resposta', Icon: Zap },
] as const

const EDGES: Array<[string, string, number]> = [
  ['prompt', 'model', 0],
  ['prompt', 'api', 0.6],
  ['model', 'db', 0.3],
  ['api', 'cache', 0.9],
  ['db', 'out', 1.2],
  ['cache', 'out', 1.5],
]

function pathBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = (b.x - a.x) / 2
  return `M ${a.x + 64} ${a.y} C ${a.x + 64 + dx} ${a.y}, ${b.x - 64 - dx} ${b.y}, ${b.x - 64} ${b.y}`
}

export default function DataFlowBeam() {
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, (typeof NODES)[number]>
  return (
    <div className="relative w-full max-w-3xl text-foreground">
      <svg viewBox="0 0 760 320" className="h-auto w-full" role="img" aria-label="Fluxo de dados animado entre prompt, modelo, API, banco, cache e resposta">
        <defs>
          <linearGradient id="dfb-beam" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <filter id="dfb-glow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* trilhos */}
        {EDGES.map(([a, b]) => (
          <path key={`${a}-${b}`} d={pathBetween(byId[a]!, byId[b]!)} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        ))}

        {/* feixes */}
        {EDGES.map(([a, b, delay]) => (
          <g key={`beam-${a}-${b}`}>
            <motion.path
              d={pathBetween(byId[a]!, byId[b]!)}
              fill="none"
              stroke="url(#dfb-beam)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#dfb-glow)"
              opacity={0.6}
              initial={{ pathLength: 0.35, pathSpacing: 1, pathOffset: 0 }}
              animate={{ pathLength: 0.35, pathSpacing: 1, pathOffset: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay }}
            />
            <motion.path
              d={pathBetween(byId[a]!, byId[b]!)}
              fill="none"
              stroke="url(#dfb-beam)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.35, pathSpacing: 1, pathOffset: 0 }}
              animate={{ pathLength: 0.35, pathSpacing: 1, pathOffset: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay }}
            />
          </g>
        ))}

        {/* nós */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <rect x={n.x - 64} y={n.y - 26} width="128" height="52" rx="12" fill="var(--card)" stroke="var(--border)" />
            <foreignObject x={n.x - 56} y={n.y - 16} width="112" height="32">
              <div className="flex h-8 items-center gap-2 text-xs font-medium">
                <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
                  <n.Icon className="size-3.5" />
                </span>
                {n.label}
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
