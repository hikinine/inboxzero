'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Outline Marquee Text": três faixas de manchete gigante rolando em sentidos alternados. As faixas de cima e de
// baixo são só contorno (text-stroke), a do meio é sólida e uma palavra por vez se acende num degradê; bordas com
// máscara de fade e leve inclinação dão profundidade.
const ROWS = [
  { words: ['Landing pages', 'Checkout', 'Funis', 'Upsell'], outline: true, dir: 1, dur: 16 },
  { words: ['Venda todo dia', 'Venda no Pix', 'Venda no boleto'], outline: false, dir: -1, dur: 20 },
  { words: ['Automação', 'CRM', 'WhatsApp', 'E-mail'], outline: true, dir: 1, dur: 13 },
] as const

function Row({ row, index }: { row: (typeof ROWS)[number]; index: number }) {
  const items = [...row.words, ...row.words]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-6 whitespace-nowrap pr-6"
        animate={{ x: row.dir === 1 ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: row.dur, ease: 'linear', repeat: Infinity }}
      >
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            {row.outline ? (
              <span className="text-5xl font-black uppercase tracking-tight text-transparent" style={{ WebkitTextStroke: '1.4px var(--foreground)' }}>
                {w}
              </span>
            ) : (
              <span className="relative text-5xl font-black uppercase tracking-tight">
                {w}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.6, times: [0, 0.2, 0.8, 1], delay: (i % row.words.length) * 1.6, repeat: Infinity, repeatDelay: (row.words.length - 1) * 1.6 }}
                >
                  {w}
                </motion.span>
              </span>
            )}
            <span className={cn('size-3 rotate-45 rounded-[2px]', index === 1 ? 'bg-violet-500' : 'bg-muted-foreground/40')} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function OutlineMarqueeText() {
  return (
    <div
      className="relative flex h-[280px] w-[480px] flex-col justify-center gap-3 overflow-hidden text-foreground"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)' }}
    >
      <div className="-rotate-3 space-y-3">
        {ROWS.map((row, i) => (
          <Row key={i} row={row} index={i} />
        ))}
      </div>
    </div>
  )
}
