'use client'

import { motion } from 'motion/react'

// "Tilted Marquee": três faixas inclinadas com tags/chips rolando em sentidos alternados, recortadas por um quadro.
const TAGS = ['#automação', 'CRM', 'WhatsApp', 'E-mail marketing', 'Funil de vendas', 'Checkout', 'Pix', 'Landing page', 'Webhooks', 'Relatórios', 'Suporte', 'IA', 'Pipeline', 'Etiquetas']

const CHIP = ['bg-primary text-primary-foreground', 'border bg-card text-foreground', 'bg-muted text-muted-foreground'] as const

function Strip({ offset, top, reverse = false, duration = 30 }: { offset: number; top: number; reverse?: boolean; duration?: number }) {
  const items = [...TAGS.slice(offset), ...TAGS.slice(0, offset)]
  const cells = [...items, ...items]
  return (
    <div className="absolute -left-[20%] w-[140%] -rotate-6" style={{ top }}>
      <motion.div className="flex w-max gap-2.5" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {cells.map((tag, i) => (
          <span key={`${tag}-${i}`} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium ${CHIP[(i + offset) % CHIP.length]}`}>
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function TiltedMarquee() {
  return (
    <div className="relative h-[280px] w-[480px] overflow-hidden rounded-2xl border bg-muted/30 text-foreground">
      <Strip offset={0} top={52} duration={34} />
      <Strip offset={5} top={124} reverse duration={40} />
      <Strip offset={9} top={196} duration={30} />
    </div>
  )
}
