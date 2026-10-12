'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'

// "Confetti Burst": o botão "Concluído" dispara uma explosão de confetes (retângulos e círculos coloridos) que sobem,
// giram e caem; o botão "aperta" e emite um anel a cada disparo. Loop com pausa.
const CYCLE = 2.8
const FLIGHT = 1.5
const COUNT = 28
const COLORS = ['bg-emerald-500', 'bg-amber-400', 'bg-sky-500', 'bg-rose-500', 'bg-violet-500', 'bg-orange-500']

// pseudo-aleatório determinístico
const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const PIECES = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2 + (rnd(i) - 0.5) * 0.5
  const dist = 80 + rnd(i + 7) * 90
  return {
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    color: COLORS[i % COLORS.length]!,
    round: i % 3 === 0,
    w: 6 + Math.round(rnd(i + 3) * 4),
    h: 8 + Math.round(rnd(i + 5) * 6),
    spin: 360 + rnd(i + 9) * 540,
    delay: rnd(i + 11) * 0.08,
  }
})

export default function ConfettiBurst() {
  return (
    <div className="relative flex h-[280px] w-[380px] items-center justify-center overflow-hidden text-foreground">
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute left-1/2 top-1/2 ${p.round ? 'rounded-full' : 'rounded-sm'} ${p.color}`}
          style={{ width: p.w, height: p.round ? p.w : p.h, marginLeft: -p.w / 2, marginTop: -p.h / 2 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ x: [0, p.dx * 0.75, p.dx], y: [0, p.dy * 0.75 - 40, p.dy + 70], opacity: [1, 1, 0], rotate: [0, p.spin * 0.6, p.spin], scale: [0.4, 1, 0.9] }}
          transition={{ duration: FLIGHT, times: [0, 0.45, 1], ease: ['easeOut', 'easeIn'], repeat: Infinity, repeatDelay: CYCLE - FLIGHT, delay: p.delay }}
        />
      ))}
      <motion.span
        className="absolute size-12 rounded-full border-2 border-emerald-500"
        animate={{ scale: [1, 3.2], opacity: [0.7, 0] }}
        transition={{ duration: 0.9, ease: 'easeOut', repeat: Infinity, repeatDelay: CYCLE - 0.9 }}
      />
      <motion.button
        type="button"
        className="relative z-10 flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30"
        animate={{ scale: [1, 0.9, 1.08, 1, 1] }}
        transition={{ duration: CYCLE, times: [0, 0.04, 0.12, 0.2, 1], repeat: Infinity, ease: 'easeOut' }}
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-white/25">
          <Check className="size-3.5" />
        </span>
        Concluído
      </motion.button>
    </div>
  )
}
