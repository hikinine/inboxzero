'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'

const STATUS = ['Pago', 'Pendente', 'Reembolsado', 'Cancelado']
const CANAIS = ['Todos', 'Site', 'WhatsApp', 'Marketplace']
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function Filtros({ prefix, faixa, onFaixa }: { prefix: string; faixa: number[]; onFaixa: (v: number[]) => void }) {
  return (
    <div className="space-y-5">
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">Status</legend>
        {STATUS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Checkbox id={`${prefix}-st-${s}`} defaultChecked={i < 2} />
            <Label htmlFor={`${prefix}-st-${s}`} className="font-normal">
              {s}
            </Label>
          </div>
        ))}
      </fieldset>
      <Separator />
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Valor do pedido</span>
          <span className="tabular-nums text-muted-foreground">
            {brl.format(faixa[0] ?? 0)} – {brl.format(faixa[1] ?? 0)}
          </span>
        </div>
        <Slider value={faixa} onValueChange={(v) => onFaixa(typeof v === 'number' ? [v, v] : [...v])} min={0} max={5000} step={50} aria-label="Faixa de valor" />
      </div>
      <Separator />
      <div className="space-y-2">
        <Label htmlFor={`${prefix}-canal`}>Canal de venda</Label>
        <NativeSelect id={`${prefix}-canal`} defaultValue="Todos" className="w-full">
          {CANAIS.map((c) => (
            <NativeSelectOption key={c} value={c}>
              {c}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
    </div>
  )
}

export default function SheetFiltros() {
  const [faixa, setFaixa] = useState<number[]>([250, 1800])

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Gatilho</p>
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              <SlidersHorizontal data-icon="inline-start" /> Filtros
              <Badge variant="secondary">3</Badge>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Refine a lista de pedidos.</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4">
                <Filtros prefix="sheet" faixa={faixa} onFaixa={setFaixa} />
              </div>
              <SheetFooter className="flex-row justify-end">
                <SheetClose render={<Button variant="ghost" />}>Limpar</SheetClose>
                <SheetClose render={<Button />}>Aplicar filtros</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <span className="text-sm text-muted-foreground">48 pedidos encontrados</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Painel (inline)</p>
        <div className="rounded-xl border bg-popover text-sm text-popover-foreground shadow-sm">
          <div className="space-y-0.5 p-4">
            <h3 className="text-base font-medium">Filtros</h3>
            <p className="text-muted-foreground">Refine a lista de pedidos.</p>
          </div>
          <div className="px-4 pb-4">
            <Filtros prefix="inline" faixa={faixa} onFaixa={setFaixa} />
          </div>
          <div className="flex justify-end gap-2 border-t p-4">
            <Button variant="ghost" size="sm">
              Limpar
            </Button>
            <Button size="sm">Aplicar filtros</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
