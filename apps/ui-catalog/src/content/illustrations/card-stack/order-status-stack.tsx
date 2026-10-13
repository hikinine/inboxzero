'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { CreditCard, House, Package, PackageCheck, Truck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Order Status Stack": pedidos empilhados (os de trás espiam por cima). O pedido da frente avança pelo rastreio —
// pago, separando, enviado, entregue — com a trilha preenchendo, o ícone da etapa saltando e a linha de status
// trocando; ao ser entregue, desce para fora e o próximo assume. Ciclo contínuo.
const STAGES: ReadonlyArray<{ label: string; Icon: LucideIcon; status: string }> = [
  { label: 'Pago', Icon: CreditCard, status: 'Pagamento aprovado via Pix' },
  { label: 'Separando', Icon: Package, status: 'Separando no CD de Cajamar' },
  { label: 'Enviado', Icon: Truck, status: 'Em trânsito com a transportadora' },
  { label: 'Entregue', Icon: House, status: 'Entregue na portaria' },
]

const ORDERS = [
  { id: 'PED-10293', item: 'Tênis Corrida Nimbus 42', value: 'R$ 459,90', who: 'Rodrigo · Campinas', thumb: 'from-sky-400 to-indigo-500' },
  { id: 'PED-10294', item: 'Cafeteira Expresso Duo', value: 'R$ 899,00', who: 'Letícia · Niterói', thumb: 'from-amber-400 to-orange-500' },
  { id: 'PED-10295', item: 'Mochila Urbana 25L', value: 'R$ 229,90', who: 'Eduardo · Londrina', thumb: 'from-emerald-400 to-teal-500' },
  { id: 'PED-10296', item: 'Fone Bluetooth Pulse', value: 'R$ 349,00', who: 'Camila · São Luís', thumb: 'from-rose-400 to-pink-500' },
] as const

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function OrderStatusStack() {
  const [head, setHead] = useState(0)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let h = 0
      while (!cancelled) {
        for (let s = 0; s < STAGES.length && !cancelled; s++) {
          setStage(s)
          await sleep(s === STAGES.length - 1 ? 1500 : 1000)
        }
        if (cancelled) return
        h = (h + 1) % ORDERS.length
        setStage(0)
        setHead(h)
        await sleep(500)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = [0, 1, 2].map((d) => ({ o: ORDERS[(head + d) % ORDERS.length], d }))
  const delivered = stage === STAGES.length - 1

  return (
    <div className="relative h-[270px] w-[360px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map(({ o, d }) => {
          const front = d === 0
          return (
            <motion.div
              key={o.id}
              initial={{ y: -60, scale: 0.84, opacity: 0 }}
              animate={{ y: 60 - d * 22, scale: 1 - d * 0.06, opacity: 1 - d * 0.3 }}
              exit={{ y: 220, opacity: 0, rotate: -4, transition: { duration: 0.45, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="absolute inset-x-0 top-0 rounded-2xl border bg-card p-4 shadow-lg"
              style={{ zIndex: 10 - d }}
            >
              <div className="flex items-center gap-3">
                <span className={cn('size-11 shrink-0 rounded-lg bg-gradient-to-br', o.thumb)} />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] text-muted-foreground">#{o.id}</div>
                  <div className="truncate text-sm font-medium">{o.item}</div>
                  <div className="text-[10px] text-muted-foreground">{o.who}</div>
                </div>
                <span className="text-sm font-semibold tabular-nums">{o.value}</span>
              </div>

              {/* trilha de rastreio */}
              <div className="relative mt-4 flex justify-between">
                <div className="absolute inset-x-7 top-4 h-0.5 bg-muted" />
                <motion.div
                  className="absolute inset-x-7 top-4 h-0.5 origin-left bg-emerald-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: front ? stage / (STAGES.length - 1) : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
                {STAGES.map((s, i) => {
                  const done = front && i <= stage
                  const current = front && i === stage
                  return (
                    <div key={s.label} className="relative flex w-14 flex-col items-center">
                      <motion.span
                        key={current ? `cur-${head}-${i}` : `s-${i}`}
                        initial={current ? { scale: 0.6 } : false}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                        className={cn('flex size-8 items-center justify-center rounded-full border-2 transition-colors duration-300', done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-border bg-card text-muted-foreground')}
                      >
                        {i === STAGES.length - 1 && done ? <PackageCheck className="size-4" /> : <s.Icon className="size-4" />}
                      </motion.span>
                      <span className={cn('mt-1 text-[10px]', done ? 'font-medium' : 'text-muted-foreground')}>{s.label}</span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-3 flex h-5 items-center justify-between overflow-hidden rounded-md bg-muted/60 px-2 text-[10px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={front ? stage : 'x'} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }} className="truncate">
                    {front ? STAGES[stage].status : 'Aguardando pagamento'}
                  </motion.span>
                </AnimatePresence>
                {front && delivered && <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ concluído</span>}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
