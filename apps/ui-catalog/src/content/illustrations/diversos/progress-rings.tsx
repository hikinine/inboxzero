'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

// "Progress Rings": três anéis concêntricos preenchem até os valores, seguram e esvaziam em loop; a legenda ao lado
// conta junto. Cores: primária, verde e âmbar.
const RINGS = [
  { label: 'Vendas', value: 92, r: 84, className: 'text-primary' },
  { label: 'Metas', value: 68, r: 62, className: 'text-emerald-500' },
  { label: 'Atendimento', value: 45, r: 40, className: 'text-amber-500' },
] as const
const DURATION = 5
const TIMES = [0, 0.45, 0.8, 1]

function Legend({ label, value, className }: (typeof RINGS)[number]) {
  const mv = useMotionValue(0)
  useEffect(() => {
    const controls = animate(mv, [0, value, value, 0], { duration: DURATION, times: TIMES, repeat: Infinity, ease: ['easeInOut', 'linear', 'easeInOut'] })
    return () => controls.stop()
  }, [mv, value])
  const text = useTransform(mv, (v) => `${Math.round(v)}%`)
  return (
    <div className="flex items-center gap-3">
      <span className={`size-2.5 rounded-full bg-current ${className}`} />
      <div className="flex-1 text-sm">{label}</div>
      <motion.div className={`w-12 text-right text-sm font-semibold tabular-nums ${className}`}>{text}</motion.div>
    </div>
  )
}

export default function ProgressRings() {
  return (
    <div className="flex h-[240px] w-[440px] items-center gap-8 text-foreground">
      <svg viewBox="0 0 200 200" className="size-[200px] shrink-0" role="img" aria-label="Três anéis de progresso preenchendo até 92%, 68% e 45%">
        <g transform="rotate(-90 100 100)">
          {RINGS.map((ring) => (
            <g key={ring.label} className={ring.className}>
              <circle cx="100" cy="100" r={ring.r} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="14" />
              <motion.circle
                cx="100"
                cy="100"
                r={ring.r}
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, ring.value / 100, ring.value / 100, 0] }}
                transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: ['easeInOut', 'linear', 'easeInOut'] }}
              />
            </g>
          ))}
        </g>
        <text x="100" y="104" textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--muted-foreground)" fontFamily="inherit">
          hoje
        </text>
      </svg>
      <div className="flex-1 space-y-4">
        {RINGS.map((r) => (
          <Legend key={r.label} {...r} />
        ))}
      </div>
    </div>
  )
}
