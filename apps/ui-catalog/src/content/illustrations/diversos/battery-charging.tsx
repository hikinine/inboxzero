'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

// "Battery Charging": bateria carregando com líquido de energia. O nível sobe com uma onda rolando na superfície
// (path periódico deslocado em x), a cor muda de vermelho para âmbar e verde conforme a carga, partículas correm
// pelo cabo da tomada até a bateria (animateMotion) e o raio pulsa; em 100% o contorno brilha, o status vira
// "Carregado", segura e o ciclo recomeça do início.
const INNER = { x: 18, y: 28, w: 84, h: 174 }
const WAVE = 'M -84 0 Q -63 -7 -42 0 T 0 0 T 42 0 T 84 0 T 126 0 T 168 0 T 210 0 T 252 0 V 200 H -84 Z'
const CABLE = 'M 330 268 C 280 296 150 300 140 262'
type Tier = 'low' | 'mid' | 'high' | 'full'
const FILL: Record<Tier, string> = { low: 'fill-rose-500', mid: 'fill-amber-500', high: 'fill-emerald-500', full: 'fill-emerald-500' }
const tierOf = (v: number): Tier => (v >= 99.5 ? 'full' : v < 20 ? 'low' : v < 60 ? 'mid' : 'high')

export default function BatteryCharging() {
  const level = useMotionValue(8)
  const [tier, setTier] = useState<Tier>('low')
  useMotionValueEvent(level, 'change', (v) => setTier(tierOf(v)))
  useEffect(() => {
    const c = animate(level, [8, 100, 100], { duration: 9, times: [0, 0.78, 1], ease: 'easeInOut', repeat: Infinity })
    return () => c.stop()
  }, [level])
  const liquidY = useTransform(level, (v) => INNER.y + INNER.h - (INNER.h * v) / 100)
  const pct = useTransform(level, (v) => `${Math.round(v)}%`)
  const eta = useTransform(level, (v) => (v >= 99.5 ? 'Bateria cheia' : `${Math.max(1, Math.round((100 - v) * 0.42))} min para completar`))
  const full = tier === 'full'

  return (
    <div className="relative h-[300px] w-[440px] overflow-hidden text-foreground">
      <svg viewBox="0 0 440 300" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <clipPath id="bc-inner">
            <rect x={INNER.x} y={INNER.y} width={INNER.w} height={INNER.h} rx="12" />
          </clipPath>
        </defs>

        {/* cabo + partículas */}
        <path d={CABLE} fill="none" stroke="var(--border)" strokeWidth="6" strokeLinecap="round" />
        {!full &&
          [0, 0.3, 0.6, 0.9].map((b) => (
            <circle key={b} r="3" className="fill-amber-400">
              <animateMotion dur="1.2s" begin={`${b}s`} repeatCount="indefinite" path={CABLE} />
            </circle>
          ))}
        <rect x="326" y="252" width="30" height="26" rx="6" className="fill-muted stroke-border" />
        <rect x="356" y="257" width="10" height="4" rx="1" className="fill-muted-foreground" />
        <rect x="356" y="269" width="10" height="4" rx="1" className="fill-muted-foreground" />

        <g transform="translate(80 36)">
          {/* brilho quando cheia */}
          {full && (
            <motion.rect
              x="6"
              y="16"
              width="108"
              height="198"
              rx="22"
              fill="none"
              className="stroke-emerald-500"
              strokeWidth="4"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: [0.8, 0], scale: [1, 1.12] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          <rect x="40" y="6" width="40" height="14" rx="4" className={cn('transition-colors duration-500', full ? 'fill-emerald-500' : 'fill-muted-foreground/40')} />
          <rect x="10" y="20" width="100" height="190" rx="18" className="fill-card" />
          <g clipPath="url(#bc-inner)">
            <rect x={INNER.x} y={INNER.y} width={INNER.w} height={INNER.h} className="fill-muted" />
            <motion.g style={{ y: liquidY }}>
              <motion.path d={WAVE} className={cn('transition-colors duration-500', FILL[tier])} fillOpacity="0.45" animate={{ x: [0, 84] }} transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }} />
              <motion.path d={WAVE} className={cn('transition-colors duration-500', FILL[tier])} animate={{ x: [0, -84] }} transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }} style={{ translateY: 4 }} />
            </motion.g>
          </g>
          <rect x="10" y="20" width="100" height="190" rx="18" fill="none" strokeWidth="5" className={cn('transition-colors duration-500', full ? 'stroke-emerald-500' : 'stroke-foreground/80')} />
        </g>
      </svg>

      {/* raio */}
      <motion.span
        className="absolute flex size-11 items-center justify-center rounded-full bg-background/80 shadow-sm backdrop-blur"
        style={{ left: 140 - 22, top: 36 + 115 - 22 }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Zap className={cn('size-5 transition-colors', full ? 'fill-emerald-500 text-emerald-500' : 'fill-amber-400 text-amber-500')} />
      </motion.span>

      {/* informações */}
      <div className="absolute right-6 top-10 w-[170px]">
        <p className="text-xs text-muted-foreground">{full ? 'Carregado' : 'Carregando'}</p>
        <motion.p className="text-5xl font-bold tabular-nums tracking-tight">{pct}</motion.p>
        <motion.p className="mt-1 text-xs text-muted-foreground">{eta}</motion.p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg border bg-card px-2 py-1.5">
            <p className="text-muted-foreground">Potência</p>
            <p className="font-semibold">{full ? '0 W' : '65 W'}</p>
          </div>
          <div className="rounded-lg border bg-card px-2 py-1.5">
            <p className="text-muted-foreground">Saúde</p>
            <p className="font-semibold">96%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
