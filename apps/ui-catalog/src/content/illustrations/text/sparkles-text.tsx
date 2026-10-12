'use client'

import { motion } from 'motion/react'

// "Sparkles Text": brilhos de quatro pontas nascem, giram e somem em posições pseudo-aleatórias (semente fixa) ao
// redor e por cima do título, em cores alternadas. Cada brilho tem ritmo próprio, mas todos cabem num ciclo de 3,4s.
const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}
const TONES = ['text-amber-400', 'text-violet-400', 'text-sky-400', 'text-rose-400']
const CYCLE = 3.4
const SPARKLES = Array.from({ length: 16 }, (_, i) => ({
  left: 3 + rnd(i) * 94,
  top: 6 + rnd(i + 30) * 88,
  size: 8 + rnd(i + 60) * 12,
  delay: rnd(i + 90) * CYCLE,
  duration: 1.1 + rnd(i + 120) * 1.0,
  tone: TONES[i % TONES.length],
}))

export default function SparklesText() {
  return (
    <div className="flex h-[200px] w-[440px] items-center justify-center text-foreground">
      <div className="relative px-10 py-8">
        {SPARKLES.map((s, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            aria-hidden
            className={`pointer-events-none absolute ${s.tone}`}
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, repeatDelay: CYCLE - s.duration, ease: 'easeInOut' }}
          >
            <path d="M12 0 C12 8 16 12 24 12 C16 12 12 16 12 24 C12 16 8 12 0 12 C8 12 12 8 12 0 Z" fill="currentColor" />
          </motion.svg>
        ))}
        <h2 className="relative text-4xl font-semibold tracking-tight">
          Crie algo <span className="text-primary">mágico</span>
        </h2>
        <p className="relative mt-2 text-center text-sm text-muted-foreground">com um toque de brilho</p>
      </div>
    </div>
  )
}
