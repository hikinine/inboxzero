'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Highlighter } from 'lucide-react'
import { motion } from 'motion/react'

// "Highlight Text": um marcador amarelo desenha, da esquerda para a direita, atrás de três trechos do parágrafo, um
// de cada vez (background-size animado com box-decoration-break: clone, então funciona mesmo quando o trecho quebra
// de linha). Depois de uma pausa as marcações somem e o ciclo recomeça.
type Step = 0 | 1 | 2 | 3 | 4
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function Mark({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      className="box-decoration-clone rounded-sm bg-gradient-to-r from-amber-300/80 to-amber-300/80 bg-no-repeat px-0.5 dark:from-amber-400/40 dark:to-amber-400/40"
      style={{ backgroundPosition: '0 0' }}
      initial={{ backgroundSize: '0% 100%' }}
      animate={{ backgroundSize: on ? '100% 100%' : '0% 100%' }}
      transition={{ duration: on ? 0.9 : 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  )
}

export default function HighlightText() {
  const [step, setStep] = useState<Step>(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setStep(0)
        await sleep(900)
        if (cancelled) return
        setStep(1)
        await sleep(1300)
        if (cancelled) return
        setStep(2)
        await sleep(1300)
        if (cancelled) return
        setStep(3)
        await sleep(1200)
        if (cancelled) return
        setStep(4)
        await sleep(2400)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const drawing = step >= 1 && step <= 3

  return (
    <div className="relative w-[460px] rounded-2xl border bg-card p-7 text-foreground">
      <motion.span
        aria-hidden
        className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400"
        animate={{ rotate: drawing ? [-12, 12, -12] : 0, scale: drawing ? 1.05 : 1 }}
        transition={{ duration: 0.6, repeat: drawing ? Infinity : 0, ease: 'easeInOut' }}
      >
        <Highlighter className="size-4" />
      </motion.span>
      <p className="max-w-[360px] text-[22px] font-medium leading-[1.6] tracking-tight">
        Com a automação certa, seu time <Mark on={step >= 1}>responde em segundos</Mark>, o funil <Mark on={step >= 2}>fecha sozinho</Mark> e você finalmente <Mark on={step >= 3}>dorme tranquilo</Mark>.
      </p>
      <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${step >= i ? 'bg-amber-400' : 'bg-border'}`} />
        ))}
        <span className="ml-1">{step === 0 ? 'Lendo…' : step === 4 ? '3 destaques' : `Destacando ${step} de 3`}</span>
      </div>
    </div>
  )
}
