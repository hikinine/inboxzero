'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Calendar, Contact, FileText, Mail, MessageCircle, Sheet, Slack } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "CRM Sync Hub Beam": três entradas (formulário, WhatsApp, Gmail) à esquerda alimentam o CRM no centro, que
// redistribui o contato para planilha, Slack e agenda à direita. A cada ciclo um feixe entra, o hub pulsa, o
// contador de contatos sobe, o card do último lead troca e um feixe sai para um destino que acende.
const W = 460
const H = 300
const HUB = { x: 230, y: 150 }
const STEP_MS = 1800

type Node = { label: string; Icon: LucideIcon; tone: string; x: number; y: number }
const SOURCES: ReadonlyArray<Node> = [
  { label: 'Formulário', Icon: FileText, tone: 'text-violet-500', x: 58, y: 62 },
  { label: 'WhatsApp', Icon: MessageCircle, tone: 'text-emerald-500', x: 58, y: 150 },
  { label: 'Gmail', Icon: Mail, tone: 'text-rose-500', x: 58, y: 238 },
]
const TARGETS: ReadonlyArray<Node> = [
  { label: 'Planilha', Icon: Sheet, tone: 'text-emerald-600', x: 402, y: 62 },
  { label: 'Slack', Icon: Slack, tone: 'text-amber-500', x: 402, y: 150 },
  { label: 'Agenda', Icon: Calendar, tone: 'text-sky-500', x: 402, y: 238 },
]
const LEADS = ['Ana Souza', 'Bruno Lima', 'Carla Mendes', 'Diego Rocha', 'Elisa Prado', 'Fábio Nunes'] as const

const inPath = (n: Node) => `M ${n.x + 22} ${n.y} C ${n.x + 90} ${n.y}, ${HUB.x - 90} ${HUB.y}, ${HUB.x - 34} ${HUB.y}`
const outPath = (n: Node) => `M ${HUB.x + 34} ${HUB.y} C ${HUB.x + 90} ${HUB.y}, ${n.x - 90} ${n.y}, ${n.x - 22} ${n.y}`

function Pulse({ d, className, delay = 0 }: { d: string; className: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={className}
      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
      animate={{ pathLength: [0, 0.4, 0.3, 0], pathOffset: [0, 0, 0.7, 1], opacity: [1, 1, 1, 0] }}
      transition={{ duration: 0.75, delay, times: [0, 0.3, 0.85, 1], ease: 'easeInOut' }}
    />
  )
}

function Chip({ n, active }: { n: Node; active: boolean }) {
  return (
    <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: n.x, top: n.y }}>
      <motion.span
        className="flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm"
        animate={{ scale: active ? 1.08 : 1, borderColor: active ? 'var(--primary)' : 'var(--border)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        <n.Icon className={`size-5 ${n.tone}`} />
      </motion.span>
      <span className="text-[10px] text-muted-foreground">{n.label}</span>
    </div>
  )
}

export default function CrmSyncHubBeam() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS)
    return () => clearInterval(id)
  }, [])

  const src = tick % 3
  const dst = (tick * 2 + 1) % 3
  const lead = LEADS[tick % LEADS.length]

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="CRM central sincronizando contatos entre seis aplicativos">
        {SOURCES.map((n) => (
          <path key={`i-${n.label}`} d={inPath(n)} fill="none" stroke="var(--border)" strokeWidth="1.5" />
        ))}
        {TARGETS.map((n) => (
          <path key={`o-${n.label}`} d={outPath(n)} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
        <Pulse key={`in-${tick}`} d={inPath(SOURCES[src])} className="text-primary" />
        <Pulse key={`out-${tick}`} d={outPath(TARGETS[dst])} className="text-emerald-500" delay={0.8} />
      </svg>

      {SOURCES.map((n, i) => (
        <Chip key={n.label} n={n} active={i === src} />
      ))}
      {TARGETS.map((n, i) => (
        <Chip key={n.label} n={n} active={i === dst} />
      ))}

      {/* hub */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: HUB.x, top: HUB.y }}>
        <motion.span
          key={`ring-${tick}`}
          className="absolute inset-0 rounded-2xl border-2 border-primary"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        />
        <span className="relative flex size-[68px] flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Contact className="size-6" />
          <span className="mt-0.5 text-[10px] font-semibold">CRM</span>
        </span>
      </div>

      <div className="absolute left-1/2 top-[198px] w-[150px] -translate-x-1/2 rounded-lg border bg-card px-2.5 py-1.5 text-center shadow-sm">
        <div className="text-[10px] text-muted-foreground">contatos sincronizados</div>
        <div className="text-sm font-semibold tabular-nums">{(1284 + tick).toLocaleString('pt-BR')}</div>
        <div className="relative h-4 overflow-hidden text-[10px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={lead + tick}
              className="absolute inset-0 truncate text-emerald-600 dark:text-emerald-400"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              + {lead} · via {SOURCES[src].label}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
