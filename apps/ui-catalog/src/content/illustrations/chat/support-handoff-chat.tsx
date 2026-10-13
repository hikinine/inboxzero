'use client'

import { useEffect, useState } from 'react'
import { Bot, Headset, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Support Handoff Chat": widget de atendimento em que o bot passa a conversa para uma pessoa. O cliente relata o
// problema, o bot oferece opções, o cliente toca "Falar com atendente", aparece o card de transferência com fila e
// barra; o cabeçalho troca do bot para a atendente (morph com layout), ela entra, digita e responde. Loop.
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
const CHIPS = ['Trocar produto', 'Reembolso', 'Falar com atendente'] as const

function Typing() {
  return (
    <span className="flex gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} />
      ))}
    </span>
  )
}

export default function SupportHandoffChat() {
  const [step, setStep] = useState(0)
  const [pick, setPick] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timeline = [700, 900, 1300, 1000, 2200, 900, 1100, 3200]
    const run = async () => {
      while (!cancelled) {
        setPick(false)
        for (let s = 0; s < timeline.length && !cancelled; s++) {
          setStep(s)
          if (s === 3) setPick(true)
          await sleep(timeline[s])
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const human = step >= 5

  return (
    <div className="flex h-[400px] w-[330px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-xl">
      {/* cabeçalho */}
      <div className={cn('flex items-center gap-2.5 px-4 py-3 transition-colors duration-500', human ? 'bg-emerald-600 text-white' : 'bg-primary text-primary-foreground')}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={human ? 'h' : 'b'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="flex flex-1 items-center gap-2.5">
            <span className="relative flex size-9 items-center justify-center rounded-full bg-white/20">
              {human ? <span className="text-xs font-semibold">MA</span> : <Bot className="size-4" />}
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-300 ring-2 ring-white/30" />
            </span>
            <div className="leading-tight">
              <div className="text-xs font-semibold">{human ? 'Marina · Suporte' : 'Assistente Loja Aurora'}</div>
              <div className="text-[10px] opacity-80">{human ? 'Atendimento humano' : 'Respostas automáticas'}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <X className="size-4 opacity-70" />
      </div>

      {/* conversa */}
      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden bg-muted/30 p-3 text-[12px]">
        <AnimatePresence initial={false}>
          {step >= 0 && (
            <motion.div key="u1" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground">
              Meu pedido #4821 chegou com a tela trincada 😕
            </motion.div>
          )}
          {step >= 1 && (
            <motion.div key="b1" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[86%] self-start">
              <div className="flex gap-1.5">
                <span className="mt-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="size-3.5" />
                </span>
                <div className="rounded-2xl rounded-bl-md border bg-background px-3 py-2">Sinto muito! Posso abrir uma troca ou um reembolso agora mesmo.</div>
              </div>
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 flex flex-wrap gap-1 pl-7">
                  {CHIPS.map((c) => (
                    <span key={c} className="rounded-full border bg-background px-2 py-0.5 text-[10px]">
                      {c}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
          {step >= 3 && pick && (
            <motion.div key="u2" layout initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="self-end rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground">
              Falar com atendente
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div key="transfer" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto w-[92%] rounded-xl border border-dashed bg-background p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium">
                <Headset className="size-3.5 text-emerald-500" />
                {step === 4 ? 'Transferindo para um atendente…' : 'Transferência concluída'}
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: '8%' }} animate={{ width: step === 4 ? '85%' : '100%' }} transition={{ duration: step === 4 ? 2 : 0.3, ease: 'easeInOut' }} />
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">Você é o 1º da fila · espera ~1 min</div>
            </motion.div>
          )}
          {step >= 5 && (
            <motion.div key="sys" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> Marina entrou na conversa <span className="h-px flex-1 bg-border" />
            </motion.div>
          )}
          {step >= 6 && (
            <motion.div key="m1" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex max-w-[86%] gap-1.5 self-start">
              <span className="mt-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-semibold text-white">MA</span>
              <div className="rounded-2xl rounded-bl-md border bg-background px-3 py-2">
                {step === 6 ? <Typing /> : 'Oi! Sou a Marina 👋 Já estou com o pedido #4821 aberto e vou enviar um aparelho novo hoje.'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t px-3 py-2.5">
        <div className="rounded-full border bg-background px-3 py-1.5 text-[11px] text-muted-foreground">{human ? 'Escreva para a Marina…' : 'Escreva sua mensagem…'}</div>
      </div>
    </div>
  )
}
