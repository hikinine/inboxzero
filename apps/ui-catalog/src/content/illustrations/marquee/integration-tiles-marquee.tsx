'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  Chrome,
  CreditCard,
  Database,
  Figma,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  Sheet,
  ShoppingBag,
  Slack,
  Truck,
  Webhook,
  Youtube,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'

// "Integration Tiles Marquee": três fileiras de ladrilhos quadrados com ícones de integrações coloridos rolando em
// sentidos alternados sobre uma grade pontilhada, com fade nas quatro bordas. No centro, um card fixo com desfoque
// de fundo ("+120 integrações") e um halo que respira — o letreiro passa por trás dele.
type Tile = { Icon: LucideIcon; tone: string }
const ROWS: ReadonlyArray<ReadonlyArray<Tile>> = [
  [
    { Icon: MessageCircle, tone: 'text-emerald-500' },
    { Icon: Slack, tone: 'text-amber-500' },
    { Icon: Github, tone: 'text-foreground' },
    { Icon: Sheet, tone: 'text-emerald-600' },
    { Icon: CreditCard, tone: 'text-violet-500' },
    { Icon: Figma, tone: 'text-rose-500' },
  ],
  [
    { Icon: Instagram, tone: 'text-pink-500' },
    { Icon: Mail, tone: 'text-sky-500' },
    { Icon: Database, tone: 'text-indigo-500' },
    { Icon: Webhook, tone: 'text-rose-500' },
    { Icon: Calendar, tone: 'text-sky-600' },
    { Icon: Zap, tone: 'text-orange-500' },
  ],
  [
    { Icon: ShoppingBag, tone: 'text-emerald-500' },
    { Icon: Youtube, tone: 'text-red-500' },
    { Icon: Chrome, tone: 'text-amber-500' },
    { Icon: Truck, tone: 'text-sky-500' },
    { Icon: Mail, tone: 'text-rose-400' },
    { Icon: Database, tone: 'text-teal-500' },
  ],
]
const DUR = [26, 32, 22] as const

export default function IntegrationTilesMarquee() {
  return (
    <div
      className="relative h-[300px] w-[460px] overflow-hidden text-foreground"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 0)',
        backgroundSize: '18px 18px',
      }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-center gap-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        {ROWS.map((row, r) => {
          const cells = [...row, ...row, ...row, ...row]
          const reverse = r % 2 === 1
          return (
            <motion.div
              key={r}
              className="flex w-max"
              animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
              transition={{ duration: DUR[r], repeat: Infinity, ease: 'linear' }}
            >
              {cells.map((t, i) => (
                <span key={i} className="shrink-0 pr-4">
                  <span className="flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm">
                    <t.Icon className={`size-7 ${t.tone}`} />
                  </span>
                </span>
              ))}
            </motion.div>
          )
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute -inset-6 rounded-[28px] bg-primary/20 blur-2xl"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative flex w-[190px] flex-col items-center rounded-2xl border bg-card/80 px-4 py-4 text-center shadow-xl backdrop-blur-md">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Zap className="size-5" />
          </span>
          <div className="mt-2 text-lg font-semibold tracking-tight">+120 integrações</div>
          <div className="text-[11px] text-muted-foreground">conecte em 2 cliques, sem código</div>
        </div>
      </div>
    </div>
  )
}
