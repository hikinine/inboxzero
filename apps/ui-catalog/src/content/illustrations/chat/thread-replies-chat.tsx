'use client'

import { useEffect, useState } from 'react'
import { CircleCheck, Hash, MessageSquare } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Thread Replies Chat": painel de thread no estilo dos apps de equipe. A mensagem original fica no topo e as
// respostas entram uma a uma, penduradas numa linha curva que sai do avatar original; reações aparecem com pop nas
// respostas, o contador "N respostas" sobe e, no fim, a thread é marcada como resolvida com um selo verde. Loop.
type Reply = { ini: string; name: string; grad: string; text: string; time: string; react?: { e: string; n: number } }
const REPLIES: ReadonlyArray<Reply> = [
  { ini: 'JM', name: 'Júlia Moraes', grad: 'from-pink-500 to-rose-500', text: 'Por mim ok! Só falta o PR do checkout.', time: '09:14', react: { e: '👍', n: 2 } },
  { ini: 'DS', name: 'Diego Santos', grad: 'from-sky-500 to-blue-600', text: 'Acabei de dar merge, CI verde ✅', time: '09:21', react: { e: '🚀', n: 3 } },
  { ini: 'AL', name: 'Ana Lima', grad: 'from-amber-400 to-orange-500', text: 'Changelog atualizado e QA aprovado.', time: '09:30', react: { e: '🙌', n: 1 } },
]
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function ThreadRepliesChat() {
  const [shown, setShown] = useState(0)
  const [reacted, setReacted] = useState(0)
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setShown(0)
        setReacted(0)
        setResolved(false)
        await sleep(700)
        for (let i = 1; i <= REPLIES.length; i++) {
          if (cancelled) return
          setShown(i)
          await sleep(700)
          setReacted(i)
          await sleep(500)
        }
        setResolved(true)
        await sleep(2800)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[420px] w-[370px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-lg">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <MessageSquare className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">Thread</span>
        <span className="flex items-center text-xs text-muted-foreground">
          <Hash className="size-3" />
          lancamentos
        </span>
        <AnimatePresence>
          {resolved && (
            <motion.span
              className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CircleCheck className="size-3" /> Resolvida
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="relative flex-1 overflow-hidden p-4">
        {/* original */}
        <div className="flex gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-semibold text-white">RC</span>
          <div className="min-w-0 text-[12px]">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold">Rafael Costa</span>
              <span className="text-[10px] text-muted-foreground">09:02</span>
            </div>
            <p className="leading-snug">Deploy da v2.3 amanhã às 10h. Alguém tem algo pendente?</p>
            <motion.div key={shown} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="mt-1 text-[11px] font-medium text-primary">
              {shown === 0 ? 'Responder na thread' : `${shown} ${shown === 1 ? 'resposta' : 'respostas'}`}
            </motion.div>
          </div>
        </div>

        <div className="relative ml-[17px] mt-1">
          <AnimatePresence>
            {REPLIES.slice(0, shown).map((r, i) => (
              <motion.div
                key={r.ini}
                className="relative flex gap-2 pb-3 pl-6 pt-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {i < shown - 1 && <span className="absolute bottom-0 left-0 top-0 w-px bg-border" />}
                <svg className="absolute left-0 top-0 h-6 w-6 text-border" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <motion.path d="M0.5 0 V14 Q0.5 22 8 22 H22" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
                </svg>
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-[10px] font-semibold text-white ${r.grad}`}>{r.ini}</span>
                <div className="min-w-0 text-[12px]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-[10px] text-muted-foreground">{r.time}</span>
                  </div>
                  <p className="leading-snug">{r.text}</p>
                  <div className="mt-1 h-5">
                    <AnimatePresence>
                      {r.react && reacted > i && (
                        <motion.span
                          className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/5 px-1.5 py-0.5 text-[10px]"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.25, 1] }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          {r.react.e} <span className="font-medium tabular-nums">{r.react.n}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {resolved && (
            <motion.div
              className="absolute inset-x-4 bottom-3 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-700 dark:text-emerald-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <CircleCheck className="size-4" />
              <span>
                <strong>Rafael</strong> marcou a thread como resolvida
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
