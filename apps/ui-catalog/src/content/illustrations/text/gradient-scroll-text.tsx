'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

// "Gradient Scroll Text": efeito de "texto que acende com a rolagem" simulado em loop. Um motion value de progresso
// (0 → 1) move a barra de rolagem fake e acende o parágrafo palavra por palavra; cada palavra ganha uma cor do
// degradê violeta → azul → verde conforme a posição. No fim, apaga devagar e recomeça.
const TEXT = 'Cada venda conta uma história. Conecte WhatsApp, Pix e CRM num só lugar e veja seus clientes voltarem — sem planilhas, sem retrabalho, sem perder nenhuma conversa.'
const WORDS = TEXT.split(' ')

function Word({ word, i, progress }: { word: string; i: number; progress: MotionValue<number> }) {
  const start = i / WORDS.length
  const end = start + 1.5 / WORDS.length
  const opacity = useTransform(progress, [start, end], [0.14, 1])
  const y = useTransform(progress, [start, end], [6, 0])
  const t = Math.round((i / (WORDS.length - 1)) * 100)
  const color = t < 50 ? `color-mix(in oklab, var(--color-violet-500) ${100 - t * 2}%, var(--color-sky-500))` : `color-mix(in oklab, var(--color-sky-500) ${200 - t * 2}%, var(--color-emerald-500))`
  return (
    <motion.span className="mr-[0.28em] inline-block" style={{ opacity, y, color }}>
      {word}
    </motion.span>
  )
}

export default function GradientScrollText() {
  const progress = useMotionValue(0)
  const thumb = useTransform(progress, [0, 1], [0, 132])
  const shift = useTransform(progress, [0, 1], [18, -18])

  useEffect(() => {
    const controls = animate(progress, [0, 1, 1, 0], { duration: 9, times: [0, 0.62, 0.85, 1], ease: 'easeInOut', repeat: Infinity })
    return () => controls.stop()
  }, [progress])

  return (
    <div className="relative flex h-[280px] w-[440px] items-center overflow-hidden rounded-2xl border bg-card px-8 text-foreground">
      <motion.p className="pr-4 text-[26px] font-semibold leading-[1.25] tracking-tight" style={{ y: shift }}>
        {WORDS.map((w, i) => (
          <Word key={i} word={w} i={i} progress={progress} />
        ))}
      </motion.p>

      {/* barra de rolagem simulada */}
      <div className="absolute bottom-[56px] right-3 top-[56px] w-1 rounded-full bg-muted">
        <motion.div className="h-8 w-1 rounded-full bg-foreground/40" style={{ y: thumb }} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-card to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
    </div>
  )
}
