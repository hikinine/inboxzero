'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Check, Copy, FileCode2, Terminal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Destaque de sintaxe sem biblioteca: cada linha é uma lista de [tipo, texto].
type Tipo = 'kw' | 'fn' | 'str' | 'num' | 'pn' | 'tx'
type Token = [Tipo, string]

const CORES: Record<Tipo, string> = {
  kw: 'text-fuchsia-600 dark:text-fuchsia-400',
  fn: 'text-sky-600 dark:text-sky-400',
  str: 'text-emerald-600 dark:text-emerald-400',
  num: 'text-amber-600 dark:text-amber-400',
  pn: 'text-muted-foreground',
  tx: 'text-foreground',
}

const LINHAS: Token[][] = [
  [['kw', 'import'], ['tx', ' { '], ['fn', 'createClient'], ['tx', ' } '], ['kw', 'from'], ['tx', ' '], ['str', "'@codehall/sdk'"]],
  [],
  [['kw', 'const'], ['tx', ' client = '], ['fn', 'createClient'], ['pn', '({'], ['tx', ' token: '], ['str', "'ch_live_…'"], ['pn', ' })']],
  [],
  [['kw', 'export async function'], ['tx', ' '], ['fn', 'listarPedidos'], ['pn', '('], ['tx', 'status'], ['pn', ': '], ['str', "'pago'"], ['pn', ' | '], ['str', "'pendente'"], ['pn', ') {']],
  [['tx', '  '], ['kw', 'const'], ['tx', ' { data } = '], ['kw', 'await'], ['tx', ' client.pedidos.'], ['fn', 'list'], ['pn', '({'], ['tx', ' status, limit: '], ['num', '20'], ['pn', ' })']],
  [['tx', '  '], ['kw', 'return'], ['tx', ' data.'], ['fn', 'map'], ['pn', '(('], ['tx', 'p'], ['pn', ') => ({'], ['tx', ' id: p.id, total: '], ['fn', 'formatBRL'], ['pn', '('], ['tx', 'p.total'], ['pn', ') }))']],
  [['pn', '}']],
]
const DESTAQUE = new Set([5, 6])

const TERMINAL = [
  { prompt: true, texto: 'pnpm add @codehall/sdk' },
  { prompt: false, texto: '✔ @codehall/sdk 2.4.0 instalado em 1,8s' },
  { prompt: true, texto: 'pnpm exec codehall init --projeto lumi' },
  { prompt: false, texto: '✔ Projeto configurado em ./codehall.config.ts' },
]

function useCopiar(texto: string) {
  const [copiado, setCopiado] = useState(false)
  useEffect(() => {
    if (!copiado) return
    const t = setTimeout(() => setCopiado(false), 1500)
    return () => clearTimeout(t)
  }, [copiado])
  const copiar = () => {
    navigator.clipboard?.writeText(texto).catch(() => {})
    setCopiado(true)
  }
  return { copiado, copiar }
}

function BotaoCopiar({ copiado, onClick, label }: { copiado: boolean; onClick: () => void; label: string }) {
  return (
    <Button variant="ghost" size="xs" className="ml-auto" onClick={onClick} aria-label={label}>
      {copiado ? (
        <>
          <Check data-icon="inline-start" /> Copiado
        </>
      ) : (
        <>
          <Copy data-icon="inline-start" /> Copiar
        </>
      )}
    </Button>
  )
}

export default function CodeBlockComTitulo() {
  const codigo = LINHAS.map((l) => l.map((t) => t[1]).join('')).join('\n')
  const comandos = TERMINAL.filter((l) => l.prompt)
    .map((l) => l.texto)
    .join('\n')
  const a = useCopiar(codigo)
  const b = useCopiar(comandos)

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <Legenda>Arquivo com linhas numeradas e destaque</Legenda>
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
            <FileCode2 className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">pedidos.ts</span>
            <Badge variant="outline" className="font-mono text-[10px]">
              TypeScript
            </Badge>
            <BotaoCopiar copiado={a.copiado} onClick={a.copiar} label="Copiar código" />
          </div>
          <pre className="overflow-x-auto py-3 text-[13px] leading-6">
            <code>
              {LINHAS.map((linha, i) => (
                <span key={i} className={`flex ${DESTAQUE.has(i + 1) ? 'bg-primary/10' : ''}`}>
                  <span className="w-10 shrink-0 select-none pr-3 text-right text-muted-foreground/60 tabular-nums">{i + 1}</span>
                  <span className="pr-4">{linha.length ? linha.map((t, j) => <span key={j} className={CORES[t[0]]}>{t[1]}</span>) : ' '}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <div>
        <Legenda>Terminal</Legenda>
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
            <Terminal className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">zsh</span>
            <BotaoCopiar copiado={b.copiado} onClick={b.copiar} label="Copiar comandos" />
          </div>
          <pre className="overflow-x-auto px-3 py-3 text-[13px] leading-6">
            <code>
              {TERMINAL.map((l, i) => (
                <span key={i} className={`block ${l.prompt ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {l.prompt && <span className="select-none text-emerald-500">$ </span>}
                  {l.texto}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
