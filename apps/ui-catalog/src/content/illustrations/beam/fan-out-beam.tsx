'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, Check, Instagram, Mail, Megaphone, MessageCircle, Send, Smartphone, Webhook, Zap } from 'lucide-react'
import { motion } from 'motion/react'

// "Fan Out Beam": um disparo (1) se abre em leque para oito canais (8). Os feixes saem em cascata, de cima para baixo;
// cada canal ganha um check ao receber e o contador "entregues" sobe até 8/8. Tudo sincronizado num ciclo de 4,4s.
const W = 460
const H = 300
const PERIOD = 4.4
const STAGGER = 0.17
const TRAVEL = 0.9
const SRC = { x: 70, y: 150 }
const RADIUS = 290

const CHANNELS: ReadonlyArray<{ label: string; Icon: LucideIcon; tone: string }> = [
  { label: 'WhatsApp', Icon: MessageCircle, tone: 'text-emerald-500' },
  { label: 'E-mail', Icon: Mail, tone: 'text-sky-500' },
  { label: 'Instagram', Icon: Instagram, tone: 'text-rose-500' },
  { label: 'SMS', Icon: Smartphone, tone: 'text-amber-500' },
  { label: 'Push', Icon: Bell, tone: 'text-violet-500' },
  { label: 'Telegram', Icon: Send, tone: 'text-sky-500' },
  { label: 'Webhook', Icon: Webhook, tone: 'text-rose-500' },
  { label: 'Automação', Icon: Zap, tone: 'text-amber-500' },
]

const DESTS = CHANNELS.map((c, i) => {
  const deg = -27 + (54 / (CHANNELS.length - 1)) * i
  const a = (deg * Math.PI) / 180
  const x = SRC.x + Math.cos(a) * RADIUS
  const y = SRC.y + Math.sin(a) * RADIUS
  const arrival = i * STAGGER + TRAVEL
  return { ...c, x, y, arrival, d: `M ${SRC.x + 26} ${SRC.y} Q ${(SRC.x + x) / 2} ${SRC.y + (y - SRC.y) * 0.15}, ${x - 18} ${y}` }
})

export default function FanOutBeam() {
  const [delivered, setDelivered] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => {
      const t = ((performance.now() - start) / 1000) % PERIOD
      setDelivered(t > PERIOD * 0.9 ? 0 : DESTS.filter((d) => d.arrival <= t).length)
    }, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Um disparo se abrindo em feixes para oito canais">
        {DESTS.map((d) => (
          <path key={`t-${d.label}`} d={d.d} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" />
        ))}
        {DESTS.map((d, i) => (
          <motion.path
            key={`b-${d.label}`}
            d={d.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={d.tone}
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ pathLength: [0, 0.5, 0.35, 0], pathOffset: [0, 0, 0.6, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: TRAVEL, times: [0, 0.35, 0.8, 1], delay: i * STAGGER, repeat: Infinity, repeatDelay: PERIOD - TRAVEL, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* origem */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: SRC.x, top: SRC.y }}>
        <motion.span
          className="absolute inset-0 rounded-2xl bg-primary/30"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: PERIOD - 0.9, ease: 'easeOut' }}
        />
        <span className="relative flex size-[52px] items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Megaphone className="size-6" />
        </span>
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center text-[10px] leading-tight">
          <span className="block font-medium">Black Friday</span>
          <span className="tabular-nums text-muted-foreground">{delivered}/8 entregues</span>
        </span>
      </div>

      {/* destinos */}
      {DESTS.map((d) => {
        const hit = d.arrival / PERIOD
        return (
          <div key={d.label} className="absolute flex -translate-y-1/2 items-center gap-2" style={{ left: d.x - 16, top: d.y }}>
            <span className="relative flex size-8 items-center justify-center rounded-lg border bg-card shadow-sm">
              <d.Icon className={`size-4 ${d.tone}`} />
              <motion.span
                className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-emerald-500 text-white"
                animate={{ scale: [0, 0, 1.25, 1, 1, 0] }}
                transition={{ duration: PERIOD, times: [0, hit, hit + 0.04, hit + 0.07, 0.88, 0.93], repeat: Infinity }}
              >
                <Check className="size-2.5" strokeWidth={3} />
              </motion.span>
            </span>
            <span className="text-[11px] text-muted-foreground">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}
