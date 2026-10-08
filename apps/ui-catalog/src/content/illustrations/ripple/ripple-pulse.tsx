'use client'

import { motion } from 'motion/react'
import { Radio } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Ripple Pulse": ondas concêntricas partindo de um emissor central; contatos nas bordas acendem.
const PEOPLE = [
  { name: 'AS', angle: -60 },
  { name: 'BR', angle: 20 },
  { name: 'CM', angle: 110 },
  { name: 'DL', angle: 200 },
  { name: 'EF', angle: 290 },
]

export default function RipplePulse() {
  return (
    <div className="relative size-[320px] text-foreground">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border border-primary/40"
          style={{ width: 80, height: 80, marginLeft: -40, marginTop: -40 }}
          animate={{ scale: [1, 4], opacity: [0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i }}
        />
      ))}
      {PEOPLE.map((p, i) => {
        const a = (p.angle * Math.PI) / 180
        const r = 128
        return (
          <motion.div
            key={p.name}
            className="absolute left-1/2 top-1/2"
            style={{ x: Math.cos(a) * r - 18, y: Math.sin(a) * r - 18 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.6 + i * 0.12 }}
          >
            <Avatar className="size-9 border bg-card">
              <AvatarFallback className="text-[11px]">{p.name}</AvatarFallback>
            </Avatar>
          </motion.div>
        )
      })}
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <Radio className="size-6" />
      </div>
    </div>
  )
}
