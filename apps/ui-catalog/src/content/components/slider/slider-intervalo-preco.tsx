'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const MARCAS = [0, 1000, 2000, 3000, 4000, 5000]

function toRange(v: number | readonly number[]): [number, number] {
  if (typeof v === 'number') return [v, v]
  return [v[0] ?? 0, v[1] ?? v[0] ?? 0]
}

export default function SliderIntervaloPreco() {
  const [faixa, setFaixa] = useState<[number, number]>([250, 1800])
  const [orcamento, setOrcamento] = useState(1200)

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Intervalo com dois thumbs</p>
        <div className="flex items-center justify-between">
          <Label>Faixa de preço</Label>
          <span className="text-sm tabular-nums">
            {brl.format(faixa[0])} – {brl.format(faixa[1])}
          </span>
        </div>
        <Slider value={faixa} onValueChange={(v) => setFaixa(toRange(v))} min={0} max={5000} step={50} aria-label="Faixa de preço" />
        <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground" aria-hidden>
          {MARCAS.map((m) => (
            <span key={m}>{m === 0 ? 'R$ 0' : `${m / 1000} mil`}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="preco-min" className="text-xs text-muted-foreground">
              Mínimo
            </Label>
            <Input id="preco-min" readOnly value={brl.format(faixa[0])} className="tabular-nums" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="preco-max" className="text-xs text-muted-foreground">
              Máximo
            </Label>
            <Input id="preco-max" readOnly value={brl.format(faixa[1])} className="tabular-nums" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Valor único</p>
        <div className="flex items-center justify-between">
          <Label>Orçamento mensal de anúncios</Label>
          <span className="text-sm font-medium tabular-nums">{brl.format(orcamento)}</span>
        </div>
        <Slider value={[orcamento]} onValueChange={(v) => setOrcamento(toRange(v)[0])} min={100} max={5000} step={100} aria-label="Orçamento mensal" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Desabilitado</p>
        <div className="flex items-center justify-between">
          <Label className="text-muted-foreground">Faixa definida pelo plano</Label>
          <span className="text-sm tabular-nums text-muted-foreground">R$ 800 – R$ 2.400</span>
        </div>
        <Slider defaultValue={[800, 2400]} min={0} max={5000} disabled aria-label="Faixa bloqueada" />
      </div>
    </div>
  )
}
