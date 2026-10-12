'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { GitBranch, Mail, Maximize2, MessageCircle, Play, Trash2, UserCheck, Zap, ZoomIn, ZoomOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Tipo = 'gatilho' | 'condicao' | 'acao'

interface No {
  id: string
  tipo: Tipo
  titulo: string
  subtitulo: string
  x: number
  y: number
  Icon: LucideIcon
}

interface Aresta {
  de: string
  para: string
  rotulo?: string
  vertical?: boolean
}

const W = 192
const H = 72

const NOS: No[] = [
  { id: 'gatilho', tipo: 'gatilho', titulo: 'Novo lead no formulário', subtitulo: 'Site · “Fale com vendas”', x: 24, y: 150, Icon: Zap },
  { id: 'condicao', tipo: 'condicao', titulo: 'Orçamento acima de R$ 5 mil?', subtitulo: 'Campo: orçamento estimado', x: 256, y: 150, Icon: GitBranch },
  { id: 'whats', tipo: 'acao', titulo: 'Enviar WhatsApp', subtitulo: 'Modelo: boas-vindas enterprise', x: 488, y: 24, Icon: MessageCircle },
  { id: 'vendedor', tipo: 'acao', titulo: 'Atribuir ao vendedor', subtitulo: 'Rodízio · time Inbound', x: 488, y: 150, Icon: UserCheck },
  { id: 'sequencia', tipo: 'acao', titulo: 'Adicionar à sequência', subtitulo: 'E-mails de nutrição (5 passos)', x: 488, y: 290, Icon: Mail },
]

const ARESTAS: Aresta[] = [
  { de: 'gatilho', para: 'condicao' },
  { de: 'condicao', para: 'whats', rotulo: 'Sim' },
  { de: 'condicao', para: 'sequencia', rotulo: 'Não' },
  { de: 'whats', para: 'vendedor', vertical: true },
]

