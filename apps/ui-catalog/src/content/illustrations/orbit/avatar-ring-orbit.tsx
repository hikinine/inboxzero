'use client'

import { useEffect, useState } from 'react'
import { Radio } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Avatar Ring Orbit": um anel de dez lugares gira devagar em volta da sala ao vivo. Usuários chegam de fora do quadro,
// um a um, e encaixam com mola no próximo lugar vazio (tracejado); o contador sobe e um aviso "fulano entrou" troca
// embaixo. Com a sala cheia, todos saem juntos e o ciclo recomeça.
const RING = 124
const PEOPLE = [
  { name: 'Camila', initials: 'CA', tone: 'from-rose-400 to-orange-400' },
  { name: 'Rafael', initials: 'RF', tone: 'from-sky-400 to-indigo-500' },
  { name: 'Juliana', initials: 'JU', tone: 'from-emerald-400 to-teal-500' },
  { name: 'Thiago', initials: 'TH', tone: 'from-amber-400 to-rose-500' },
  { name: 'Larissa', initials: 'LA', tone: 'from-violet-400 to-fuchsia-500' },
  { name: 'Bruno', initials: 'BR', tone: 'from-cyan-400 to-sky-500' },
  { name: 'Patrícia', initials: 'PA', tone: 'from-lime-400 to-emerald-500' },
  { name: 'Gustavo', initials: 'GU', tone: 'from-orange-400 to-red-500' },
  { name: 'Fernanda', initials: 'FE', tone: 'from-pink-400 to-rose-500' },
  { name: 'Lucas', initials: 'LU', tone: 'from-indigo-400 to-violet-500' },
] as const

const SLOTS = PEOPLE.map((_, i) => {
  const a = ((i * 36 - 90) * Math.PI) / 180
  return { x: Math.cos(a) * RING, y: Math.sin(a) * RING, ox: Math.cos(a) * (RING + 130), oy: Math.sin(a) * (RING + 130) }
})

export default function AvatarRingOrbit() {
  const [filled, setFilled] = useState(0)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n = n >= PEOPLE.length + 3 ? 0 : n + 1 // segura a sala cheia por ~3 ticks antes de esvaziar
      setFilled(Math.min(n, PEOPLE.length))
    }, 750)
    return () => clearInterval(id)
  }, [])

  const last = filled > 0 ? PEOPLE[filled - 1] : null

  return (
    <div className="relative size-[340px] overflow-hidden text-foreground">
      <div className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-border" style={{ width: RING * 2, height: RING * 2, marginLeft: -RING, marginTop: -RING }} />

      <motion.div className="absolute left-1/2 top-1/2 size-0" animate={{ rotate: 360 }} transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}>
        {SLOTS.map((s, i) => (
          <div key={i} className="absolute" style={{ left: s.x, top: s.y }}>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 48, repeat: Infinity, ease: 'linear' }} className="-translate-x-1/2 -translate-y-1/2">
              <span className="block size-10 rounded-full border-2 border-dashed border-muted-foreground/30" />
            </motion.div>
          </div>
        ))}
        <AnimatePresence>
          {PEOPLE.slice(0, filled).map((p, i) => {
            const s = SLOTS[i]
            return (
              <motion.div
                key={p.name}
                className="absolute"
                initial={{ x: s.ox, y: s.oy, scale: 0.4, opacity: 0 }}
                animate={{ x: s.x, y: s.y, scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.35, delay: i * 0.03 } }}
                transition={{ type: 'spring', stiffness: 170, damping: 17 }}
              >
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 48, repeat: Infinity, ease: 'linear' }} className="-translate-x-1/2 -translate-y-1/2">
                  <span className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white shadow-md ring-2 ring-background ${p.tone}`}>{p.initials}</span>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* centro */}
      <div className="absolute left-1/2 top-1/2 flex w-[120px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl border bg-card px-3 py-3 text-center shadow-sm">
        <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <motion.span className="size-1.5 rounded-full bg-rose-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          Ao vivo
        </span>
        <motion.span key={filled} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="mt-1.5 text-2xl font-semibold tabular-nums">
          {118 + filled}
        </motion.span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Radio className="size-3" /> na sala
        </span>
      </div>

      {/* aviso de entrada */}
      <div className="absolute inset-x-0 bottom-1 flex h-6 justify-center">
        <AnimatePresence mode="wait">
          {last && filled < PEOPLE.length + 1 && (
            <motion.span
              key={last.name}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-full border bg-background px-2.5 py-1 text-[10px] text-muted-foreground shadow-sm"
            >
              <span className="font-medium text-foreground">{last.name}</span> entrou na sala
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
