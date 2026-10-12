'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bot, ChartColumn, PenLine, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Agent Steps Chat": o usuário pergunta e o agente mostra o raciocínio como uma linha do tempo de passos —
// buscar → analisar → responder. O passo ativo tem barra indeterminada; ao concluir, o check é desenhado, o tempo
// aparece e o conector vertical se preenche. No fim entra a resposta com barras por canal. Loop.
const STEPS: ReadonlyArray<{ label: string; detail: string; Icon: LucideIcon; ms: number; took: string }> = [
  { label: 'Buscando pedidos de março', detail: 'orders · 1.284 registros', Icon: Search, ms: 1100, took: '0,8s' },
  { label: 'Analisando receita por canal', detail: 'agrupando por origem do lead', Icon: ChartColumn, ms: 1300, took: '1,2s' },
  { label: 'Redigindo resposta', detail: 'resumo + comparação', Icon: PenLine, ms: 900, took: '0,6s' },
]
const CHANNELS = [
  { name: 'WhatsApp', pct: 54, tone: 'bg-emerald-500' },
  { name: 'E-mail', pct: 28, tone: 'bg-sky-500' },
  { name: 'Site', pct: 18, tone: 'bg-violet-500' },
]

type Phase = 'idle' | 'ask' | 'work' | 'answer'
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function AgentStepsChat() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [done, setDone] = useState(0)
  const [running, setRunning] = useState(-1)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setPhase('idle')
        setDone(0)
        setRunning(-1)
        await sleep(500)
        setPhase('ask')
        await sleep(800)
        setPhase('work')
        for (let i = 0; i < STEPS.length; i++) {
          if (cancelled) return
          setRunning(i)
          await sleep(STEPS[i].ms)
          setRunning(-1)
          setDone(i + 1)
          await sleep(280)
        }
        setPhase('answer')
        await sleep(3800)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[360px] w-[420px] flex-col rounded-2xl border bg-card text-foreground">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Bot className="size-4" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">Agente de vendas</div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" /> online
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div key="ask" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-[13px] text-primary-foreground">
              Qual foi a receita de março por canal?
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === 'work' || phase === 'answer') && (
            <motion.div key="trace" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border bg-background/60 p-3">
              {STEPS.map((s, i) => {
                const isDone = i < done
                const isRunning = i === running
                return (
                  <div key={s.label} className="relative flex gap-3">
                    {i < STEPS.length - 1 && (
                      <div className="absolute left-[13px] top-7 h-[calc(100%-18px)] w-px bg-border">
                        <motion.div className="h-full w-full origin-top bg-emerald-500" initial={false} animate={{ scaleY: isDone ? 1 : 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} />
                      </div>
                    )}
                    <span
                      className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isDone ? 'border-emerald-500 bg-emerald-500 text-white' : isRunning ? 'border-primary bg-card text-primary' : 'border-border bg-card text-muted-foreground'
                      }`}
                    >
                      {isDone ? (
                        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                          <motion.path d="M3.5 8.5 L6.5 11.5 L12.5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                        </svg>
                      ) : (
                        <s.Icon className="size-3.5" />
                      )}
                    </span>
                    <div className={`min-w-0 flex-1 ${i < STEPS.length - 1 ? 'pb-3' : ''}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-medium ${!isDone && !isRunning ? 'text-muted-foreground' : ''}`}>{s.label}</span>
                        {isDone && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] text-muted-foreground">
                            {s.took}
                          </motion.span>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{s.detail}</div>
                      {isRunning && (
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                          <motion.div className="h-full w-1/2 rounded-full bg-primary" animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }} />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'answer' && (
            <motion.div key="answer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[88%] rounded-2xl rounded-bl-sm border bg-card px-3 py-2 text-[13px]">
              Receita de março: <strong className="font-semibold">R$ 182.400</strong> (+9% vs. fevereiro).
              <div className="mt-2 space-y-1">
                {CHANNELS.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2 text-[10px]">
                    <span className="w-14 text-muted-foreground">{c.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div className={`h-full rounded-full ${c.tone}`} initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: 'easeOut' }} />
                    </div>
                    <span className="w-7 text-right font-medium tabular-nums">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
