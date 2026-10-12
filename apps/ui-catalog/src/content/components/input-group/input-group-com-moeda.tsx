'use client'

import { useState, type ReactNode } from 'react'
import { Check, Minus, Plus, Tag } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'

const paraNumero = (s: string) => Number(s.replace(/\./g, '').replace(',', '.')) || 0
const formata = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function InputGroupComMoeda() {
  const [valor, setValor] = useState('1.290,00')
  const [desconto, setDesconto] = useState('15')
  const [cupom, setCupom] = useState('FRETE10')
  const [aplicado, setAplicado] = useState(false)
  const [qtd, setQtd] = useState(2)

  return (
    <div className="grid w-full max-w-lg gap-x-6 gap-y-5 sm:grid-cols-2">
      <Campo label="Prefixo de moeda" htmlFor="ig-valor">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>R$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="ig-valor" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} onBlur={() => setValor(formata(paraNumero(valor)))} className="text-right tabular-nums" />
        </InputGroup>
      </Campo>

      <Campo label="Sufixo de porcentagem" htmlFor="ig-desc">
        <InputGroup>
          <InputGroupInput id="ig-desc" inputMode="numeric" value={desconto} onChange={(e) => setDesconto(e.target.value.replace(/\D/g, '').slice(0, 3))} className="text-right tabular-nums" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>%</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-xs text-muted-foreground">Preço final: R$ {formata(paraNumero(valor) * (1 - Number(desconto || 0) / 100))}</p>
      </Campo>

      <Campo label="Prefixo e sufixo de URL" htmlFor="ig-site">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="ig-site" defaultValue="lumi" placeholder="suaempresa" className="px-0" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>.com.br</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Campo>

      <Campo label="Com botão de ação" htmlFor="ig-cupom">
        <InputGroup>
          <InputGroupAddon>
            <Tag />
          </InputGroupAddon>
          <InputGroupInput id="ig-cupom" value={cupom} onChange={(e) => { setCupom(e.target.value.toUpperCase()); setAplicado(false) }} placeholder="CUPOM" className="font-mono uppercase" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs" variant={aplicado ? 'ghost' : 'secondary'} onClick={() => setAplicado(true)} disabled={!cupom}>
              {aplicado ? (
                <>
                  <Check className="text-emerald-500" /> Aplicado
                </>
              ) : (
                'Aplicar'
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Campo>

      <Campo label="Quantidade com passos" htmlFor="ig-qtd">
        <InputGroup className="w-36">
          <InputGroupAddon>
            <InputGroupButton size="icon-xs" aria-label="Diminuir" onClick={() => setQtd((q) => Math.max(1, q - 1))}>
              <Minus />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput id="ig-qtd" inputMode="numeric" value={qtd} onChange={(e) => setQtd(Math.max(1, Number(e.target.value.replace(/\D/g, '')) || 1))} className="text-center tabular-nums" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Aumentar" onClick={() => setQtd((q) => q + 1)}>
              <Plus />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Campo>

      <Campo label="Unidade de medida" htmlFor="ig-peso">
        <InputGroup>
          <InputGroupInput id="ig-peso" inputMode="decimal" defaultValue="12,5" className="text-right tabular-nums" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>kg</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Campo>
    </div>
  )
}

function Campo({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <Label htmlFor={htmlFor} className="sr-only">
        {label}
      </Label>
      {children}
    </div>
  )
}
