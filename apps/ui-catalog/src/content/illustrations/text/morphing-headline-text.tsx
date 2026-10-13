'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// "Morphing Headline Text": a palavra em destaque se transforma na próxima letra a letra — só as posições que mudam
// trocam, com desfoque cruzado e leve subida; as letras em comum (o prefixo "con") ficam paradas e a largura de cada
// posição se reajusta com layout animation. Cada posição tem seu tom no degradê magenta → azul.
const WORDS = ['conversas', 'conversões', 'contatos', 'contratos', 'conquistas'] as const
const MAX = Math.max(...WORDS.map((w) => w.length))

export default function MorphingHeadlineText() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200)
    return () => clearInterval(t)
  }, [])
  const word = WORDS[i]!

  return (
    <div className="flex h-[260px] w-[480px] flex-col items-center justify-center text-center text-foreground">
      <span className="rounded-full border px-3 py-1 text-[11px] font-medium text-muted-foreground">CRM + WhatsApp</span>
      <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">
        Mais{' '}
        <span className="relative inline-flex whitespace-pre">
          {Array.from({ length: MAX }, (_, k) => {
            const ch = word[k] ?? ''
            return (
              <motion.span key={k} layout="size" className="relative inline-flex justify-center overflow-visible" transition={{ duration: 0.35, ease: 'easeInOut' }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  {ch && (
                    <motion.span
                      key={`${k}-${ch}`}
                      className="inline-block"
                      style={{ color: `hsl(${300 - k * 13} 75% 58%)` }}
                      initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
                      transition={{ duration: 0.45, delay: k * 0.035 }}
                    >
                      {ch}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            )
          })}
        </span>
        <br />
        para o seu time.
      </h2>
      <div className="mt-5 flex gap-1.5">
        {WORDS.map((w, k) => (
          <motion.span key={w} className="h-1 rounded-full bg-foreground" animate={{ width: k === i ? 20 : 6, opacity: k === i ? 1 : 0.2 }} />
        ))}
      </div>
    </div>
  )
}
