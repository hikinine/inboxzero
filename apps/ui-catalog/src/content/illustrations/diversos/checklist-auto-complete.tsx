'use client'

import { useEffect, useState } from 'react'
import { Loader, PartyPopper } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Checklist Auto Complete": checklist de onboarding que se completa sozinho. Cada etapa gira um carregador, o
// círculo vira verde e o check é desenhado (pathLength), o texto apaga e risca, a barra e a fração avançam; com tudo
// pronto o cabeçalho comemora, segura e a lista volta ao início.
const STEPS = [
  { title: 'Criar sua conta', hint: 'E-mail confirmado' },
  { title: 'Personalizar a loja', hint: 'Logo, cores e domínio' },
  { title: 'Cadastrar produtos', hint: '12 produtos importados' },
  { title: 'Configurar pagamentos', hint: 'Pix, cartão e boleto' },
  { title: 'Publicar a loja', hint: 'lojadamarina.com.br' },
] as const
const PER = 3 // ticks por etapa
const TOTAL = 1 + STEPS.length * PER + 8

export default function ChecklistAutoComplete() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % TOTAL), 340)
    return () => clearInterval(id)
  }, [])
  const status = (k: number) => (t < 1 + k * PER ? 'todo' : t === 1 + k * PER ? 'loading' : 'done')
  const doneCount = STEPS.filter((_, k) => status(k) === 'done').length
  const all = doneCount === STEPS.length

  return (
    <div className="w-[380px] rounded-2xl border bg-card p-5 text-foreground shadow-sm">
      <div className="flex h-10 items-center justify-between">
        <AnimatePresence mode="wait" initial={false}>
          {all ? (
            <motion.div key="all" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
              <motion.span animate={{ rotate: [0, -15, 15, -8, 0] }} transition={{ duration: 0.8 }}>
                <PartyPopper className="size-5 text-amber-500" />
              </motion.span>
              <div>
                <p className="text-sm font-semibold">Tudo pronto!</p>
                <p className="text-[11px] text-muted-foreground">Sua loja já está no ar.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="todo" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <p className="text-sm font-semibold">Primeiros passos</p>
              <p className="text-[11px] text-muted-foreground">Complete para começar a vender</p>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {doneCount}/{STEPS.length}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div className={cn('h-full rounded-full', all ? 'bg-emerald-500' : 'bg-primary')} animate={{ width: `${(doneCount / STEPS.length) * 100}%` }} transition={{ type: 'spring', stiffness: 140, damping: 22 }} />
      </div>
      <ul className="mt-4 space-y-1">
        {STEPS.map((s, k) => {
          const st = status(k)
          return (
            <li key={s.title} className={cn('flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors', st === 'loading' && 'bg-muted/70')}>
              <span className={cn('relative flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300', st === 'done' ? 'border-emerald-500 bg-emerald-500' : 'border-muted-foreground/30')}>
                {st === 'loading' && (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}>
                    <Loader className="size-3.5 text-muted-foreground" />
                  </motion.span>
                )}
                {st === 'done' && (
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                    <motion.path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                  </svg>
                )}
              </span>
              <div className="min-w-0">
                <p className={cn('relative w-fit text-sm transition-colors duration-300', st === 'done' ? 'text-muted-foreground' : 'font-medium')}>
                  {s.title}
                  <motion.span className="absolute left-0 top-1/2 h-px w-full origin-left bg-muted-foreground" initial={false} animate={{ scaleX: st === 'done' ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.15 }} />
                </p>
                <p className="truncate text-[11px] text-muted-foreground">{s.hint}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
