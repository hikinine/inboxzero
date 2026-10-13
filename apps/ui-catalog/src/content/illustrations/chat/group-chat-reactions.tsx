'use client'

import { useEffect, useState } from 'react'
import { Hash, MessageSquare, SmilePlus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Group Chat Reactions": canal de equipe estilo Slack. O anúncio da meta batida recebe reações em sequência — cada
// uma sobe flutuando a partir do chip, o contador dá um pop e chips novos entram empurrando os outros. As respostas
// da thread crescem com os avatares de quem reagiu. Depois de tudo, zera e recomeça.
const EVENTS: ReadonlyArray<{ emoji: string; who: string }> = [
  { emoji: '🎉', who: 'RF' },
  { emoji: '🎉', who: 'JU' },
  { emoji: '🔥', who: 'TH' },
  { emoji: '🎉', who: 'LA' },
  { emoji: '❤️', who: 'BR' },
  { emoji: '🔥', who: 'PA' },
  { emoji: '🚀', who: 'GU' },
  { emoji: '🎉', who: 'FE' },
  { emoji: '❤️', who: 'LU' },
  { emoji: '🔥', who: 'CA' },
]
const TONES = ['from-sky-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-amber-400 to-rose-500', 'from-violet-400 to-fuchsia-500']

type Floating = { id: number; emoji: string; x: number }

export default function GroupChatReactions() {
  const [step, setStep] = useState(0)
  const [floats, setFloats] = useState<Floating[]>([])

  useEffect(() => {
    let n = 0
    let fid = 0
    const id = setInterval(() => {
      n = n >= EVENTS.length + 4 ? 0 : n + 1
      setStep(Math.min(n, EVENTS.length))
      if (n >= 1 && n <= EVENTS.length) {
        const ev = EVENTS[n - 1]
        const order = [...new Set(EVENTS.slice(0, n).map((e) => e.emoji))]
        const f: Floating = { id: ++fid, emoji: ev.emoji, x: 22 + order.indexOf(ev.emoji) * 52 }
        setFloats((list) => [...list, f])
        setTimeout(() => setFloats((list) => list.filter((it) => it.id !== f.id)), 1300)
      }
    }, 650)
    return () => clearInterval(id)
  }, [])

  const done = EVENTS.slice(0, step)
  const counts = new Map<string, number>()
  done.forEach((e) => counts.set(e.emoji, (counts.get(e.emoji) ?? 0) + 1))
  const last = done[done.length - 1]
  const replies = Math.floor(step / 3)

  return (
    <div className="w-[380px] overflow-hidden rounded-xl border bg-card text-foreground shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Hash className="size-4 text-muted-foreground" /> vendas-sp
        </div>
        <div className="flex -space-x-1.5">
          {['CA', 'RF', 'JU', 'TH'].map((i, k) => (
            <span key={i} className={`flex size-6 items-center justify-center rounded-full bg-gradient-to-br text-[9px] font-semibold text-white ring-2 ring-card ${TONES[k]}`}>
              {i}
            </span>
          ))}
          <span className="flex size-6 items-center justify-center rounded-full bg-muted text-[9px] font-medium ring-2 ring-card">+8</span>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex gap-2.5 opacity-60">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] font-semibold text-white">JU</span>
          <div className="text-xs">
            <span className="font-semibold">Juliana</span> <span className="text-[10px] text-muted-foreground">17:58</span>
            <p className="text-muted-foreground">Último pedido do dia entrando agora…</p>
          </div>
        </div>

        <div className="relative flex gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-rose-400 to-orange-400 text-[10px] font-semibold text-white">CA</span>
          <div className="min-w-0 flex-1 text-xs">
            <span className="font-semibold">Carla Mendes</span> <span className="text-[10px] text-muted-foreground">18:02</span>
            <p className="mt-0.5 leading-relaxed">
              Pessoal, <span className="font-semibold">batemos a meta de outubro!</span> R$ 248 mil fechados, 112% do objetivo. Obrigada, time! 🏆
            </p>

            {/* reações */}
            <div className="relative mt-2 flex h-6 flex-wrap items-center gap-1.5">
              <AnimatePresence>
                {[...counts.entries()].map(([emoji, c]) => {
                  const mine = last?.emoji === emoji
                  return (
                    <motion.span
                      key={emoji}
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={cn('flex h-6 items-center gap-1 rounded-full border px-2 text-[11px] transition-colors', mine ? 'border-sky-500/50 bg-sky-500/10' : 'bg-muted/60')}
                    >
                      <span>{emoji}</span>
                      <motion.span key={c} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-medium tabular-nums">
                        {c}
                      </motion.span>
                    </motion.span>
                  )
                })}
              </AnimatePresence>
              <span className="flex size-6 items-center justify-center rounded-full border text-muted-foreground">
                <SmilePlus className="size-3.5" />
              </span>

              <AnimatePresence>
                {floats.map((f) => (
                  <motion.span
                    key={f.id}
                    className="pointer-events-none absolute top-0 text-lg"
                    style={{ left: f.x }}
                    initial={{ y: 0, opacity: 1, scale: 0.6 }}
                    animate={{ y: -70, opacity: 0, scale: 1.3, x: [0, 8, -6, 4] }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    {f.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-2 flex h-5 items-center gap-1.5 text-[11px]">
              {replies > 0 && (
                <motion.span key={replies} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5 font-medium text-sky-600 dark:text-sky-400">
                  <span className="flex -space-x-1">
                    {done.slice(0, replies).map((e, i) => (
                      <span key={e.who} className={`flex size-4 items-center justify-center rounded bg-gradient-to-br text-[7px] text-white ${TONES[i % TONES.length]}`}>
                        {e.who}
                      </span>
                    ))}
                  </span>
                  <MessageSquare className="size-3" /> {replies} {replies === 1 ? 'resposta' : 'respostas'}
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t px-4 py-2.5">
        <div className="rounded-md border px-3 py-2 text-[11px] text-muted-foreground">Enviar mensagem para #vendas-sp</div>
      </div>
    </div>
  )
}
