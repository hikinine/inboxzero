'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { CircleAlert, CircleCheck, Loader, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const so = (s: string, max: number) => s.replace(/\D/g, '').slice(0, max)

function aplicar(d: string, mascara: string) {
  let out = ''
  let i = 0
  for (const ch of mascara) {
    if (i >= d.length) break
    if (ch === '9') out += d[i++]
    else out += ch
  }
  return out
}

function cpfOk(d: string) {
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  const dv = (n: number) => {
    let s = 0
    for (let i = 0; i < n; i++) s += Number(d[i]) * (n + 1 - i)
    const r = (s * 10) % 11
    return r === 10 ? 0 : r
  }
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10])
}

function cnpjOk(d: string) {
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false
  const calc = (p: number[]) => {
    const r = p.reduce((a, w, i) => a + Number(d[i]) * w, 0) % 11
    return r < 2 ? 0 : 11 - r
  }
  return calc([5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(d[12]) && calc([6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(d[13])
}

const brl = (centavos: number) => (centavos / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const CEPS: Record<string, string> = {
  '01310100': 'Av. Paulista — Bela Vista, São Paulo/SP',
  '30130010': 'Praça Sete de Setembro — Centro, Belo Horizonte/MG',
  '80020310': 'Rua XV de Novembro — Centro, Curitiba/PR',
}

type Status = 'vazio' | 'parcial' | 'ok' | 'erro'

function Campo({ id, label, status, mensagem, extra, children }: { id: string; label: string; status: Status; mensagem?: string; extra?: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {extra}
      </div>
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          {status === 'ok' && <CircleCheck className="size-4 text-emerald-500" />}
          {status === 'erro' && <CircleAlert className="size-4 text-destructive" />}
        </span>
      </div>
      <p className={cn('min-h-4 text-xs', status === 'erro' ? 'text-destructive' : status === 'ok' ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>{mensagem}</p>
    </div>
  )
}

const campoCls = (s: Status) =>
  cn('pr-9 font-mono tabular-nums', s === 'ok' && 'border-emerald-500/60 focus-visible:ring-emerald-500/30', s === 'erro' && 'border-destructive/60')

export default function InputsMascaraBrasileira() {
  const [cpf, setCpf] = useState('52998224725')
  const [cnpj, setCnpj] = useState('11222333000180')
  const [cep, setCep] = useState('01310100')
  const [tel, setTel] = useState('1199876')
  const [valor, setValor] = useState(129000)
  const [buscando, setBuscando] = useState(false)
  const [endereco, setEndereco] = useState<string | null>(CEPS['01310100'])

  useEffect(() => {
    if (cep.length !== 8) {
      setEndereco(null)
      return
    }
    setBuscando(true)
    const t = setTimeout(() => {
      setEndereco(CEPS[cep] ?? '')
      setBuscando(false)
    }, 700)
    return () => clearTimeout(t)
  }, [cep])

  const sCpf: Status = !cpf ? 'vazio' : cpf.length < 11 ? 'parcial' : cpfOk(cpf) ? 'ok' : 'erro'
  const sCnpj: Status = !cnpj ? 'vazio' : cnpj.length < 14 ? 'parcial' : cnpjOk(cnpj) ? 'ok' : 'erro'
  const sCep: Status = cep.length < 8 ? (cep ? 'parcial' : 'vazio') : buscando ? 'parcial' : endereco ? 'ok' : 'erro'
  const celular = tel.length > 2 && tel[2] === '9'
  const ddd = Number(tel.slice(0, 2))
  const telCompleto = tel.length === (celular ? 11 : 10)
  const sTel: Status = !tel ? 'vazio' : tel.length >= 2 && (ddd < 11 || ddd > 99) ? 'erro' : telCompleto ? 'ok' : 'parcial'
  const LIMITE = 500000
  const sValor: Status = valor === 0 ? 'vazio' : valor > LIMITE ? 'erro' : 'ok'

  return (
    <div className="w-full max-w-xl rounded-xl border bg-card p-5">
      <div className="mb-4">
        <h3 className="font-semibold">Dados de faturamento</h3>
        <p className="text-sm text-muted-foreground">Máscaras aplicadas enquanto você digita, com validação de dígito verificador.</p>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
        <Campo id="m-cpf" label="CPF" status={sCpf} mensagem={sCpf === 'ok' ? 'CPF válido' : sCpf === 'erro' ? 'Dígito verificador não confere' : 'Somente números'}>
          <Input id="m-cpf" inputMode="numeric" placeholder="000.000.000-00" value={aplicar(cpf, '999.999.999-99')} onChange={(e) => setCpf(so(e.target.value, 11))} className={campoCls(sCpf)} aria-invalid={sCpf === 'erro'} />
        </Campo>
        <Campo id="m-cnpj" label="CNPJ" status={sCnpj} mensagem={sCnpj === 'ok' ? 'CNPJ válido' : sCnpj === 'erro' ? 'CNPJ inválido' : `${cnpj.length}/14 dígitos`}>
          <Input id="m-cnpj" inputMode="numeric" placeholder="00.000.000/0000-00" value={aplicar(cnpj, '99.999.999/9999-99')} onChange={(e) => setCnpj(so(e.target.value, 14))} className={campoCls(sCnpj)} aria-invalid={sCnpj === 'erro'} />
        </Campo>
        <Campo
          id="m-cep"
          label="CEP"
          status={sCep}
          mensagem={buscando ? 'Buscando endereço…' : sCep === 'ok' ? undefined : sCep === 'erro' ? 'CEP não encontrado' : 'Tente 30130-010 ou 80020-310'}
          extra={buscando ? <Loader className="size-3.5 animate-spin text-muted-foreground" /> : null}
        >
          <Input id="m-cep" inputMode="numeric" placeholder="00000-000" value={aplicar(cep, '99999-999')} onChange={(e) => setCep(so(e.target.value, 8))} className={campoCls(sCep)} aria-invalid={sCep === 'erro'} />
        </Campo>
        <Campo
          id="m-tel"
          label="Telefone"
          status={sTel}
          mensagem={sTel === 'erro' ? 'DDD inválido' : sTel === 'ok' ? 'Número completo' : celular ? 'Celular: 11 dígitos com DDD' : 'Fixo: 10 dígitos com DDD'}
          extra={tel.length > 2 ? <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">{celular ? 'Celular' : 'Fixo'}</Badge> : null}
        >
          <Input id="m-tel" inputMode="tel" placeholder="(00) 00000-0000" value={aplicar(tel, celular ? '(99) 99999-9999' : '(99) 9999-9999')} onChange={(e) => setTel(so(e.target.value, 11))} className={campoCls(sTel)} aria-invalid={sTel === 'erro'} />
        </Campo>
        {endereco && (
          <div className="-mt-1 mb-2 flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs sm:col-span-2">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <span>{endereco}</span>
          </div>
        )}
        <div className="sm:col-span-2">
          <Campo id="m-valor" label="Valor do contrato" status={sValor} mensagem={sValor === 'erro' ? `Acima do limite de R$ ${brl(LIMITE)}` : sValor === 'ok' ? `Parcelado em 12x de R$ ${brl(Math.round(valor / 12))}` : 'Digite só os números; os centavos entram sozinhos'}>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">R$</span>
            <Input id="m-valor" inputMode="numeric" value={brl(valor)} onChange={(e) => setValor(Number(so(e.target.value, 10) || '0'))} className={cn(campoCls(sValor), 'pl-9 text-right text-base font-semibold')} aria-invalid={sValor === 'erro'} />
          </Campo>
        </div>
      </div>
    </div>
  )
}
