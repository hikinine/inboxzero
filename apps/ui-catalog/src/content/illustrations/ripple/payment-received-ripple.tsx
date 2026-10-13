'use client'

import { useEffect, useState } from 'react'
import { Banknote, CircleCheck } from 'lucide-react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'

// "Payment Received Ripple": a cada pagamento que chega, o ícone central dá um pulo, três anéis verdes estouram em
// sequência, moedinhas sobem e somem, o aviso "Pix recebido" desce do topo e o saldo do dia conta até o valor novo.
const PAYMENTS = [
  { from: 'Ana Souza', value: 1290 },
  { from: 'Mercadinho São Jorge', value: 349.9 },
  { from: 'Rafael Nunes', value: 87.5 },
  { from: 'Clínica Sorriso', value: 2150 },
] as const
const START = 8420.35
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function PaymentReceivedRipple() {
  const [n, setN] = useState(1)
  const balance = useMotionValue(START)
  const text = useTransform(balance, (v) => brl(v))

  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 2600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (n === 0) return
    const p = PAYMENTS[(n - 1) % PAYMENTS.length]!
    // a cada volta completa o saldo recomeça, para o número não crescer para sempre
    const base = (n - 1) % PAYMENTS.length === 0 ? START : balance.get()
    const c = animate(balance, [base, base + p.value], { duration: 1.2, ease: 'easeOut', delay: 0.15 })
    return () => c.stop()
  }, [n, balance])

  const cur = n > 0 ? PAYMENTS[(n - 1) % PAYMENTS.length]! : null

  return (
    <div className="relative h-[300px] w-[400px] overflow-hidden rounded-2xl border bg-card text-foreground">
      {/* aviso */}
      <div className="absolute inset-x-6 top-3 z-20 h-14">
        <AnimatePresence mode="popLayout">
          {cur && (
            <motion.div
              key={n}
              initial={{ y: -70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -70, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="flex items-center gap-2.5 rounded-xl border bg-background/95 p-2.5 shadow-md backdrop-blur"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <CircleCheck className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">Pix recebido · {brl(cur.value)}</p>
                <p className="truncate text-[10px] text-muted-foreground">de {cur.from} · agora</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* anéis + moedas (remontam a cada pagamento) */}
      <div className="absolute left-1/2 top-[160px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={`${n}-r${i}`}
            className="absolute -left-[110px] -top-[110px] size-[220px] rounded-full border-2 border-emerald-500 bg-emerald-500/5"
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: [0.25, 1], opacity: n === 0 ? 0 : [0.9, 0] }}
            transition={{ duration: 1.4, delay: i * 0.18, ease: 'easeOut' }}
          />
        ))}
        {n > 0 &&
          [-58, -24, 18, 52].map((dx, i) => (
            <motion.span
              key={`${n}-c${i}`}
              className="absolute -left-2.5 -top-2.5 flex size-5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-amber-950 shadow"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: dx, y: [-10, -96 - i * 8], opacity: [0, 1, 0], scale: 1 }}
              transition={{ duration: 1.3, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
            >
              R$
            </motion.span>
          ))}
        <motion.span
          key={`${n}-icon`}
          className="absolute -left-8 -top-8 flex size-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg"
          initial={{ scale: 1 }}
          animate={{ scale: n === 0 ? 1 : [1, 1.22, 0.94, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Banknote className="size-7" />
        </motion.span>
      </div>

      {/* saldo */}
      <div className="absolute inset-x-0 bottom-5 text-center">
        <p className="text-[11px] text-muted-foreground">Recebido hoje</p>
        <motion.p className="text-2xl font-bold tabular-nums tracking-tight">{text}</motion.p>
      </div>
    </div>
  )
}
