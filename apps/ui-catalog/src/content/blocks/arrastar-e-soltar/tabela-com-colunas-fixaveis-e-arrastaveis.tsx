'use client'

import { useState } from 'react'
import type { DragEvent } from 'react'
import { GripVertical, Pin, PinOff, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Chave = 'nome' | 'empresa' | 'cidade' | 'etapa' | 'valor' | 'responsavel' | 'origem' | 'ultimoContato' | 'score'

interface Lead {
  nome: string
  empresa: string
  cidade: string
  etapa: 'Novo' | 'Qualificado' | 'Proposta' | 'Negociação' | 'Ganho'
  valor: number
  responsavel: string
  origem: string
  ultimoContato: string
  score: number
}

const COLUNAS: Record<Chave, { rotulo: string; largura: number; direita?: boolean }> = {
  nome: { rotulo: 'Contato', largura: 170 },
  empresa: { rotulo: 'Empresa', largura: 170 },
  cidade: { rotulo: 'Cidade', largura: 140 },
  etapa: { rotulo: 'Etapa', largura: 130 },
  valor: { rotulo: 'Valor', largura: 120, direita: true },
  responsavel: { rotulo: 'Responsável', largura: 140 },
  origem: { rotulo: 'Origem', largura: 130 },
  ultimoContato: { rotulo: 'Último contato', largura: 130 },
  score: { rotulo: 'Score', largura: 100, direita: true },
}

const ORDEM_INICIAL: Chave[] = ['nome', 'empresa', 'cidade', 'etapa', 'valor', 'responsavel', 'origem', 'ultimoContato', 'score']

const LEADS: Lead[] = [
  { nome: 'Beatriz Sales', empresa: 'Doce Lar Confeitaria', cidade: 'Belo Horizonte', etapa: 'Proposta', valor: 18900, responsavel: 'Rodrigo P.', origem: 'Indicação', ultimoContato: 'hoje', score: 82 },
  { nome: 'Henrique Azevedo', empresa: 'Azevedo Transportes', cidade: 'Campinas', etapa: 'Negociação', valor: 64200, responsavel: 'Larissa M.', origem: 'Google Ads', ultimoContato: 'ontem', score: 91 },
  { nome: 'Priscila Moura', empresa: 'Clínica Sorriso Pleno', cidade: 'Goiânia', etapa: 'Qualificado', valor: 12500, responsavel: 'Rodrigo P.', origem: 'Instagram', ultimoContato: '3 dias', score: 67 },
  { nome: 'Otávio Fernandes', empresa: 'Fernandes Advocacia', cidade: 'Porto Alegre', etapa: 'Novo', valor: 8400, responsavel: 'Camila T.', origem: 'Site', ultimoContato: '5 dias', score: 44 },
  { nome: 'Luana Batista', empresa: 'Studio Lumi', cidade: 'Salvador', etapa: 'Ganho', valor: 23800, responsavel: 'Larissa M.', origem: 'Evento', ultimoContato: 'hoje', score: 98 },
  { nome: 'Caio Nogueira', empresa: 'Nogueira Agro', cidade: 'Londrina', etapa: 'Proposta', valor: 47100, responsavel: 'Camila T.', origem: 'LinkedIn', ultimoContato: '2 dias', score: 76 },
]

const COR_ETAPA: Record<Lead['etapa'], string> = {
  Novo: 'bg-muted-foreground/40',
  Qualificado: 'bg-sky-500',
  Proposta: 'bg-violet-500',
  Negociação: 'bg-amber-500',
  Ganho: 'bg-emerald-500',
}

function Celula({ chave, lead }: { chave: Chave; lead: Lead }) {
  switch (chave) {
    case 'nome':
      return <span className="font-medium">{lead.nome}</span>
    case 'etapa':
      return (
        <Badge variant="outline" className="gap-1.5">
          <span className={cn('size-1.5 rounded-full', COR_ETAPA[lead.etapa])} />
          {lead.etapa}
        </Badge>
      )
    case 'valor':
      return <span className="tabular-nums">{lead.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</span>
    case 'score':
      return (
        <span className="inline-flex items-center gap-2 tabular-nums">
          <span className="h-1.5 w-10 overflow-hidden rounded-full bg-muted">
            <span className={cn('block h-full rounded-full', lead.score > 80 ? 'bg-emerald-500' : lead.score > 60 ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${lead.score}%` }} />
          </span>
          {lead.score}
        </span>
      )
    default:
      return <span className="text-muted-foreground">{lead[chave]}</span>
  }
}

export default function TabelaComColunasFixaveisEArrastaveis() {
  const [ordem, setOrdem] = useState<Chave[]>(ORDEM_INICIAL)
  const [fixas, setFixas] = useState<Chave[]>(['nome'])
  const [arrastando, setArrastando] = useState<Chave | null>(null)
  const [alvo, setAlvo] = useState<Chave | null>(null)

  // colunas fixas sempre à esquerda, na ordem em que aparecem
  const visiveis = [...ordem.filter((c) => fixas.includes(c)), ...ordem.filter((c) => !fixas.includes(c))]
  const deslocamento = (c: Chave) => {
    let x = 0
    for (const k of visiveis) {
      if (k === c) break
      if (fixas.includes(k)) x += COLUNAS[k].largura
    }
    return x
  }
  const ultimaFixa = visiveis.filter((c) => fixas.includes(c)).at(-1)

  const soltar = (destino: Chave) => {
    if (!arrastando || arrastando === destino) return
    setOrdem((o) => {
      const sem = o.filter((c) => c !== arrastando)
      const i = sem.indexOf(destino)
      const de = o.indexOf(arrastando)
      const para = o.indexOf(destino)
      sem.splice(de < para ? i + 1 : i, 0, arrastando)
      return sem
    })
    // soltar sobre uma coluna fixa fixa a arrastada também (e vice-versa)
    setFixas((f) => (f.includes(destino) ? Array.from(new Set([...f, arrastando])) : f.filter((c) => c !== arrastando)))
  }

  const alternarFixa = (c: Chave) => setFixas((f) => (f.includes(c) ? f.filter((x) => x !== c) : [...f, c]))

  const estiloFixo = (c: Chave) => (fixas.includes(c) ? { left: deslocamento(c), position: 'sticky' as const } : undefined)

  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Leads do trimestre</h2>
            <p className="text-sm text-muted-foreground">Arraste os cabeçalhos para reordenar. Use o alfinete para fixar a coluna ao rolar para o lado.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {fixas.length} fixa{fixas.length === 1 ? '' : 's'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOrdem(ORDEM_INICIAL)
                setFixas(['nome'])
              }}
            >
              <RotateCcw data-icon="inline-start" /> Restaurar
            </Button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
          <table className="w-max min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {visiveis.map((c) => {
                  const fixa = fixas.includes(c)
                  return (
                    <th
                      key={c}
                      draggable
                      onDragStart={(e: DragEvent<HTMLTableCellElement>) => {
                        e.dataTransfer.effectAllowed = 'move'
                        e.dataTransfer.setData('text/plain', c)
                        setArrastando(c)
                      }}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setAlvo(c)
                      }}
                      onDragLeave={() => setAlvo((a) => (a === c ? null : a))}
                      onDrop={(e) => {
                        e.preventDefault()
                        soltar(c)
                        setAlvo(null)
                      }}
                      onDragEnd={() => {
                        setArrastando(null)
                        setAlvo(null)
                      }}
                      style={{ width: COLUNAS[c].largura, minWidth: COLUNAS[c].largura, ...estiloFixo(c) }}
                      className={cn(
                        'group h-10 cursor-grab border-b bg-muted/60 px-3 text-left text-xs font-medium text-muted-foreground select-none active:cursor-grabbing',
                        fixa && 'z-20 bg-muted backdrop-blur',
                        c === ultimaFixa && 'shadow-[4px_0_8px_-4px_rgb(0_0_0/0.15)]',
                        arrastando === c && 'opacity-40',
                        alvo === c && arrastando !== c && 'bg-primary/10 shadow-[inset_2px_0_0_var(--primary)]',
                      )}
                    >
                      <span className={cn('flex items-center gap-1.5', COLUNAS[c].direita && 'justify-end')}>
                        <GripVertical className="size-3.5 shrink-0 opacity-40 group-hover:opacity-100" />
                        <span className="truncate">{COLUNAS[c].rotulo}</span>
                        <button
                          type="button"
                          onClick={() => alternarFixa(c)}
                          aria-label={fixa ? `Desafixar ${COLUNAS[c].rotulo}` : `Fixar ${COLUNAS[c].rotulo}`}
                          aria-pressed={fixa}
                          className={cn('ml-auto flex size-6 shrink-0 items-center justify-center rounded-md transition-opacity hover:bg-background', fixa ? 'text-primary' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100')}
                        >
                          {fixa ? <PinOff className="size-3.5" /> : <Pin className="size-3.5" />}
                        </button>
                      </span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {LEADS.map((l) => (
                <tr key={l.nome} className="group/linha">
                  {visiveis.map((c) => (
                    <td
                      key={c}
                      style={estiloFixo(c)}
                      className={cn(
                        'h-12 border-b px-3 whitespace-nowrap group-last/linha:border-0 group-hover/linha:bg-muted/40',
                        COLUNAS[c].direita && 'text-right',
                        fixas.includes(c) && 'z-10 bg-card group-hover/linha:bg-muted',
                        c === ultimaFixa && 'shadow-[4px_0_8px_-4px_rgb(0_0_0/0.15)]',
                        arrastando === c && 'opacity-40',
                      )}
                    >
                      <Celula chave={c} lead={l} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Ordem atual: {visiveis.map((c) => COLUNAS[c].rotulo).join(' · ')}</p>
      </div>
    </section>
  )
}
