'use client'

import { useEffect, useState } from 'react'
import { Activity, Heart } from 'lucide-react'
import { motion } from 'motion/react'

// "Heartbeat Ripple": coração batendo em "tum-tum" (duas contrações por ciclo) e, a cada contração, um anel se abre —
// o primeiro mais forte, o segundo mais fraco. Embaixo, um traçado de ECG corre continuamente no mesmo ritmo, com o
// pico passando pela linha de leitura no instante da batida; o BPM oscila de leve.
const BEAT = 0.85 // s por batimento (~70 bpm)
const SEG = 120 // largura de um batimento no traçado
const ECG = Array.from({ length: 6 }, (_, k) => {
  const o = k * SEG
  return `M${o} 30 L${o + 30} 30 L${o + 36} 25 L${o + 42} 30 L${o + 50} 30 L${o + 54} 36 L${o + 60} 4 L${o + 66} 46 L${o + 72} 30 L${o + 86} 30 Q${o + 94} 19 ${o + 102} 30 L${o + 120} 30`
}).join(' ')

const BPM = [70, 71, 71, 72, 70, 69, 70, 72, 73, 71]

export default function HeartbeatRipple() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % BPM.length), BEAT * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex h-[320px] w-[360px] flex-col items-center text-foreground">
      <div className="relative mt-6 flex size-[180px] items-center justify-center">
        {[
          { delay: 0, strength: 0.55, to: 2.3 },
          { delay: 0.22, strength: 0.3, to: 1.8 },
        ].map((r, k) => (
          <motion.span
            key={k}
            className="absolute size-20 rounded-full border-2 border-rose-500"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, r.to], opacity: [r.strength, 0] }}
            transition={{ duration: BEAT, delay: r.delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.span className="absolute size-24 rounded-full bg-rose-500/15 blur-xl" animate={{ opacity: [0.4, 1, 0.5, 0.8, 0.4] }} transition={{ duration: BEAT, times: [0, 0.12, 0.26, 0.36, 1], repeat: Infinity }} />
        <motion.span
          className="relative text-rose-500"
          animate={{ scale: [1, 1.24, 1, 1.13, 1] }}
          transition={{ duration: BEAT, times: [0, 0.12, 0.26, 0.36, 1], repeat: Infinity, ease: 'easeOut' }}
        >
          <Heart className="size-16 fill-rose-500" />
        </motion.span>
      </div>

      {/* ECG */}
      <div className="relative mt-2 h-[52px] w-[300px] overflow-hidden rounded-lg border bg-card [mask-image:linear-gradient(to_right,transparent,black_25%,black)]">
        <motion.svg viewBox={`0 0 ${SEG * 6} 50`} className="absolute left-0 top-0.5 h-[50px]" style={{ width: SEG * 6 }} animate={{ x: [0, -SEG] }} transition={{ duration: BEAT, repeat: Infinity, ease: 'linear' }} aria-hidden>
          <path d={ECG} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="text-rose-500" />
        </motion.svg>
        <span className="absolute inset-y-0 left-[180px] w-px bg-rose-500/40" />
      </div>

      <div className="mt-3 flex items-center gap-3 font-mono text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Activity className="size-3.5 text-rose-500" /> ritmo sinusal
        </span>
        <span className="text-lg font-semibold tabular-nums text-foreground">{BPM[i]}</span>
        <span className="-ml-2 text-[10px] text-muted-foreground">bpm</span>
      </div>
    </div>
  )
}
