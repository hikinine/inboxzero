'use client'

import { useEffect, useState } from 'react'
import { CircleCheck, Plane } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Boarding Pass Stack": cartões de embarque empilhados com os de trás espiando por cima. No da frente um aviãozinho
// cruza a rota pontilhada, o laser do leitor varre o código de barras do canhoto, o selo "Embarque liberado" aparece
// e o cartão sai pela direita enquanto o próximo passageiro assume a frente.
interface Pass {
  from: string
  fromCity: string
  to: string
  toCity: string
  flight: string
  gate: string
  seat: string
  time: string
  name: string
  group: string
  color: string
}

const PASSES: readonly Pass[] = [
  { from: 'GRU', fromCity: 'São Paulo', to: 'REC', toCity: 'Recife', flight: 'BR 4521', gate: '12', seat: '14C', time: '07:40', name: 'Marina Costa', group: '2', color: 'bg-sky-500' },
  { from: 'CNF', fromCity: 'Belo Horizonte', to: 'POA', toCity: 'Porto Alegre', flight: 'BR 3307', gate: '05', seat: '22A', time: '10:15', name: 'Rafael Lima', group: '4', color: 'bg-violet-500' },
  { from: 'BSB', fromCity: 'Brasília', to: 'SSA', toCity: 'Salvador', flight: 'BR 1189', gate: '08', seat: '03F', time: '13:05', name: 'Juliana Prado', group: '1', color: 'bg-amber-500' },
  { from: 'GIG', fromCity: 'Rio de Janeiro', to: 'FLN', toCity: 'Florianópolis', flight: 'BR 2764', gate: '21', seat: '09B', time: '18:50', name: 'Carlos Mendes', group: '3', color: 'bg-emerald-500' },
]

// barras pseudoaleatórias e determinísticas a partir do número do voo
function bars(seed: string) {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return Array.from({ length: 22 }, (_, i) => {
    h = (h * 1103515245 + 12345 + i) >>> 0
    return 1 + (h % 3)
  })
}

type Phase = 'idle' | 'scan' | 'ok'

export default function BoardingPassStack() {
  const [head, setHead] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    const a = setTimeout(() => setPhase('scan'), 600)
    const b = setTimeout(() => setPhase('ok'), 2000)
    const c = setTimeout(() => {
      setPhase('idle')
      setHead((h) => (h + 1) % PASSES.length)
    }, 3500)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
      clearTimeout(c)
    }
  }, [head])

  const visible = [0, 1, 2].map((d) => PASSES[(head + d) % PASSES.length]!)

  return (
    <div className="relative h-[300px] w-[420px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((p, depth) => {
          const front = depth === 0
          return (
            <motion.div
              key={p.flight}
              initial={{ opacity: 0, y: 40 - 3 * 18, scale: 0.88 }}
              animate={{ opacity: 1 - depth * 0.25, y: 40 - depth * 18, scale: 1 - depth * 0.05, zIndex: 10 - depth, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: 360, rotate: 8, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="absolute inset-x-[30px] top-[60px] flex h-[168px] overflow-hidden rounded-2xl border bg-card shadow-lg"
              style={{ transformOrigin: '50% 0%' }}
            >
              {/* corpo do cartão */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className={cn('flex items-center justify-between px-4 py-2 text-white', p.color)}>
                  <span className="text-[11px] font-semibold tracking-wide">CARTÃO DE EMBARQUE</span>
                  <span className="font-mono text-[11px]">{p.flight}</span>
                </div>
                <div className="flex items-center justify-between px-4 pt-3">
                  <div>
                    <p className="text-2xl font-bold leading-none tracking-tight">{p.from}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{p.fromCity}</p>
                  </div>
                  <div className="relative mx-3 h-4 flex-1">
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-muted-foreground/40" />
                    <motion.span
                      className="absolute top-1/2 -mt-2 text-muted-foreground"
                      animate={front ? { left: ['0%', '88%'] } : { left: '44%' }}
                      transition={front ? { duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 } : { duration: 0.3 }}
                    >
                      <Plane className="size-4 rotate-45" />
                    </motion.span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold leading-none tracking-tight">{p.to}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{p.toCity}</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-4 gap-2 px-4 pb-3 text-[10px]">
                  {[
                    ['Passageiro', p.name.split(' ')[0]!],
                    ['Embarque', p.time],
                    ['Portão', p.gate],
                    ['Assento', p.seat],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-muted-foreground">{k}</p>
                      <p className="truncate text-xs font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* picote */}
              <div className="relative w-0 border-l-2 border-dashed border-border">
                <span className="absolute -left-[9px] -top-2 size-4 rounded-full border bg-background" />
                <span className="absolute -bottom-2 -left-[9px] size-4 rounded-full border bg-background" />
              </div>

              {/* canhoto com código de barras */}
              <div className="relative flex w-[78px] flex-col items-center justify-center gap-1.5 px-2">
                <span className="text-[9px] font-medium text-muted-foreground">GRUPO {p.group}</span>
                <div className="relative flex h-[92px] w-[46px] flex-col justify-between overflow-hidden">
                  {bars(p.flight).map((w, i) => (
                    <span key={i} className="w-full rounded-[1px] bg-foreground" style={{ height: w }} />
                  ))}
                  {front && phase === 'scan' && (
                    <motion.span
                      className="absolute inset-x-[-4px] h-0.5 bg-rose-500 shadow-[0_0_8px_2px] shadow-rose-500/70"
                      initial={{ y: 0 }}
                      animate={{ y: [0, 90, 0] }}
                      transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
                    />
                  )}
                </div>
                <span className="font-mono text-[8px] text-muted-foreground">{p.seat}</span>

                <AnimatePresence>
                  {front && phase === 'ok' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: -8 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                      className="absolute inset-1 flex flex-col items-center justify-center rounded-lg bg-emerald-500/90 text-center text-white"
                    >
                      <CircleCheck className="size-6" />
                      <span className="mt-1 text-[9px] font-semibold leading-tight">Embarque liberado</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground">
        Portão de embarque · {PASSES.length} passageiros na fila
      </p>
    </div>
  )
}
