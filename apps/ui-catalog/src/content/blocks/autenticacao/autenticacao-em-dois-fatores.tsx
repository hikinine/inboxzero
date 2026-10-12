'use client'

import { useState } from 'react'
import { MessageSquareText, ShieldCheck, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

type Metodo = 'app' | 'sms'

const METODOS = [
  { id: 'app' as const, icon: Smartphone, title: 'App autenticador', description: 'Google Authenticator, Authy ou 1Password' },
  { id: 'sms' as const, icon: MessageSquareText, title: 'SMS', description: 'Código enviado para +55 (21) 9••••-8810' },
]

export default function AutenticacaoEmDoisFatores() {
  const [metodo, setMetodo] = useState<Metodo>('app')
  const [code, setCode] = useState('')

  return (
    <section className="flex w-full min-h-[640px] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-2">Verificação em duas etapas</CardTitle>
          <CardDescription>Escolha como quer receber o código para confirmar que é você.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={metodo} onValueChange={(v) => setMetodo(v as Metodo)} className="gap-2">
            {METODOS.map((m) => {
              const Icon = m.icon
              const active = metodo === m.id
              return (
                <Label
                  key={m.id}
                  htmlFor={`a2f-${m.id}`}
                  className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-4 leading-snug transition-colors', active ? 'border-primary bg-primary/5' : 'hover:bg-muted/50')}
                >
                  <RadioGroupItem id={`a2f-${m.id}`} value={m.id} className="mt-0.5" />
                  <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                    <Icon className="size-4" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{m.title}</span>
                    <span className="text-xs font-normal text-muted-foreground">{m.description}</span>
                  </span>
                </Label>
              )
            })}
          </RadioGroup>

          <div className="space-y-2">
            <Label>{metodo === 'app' ? 'Código do app' : 'Código recebido por SMS'}</Label>
            <InputOTP maxLength={6} value={code} onChange={setCode} aria-label="Código de 6 dígitos">
              <InputOTPGroup>
                <InputOTPSlot index={0} className="size-10" />
                <InputOTPSlot index={1} className="size-10" />
                <InputOTPSlot index={2} className="size-10" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="size-10" />
                <InputOTPSlot index={4} className="size-10" />
                <InputOTPSlot index={5} className="size-10" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Label className="font-normal">
            <Checkbox /> Confiar neste dispositivo por 30 dias
          </Label>
        </CardContent>
        <CardFooter className="flex-col gap-3 border-t">
          <Button className="w-full" disabled={code.length < 6}>
            Verificar e entrar
          </Button>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Usar um código de backup
          </a>
        </CardFooter>
      </Card>
    </section>
  )
}
