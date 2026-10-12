'use client'

import { useState } from 'react'
import { AlignHorizontalJustifyCenter, AlignHorizontalJustifyEnd, AlignHorizontalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd, AlignVerticalJustifyStart, ChevronsDown, ChevronsUp, Minus } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type Pos = 'start' | 'center' | 'end'
const POS: Pos[] = ['start', 'center', 'end']
const ehPos = (v: unknown): v is Pos => v === 'start' || v === 'center' || v === 'end'

const JUSTIFY: Record<Pos, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end' }
const ITEMS: Record<Pos, string> = { start: 'items-start', center: 'items-center', end: 'items-end' }
const ROTULO: Record<Pos, string> = { start: 'início', center: 'centro', end: 'fim' }

const H = [
  { v: 'start', Icon: AlignHorizontalJustifyStart, label: 'Alinhar à esquerda' },
  { v: 'center', Icon: AlignHorizontalJustifyCenter, label: 'Centralizar na horizontal' },
  { v: 'end', Icon: AlignHorizontalJustifyEnd, label: 'Alinhar à direita' },
] as const
const V = [
  { v: 'start', Icon: AlignVerticalJustifyStart, label: 'Alinhar ao topo' },
  { v: 'center', Icon: AlignVerticalJustifyCenter, label: 'Centralizar na vertical' },
  { v: 'end', Icon: AlignVerticalJustifyEnd, label: 'Alinhar à base' },
] as const

const CAMADA = [
  { v: 'frente', Icon: ChevronsUp, label: 'Trazer para frente' },
  { v: 'meio', Icon: Minus, label: 'Manter' },
  { v: 'tras', Icon: ChevronsDown, label: 'Enviar para trás' },
] as const

function Quadro({ h, v, children }: { h: Pos; v: Pos; children?: React.ReactNode }) {
  return (
    <div className={cn('relative flex h-36 rounded-lg border bg-muted/40 p-3 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:12px_12px]', JUSTIFY[h], ITEMS[v])}>
      <div className="flex h-10 w-20 items-center justify-center rounded-md bg-primary text-[11px] font-medium text-primary-foreground shadow-sm transition-all">Botão</div>
      {children}
    </div>
  )
}

export default function ToggleGroupDeAlinhamento() {
  const [h, setH] = useState<Pos>('center')
  const [v, setV] = useState<Pos>('center')
  const [ancora, setAncora] = useState('mc')
  const [camada, setCamada] = useState('frente')

  const ancH = POS[['l', 'c', 'r'].indexOf(ancora[1] ?? 'c')] ?? 'center'
  const ancV = POS[['t', 'm', 'b'].indexOf(ancora[0] ?? 'm')] ?? 'center'

  return (
    <div className="w-full max-w-lg space-y-7">
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Horizontal e vertical, seleção única</p>
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup value={[h]} onValueChange={(x) => { const p = x[0]; if (ehPos(p)) setH(p) }} variant="outline" spacing={0} aria-label="Alinhamento horizontal">
            {H.map((o) => (
              <ToggleGroupItem key={o.v} value={o.v} aria-label={o.label}>
                <o.Icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup value={[v]} onValueChange={(x) => { const p = x[0]; if (ehPos(p)) setV(p) }} variant="outline" spacing={0} aria-label="Alinhamento vertical">
            {V.map((o) => (
              <ToggleGroupItem key={o.v} value={o.v} aria-label={o.label}>
                <o.Icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <span className="text-xs text-muted-foreground">
            {ROTULO[h]} · {ROTULO[v]}
          </span>
        </div>
        <Quadro h={h} v={v} />
      </div>

      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Âncora 3×3</p>
          <ToggleGroup value={[ancora]} onValueChange={(x) => { const a = x[0]; if (typeof a === 'string') setAncora(a) }} variant="outline" spacing={0} aria-label="Ponto de ancoragem" className="grid! w-fit grid-cols-3 overflow-hidden rounded-lg border [&>button]:size-8 [&>button]:rounded-none [&>button]:border-0 [&>button]:min-w-0 [&>button]:px-0">
            {(['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'] as const).map((a) => (
              <ToggleGroupItem key={a} value={a} aria-label={`Âncora ${a}`}>
                <span className={cn('size-1.5 rounded-full', ancora === a ? 'bg-primary' : 'bg-muted-foreground/50')} aria-hidden />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Prévia da âncora</p>
          <Quadro h={ancH} v={ancV} />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Vertical, numa barra lateral de ferramentas</p>
        <div className="flex items-start gap-3">
          <ToggleGroup orientation="vertical" value={[camada]} onValueChange={(x) => { const c = x[0]; if (typeof c === 'string') setCamada(c) }} variant="outline" spacing={0} aria-label="Ordem da camada">
            {CAMADA.map((o) => (
              <ToggleGroupItem key={o.v} value={o.v} aria-label={o.label}>
                <o.Icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="relative h-28 flex-1 rounded-lg border bg-muted/40">
            <div className={cn('absolute top-6 left-8 h-14 w-24 rounded-md border bg-background shadow-sm transition-all', camada === 'tras' ? 'z-0 opacity-70' : 'z-10')} />
            <div className={cn('absolute top-10 left-20 flex h-14 w-24 items-center justify-center rounded-md bg-primary text-[11px] font-medium text-primary-foreground shadow-sm transition-all', camada === 'frente' ? 'z-20' : camada === 'meio' ? 'z-10' : 'z-0')}>Camada</div>
            <div className={cn('absolute top-14 left-32 h-14 w-24 rounded-md border bg-background shadow-sm transition-all', camada === 'frente' ? 'z-10' : 'z-10')} />
          </div>
        </div>
      </div>
    </div>
  )
}
