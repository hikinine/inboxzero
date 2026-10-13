'use client'

import { useEffect, useState } from 'react'
import { Check, Footprints, ShoppingBag, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Sales Product Chat": vendedor de loja responde no chat com um card de produto (imagem em degradê, preço com
// desconto, numeração com o 42 marcado). O cliente toca "Comprar", chega um card de Pix com QR gerado em SVG e
// contagem regressiva; o pagamento é confirmado e o card vira recibo. Loop.
const SIZES = [39, 40, 41, 42, 43] as const
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// QR "falso" determinístico (21x21) com os três quadrados de posição
const QR = (() => {
  const n = 21
  const cells: { x: number; y: number }[] = []
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue
      if ((x * 7 + y * 13 + x * y) % 5 < 2) cells.push({ x, y })
    }
  }
  return { n, cells }
})()

function QrCode() {
  const f = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="var(--card)" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  )
  return (
    <svg viewBox={`0 0 ${QR.n} ${QR.n}`} className="size-[72px] text-foreground" shapeRendering="crispEdges" aria-label="QR code Pix">
      {QR.cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width="1" height="1" fill="currentColor" />
      ))}
      {f(0, 0)}
      {f(QR.n - 7, 0)}
      {f(0, QR.n - 7)}
    </svg>
  )
}

export default function SalesProductChat() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timeline: Array<[number, number]> = [
      [0, 400],
      [1, 900], // pergunta
      [2, 1600], // card produto
      [3, 500], // toque comprar
      [4, 1700], // pix
      [5, 3000], // pago
    ]
    const run = async () => {
      while (!cancelled) {
        for (const [s, ms] of timeline) {
          if (cancelled) return
          setStep(s)
          await sleep(ms)
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }

  return (
    <div className="flex h-[460px] w-[340px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-lg">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white">PC</span>
        <div className="leading-tight">
          <div className="text-sm font-medium">Passo Certo · Vendas</div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Rafaela respondendo
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden p-3 text-[12px]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div key="q" {...fade} className="self-end rounded-xl rounded-br-sm bg-primary px-3 py-1.5 text-primary-foreground">
              Tem o tênis de corrida no 42?
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div key="p" {...fade} className="w-[230px] overflow-hidden rounded-xl rounded-tl-sm border bg-card shadow-sm">
              <div className="relative flex h-[92px] items-center justify-center bg-gradient-to-br from-orange-400/30 via-rose-400/20 to-violet-500/30">
                <motion.span animate={{ rotate: [-8, 4, -8], y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <Footprints className="size-10 text-foreground/70" />
                </motion.span>
                <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-1.5 text-[9px] font-semibold text-white">-17%</span>
              </div>
              <div className="p-2.5">
                <div className="text-[12px] font-semibold">Tênis Ultra Run 3</div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Star className="size-3 fill-amber-400 text-amber-400" /> 4,8 · 1.204 avaliações
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-sm font-bold">R$ 499,90</span>
                  <span className="text-[10px] text-muted-foreground line-through">R$ 599,90</span>
                </div>
                <div className="mt-1.5 flex gap-1">
                  {SIZES.map((s) => (
                    <span key={s} className={`flex size-6 items-center justify-center rounded-md border text-[10px] ${s === 42 ? 'border-primary bg-primary text-primary-foreground' : ''}`}>
                      {s}
                    </span>
                  ))}
                </div>
                <motion.div
                  className="mt-2 flex h-7 items-center justify-center gap-1.5 rounded-md bg-foreground text-[11px] font-medium text-background"
                  animate={step === 3 ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag className="size-3.5" /> {step >= 3 ? 'Gerando pagamento…' : 'Comprar'}
                </motion.div>
              </div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div key="pix" {...fade} className="w-[230px] rounded-xl rounded-tl-sm border bg-card p-2.5 shadow-sm">
              <AnimatePresence mode="wait" initial={false}>
                {step === 4 ? (
                  <motion.div key="qr" exit={{ opacity: 0, scale: 0.95 }} className="flex items-center gap-2.5">
                    <div className="rounded-md border bg-card p-1">
                      <QrCode />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Pix</div>
                      <div className="text-sm font-bold">R$ 499,90</div>
                      <div className="text-[10px] text-muted-foreground">expira em 09:59</div>
                      <div className="mt-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">Copiar código</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2.5">
                    <motion.span
                      className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Check className="size-5" strokeWidth={3} />
                    </motion.span>
                    <div className="leading-tight">
                      <div className="text-[12px] font-semibold">Pagamento confirmado</div>
                      <div className="text-[10px] text-muted-foreground">Pedido #7713 · envio em 24h</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
