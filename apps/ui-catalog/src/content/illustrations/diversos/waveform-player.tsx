'use client'

import { useRef, useState } from 'react'
import { Mic, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react'

// "Waveform Player": player de áudio com forma de onda de 52 barras. O progresso é um motion value avançado por
// frame (uma "faixa" inteira a cada 24s, em loop): a camada colorida é recortada pela largura, o cursor acompanha e o
// tempo decorrido é renderizado direto do motion value. Play/pause real, pular ±15s e clicar na onda para buscar.
const BARS = 52
const TRACK_W = 382
const TOTAL = 38 * 60 + 12 // segundos da faixa
const DEMO_MS = 24000
const HEIGHTS = Array.from({ length: BARS }, (_, i) => {
  const v = 0.3 + 0.7 * Math.abs(Math.sin(i * 0.9) * 0.6 + Math.cos(i * 0.37) * 0.4)
  return Math.min(1, Math.max(0.16, v))
})
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

function Bars({ tone, playing }: { tone: string; playing: boolean }) {
  return (
    <div className="flex h-full items-center justify-between" style={{ width: TRACK_W }}>
      {HEIGHTS.map((h, i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${tone}`}
          style={{ height: `${h * 100}%` }}
          animate={{ scaleY: playing ? [1, 0.55 + (i % 4) * 0.1, 1.08, 1] : 1 }}
          transition={playing ? { duration: 0.8 + (i % 5) * 0.14, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        />
      ))}
    </div>
  )
}

export default function WaveformPlayer() {
  const [playing, setPlaying] = useState(true)
  const playingRef = useRef(true)
  const progress = useMotionValue(0.08)

  useAnimationFrame((_, delta) => {
    if (!playingRef.current) return
    let v = progress.get() + delta / DEMO_MS
    if (v >= 1) v -= 1
    progress.set(v)
  })

  const width = useTransform(progress, (v) => `${v * 100}%`)
  const headX = useTransform(progress, (v) => v * TRACK_W)
  const elapsed = useTransform(progress, (v) => fmt(v * TOTAL))

  const toggle = () => {
    playingRef.current = !playingRef.current
    setPlaying(playingRef.current)
  }
  const seek = (seconds: number) => progress.set(Math.min(0.999, Math.max(0, progress.get() + seconds / TOTAL)))

  return (
    <div className="w-[424px] rounded-2xl border bg-card p-5 text-foreground">
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Mic className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">Vendas com IA — Ep. 12</div>
          <div className="text-[11px] text-muted-foreground">Podcast Lumio · 38 min</div>
        </div>
        <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium">1x</span>
      </div>

      <div
        role="presentation"
        className="relative mt-4 h-16 cursor-pointer"
        style={{ width: TRACK_W }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          progress.set(Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width)))
        }}
      >
        <div className="absolute inset-0">
          <Bars tone="bg-muted-foreground/30" playing={playing} />
        </div>
        <motion.div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width }}>
          <Bars tone="bg-primary" playing={playing} />
        </motion.div>
        <motion.div aria-hidden className="absolute inset-y-0 left-0 w-px bg-foreground/70" style={{ x: headX }} />
      </div>

      <div className="mt-3 flex items-center gap-1">
        <button type="button" aria-label="Voltar 15 segundos" onClick={() => seek(-15)} className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
          <SkipBack className="size-4" />
        </button>
        <button type="button" aria-label={playing ? 'Pausar' : 'Reproduzir'} onClick={toggle} className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
        <button type="button" aria-label="Avançar 15 segundos" onClick={() => seek(15)} className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
          <SkipForward className="size-4" />
        </button>
        <span className="ml-2 font-mono text-[11px] tabular-nums text-muted-foreground">
          <motion.span className="text-foreground">{elapsed}</motion.span> / {fmt(TOTAL)}
        </span>
        <Volume2 className="ml-auto size-4 text-muted-foreground" />
      </div>
    </div>
  )
}
