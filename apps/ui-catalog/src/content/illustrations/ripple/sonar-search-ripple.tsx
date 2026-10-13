'use client'

import { useEffect, useState } from 'react'
import { Search, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Sonar Search Ripple": busca por proximidade como um sonar. Do centro saem pings contínuos; cada profissional
// próximo "aparece" no instante em que a primeira onda chega até ele (o atraso sai da distância), com avatar, nota e
// distância. O contador da busca sobe, segura com todos encontrados e a varredura recomeça.
const W = 420
const H = 300
const C = { x: 210, y: 170 }
const MAX_R = 190
const PING = 2.2 // s para a onda ir do centro até MAX_R

const PROS = [
  { name: 'Carla', ini: 'CS', x: 128, y: 120, rating: '4,9' },
  { name: 'João', ini: 'JM', x: 300, y: 128, rating: '4,7' },
  { name: 'Bruna', ini: 'BA', x: 262, y: 236, rating: '5,0' },
  { name: 'Diego', ini: 'DR', x: 92, y: 226, rating: '4,8' },
  { name: 'Lívia', ini: 'LP', x: 360, y: 214, rating: '4,6' },
  { name: 'Otávio', ini: 'OT', x: 58, y: 150, rating: '4,5' },
].map((p) => {
  const dist = Math.hypot(p.x - C.x, p.y - C.y)
  return { ...p, dist, at: (dist / MAX_R) * PING, km: (dist / 60).toFixed(1).replace('.', ',') }
})
const CYCLE = PING * 3 // múltiplo do intervalo entre pings, para o reinício casar com uma onda saindo do centro

export default function SonarSearchRipple() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 0.1 >= CYCLE ? 0 : v + 0.1)), 100)
    return () => clearInterval(id)
  }, [])
  const found = PROS.filter((p) => t >= p.at)

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-foreground" style={{ width: W, height: H }}>
      {/* barra de busca */}
      <div className="absolute inset-x-4 top-3 z-20 flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
        <Search className="size-3.5 text-muted-foreground" />
        <span className="flex-1 truncate">Eletricistas perto de você</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium tabular-nums">{found.length} encontrados</span>
      </div>

      {/* grade de referência */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        {[60, 110, 160].map((r) => (
          <circle key={r} cx={C.x} cy={C.y} r={r} fill="none" stroke="var(--border)" strokeDasharray="2 5" />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={C.x}
            cy={C.y}
            r={MAX_R}
            fill="rgb(14 165 233 / 0.06)"
            stroke="rgb(14 165 233)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: 'view-box', transformOrigin: `${C.x}px ${C.y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.05, 1], opacity: [0.9, 0] }}
            transition={{ duration: PING, delay: i * (PING / 3), repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* resultados */}
      <AnimatePresence>
        {found.map((p) => (
          <motion.div
            key={p.name}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
          >
            <span className="relative flex size-9 items-center justify-center rounded-full border-2 border-sky-500 bg-background text-[11px] font-semibold shadow-sm">
              {p.ini}
              <motion.span className="absolute inset-0 rounded-full ring-2 ring-sky-500" initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 0.7 }} />
            </span>
            <span className="mt-1 flex items-center gap-1 whitespace-nowrap rounded-full bg-background/90 px-1.5 py-0.5 text-[9px] font-medium shadow-sm ring-1 ring-border">
              {p.name}
              <Star className="size-2.5 fill-amber-400 text-amber-400" />
              {p.rating}
              <span className="text-muted-foreground">· {p.km} km</span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* centro */}
      <div className="absolute z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg ring-4 ring-sky-500/20" style={{ left: C.x, top: C.y }}>
        <Search className="size-5" />
      </div>
    </div>
  )
}
