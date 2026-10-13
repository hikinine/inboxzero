'use client'

import { useEffect, useState } from 'react'
import { CircleCheck, FileCode, GitPullRequest } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Code Diff Animation": revisão de código em formato diff. As linhas removidas ficam vermelhas e riscadas, as novas
// são digitadas uma a uma em verde, o contador "+3 −2" sobe junto e, no fim, chega a aprovação do revisor com um
// comentário. Destaque de sintaxe simples (palavras-chave e chamadas). Reinicia em loop.
type Line = { kind: 'ctx' | 'del' | 'add'; text: string }
const LINES: Line[] = [
  { kind: 'ctx', text: 'export async function finalizarPedido(carrinho) {' },
  { kind: 'ctx', text: '  const total = somarItens(carrinho)' },
  { kind: 'del', text: '  const frete = 15' },
  { kind: 'del', text: '  return cobrar(total + frete)' },
  { kind: 'add', text: '  const frete = await calcularFrete(carrinho.cep)' },
  { kind: 'add', text: '  const desconto = aplicarCupom(carrinho.cupom)' },
  { kind: 'add', text: '  return cobrarPix(total + frete - desconto)' },
  { kind: 'ctx', text: '}' },
]
const ADDS = LINES.filter((l) => l.kind === 'add')
const DELS = LINES.filter((l) => l.kind === 'del').length
const KW = /(\bexport\b|\basync\b|\bfunction\b|\bconst\b|\breturn\b|\bawait\b|[A-Za-z]+(?=\())/g

function Code({ text }: { text: string }) {
  const parts = text.split(KW)
  return (
    <>
      {parts.map((p, i) =>
        /^(export|async|function|const|return|await)$/.test(p) ? (
          <span key={i} className="text-violet-600 dark:text-violet-400">
            {p}
          </span>
        ) : i % 2 === 1 ? (
          <span key={i} className="text-sky-600 dark:text-sky-400">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function CodeDiffAnimation() {
  const [marked, setMarked] = useState(false)
  const [typed, setTyped] = useState<number[]>(ADDS.map(() => 0)) // caracteres digitados por linha nova
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setMarked(false)
        setApproved(false)
        setTyped(ADDS.map(() => 0))
        await sleep(1000)
        setMarked(true)
        await sleep(700)
        for (let a = 0; a < ADDS.length && !cancelled; a++) {
          for (let c = 0; c <= ADDS[a].text.length && !cancelled; c += 2) {
            setTyped((t) => t.map((v, k) => (k === a ? c : v)))
            await sleep(22)
          }
          setTyped((t) => t.map((v, k) => (k === a ? ADDS[a].text.length : v)))
          await sleep(200)
        }
        await sleep(500)
        if (cancelled) return
        setApproved(true)
        await sleep(2800)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const addsShown = typed.filter((n) => n > 0).length
  let oldNo = 40
  let newNo = 40
  let addIdx = -1

  return (
    <div className="w-[470px] overflow-hidden rounded-xl border bg-card text-foreground shadow-md">
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <FileCode className="size-3.5 text-muted-foreground" /> src/checkout/finalizar.ts
        </span>
        <span className="flex gap-1.5 font-mono text-[11px] font-semibold tabular-nums">
          <span className="text-emerald-600 dark:text-emerald-400">+{addsShown}</span>
          <span className="text-rose-600 dark:text-rose-400">−{marked ? DELS : 0}</span>
        </span>
      </div>

      <div className="py-1.5 font-mono text-[11px] leading-[20px]">
        {LINES.map((l, i) => {
          if (l.kind === 'add') {
            addIdx += 1
            const n = typed[addIdx]
            if (n === 0) return null
            newNo += 1
            return (
              <motion.div key={i} initial={{ height: 0, opacity: 0 }} animate={{ height: 20, opacity: 1 }} className="flex bg-emerald-500/10">
                <span className="w-8 shrink-0 pr-2 text-right text-muted-foreground/50" />
                <span className="w-8 shrink-0 pr-2 text-right text-muted-foreground/70">{newNo}</span>
                <span className="w-4 shrink-0 text-emerald-600 dark:text-emerald-400">+</span>
                <span className="whitespace-pre">
                  <Code text={l.text.slice(0, n)} />
                  {n < l.text.length && <span className="inline-block h-3 w-[6px] translate-y-0.5 bg-emerald-500" />}
                </span>
              </motion.div>
            )
          }
          const del = l.kind === 'del'
          oldNo += 1
          if (!del) newNo += 1
          return (
            <div key={i} className={cn('flex transition-colors duration-500', del && marked && 'bg-rose-500/10')}>
              <span className="w-8 shrink-0 pr-2 text-right text-muted-foreground/70">{oldNo}</span>
              <span className="w-8 shrink-0 pr-2 text-right text-muted-foreground/50">{del ? '' : newNo}</span>
              <span className={cn('w-4 shrink-0', del && marked ? 'text-rose-600 dark:text-rose-400' : 'text-transparent')}>−</span>
              <span className={cn('whitespace-pre transition-opacity duration-500', del && marked && 'line-through decoration-rose-500/60 opacity-60')}>
                <Code text={l.text} />
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex h-[52px] items-center border-t px-3">
        <AnimatePresence mode="wait">
          {approved ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex w-full items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] font-semibold text-white">RS</span>
              <div className="min-w-0 flex-1 text-[11px]">
                <span className="font-medium">Renata Souza</span> <span className="text-muted-foreground">aprovou · “frete dinâmico ficou ótimo 🚀”</span>
              </div>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 14, delay: 0.15 }} className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CircleCheck className="size-3" /> Aprovado
              </motion.span>
            </motion.div>
          ) : (
            <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <GitPullRequest className="size-3.5" /> PR #318 · aguardando revisão
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
