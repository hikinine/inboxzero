'use client'

import { useState, type ReactNode } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Moeda {
  code: string
  nome: string
  flag: string
  grupo: 'Américas' | 'Europa' | 'Ásia'
  porReal: number
}

const MOEDAS: Moeda[] = [
  { code: 'BRL', nome: 'Real brasileiro', flag: '🇧🇷', grupo: 'Américas', porReal: 1 },
  { code: 'USD', nome: 'Dólar americano', flag: '🇺🇸', grupo: 'Américas', porReal: 0.18 },
  { code: 'ARS', nome: 'Peso argentino', flag: '🇦🇷', grupo: 'Américas', porReal: 185.4 },
  { code: 'MXN', nome: 'Peso mexicano', flag: '🇲🇽', grupo: 'Américas', porReal: 3.42 },
  { code: 'EUR', nome: 'Euro', flag: '🇪🇺', grupo: 'Europa', porReal: 0.165 },
  { code: 'GBP', nome: 'Libra esterlina', flag: '🇬🇧', grupo: 'Europa', porReal: 0.14 },
  { code: 'CHF', nome: 'Franco suíço', flag: '🇨🇭', grupo: 'Europa', porReal: 0.158 },
  { code: 'JPY', nome: 'Iene japonês', flag: '🇯🇵', grupo: 'Ásia', porReal: 27.6 },
  { code: 'CNY', nome: 'Yuan chinês', flag: '🇨🇳', grupo: 'Ásia', porReal: 1.29 },
]
const GRUPOS = ['Américas', 'Europa', 'Ásia'] as const

// `items` faz o SelectValue mostrar bandeira + código já no primeiro paint.
const ITEMS: Record<string, ReactNode> = Object.fromEntries(
  MOEDAS.map((m) => [
    m.code,
    <>
      <span className="text-base leading-none" aria-hidden>
        {m.flag}
      </span>
      <span className="font-medium tabular-nums">{m.code}</span>
      <span className="truncate text-muted-foreground">{m.nome}</span>
    </>,
  ]),
)
const ITEMS_CURTO: Record<string, ReactNode> = Object.fromEntries(
  MOEDAS.map((m) => [
    m.code,
    <>
      <span className="text-base leading-none" aria-hidden>
        {m.flag}
      </span>
      {m.code}
    </>,
  ]),
)

const paraNumero = (s: string) => Number(s.replace(/\./g, '').replace(',', '.')) || 0
const porReal = (code: string) => MOEDAS.find((m) => m.code === code)?.porReal ?? 1

function SeletorMoeda({ id, value, onChange, items, size }: { id?: string; value: string; onChange: (v: string) => void; items: Record<string, ReactNode>; size?: 'sm' | 'default' }) {
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (typeof v === 'string') onChange(v)
      }}
      items={items}
    >
      <SelectTrigger id={id} size={size} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {GRUPOS.map((g, gi) => (
          <div key={g}>
            {gi > 0 && <SelectSeparator />}
            <SelectGroup>
              <SelectLabel>{g}</SelectLabel>
              {MOEDAS.filter((m) => m.grupo === g).map((m) => (
                <SelectItem key={m.code} value={m.code}>
                  <span className="self-center text-base leading-none" aria-hidden>
                    {m.flag}
                  </span>
                  <span className="w-10 font-medium tabular-nums">{m.code}</span>
                  <span className="text-muted-foreground">{m.nome}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </div>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function SelectMoedaComBandeiras() {
  const [de, setDe] = useState('BRL')
  const [para, setPara] = useState('USD')
  const [valor, setValor] = useState('1.290,00')
  const [padrao, setPadrao] = useState('BRL')

  const resultado = (paraNumero(valor) * porReal(para)) / porReal(de)
  const taxa = porReal(para) / porReal(de)

  return (
    <div className="w-full max-w-sm space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Conversor com grupos por região</p>
        <div className="space-y-3 rounded-xl border bg-card p-4">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="moeda-valor">Valor</Label>
              <Input id="moeda-valor" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} className="text-right tabular-nums" />
            </div>
            <div className="w-28 space-y-1.5">
              <Label htmlFor="moeda-de">De</Label>
              <SeletorMoeda id="moeda-de" value={de} onChange={setDe} items={ITEMS_CURTO} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px flex-1 bg-border" />
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Inverter moedas"
              onClick={() => {
                setDe(para)
                setPara(de)
              }}
            >
              <ArrowLeftRight />
            </Button>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="moeda-para">Para</Label>
            <SeletorMoeda id="moeda-para" value={para} onChange={setPara} items={ITEMS} />
          </div>
          <div className="rounded-lg bg-muted/60 px-3 py-2.5">
            <div className="text-xl font-semibold tabular-nums tracking-tight">
              {resultado.toLocaleString('pt-BR', { style: 'currency', currency: para, maximumFractionDigits: para === 'JPY' ? 0 : 2 })}
            </div>
            <div className="text-xs text-muted-foreground tabular-nums">
              1 {de} = {taxa.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} {para} · cotação de referência
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Compacto, para formulário de cobrança</p>
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2">
          <div className="text-sm">
            <div className="font-medium">Moeda padrão</div>
            <div className="text-xs text-muted-foreground">Usada nas propostas e faturas.</div>
          </div>
          <div className="w-28">
            <SeletorMoeda value={padrao} onChange={setPadrao} items={ITEMS_CURTO} size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
