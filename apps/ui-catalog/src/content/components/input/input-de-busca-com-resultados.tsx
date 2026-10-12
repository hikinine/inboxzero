'use client'

import { useState, type ReactNode } from 'react'
import { Briefcase, Clock, CornerDownLeft, FileText, Search, Users, X, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Escopo = 'contatos' | 'negocios' | 'arquivos'

interface Resultado {
  escopo: Escopo
  titulo: string
  meta: string
  ini?: string
}

const ESCOPOS: { id: Escopo; label: string; Icon: LucideIcon }[] = [
  { id: 'contatos', label: 'Contatos', Icon: Users },
  { id: 'negocios', label: 'Negócios', Icon: Briefcase },
  { id: 'arquivos', label: 'Arquivos', Icon: FileText },
]

const RESULTADOS: Resultado[] = [
  { escopo: 'contatos', titulo: 'Ana Souza', meta: 'Lumi Tecnologia · ana@lumi.com.br', ini: 'AS' },
  { escopo: 'contatos', titulo: 'Carla Mendes', meta: 'Kavo Ltda · carla@kavo.com.br', ini: 'CM' },
  { escopo: 'contatos', titulo: 'Diego Lima', meta: 'Nuvem Fit · diego@nuvemfit.app', ini: 'DL' },
  { escopo: 'negocios', titulo: 'Lumi — implantação CRM', meta: 'Proposta · R$ 24.000' },
  { escopo: 'negocios', titulo: 'Kavo — renovação anual', meta: 'Negociação · R$ 12.500' },
  { escopo: 'arquivos', titulo: 'Proposta comercial — Lumi.pdf', meta: '2,4 MB · há 2 h' },
  { escopo: 'arquivos', titulo: 'Contrato Kavo assinado.pdf', meta: '1,1 MB · ontem' },
]

const RECENTES = ['Lumi', 'propostas em aberto', 'Carla']

const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

function Destaque({ texto, termo }: { texto: string; termo: string }) {
  const t = normalizar(termo)
  const i = normalizar(texto).indexOf(t)
  if (!t || i < 0) return <>{texto}</>
  return (
    <>
      {texto.slice(0, i)}
      <mark className="rounded-sm bg-amber-200/70 px-0.5 text-foreground dark:bg-amber-400/30">{texto.slice(i, i + t.length)}</mark>
      {texto.slice(i + t.length)}
    </>
  )
}

export default function InputDeBuscaComResultados() {
  const [termo, setTermo] = useState('lu')
  const [escopo, setEscopo] = useState<Escopo | 'todos'>('todos')
  const [ativo, setAtivo] = useState(0)

  const encontrados = RESULTADOS.filter((r) => (escopo === 'todos' || r.escopo === escopo) && (normalizar(r.titulo).includes(normalizar(termo)) || normalizar(r.meta).includes(normalizar(termo))))
  const grupos = ESCOPOS.map((e) => ({ ...e, itens: encontrados.filter((r) => r.escopo === e.id) })).filter((g) => g.itens.length > 0)
  let indice = -1

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Resultados agrupados, inline</p>
        <Label htmlFor="busca-global" className="sr-only">
          Buscar
        </Label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="busca-global"
            value={termo}
            onChange={(e) => {
              setTermo(e.target.value)
              setAtivo(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setAtivo((a) => Math.min(encontrados.length - 1, a + 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setAtivo((a) => Math.max(0, a - 1))
              }
            }}
            placeholder="Buscar contatos, negócios e arquivos…"
            className="h-9 px-8"
            autoComplete="off"
          />
          {termo && (
            <button type="button" onClick={() => setTermo('')} aria-label="Limpar busca" className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="flex items-center gap-1 border-b p-1.5">
            {(['todos', ...ESCOPOS.map((e) => e.id)] as const).map((id) => {
              const label = id === 'todos' ? 'Tudo' : ESCOPOS.find((e) => e.id === id)?.label
              return (
                <button key={id} type="button" onClick={() => setEscopo(id)} className={cn('rounded-md px-2 py-1 text-xs transition-colors', escopo === id ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                  {label}
                </button>
              )
            })}
            <span className="ml-auto pr-1.5 text-xs text-muted-foreground tabular-nums">{termo ? `${encontrados.length} resultado${encontrados.length === 1 ? '' : 's'}` : 'Recentes'}</span>
          </div>

          {!termo && (
            <ul className="p-1.5">
              {RECENTES.map((r) => (
                <li key={r}>
                  <button type="button" onClick={() => setTermo(r)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-accent hover:text-accent-foreground">
                    <Clock className="size-4 text-muted-foreground" /> {r}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {termo && grupos.length === 0 && <div className="px-3 py-8 text-center text-muted-foreground">Nada encontrado para “{termo}”.</div>}

          {termo &&
            grupos.map((g) => (
              <div key={g.id} className="p-1.5 not-first:border-t">
                <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  <g.Icon className="size-3" /> {g.label}
                </div>
                <ul>
                  {g.itens.map((r) => {
                    indice += 1
                    const selecionado = indice === ativo
                    return (
                      <li key={r.titulo}>
                        <a href="#" onMouseEnter={(() => { const i = encontrados.indexOf(r); return () => setAtivo(i) })()} className={cn('flex items-center gap-2.5 rounded-md px-2 py-1.5', selecionado ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/60')}>
                          {r.ini ? (
                            <Avatar size="sm">
                              <AvatarFallback>{r.ini}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <span className="flex size-6 items-center justify-center rounded-md bg-muted">
                              <g.Icon className="size-3.5 text-muted-foreground" />
                            </span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">
                              <Destaque texto={r.titulo} termo={termo} />
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              <Destaque texto={r.meta} termo={termo} />
                            </span>
                          </span>
                          {selecionado && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

          <div className="flex items-center gap-3 border-t bg-muted/40 px-3 py-1.5 text-[11px] text-muted-foreground">
            <Dica tecla="↑↓">navegar</Dica>
            <Dica tecla="↵">abrir</Dica>
            <Dica tecla="Esc">fechar</Dica>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Buscando (estado de carregamento)</p>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input defaultValue="relatório de churn" aria-label="Buscar arquivos" className="px-8" readOnly />
          <Spinner className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground" aria-label="Buscando" />
        </div>
        <p className="text-xs text-muted-foreground">Procurando em 1.284 arquivos…</p>
      </div>
    </div>
  )
}

function Dica({ tecla, children }: { tecla: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Kbd>{tecla}</Kbd> {children}
    </span>
  )
}
