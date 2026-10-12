'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

// "Planets Orbit": planetas (círculos com gradiente) com rótulos percorrem órbitas elípticas ao redor de um sol.
// Profundidade real: ao passar por trás do núcleo o planeta fica menor, mais apagado e abaixo no z-index.
const W = 440
const H = 300
const ORBITS = [
  { a: 92, b: 34 },
  { a: 146, b: 56 },
  { a: 202, b: 80 },
] as const
const PLANETS = [
  { label: 'Vendas', orbit: 0, size: 20, duration: 9, phase: 0.1, tone: 'from-emerald-300 to-emerald-600' },
  { label: 'Marketing', orbit: 1, size: 16, duration: 15, phase: 0.55, tone: 'from-sky-300 to-sky-600' },
  { label: 'Suporte', orbit: 2, size: 26, duration: 24, phase: 0.3, tone: 'from-violet-300 to-violet-600' },
  { label: 'Financeiro', orbit: 2, size: 14, duration: 24, phase: 0.8, tone: 'from-rose-300 to-rose-600' },
] as const
const STARS = [
  [30, 40],
  [80, 250],
  [120, 30],
  [200, 270],
  [300, 24],
  [360, 60],
  [410, 150],
  [395, 262],
  [250, 290],
  [60, 150],
] as const

function Planet({ label, orbit, size, duration, phase, tone }: (typeof PLANETS)[number]) {
  const { a, b } = ORBITS[orbit]
  const t = useMotionValue<number>(phase)
  useEffect(() => {
    const controls = animate(t, [phase, phase + 1], { duration, repeat: Infinity, ease: 'linear' })
    return () => controls.stop()
  }, [t, phase, duration])
  const x = useTransform(t, (v) => Math.cos(v * Math.PI * 2) * a - size / 2)
  const y = useTransform(t, (v) => Math.sin(v * Math.PI * 2) * b - size / 2)
  const depth = useTransform(t, (v) => Math.sin(v * Math.PI * 2)) // > 0 = na frente do sol
  const scale = useTransform(depth, (d) => 0.75 + 0.25 * ((d + 1) / 2))
  const opacity = useTransform(depth, (d) => 0.5 + 0.5 * ((d + 1) / 2))
  const zIndex = useTransform(depth, (d) => (d > 0 ? 20 : 5))
  return (
    <motion.div className="absolute left-1/2 top-1/2 flex flex-col items-center" style={{ x, y, scale, opacity, zIndex, width: size }}>
      <span className={`block rounded-full bg-gradient-to-br shadow-md ${tone}`} style={{ width: size, height: size }} />
      <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-muted-foreground">{label}</span>
    </motion.div>
  )
}

export default function PlanetsOrbit() {
  return (
    <div className="relative h-[300px] w-[440px] overflow-hidden text-foreground">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        {STARS.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="1.5" fill="var(--muted-foreground)" animate={{ opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 2 + (i % 4) * 0.6, repeat: Infinity, delay: i * 0.25 }} />
        ))}
        {ORBITS.map((o) => (
          <ellipse key={o.a} cx={W / 2} cy={H / 2} rx={o.a} ry={o.b} fill="none" stroke="var(--border)" strokeDasharray="3 5" />
        ))}
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 shadow-[0_0_48px_-4px] shadow-amber-400/70"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {PLANETS.map((p) => (
        <Planet key={p.label} {...p} />
      ))}
    </div>
  )
}
