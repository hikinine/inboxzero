'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// "Keyboard Typing": teclado em SVG (três fileiras + espaço, com ç) que digita frases em loop. A tecla da vez acende
// em primary e afunda; ao soltar, apaga devagar, deixando um rastro. O campo acima mostra o texto com cursor.
const ROWS: ReadonlyArray<{ keys: string[]; offset: number }> = [
  { keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], offset: 0 },
  { keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç'], offset: 14 },
  { keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'], offset: 36 },
]
const KEY_W = 38
const KEY_H = 32
const GAP = 6
const X0 = 13
const Y0 = 6
const SPACE = { x: 101, y: Y0 + 3 * (KEY_H + GAP), w: 258, h: KEY_H }
const PHRASES = ['olá, mundo', 'vendas em alta', 'automação de vendas']

const keyFor = (ch: string) => {
  if (ch === ' ') return 'space'
  if (ch === 'ç') return 'ç'
  return ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function Key({ x, y, w, h, label, active }: { x: number; y: number; w: number; h: number; label: string; active: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="var(--card)" stroke="var(--border)" />
      <motion.rect x={x} y={y} width={w} height={h} rx="6" fill="var(--primary)" initial={false} animate={{ opacity: active ? 1 : 0, scale: active ? 0.92 : 1 }} transition={{ duration: active ? 0.06 : 0.45 }} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="12" className={`pointer-events-none select-none transition-colors duration-150 ${active ? 'fill-primary-foreground' : 'fill-foreground'}`}>
        {label}
      </text>
    </g>
  )
}

export default function KeyboardTyping() {
  const [typed, setTyped] = useState('')
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        for (const phrase of PHRASES) {
          setTyped('')
          await sleep(600)
          for (const ch of phrase) {
            if (cancelled) return
            setActive(keyFor(ch))
            setTyped((t) => t + ch)
            await sleep(130)
            setActive(null)
            await sleep(ch === ' ' ? 110 : 55)
          }
          await sleep(1500)
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="w-[460px] text-foreground">
      <div className="flex h-10 items-center rounded-lg border bg-background px-3 font-mono text-sm">
        <span>{typed}</span>
        <motion.span className="ml-0.5 inline-block h-[1.1em] w-[2px] bg-primary" animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, times: [0, 0.5, 0.51, 1], repeat: Infinity }} />
        <span className="ml-auto text-[10px] text-muted-foreground">{typed.length} caracteres</span>
      </div>
      <svg viewBox="0 0 460 160" className="mt-3 h-[160px] w-[460px]" role="img" aria-label="Teclado com teclas acendendo conforme o texto é digitado">
        <rect x="2" y="0" width="456" height="158" rx="12" fill="var(--muted)" opacity="0.5" />
        {ROWS.map((row, r) =>
          row.keys.map((k, i) => <Key key={k} x={X0 + row.offset + i * (KEY_W + GAP)} y={Y0 + r * (KEY_H + GAP)} w={KEY_W} h={KEY_H} label={k} active={active === k} />),
        )}
        <Key x={SPACE.x} y={SPACE.y} w={SPACE.w} h={SPACE.h} label="espaço" active={active === 'space'} />
      </svg>
    </div>
  )
}
