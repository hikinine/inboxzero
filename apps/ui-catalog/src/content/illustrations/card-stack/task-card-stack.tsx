'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Flag } from 'lucide-react'

// "Task Card Stack": o card da frente é concluído (check desenhado + título riscado) e vai para o fundo da pilha;
// o próximo assume a frente. Loop contínuo.
const TASKS = [
  { id: 't1', title: 'Revisar proposta da Nexa', project: 'Comercial', due: 'hoje' },
  { id: 't2', title: 'Publicar landing da Black Friday', project: 'Marketing', due: 'amanhã' },
  { id: 't3', title: 'Configurar webhook do Pix', project: 'Produto', due: 'qui' },
  { id: 't4', title: 'Responder tickets prioritários', project: 'Suporte', due: 'hoje' },
] as const

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function TaskCardStack() {
  const [head, setHead] = useState(0)
  const [done, setDone] = useState(false)
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setDone(false)
        await sleep(1400)
        if (cancelled) return
        setDone(true)
        await sleep(1000)
        if (cancelled) return
        setCompleted((c) => c + 1)
        setHead((h) => (h + 1) % TASKS.length)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = [0, 1, 2].map((i) => TASKS[(head + i) % TASKS.length]!)

  return (
    <div className="w-[340px] text-foreground">
      <div className="relative h-[200px]">
        <AnimatePresence initial={false}>
          {visible.map((t, depth) => {
            const isDone = depth === 0 && done
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -46, scale: 0.86 }}
                animate={{ opacity: 1 - depth * 0.22, y: -depth * 14, scale: 1 - depth * 0.05, zIndex: 10 - depth }}
                exit={{ opacity: 0, y: -40, scale: 0.84, zIndex: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="absolute inset-x-0 bottom-0 rounded-xl border bg-card p-4 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${isDone ? 'border-emerald-500 bg-emerald-500' : 'border-border bg-background'}`}>
                    <svg viewBox="0 0 16 16" className="size-3.5 text-white" aria-hidden>
                      <motion.path
                        d="M3.5 8.5 L6.5 11.5 L12.5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={false}
                        animate={{ pathLength: isDone ? 1 : 0, opacity: isDone ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="relative inline-block max-w-full">
                      <span className={`block truncate text-sm font-medium transition-colors duration-300 ${isDone ? 'text-muted-foreground' : ''}`}>{t.title}</span>
                      <motion.span className="absolute left-0 top-1/2 h-px w-full origin-left bg-muted-foreground" initial={false} animate={{ scaleX: isDone ? 1 : 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Flag className="size-3" />
                        {t.project}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3" />
                        {t.due}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Concluídas hoje</span>
        <span className="font-medium tabular-nums text-foreground">{completed}</span>
      </div>
    </div>
  )
}
