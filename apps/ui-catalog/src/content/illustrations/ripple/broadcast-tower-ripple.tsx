'use client'

import { useEffect } from 'react'
import { Smartphone } from 'lucide-react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

// "Broadcast Tower Ripple": torre de transmissão disparando um comunicado. No ar, anéis circulares saem da antena;
// no chão em perspectiva, elipses se espalham a partir da base. Cada celular espalhado pelo chão acende e mostra a
// notificação no instante exato em que a elipse o alcança (distância elíptica normalizada) e o alcance conta junto.
const W = 440
const H = 300
const BASE = { x: 220, y: 214 } // base da torre no chão
const TOP = { x: 220, y: 70 } // antena
const RX = 230
const RY = 70
const WAVE = 2.8
const CYCLE = 3.6

const PHONES = [
  { x: 92, y: 206 },
  { x: 150, y: 248 },
  { x: 310, y: 244 },
  { x: 354, y: 200 },
  { x: 60, y: 252 },
  { x: 396, y: 262 },
  { x: 236, y: 268 },
].map((p) => {
  const d = Math.hypot((p.x - BASE.x) / RX, (p.y - BASE.y) / RY)
  return { ...p, at: Math.min(d, 1) * WAVE }
})

export default function BroadcastTowerRipple() {
  const reach = useMotionValue(0)
  const text = useTransform(reach, (v) => Math.round(v).toLocaleString('pt-BR'))
  useEffect(() => {
    const c = animate(reach, [0, 12480, 12480], { duration: CYCLE, times: [0, 0.75, 1], ease: 'easeOut', repeat: Infinity })
    return () => c.stop()
  }, [reach])

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="btr-ground" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--muted)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--muted)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="180" width={W} height={H - 180} fill="url(#btr-ground)" />
        {/* elipses no chão */}
        {[0, 1].map((i) => (
          <motion.ellipse
            key={`g${i}`}
            cx={BASE.x}
            cy={BASE.y}
            rx={RX}
            ry={RY}
            fill="none"
            stroke="rgb(139 92 246)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: 'view-box', transformOrigin: `${BASE.x}px ${BASE.y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.02, 1, 1], opacity: [0.9, 0.15, 0] }}
            transition={{ duration: CYCLE, times: [0, WAVE / CYCLE, 1], delay: i * 0.35, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        {/* anéis no ar */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`a${i}`}
            cx={TOP.x}
            cy={TOP.y}
            r={120}
            fill="none"
            stroke="rgb(139 92 246)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: 'view-box', transformOrigin: `${TOP.x}px ${TOP.y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.05, 1], opacity: [0.8, 0] }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, repeatDelay: CYCLE - 1.2, ease: 'easeOut' }}
          />
        ))}
        {/* torre treliçada */}
        <g stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d={`M ${BASE.x - 26} ${BASE.y} L ${TOP.x} ${TOP.y + 10} L ${BASE.x + 26} ${BASE.y}`} />
          {[0.25, 0.5, 0.75].map((f) => {
            const y = TOP.y + 10 + (BASE.y - TOP.y - 10) * f
            const half = 26 * f
            return <path key={f} d={`M ${BASE.x - half} ${y} L ${BASE.x + half} ${y} M ${BASE.x - half} ${y} L ${BASE.x + half * 0.6} ${y - 20}`} strokeWidth="1.2" />
          })}
        </g>
        <motion.circle
          cx={TOP.x}
          cy={TOP.y}
          r="6"
          fill="rgb(139 92 246)"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: CYCLE - 0.6 }}
        />
      </svg>

      {PHONES.map((p, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-background px-1.5 py-0.5 text-[9px] font-medium shadow-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, -4] }}
            transition={{ duration: CYCLE, times: [0, p.at / CYCLE, p.at / CYCLE + 0.06, 0.92, 1], repeat: Infinity }}
          >
            Comunicado novo
          </motion.div>
          <motion.span
            className="flex size-8 items-center justify-center rounded-lg border bg-card shadow-sm"
            animate={{ scale: [1, 1, 1.18, 1, 1], color: ['rgb(113 113 122)', 'rgb(113 113 122)', 'rgb(139 92 246)', 'rgb(139 92 246)', 'rgb(113 113 122)'] }}
            transition={{ duration: CYCLE, times: [0, p.at / CYCLE, p.at / CYCLE + 0.05, 0.92, 1], repeat: Infinity }}
          >
            <Smartphone className="size-4" />
          </motion.span>
        </div>
      ))}

      <div className="absolute left-4 top-4">
        <p className="text-[11px] text-muted-foreground">Comunicado: “Loja aberta no feriado”</p>
        <p className="text-xl font-bold tabular-nums tracking-tight">
          <motion.span>{text}</motion.span> <span className="text-xs font-medium text-muted-foreground">clientes alcançados</span>
        </p>
      </div>
    </div>
  )
}
