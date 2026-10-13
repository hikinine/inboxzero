'use client'

import { useEffect, useState } from 'react'
import { CircleCheck, FileCode } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Syntax Typewriter Text": editor de código que digita um trecho de TypeScript caractere a caractere, já com
// realce de sintaxe por token (palavra-chave, função, string, número, tipo), linha atual destacada e cursor piscando.
// Ao terminar, a barra de status mostra "Salvo", segura e o arquivo é limpo para recomeçar.
type Kind = 'kw' | 'fn' | 'str' | 'num' | 'type' | 'punc' | 'txt' | 'cmt'
type Tok = readonly [string, Kind]

const LINES: readonly (readonly Tok[])[] = [
  [['// fecha o pedido e cobra via Pix', 'cmt']],
  [['import', 'kw'], [' { ', 'punc'], ['cobrar', 'fn'], [' } ', 'punc'], ['from', 'kw'], [" './pagamentos'", 'str']],
  [],
  [['export async function', 'kw'], [' finalizar', 'fn'], ['(', 'punc'], ['pedido', 'txt'], [': ', 'punc'], ['Pedido', 'type'], [') {', 'punc']],
  [['  const', 'kw'], [' frete ', 'txt'], ['= ', 'punc'], ['pedido', 'txt'], ['.', 'punc'], ['total', 'txt'], [' > ', 'punc'], ['199', 'num'], [' ? ', 'punc'], ['0', 'num'], [' : ', 'punc'], ['19.9', 'num']],
  [['  await', 'kw'], [' cobrar', 'fn'], ['(', 'punc'], ['pedido', 'txt'], ['.', 'punc'], ['total', 'txt'], [' + ', 'punc'], ['frete', 'txt'], [', ', 'punc'], ["'pix'", 'str'], [')', 'punc']],
  [['  return', 'kw'], [' { ', 'punc'], ['status', 'txt'], [': ', 'punc'], ["'pago'", 'str'], [', ', 'punc'], ['frete', 'txt'], [' }', 'punc']],
  [['}', 'punc']],
]

const COLOR: Record<Kind, string> = {
  kw: 'text-violet-600 dark:text-violet-400',
  fn: 'text-sky-600 dark:text-sky-400',
  str: 'text-emerald-600 dark:text-emerald-400',
  num: 'text-amber-600 dark:text-amber-400',
  type: 'text-teal-600 dark:text-teal-400',
  punc: 'text-muted-foreground',
  txt: 'text-foreground',
  cmt: 'text-muted-foreground/70 italic',
}

const LINE_LEN = LINES.map((l) => l.reduce((n, [s]) => n + s.length, 0) + 1) // +1 = quebra de linha
const TOTAL = LINE_LEN.reduce((a, b) => a + b, 0)
const HOLD = 70 // ticks segurando o código pronto

export default function SyntaxTypewriterText() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= TOTAL + HOLD ? 0 : v + 1)), 32)
    return () => clearInterval(id)
  }, [])
  const typed = Math.min(n, TOTAL)
  const done = n >= TOTAL

  // linha onde está o cursor
  let acc = 0
  let cursorLine = LINES.length - 1
  for (let i = 0; i < LINES.length; i++) {
    if (typed < acc + LINE_LEN[i]!) {
      cursorLine = i
      break
    }
    acc += LINE_LEN[i]!
  }

  let budget = typed
  return (
    <div className="flex h-[290px] w-[460px] flex-col overflow-hidden rounded-xl border bg-card text-foreground shadow-lg">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="ml-2 flex items-center gap-1.5 rounded-md bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
          <FileCode className="size-3" />
          checkout.ts
          {!done && <span className="size-1.5 rounded-full bg-foreground/60" />}
        </span>
      </div>

      <div className="flex-1 py-2 font-mono text-[12px] leading-[22px]">
        {LINES.map((line, i) => {
          const lineBudget = budget
          budget = Math.max(0, budget - LINE_LEN[i]!)
          const visibleLine = i <= cursorLine
          const active = i === cursorLine && !done
          let left = lineBudget
          return (
            <div key={i} className={cn('flex pr-3', active && 'bg-muted/60')}>
              <span className="w-9 shrink-0 select-none pr-3 text-right text-muted-foreground/50">{i + 1}</span>
              <span className="whitespace-pre">
                {visibleLine &&
                  line.map(([text, kind], k) => {
                    const part = text.slice(0, Math.max(0, left))
                    left -= text.length
                    return part ? (
                      <span key={k} className={COLOR[kind]}>
                        {part}
                      </span>
                    ) : null
                  })}
                {i === cursorLine && (
                  <motion.span
                    className="ml-px inline-block h-[15px] w-[2px] translate-y-[3px] bg-foreground"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.9, times: [0, 0.5, 0.55, 1], repeat: Infinity }}
                  />
                )}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between border-t bg-muted/40 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span>TypeScript · UTF-8</span>
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.span key="ok" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CircleCheck className="size-3" /> Salvo · sem erros
            </motion.span>
          ) : (
            <motion.span key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Ln {cursorLine + 1}, Col {typed - acc + 1}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
