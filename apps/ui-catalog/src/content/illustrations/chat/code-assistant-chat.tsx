'use client'

import { useEffect, useState } from 'react'
import { Check, Code, FileCode, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Spinner } from '@/components/ui/spinner'

// "Code Assistant Chat": assistente de código num painel lateral de IDE. A dev descreve o bug, o assistente aponta
// o arquivo e monta um diff linha a linha (contexto, remoções em vermelho, adições em verde), o botão "Aplicar" é
// pressionado, gira e vira "Aplicado", e por fim aparece a linha dos testes passando. Loop.
type Line = { kind: 'ctx' | 'del' | 'add'; n: number; code: string }
const DIFF: ReadonlyArray<Line> = [
  { kind: 'ctx', n: 12, code: 'export function total(cart: Cart) {' },
  { kind: 'ctx', n: 13, code: '  const sub = sum(cart.items)' },
  { kind: 'del', n: 14, code: '  return sub + cart.frete' },
  { kind: 'add', n: 14, code: '  const desc = sub * cart.cupom' },
  { kind: 'add', n: 15, code: '  return sub - desc + cart.frete' },
  { kind: 'ctx', n: 16, code: '}' },
]
const LINE_TONE: Record<Line['kind'], string> = {
  ctx: 'text-muted-foreground',
  del: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  add: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
}
const SIGN: Record<Line['kind'], string> = { ctx: ' ', del: '-', add: '+' }
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function CodeAssistantChat() {
  const [phase, setPhase] = useState(0)
  const [lines, setLines] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        setLines(0)
        await sleep(500)
        setPhase(1) // pergunta
        await sleep(900)
        setPhase(2) // resposta + diff
        for (let i = 1; i <= DIFF.length; i++) {
          await sleep(260)
          if (cancelled) return
          setLines(i)
        }
        await sleep(900)
        setPhase(3) // aplicando
        await sleep(900)
        setPhase(4) // aplicado
        await sleep(600)
        setPhase(5) // testes
        await sleep(2600)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex h-[400px] w-[400px] flex-col overflow-hidden rounded-xl border bg-card text-foreground shadow-lg">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <Sparkles className="size-4 text-violet-500" />
        <span className="text-xs font-medium">Assistente</span>
        <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">src/cart.ts</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div key="q" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="self-end rounded-xl rounded-br-sm bg-muted px-3 py-2 text-[12px]">
              O total do carrinho está ignorando o cupom de desconto 🤔
            </motion.div>
          )}
          {phase >= 2 && (
            <motion.div key="a" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-violet-500/15">
                <Code className="size-3.5 text-violet-500" />
              </span>
              <div className="min-w-0 flex-1 text-[12px]">
                <p>
                  Achei: <code className="rounded bg-muted px-1 font-mono text-[11px]">total()</code> nunca subtrai o cupom. Proponho:
                </p>
                <div className="mt-2 overflow-hidden rounded-lg border">
                  <div className="flex items-center gap-1.5 border-b bg-muted/50 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    <FileCode className="size-3" /> cart.ts
                    <span className="ml-auto text-emerald-600 dark:text-emerald-400">+2</span>
                    <span className="text-rose-600 dark:text-rose-400">−1</span>
                  </div>
                  <div className="py-1 font-mono text-[10.5px] leading-[18px]">
                    {DIFF.slice(0, lines).map((l, i) => (
                      <motion.div
                        key={i}
                        className={`flex whitespace-pre px-2 ${LINE_TONE[l.kind]} ${l.kind === 'del' && phase >= 4 ? 'line-through opacity-50' : ''}`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <span className="w-6 shrink-0 select-none text-right opacity-50">{l.n}</span>
                        <span className="w-4 shrink-0 text-center">{SIGN[l.kind]}</span>
                        {l.code}
                      </motion.div>
                    ))}
                  </div>
                </div>
                {lines >= DIFF.length && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 flex items-center gap-2">
                    <motion.span
                      className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-medium ${phase >= 4 ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground'}`}
                      animate={phase === 3 ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      {phase === 3 ? <Spinner className="size-3" /> : phase >= 4 ? <Check className="size-3" strokeWidth={3} /> : null}
                      {phase >= 4 ? 'Aplicado' : phase === 3 ? 'Aplicando…' : 'Aplicar'}
                    </motion.span>
                    <span className="inline-flex h-7 items-center rounded-md border px-2.5 text-[11px] text-muted-foreground">Descartar</span>
                  </motion.div>
                )}
                <AnimatePresence>
                  {phase >= 5 && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-emerald-600 dark:text-emerald-400">
                      <Check className="size-3" strokeWidth={3} /> cart.test.ts · 3 testes passaram (412ms)
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t p-2">
        <div className="rounded-lg border bg-background px-3 py-2 text-[11px] text-muted-foreground">Pergunte ou peça uma alteração…</div>
      </div>
    </div>
  )
}
