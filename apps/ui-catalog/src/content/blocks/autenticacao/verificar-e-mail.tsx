'use client'

import { useEffect, useState } from 'react'
import { MailOpen, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const RESEND_SECONDS = 45

export default function VerificarEmail() {
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  return (
    <section className="flex w-full min-h-[560px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border bg-card">
        <div className="relative h-24 bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20">
          <div className="absolute -bottom-7 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-2xl border bg-background shadow-sm">
            <MailOpen className="size-6 text-primary" />
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground ring-2 ring-background">
              1
            </span>
          </div>
        </div>
        <div className="px-8 pt-12 pb-8 text-center">
          <h1 className="text-xl font-semibold tracking-tight">Verifique seu e-mail</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Digite o código de 6 dígitos que enviamos para <span className="font-medium text-foreground">bruno@tecnolar.com.br</span>. Dê uma olhada no spam também.
          </p>
          <div className="mt-6 flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode} aria-label="Código de verificação do e-mail">
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} className="size-12 rounded-lg border text-lg font-medium" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="mt-6 w-full" disabled={code.length < 6}>
            Verificar e-mail
          </Button>
          <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
            {seconds > 0 ? (
              <span>
                Não recebeu? Reenviar em <span className="font-medium tabular-nums text-foreground">0:{String(seconds).padStart(2, '0')}</span>
              </span>
            ) : (
              <button type="button" className="inline-flex items-center gap-1.5 font-medium text-foreground underline underline-offset-4" onClick={() => setSeconds(RESEND_SECONDS)}>
                <RefreshCw className="size-3.5" /> Reenviar código
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
