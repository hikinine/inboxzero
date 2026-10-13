'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

// "Letter Flip Text": painel split-flap de aeroporto. A cada 3,4s chega uma nova linha (métrica + valor) e cada
// plaqueta gira pelo alfabeto até a letra certa — da esquerda para a direita, com atraso por coluna —, virando
// em rotateX a cada passo, com a dobradiça no meio.
const CHARSET = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$,.+%'
const COLS = 8
const ROWS: ReadonlyArray<readonly [string, string]> = [
  ['VENDAS', 'R$ 1,2MI'],
  ['LEADS', '+38%'],
  ['PEDIDOS', '4.812'],
  ['CLIENTES', '+1.290'],
]
const pad = (s: string) => s.padEnd(COLS, ' ').slice(0, COLS).split('')

function Tile({ ch, big }: { ch: string; big?: boolean }) {
  return (
    <span className={`relative overflow-hidden rounded-[5px] bg-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [perspective:200px] ${big ? 'h-12 w-9' : 'h-8 w-6'}`}>
      <motion.span
        key={ch}
        className={`absolute inset-0 flex items-center justify-center font-mono font-semibold text-neutral-50 ${big ? 'text-[26px]' : 'text-base text-amber-300'}`}
        initial={{ rotateX: -80, opacity: 0.4 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.07, ease: 'easeOut' }}
        style={{ transformOrigin: '50% 50%' }}
      >
        {ch}
      </motion.span>
      <span className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
    </span>
  )
}

export default function LetterFlipText() {
  const [row, setRow] = useState(0)
  const [top, setTop] = useState<string[]>(pad(''))
  const [bottom, setBottom] = useState<string[]>(pad(''))
  const tick = useRef(0)

  useEffect(() => {
    const id = setInterval(() => setRow((r) => (r + 1) % ROWS.length), 3400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    tick.current = 0
    const [tw, bw] = ROWS[row].map(pad)
    const step = (cur: string[], target: string[]) =>
      cur.map((c, i) => {
        if (c === target[i] || tick.current < i * 2) return c
        return CHARSET[(CHARSET.indexOf(c) + 1) % CHARSET.length]
      })
    const id = setInterval(() => {
      tick.current += 1
      setTop((cur) => step(cur, tw))
      setBottom((cur) => step(cur, bw))
    }, 45)
    return () => clearInterval(id)
  }, [row])

  return (
    <div className="w-[400px] rounded-2xl border bg-card p-5 text-foreground shadow-sm">
      <div className="mb-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span>Destaque do mês</span>
        <span className="flex items-center gap-1.5">
          <motion.span className="size-1.5 rounded-full bg-amber-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          Atualizando
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-neutral-950 p-3">
        <div className="flex gap-1">
          {top.map((c, i) => (
            <Tile key={i} ch={c} big />
          ))}
        </div>
        <div className="flex gap-1">
          {bottom.map((c, i) => (
            <Tile key={i} ch={c} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
        <span>OUT · 2026</span>
        <span>
          {row + 1}/{ROWS.length}
        </span>
      </div>
    </div>
  )
}
