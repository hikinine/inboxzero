'use client'

import { useEffect, useState } from 'react'
import { Mic, Sparkles, TrendingUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Voice Assistant Chat": assistente por voz em tela cheia. Ouvindo: barras radiais pulsam em volta do orbe e a
// transcrição aparece palavra por palavra. Pensando: o orbe gira com um arco. Falando: uma onda horizontal anima
// enquanto a resposta aparece num card com minigráfico de vendas por hora. Loop.
const QUESTION = 'Quanto vendi hoje no Pix?'.split(' ')
const BARS = 28
const HOURS = [2, 3, 5, 4, 7, 9, 6, 8, 11, 10] as const
type Mode = 'idle' | 'listen' | 'think' | 'speak'
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function VoiceAssistantChat() {
  const [mode, setMode] = useState<Mode>('idle')
  const [words, setWords] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setMode('idle')
        setWords(0)
        await sleep(700)
        setMode('listen')
        for (let i = 1; i <= QUESTION.length; i++) {
          await sleep(320)
          if (cancelled) return
          setWords(i)
        }
        await sleep(500)
        setMode('think')
        await sleep(1100)
        setMode('speak')
        await sleep(3800)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const max = Math.max(...HOURS)

  return (
    <div className="relative flex h-[420px] w-[340px] flex-col items-center overflow-hidden rounded-3xl border bg-gradient-to-b from-card to-muted/60 px-5 py-5 text-foreground shadow-lg">
      <div className="flex w-full items-center justify-between text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Sparkles className="size-3 text-violet-500" /> Assistente de vendas
        </span>
        <span className="rounded-full border px-1.5 py-0.5">
          {mode === 'listen' ? 'ouvindo' : mode === 'think' ? 'pensando' : mode === 'speak' ? 'falando' : 'toque para falar'}
        </span>
      </div>

      {/* transcrição */}
      <div className="mt-6 min-h-[56px] w-full text-center text-xl font-semibold leading-snug tracking-tight">
        {QUESTION.map((w, i) => (
          <motion.span key={i} className="inline-block" initial={false} animate={{ opacity: i < words ? 1 : 0.12, y: i < words ? 0 : 4, filter: i < words ? 'blur(0px)' : 'blur(3px)' }} transition={{ duration: 0.25 }}>
            {w}&nbsp;
          </motion.span>
        ))}
      </div>

      {/* resposta */}
      <div className="mt-2 h-[132px] w-full">
        <AnimatePresence>
          {mode === 'speak' && (
            <motion.div className="rounded-2xl border bg-card p-3 shadow-sm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-[12px] text-muted-foreground">Hoje no Pix</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">R$ 12.480</span>
                <span className="flex items-center gap-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="size-3" /> +18%
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground">37 vendas · ticket médio R$ 337</div>
              <div className="mt-2 flex h-10 items-end gap-1">
                {HOURS.map((h, i) => (
                  <motion.span
                    key={i}
                    className={`flex-1 rounded-sm ${i === HOURS.length - 2 ? 'bg-primary' : 'bg-primary/25'}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(h / max) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* orbe */}
      <div className="relative mt-auto flex size-[120px] items-center justify-center">
        {mode === 'listen' &&
          Array.from({ length: BARS }).map((_, i) => {
            const a = (i / BARS) * 360
            return (
              <div key={i} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${a}deg)` }}>
                <motion.span
                  className="absolute left-[-1.5px] top-[-58px] h-4 w-[3px] origin-bottom rounded-full bg-violet-500/70"
                  animate={{ scaleY: [0.3, 1 + ((i * 7) % 5) * 0.2, 0.3] }}
                  transition={{ duration: 0.5 + (i % 4) * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            )
          })}
        {mode === 'think' && (
          <motion.span
            className="absolute inset-3 rounded-full border-[3px] border-transparent border-t-violet-500 border-r-sky-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <motion.span
          className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-xl"
          animate={{ scale: mode === 'listen' ? [1, 1.06, 1] : 1 }}
          transition={{ duration: 0.8, repeat: mode === 'listen' ? Infinity : 0 }}
        >
          {mode === 'speak' ? (
            <span className="flex h-6 items-center gap-[3px]">
              {[0, 1, 2, 3, 4].map((k) => (
                <motion.span key={k} className="w-[3px] rounded-full bg-white" animate={{ height: [6, 22 - (k % 3) * 4, 8, 18, 6] }} transition={{ duration: 0.9, repeat: Infinity, delay: k * 0.1 }} />
              ))}
            </span>
          ) : (
            <Mic className="size-6" />
          )}
        </motion.span>
      </div>
    </div>
  )
}
