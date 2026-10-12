'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, Copy, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Claude Chat": conversa no estilo do assistente — pergunta do usuário numa bolha discreta e resposta sem bolha,
// ao lado da marca em forma de estrela. A resposta chega em markdown digitado bloco a bloco: título, lista com
// negrito e um bloco de código com tokens coloridos. Ao terminar aparecem as ações; depois de uma pausa, recomeça.
interface Token {
  t: string
  c?: string
}
type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'li'; strong: string; text: string }
  | { kind: 'code'; lang: string; tokens: Token[] }

const QUESTION = 'Como estruturo a migração para o novo checkout?'
const BLOCKS: Block[] = [
  { kind: 'h2', text: 'Plano em 3 etapas' },
  { kind: 'li', strong: 'Mapear', text: ' os fluxos de pagamento atuais (cartão, Pix e boleto).' },
  { kind: 'li', strong: 'Duplicar', text: ' o checkout atrás de uma feature flag.' },
  { kind: 'li', strong: 'Migrar', text: ' 10% do tráfego e comparar a conversão por 7 dias.' },
  {
    kind: 'code',
    lang: 'typescript',
    tokens: [
      { t: 'const ', c: 'text-violet-400' },
      { t: 'checkout ' },
      { t: '= ', c: 'text-zinc-500' },
      { t: 'await ', c: 'text-violet-400' },
      { t: 'createCheckout', c: 'text-sky-300' },
      { t: '({ flag: ' },
      { t: "'v2'", c: 'text-emerald-300' },
      { t: ', rollout: ' },
      { t: '0.1', c: 'text-amber-300' },
      { t: ' })' },
    ],
  },
  { kind: 'p', text: 'Quer que eu gere o checklist de rollback também?' },
]

const blockLength = (b: Block) => (b.kind === 'li' ? b.strong.length + b.text.length : b.kind === 'code' ? b.tokens.reduce((n, t) => n + t.t.length, 0) : b.text.length)
const STARTS = BLOCKS.reduce<number[]>((acc, _b, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + blockLength(BLOCKS[i - 1]))
  return acc
}, [])
const TOTAL = STARTS[STARTS.length - 1] + blockLength(BLOCKS[BLOCKS.length - 1])

type Phase = 'idle' | 'question' | 'thinking' | 'typing' | 'done'
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function ClaudeMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2.5 L13.9 8.4 L19.6 6.1 L15.6 11 L21 14.2 L14.8 14.6 L16.3 20.7 L12 16.2 L7.7 20.7 L9.2 14.6 L3 14.2 L8.4 11 L4.4 6.1 L10.1 8.4 Z" fill="currentColor" />
    </svg>
  )
}

function Caret() {
  return <motion.span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-orange-500 align-baseline" animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 0.9, times: [0, 0.5, 0.51, 1], repeat: Infinity }} />
}

function BlockView({ block, k, caret }: { block: Block; k: number; caret: boolean }) {
  const c = caret ? <Caret /> : null
  if (block.kind === 'h2') {
    return (
      <h3 className="text-sm font-semibold">
        {block.text.slice(0, k)}
        {c}
      </h3>
    )
  }
  if (block.kind === 'p') {
    return (
      <p className="text-[13px] leading-relaxed">
        {block.text.slice(0, k)}
        {c}
      </p>
    )
  }
  if (block.kind === 'li') {
    const strong = block.strong.slice(0, Math.min(k, block.strong.length))
    const rest = block.text.slice(0, Math.max(0, k - block.strong.length))
    return (
      <div className="flex gap-2 text-[13px] leading-relaxed">
        <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-muted-foreground" />
        <p>
          <strong className="font-semibold">{strong}</strong>
          {rest}
          {c}
        </p>
      </div>
    )
  }
  let remaining = k
  return (
    <div className="overflow-hidden rounded-lg bg-zinc-950 font-mono text-[11px] text-zinc-100">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1 text-[10px] text-zinc-500">
        <span>{block.lang}</span>
        <Copy className="size-3" />
      </div>
      <pre className="whitespace-pre-wrap px-3 py-2">
        {block.tokens.map((t, j) => {
          if (remaining <= 0) return null
          const s = t.t.slice(0, remaining)
          remaining -= t.t.length
          return (
            <span key={j} className={t.c}>
              {s}
            </span>
          )
        })}
        {c}
      </pre>
    </div>
  )
}

export default function ClaudeChat() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [n, setN] = useState(0)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        setPhase('idle')
        setN(0)
        await sleep(500)
        setPhase('question')
        await sleep(900)
        setPhase('thinking')
        await sleep(1300)
        setPhase('typing')
        for (let i = 1; i <= TOTAL; i++) {
          if (cancelled) return
          setN(i)
          await sleep(STARTS.includes(i) ? 260 : 14)
        }
        setPhase('done')
        await sleep(3800)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const streaming = phase === 'typing' || phase === 'done'
  const visible = BLOCKS.map((b, i) => ({ b, k: Math.min(Math.max(0, n - STARTS[i]), blockLength(b)), i })).filter((v) => v.k > 0)
  const last = visible[visible.length - 1]

  return (
    <div className="flex h-[380px] w-[440px] flex-col rounded-2xl border bg-card text-foreground">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <ClaudeMark className="size-4 text-orange-500" />
        <span className="text-sm font-medium">Claude</span>
        <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">Sonnet 4.5</span>
        <span className="ml-auto text-[10px] text-muted-foreground">Nova conversa</span>
      </div>

      <div className="flex-1 overflow-hidden px-4">
        <div className="flex min-h-full flex-col justify-end gap-3 pb-3">
          <AnimatePresence>
            {phase !== 'idle' && (
              <motion.div key="q" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="self-end rounded-2xl bg-muted px-3.5 py-2 text-[13px]">
                {QUESTION}
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 'thinking' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-muted-foreground">
              <motion.span className="flex" animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}>
                <ClaudeMark className="size-4 text-orange-500" />
              </motion.span>
              Pensando…
            </motion.div>
          )}

          {streaming && (
            <div className="flex gap-3">
              <ClaudeMark className="mt-1 size-4 shrink-0 text-orange-500" />
              <div className="min-w-0 flex-1 space-y-2">
                {visible.map((v) => (
                  <BlockView key={v.i} block={v.b} k={v.k} caret={phase === 'typing' && last !== undefined && v.i === last.i} />
                ))}
                <AnimatePresence>
                  {phase === 'done' && (
                    <motion.div key="actions" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-0.5 pt-1">
                      {[
                        { Icon: Copy, label: 'Copiar' },
                        { Icon: ThumbsUp, label: 'Boa resposta' },
                        { Icon: ThumbsDown, label: 'Resposta ruim' },
                        { Icon: RefreshCw, label: 'Tentar de novo' },
                      ].map(({ Icon, label }) => (
                        <button key={label} type="button" aria-label={label} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                          <Icon className="size-3.5" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
          <span className="flex-1 text-[13px] text-muted-foreground">Responder ao Claude…</span>
          <button type="button" aria-label="Enviar" className="flex size-7 items-center justify-center rounded-lg bg-orange-500 text-white">
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
