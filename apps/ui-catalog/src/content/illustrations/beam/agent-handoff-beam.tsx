'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, FileText, Inbox, PenLine, Search, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Agent Handoff Beam": quatro agentes especializados em arco (triagem → pesquisa → redação → revisão) passam a
// mesma tarefa adiante. Um card de tarefa desliza com mola de um agente ao próximo enquanto o feixe desenha o
// trecho e um rótulo mostra o que foi repassado ("contexto", "3 fontes", "rascunho v1"). No fim, a resposta sai.
const W = 480
const H = 300
type Agent = { name: string; role: string; Icon: LucideIcon; tone: string; bg: string; x: number; y: number }
const AGENTS: ReadonlyArray<Agent> = [
  { name: 'Triagem', role: 'classifica o pedido', Icon: Inbox, tone: 'text-violet-500', bg: 'bg-violet-500/10', x: 62, y: 200 },
  { name: 'Pesquisa', role: 'busca na base', Icon: Search, tone: 'text-sky-500', bg: 'bg-sky-500/10', x: 175, y: 96 },
  { name: 'Redação', role: 'escreve a resposta', Icon: PenLine, tone: 'text-amber-500', bg: 'bg-amber-500/10', x: 305, y: 96 },
  { name: 'Revisão', role: 'checa tom e dados', Icon: ShieldCheck, tone: 'text-emerald-500', bg: 'bg-emerald-500/10', x: 418, y: 200 },
]
const HANDOFFS = ['contexto: pedido #8812', '3 fontes encontradas', 'rascunho v1'] as const
const seg = (i: number) => {
  const a = AGENTS[i]
  const b = AGENTS[i + 1]
  const my = Math.min(a.y, b.y) - 40
  return `M ${a.x} ${a.y - 30} Q ${(a.x + b.x) / 2} ${my}, ${b.x} ${b.y - 30}`
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function AgentHandoffBeam() {
  const [at, setAt] = useState(0)
  const [working, setWorking] = useState(true)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setSent(false)
        for (let i = 0; i < AGENTS.length; i++) {
          if (cancelled) return
          setAt(i)
          setWorking(true)
          await sleep(1100)
          setWorking(false)
          await sleep(250)
        }
        setSent(true)
        await sleep(2200)
        setAt(0)
        await sleep(200)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const card = AGENTS[at]

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Quatro agentes de IA repassando uma tarefa em sequência">
        {AGENTS.slice(0, -1).map((_, i) => (
          <g key={i}>
            <path d={seg(i)} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 5" />
            <motion.path
              d={seg(i)}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: at > i ? 1 : 0, opacity: at > i ? 1 : 0 }}
              transition={{ duration: at > i ? 0.5 : 0.2, ease: 'easeOut' }}
            />
          </g>
        ))}
      </svg>

      {AGENTS.slice(0, -1).map((a, i) => {
        const b = AGENTS[i + 1]
        return (
          <AnimatePresence key={a.name}>
            {at === i + 1 && (
              <motion.span
                className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border bg-background px-2 py-0.5 text-[9px] text-muted-foreground shadow-sm"
                style={{ left: (a.x + b.x) / 2, top: a.y === b.y ? a.y - 68 : (a.y + b.y) / 2 - 8 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {HANDOFFS[i]}
              </motion.span>
            )}
          </AnimatePresence>
        )
      })}

      {AGENTS.map((a, i) => {
        const active = i === at && !sent
        const done = i < at || sent
        return (
          <div key={a.name} className="absolute flex w-[100px] -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: a.x, top: a.y }}>
            <motion.span
              className={`relative flex size-12 items-center justify-center rounded-full border bg-card shadow-sm`}
              animate={{ borderColor: active ? 'var(--primary)' : 'var(--border)', scale: active ? 1.1 : 1 }}
            >
              <span className={`flex size-10 items-center justify-center rounded-full ${a.bg}`}>
                <a.Icon className={`size-5 ${a.tone}`} />
              </span>
              {done && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-2.5" strokeWidth={3} />
                </motion.span>
              )}
            </motion.span>
            <span className="mt-1 text-[11px] font-medium">{a.name}</span>
            <span className="h-3 text-[9px] text-muted-foreground">
              {active && working ? (
                <span className="flex items-center gap-0.5">
                  pensando
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="size-0.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
                  ))}
                </span>
              ) : (
                a.role
              )}
            </span>
          </div>
        )
      })}

      {/* tarefa viajando */}
      <motion.div
        className="absolute flex items-center gap-1.5 rounded-lg border bg-card px-2 py-1 text-[10px] font-medium shadow-md"
        initial={false}
        animate={{ left: card.x - 46, top: card.y + 46, opacity: sent ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        <FileText className="size-3 text-muted-foreground" />
        Ticket #8812
      </motion.div>

      <AnimatePresence>
        {sent && (
          <motion.div
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs shadow-lg"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
            Resposta enviada ao cliente em 4,6s
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
