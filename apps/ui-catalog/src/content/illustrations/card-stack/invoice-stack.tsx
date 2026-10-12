'use client'

import { useEffect, useState } from 'react'
import { Building2, CalendarDays } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Invoice Stack": faturas em aberto empilhadas. A da frente recebe um carimbo "PAGO" (entra grande e assenta com
// mola, como um carimbo de borracha), o status vira "Paga" e ela sai voando para o canto; a próxima assume a frente
// e o total recebido no rodapé acumula. Loop contínuo.
const INVOICES = [
  { id: 'nf-0871', number: 'NF-e 0871', client: 'Nexa Tecnologia', value: 4890, due: '10/03', paidAt: '09/03/2026' },
  { id: 'nf-0872', number: 'NF-e 0872', client: 'Loja Verde', value: 1290, due: '12/03', paidAt: '12/03/2026' },
  { id: 'nf-0873', number: 'NF-e 0873', client: 'Vitta Saúde', value: 7350, due: '15/03', paidAt: '14/03/2026' },
  { id: 'nf-0874', number: 'NF-e 0874', client: 'Prisma Mídia', value: 2140, due: '18/03', paidAt: '18/03/2026' },
] as const

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function InvoiceStack() {
  const [head, setHead] = useState(0)
  const [stamped, setStamped] = useState(false)
  const [received, setReceived] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let h = 0
      while (!cancelled) {
        setHead(h)
        setStamped(false)
        await sleep(1500)
        if (cancelled) return
        setStamped(true)
        await sleep(1400)
        if (cancelled) return
        setReceived((r) => r + INVOICES[h].value)
        setCount((c) => c + 1)
        h = (h + 1) % INVOICES.length
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = [0, 1, 2].map((i) => INVOICES[(head + i) % INVOICES.length])

  return (
    <div className="w-[340px] text-foreground">
      <div className="relative h-[232px]">
        <AnimatePresence initial={false}>
          {visible.map((inv, depth) => {
            const isStamped = depth === 0 && stamped
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: -40, scale: 0.86 }}
                animate={{ opacity: 1 - depth * 0.2, y: -depth * 16, scale: isStamped ? [1, 0.965, 1] : 1 - depth * 0.05, zIndex: 10 - depth }}
                exit={{ opacity: 0, x: 170, y: -80, rotate: 10, zIndex: 20 }}
                transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                className="absolute inset-x-0 bottom-0 overflow-hidden rounded-xl border bg-card p-4 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground">{inv.number}</div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium">
                      <Building2 className="size-3.5 text-muted-foreground" />
                      {inv.client}
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors duration-300 ${isStamped ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'}`}>
                    {isStamped ? 'Paga' : 'Em aberto'}
                  </span>
                </div>
                <div className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">{brl(inv.value)}</div>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <CalendarDays className="size-3" />
                  vence em {inv.due}
                </div>
                <div className="mt-3 flex justify-between border-t border-dashed pt-2 text-[10px] text-muted-foreground">
                  <span>Pix · chave CNPJ</span>
                  <span>Parcela única</span>
                </div>

                {isStamped && (
                  <motion.div
                    className="pointer-events-none absolute right-4 top-10 rounded-md border-[3px] border-emerald-500 px-2 py-0.5 text-center text-emerald-500"
                    initial={{ scale: 2.4, opacity: 0, rotate: -2 }}
                    animate={{ scale: 1, opacity: 0.9, rotate: -14 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 24 }}
                  >
                    <div className="text-lg font-black uppercase leading-none tracking-[0.2em]">Pago</div>
                    <div className="mt-0.5 font-mono text-[9px] tracking-wider">{inv.paidAt}</div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>
          Recebido hoje · <span className="tabular-nums">{count}</span> {count === 1 ? 'fatura' : 'faturas'}
        </span>
        <span className="font-medium tabular-nums text-foreground">{brl(received)}</span>
      </div>
    </div>
  )
}
