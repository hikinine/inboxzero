'use client'

import { useEffect, useState } from 'react'
import { CheckCheck, ChevronLeft, Mic, Pause, Play, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Voice Note Chat": conversa estilo mensageiro em que a resposta é um áudio. Primeiro o campo mostra "gravando" com
// cronômetro e onda viva; o áudio é enviado como bolha com forma de onda, toca (o progresso pinta as barras e o tempo
// corre), a transcrição aparece digitada embaixo e o contato responde. Loop contínuo.
const BARS = [6, 10, 14, 9, 18, 22, 12, 8, 16, 24, 20, 11, 7, 13, 19, 23, 15, 9, 6, 12, 17, 21, 14, 8, 11, 16, 10, 6]
const TRANSCRIPT = 'Fechei com a Vitta Saúde! Contrato anual de R$ 48 mil, começa dia 3.'
const DURATION = 14

type Phase = 'recording' | 'sent' | 'playing' | 'transcript' | 'reply'
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, '0')}`

export default function VoiceNoteChat() {
  const [phase, setPhase] = useState<Phase>('recording')
  const [secs, setSecs] = useState(0)
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setPhase('recording')
        setTyped(0)
        for (let s = 0; s <= DURATION && !cancelled; s += 2) {
          setSecs(s)
          await sleep(170)
        }
        setPhase('sent')
        setSecs(0)
        await sleep(900)
        if (cancelled) return
        setPhase('playing')
        for (let s = 0; s <= DURATION && !cancelled; s++) {
          setSecs(s)
          await sleep(140)
        }
        setPhase('transcript')
        for (let i = 0; i <= TRANSCRIPT.length && !cancelled; i += 2) {
          setTyped(i)
          await sleep(28)
        }
        setTyped(TRANSCRIPT.length)
        await sleep(700)
        if (cancelled) return
        setPhase('reply')
        await sleep(2600)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const sent = phase !== 'recording'
  const progress = phase === 'playing' ? secs / DURATION : phase === 'transcript' || phase === 'reply' ? 1 : 0

  return (
    <div className="flex h-[400px] w-[320px] flex-col overflow-hidden rounded-[28px] border bg-card text-foreground shadow-lg">
      {/* topo */}
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <ChevronLeft className="size-4 text-muted-foreground" />
        <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[11px] font-semibold text-white">LM</span>
        <div className="leading-tight">
          <div className="text-xs font-medium">Leonardo Matos</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">{phase === 'reply' ? 'digitando…' : 'online'}</div>
        </div>
      </div>

      {/* mensagens */}
      <div className="flex flex-1 flex-col justify-end gap-2 bg-muted/40 p-3">
        <div className="max-w-[78%] self-start rounded-2xl rounded-bl-md bg-background px-3 py-2 text-xs shadow-sm">
          E aí, como foi a reunião com a Vitta?
          <div className="mt-0.5 text-right text-[9px] text-muted-foreground">10:42</div>
        </div>

        <AnimatePresence>
          {sent && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-[248px] self-end rounded-2xl rounded-br-md bg-emerald-500/15 p-2.5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  {phase === 'playing' ? <Pause className="size-3.5" /> : <Play className="size-3.5 translate-x-px" />}
                </span>
                <div className="flex h-7 flex-1 items-center gap-[2px]">
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      className={cn('w-[3px] rounded-full transition-colors duration-150', i / BARS.length < progress ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-foreground/25')}
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-1 flex justify-between pl-10 text-[9px] text-muted-foreground">
                <span className="tabular-nums">{phase === 'playing' ? fmt(secs) : fmt(DURATION)}</span>
                <span className="flex items-center gap-0.5">
                  10:43 <CheckCheck className={cn('size-3', progress > 0 ? 'text-sky-500' : '')} />
                </span>
              </div>
              {(phase === 'transcript' || phase === 'reply') && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-1.5 border-t border-emerald-500/20 pt-1.5 text-[11px] leading-snug text-foreground/80">
                  {TRANSCRIPT.slice(0, typed)}
                  {typed < TRANSCRIPT.length && <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-foreground" />}
                </motion.p>
              )}
            </motion.div>
          )}
          {phase === 'reply' && (
            <motion.div
              key="reply"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-[78%] self-start rounded-2xl rounded-bl-md bg-background px-3 py-2 text-xs shadow-sm"
            >
              Que notícia! Vou avisar o financeiro 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* campo */}
      <div className="flex items-center gap-2 border-t px-3 py-2.5">
        <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-muted px-3 text-[11px] text-muted-foreground">
          {phase === 'recording' ? (
            <>
              <motion.span className="size-2 rounded-full bg-rose-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
              <span className="tabular-nums text-foreground">{fmt(secs)}</span>
              <div className="flex flex-1 items-center gap-[2px]">
                {BARS.slice(0, 16).map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[2px] rounded-full bg-rose-500/70"
                    animate={{ height: [3, h * 0.6, 4] }}
                    transition={{ duration: 0.5 + (i % 4) * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </>
          ) : (
            'Mensagem'
          )}
        </div>
        <motion.span
          className={cn('flex size-9 items-center justify-center rounded-full text-white', phase === 'recording' ? 'bg-rose-500' : 'bg-emerald-500')}
          animate={phase === 'recording' ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.9, repeat: phase === 'recording' ? Infinity : 0 }}
        >
          {phase === 'recording' ? <Mic className="size-4" /> : <Send className="size-4" />}
        </motion.span>
      </div>
    </div>
  )
}
