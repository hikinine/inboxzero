'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Eye, Radio } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// "Pulse Button Ripple": botão "AO VIVO" com anéis em formato de pílula pulsando para fora; contador de
// espectadores subindo e avatares de quem está assistindo.
export default function PulseButtonRipple() {
  const [viewers, setViewers] = useState(1248)
  useEffect(() => {
    const t = setInterval(() => setViewers((v) => v + 1 + (v % 3 === 0 ? 2 : 0)), 900)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative flex h-[260px] w-[360px] flex-col items-center justify-center gap-6 text-foreground">
      <div className="relative">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-rose-500"
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut', delay: i * 0.7 }}
          />
        ))}
        <motion.button
          type="button"
          className="relative flex items-center gap-2.5 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-rose-500/30"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Radio className="size-4" />
          AO VIVO
        </motion.button>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex -space-x-2">
          {['AS', 'BR', 'CM'].map((n) => (
            <Avatar key={n} className="size-6 border-2 border-background bg-card">
              <AvatarFallback className="text-[9px]">{n}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="flex items-center gap-1 tabular-nums">
          <Eye className="size-3.5" />
          {viewers.toLocaleString('pt-BR')} assistindo
        </span>
      </div>
    </div>
  )
}
