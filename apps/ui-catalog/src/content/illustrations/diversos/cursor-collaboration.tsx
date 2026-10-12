'use client'

import { useEffect, useRef, useState } from 'react'
import type { Easing } from 'motion/react'
import { motion } from 'motion/react'

// "Cursor Collaboration": documento com três cursores nomeados em cores. Ana vai até um trecho e o seleciona
// arrastando (a seleção cresce em sincronia com o cursor), Bruno clica em "Aprovar proposta" (botão afunda e
// solta um anel) e Carla só passeia. As posições do trecho e do botão são medidas no mount, então os cursores
// batem com o texto real, independentemente da fonte.
interface Rect {
  x: number
  y: number
  w: number
  h: number
}
const T = 9

const TONE = {
  rose: { text: 'text-rose-500', bg: 'bg-rose-500' },
  sky: { text: 'text-sky-500', bg: 'bg-sky-500' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500' },
} as const

function Cursor({ name, tone, x, y, times, scale, ease }: { name: string; tone: keyof typeof TONE; x: number[]; y: number[]; times: number[]; scale?: number[]; ease?: Easing[] }) {
  return (
    <motion.div className={`pointer-events-none absolute left-0 top-0 z-20 ${TONE[tone].text}`} animate={{ x, y, scale: scale ?? 1 }} transition={{ duration: T, times, repeat: Infinity, ease: ease ?? 'easeInOut' }}>
      <svg viewBox="0 0 20 20" className="size-5 drop-shadow-sm" aria-hidden>
        <path d="M1 1 L1 15.5 L4.8 11.8 L7.6 17.8 L10 16.8 L7.3 11 L12.6 11 Z" fill="currentColor" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className={`absolute left-4 top-4 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white ${TONE[tone].bg}`}>{name}</span>
    </motion.div>
  )
}

export default function CursorCollaboration() {
  const rootRef = useRef<HTMLDivElement>(null)
  const selRef = useRef<HTMLSpanElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [sel, setSel] = useState<Rect>({ x: 150, y: 96, w: 160, h: 22 })
  const [btn, setBtn] = useState({ x: 380, y: 236 })

  useEffect(() => {
    const root = rootRef.current
    const s = selRef.current
    const b = btnRef.current
    if (!root || !s || !b) return
    const r0 = root.getBoundingClientRect()
    const r1 = s.getBoundingClientRect()
    const r2 = b.getBoundingClientRect()
    setSel({ x: r1.left - r0.left, y: r1.top - r0.top, w: r1.width, h: r1.height })
    setBtn({ x: r2.left - r0.left + r2.width / 2, y: r2.top - r0.top + r2.height / 2 })
  }, [])

  const selTimes = [0, 0.14, 0.26, 0.42, 0.56, 0.72, 1]
  const selY = sel.y + sel.h * 0.65
  const clickTimes = [0, 0.3, 0.36, 0.4, 0.62, 1]

  return (
    <div ref={rootRef} className="relative h-[300px] w-[460px] overflow-hidden rounded-xl border bg-card p-6 text-foreground">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight">Proposta comercial — Nexa Tecnologia</h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {[
              { i: 'AS', c: 'bg-rose-500' },
              { i: 'BR', c: 'bg-sky-500' },
              { i: 'CM', c: 'bg-emerald-500' },
            ].map((a) => (
              <span key={a.i} className={`flex size-6 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-2 ring-card ${a.c}`}>
                {a.i}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 whitespace-nowrap text-[10px] text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />3 editando
          </span>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-6 text-foreground/90">
        Implantação do CRM com migração dos contatos atuais, treinamento da equipe e{' '}
        <span ref={selRef} className="whitespace-nowrap">
          entrega em 30 dias úteis
        </span>{' '}
        após a assinatura do contrato.
      </p>
      <p className="mt-2 text-[13px] leading-6 text-foreground/90">Investimento de R$ 12.900,00 em 3 parcelas, com suporte dedicado nos primeiros 90 dias e revisão trimestral de resultados.</p>

      <div className="mt-5 flex justify-end">
        <motion.button
          ref={btnRef}
          type="button"
          className="relative rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
          animate={{ scale: [1, 1, 0.94, 1, 1] }}
          transition={{ duration: T, times: [0, 0.35, 0.37, 0.4, 1], repeat: Infinity }}
        >
          Aprovar proposta
          <motion.span aria-hidden className="absolute inset-0 rounded-md border-2 border-sky-500" animate={{ scale: [0.9, 0.9, 0.9, 1.5, 1.5, 0.9], opacity: [0, 0, 0.8, 0, 0, 0] }} transition={{ duration: T, times: [0, 0.35, 0.36, 0.5, 0.99, 1], repeat: Infinity, ease: 'easeOut' }} />
        </motion.button>
      </div>

      {/* seleção da Ana, sincronizada com o arrasto */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute z-10 origin-left rounded-sm bg-rose-500/25"
        style={{ left: sel.x, top: sel.y, width: sel.w, height: sel.h }}
        animate={{ scaleX: [0, 0, 0, 1, 1, 0, 0] }}
        transition={{ duration: T, times: [0, 0.14, 0.26, 0.42, 0.56, 0.58, 1], repeat: Infinity, ease: 'linear' }}
      />

      <Cursor
        name="Ana"
        tone="rose"
        times={selTimes}
        ease={['easeInOut', 'easeInOut', 'linear', 'linear', 'easeInOut', 'easeInOut']}
        x={[360, sel.x - 1, sel.x - 1, sel.x + sel.w + 1, sel.x + sel.w + 1, 300, 360]}
        y={[44, selY, selY, selY, selY, 236, 44]}
      />
      <Cursor name="Bruno" tone="sky" times={clickTimes} x={[40, btn.x - 8, btn.x - 8, btn.x - 8, 120, 40]} y={[214, btn.y - 4, btn.y - 4, btn.y - 4, 84, 214]} scale={[1, 1, 0.85, 1, 1, 1]} />
      <Cursor name="Carla" tone="emerald" times={[0, 0.2, 0.45, 0.7, 1]} x={[200, 80, 330, 250, 200]} y={[128, 40, 150, 250, 128]} />
    </div>
  )
}
