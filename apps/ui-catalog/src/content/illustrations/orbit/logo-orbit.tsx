'use client'

import { useRef, useState } from 'react'
import type { MotionValue } from 'motion/react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react'

// "Logo Orbit": wordmarks (monograma colorido + nome) orbitam a marca central em dois anéis contra-rotativos.
// A rotação vem de um motion value atualizado a cada frame — por isso o hover desacelera suavemente até parar e, ao
// sair, volta a girar sem salto. Cada chip contra-gira para o texto ficar sempre em pé.
interface Brand {
  name: string
  mark: string
  tone: string
  font: string
}

const INNER: Brand[] = [
  { name: 'Stripe', mark: 'S', tone: 'from-violet-500 to-indigo-500', font: 'font-bold tracking-tight' },
  { name: 'Slack', mark: '#', tone: 'from-fuchsia-500 to-rose-500', font: 'font-black' },
  { name: 'Notion', mark: 'N', tone: 'from-zinc-600 to-zinc-900', font: 'font-serif font-semibold' },
  { name: 'Figma', mark: 'F', tone: 'from-orange-500 to-rose-500', font: 'font-medium tracking-wide' },
]
const OUTER: Brand[] = [
  { name: 'GitHub', mark: 'G', tone: 'from-zinc-500 to-zinc-800', font: 'font-semibold' },
  { name: 'Shopify', mark: 'S', tone: 'from-lime-500 to-emerald-600', font: 'font-bold' },
  { name: 'Linear', mark: 'L', tone: 'from-indigo-500 to-violet-600', font: 'font-medium tracking-tight' },
  { name: 'VERCEL', mark: '▲', tone: 'from-zinc-700 to-zinc-950', font: 'font-black tracking-[0.2em] text-[10px]' },
  { name: 'HubSpot', mark: 'H', tone: 'from-orange-400 to-orange-600', font: 'font-bold' },
  { name: 'Zapier', mark: 'Z', tone: 'from-amber-500 to-orange-500', font: 'font-semibold italic' },
]

function Ring({ brands, radius, rotate, counter, dashed = false }: { brands: Brand[]; radius: number; rotate: MotionValue<number>; counter: MotionValue<number>; dashed?: boolean }) {
  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 rounded-full border ${dashed ? 'border-dashed' : ''}`}
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, rotate }}
    >
      {brands.map((b, i) => {
        const a = (i / brands.length) * Math.PI * 2
        return (
          <motion.div
            key={b.name}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border bg-card py-1 pl-1 pr-3 shadow-sm"
            style={{ x: Math.cos(a) * radius, y: Math.sin(a) * radius, rotate: counter }}
          >
            <span className={`flex size-5 items-center justify-center rounded-md bg-gradient-to-br text-[10px] font-bold text-white ring-1 ring-border ${b.tone}`}>{b.mark}</span>
            <span className={`text-xs ${b.font}`}>{b.name}</span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function LogoOrbit() {
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const speed = useRef(1)
  const angle = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 64)
    const target = pausedRef.current ? 0 : 1
    speed.current += (target - speed.current) * Math.min(1, dt / 220)
    angle.set(angle.get() + speed.current * dt * 0.02) // 20°/s → uma volta a cada 18s
  })

  const innerCounter = useTransform(angle, (a) => -a)
  const outerRot = useTransform(angle, (a) => -a * 0.55)
  const outerCounter = useTransform(angle, (a) => a * 0.55)

  const setHover = (v: boolean) => {
    pausedRef.current = v
    setPaused(v)
  }

  return (
    <div className="relative size-[360px] select-none text-foreground" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <Ring brands={OUTER} radius={140} rotate={outerRot} counter={outerCounter} dashed />
      <Ring brands={INNER} radius={78} rotate={angle} counter={innerCounter} />

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15"
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.15, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-1/2 top-1/2 flex size-[76px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
        <span className="text-2xl font-black leading-none tracking-tighter">cx</span>
        <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] opacity-80">clickmax</span>
      </div>

      <div className="absolute inset-x-0 bottom-1 text-center text-[11px] text-muted-foreground">{paused ? 'Pausado — tire o mouse para continuar' : 'Passe o mouse para pausar'}</div>
    </div>
  )
}
