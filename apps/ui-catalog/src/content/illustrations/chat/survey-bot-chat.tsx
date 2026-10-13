'use client'

import { useEffect, useState } from 'react'
import { Bot, Gift } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Survey Bot Chat": pesquisa de satisfação conduzida por bot. Pergunta 1 é o NPS de 0 a 10 — um destaque percorre
// a régua e para no 9 —; a nota vira resposta do cliente; a pergunta 2 traz chips de múltipla escolha que vão sendo
// marcados; no fim o bot agradece com um cupom. A barra de progresso no topo acompanha. Loop.
const TOPICS = ['Entrega', 'Preço', 'Atendimento', 'Qualidade'] as const
const PICKS = [0, 2] as const
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
const npsTone = (n: number) => (n <= 6 ? 'bg-rose-500' : n <= 8 ? 'bg-amber-500' : 'bg-emerald-500')

export default function SurveyBotChat() {
  const [step, setStep] = useState(0)
  const [hover, setHover] = useState(-1)
  const [score, setScore] = useState(-1)
  const [picked, setPicked] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setStep(0)
        setHover(-1)
        setScore(-1)
        setPicked([])
        await sleep(500)
        setStep(1) // pergunta NPS
        await sleep(500)
        for (let n = 0; n <= 9; n++) {
          if (cancelled) return
          setHover(n)
          await sleep(n < 9 ? 90 : 250)
        }
        setScore(9)
        await sleep(500)
        setStep(2) // resposta 9
        await sleep(700)
        setStep(3) // pergunta 2
        await sleep(700)
        for (const p of PICKS) {
          if (cancelled) return
          setPicked((x) => [...x, p])
          await sleep(500)
        }
        setStep(4) // resposta escolhida
        await sleep(800)
        setStep(5) // cupom
        await sleep(3000)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const progress = step >= 5 ? 100 : step >= 3 ? 50 : 0
  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }

  return (
    <div className="flex h-[440px] w-[350px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-lg">
      <div className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-medium">Pesquisa · Loja Aurora</div>
            <div className="text-[10px] text-muted-foreground">leva menos de 1 minuto</div>
          </div>
          <span className="ml-auto text-[10px] tabular-nums text-muted-foreground">{step >= 5 ? 'concluída' : step >= 3 ? '2 de 2' : '1 de 2'}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden p-3 text-[12px]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div key="q1" {...fade} className="max-w-[94%] rounded-xl rounded-tl-sm bg-muted px-3 py-2">
              De 0 a 10, quanto você recomendaria a Loja Aurora a um amigo?
              <div className="mt-2 grid grid-cols-11 gap-0.5">
                {Array.from({ length: 11 }).map((_, n) => {
                  const chosen = score === n
                  const lit = hover === n && score < 0
                  return (
                    <motion.span
                      key={n}
                      className={`flex h-6 items-center justify-center rounded text-[10px] font-medium tabular-nums transition-colors ${chosen ? `${npsTone(n)} text-white` : lit ? 'bg-foreground/15' : 'bg-card'}`}
                      animate={{ scale: chosen ? [1, 1.25, 1] : 1 }}
                    >
                      {n}
                    </motion.span>
                  )
                })}
              </div>
              <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
                <span>nada provável</span>
                <span>muito provável</span>
              </div>
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div key="a1" {...fade} className="self-end rounded-xl rounded-br-sm bg-primary px-3 py-1.5 text-primary-foreground">
              9
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div key="q2" {...fade} className="max-w-[94%] rounded-xl rounded-tl-sm bg-muted px-3 py-2">
              Que bom! O que mais te agradou?
              <div className="mt-2 flex flex-wrap gap-1.5">
                {TOPICS.map((t, i) => {
                  const on = picked.includes(i)
                  return (
                    <motion.span
                      key={t}
                      className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${on ? 'border-primary bg-primary text-primary-foreground' : 'bg-card'}`}
                      animate={{ scale: on ? [1, 1.12, 1] : 1 }}
                    >
                      {on ? '✓ ' : ''}
                      {t}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div key="a2" {...fade} className="self-end rounded-xl rounded-br-sm bg-primary px-3 py-1.5 text-primary-foreground">
              Entrega e Atendimento
            </motion.div>
          )}
          {step >= 5 && (
            <motion.div key="end" {...fade} className="max-w-[94%] rounded-xl rounded-tl-sm bg-muted px-3 py-2">
              Obrigado, Camila! Como agradecimento:
              <motion.div
                className="mt-2 flex items-center gap-2 rounded-lg border-2 border-dashed border-emerald-500/50 bg-card px-2.5 py-2"
                initial={{ rotate: -3, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14 }}
              >
                <Gift className="size-4 text-emerald-500" />
                <div className="leading-tight">
                  <div className="font-mono text-[12px] font-semibold tracking-wider">VOLTE10</div>
                  <div className="text-[10px] text-muted-foreground">10% off na próxima compra</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
