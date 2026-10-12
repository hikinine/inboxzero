'use client'

import { useState } from 'react'
import { Check, ChevronDown, CircleCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Country {
  code: string
  flag: string
  ddi: string
  name: string
}

const COUNTRIES: Country[] = [
  { code: 'BR', flag: '🇧🇷', ddi: '+55', name: 'Brasil' },
  { code: 'PT', flag: '🇵🇹', ddi: '+351', name: 'Portugal' },
  { code: 'AR', flag: '🇦🇷', ddi: '+54', name: 'Argentina' },
  { code: 'US', flag: '🇺🇸', ddi: '+1', name: 'Estados Unidos' },
  { code: 'ES', flag: '🇪🇸', ddi: '+34', name: 'Espanha' },
]

// BR: (11) 9 9999-9999 · outros países: blocos de 3 dígitos
function formatPhone(digits: string, code: string) {
  if (code !== 'BR') return digits.slice(0, 12).replace(/(\d{3})(?=\d)/g, '$1 ')
  const d = digits.slice(0, 11)
  if (!d.length) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`
}

const onlyDigits = (s: string) => s.replace(/\D/g, '')

export default function PhoneInputPais() {
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [open, setOpen] = useState(false)
  const [digits, setDigits] = useState('11999990000')
  const [nativeCode, setNativeCode] = useState('BR')
  const [nativeDigits, setNativeDigits] = useState('')
  const [invalidDigits, setInvalidDigits] = useState('2198765')
  const complete = country.code === 'BR' ? digits.length === 11 : digits.length >= 8
  const missing = 11 - invalidDigits.length

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com seletor de país</p>
        <Label htmlFor="tel-pais">Telefone</Label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger render={<InputGroupButton variant="ghost" size="xs" aria-label="Escolher país" />}>
                <span className="text-base leading-none">{country.flag}</span>
                <span className="tabular-nums">{country.ddi}</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56 gap-0.5 p-1">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCountry(c)
                      setDigits('')
                      setOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="tabular-nums text-muted-foreground">{c.ddi}</span>
                    {c.code === country.code && <Check className="size-4" />}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
          <InputGroupInput
            id="tel-pais"
            inputMode="tel"
            placeholder={country.code === 'BR' ? '(11) 9 9999-9999' : 'Número'}
            value={formatPhone(digits, country.code)}
            onChange={(e) => setDigits(onlyDigits(e.target.value))}
          />
          {complete && (
            <InputGroupAddon align="inline-end">
              <CircleCheck className="text-emerald-500" />
            </InputGroupAddon>
          )}
        </InputGroup>
        <p className="text-xs text-muted-foreground">Usado para avisos de entrega pelo WhatsApp.</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com select nativo</p>
        <Label htmlFor="tel-nativo">Celular</Label>
        <div className="flex gap-2">
          <NativeSelect value={nativeCode} onChange={(e) => setNativeCode(e.target.value)} aria-label="País" className="shrink-0">
            {COUNTRIES.map((c) => (
              <NativeSelectOption key={c.code} value={c.code}>
                {c.flag} {c.ddi}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <Input
            id="tel-nativo"
            inputMode="tel"
            placeholder={nativeCode === 'BR' ? '(21) 9 8888-7777' : 'Número'}
            value={formatPhone(nativeDigits, nativeCode)}
            onChange={(e) => setNativeDigits(onlyDigits(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com validação</p>
        <Label htmlFor="tel-erro">Telefone comercial</Label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>🇧🇷 +55</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="tel-erro"
            inputMode="tel"
            aria-invalid={missing > 0}
            value={formatPhone(invalidDigits, 'BR')}
            onChange={(e) => setInvalidDigits(onlyDigits(e.target.value))}
          />
        </InputGroup>
        {missing > 0 ? (
          <p className="text-xs text-destructive">
            Número incompleto — {missing === 1 ? 'falta 1 dígito' : `faltam ${missing} dígitos`}.
          </p>
        ) : (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">Número válido.</p>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Desabilitado</p>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>🇵🇹 +351</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput disabled value="912 345 678" readOnly aria-label="Telefone (bloqueado)" />
        </InputGroup>
      </div>
    </div>
  )
}
