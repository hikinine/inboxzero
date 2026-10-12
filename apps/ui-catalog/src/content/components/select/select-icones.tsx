'use client'

import type { ReactNode } from 'react'
import { Banknote, DollarSign, Euro } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const STATUS = [
  { value: 'ativo', label: 'Ativo', dot: 'bg-emerald-500' },
  { value: 'pausado', label: 'Pausado', dot: 'bg-amber-500' },
  { value: 'rascunho', label: 'Rascunho', dot: 'bg-muted-foreground/50' },
  { value: 'arquivado', label: 'Arquivado', dot: 'bg-rose-500' },
]

const MOEDAS = [
  { value: 'brl', label: 'Real (BRL)', Icon: Banknote },
  { value: 'usd', label: 'Dólar (USD)', Icon: DollarSign },
  { value: 'eur', label: 'Euro (EUR)', Icon: Euro },
]

const PESSOAS = [
  { value: 'ana', label: 'Ana Souza', ini: 'AS' },
  { value: 'bruno', label: 'Bruno Rocha', ini: 'BR' },
  { value: 'carla', label: 'Carla Mendes', ini: 'CM' },
  { value: 'diego', label: 'Diego Lima', ini: 'DL' },
]

// `items` deixa o SelectValue mostrar o ícone do item selecionado já no primeiro paint.
const STATUS_ITEMS: Record<string, ReactNode> = Object.fromEntries(
  STATUS.map((s) => [
    s.value,
    <>
      <span className={`size-2 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
    </>,
  ]),
)
const MOEDA_ITEMS: Record<string, ReactNode> = Object.fromEntries(
  MOEDAS.map((m) => [
    m.value,
    <>
      <m.Icon className="size-4 text-muted-foreground" />
      {m.label}
    </>,
  ]),
)
const PESSOA_ITEMS: Record<string, ReactNode> = Object.fromEntries(
  PESSOAS.map((p) => [
    p.value,
    <>
      <Avatar size="sm">
        <AvatarFallback>{p.ini}</AvatarFallback>
      </Avatar>
      {p.label}
    </>,
  ]),
)

export default function SelectIcones() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Status com ponto colorido</p>
        <Label htmlFor="sel-status">Status da campanha</Label>
        <Select defaultValue="ativo" items={STATUS_ITEMS}>
          <SelectTrigger id="sel-status" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                <span className={`size-2 self-center rounded-full ${s.dot}`} aria-hidden />
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Moeda com ícone</p>
        <Label htmlFor="sel-moeda">Moeda de cobrança</Label>
        <Select defaultValue="brl" items={MOEDA_ITEMS}>
          <SelectTrigger id="sel-moeda" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MOEDAS.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                <m.Icon className="size-4 self-center text-muted-foreground" />
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Responsável com avatar</p>
        <Label htmlFor="sel-pessoa">Atribuir a</Label>
        <Select defaultValue="carla" items={PESSOA_ITEMS}>
          <SelectTrigger id="sel-pessoa" className="w-full">
            <SelectValue placeholder="Escolha alguém" />
          </SelectTrigger>
          <SelectContent>
            {PESSOAS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                <Avatar size="sm" className="self-center">
                  <AvatarFallback>{p.ini}</AvatarFallback>
                </Avatar>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
