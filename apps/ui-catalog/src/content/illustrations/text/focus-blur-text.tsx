'use client'

import { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { motion } from 'motion/react'

// "Focus Blur Text": leitura guiada. Um ponto de foco percorre o parágrafo palavra por palavra: a palavra em foco
// fica nítida sobre uma pílula que desliza (layoutId), as vizinhas ficam levemente desfocadas e as distantes somem
// no desfoque. No fim tudo entra em foco, segura e a leitura recomeça.
const TEXT =
  'Em vez de responder cada cliente na mão, deixe a automação qualificar, agendar e cobrar. Você entra só quando a conversa realmente precisa de uma pessoa.'
const WORDS = TEXT.split(' ')
const HOLD = 8

export default function FocusBlurText() {
  const [f, setF] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setF((v) => (v >= WORDS.length + HOLD ? 0 : v + 1)), 300)
    return () => clearInterval(id)
  }, [])
  const reading = f < WORDS.length
  const progress = Math.min(f / WORDS.length, 1)

  return (
    <div className="flex h-[280px] w-[460px] flex-col justify-center gap-4 text-foreground">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpen className="size-3.5" />
        <span>Leitura guiada</span>
        <span className="ml-auto tabular-nums">{reading ? `${f + 1}/${WORDS.length} palavras` : 'concluída'}</span>
      </div>
      <p className="flex flex-wrap gap-x-[0.3em] gap-y-1 text-[22px] font-medium leading-snug tracking-tight">
        {WORDS.map((w, i) => {
          const d = Math.abs(i - f)
          const blur = reading ? Math.min(d * 1.6, 6) : 0
          const opacity = reading ? Math.max(1 - d * 0.18, 0.25) : 1
          return (
            <span key={i} className="relative">
              {reading && i === f && (
                <motion.span layoutId="fbt-focus" className="absolute -inset-x-1.5 -inset-y-0.5 rounded-md bg-primary/10 ring-1 ring-primary/30" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
              )}
              <motion.span
                className="relative inline-block"
                animate={{ filter: `blur(${blur}px)`, opacity, scale: reading && i === f ? 1.04 : 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {w}
              </motion.span>
            </span>
          )
        })}
      </p>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.3, ease: 'linear' }} />
      </div>
    </div>
  )
}
