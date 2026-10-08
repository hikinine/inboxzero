'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// "Word Rotate": uma palavra da frase troca com deslize vertical a cada 2s.
const WORDS = ['vendas', 'leads', 'atendimento', 'campanhas', 'cobranças']

export default function WordRotate() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="text-center text-foreground">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Automatize suas{' '}
        <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={WORDS[i]}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block rounded-md bg-primary px-2 text-primary-foreground"
            >
              {WORDS[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h2>
    </div>
  )
}
