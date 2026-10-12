'use client'

import { useState } from 'react'
import { CreditCard, Lock, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type Bandeira = 'visa' | 'mastercard' | 'amex' | 'elo' | null

const mascaraNumero = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
const mascaraValidade = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}
function bandeira(numero: string): Bandeira {
  const d = numero.replace(/\D/g, '')
  if (!d) return null
  if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(d)) return 'elo'
  if (d.startsWith('4')) return 'visa'
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'mastercard'
  if (/^3[47]/.test(d)) return 'amex'
  return null
}

function LogoBandeira({ b, className }: { b: Bandeira; className?: string }) {
  if (b === 'visa') return <span className={cn('rounded bg-white px-1 text-[10px] font-black tracking-tight text-blue-700 italic', className)}>VISA</span>
  if (b === 'mastercard')
    return (
      <span className={cn('inline-flex', className)} aria-label="Mastercard">
        <span className="size-3.5 rounded-full bg-red-500" />
        <span className="-ml-1.5 size-3.5 rounded-full bg-amber-400/90" />
      </span>
    )
  if (b === 'amex') return <span className={cn('rounded bg-sky-600 px-1 text-[9px] font-bold text-white', className)}>AMEX</span>
  if (b === 'elo')
    return (
      <span className={cn('inline-flex items-center gap-0.5 rounded bg-black px-1 text-[10px] font-bold text-white', className)}>
        elo <span className="size-1.5 rounded-full bg-amber-400" />
      </span>
    )
  return <CreditCard className={cn('size-4 text-muted-foreground', className)} />
}

export default function FormDeCartao() {
  const [numero, setNumero] = useState('4242 4242 4242 4242')
  const [nome, setNome] = useState('ANA SOUZA')
  const [validade, setValidade] = useState('09/29')
  const [cvv, setCvv] = useState('')
  const b = bandeira(numero)
  const digitos = numero.replace(/\D/g, '')
  const numeroCartao = digitos ? `${'•••• '.repeat(3)}${digitos.slice(-4).padEnd(4, '•')}` : '•••• •••• •••• ••••'

  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid gap-5">
        <div className="relative h-44 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 text-white shadow-lg">
          <div className="absolute -top-16 -right-10 size-48 rounded-full bg-white/5" aria-hidden />
          <div className="absolute -bottom-20 -left-6 size-56 rounded-full bg-white/5" aria-hidden />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="h-7 w-9 rounded-md bg-gradient-to-br from-amber-300 to-amber-500/80" aria-hidden />
              <LogoBandeira b={b} className="text-white" />
            </div>
            <div className="font-mono text-lg tracking-[0.18em] tabular-nums">{numeroCartao}</div>
            <div className="flex items-end justify-between text-xs">
              <div>
                <div className="text-[10px] uppercase text-white/60">Nome</div>
                <div className="font-medium uppercase">{nome || 'NOME NO CARTÃO'}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-white/60">Validade</div>
                <div className="font-medium tabular-nums">{validade || 'MM/AA'}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="card-numero">Número do cartão</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <CreditCard />
                </InputGroupAddon>
                <InputGroupInput id="card-numero" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={numero} onChange={(e) => setNumero(mascaraNumero(e.target.value))} className="font-mono" />
                <InputGroupAddon align="inline-end">
                  <LogoBandeira b={b} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="card-nome">Nome impresso no cartão</FieldLabel>
              <Input id="card-nome" autoComplete="cc-name" placeholder="Como está no cartão" value={nome} onChange={(e) => setNome(e.target.value.toUpperCase())} className="uppercase" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="card-validade">Validade</FieldLabel>
                <Input id="card-validade" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" value={validade} onChange={(e) => setValidade(mascaraValidade(e.target.value))} className="font-mono" />
              </Field>
              <Field>
                <FieldLabel htmlFor="card-cvv">CVV</FieldLabel>
                <InputGroup>
                  <InputGroupInput id="card-cvv" type="password" inputMode="numeric" autoComplete="cc-csc" placeholder={b === 'amex' ? '••••' : '•••'} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, b === 'amex' ? 4 : 3))} className="font-mono" />
                  <InputGroupAddon align="inline-end">
                    <Lock />
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>{b === 'amex' ? '4 dígitos na frente' : '3 dígitos no verso'}</FieldDescription>
              </Field>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="card-salvar" className="flex-col items-start gap-0.5">
                Salvar cartão
                <span className="text-xs font-normal text-muted-foreground">Para as próximas compras, com segurança.</span>
              </Label>
              <Switch id="card-salvar" defaultChecked />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">
          <Lock data-icon="inline-start" /> Pagar R$ 1.290,00
        </Button>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" /> Pagamento criptografado. Não armazenamos o CVV.
        </div>
      </CardFooter>
    </Card>
  )
}