const ESTILO: Record<Tipo, { rotulo: string; icone: string; borda: string }> = {
  gatilho: { rotulo: 'Gatilho', icone: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', borda: 'border-amber-500/40' },
  condicao: { rotulo: 'Condição', icone: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', borda: 'border-violet-500/40' },
  acao: { rotulo: 'Ação', icone: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', borda: 'border-sky-500/40' },
}

function caminho(a: Aresta) {
  const de = NOS.find((n) => n.id === a.de)!
  const para = NOS.find((n) => n.id === a.para)!
  if (a.vertical) {
    const x = de.x + W / 2
    const y1 = de.y + H
    const y2 = para.y
    return { d: `M ${x} ${y1} L ${x} ${y2}`, lx: x, ly: (y1 + y2) / 2 }
  }
  const x1 = de.x + W
  const y1 = de.y + H / 2
  const x2 = para.x
  const y2 = para.y + H / 2
  const c = Math.max(32, (x2 - x1) / 2)
  return { d: `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`, lx: (x1 + x2) / 2, ly: (y1 + y2) / 2 }
}

export default function ConstrutorWorkflow() {
  const [selecionado, setSelecionado] = useState('condicao')
  const no = NOS.find((n) => n.id === selecionado) ?? NOS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold">
                Boas-vindas a novos leads
                <Badge variant="secondary" className="gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Ativo
                </Badge>
              </h2>
              <p className="text-xs text-muted-foreground">Editado há 12 min por Ana Souza · 148 execuções hoje</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Diminuir zoom">
                <ZoomOut />
              </Button>
              <span className="w-10 text-center text-xs text-muted-foreground tabular-nums">100%</span>
              <Button variant="ghost" size="icon-sm" aria-label="Aumentar zoom">
                <ZoomIn />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Ajustar à tela">
                <Maximize2 />
              </Button>
              <span className="mx-1 h-5 w-px bg-border" />
              <Button variant="outline" size="sm">
                <Play data-icon="inline-start" /> Testar
              </Button>
              <Button size="sm">Publicar</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px]">
            <div className="overflow-auto [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="relative h-[400px] w-[704px]">
                <svg className="absolute inset-0 size-full" aria-hidden="true">
                  <defs>
                    <marker id="wf-seta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
                    </marker>
                  </defs>
                  {ARESTAS.map((a) => {
                    const p = caminho(a)
                    return (
                      <g key={`${a.de}-${a.para}`}>
                        <path d={p.d} fill="none" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#wf-seta)" />
                        {a.rotulo && (
                          <>
                            <rect x={p.lx - 16} y={p.ly - 9} width="32" height="18" rx="9" className="fill-background stroke-border" />
                            <text x={p.lx} y={p.ly + 3.5} textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">
                              {a.rotulo}
                            </text>
                          </>
                        )}
                      </g>
                    )
                  })}
                </svg>

                {NOS.map((n) => {
                  const estilo = ESTILO[n.tipo]
                  const ativo = n.id === selecionado
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelecionado(n.id)}
                      aria-pressed={ativo}
                      style={{ left: n.x, top: n.y, width: W, height: H }}
                      className={cn('absolute flex items-center gap-3 rounded-lg border bg-card px-3 text-left shadow-sm transition-shadow hover:shadow-md', estilo.borda, ativo && 'ring-2 ring-primary ring-offset-2 ring-offset-background')}
                    >
                      <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-md', estilo.icone)}>
                        <n.Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{estilo.rotulo}</span>
                        <span className="block truncate text-sm font-medium leading-tight">{n.titulo}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{n.subtitulo}</span>
                      </span>
                      {n.tipo !== 'gatilho' && <span className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-full border-2 border-muted-foreground bg-background" />}
                      {n.id !== 'vendedor' && n.id !== 'sequencia' && <span className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rounded-full border-2 border-muted-foreground bg-background" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <aside className="border-t bg-muted/30 lg:border-t-0 lg:border-l">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className={cn('flex size-7 items-center justify-center rounded-md', ESTILO[no.tipo].icone)}>
                  <no.Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{ESTILO[no.tipo].rotulo}</p>
                  <p className="truncate text-sm font-medium">{no.titulo}</p>
                </div>
              </div>
              <FieldGroup key={no.id} className="p-4">
                <Field>
                  <FieldLabel htmlFor="wf-nome">Nome do passo</FieldLabel>
                  <Input id="wf-nome" defaultValue={no.titulo} />
                </Field>
                {no.tipo === 'gatilho' && (
                  <Field>
                    <FieldLabel htmlFor="wf-form">Formulário</FieldLabel>
                    <NativeSelect id="wf-form" defaultValue="vendas" className="w-full">
                      <NativeSelectOption value="vendas">Fale com vendas</NativeSelectOption>
                      <NativeSelectOption value="demo">Agendar demonstração</NativeSelectOption>
                      <NativeSelectOption value="newsletter">Newsletter</NativeSelectOption>
                    </NativeSelect>
                    <FieldDescription>Dispara a cada envio, inclusive de leads existentes.</FieldDescription>
                  </Field>
                )}
                {no.tipo === 'condicao' && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="wf-campo">Campo</FieldLabel>
                      <NativeSelect id="wf-campo" defaultValue="orcamento" className="w-full">
                        <NativeSelectOption value="orcamento">Orçamento estimado</NativeSelectOption>
                        <NativeSelectOption value="funcionarios">Nº de funcionários</NativeSelectOption>
                        <NativeSelectOption value="origem">Origem</NativeSelectOption>
                      </NativeSelect>
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field>
                        <FieldLabel htmlFor="wf-op">Operador</FieldLabel>
                        <NativeSelect id="wf-op" defaultValue="maior" className="w-full">
                          <NativeSelectOption value="maior">maior que</NativeSelectOption>
                          <NativeSelectOption value="menor">menor que</NativeSelectOption>
                          <NativeSelectOption value="igual">igual a</NativeSelectOption>
                        </NativeSelect>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="wf-valor">Valor</FieldLabel>
                        <Input id="wf-valor" defaultValue="5000" inputMode="numeric" />
                      </Field>
                    </div>
                  </>
                )}
                {no.tipo === 'acao' && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="wf-modelo">{no.id === 'vendedor' ? 'Regra de atribuição' : 'Modelo'}</FieldLabel>
                      <NativeSelect id="wf-modelo" defaultValue="a" className="w-full">
                        <NativeSelectOption value="a">{no.id === 'vendedor' ? 'Rodízio · time Inbound' : no.id === 'whats' ? 'Boas-vindas enterprise' : 'Nutrição (5 e-mails)'}</NativeSelectOption>
                        <NativeSelectOption value="b">{no.id === 'vendedor' ? 'Menor carga' : 'Boas-vindas padrão'}</NativeSelectOption>
                      </NativeSelect>
                    </Field>
                    {no.id === 'whats' && (
                      <Field>
                        <FieldLabel htmlFor="wf-msg">Prévia da mensagem</FieldLabel>
                        <Textarea id="wf-msg" rows={3} defaultValue="Oi {{nome}}! Aqui é a Ana, da Lumi. Vi que você pediu uma proposta para {{empresa}} — posso te ligar hoje?" />
                      </Field>
                    )}
                    <div className="flex items-center justify-between rounded-lg border bg-background p-3">
                      <div>
                        <p className="text-sm font-medium">Aguardar 10 min antes</p>
                        <p className="text-xs text-muted-foreground">Evita parecer resposta automática.</p>
                      </div>
                      <Switch defaultChecked={no.id === 'whats'} aria-label="Aguardar antes de executar" />
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between border-t pt-4">
                  <Button variant="ghost" size="sm" className="text-destructive" disabled={no.tipo === 'gatilho'}>
                    <Trash2 data-icon="inline-start" /> Excluir
                  </Button>
                  <Button size="sm">Salvar passo</Button>
                </div>
              </FieldGroup>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
