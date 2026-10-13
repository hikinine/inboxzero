'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, MapPin, Video } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Calendar Event Stack": agenda do dia como pilha de eventos (os próximos ficam por baixo, menores). O evento da
// frente tem uma contagem regressiva em anel — "começa em 5 min" vai descendo até "Agora", que pulsa — e então o
// card sobe e sai, o próximo assume e o relógio do cabeçalho avança. Ciclo contínuo.
const EVENTS = [
  { id: 'e1', title: 'Daily do time de produto', start: '09:30', end: '09:45', where: 'Google Meet', online: true, bar: 'bg-sky-500', people: ['AS', 'RF', 'JU'] },
  { id: 'e2', title: 'Revisão de proposta · Nexa', start: '10:00', end: '11:00', where: 'Sala Ipê · 3º andar', online: false, bar: 'bg-amber-500', people: ['CM', 'TH'] },
  { id: 'e3', title: '1:1 com a Larissa', start: '11:30', end: '12:00', where: 'Zoom', online: true, bar: 'bg-violet-500', people: ['LA'] },
  { id: 'e4', title: 'Almoço com cliente', start: '12:30', end: '14:00', where: 'Mocotó · Vila Medeiros', online: false, bar: 'bg-emerald-500', people: ['PA', 'GU', 'FE', 'LU'] },
] as const

const MINUTES = 5
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function CalendarEventStack() {
  const [head, setHead] = useState(0)
  const [left, setLeft] = useState(MINUTES)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let h = 0
      while (!cancelled) {
        for (let m = MINUTES; m >= 0 && !cancelled; m--) {
          setLeft(m)
          await sleep(m === 0 ? 1600 : 520)
        }
        if (cancelled) return
        h = (h + 1) % EVENTS.length
        setHead(h)
        setLeft(MINUTES)
        await sleep(400)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = [0, 1, 2].map((d) => ({ e: EVENTS[(head + d) % EVENTS.length], d }))
  const now = EVENTS[head]
  const [hh, mm] = now.start.split(':').map(Number)
  const clock = new Date(2026, 9, 14, hh, mm - left).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="w-[330px] text-foreground">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CalendarDays className="size-4 text-muted-foreground" /> Hoje · ter, 14 out
        </div>
        <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] tabular-nums">{clock}</span>
      </div>

      <div className="relative h-[200px]">
        <AnimatePresence initial={false}>
          {visible.map(({ e, d }) => {
            const front = d === 0
            const live = front && left === 0
            return (
              <motion.div
                key={e.id}
                initial={{ y: 70, scale: 0.85, opacity: 0 }}
                animate={{ y: d * 20, scale: 1 - d * 0.06, opacity: 1 - d * 0.28 }}
                exit={{ y: -70, x: -40, rotate: -6, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }}
                transition={{ type: 'spring', stiffness: 230, damping: 24 }}
                className="absolute inset-x-0 top-0 flex origin-bottom overflow-hidden rounded-xl border bg-card shadow-md"
                style={{ zIndex: 10 - d }}
              >
                <span className={cn('w-1.5 shrink-0', e.bar)} />
                <div className="flex flex-1 items-start gap-3 p-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {e.start} – {e.end}
                    </div>
                    <div className="mt-0.5 truncate text-sm font-medium">{e.title}</div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      {e.online ? <Video className="size-3" /> : <MapPin className="size-3" />} {e.where}
                    </div>
                    <div className="mt-2.5 flex -space-x-1.5">
                      {e.people.map((p) => (
                        <span key={p} className="flex size-5 items-center justify-center rounded-full bg-muted text-[8px] font-semibold ring-2 ring-card">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {front && (
                    <div className="relative flex size-14 shrink-0 items-center justify-center">
                      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden>
                        <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border)" strokeWidth="4" />
                        <motion.circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          className={live ? 'text-rose-500' : 'text-primary'}
                          initial={{ pathLength: 1 }}
                          animate={{ pathLength: live ? 1 : left / MINUTES }}
                          transition={{ duration: 0.45 }}
                        />
                      </svg>
                      {live ? (
                        <motion.span className="text-[10px] font-bold uppercase text-rose-500" animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                          Agora
                        </motion.span>
                      ) : (
                        <span className="text-center leading-none">
                          <span className="block text-base font-semibold tabular-nums">{left}</span>
                          <span className="text-[8px] text-muted-foreground">min</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
