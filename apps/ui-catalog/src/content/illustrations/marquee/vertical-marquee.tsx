'use client'

import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Bot, CalendarCheck, CreditCard, FileCheck, Mail, MessageCircle, Rocket, ShoppingCart, Star, Tag, UserPlus, Zap } from 'lucide-react'

// "Vertical Marquee": três colunas de eventos rolando verticalmente (a do meio em sentido contrário), com fade no
// topo e na base.
interface Item {
  Icon: LucideIcon
  title: string
  sub: string
}
const COLUMNS: Item[][] = [
  [
    { Icon: UserPlus, title: 'Novo lead', sub: 'Ana Souza · Instagram' },
    { Icon: CreditCard, title: 'Pagamento aprovado', sub: 'R$ 497,00 · Pix' },
    { Icon: MessageCircle, title: 'Mensagem recebida', sub: 'WhatsApp · Bruno' },
    { Icon: Rocket, title: 'Deploy concluído', sub: 'produção · 42s' },
  ],
  [
    { Icon: Mail, title: 'E-mail entregue', sub: 'Boas-vindas · 1.280' },
    { Icon: ShoppingCart, title: 'Pedido #4821', sub: 'Curso completo · R$ 1.290' },
    { Icon: Bot, title: 'Automação disparada', sub: 'Carrinho abandonado' },
    { Icon: Star, title: 'Avaliação 5 estrelas', sub: 'Camila Mendes' },
  ],
  [
    { Icon: Tag, title: 'Etiqueta aplicada', sub: 'cliente-vip · 32 contatos' },
    { Icon: CalendarCheck, title: 'Reunião marcada', sub: 'qui · 15:00' },
    { Icon: Zap, title: 'Webhook recebido', sub: 'pedido.pago' },
    { Icon: FileCheck, title: 'Proposta aceita', sub: 'Nexa Digital' },
  ],
]

function Column({ items, reverse = false, duration = 22 }: { items: Item[]; reverse?: boolean; duration?: number }) {
  const cells = [...items, ...items]
  return (
    <div className="w-1/3 overflow-hidden">
      <motion.div className="flex flex-col gap-3" animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {cells.map((it, i) => (
          <div key={`${it.title}-${i}`} className="flex items-center gap-2.5 rounded-xl border bg-card p-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <it.Icon className="size-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-xs font-medium">{it.title}</div>
              <div className="truncate text-[10px] text-muted-foreground">{it.sub}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function VerticalMarquee() {
  return (
    <div className="flex h-[320px] w-[520px] gap-3 text-foreground" style={{ maskImage: 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)' }}>
      <Column items={COLUMNS[0]!} duration={24} />
      <Column items={COLUMNS[1]!} reverse duration={20} />
      <Column items={COLUMNS[2]!} duration={27} />
    </div>
  )
}
