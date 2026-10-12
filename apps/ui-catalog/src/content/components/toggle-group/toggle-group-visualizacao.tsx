'use client'

import { useState } from 'react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, LayoutGrid, List, Map, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const VISUALIZACOES = [
  { v: 'lista', Icon: List, label: 'Lista' },
  { v: 'grade', Icon: LayoutGrid, label: 'Grade' },
  { v: 'mapa', Icon: Map, label: 'Mapa' },
]

const IMOVEIS = [
  { nome: 'Apto 2 qts · Pinheiros', preco: 'R$ 3.900/mês' },
  { nome: 'Casa 3 qts · Vila Mariana', preco: 'R$ 6.200/mês' },
  { nome: 'Studio · Moema', preco: 'R$ 2.700/mês' },
  { nome: 'Cobertura · Perdizes', preco: 'R$ 9.800/mês' },
  { nome: 'Apto 1 qt · Bela Vista', preco: 'R$ 2.300/mês' },
  { nome: 'Sobrado · Santana', preco: 'R$ 4.100/mês' },
]

const PINS = [
  [22, 35],
  [48, 58],
  [63, 28],
  [78, 66],
  [35, 72],
  [58, 80],
]

const ALINHAMENTOS = [
  { v: 'esquerda', Icon: AlignLeft, label: 'Alinhar à esquerda', cls: 'text-left' },
  { v: 'centro', Icon: AlignCenter, label: 'Centralizar', cls: 'text-center' },
  { v: 'direita', Icon: AlignRight, label: 'Alinhar à direita', cls: 'text-right' },
  { v: 'justificado', Icon: AlignJustify, label: 'Justificar', cls: 'text-justify' },
]

export default function ToggleGroupVisualizacao() {
  const [vista, setVista] = useState('grade')
  const [formato, setFormato] = useState<string[]>(['negrito'])
  const [alinhamento, setAlinhamento] = useState('esquerda')
  const alinhar = ALINHAMENTOS.find((a) => a.v === alinhamento)?.cls ?? 'text-left'

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Seleção única — modo de visualização</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{IMOVEIS.length} imóveis em São Paulo</span>
          <ToggleGroup
            value={[vista]}
            onValueChange={(v) => {
              const proxima = v[0]
              if (typeof proxima === 'string') setVista(proxima)
            }}
            variant="outline"
            spacing={0}
            aria-label="Modo de visualização"
          >
            {VISUALIZACOES.map((o) => (
              <ToggleGroupItem key={o.v} value={o.v} aria-label={o.label}>
                <o.Icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="rounded-xl border bg-card p-3">
          {vista === 'lista' && (
            <ul className="divide-y text-sm">
              {IMOVEIS.map((i) => (
                <li key={i.nome} className="flex items-center justify-between py-2">
                  <span>{i.nome}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{i.preco}</span>
                </li>
              ))}
            </ul>
          )}
          {vista === 'grade' && (
            <div className="grid grid-cols-3 gap-3">
              {IMOVEIS.map((i) => (
                <div key={i.nome} className="space-y-1.5">
                  <div className="h-16 rounded-md bg-gradient-to-br from-muted to-muted-foreground/20" />
                  <p className="truncate text-xs font-medium">{i.nome}</p>
                  <p className="text-xs text-muted-foreground">{i.preco}</p>
                </div>
              ))}
            </div>
          )}
          {vista === 'mapa' && (
            <div className="relative h-44 overflow-hidden rounded-md bg-muted/60 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:28px_28px]">
              {PINS.map(([x, y], i) => (
                <span key={i} style={{ left: `${x}%`, top: `${y}%` }} className="absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground ring-2 ring-background">
                  {i + 1}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Seleção múltipla — formatação</p>
        <div className="flex items-center gap-4">
          <ToggleGroup multiple value={formato} onValueChange={(v) => setFormato(v.map(String))} aria-label="Formatação">
            <ToggleGroupItem value="negrito" aria-label="Negrito">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italico" aria-label="Itálico">
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="sublinhado" aria-label="Sublinhado">
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
          <span className={`text-sm ${formato.includes('negrito') ? 'font-bold' : ''} ${formato.includes('italico') ? 'italic' : ''} ${formato.includes('sublinhado') ? 'underline' : ''}`}>Reunião com a Kavo às 15h</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Segmentado pequeno — alinhamento</p>
        <ToggleGroup
          value={[alinhamento]}
          onValueChange={(v) => {
            const proximo = v[0]
            if (typeof proximo === 'string') setAlinhamento(proximo)
          }}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label="Alinhamento"
        >
          {ALINHAMENTOS.map((a) => (
            <ToggleGroupItem key={a.v} value={a.v} aria-label={a.label}>
              <a.Icon />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className={`rounded-md border p-3 text-sm ${alinhar}`}>Prezada Ana, segue a proposta revisada com o desconto de 12% para pagamento anual, válida até o fim do mês.</p>
      </div>
    </div>
  )
}
