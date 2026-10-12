'use client'

import { useState } from 'react'
import { Building2, CircleCheck, Eye, EyeOff, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const digitos = (s: string) => s.replace(/\D/g, '')

function fmtCpf(d: string) {
  let out = d.slice(0, 3)
  if (d.length > 3) out += '.' + d.slice(3, 6)
  if (d.length > 6) out += '.' + d.slice(6, 9)
  if (d.length > 9) out += '-' + d.slice(9, 11)
  return out
}

function fmtCnpj(d: string) {
  let out = d.slice(0, 2)
  if (d.length > 2) out += '.' + d.slice(2, 5)
  if (d.length > 5) out += '.' + d.slice(5, 8)
  if (d.length > 8) out += '/' + d.slice(8, 12)
  if (d.length > 12) out += '-' + d.slice(12, 14)
  return out
}

// Alterna pelo tamanho: até 11 dígitos é CPF, acima vira CNPJ (máx. 14).
const fmtDocumento = (d: string) => (d.length <= 11 ? fmtCpf(d) : fmtCnpj(d.slice(0, 14)))

function cpfValido(d: string) {
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  const dv = (len: number) => {
    let soma = 0
    for (let i = 0; i < len; i++) soma += Number(d[i]) * (len + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10])
}

function cnpjValido(d: string) {
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false
  const calc = (pesos: number[]) => {
    const soma = pesos.reduce((acc, p, i) => acc + Number(d[i]) * p, 0)
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  const dv1 = calc([5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const dv2 = calc([6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return dv1 === Number(d[12]) && dv2 === Number(d[13])
}

export default function InputMascaraCpfCnpj() {
  const [doc, setDoc] = useState('12345678000195')
  const [cnpj, setCnpj] = useState('1234567800019')
  const [oculto, setOculto] = useState(true)

  const tipo = doc.length > 11 ? 'CNPJ' : 'CPF'
  const completo = tipo === 'CPF' ? doc.length === 11 : doc.length === 14
  const valido = tipo === 'CPF' ? cpfValido(doc) : cnpjValido(doc)
  const cnpjCompleto = cnpj.length === 14
  const cnpjOk = cnpjValido(cnpj)

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Um campo só: alterna pelo tamanho</p>
        <Label htmlFor="doc-auto">CPF ou CNPJ</Label>
        <InputGroup>
          <InputGroupAddon>{tipo === 'CPF' ? <User /> : <Building2 />}</InputGroupAddon>
          <InputGroupInput id="doc-auto" inputMode="numeric" value={fmtDocumento(doc)} onChange={(e) => setDoc(digitos(e.target.value).slice(0, 14))} placeholder="000.000.000-00" className="font-mono tabular-nums" aria-invalid={completo ? !valido : undefined} />
          <InputGroupAddon align="inline-end">
            {completo && valido && <CircleCheck className="text-emerald-500" />}
            <Badge variant={tipo === 'CNPJ' ? 'default' : 'secondary'} className="font-mono">
              {tipo}
            </Badge>
          </InputGroupAddon>
        </InputGroup>
        <p className={cn('text-xs', completo && !valido ? 'text-destructive' : 'text-muted-foreground')}>
          {completo ? (valido ? `${tipo} válido.` : `Dígitos verificadores do ${tipo} não conferem.`) : doc.length > 11 ? `Faltam ${14 - doc.length} dígitos do CNPJ` : doc.length === 11 ? 'Continue digitando para informar um CNPJ.' : `${11 - doc.length} dígitos para completar o CPF`}
        </p>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Tipo fixo, com validação</p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="space-y-1.5">
            <Label htmlFor="doc-cnpj">CNPJ da empresa</Label>
            <Input id="doc-cnpj" inputMode="numeric" value={fmtCnpj(cnpj)} onChange={(e) => setCnpj(digitos(e.target.value).slice(0, 14))} placeholder="00.000.000/0000-00" className="font-mono tabular-nums" aria-invalid={cnpjCompleto ? !cnpjOk : undefined} />
            <p className={cn('text-xs', cnpjCompleto && !cnpjOk ? 'text-destructive' : 'text-muted-foreground')}>{cnpjCompleto ? (cnpjOk ? 'CNPJ válido, nota fiscal será emitida para ele.' : 'CNPJ inválido.') : `${14 - cnpj.length} dígitos restantes`}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="doc-cpf-fixo">CPF do responsável</Label>
            <Input id="doc-cpf-fixo" inputMode="numeric" defaultValue="529.982.247-25" readOnly className="w-full font-mono tabular-nums sm:w-40" />
            <p className="text-xs text-muted-foreground">Preenchido pelo cadastro.</p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Mascarado para exibição</p>
        <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2.5">
          <div>
            <div className="text-xs text-muted-foreground">CPF cadastrado</div>
            <div className="font-mono text-sm tabular-nums">{oculto ? '•••.982.247-••' : '529.982.247-25'}</div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setOculto((o) => !o)}>
            {oculto ? <Eye data-icon="inline-start" /> : <EyeOff data-icon="inline-start" />} {oculto ? 'Mostrar' : 'Ocultar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
