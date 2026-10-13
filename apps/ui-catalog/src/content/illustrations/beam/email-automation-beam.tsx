'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, Clock, Mail, Split, Tag, UserPlus } from 'lucide-react'
import { motion } from 'motion/react'

// "Email Automation Beam": régua de automação vertical — novo cadastro → espera de 1 dia (relógio girando) →
// e-mail de boas-vindas → condição "abriu?". O feixe desce etapa por etapa e, na condição, alterna o ramo a cada
// ciclo: Sim leva ao cupom, Não leva ao lembrete. Os contadores de cada ramo sobem quando o lead chega.
const W = 380
const H = 400
const CX = 190
type Step = { key: string; label: string; detail: string; Icon: LucideIcon; x: number; y: number; tone: string }
const MAIN: ReadonlyArray<Step> = [
  { key: 'trigger', label: 'Novo cadastro', detail: 'gatilho · formulário do site', Icon: UserPlus, x: CX, y: 34, tone: 'text-violet-500' },
  { key: 'wait', label: 'Esperar 1 dia', detail: 'atraso', Icon: Clock, x: CX, y: 112, tone: 'text-amber-500' },
  { key: 'mail', label: 'E-mail de boas-vindas', detail: 'assunto: "Que bom ter você aqui"', Icon: Mail, x: CX, y: 190, tone: 'text-sky-500' },
  { key: 'cond', label: 'Abriu o e-mail?', detail: 'condição', Icon: Split, x: CX, y: 268, tone: 'text-foreground' },
]
const YES: Step = { key: 'yes', label: 'Cupom 10%', detail: 'Sim', Icon: Tag, x: 95, y: 360, tone: 'text-emerald-500' }
const NO: Step = { key: 'no', label: 'Lembrete', detail: 'Não', Icon: Bell, x: 285, y: 360, tone: 'text-rose-500' }
const CARD_H = 44
const vSeg = (a: Step, b: Step) => `M ${a.x} ${a.y + CARD_H / 2} L ${b.x} ${b.y - CARD_H / 2}`
const branch = (to: Step) => `M ${CX} ${MAIN[3].y + CARD_H / 2} C ${CX} ${MAIN[3].y + 50}, ${to.x} ${to.y - 60}, ${to.x} ${to.y - 18}`
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function Card({ s, active, wide = true, count }: { s: Step; active: boolean; wide?: boolean; count?: number }) {
  return (
    <motion.div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border bg-card px-2.5 shadow-sm ${wide ? 'w-[210px]' : 'w-[132px]'}`}
      style={{ left: s.x, top: s.y, height: wide ? CARD_H : 36 }}
      animate={{ borderColor: active ? 'var(--primary)' : 'var(--border)', scale: active ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
        {s.key === 'wait' && active ? (
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="flex">
            <s.Icon className={`size-3.5 ${s.tone}`} />
          </motion.span>
        ) : (
          <s.Icon className={`size-3.5 ${s.tone}`} />
        )}
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-[11px] font-medium">{s.label}</div>
        <div className="truncate text-[9px] text-muted-foreground">{s.detail}</div>
      </div>
      {count !== undefined && (
        <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="rounded-full bg-muted px-1.5 text-[10px] font-semibold tabular-nums">
          {count}
        </motion.span>
      )}
    </motion.div>
  )
}

export default function EmailAutomationBeam() {
  const [stage, setStage] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [counts, setCounts] = useState({ yes: 128, no: 74 })

  useEffect(() => {
    let cancelled = false
    let c = 0
    const run = async () => {
      while (!cancelled) {
        for (let s = 0; s <= 4; s++) {
          if (cancelled) return
          setStage(s)
          await sleep(s === 1 ? 1300 : 800)
        }
        const yes = c % 2 === 0
        setCounts((p) => (yes ? { ...p, yes: p.yes + 1 } : { ...p, no: p.no + 1 }))
        await sleep(1400)
        c += 1
        setCycle(c)
        setStage(-1)
        await sleep(300)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const yesBranch = cycle % 2 === 0
  const target = yesBranch ? YES : NO

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Automação de e-mail com espera, envio e condição com dois ramos">
        {MAIN.slice(0, -1).map((s, i) => (
          <g key={s.key}>
            <path d={vSeg(s, MAIN[i + 1])} stroke="var(--border)" strokeWidth="2" strokeDasharray="3 4" />
            <motion.path
              d={vSeg(s, MAIN[i + 1])}
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: stage > i ? 1 : 0, opacity: stage > i ? 1 : 0 }}
              transition={{ duration: stage > i ? 0.45 : 0.15 }}
            />
          </g>
        ))}
        {[YES, NO].map((b) => (
          <g key={b.key}>
            <path d={branch(b)} fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="3 4" />
            <motion.path
              d={branch(b)}
              fill="none"
              stroke="currentColor"
              className={b.key === 'yes' ? 'text-emerald-500' : 'text-rose-500'}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: stage >= 4 && b === target ? 1 : 0, opacity: stage >= 4 && b === target ? 1 : 0 }}
              transition={{ duration: stage >= 4 ? 0.55 : 0.15 }}
            />
          </g>
        ))}
      </svg>

      <span className="absolute rounded bg-emerald-500/10 px-1.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400" style={{ left: 104, top: 304 }}>
        Sim
      </span>
      <span className="absolute rounded bg-rose-500/10 px-1.5 text-[9px] font-medium text-rose-600 dark:text-rose-400" style={{ left: 254, top: 304 }}>
        Não
      </span>

      {MAIN.map((s, i) => (
        <Card key={s.key} s={s} active={stage === i} />
      ))}
      <Card s={YES} wide={false} active={stage >= 4 && yesBranch} count={counts.yes} />
      <Card s={NO} wide={false} active={stage >= 4 && !yesBranch} count={counts.no} />
    </div>
  )
}
