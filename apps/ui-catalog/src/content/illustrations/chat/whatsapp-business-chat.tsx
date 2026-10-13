'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, BadgeCheck, Check, CheckCheck, EllipsisVertical, Package, Phone, Truck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "WhatsApp Business Chat": conversa de loja no estilo WhatsApp Business. A cliente pergunta do pedido (os tiques
// passam de cinza para azul quando lida), a loja digita e responde com um card de pedido com barra de entrega e
// botões de resposta rápida; "Rastrear pedido" é tocado, vira mensagem da cliente e a loja manda a previsão. Loop.
type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function Ticks({ read }: { read: boolean }) {
  return read ? <CheckCheck className="size-3.5 text-sky-500" /> : <Check className="size-3.5 text-muted-foreground" />
}

function Typing() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex w-fit gap-1 rounded-xl rounded-tl-sm bg-card px-3 py-2.5 shadow-sm">
      {[0, 1, 2].map((d) => (
        <motion.span key={d} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }} />
      ))}
    </motion.div>
  )
}

const bubbleIn = { initial: { opacity: 0, y: 10, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0 } }

export default function WhatsappBusinessChat() {
  const [phase, setPhase] = useState<Phase>(0)

  useEffect(() => {
    let cancelled = false
    const steps: Array<[Phase, number]> = [
      [0, 500],
      [1, 900], // cliente pergunta
      [2, 1100], // lida + digitando
      [3, 1800], // card do pedido
      [4, 500], // toque no botão
      [5, 900], // mensagem da cliente
      [6, 1000], // digitando
      [7, 3200], // previsão
    ]
    const run = async () => {
      while (!cancelled) {
        for (const [p, ms] of steps) {
          if (cancelled) return
          setPhase(p)
          await sleep(ms)
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[440px] w-[340px] flex-col overflow-hidden rounded-[28px] border-[6px] border-foreground/85 bg-muted text-foreground shadow-xl">
      <div className="flex items-center gap-2 bg-emerald-700 px-2.5 py-2 text-white">
        <ArrowLeft className="size-4" />
        <span className="flex size-8 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-emerald-700">CA</span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1 text-[13px] font-medium">
            Café Aurora <BadgeCheck className="size-3.5 fill-emerald-400 text-emerald-700" />
          </div>
          <div className="text-[10px] text-white/80">{phase === 2 || phase === 6 ? 'digitando…' : 'conta comercial'}</div>
        </div>
        <Phone className="size-4" />
        <EllipsisVertical className="size-4" />
      </div>

      <div
        className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 py-3"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 0)', backgroundSize: '14px 14px' }}
      >
        <div className="mx-auto mb-1 rounded-md bg-card/80 px-2 py-0.5 text-[9px] text-muted-foreground shadow-sm">HOJE</div>
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div key="q" {...bubbleIn} className="ml-auto max-w-[78%] rounded-xl rounded-tr-sm bg-emerald-100 px-2.5 py-1.5 text-[12px] text-emerald-950 shadow-sm dark:bg-emerald-900 dark:text-emerald-50">
              Oi! Meu pedido já saiu? 😊
              <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[9px] opacity-70">
                10:41 <Ticks read={phase >= 2} />
              </span>
            </motion.div>
          )}
          {(phase === 2 || phase === 6) && <Typing key={`t${phase}`} />}
          {phase >= 3 && (
            <motion.div key="card" {...bubbleIn} className="max-w-[84%] overflow-hidden rounded-xl rounded-tl-sm bg-card text-[12px] shadow-sm">
              <div className="px-2.5 pt-2">Saiu sim, Mariana! Olha só o status:</div>
              <div className="m-2 rounded-lg border bg-muted/50 p-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-md bg-amber-500/15">
                    <Package className="size-4 text-amber-600" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[11px] font-semibold">Pedido #3021</div>
                    <div className="text-[10px] text-muted-foreground">2 itens · R$ 86,40</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: '20%' }} animate={{ width: '70%' }} transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} />
                  </div>
                  <Truck className="size-3.5 text-emerald-600" />
                </div>
                <div className="mt-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">A caminho</div>
              </div>
              <div className="border-t text-center text-[12px] font-medium text-sky-600 dark:text-sky-400">
                <motion.div className="border-b py-1.5" animate={phase === 4 ? { backgroundColor: ['rgba(14,165,233,0)', 'rgba(14,165,233,0.15)', 'rgba(14,165,233,0)'] } : {}} transition={{ duration: 0.5 }}>
                  Rastrear pedido
                </motion.div>
                <div className="py-1.5">Falar com atendente</div>
              </div>
            </motion.div>
          )}
          {phase >= 5 && (
            <motion.div key="r" {...bubbleIn} className="ml-auto rounded-xl rounded-tr-sm bg-emerald-100 px-2.5 py-1.5 text-[12px] text-emerald-950 shadow-sm dark:bg-emerald-900 dark:text-emerald-50">
              Rastrear pedido
              <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[9px] opacity-70">
                10:42 <Ticks read={phase >= 6} />
              </span>
            </motion.div>
          )}
          {phase >= 7 && (
            <motion.div key="eta" {...bubbleIn} className="max-w-[80%] rounded-xl rounded-tl-sm bg-card px-2.5 py-1.5 text-[12px] shadow-sm">
              Chega <strong>hoje até 18h</strong> 🚚 Código de rastreio: <span className="font-mono text-[11px]">BR4821930</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 bg-muted px-2 py-2">
        <div className="flex-1 rounded-full bg-card px-3 py-1.5 text-[11px] text-muted-foreground">Mensagem</div>
        <span className="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z" />
          </svg>
        </span>
      </div>
    </div>
  )
}
