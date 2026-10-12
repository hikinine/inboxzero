'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Copy, RefreshCw, Sparkles, ThumbsUp } from 'lucide-react'

// "AI Streaming Chat": a pergunta do usuário aparece em cima; a IA passa por "Pensando…" e responde caractere a
// caractere com cursor. Ao terminar, surgem as ações (copiar, útil, refazer). Reinicia em loop.
const QUESTION = 'Como foram as vendas desta semana?'
const ANSWER =
  'Semana forte: R$ 48.900 em 37 pedidos (+12% vs. a anterior). O ticket médio subiu para R$ 1.321 e o Plano Pro respondeu por 60% da receita. Sugiro reforçar o remarketing na quinta, o dia mais fraco.'

type Phase = 'idle' | 'question' | 'thinking' | 'streaming' | 'done'
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function AiStreamingChat() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [len, setLen] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setPhase('idle')
        setLen(0)
        await sleep(500)
        setPhase('question')
        await sleep(900)
        setPhase('thinking')
        await sleep(1200)
        setPhase('streaming')
        for (let i = 1; i <= ANSWER.length; i++) {
          if (cancelled) return
          setLen(i)
          await sleep(ANSWER[i - 1] === ' ' ? 30 : 16)
        }
        setPhase('done')
        await sleep(3000)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const showAnswer = phase === 'streaming' || phase === 'done'

  return (
    <div className="flex h-[340px] w-[420px] flex-col rounded-2xl border bg-card p-4 text-foreground">
      <div className="flex items-center gap-2 border-b pb-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <span className="text-sm font-medium">Assistente</span>
        <span className="ml-auto rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">beta</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 pt-4">
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div key="q" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
              {QUESTION}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'thinking' && (
            <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm">
              <Sparkles className="size-4 text-primary" />
              <motion.span
                className="bg-[length:200%_100%] bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(110deg, var(--muted-foreground) 0%, var(--foreground) 50%, var(--muted-foreground) 100%)' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              >
                Pensando…
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {showAnswer && (
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
              <Sparkles className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed">
                {ANSWER.slice(0, len)}
                {phase === 'streaming' && (
                  <motion.span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary align-baseline" animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 0.9, times: [0, 0.5, 0.51, 1], repeat: Infinity }} />
                )}
              </p>
              <AnimatePresence>
                {phase === 'done' && (
                  <motion.div key="actions" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1">
                    {[
                      { Icon: Copy, label: 'Copiar' },
                      { Icon: ThumbsUp, label: 'Útil' },
                      { Icon: RefreshCw, label: 'Refazer' },
                    ].map(({ Icon, label }) => (
                      <button key={label} type="button" aria-label={label} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Icon className="size-3.5" />
                      </button>
                    ))}
                    <span className="ml-1 text-[10px] text-muted-foreground">2,4s · 118 tokens</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
