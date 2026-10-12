'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { AlertCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

export default function InputOtpDeSeisDigitos() {
  const [codigo, setCodigo] = useState('')
  const [pin, setPin] = useState('')
  const [errado, setErrado] = useState('482913')
  const [segundos, setSegundos] = useState(42)

  useEffect(() => {
    if (segundos <= 0) return
    const t = setTimeout(() => setSegundos((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [segundos])

  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Seis dígitos com separador">
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-6 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <div className="font-heading font-medium">Confirme seu número</div>
            <div className="mt-1 text-sm text-muted-foreground">Enviamos um código por SMS para (11) 9••••-4321.</div>
          </div>
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={codigo} onChange={setCodigo} aria-label="Código de verificação">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button className="w-full" disabled={codigo.length < 6}>
            Verificar
          </Button>
          <div className="text-xs text-muted-foreground">
            {segundos > 0 ? (
              <>
                Reenviar código em <span className="tabular-nums">0:{String(segundos).padStart(2, '0')}</span>
              </>
            ) : (
              <Button variant="link" size="xs" className="h-auto p-0" onClick={() => setSegundos(42)}>
                Reenviar código
              </Button>
            )}
          </div>
        </div>
      </Demo>

      <div className="grid gap-6 sm:grid-cols-2">
        <Demo title="Quatro dígitos (PIN)">
          <div className="space-y-2">
            <Label htmlFor="otp-pin">PIN de acesso</Label>
            <InputOTP id="otp-pin" maxLength={4} pattern={REGEXP_ONLY_DIGITS} value={pin} onChange={setPin}>
              <InputOTPGroup className="gap-0">
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot key={i} index={i} className="size-10 text-base" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">Usado para confirmar transferências.</p>
          </div>
        </Demo>

        <Demo title="Com erro">
          <div className="space-y-2">
            <Label htmlFor="otp-erro">Código</Label>
            <InputOTP id="otp-erro" maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={errado} onChange={setErrado}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} aria-invalid />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <p className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="size-3.5" /> Código inválido. Você tem mais 2 tentativas.
            </p>
          </div>
        </Demo>
      </div>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
