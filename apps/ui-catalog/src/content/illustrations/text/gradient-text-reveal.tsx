'use client'

import { motion } from 'motion/react'

// "Gradient Text Reveal": cada letra tem uma cor interpolada entre a primária e a cor do texto (degradê ao longo da
// frase) e se revela uma a uma com desfoque e subida; depois some na mesma ordem. Loop.
const TEXT = 'Crie, publique e escale.'
const CYCLE = 5.4
const LETTERS = Array.from(TEXT)

export default function GradientTextReveal() {
  const n = LETTERS.length
  return (
    <div className="max-w-xl text-center">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl" aria-label={TEXT}>
        {LETTERS.map((ch, i) => {
          const p = i / Math.max(1, n - 1)
          const s = (0.05 + i * 0.07) / CYCLE
          const d = 0.5 / CYCLE
          const f = (3.5 + i * 0.03) / CYCLE
          const e = 0.35 / CYCLE
          return (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              style={{ color: `color-mix(in oklab, var(--primary) ${Math.round((1 - p) * 100)}%, var(--foreground))` }}
              animate={{
                opacity: [0, 0, 1, 1, 0, 0],
                y: [14, 14, 0, 0, -8, -8],
                filter: ['blur(8px)', 'blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)', 'blur(6px)'],
              }}
              transition={{ duration: CYCLE, times: [0, s, s + d, f, f + e, 1], repeat: Infinity, ease: 'easeOut' }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          )
        })}
      </h2>
      <motion.div
        className="mx-auto mt-4 h-1 w-40 origin-left rounded-full bg-gradient-to-r from-primary to-foreground/60"
        animate={{ scaleX: [0, 0, 1, 1, 0, 0] }}
        transition={{ duration: CYCLE, times: [0, 0.3, 0.45, 0.66, 0.78, 1], repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
