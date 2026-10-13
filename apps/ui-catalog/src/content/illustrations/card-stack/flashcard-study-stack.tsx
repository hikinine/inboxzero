'use client'

import { useEffect, useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Flashcard Study Stack": baralho de revisão. O card da frente mostra a pergunta, vira em 3D (rotateY) revelando a
// resposta e então é enviado para a pilha "Acertei" (direita) ou "Revisar" (esquerda); os placares sobem e a barra de
// progresso do baralho avança.
interface Flashcard {
  topic: string
  q: string
  a: string
  known: boolean
}

const CARDS: readonly Flashcard[] = [
  { topic: 'Geografia', q: 'Qual é a capital de Pernambuco?', a: 'Recife', known: true },
  { topic: 'Literatura', q: 'Quem escreveu “Dom Casmurro”?', a: 'Machado de Assis', known: true },
  { topic: 'História', q: 'Em que ano foi proclamada a República no Brasil?', a: '1889', known: false },
  { topic: 'Ciências', q: 'Qual é o maior bioma brasileiro?', a: 'Amazônia', known: true },
  { topic: 'Matemática', q: 'Quanto é 15% de R$ 240,00?', a: 'R$ 36,00', known: false },
]
const N = CARDS.length

export default function FlashcardStudyStack() {
  const [head, setHead] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState({ ok: 0, review: 0 })

  useEffect(() => {
    const a = setTimeout(() => setFlipped(true), 1300)
    const b = setTimeout(() => {
      const card = CARDS[head]!
      setFlipped(false)
      setHead((h) => (h + 1) % N)
      setScore((s) => (head === N - 1 ? { ok: 0, review: 0 } : card.known ? { ...s, ok: s.ok + 1 } : { ...s, review: s.review + 1 }))
    }, 3100)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [head])

  const visible = [0, 1, 2].map((d) => CARDS[(head + d) % N]!)

  return (
    <div className="relative h-[320px] w-[440px] text-foreground" style={{ perspective: 900 }}>
      {/* pilhas laterais */}
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
        <span className="flex size-10 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <RotateCcw className="size-4" />
        </span>
        <span className="text-[10px] text-muted-foreground">Revisar</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={score.review} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="text-lg font-bold tabular-nums">
            {score.review}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
        <span className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Check className="size-4" />
        </span>
        <span className="text-[10px] text-muted-foreground">Acertei</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={score.ok} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="text-lg font-bold tabular-nums">
            {score.ok}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {visible.map((c, depth) => {
          const front = depth === 0
          return (
            <motion.div
              key={c.q}
              initial={{ opacity: 0, y: 3 * 10, scale: 0.88 }}
              animate={{ opacity: 1 - depth * 0.25, y: depth * 10, scale: 1 - depth * 0.05, zIndex: 10 - depth, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: c.known ? 190 : -190, y: -10, rotate: c.known ? 14 : -14, scale: 0.6, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="absolute left-[100px] top-[50px] h-[190px] w-[240px]"
            >
              <motion.div
                className="relative size-full"
                style={{ transformStyle: 'preserve-3d' }}
                initial={false}
                animate={{ rotateY: front && flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* frente: pergunta */}
                <div className="absolute inset-0 flex flex-col rounded-2xl border bg-card p-4 shadow-lg" style={{ backfaceVisibility: 'hidden' }}>
                  <span className="w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{c.topic}</span>
                  <p className="my-auto text-center text-base font-semibold leading-snug">{c.q}</p>
                  <p className="text-center text-[10px] text-muted-foreground">Toque para virar</p>
                </div>
                {/* verso: resposta */}
                <div
                  className={cn('absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border bg-card p-4 shadow-lg', c.known ? 'border-emerald-500/40' : 'border-amber-500/40')}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className={cn('absolute inset-0', c.known ? 'bg-emerald-500/10' : 'bg-amber-500/10')} />
                  <span className="relative text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Resposta</span>
                  <p className="relative mt-1 text-center text-2xl font-bold tracking-tight">{c.a}</p>
                  <span className={cn('relative mt-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white', c.known ? 'bg-emerald-500' : 'bg-amber-500')}>
                    {c.known ? 'Você acertou' : 'Rever amanhã'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* progresso do baralho */}
      <div className="absolute inset-x-[100px] bottom-6">
        <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
          <span>Baralho: Conhecimentos gerais</span>
          <span className="tabular-nums">
            {head + 1}/{N}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${((head + 1) / N) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        </div>
      </div>
    </div>
  )
}
