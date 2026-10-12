'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Location Share Ripple": você no centro do mapa (avatar com ondas contínuas) e amigos chegando um a um: o pin cai
// com mola, a distância aparece e uma linha pontilhada se desenha até você. Quando todos chegam, uma pausa e o
// ciclo recomeça. Mapa feito só com padrão de pontos e "ruas" em SVG.
const CENTER = { x: 180, y: 136 }
const FRIENDS = [
  { name: 'Ana', dist: '350 m', x: 82, y: 66, tone: 'text-rose-500 fill-rose-500/25' },
  { name: 'Bruno', dist: '1,2 km', x: 284, y: 84, tone: 'text-sky-500 fill-sky-500/25' },
  { name: 'Carla', dist: '600 m', x: 254, y: 206, tone: 'text-amber-500 fill-amber-500/25' },
  { name: 'Diego', dist: '2,4 km', x: 98, y: 200, tone: 'text-violet-500 fill-violet-500/25' },
]
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function LocationShareRipple() {
  const [arrived, setArrived] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setArrived(0)
        await sleep(900)
        for (let i = 1; i <= FRIENDS.length; i++) {
          if (cancelled) return
          setArrived(i)
          await sleep(1000)
        }
        await sleep(2200)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative h-[280px] w-[360px] overflow-hidden rounded-2xl border bg-card text-foreground">
      <svg className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id="lsr-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="1" fill="var(--border)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lsr-dots)" />
        {/* ruas */}
        <g fill="none" stroke="var(--border)" strokeWidth="7" strokeLinecap="round" opacity="0.55">
          <path d="M -10 120 Q 120 100 200 150 T 380 190" />
          <path d="M 150 -10 Q 140 90 190 140 T 240 300" />
          <path d="M 300 -10 Q 290 60 330 110 T 300 300" />
        </g>
        {/* linhas pontilhadas até quem chegou */}
        {FRIENDS.slice(0, arrived).map((f) => (
          <motion.path key={f.name} d={`M ${CENTER.x} ${CENTER.y} L ${f.x} ${f.y + 10}`} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }} />
        ))}
      </svg>

      {/* você: avatar com ondas contínuas */}
      <div className="absolute" style={{ left: CENTER.x, top: CENTER.y }}>
        {[0, 1, 2].map((i) => (
          <motion.span key={i} aria-hidden className="absolute -left-6 -top-6 size-12 rounded-full border border-primary/60" animate={{ scale: [1, 3.4], opacity: [0.55, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.85 }} />
        ))}
        <div className="absolute -left-6 -top-6 flex size-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg ring-4 ring-background">PS</div>
      </div>

      {/* amigos chegando */}
      <AnimatePresence>
        {FRIENDS.slice(0, arrived).map((f) => (
          <motion.div
            key={f.name}
            className="absolute flex flex-col items-center"
            style={{ left: f.x - 40, top: f.y - 24, width: 80 }}
            initial={{ y: -46, opacity: 0, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            <MapPin className={`size-7 ${f.tone}`} />
            <span className="-mt-0.5 h-1 w-3 rounded-full bg-foreground/20 blur-[1px]" />
            <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-1 whitespace-nowrap rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium shadow-sm">
              {f.name} · {f.dist}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md border bg-background/90 px-2 py-1 text-[11px] backdrop-blur">
        <motion.span className="size-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        Compartilhando ao vivo
      </div>
      <div className="absolute right-3 top-3 rounded-md border bg-background/90 px-2 py-1 text-[11px] tabular-nums backdrop-blur">
        <span className="font-medium">{arrived}</span> por perto
      </div>
    </div>
  )
}
