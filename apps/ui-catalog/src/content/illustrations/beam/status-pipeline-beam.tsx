'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, FlaskConical, Hammer, Rocket, ShieldCheck, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Status Pipeline Beam": quatro etapas ligadas por trilhos. Quando uma etapa termina, o trilho se preenche até a
// próxima, que passa a "executar" (anel tracejado girando + pulso no trilho) e termina em sucesso (check) ou erro
// (X + tremor). Roteiro fixo: o deploy falha uma vez, é refeito e passa; depois a execução recomeça.
type Status = 'pending' | 'running' | 'success' | 'error'

const STAGES: ReadonlyArray<{ id: string; label: string; Icon: LucideIcon }> = [
  { id: 'lint', label: 'Lint', Icon: ShieldCheck },
  { id: 'build', label: 'Build', Icon: Hammer },
  { id: 'test', label: 'Testes', Icon: FlaskConical },
  { id: 'deploy', label: 'Deploy', Icon: Rocket },
]

const SCRIPT: ReadonlyArray<{ s: Status[]; ms: number }> = [
  { s: ['pending', 'pending', 'pending', 'pending'], ms: 500 },
  { s: ['running', 'pending', 'pending', 'pending'], ms: 1000 },
  { s: ['success', 'running', 'pending', 'pending'], ms: 1100 },
  { s: ['success', 'success', 'running', 'pending'], ms: 1100 },
  { s: ['success', 'success', 'success', 'running'], ms: 1200 },
  { s: ['success', 'success', 'success', 'error'], ms: 1500 },
  { s: ['success', 'success', 'success', 'running'], ms: 1300 },
  { s: ['success', 'success', 'success', 'success'], ms: 2400 },
]

const LABEL: Record<Status, string> = { pending: 'Pendente', running: 'Executando…', success: 'Sucesso', error: 'Falhou' }
const RING: Record<Status, string> = {
  pending: 'border-border bg-card text-muted-foreground',
  running: 'border-primary bg-card text-primary',
  success: 'border-emerald-500 bg-emerald-500 text-white',
  error: 'border-rose-500 bg-rose-500 text-white',
}
const TEXT: Record<Status, string> = { pending: 'text-muted-foreground', running: 'text-primary', success: 'text-emerald-600 dark:text-emerald-400', error: 'text-rose-600 dark:text-rose-400' }

const X0 = 58
const STEP = 115
const Y = 64
const R = 22

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function StatusPipelineBeam() {
  const [frame, setFrame] = useState(0)
  const [run, setRun] = useState(128)

  useEffect(() => {
    let cancelled = false
    const loop = async () => {
      while (!cancelled) {
        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return
          setFrame(i)
          await sleep(SCRIPT[i].ms)
        }
        setRun((r) => r + 1)
      }
    }
    void loop()
    return () => {
      cancelled = true
    }
  }, [])

  const statuses = SCRIPT[frame].s
  const done = statuses.filter((s) => s === 'success').length
  const failed = statuses.includes('error')
  const finished = done === STAGES.length

  return (
    <div className="relative h-[200px] w-[460px] text-foreground">
      <svg viewBox="0 0 460 200" className="absolute inset-0 size-full" aria-hidden>
        {STAGES.slice(0, -1).map((s, i) => {
          const x1 = X0 + i * STEP + R + 6
          const x2 = X0 + (i + 1) * STEP - R - 6
          const d = `M ${x1} ${Y} H ${x2}`
          const next = statuses[i + 1]
          const filled = statuses[i] === 'success' && next !== 'pending'
          const tone = next === 'error' ? 'stroke-rose-500' : next === 'success' ? 'stroke-emerald-500' : 'stroke-primary'
          return (
            <g key={s.id}>
              <path d={d} fill="none" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
              <motion.path d={d} fill="none" className={tone} strokeWidth="2.5" strokeLinecap="round" initial={false} animate={{ pathLength: filled ? 1 : 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} />
              {next === 'running' && (
                <motion.path
                  d={d}
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="7"
                  strokeOpacity="0.35"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.25, pathSpacing: 1, pathOffset: 0 }}
                  animate={{ pathLength: 0.25, pathSpacing: 1, pathOffset: 1 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </g>
          )
        })}
      </svg>

      {STAGES.map((s, i) => {
        const st = statuses[i]
        return (
          <div key={s.id} className="absolute flex w-24 flex-col items-center" style={{ left: X0 + i * STEP - 48, top: Y - R }}>
            <motion.div
              className={`relative flex size-11 items-center justify-center rounded-full border-2 transition-colors duration-300 ${RING[st]}`}
              animate={{ x: st === 'error' ? [0, -5, 5, -4, 4, 0] : 0 }}
              transition={{ duration: 0.45 }}
            >
              {st === 'running' && (
                <motion.span aria-hidden className="absolute -inset-1.5 rounded-full border-2 border-dashed border-primary" animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
              )}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={st === 'success' || st === 'error' ? st : 'icon'}
                  className="flex"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {st === 'success' ? <Check className="size-5" strokeWidth={3} /> : st === 'error' ? <X className="size-5" strokeWidth={3} /> : <s.Icon className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <span className="mt-2 text-xs font-medium">{s.label}</span>
            <span className={`text-[10px] transition-colors duration-300 ${TEXT[st]}`}>{LABEL[st]}</span>
          </div>
        )
      })}

      <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="font-mono">Execução #{run}</span>
        <span>
          <span className="font-medium tabular-nums text-foreground">{done}</span> de {STAGES.length} etapas
        </span>
        <span
          className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium ${
            finished ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400' : failed ? 'border-rose-500/40 text-rose-600 dark:text-rose-400' : 'border-primary/40 text-primary'
          }`}
        >
          <motion.span className={`size-1.5 rounded-full ${finished ? 'bg-emerald-500' : failed ? 'bg-rose-500' : 'bg-primary'}`} animate={{ opacity: finished || failed ? 1 : [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          {finished ? 'Concluído' : failed ? 'Falhou' : 'Em andamento'}
        </span>
      </div>
    </div>
  )
}
