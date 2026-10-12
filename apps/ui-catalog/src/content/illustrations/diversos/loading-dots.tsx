'use client'

import { motion } from 'motion/react'

// "Loading Dots": quatro variações de carregamento lado a lado — pontos saltando, barra indeterminada, anel girando e
// skeleton pulsando — cada uma num card com rótulo.
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[120px] flex-col items-center justify-center gap-4 rounded-xl border bg-card">
      <div className="flex h-10 items-center justify-center">{children}</div>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}

export default function LoadingDots() {
  return (
    <div className="grid w-[400px] grid-cols-2 gap-3 text-foreground">
      <Cell label="Pontos">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="size-2.5 rounded-full bg-primary" animate={{ y: [0, -9, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }} />
          ))}
        </div>
      </Cell>

      <Cell label="Barra indeterminada">
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full w-1/3 rounded-full bg-primary" animate={{ x: ['-100%', '300%'] }} transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </Cell>

      <Cell label="Anel">
        <motion.svg viewBox="0 0 40 40" className="size-9 text-primary" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} aria-hidden>
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="30 100" />
        </motion.svg>
      </Cell>

      <Cell label="Skeleton">
        <div className="flex w-36 items-center gap-3">
          <motion.span className="size-8 shrink-0 rounded-full bg-muted-foreground/25" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <div className="flex flex-1 flex-col gap-2">
            {[80, 55].map((w, i) => (
              <motion.span key={w} className="block h-2.5 rounded-full bg-muted-foreground/25" style={{ width: `${w}%` }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.15 * (i + 1) }} />
            ))}
          </div>
        </div>
      </Cell>
    </div>
  )
}
