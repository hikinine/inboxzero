'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'

// "Map Pin Ripple": um pin principal emite ondas; pins secundários acendem em sequência.
const PINS = [
  { x: 70, y: 90 },
  { x: 250, y: 70 },
  { x: 210, y: 190 },
  { x: 90, y: 200 },
]

export default function MapPinRipple() {
  return (
    <div className="relative h-[260px] w-[320px] overflow-hidden rounded-2xl border bg-card text-foreground">
      <svg className="absolute inset-0 size-full opacity-40" aria-hidden>
        <defs>
          <pattern id="mpr-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mpr-grid)" />
      </svg>
      {PINS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute size-2.5 rounded-full bg-muted-foreground"
          style={{ left: p.x, top: p.y }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 + i * 0.3 }}
        />
      ))}
      <div className="absolute left-[160px] top-[130px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute -left-5 -top-5 size-10 rounded-full border border-primary/50"
            animate={{ scale: [1, 3.2], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.8 }}
          />
        ))}
        <motion.div className="relative -left-4 -top-8 text-primary" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <MapPin className="size-8 fill-primary/20" />
        </motion.div>
      </div>
      <div className="absolute bottom-3 left-3 rounded-md border bg-background/90 px-2 py-1 text-[11px] backdrop-blur">
        <span className="font-medium">São Paulo</span> · 4 unidades próximas
      </div>
    </div>
  )
}
