'use client'

import { useState } from 'react'
import { Bug, GitCommitHorizontal, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

type Tipo = 'novo' | 'melhoria' | 'correcao'

interface Versao {
  v: string
  data: string
  titulo: string
  maior?: boolean
  itens: { tipo: Tipo; texto: string }[]
}

const TIPO: Record<Tipo, { label: string; Icon: LucideIcon; cor: string; ponto: string }> = {
  novo: { label: 'Novo', Icon: Sparkles, cor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', ponto: 'bg-emerald-500' },
  melhoria: { label: 'Melhoria', Icon: Wrench, cor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300', ponto: 'bg-sky-500' },
  correcao: { label: 'Correção', Icon: Bug, cor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300', ponto: 'bg-amber-500' },
}

const VERSOES: Versao[] = [
  {
    v: '2.8.0',
    data: '12 out 2026',
    titulo: 'Previsão de fechamento com IA',
    maior: true,
    itens: [
      { tipo: 'novo', texto: 'Probabilidade de fechamento em cada negócio do pipeline.' },
      { tipo: 'novo', texto: 'Resumo automático das conversas do WhatsApp.' },
      { tipo: 'melhoria', texto: 'Busca global 3× mais rápida em contas grandes.' },
    ],
  },
  {
    v: '2.7.2',
    data: '3 out 2026',
    titulo: 'Correções de importação',
    itens: [
      { tipo: 'correcao', texto: 'CSV com acentos quebrava o nome dos contatos.' },
      { tipo: 'correcao', texto: 'Webhook de pagamento disparava duas vezes.' },
    ],
  },
  {
    v: '2.7.0',
    data: '22 set 2026',
    titulo: 'Integração com RD Station',
    itens: [
      { tipo: 'novo', texto: 'Sincronização de leads em tempo real.' },
      { tipo: 'melhoria', texto: 'Filtros do pipeline salvos por usuário.' },
      { tipo: 'correcao', texto: 'Exportação de relatório mensal travava em contas com mais de 50 mil contatos.' },
    ],
  },
]

export default function TimelineDeVersoes() {
  const [filtro, setFiltro] = useState<Tipo[]>(['novo', 'melhoria', 'correcao'])
  const alternar = (t: Tipo) => setFiltro((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]))
  const visiveis = VERSOES.map((v) => ({ ...v, itens: v.itens.filter((i) => filtro.includes(i.tipo)) })).filter((v) => v.itens.length > 0)

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-medium text-muted-foreground">Mostrar</span>
        {(Object.keys(TIPO) as Tipo[]).map((t) => {
          const T = TIPO[t]
          return (
            <Toggle key={t} size="sm" variant="outline" pressed={filtro.includes(t)} onPressedChange={() => alternar(t)} className="h-6 gap-1 rounded-full px-2 text-xs data-[state=on]:bg-muted">
              <span className={cn('size-1.5 rounded-full', T.ponto)} aria-hidden /> {T.label}
            </Toggle>
          )
        })}
      </div>

      <ol className="relative">
        {visiveis.map((v, vi) => {
          const ultimo = vi === visiveis.length - 1
          return (
            <li key={v.v} className="grid grid-cols-[4.5rem_1.25rem_1fr] gap-x-3 pb-7 last:pb-0">
              <div className="pt-0.5 text-right">
                <code className={cn('rounded-md px-1.5 py-0.5 font-mono text-xs', vi === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted')}>v{v.v}</code>
                <div className="mt-1.5 text-[11px] text-muted-foreground">{v.data}</div>
              </div>
              <div className="relative flex justify-center">
                {!ultimo && <span className="absolute top-5 bottom-[-1.75rem] w-px bg-border" aria-hidden />}
                <span className={cn('relative z-10 mt-0.5 flex size-5 items-center justify-center rounded-full border-2 bg-background', v.maior ? 'border-primary text-primary' : 'border-border text-muted-foreground')}>
                  <GitCommitHorizontal className="size-3" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{v.titulo}</span>
                  {vi === 0 && <Badge variant="secondary">Atual</Badge>}
                  {v.maior && <Badge variant="outline">Lançamento</Badge>}
                </div>
                <ul className="mt-2 space-y-1.5">
                  {v.itens.map((i) => {
                    const T = TIPO[i.tipo]
                    return (
                      <li key={i.texto} className="flex items-start gap-2 text-sm">
                        <span className={cn('mt-0.5 inline-flex h-5 shrink-0 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium', T.cor)}>
                          <T.Icon className="size-3" /> {T.label}
                        </span>
                        <span className="text-muted-foreground">{i.texto}</span>
                      </li>
                    )
                  })}
                </ul>
                <Button variant="link" size="xs" className="mt-1 h-auto p-0 text-xs">
                  Ver notas completas
                </Button>
              </div>
            </li>
          )
        })}
        {visiveis.length === 0 && <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Nenhuma mudança com esses filtros.</li>}
      </ol>
    </div>
  )
}
