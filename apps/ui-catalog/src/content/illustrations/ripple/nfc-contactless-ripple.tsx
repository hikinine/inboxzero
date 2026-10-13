'use client'

import { useEffect, useState } from 'react'
import { Check, Nfc } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "NFC Contactless Ripple": pagamento por aproximação. O cartão desliza até a maquininha, os arcos de contactless
// ondulam do cartão em direção ao leitor, a tela passa de "Aproxime" para "Processando" e "Aprovado" com um anel de
// confirmação; o cartão recua e o próximo valor aparece na tela.
type Phase = 'idle' | 'reading' | 'approved'
const AMOUNTS = ['R$ 32,90', 'R$ 148,00', 'R$ 9,50', 'R$ 276,40'] as const

export default function NfcContactlessRipple() {
  const [k, setK] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    const a = setTimeout(() => setPhase('reading'), 900)
    const b = setTimeout(() => setPhase('approved'), 2500)
    const c = setTimeout(() => {
      setPhase('idle')
      setK((v) => (v + 1) % AMOUNTS.length)
    }, 4300)
    return () => [a, b, c].forEach(clearTimeout)
  }, [k])

  const near = phase !== 'idle'

  return (
    <div className="relative h-[300px] w-[440px] overflow-hidden text-foreground">
      {/* maquininha */}
      <div className="absolute right-[48px] top-[34px] flex h-[232px] w-[142px] flex-col rounded-[22px] border bg-card p-3 shadow-xl">
        <div className={cn('relative flex h-[108px] flex-col items-center justify-center overflow-hidden rounded-xl transition-colors duration-500', phase === 'approved' ? 'bg-emerald-500 text-white' : 'bg-muted')}>
          <AnimatePresence mode="wait" initial={false}>
            {phase === 'idle' && (
              <motion.div key="idle" className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-[10px] text-muted-foreground">Valor</p>
                <p className="text-lg font-bold tabular-nums">{AMOUNTS[k]}</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <Nfc className="size-3" /> Aproxime
                </p>
              </motion.div>
            )}
            {phase === 'reading' && (
              <motion.div key="reading" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="size-1.5 rounded-full bg-foreground" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: i * 0.12, repeat: Infinity }} />
                  ))}
                </span>
                <p className="mt-2 text-[11px] font-medium">Processando</p>
              </motion.div>
            )}
            {phase === 'approved' && (
              <motion.div key="ok" className="flex flex-col items-center" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                <span className="relative flex size-9 items-center justify-center rounded-full bg-white/20">
                  <Check className="size-5" strokeWidth={3} />
                  <motion.span className="absolute inset-0 rounded-full border-2 border-white" initial={{ scale: 1, opacity: 1 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
                </span>
                <p className="mt-1.5 text-xs font-semibold">Aprovado</p>
                <p className="text-[10px] opacity-90 tabular-nums">{AMOUNTS[k]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-3 grid flex-1 grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="rounded-md bg-muted" />
          ))}
        </div>
        <span className="absolute -left-1 top-[46px] h-10 w-1 rounded-l bg-border" />
      </div>

      {/* cartão + ondas */}
      <motion.div
        className="absolute left-[28px] top-[92px]"
        animate={{ x: near ? 72 : 0, rotate: near ? -4 : -12, y: near ? -6 : 10 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      >
        <div className="relative h-[112px] w-[176px] overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-3 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 size-32 rounded-full bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="h-6 w-8 rounded-md bg-gradient-to-br from-amber-200 to-amber-400" />
            <Nfc className="size-5 opacity-90" />
          </div>
          <p className="mt-4 font-mono text-xs tracking-widest">•••• 4821</p>
          <p className="mt-1 text-[10px] opacity-80">MARINA A COSTA</p>
        </div>
        {/* arcos de aproximação */}
        <svg viewBox="0 0 80 112" className="absolute -right-[64px] top-0 h-[112px] w-[80px] overflow-visible" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d="M 6 34 A 26 26 0 0 1 6 78"
              fill="none"
              stroke="rgb(16 185 129)"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: 'view-box', transformOrigin: '0px 56px' }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={phase === 'reading' ? { opacity: [0, 1, 0], scale: [0.6, 2.2] } : { opacity: 0, scale: 0.6 }}
              transition={phase === 'reading' ? { duration: 1, delay: i * 0.25, repeat: Infinity, ease: 'easeOut' } : { duration: 0.2 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}
