'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Glitch Text": letreiro de status com falha digital. Enquanto o sinal está perdido o texto sofre rajadas de glitch:
// camadas ciano e rosa se separam (split RGB), fatias horizontais recortadas com clip-path saltam para os lados e
// linhas de varredura passam por cima. Uma rajada final troca o texto para "RECONECTADO", que fica estável até cair
// de novo.
const SLICES = [
  { top: 8, bottom: 70, x: [0, -14, 9, -5, 0] },
  { top: 38, bottom: 44, x: [0, 18, -10, 6, 0] },
  { top: 66, bottom: 12, x: [0, -9, 15, -12, 0] },
] as const

// roteiro: [texto, intensidade da rajada (0 = calmo)] — 1 passo = 260ms
const SCRIPT: ReadonlyArray<readonly ['lost' | 'ok', 0 | 1 | 2]> = [
  ['lost', 0], ['lost', 1], ['lost', 0], ['lost', 0], ['lost', 1], ['lost', 1], ['lost', 0], ['lost', 0], ['lost', 2], ['lost', 2],
  ['ok', 2], ['ok', 1], ['ok', 0], ['ok', 0], ['ok', 0], ['ok', 0], ['ok', 0], ['ok', 0], ['ok', 0], ['ok', 1], ['ok', 2],
]

export default function GlitchText() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % SCRIPT.length), 260)
    return () => clearInterval(id)
  }, [])
  const [state, level] = SCRIPT[step]!
  const text = state === 'lost' ? 'SINAL PERDIDO' : 'RECONECTADO'
  const g = level > 0
  const amp = level === 2 ? 1.8 : 1

  return (
    <div className="relative flex h-[260px] w-[460px] flex-col items-center justify-center overflow-hidden rounded-2xl border bg-card text-foreground">
      {/* linhas de varredura */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_3px,var(--border)_3px,var(--border)_4px)] opacity-40" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-foreground/5 to-transparent"
        animate={{ y: [-40, 280] }}
        transition={{ duration: 2.6, ease: 'linear', repeat: Infinity }}
      />

      <div className={cn('mb-4 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium', state === 'lost' ? 'border-rose-500/40 text-rose-600 dark:text-rose-400' : 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400')}>
        {state === 'lost' ? <WifiOff className="size-3" /> : <Wifi className="size-3" />}
        {state === 'lost' ? 'Gateway de pagamento fora do ar' : 'Gateway de pagamento operando'}
      </div>

      <div className="relative select-none font-mono text-[44px] font-black leading-none tracking-tight">
        {/* split RGB */}
        <motion.span
          aria-hidden
          className="absolute inset-0 text-cyan-500"
          animate={g ? { x: [0, -4 * amp, 3 * amp, -2 * amp, 0], opacity: 0.85 } : { x: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: 'linear' }}
        >
          {text}
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute inset-0 text-rose-500"
          animate={g ? { x: [0, 4 * amp, -3 * amp, 2 * amp, 0], y: [0, 1, -1, 0, 0], opacity: 0.85 } : { x: 0, y: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: 'linear' }}
        >
          {text}
        </motion.span>
        <span className={cn('relative', state === 'ok' && !g && 'text-emerald-600 dark:text-emerald-400')}>{text}</span>
        {/* fatias deslocadas */}
        {SLICES.map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute inset-0 bg-card"
            style={{ clipPath: `inset(${s.top}% 0 ${s.bottom}% 0)` }}
            animate={g ? { x: s.x.map((v) => v * amp), opacity: 1 } : { x: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'linear' }}
          >
            {text}
          </motion.span>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] text-muted-foreground">
        {state === 'lost' ? 'tentando reconectar…' : 'latência 42 ms · 99,98% uptime'}
      </p>
    </div>
  )
}
