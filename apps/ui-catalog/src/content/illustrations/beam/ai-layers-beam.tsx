'use client'

import type { LucideIcon } from 'lucide-react'
import { FileSpreadsheet, FileText, Mail, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

// "AI Layers Beam": pipeline de IA em camadas, como uma rede neural. Três fontes (PDF, planilha, e-mail) disparam
// feixes para a camada de embeddings, que dispara para a camada do modelo, que converge no resumo final. Cada
// camada pulsa quando o feixe chega; o ciclo inteiro se repete a cada 3,4s.
const W = 440
const H = 280
const PERIOD = 3.4
const HOP = 0.75 // s entre uma camada e a próxima
const TRAVEL = 0.8 // s de viagem de cada feixe

type Pt = { x: number; y: number }
const LAYERS: Pt[][] = [
  [80, 140, 200].map((y) => ({ x: 58, y })),
  [62, 114, 166, 218].map((y) => ({ x: 170, y })),
  [88, 140, 192].map((y) => ({ x: 282, y })),
  [{ x: 384, y: 140 }],
]
const LAYER_NAMES = ['Fontes', 'Embeddings', 'Modelo', 'Saída'] as const
const BEAM_TONES = ['text-violet-500', 'text-sky-500', 'text-emerald-500'] as const
const SOURCES: ReadonlyArray<{ Icon: LucideIcon; label: string }> = [
  { Icon: FileText, label: 'PDF' },
  { Icon: FileSpreadsheet, label: 'Planilha' },
  { Icon: Mail, label: 'E-mail' },
]

const curve = (a: Pt, b: Pt) => {
  const mx = (a.x + b.x) / 2
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
}

const EDGES = LAYERS.slice(0, -1).flatMap((layer, k) =>
  layer.flatMap((a, i) => LAYERS[k + 1].map((b, j) => ({ id: `${k}-${i}-${j}`, d: curve(a, b), phase: k, jitter: ((i * 3 + j) % 4) * 0.05 }))),
)

function Pulse({ phase, className }: { phase: number; className: string }) {
  // a camada `phase` recebe o feixe quando o hop anterior termina
  const delay = phase === 0 ? 0 : (phase - 1) * HOP + TRAVEL
  return (
    <motion.span
      className={className}
      animate={{ scale: [1, 1.35, 1] }}
      transition={{ duration: 0.45, delay, repeat: Infinity, repeatDelay: PERIOD - 0.45, ease: 'easeOut' }}
    />
  )
}

export default function AiLayersBeam() {
  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Feixes atravessando as camadas de um pipeline de IA">
        {EDGES.map((e) => (
          <path key={`t-${e.id}`} d={e.d} fill="none" stroke="var(--border)" strokeWidth="1" />
        ))}
        {EDGES.map((e) => (
          <motion.path
            key={`b-${e.id}`}
            d={e.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={BEAM_TONES[e.phase]}
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ pathLength: [0, 0.45, 0.45, 0], pathOffset: [0, 0, 0.55, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: TRAVEL, times: [0, 0.3, 0.75, 1], delay: e.phase * HOP + e.jitter, repeat: Infinity, repeatDelay: PERIOD - TRAVEL, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* rótulos das camadas */}
      {LAYERS.map((layer, k) => (
        <div key={LAYER_NAMES[k]} className="absolute top-3 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground" style={{ left: layer[0].x }}>
          {LAYER_NAMES[k]}
        </div>
      ))}

      {/* fontes */}
      {LAYERS[0].map((p, i) => {
        const S = SOURCES[i]
        return (
          <div key={S.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
            <Pulse phase={0} className="absolute inset-0 rounded-lg bg-violet-500/20" />
            <span className="relative flex size-9 items-center justify-center rounded-lg border bg-card shadow-sm">
              <S.Icon className="size-4 text-muted-foreground" />
            </span>
          </div>
        )
      })}

      {/* camadas ocultas */}
      {[1, 2].map((k) =>
        LAYERS[k].map((p, i) => (
          <div key={`${k}-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
            <Pulse phase={k} className={`absolute -inset-1.5 rounded-full ${k === 1 ? 'bg-sky-500/25' : 'bg-emerald-500/25'}`} />
            <span className={`relative block size-3.5 rounded-full border-2 bg-card ${k === 1 ? 'border-sky-500' : 'border-emerald-500'}`} />
          </div>
        )),
      )}

      {/* saída */}
      <div className="absolute -translate-y-1/2" style={{ left: LAYERS[3][0].x - 22, top: LAYERS[3][0].y }}>
        <Pulse phase={3} className="absolute inset-0 rounded-xl bg-primary/25" />
        <span className="relative flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Sparkles className="size-5" />
        </span>
        <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium">Resumo</span>
      </div>

      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-3 font-mono text-[10px] text-muted-foreground">
        <span>1.284 tokens</span>
        <span>·</span>
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: PERIOD, repeat: Infinity }}>
          320 ms por ciclo
        </motion.span>
      </div>
    </div>
  )
}
