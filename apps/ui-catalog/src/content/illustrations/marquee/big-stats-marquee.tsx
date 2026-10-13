'use client'

import { Sparkle } from 'lucide-react'
import { motion } from 'motion/react'

// "Big Stats Marquee": letreiro tipográfico de números grandes. A faixa de cima rola para a esquerda com os números
// em texto sólido; a de baixo, no sentido contrário, usa texto vazado (só contorno) — separados por estrelinhas que
// giram. Entre as duas, uma fita fina com o rótulo "em números" fixa no centro.
const TOP = ['12 mil lojas', 'R$ 2,4 bi processados', '99,99% de uptime', '38 países'] as const
const BOTTOM = ['4,9 de avaliação', '1,2 mi pedidos/mês', '3 min de resposta', '+120 integrações'] as const

function Row({ items, outline, reverse, dur }: { items: readonly string[]; outline?: boolean; reverse?: boolean; dur: number }) {
  const cells = [...items, ...items]
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div className="flex w-max items-center" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}>
        {cells.map((t, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`whitespace-nowrap px-5 text-5xl font-bold tracking-tight ${outline ? 'text-transparent' : 'text-foreground'}`}
              style={outline ? { WebkitTextStroke: '1.5px var(--muted-foreground)' } : undefined}
            >
              {t}
            </span>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="flex">
              <Sparkle className={`size-6 ${outline ? 'text-muted-foreground' : 'fill-primary text-primary'}`} />
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function BigStatsMarquee() {
  return (
    <div className="relative flex w-[520px] flex-col gap-3 py-6 text-foreground">
      <Row items={TOP} dur={22} />
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-border" />
        <span className="relative rounded-full border bg-background px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">em números</span>
      </div>
      <Row items={BOTTOM} outline reverse dur={26} />
    </div>
  )
}
