'use client'

import { useEffect, useState } from 'react'
import { Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

const RESEND_SECONDS = 30

export default function LoginComCodigoOtp() {
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const complete = code.length === 6

  return (
    <section className="flex w-full min-h-[560px] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Smartphone className="size-6" />
          </div>
          <CardTitle>Confirme seu número</CardTitle>
          <CardDescription>
            Enviamos um código de 6 dígitos por SMS para <span className="font-medium text-foreground">+55 (11) 9••••-4321</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <InputOTP maxLength={6} value={code} onChange={setCode} aria-label="Código de verificação">
            <InputOTPGroup>
              <InputOTPSlot index={0} className="size-10 text-base" />
              <InputOTPSlot index={1} className="size-10 text-base" />
              <InputOTPSlot index={2} className="size-10 text-base" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="size-10 text-base" />
              <InputOTPSlot index={4} className="size-10 text-base" />
              <InputOTPSlot index={5} className="size-10 text-base" />
            </InputOTPGroup>
          </InputOTP>
          <Button className="w-full" disabled={!complete}>
            {complete ? 'Entrar' : 'Digite o código'}
          </Button>
          <p className="text-sm text-muted-foreground">
            {seconds > 0 ? (
              <>
                Reenviar código em <span className="font-medium tabular-nums text-foreground">{seconds}s</span>
              </>
            ) : (
              <button type="button" className="font-medium text-foreground underline underline-offset-4" onClick={() => setSeconds(RESEND_SECONDS)}>
                Reenviar código
              </button>
            )}
          </p>
        </CardContent>
        <CardFooter className="justify-center border-t text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Usar outro número
          </a>
        </CardFooter>
      </Card>
    </section>
  )
}
