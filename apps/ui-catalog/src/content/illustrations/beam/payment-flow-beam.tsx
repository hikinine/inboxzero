'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, CreditCard, Landmark, ShieldCheck, Smartphone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Payment Flow Beam": a jornada de uma cobrança no cartão — cliente → gateway → antifraude → banco emissor. Cada
// trecho se preenche com um feixe e acende o próximo nó (com o detalhe da etapa); a autorização volta por um arco
// verde por baixo até o celular, que mostra "Aprovado". O status embaixo narra cada passo. Loop.
const W = 500
const H = 280
const Y = 118
const NODES: ReadonlyArray<{ label: string; detail: string; Icon: LucideIcon; x: number }> = [
  { label: 'Cliente', detail: 'Visa •• 4242', Icon: Smartphone, x: 62 },
  { label: 'Gateway', detail: 'token gerado', Icon: CreditCard, x: 187 },
  { label: 'Antifraude', detail: 'score 12/100', Icon: ShieldCheck, x: 313 },
  { label: 'Banco emissor', detail: 'saldo ok', Icon: Landmark, x: 438 },
]
const STATUS = [
  'Iniciando pagamento…',
  'Gateway tokenizando o cartão',
  'Analisando risco da transação',
  'Banco autorizando a compra…',
  'Retornando autorização',
  'Pagamento aprovado',
] as const
const RETURN_D = `M ${NODES[3].x} ${Y + 30} C ${NODES[3].x - 40} ${Y + 110}, ${NODES[0].x + 40} ${Y + 110}, ${NODES[0].x} ${Y + 30}`
const seg = (i: number) => `M ${NODES[i].x + 28} ${Y} Q ${(NODES[i].x + NODES[i + 1].x) / 2} ${Y - 26}, ${NODES[i + 1].x - 28} ${Y}`
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function PaymentFlowBeam() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        for (let p = 0; p <= 5; p++) {
          if (cancelled) return
          setPhase(p)
          await sleep(p === 5 ? 2600 : p === 0 ? 700 : 950)
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const approved = phase === 5

  return (
    <div className="relative text-foreground" style={{ width: W, height: H }}>
      <div className="absolute left-1/2 top-2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs shadow-sm">
        <span className="text-muted-foreground">Pedido #4821</span>
        <span className="font-semibold tabular-nums">R$ 249,90</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Fluxo de pagamento do cliente até o banco e de volta">
        {NODES.slice(0, -1).map((_, i) => (
          <g key={i}>
            <path d={seg(i)} fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
            <motion.path
              d={seg(i)}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: phase > i ? 1 : 0, opacity: phase > i ? 1 : 0 }}
              transition={{ duration: phase > i ? 0.7 : 0.2, ease: 'easeInOut' }}
            />
          </g>
        ))}
        <path d={RETURN_D} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="2 5" />
        <motion.path
          d={RETURN_D}
          fill="none"
          stroke="currentColor"
          className="text-emerald-500"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: phase >= 4 ? 1 : 0, opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: phase >= 4 ? 0.9 : 0.2, ease: 'easeInOut' }}
        />
      </svg>

      {NODES.map((n, i) => {
        const reached = i === 0 || phase >= i
        const active = i === 0 ? approved || phase === 0 : phase === i
        return (
          <div key={n.label} className="absolute flex -translate-x-1/2 flex-col items-center" style={{ left: n.x, top: Y - 28 }}>
            <motion.span
              className="relative flex size-14 items-center justify-center rounded-2xl border bg-card shadow-sm"
              animate={{
                borderColor: i === 0 && approved ? 'rgb(16 185 129)' : active ? 'var(--primary)' : 'var(--border)',
                scale: active ? 1.08 : 1,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            >
              <n.Icon className={`size-6 ${reached ? 'text-foreground' : 'text-muted-foreground'}`} />
              <AnimatePresence>
                {((i > 0 && phase >= i) || (i === 0 && approved)) && (
                  <motion.span
                    className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i === 0 ? 0 : 0.55 }}
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
            <span className="mt-1.5 whitespace-nowrap text-[11px] font-medium">{n.label}</span>
            <span className="whitespace-nowrap text-[10px] text-muted-foreground">{n.detail}</span>
          </div>
        )
      })}

      <div className="absolute bottom-3 left-1/2 flex h-8 w-[240px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border bg-card text-xs shadow-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={phase}
            className={`flex items-center gap-1.5 ${approved ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {approved ? (
              <Check className="size-3.5" strokeWidth={3} />
            ) : (
              <motion.span className="size-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            )}
            {STATUS[phase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
