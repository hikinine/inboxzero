'use client'

import { useState } from 'react'
import { CircleCheck, MessageCircle, Phone, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const DDDS = new Set([11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99])

const PAISES = [
  { code: 'BR', flag: '🇧🇷', ddi: '55' },
  { code: 'PT', flag: '🇵🇹', ddi: '351' },
  { code: 'AR', flag: '🇦🇷', ddi: '54' },
  { code: 'US', flag: '🇺🇸', ddi: '1' },
]

const soDigitos = (s: string) => s.replace(/\D/g, '')

function fmtBr(d: string) {
  const x = d.slice(0, 11)
  if (x.length <= 2) return x
  if (x.length <= 7) return `(${x.slice(0, 2)}) ${x.slice(2)}`
  return `(${x.slice(0, 2)}) ${x.slice(2, 7)}-${x.slice(7)}`
}

interface Erro {
  message: string
}

function validarBr(d: string): Erro[] {
  const erros: Erro[] = []
  if (d.length < 2) return erros
  if (!DDDS.has(Number(d.slice(0, 2)))) erros.push({ message: 'DDD inexistente no Brasil.' })
  if (d.length >= 3 && d[2] !== '9') erros.push({ message: 'Celular precisa começar com 9 depois do DDD.' })
  if (d.length < 11) erros.push({ message: `Faltam ${11 - d.length} dígitos.` })
  return erros
}

export default function PhoneInputComValidacao() {
  const [pais, setPais] = useState('BR')
  const [a, setA] = useState('11912345678')
  const [b, setB] = useState('3198765')
  const [c, setC] = useState('')
  const [enviado, setEnviado] = useState(false)

  const errosA = validarBr(a)
  const okA = a.length === 11 && errosA.length === 0
  const errosB = validarBr(b)
  const okC = c.length === 11 && validarBr(c).length === 0
  const ddi = PAISES.find((p) => p.code === pais)?.ddi ?? '55'

  return (
    <div className="w-full max-w-md space-y-7">
      <Field data-invalid={a.length === 11 && !okA ? true : undefined}>
        <p className="text-xs font-medium text-muted-foreground">Válido, com canal detectado</p>
        <FieldLabel htmlFor="tel-a">Celular</FieldLabel>
        <InputGroup className={cn(okA && 'border-emerald-500/60')}>
          <InputGroupAddon className="pr-0">
            <NativeSelect size="sm" value={pais} onChange={(e) => setPais(e.target.value)} aria-label="País" className="[&_select]:h-6 [&_select]:border-0 [&_select]:bg-transparent [&_select]:py-0 [&_select]:pr-6 [&_select]:pl-1 [&_svg]:right-1.5 [&_svg]:size-3.5">
              {PAISES.map((p) => (
                <NativeSelectOption key={p.code} value={p.code}>
                  {p.flag} +{p.ddi}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </InputGroupAddon>
          <InputGroupInput id="tel-a" inputMode="tel" value={pais === 'BR' ? fmtBr(a) : a} onChange={(e) => setA(soDigitos(e.target.value).slice(0, 12))} aria-invalid={a.length === 11 && !okA} />
          <InputGroupAddon align="inline-end">{okA && <CircleCheck className="text-emerald-500" />}</InputGroupAddon>
        </InputGroup>
        {okA ? (
          <FieldDescription className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-emerald-700 dark:text-emerald-300">
              <MessageCircle /> WhatsApp
            </Badge>
            Este número recebe mensagens no WhatsApp.
          </FieldDescription>
        ) : (
          <FieldError errors={errosA} />
        )}
      </Field>

      <Field data-invalid={errosB.length > 0 ? true : undefined}>
        <p className="text-xs font-medium text-muted-foreground">Inválido, lista de erros</p>
        <FieldLabel htmlFor="tel-b">Telefone comercial</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>🇧🇷 +55</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="tel-b" inputMode="tel" value={fmtBr(b)} onChange={(e) => setB(soDigitos(e.target.value).slice(0, 11))} aria-invalid={errosB.length > 0} />
        </InputGroup>
        <FieldError errors={errosB} />
        {errosB.length === 0 && <FieldDescription>Número válido.</FieldDescription>}
      </Field>

      <div className="space-y-3 rounded-xl border bg-card p-4">
        <p className="text-xs font-medium text-muted-foreground">Envio de código só com número válido</p>
        <Field>
          <FieldLabel htmlFor="tel-c">Seu WhatsApp</FieldLabel>
          <div className="flex gap-2">
            <InputGroup>
              <InputGroupAddon>
                <Phone />
              </InputGroupAddon>
              <InputGroupInput id="tel-c" inputMode="tel" placeholder="(11) 91234-5678" value={fmtBr(c)} onChange={(e) => { setC(soDigitos(e.target.value).slice(0, 11)); setEnviado(false) }} />
            </InputGroup>
            <Button disabled={!okC || enviado} onClick={() => setEnviado(true)} className="shrink-0">
              <Send data-icon="inline-start" /> {enviado ? 'Enviado' : 'Enviar código'}
            </Button>
          </div>
          <FieldDescription className="font-mono text-xs tabular-nums">{c ? `+${ddi} ${c.slice(0, 2)} ${c.slice(2, 7)}${c.length > 7 ? '-' : ''}${c.slice(7)}` : 'Formato internacional aparece aqui.'}</FieldDescription>
        </Field>
        {enviado && <p className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400"><CircleCheck className="size-3.5" /> Código enviado. Vale por 10 minutos.</p>}
      </div>
    </div>
  )
}
