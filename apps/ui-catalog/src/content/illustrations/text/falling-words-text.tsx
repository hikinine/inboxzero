'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Falling Words Text": as palavras do título caem do alto girando, quicam com mola e se encaixam no lugar uma a
// uma; o subtítulo aparece, segura e então a "gravidade" leva tudo para baixo com giros aleatórios — e a próxima
// frase despenca do céu.
const HEADLINES = [
  { words: ['Seu', 'negócio', 'no', 'piloto', 'automático.'], accent: 3, sub: 'Automações que trabalham enquanto você dorme.' },
  { words: ['Venda', 'mais', 'com', 'menos', 'esforço.'], accent: 1, sub: 'Funis, cobranças e follow-ups no mesmo lugar.' },
  { words: ['Cada', 'cliente', 'no', 'momento', 'certo.'], accent: 3, sub: 'Mensagens disparadas pelo comportamento de cada um.' },
] as const

// pseudoaleatório determinístico
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

type Phase = 'in' | 'out'

export default function FallingWordsText() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('in')

  useEffect(() => {
    const a = setTimeout(() => setPhase('out'), 3600)
    const b = setTimeout(() => {
      setIdx((v) => (v + 1) % HEADLINES.length)
      setPhase('in')
    }, 4700)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [idx])

  const h = HEADLINES[idx]!
  return (
    <div className="relative flex h-[280px] w-[460px] flex-col items-center justify-center overflow-hidden text-center text-foreground">
      <h2 key={idx} className="flex max-w-[400px] flex-wrap justify-center gap-x-2.5 gap-y-1 text-4xl font-bold tracking-tight">
        {h.words.map((w, i) => (
          <motion.span
            key={w + i}
            className={cn('inline-block', i === h.accent && 'bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent')}
            initial={{ y: -260, rotate: (rnd(i, idx) - 0.5) * 70, opacity: 0 }}
            animate={
              phase === 'in'
                ? { y: 0, rotate: 0, opacity: 1 }
                : { y: 320, rotate: (rnd(i, idx + 7) - 0.5) * 120, opacity: 0 }
            }
            transition={
              phase === 'in'
                ? { type: 'spring', stiffness: 260, damping: 13, mass: 0.9, delay: 0.15 + i * 0.16 }
                : { duration: 0.75, ease: [0.55, 0, 1, 0.45], delay: rnd(i, idx + 3) * 0.3 }
            }
          >
            {w}
          </motion.span>
        ))}
      </h2>
      <motion.p
        key={`s${idx}`}
        className="mt-4 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 8 }}
        animate={phase === 'in' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.45, delay: phase === 'in' ? 0.15 + h.words.length * 0.16 + 0.2 : 0 }}
      >
        {h.sub}
      </motion.p>
      {/* chão */}
      <motion.div
        className="absolute bottom-10 h-px w-40 bg-gradient-to-r from-transparent via-border to-transparent"
        animate={{ scaleX: phase === 'in' ? 1 : 1.6, opacity: phase === 'in' ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
