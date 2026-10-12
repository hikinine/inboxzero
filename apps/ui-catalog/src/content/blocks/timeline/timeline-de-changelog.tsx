'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tipo = 'novo' | 'melhoria' | 'correcao'

const TIPOS: Record<Tipo, { rotulo: string; chip: string; ponto: string }> = {
  novo: { rotulo: 'Novo', chip: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', ponto: 'bg-emerald-500' },
  melhoria: { rotulo: 'Melhoria', chip: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', ponto: 'bg-sky-500' },
  correcao: { rotulo: 'Correção', chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', ponto: 'bg-amber-500' },
}

const VERSOES: Array<{ versao: string; data: string; titulo: string; itens: Array<{ tipo: Tipo; texto: string }> }> = [
  {
    versao: '4.12',
    data: '9 out 2026',
    titulo: 'Assistente de IA no app mobile',
    itens: [
      { tipo: 'novo', texto: 'Sugestão de resposta e resumo da conversa agora também no iOS e no Android.' },
      { tipo: 'novo', texto: 'Filtro de conversas por etiqueta na tela de fila.' },
      { tipo: 'melhoria', texto: 'Abertura do inbox 40% mais rápida em contas com mais de 50 mil contatos.' },
      { tipo: 'correcao', texto: 'Notificação duplicada ao transferir conversa entre filas.' },
    ],
  },
  {
    versao: '4.11',
    data: '25 set 2026',
    titulo: 'Relatórios por canal',
    itens: [
      { tipo: 'novo', texto: 'Relatório de volume, tempo de resposta e conversão separado por WhatsApp, Instagram e e-mail.' },
      { tipo: 'melhoria', texto: 'Exportação em CSV respeita o fuso horário da conta.' },
      { tipo: 'melhoria', texto: 'Busca de contatos aceita telefone com ou sem DDI.' },
      { tipo: 'correcao', texto: 'Gráfico de fila mostrava o dia anterior após a meia-noite.' },
    ],
  },
  {
    versao: '4.10',
    data: '11 set 2026',
    titulo: 'Correções e desempenho',
    itens: [
      { tipo: 'melhoria', texto: 'Anexos de até 100 MB no e-mail, com barra de progresso.' },
      { tipo: 'correcao', texto: 'Áudio do WhatsApp não tocava no Safari 17.' },
      { tipo: 'correcao', texto: 'Etiquetas removidas voltavam após a sincronização com o Pipedrive.' },
    ],
  },
]

export default function TimelineDeChangelog() {
  const [filtro, setFiltro] = useState<Tipo | null>(null)
  const rotuloFiltro = filtro ? TIPOS[filtro].rotulo : ''

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Changelog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O que mudou, versão a versão</h2>
          </div>
          <Button variant="outline" className="w-fit">
            <Bell data-icon="inline-start" /> Receber novidades
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por tipo">
          <button type="button" aria-pressed={filtro === null} onClick={() => setFiltro(null)} className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors', filtro === null ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
            Tudo
          </button>
          {(Object.keys(TIPOS) as Tipo[]).map((t) => (
            <button key={t} type="button" aria-pressed={filtro === t} onClick={() => setFiltro(filtro === t ? null : t)} className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors', filtro === t ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
              <span className={cn('size-1.5 rounded-full', TIPOS[t].ponto)} /> {TIPOS[t].rotulo}
            </button>
          ))}
        </div>

        <ol className="mt-10">
          {VERSOES.map((v, i) => {
            const itens = filtro ? v.itens.filter((it) => it.tipo === filtro) : v.itens
            const ultimo = i === VERSOES.length - 1
            return (
              <li key={v.versao} className={cn('relative grid gap-3 sm:grid-cols-[160px_1fr] sm:gap-10', !ultimo && 'pb-12')}>
                <div className="sm:sticky sm:top-24 sm:self-start">
                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start sm:gap-1.5">
                    <Badge variant={i === 0 ? 'default' : 'outline'} className="font-mono">
                      v{v.versao}
                    </Badge>
                    <time className="text-sm text-muted-foreground">{v.data}</time>
                    {i === 0 && <span className="text-xs font-medium text-primary">Mais recente</span>}
                  </div>
                </div>
                <div className={cn('relative border-l pl-8', ultimo && 'border-transparent')}>
                  <span className={cn('absolute top-1.5 -left-[5px] size-[9px] rounded-full', i === 0 ? 'bg-primary' : 'bg-border')} aria-hidden="true" />
                  <h3 className="text-lg font-semibold">{v.titulo}</h3>
                  <ul className="mt-4 space-y-3">
                    {itens.map((it) => (
                      <li key={it.texto} className="flex items-start gap-3 text-sm">
                        <span className={cn('mt-0.5 inline-flex h-5 w-20 shrink-0 items-center justify-center rounded-full text-[11px] font-medium', TIPOS[it.tipo].chip)}>{TIPOS[it.tipo].rotulo}</span>
                        <span className="text-muted-foreground">{it.texto}</span>
                      </li>
                    ))}
                    {itens.length === 0 && <li className="text-sm italic text-muted-foreground/70">Nada do tipo “{rotuloFiltro}” nesta versão.</li>}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
