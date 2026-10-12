'use client'

import { useState } from 'react'
import { Box, CalendarDays, Weight } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

type Peso = 'kg' | 'g' | 'un'
type Medida = 'cm' | 'mm' | 'pol'
type Prazo = 'dias' | 'semanas' | 'meses'

// Select sem borda, encaixado no addon do InputGroup.
const SELECT_EMBUTIDO = '[&_select]:h-6 [&_select]:rounded-md [&_select]:border-0 [&_select]:bg-muted [&_select]:py-0 [&_select]:pr-6 [&_select]:pl-2 [&_select]:text-xs [&_select]:font-medium [&_select]:focus-visible:ring-2 [&_svg]:right-1.5 [&_svg]:size-3.5'

const FATOR_PESO: Record<Peso, number> = { kg: 1000, g: 1, un: 0 }
const FATOR_MEDIDA: Record<Medida, number> = { cm: 10, mm: 1, pol: 25.4 }
const DIAS_PRAZO: Record<Prazo, number> = { dias: 1, semanas: 7, meses: 30 }

const paraNumero = (s: string) => Number(s.replace(/\./g, '').replace(',', '.')) || 0
const fmt = (n: number, casas = 0) => n.toLocaleString('pt-BR', { maximumFractionDigits: casas })

export default function InputGroupSeletorDeUnidade() {
  const [peso, setPeso] = useState('1,25')
  const [unPeso, setUnPeso] = useState<Peso>('kg')
  const [dim, setDim] = useState({ l: '40', a: '30', p: '12' })
  const [unMedida, setUnMedida] = useState<Medida>('cm')
  const [prazo, setPrazo] = useState('3')
  const [unPrazo, setUnPrazo] = useState<Prazo>('semanas')

  const gramas = paraNumero(peso) * FATOR_PESO[unPeso]
  const volumeCm3 = (paraNumero(dim.l) * FATOR_MEDIDA[unMedida] * paraNumero(dim.a) * FATOR_MEDIDA[unMedida] * paraNumero(dim.p) * FATOR_MEDIDA[unMedida]) / 1000
  const entrega = new Date(2026, 9, 12)
  entrega.setDate(entrega.getDate() + paraNumero(prazo) * DIAS_PRAZO[unPrazo])

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Unidade como sufixo</p>
        <Label htmlFor="un-peso">Peso do produto</Label>
        <InputGroup>
          <InputGroupAddon>
            <Weight />
          </InputGroupAddon>
          <InputGroupInput id="un-peso" inputMode="decimal" value={peso} onChange={(e) => setPeso(e.target.value.replace(/[^\d,.]/g, ''))} className="tabular-nums" />
          <InputGroupAddon align="inline-end" className="pr-1.5">
            <NativeSelect size="sm" value={unPeso} onChange={(e) => setUnPeso(e.target.value as Peso)} aria-label="Unidade de peso" className={SELECT_EMBUTIDO}>
              <NativeSelectOption value="kg">kg</NativeSelectOption>
              <NativeSelectOption value="g">g</NativeSelectOption>
              <NativeSelectOption value="un">un</NativeSelectOption>
            </NativeSelect>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-xs text-muted-foreground">{unPeso === 'un' ? 'Vendido por unidade; o frete usa o peso cadastrado no produto.' : `Equivale a ${unPeso === 'kg' ? `${fmt(gramas)} g` : `${fmt(gramas / 1000, 3)} kg`} · frete calculado por peso.`}</p>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Unidade compartilhada entre campos</p>
        <div className="flex items-center justify-between">
          <Label>Dimensões da embalagem</Label>
          <NativeSelect size="sm" value={unMedida} onChange={(e) => setUnMedida(e.target.value as Medida)} aria-label="Unidade de medida">
            <NativeSelectOption value="cm">centímetros</NativeSelectOption>
            <NativeSelectOption value="mm">milímetros</NativeSelectOption>
            <NativeSelectOption value="pol">polegadas</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ['l', 'Largura'],
              ['a', 'Altura'],
              ['p', 'Profund.'],
            ] as const
          ).map(([k, label]) => (
            <div key={k} className="space-y-1">
              <Label htmlFor={`un-${k}`} className="text-xs text-muted-foreground">
                {label}
              </Label>
              <InputGroup>
                <InputGroupInput id={`un-${k}`} inputMode="decimal" value={dim[k]} onChange={(e) => setDim((d) => ({ ...d, [k]: e.target.value.replace(/[^\d,.]/g, '') }))} className="text-right tabular-nums" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="text-xs">{unMedida}</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Box className="size-3.5" /> Volume cúbico: {fmt(volumeCm3, 1)} L
        </p>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Quantidade + período</p>
        <Label htmlFor="un-prazo">Prazo de entrega</Label>
        <div className="flex gap-2">
          <InputGroup className="w-40">
            <InputGroupAddon>
              <CalendarDays />
            </InputGroupAddon>
            <InputGroupInput id="un-prazo" inputMode="numeric" value={prazo} onChange={(e) => setPrazo(e.target.value.replace(/\D/g, '').slice(0, 3))} className="tabular-nums" />
          </InputGroup>
          <NativeSelect value={unPrazo} onChange={(e) => setUnPrazo(e.target.value as Prazo)} aria-label="Unidade do prazo" className="flex-1 [&_select]:w-full">
            <NativeSelectOption value="dias">dias úteis</NativeSelectOption>
            <NativeSelectOption value="semanas">semanas</NativeSelectOption>
            <NativeSelectOption value="meses">meses</NativeSelectOption>
          </NativeSelect>
        </div>
        <p className="text-xs text-muted-foreground">Previsão: {entrega.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}.</p>
      </div>
    </div>
  )
}
