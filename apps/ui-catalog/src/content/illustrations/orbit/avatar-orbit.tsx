'use client'

import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Avatar Orbit": contatos orbitam um centro de conversas; cada avatar contra-gira para ficar em pé.
const RINGS: Array<{ r: number; d: number; names: string[]; reverse?: boolean }> = [
  { r: 70, d: 20, names: ['AS', 'BR', 'CM'] },
  { r: 125, d: 36, names: ['DL', 'EF', 'FN', 'GH', 'IJ'], reverse: true },
]

export default function AvatarOrbit() {
  return (
    <div className="relative size-[320px] text-foreground">
      {RINGS.map((ring) => (
        <motion.div
          key={ring.r}
          className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-border"
          style={{ width: ring.r * 2, height: ring.r * 2, marginLeft: -ring.r, marginTop: -ring.r }}
          animate={{ rotate: ring.reverse ? -360 : 360 }}
          transition={{ duration: ring.d, repeat: Infinity, ease: 'linear' }}
        >
          {ring.names.map((n, i) => {
            const a = (i / ring.names.length) * Math.PI * 2
            return (
              <motion.div
                key={n}
                className="absolute left-1/2 top-1/2"
                style={{ x: Math.cos(a) * ring.r - 16, y: Math.sin(a) * ring.r - 16 }}
                animate={{ rotate: ring.reverse ? 360 : -360 }}
                transition={{ duration: ring.d, repeat: Infinity, ease: 'linear' }}
              >
                <Avatar className="size-8 border bg-card shadow-sm">
                  <AvatarFallback className="text-[10px]">{n}</AvatarFallback>
                </Avatar>
              </motion.div>
            )
          })}
        </motion.div>
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MessageCircle className="size-6" />
      </motion.div>
    </div>
  )
}
