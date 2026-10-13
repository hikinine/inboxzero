'use client'

import { useEffect, useState } from 'react'
import { Check, Globe, Loader } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Rocket Deploy Launch": deploy como lançamento de foguete. O pipeline roda Build → Testes → Deploy (carregador e
// check em cada etapa), a contagem 3, 2, 1 treme o foguete com a chama acesa, ele decola deixando fumaça na base e o
// selo "Em produção" aparece com a versão; depois o foguete volta pousando por baixo e o pipeline reinicia.
const STEPS = [
  { title: 'Build', detail: 'next build · 42 s' },
  { title: 'Testes', detail: '128 passaram' },
  { title: 'Deploy', detail: 'região gru1' },
] as const
const TICK = 300
const TOTAL = 34
const COUNT_AT = 14
const LAUNCH_AT = 17
const RETURN_AT = 30

const STARS = Array.from({ length: 22 }, (_, i) => ({ x: (i * 53) % 230, y: (i * 37) % 250, s: i % 3 === 0 ? 2 : 1 }))

export default function RocketDeployLaunch() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % TOTAL), TICK)
    return () => clearInterval(id)
  }, [])

  const status = (k: number) => {
    if (t >= RETURN_AT) return 'todo'
    const start = 2 + k * 4
    return t < start ? 'todo' : t < start + 4 ? 'run' : 'done'
  }
  const counting = t >= COUNT_AT && t < LAUNCH_AT
  const launched = t >= LAUNCH_AT && t < RETURN_AT
  const returning = t >= RETURN_AT
  const success = t >= LAUNCH_AT + 3 && t < RETURN_AT
  const flame = counting || launched

  return (
    <div className="flex h-[300px] w-[460px] overflow-hidden rounded-2xl border bg-card text-foreground shadow-sm">
      {/* pipeline */}
      <div className="flex w-[196px] shrink-0 flex-col border-r p-4">
        <p className="text-sm font-semibold">Deploy · main</p>
        <p className="font-mono text-[10px] text-muted-foreground">a3f9c21 · Ajusta frete grátis</p>
        <ol className="mt-4 space-y-3">
          {STEPS.map((s, k) => {
            const st = status(k)
            return (
              <li key={s.title} className="flex items-start gap-2.5">
                <span className={cn('mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors', st === 'done' ? 'border-emerald-500 bg-emerald-500 text-white' : st === 'run' ? 'border-sky-500 text-sky-500' : 'border-muted-foreground/30')}>
                  {st === 'done' && <Check className="size-3" strokeWidth={3} />}
                  {st === 'run' && (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}>
                      <Loader className="size-3" />
                    </motion.span>
                  )}
                </span>
                <div>
                  <p className={cn('text-xs font-medium', st === 'todo' && 'text-muted-foreground')}>{s.title}</p>
                  <p className="text-[10px] text-muted-foreground">{st === 'todo' ? 'aguardando' : st === 'run' ? 'executando…' : s.detail}</p>
                </div>
              </li>
            )
          })}
        </ol>
        <div className="mt-auto h-12">
          <AnimatePresence mode="wait">
            {counting && (
              <motion.p key={`c${t}`} className="text-3xl font-black tabular-nums" initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {LAUNCH_AT - t}
              </motion.p>
            )}
            {success && (
              <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Em produção · v2.4.1
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Globe className="size-3" /> lojadaana.com.br
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* cena */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent">
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-foreground/50"
            style={{ left: s.x + 16, top: s.y, width: s.s, height: s.s }}
            animate={launched ? { y: [0, 60], opacity: [0.8, 0.2] } : { y: 0, opacity: 0.5 }}
            transition={launched ? { duration: 0.6, repeat: Infinity, ease: 'linear', delay: (i % 5) * 0.1 } : { duration: 0.3 }}
          />
        ))}
        {/* plataforma */}
        <div className="absolute inset-x-6 bottom-6 h-2 rounded-full bg-muted" />
        <div className="absolute bottom-8 left-1/2 h-6 w-1.5 -translate-x-[46px] rounded-sm bg-muted-foreground/30" />
        {/* fumaça */}
        {launched &&
          [-46, -22, 0, 22, 46].map((dx, i) => (
            <motion.span
              key={i}
              className="absolute bottom-6 left-1/2 size-10 -ml-5 rounded-full bg-muted-foreground/25 blur-[2px]"
              initial={{ x: 0, scale: 0.3, opacity: 0.9 }}
              animate={{ x: dx * 1.6, y: [-4, -16], scale: [0.3, 1.6], opacity: [0.9, 0] }}
              transition={{ duration: 1.4, delay: i * 0.05, ease: 'easeOut' }}
            />
          ))}
        {/* foguete */}
        <motion.div
          key={returning ? 'return' : 'main'}
          className="absolute bottom-8 left-1/2 -ml-[26px] w-[52px]"
          initial={returning ? { y: 260 } : false}
          animate={launched ? { y: -360, x: 0 } : counting ? { x: [-1.5, 1.5, -1.5], y: 0 } : { y: 0, x: 0 }}
          transition={
            launched
              ? { duration: 1.6, ease: [0.5, 0, 0.9, 0.6] }
              : counting
                ? { duration: 0.1, repeat: Infinity }
                : returning
                  ? { type: 'spring', stiffness: 60, damping: 14 }
                  : { duration: 0.2 }
          }
        >
          <svg viewBox="0 0 52 120" className="w-[52px] overflow-visible" aria-hidden>
            {/* chama */}
            {flame && (
              <motion.path
                d="M 16 92 Q 26 140 36 92 Z"
                className="fill-amber-400"
                style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
                animate={{ scaleY: launched ? [1, 1.5, 1.2, 1.6] : [0.5, 0.8, 0.6], scaleX: [1, 0.85, 1] }}
                transition={{ duration: 0.18, repeat: Infinity, repeatType: 'mirror' }}
              />
            )}
            {flame && (
              <motion.path
                d="M 20 92 Q 26 122 32 92 Z"
                className="fill-rose-500"
                style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
                animate={{ scaleY: launched ? [1, 1.4, 1.1] : [0.5, 0.7, 0.55] }}
                transition={{ duration: 0.14, repeat: Infinity, repeatType: 'mirror' }}
              />
            )}
            <path d="M 12 66 L 2 94 L 14 90 Z" className="fill-rose-500" />
            <path d="M 40 66 L 50 94 L 38 90 Z" className="fill-rose-500" />
            <path d="M 26 2 C 44 18 42 60 38 92 L 14 92 C 10 60 8 18 26 2 Z" className="fill-card stroke-foreground" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 26 2 C 33 8 37 16 39 24 L 13 24 C 15 16 19 8 26 2 Z" className="fill-rose-500" />
            <circle cx="26" cy="46" r="8" className="fill-sky-400 stroke-foreground" strokeWidth="2.5" />
            <path d="M 22 92 L 22 98 L 30 98 L 30 92" className="fill-muted-foreground" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
