'use client'

import type { LucideIcon } from 'lucide-react'
import { ChartColumn, Filter, Handshake, Headset, LayoutTemplate, Mail, Megaphone, MessageCircle, PenLine, QrCode, Rocket, Search, ShoppingCart, Users, Workflow } from 'lucide-react'
import { motion } from 'motion/react'

// "Chip Marquee": três linhas retas de chips com ícone, rótulo e contagem, a do meio em sentido contrário e cada uma
// numa velocidade. Bordas esmaecidas por mask-image (sem moldura) e chips que sobem levemente no hover.
const TAGS: ReadonlyArray<{ label: string; Icon: LucideIcon; tone: string; n?: string }> = [
  { label: 'Tráfego pago', Icon: Megaphone, tone: 'text-rose-500', n: '2,4 mil' },
  { label: 'Copywriting', Icon: PenLine, tone: 'text-amber-500' },
  { label: 'Automação', Icon: Workflow, tone: 'text-violet-500', n: '1,8 mil' },
  { label: 'CRM', Icon: Users, tone: 'text-sky-500' },
  { label: 'WhatsApp', Icon: MessageCircle, tone: 'text-emerald-500', n: '3,1 mil' },
  { label: 'E-mail marketing', Icon: Mail, tone: 'text-sky-500' },
  { label: 'SEO', Icon: Search, tone: 'text-amber-500', n: '940' },
  { label: 'Landing pages', Icon: LayoutTemplate, tone: 'text-violet-500' },
  { label: 'Checkout', Icon: ShoppingCart, tone: 'text-rose-500', n: '1,2 mil' },
  { label: 'Pix', Icon: QrCode, tone: 'text-emerald-500' },
  { label: 'Analytics', Icon: ChartColumn, tone: 'text-sky-500', n: '760' },
  { label: 'Funil de vendas', Icon: Filter, tone: 'text-amber-500' },
  { label: 'Suporte', Icon: Headset, tone: 'text-violet-500', n: '2,0 mil' },
  { label: 'Onboarding', Icon: Rocket, tone: 'text-rose-500' },
  { label: 'Afiliados', Icon: Handshake, tone: 'text-emerald-500', n: '510' },
]

function Row({ offset, reverse = false, duration }: { offset: number; reverse?: boolean; duration: number }) {
  const items = [...TAGS.slice(offset), ...TAGS.slice(0, offset)]
  const cells = [...items, ...items]
  return (
    <motion.div className="flex w-max gap-2" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
      {cells.map((t, i) => (
        <motion.span
          key={`${t.label}-${i}`}
          whileHover={{ scale: 1.08, y: -2 }}
          className="inline-flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-lg border bg-card px-2.5 py-1.5 text-xs font-medium shadow-sm"
        >
          <t.Icon className={`size-3.5 ${t.tone}`} />
          {t.label}
          {t.n && <span className="rounded-md bg-muted px-1 py-px text-[10px] font-normal tabular-nums text-muted-foreground">{t.n}</span>}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function ChipMarquee() {
  return (
    <div className="flex w-[480px] flex-col gap-3 overflow-hidden py-3 text-foreground [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <Row offset={0} duration={30} />
      <Row offset={5} reverse duration={36} />
      <Row offset={10} duration={32} />
    </div>
  )
}
