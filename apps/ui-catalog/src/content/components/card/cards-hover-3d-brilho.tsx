'use client'

import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Bot, Cpu, Nfc, Sparkles, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'

function CartaoTilt() {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [12, -12]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 200, damping: 18 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const brilho = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.35), transparent 55%)`

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  return (
    <div className="[perspective:900px]">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative aspect-[1.586] w-72 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-5 text-white shadow-xl"
      >
        <div className="absolute -top-16 -right-10 size-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold tracking-wide">nuvem<span className="opacity-70">bank</span></span>
            <Nfc className="size-5 opacity-80" />
          </div>
          <div className="h-7 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 opacity-90" />
          <div>
            <div className="font-mono text-base tracking-[0.2em]">•••• 4821</div>
            <div className="mt-1 flex justify-between text-[11px] uppercase opacity-80">
              <span>Luana Ferreira</span>
              <span>09/31</span>
            </div>
          </div>
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: brilho }} />
      </motion.div>
    </div>
  )
}

function CardSpotlight({ Icon, titulo, texto, className }: { Icon: typeof Bot; titulo: string; texto: string; className?: string }) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const luz = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)`
  const borda = useMotionTemplate`radial-gradient(160px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 70%, transparent), transparent 70%)`

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      onMouseLeave={() => {
        x.set(-200)
        y.set(-200)
      }}
      className={cn('group relative rounded-xl bg-border p-px', className)}
    >
      <motion.div aria-hidden className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: borda }} />
      <div className="relative h-full overflow-hidden rounded-[11px] bg-card p-5">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: luz }} />
        <div className="relative">
          <span className="mb-4 flex size-9 items-center justify-center rounded-lg border bg-muted">
            <Icon className="size-4" />
          </span>
          <h4 className="font-medium">{titulo}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
        </div>
      </div>
    </div>
  )
}

export default function CardsHover3dBrilho() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <Rotulo title="Tilt 3D com reflexo">
        <div className="flex justify-center py-4">
          <CartaoTilt />
        </div>
      </Rotulo>
      <Rotulo title="Spotlight na borda e no fundo">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <CardSpotlight Icon={Bot} titulo="Agente de vendas" texto="Responde leads no WhatsApp em segundos." />
          <CardSpotlight Icon={Workflow} titulo="Automações" texto="Fluxos que movem o card no funil sozinhos." />
          <CardSpotlight Icon={Cpu} titulo="Modelos próprios" texto="Treine com o histórico da sua empresa." />
        </div>
      </Rotulo>
    </div>
  )
}

function Rotulo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Sparkles className="size-3" /> {title}
      </div>
      {children}
    </div>
  )
}
