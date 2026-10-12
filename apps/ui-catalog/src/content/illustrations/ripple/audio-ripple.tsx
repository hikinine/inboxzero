'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Mic } from 'lucide-react'

// "Audio Ripple": microfone central com ondas circulares e um equalizador radial de 24 barras pulsando ao redor;
// cronômetro de gravação embaixo.
const BARS = 24
const RADIUS = 56

export default function AudioRipple() {
  const [seconds, setSeconds] = useState(12)
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s + 1) % 60), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative size-[320px] text-foreground">
      {/* ondas */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-primary/50"
          style={{ width: 64, height: 64, marginLeft: -32, marginTop: -32 }}
          animate={{ scale: [1, 3.6], opacity: [0.55, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.87 }}
        />
      ))}

      {/* equalizador radial */}
      {Array.from({ length: BARS }, (_, i) => (
        <motion.div key={i} className="absolute left-1/2 top-1/2" style={{ rotate: (i / BARS) * 360 }}>
          <motion.span
            className="block w-1 origin-bottom rounded-full bg-primary"
            style={{ height: 22, marginLeft: -2, marginTop: -(RADIUS + 22) }}
            animate={{ scaleY: [0.3, 1, 0.45, 0.85, 0.3], opacity: [0.5, 1, 0.6, 0.9, 0.5] }}
            transition={{ duration: 1.1 + (i % 5) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.09 }}
          />
        </motion.div>
      ))}

      {/* microfone */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Mic className="size-7" />
      </motion.div>

      {/* cronômetro */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
        <motion.span className="size-2 rounded-full bg-rose-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        Gravando
        <span className="font-mono tabular-nums text-muted-foreground">00:{String(seconds).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
