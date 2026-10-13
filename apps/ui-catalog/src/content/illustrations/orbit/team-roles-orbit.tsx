'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Team Roles Orbit": um squad em órbita — cada integrante é um avatar com iniciais em degradê e uma pílula com o
// papel (Design, Front, Back, QA, PM, Dados), sempre em pé. A cada 2s um integrante entra em destaque: anel pulsando
// em volta do avatar e um card embaixo com nome, cargo, status e tarefa atual. Anel interno de pontos gira ao contrário.
const W = 380
const H = 420
const C = { x: W / 2, y: 180 }
const R = 132
const DURATION = 48
const TEAM = [
  { ini: 'ML', name: 'Marina Lopes', role: 'Design', title: 'Product Designer', grad: 'from-pink-500 to-rose-500', pill: 'bg-pink-500/10 text-pink-600 dark:text-pink-400', task: 'Protótipo do checkout' },
  { ini: 'TS', name: 'Thiago Sales', role: 'Front', title: 'Dev Front-end', grad: 'from-sky-500 to-blue-600', pill: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', task: 'Tela de pagamento' },
  { ini: 'RA', name: 'Renata Alves', role: 'Back', title: 'Dev Back-end', grad: 'from-violet-500 to-indigo-600', pill: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', task: 'Webhook do Pix' },
  { ini: 'CF', name: 'Caio Freitas', role: 'QA', title: 'Analista de QA', grad: 'from-amber-400 to-orange-500', pill: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', task: 'Testes de regressão' },
  { ini: 'BN', name: 'Beatriz Nogueira', role: 'PM', title: 'Product Manager', grad: 'from-emerald-500 to-teal-600', pill: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', task: 'Planejamento da sprint' },
  { ini: 'LK', name: 'Lucas Kenji', role: 'Dados', title: 'Analista de Dados', grad: 'from-cyan-500 to-sky-600', pill: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', task: 'Funil de conversão' },
] as const

export default function TeamRolesOrbit() {
  const [spot, setSpot] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSpot((s) => (s + 1) % TEAM.length), 2000)
    return () => clearInterval(id)
  }, [])

  const p = TEAM[spot]

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <div className="absolute rounded-full border border-border" style={{ left: C.x - R, top: C.y - R, width: R * 2, height: R * 2 }} />
      <motion.div
        className="absolute rounded-full border border-dashed border-border"
        style={{ left: C.x - 70, top: C.y - 70, width: 140, height: 140 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {TEAM.map((t, i) => {
          const a = (i / TEAM.length) * Math.PI * 2 + 0.5
          return <span key={t.ini} className={`absolute size-2 rounded-full bg-gradient-to-br ${t.grad}`} style={{ left: 70 + Math.cos(a) * 70 - 4, top: 70 + Math.sin(a) * 70 - 4 }} />
        })}
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: C.x - R, top: C.y - R, width: R * 2, height: R * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
      >
        {TEAM.map((t, i) => {
          const a = (i / TEAM.length) * Math.PI * 2 - Math.PI / 2
          const x = R + Math.cos(a) * R
          const y = R + Math.sin(a) * R
          const on = i === spot
          return (
            <motion.div
              key={t.ini}
              className="absolute flex w-16 flex-col items-center"
              style={{ left: x - 32, top: y - 24 }}
              animate={{ rotate: -360 }}
              transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
            >
              <span className="relative">
                {on && (
                  <motion.span
                    className="absolute -inset-1 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.25], opacity: [0.9, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <motion.span
                  className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ring-2 ring-background ${t.grad}`}
                  animate={{ scale: on ? 1.12 : 1 }}
                >
                  {t.ini}
                </motion.span>
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-background bg-emerald-500" />
              </span>
              <span className={`mt-1 rounded-full px-1.5 py-px text-[9px] font-medium ${t.pill}`}>{t.role}</span>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: C.x, top: C.y }}>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Users className="size-6" />
        </span>
        <span className="mt-1.5 text-xs font-semibold">Squad Checkout</span>
        <span className="text-[10px] text-muted-foreground">6 pessoas · sprint 14</span>
      </div>

      <div className="absolute inset-x-6 bottom-2 h-[68px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.ini}
            className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ${p.grad}`}>{p.ini}</span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-medium">{p.name}</span>
                <span className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[11px] text-muted-foreground">{p.title}</div>
            </div>
            <div className="text-right leading-tight">
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">agora</div>
              <div className="text-[11px] font-medium">{p.task}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
