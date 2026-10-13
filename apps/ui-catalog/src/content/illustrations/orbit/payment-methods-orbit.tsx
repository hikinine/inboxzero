'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Banknote, Barcode, Bitcoin, Check, CreditCard, QrCode, Smartphone, Wallet } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Payment Methods Orbit": meios de pagamento orbitam o checkout num anel giratório. Raios finos ligam cada meio ao
// centro; a cada ciclo um deles é escolhido — o raio acende com tracejado correndo, o chip ganha anel colorido e o
// card central troca para "Pagando com…" e depois "Aprovado". Chips contra-giram para ficar sempre em pé.
const SIZE = 360
const C = SIZE / 2
const R = 138
const DURATION = 40
type Method = { label: string; Icon: LucideIcon; tone: string; ring: string }
const METHODS: ReadonlyArray<Method> = [
  { label: 'Pix', Icon: QrCode, tone: 'text-emerald-500', ring: 'ring-emerald-500' },
  { label: 'Crédito', Icon: CreditCard, tone: 'text-violet-500', ring: 'ring-violet-500' },
  { label: 'Boleto', Icon: Barcode, tone: 'text-foreground', ring: 'ring-foreground' },
  { label: 'Carteira', Icon: Wallet, tone: 'text-amber-500', ring: 'ring-amber-500' },
  { label: 'Débito', Icon: Banknote, tone: 'text-sky-500', ring: 'ring-sky-500' },
  { label: 'Aproximação', Icon: Smartphone, tone: 'text-rose-500', ring: 'ring-rose-500' },
  { label: 'Cripto', Icon: Bitcoin, tone: 'text-orange-500', ring: 'ring-orange-500' },
]

export default function PaymentMethodsOrbit() {
  const [sel, setSel] = useState(0)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i % 2 === 0) {
        setSel((s) => (s + 3) % METHODS.length)
        setOk(false)
      } else setOk(true)
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const m = METHODS[sel]

  return (
    <div className="relative text-foreground" style={{ width: SIZE, height: SIZE }}>
      <div className="absolute rounded-full border border-dashed border-border" style={{ inset: C - R }} />
      <div className="absolute rounded-full bg-gradient-to-b from-muted/60 to-transparent" style={{ inset: C - 76 }} />

      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden>
          {METHODS.map((mt, i) => {
            const a = (i / METHODS.length) * Math.PI * 2
            const x = C + Math.cos(a) * (R - 24)
            const y = C + Math.sin(a) * (R - 24)
            const x0 = C + Math.cos(a) * 62
            const y0 = C + Math.sin(a) * 62
            const active = i === sel
            return (
              <g key={mt.label}>
                <line x1={x0} y1={y0} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />
                {active && (
                  <motion.line
                    x1={x}
                    y1={y}
                    x2={x0}
                    y2={y0}
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, strokeDashoffset: [0, -20] }}
                    transition={{ opacity: { duration: 0.3 }, strokeDashoffset: { duration: 0.5, repeat: Infinity, ease: 'linear' } }}
                  />
                )}
              </g>
            )
          })}
        </svg>
        {METHODS.map((mt, i) => {
          const a = (i / METHODS.length) * Math.PI * 2
          const x = C + Math.cos(a) * R
          const y = C + Math.sin(a) * R
          const active = i === sel
          return (
            <motion.div
              key={mt.label}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: x - 22, top: y - 22, width: 44 }}
              animate={{ rotate: -360 }}
              transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
            >
              <motion.span
                className={`flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm ring-offset-2 ring-offset-background ${active ? `ring-2 ${mt.ring}` : ''}`}
                animate={{ scale: active ? 1.12 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <mt.Icon className={`size-5 ${mt.tone}`} />
              </motion.span>
              <span className={`whitespace-nowrap text-[10px] ${active ? 'font-medium' : 'text-muted-foreground'}`}>{mt.label}</span>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="absolute left-1/2 top-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card p-3 text-center shadow-lg">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Checkout</div>
        <div className="text-lg font-semibold tabular-nums">R$ 189,90</div>
        <div className="relative mt-1 h-5 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${sel}-${ok}`}
              className={`flex items-center justify-center gap-1 text-[11px] ${ok ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {ok ? <Check className="size-3" strokeWidth={3} /> : <m.Icon className={`size-3 ${m.tone}`} />}
              {ok ? 'Aprovado' : `Pagando com ${m.label}`}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
