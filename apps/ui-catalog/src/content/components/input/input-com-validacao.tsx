'use client'

import { useState } from 'react'
import { AlertCircle, Check, CheckCircle2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function cpfValido(cpf: string) {
  const d = cpf.replace(/\D/g, '')
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  const dv = (len: number) => {
    let soma = 0
    for (let i = 0; i < len; i++) soma += Number(d[i]) * (len + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10])
}
const mascaraCpf = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
const mascaraTel = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const REGRAS = [
  { label: 'Pelo menos 8 caracteres', ok: (s: string) => s.length >= 8 },
  { label: 'Uma letra maiúscula', ok: (s: string) => /[A-Z]/.test(s) },
  { label: 'Um número', ok: (s: string) => /\d/.test(s) },
  { label: 'Um símbolo', ok: (s: string) => /[^\w\s]/.test(s) },
]
const FORCA = ['', 'Fraca', 'Razoável', 'Boa', 'Forte']
const COR_FORCA = ['', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-600']

export default function InputComValidacao() {
  const [email, setEmail] = useState('ana@lumi')
  const [cpf, setCpf] = useState('529.982.247-25')
  const [tel, setTel] = useState('(11) 9123')
  const [senha, setSenha] = useState('Lumi2026')

  const emailOk = EMAIL.test(email)
  const cpfOk = cpfValido(cpf)
  const telOk = tel.replace(/\D/g, '').length >= 10
  const pontos = REGRAS.filter((r) => r.ok(senha)).length

  return (
    <div className="w-full max-w-md space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="val-email">E-mail</Label>
        <Input id="val-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={email ? !emailOk : undefined} placeholder="voce@empresa.com.br" />
        {email && <Msg ok={emailOk} texto={emailOk ? 'E-mail válido.' : 'Falta o domínio, por exemplo “.com.br”.'} />}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="val-cpf">CPF</Label>
        <Input id="val-cpf" inputMode="numeric" value={cpf} onChange={(e) => setCpf(mascaraCpf(e.target.value))} aria-invalid={cpf.length === 14 ? !cpfOk : undefined} placeholder="000.000.000-00" className="font-mono" />
        {cpf.length === 14 ? <Msg ok={cpfOk} texto={cpfOk ? 'CPF válido.' : 'Dígitos verificadores não conferem.'} /> : cpf ? <p className="text-xs text-muted-foreground">{11 - cpf.replace(/\D/g, '').length} dígitos restantes</p> : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="val-tel">Celular</Label>
        <Input id="val-tel" inputMode="tel" value={tel} onChange={(e) => setTel(mascaraTel(e.target.value))} aria-invalid={tel ? !telOk : undefined} placeholder="(11) 91234-5678" />
        {tel && <Msg ok={telOk} texto={telOk ? 'Vamos enviar o código por WhatsApp.' : 'Informe o DDD e o número completo.'} />}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="val-senha" className="justify-between">
          Senha
          {senha && <span className={cn('text-xs font-normal', pontos >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>{FORCA[pontos]}</span>}
        </Label>
        <Input id="val-senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <div className="grid grid-cols-4 gap-1" aria-hidden>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={cn('h-1 rounded-full bg-muted transition-colors', n <= pontos && COR_FORCA[pontos])} />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1 text-xs">
          {REGRAS.map((r) => {
            const ok = r.ok(senha)
            return (
              <li key={r.label} className={cn('flex items-center gap-1.5', ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>
                {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />} {r.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Msg({ ok, texto }: { ok: boolean; texto: string }) {
  return (
    <p className={cn('flex items-center gap-1.5 text-xs', ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive')}>
      {ok ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />} {texto}
    </p>
  )
}
