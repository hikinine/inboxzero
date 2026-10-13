'use client'

import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import { ArrowRight, MousePointerClick, Sparkles, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

function ShimmerButton() {
  return (
    <button
      type="button"
      className="relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary-foreground/35 to-transparent"
        animate={{ x: ['0%', '400%'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
      />
      <Sparkles className="relative size-4" />
      <span className="relative">Gerar proposta</span>
    </button>
  )
}

function BordaGiratoria() {
  return (
    <button type="button" className="group relative inline-flex overflow-hidden rounded-full p-[1.5px]">
      <motion.span
        aria-hidden
        className="absolute inset-[-150%] bg-conic from-sky-500 via-fuchsia-500 to-sky-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <span className="relative inline-flex h-10 items-center gap-2 rounded-full bg-background px-5 text-sm font-medium transition-colors group-hover:bg-muted">
        <Zap className="size-4 text-fuchsia-500" />
        Assinar o Pro
      </span>
    </button>
  )
}

function BotaoMagnetico() {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 })

  function onMove(e: MouseEvent<HTMLButtonElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }

  return (
    <div className="flex size-28 items-center justify-center rounded-full border border-dashed">
      <motion.button
        ref={ref}
        type="button"
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        style={{ x: sx, y: sy }}
        className="inline-flex size-16 items-center justify-center rounded-full bg-foreground text-background shadow-lg"
        aria-label="Começar agora"
      >
        <ArrowRight className="size-5" />
      </motion.button>
    </div>
  )
}

interface Ripple {
  id: number
  x: number
  y: number
}

function BotaoRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [cliques, setCliques] = useState(0)

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    setRipples((prev) => [...prev, { id: Date.now() + Math.random(), x: e.clientX - r.left, y: e.clientY - r.top }])
    setCliques((c) => c + 1)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-lg border bg-secondary px-5 text-sm font-medium text-secondary-foreground"
      >
        <AnimatePresence>
          {ripples.map((rp) => (
            <motion.span
              key={rp.id}
              aria-hidden
              className="pointer-events-none absolute size-24 rounded-full bg-foreground/20"
              style={{ left: rp.x - 48, top: rp.y - 48 }}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              onAnimationComplete={() => setRipples((prev) => prev.filter((p) => p.id !== rp.id))}
            />
          ))}
        </AnimatePresence>
        <MousePointerClick className="relative size-4" />
        <span className="relative">Clique em qualquer ponto</span>
      </button>
      <span className="text-xs tabular-nums text-muted-foreground">{cliques} clique(s)</span>
    </div>
  )
}

export default function BotoesAnimadosShimmerBorda() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <Demo title="Shimmer">
        <ShimmerButton />
      </Demo>
      <Demo title="Borda gradiente girando">
        <BordaGiratoria />
      </Demo>
      <Demo title="Magnético (passe o mouse)">
        <BotaoMagnetico />
      </Demo>
      <Demo title="Ripple">
        <BotaoRipple />
      </Demo>
    </div>
  )
}

function Demo({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex min-h-44 flex-col rounded-xl border bg-card p-4', className)}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
      <div className="flex flex-1 items-center justify-center py-4">{children}</div>
    </div>
  )
}
