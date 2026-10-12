'use client'

import { useEffect, useState } from 'react'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { CircleCheck, ClipboardPaste, MessageSquare, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const ESPERA = 30
const MAX_REENVIOS = 3
const SLOT_SOLTO = 'size-10 rounded-lg border text-base first:rounded-l-lg last:rounded-r-lg'

function AnelTimer({ restante }: { restante: number }) {
  const r = 14
  const c = 2 * Math.PI * r
  return (
    <span className="relative inline-flex size-9 items-center justify-center" aria-hidden>
      <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
        <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - restante / ESPERA)} className="text-primary transition-[stroke-dashoffset] duration-1000 ease-linear" />
      </svg>
      <span className="absolute text-[10px] font-medium tabular-nums">{restante}</span>
    </span>
  )
}

export default function InputOtpReenviarETimer() {
  const [codigo, setCodigo] = useState('')
  const [restante, setRestante] = useState(18)
  const [reenvios, setReenvios] = useState(1)
  const [status, setStatus] = useState<'digitando' | 'verificando' | 'ok'>('digitando')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (restante <= 0) return
    const t = setTimeout(() => setRestante((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [restante])

  useEffect(() => {
    if (status !== 'verificando') return
    const t = setTimeout(() => setStatus('ok'), 1400)
    return () => clearTimeout(t)
  }, [status])

  const reenviar = () => {
    if (restante > 0 || reenvios >= MAX_REENVIOS) return
    setReenvios((n) => n + 1)
    setRestante(ESPERA)
    setCodigo('')
    setStatus('digitando')
  }

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Reenvio com anel de contagem e limite</p>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MessageSquare className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">Código enviado por SMS</div>
              <div className="text-xs text-muted-foreground">Para (11) 9••••-4321 · válido por 10 minutos</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={codigo}
              onChange={setCodigo}
              onComplete={() => setStatus('verificando')}
              disabled={status !== 'digitando'}
              aria-label="Código de verificação"
              containerClassName="gap-1.5"
            >
              <InputOTPGroup className="gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} className={cn(SLOT_SOLTO, status === 'ok' && 'border-emerald-500 text-emerald-600 dark:text-emerald-400')} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <div className="flex min-w-0 items-center gap-2 text-sm">
              {status === 'verificando' && (
                <>
                  <Spinner aria-label="Verificando" /> <span className="text-muted-foreground">Verificando…</span>
                </>
              )}
              {status === 'ok' && (
                <>
                  <CircleCheck className="size-4 text-emerald-500" /> <span className="text-emerald-600 dark:text-emerald-400">Confirmado</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
            <div className="flex items-center gap-2.5">
              {restante > 0 ? <AnelTimer restante={restante} /> : <RotateCcw className="size-4 text-muted-foreground" />}
              <div className="text-xs">
                <div className="font-medium">{restante > 0 ? `Reenviar em ${restante}s` : reenvios >= MAX_REENVIOS ? 'Limite de reenvios atingido' : 'Pode reenviar agora'}</div>
                <div className="text-muted-foreground tabular-nums">
                  {reenvios} de {MAX_REENVIOS} reenvios usados
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" disabled={restante > 0 || reenvios >= MAX_REENVIOS} onClick={reenviar}>
              Reenviar código
            </Button>
          </div>
        </div>
        {status === 'ok' && (
          <Button variant="link" size="xs" className="h-auto p-0" onClick={() => { setCodigo(''); setStatus('digitando') }}>
            Reiniciar demonstração
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Código alfanumérico por e-mail, com colar</p>
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-2">
            <Label htmlFor="otp-email">Código do e-mail</Label>
            <InputOTP id="otp-email" maxLength={8} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={email} onChange={(v) => setEmail(v.toUpperCase())}>
              <InputOTPGroup>
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot key={i} index={i} className="font-mono uppercase" />
                ))}
              </InputOTPGroup>
              <span className="px-2 text-muted-foreground">–</span>
              <InputOTPGroup>
                {[4, 5, 6, 7].map((i) => (
                  <InputOTPSlot key={i} index={i} className="font-mono uppercase" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setEmail('K7PQ2M9X')}>
            <ClipboardPaste data-icon="inline-start" /> Colar
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Enviado para a•••@lumi.com.br. Expira em 15 minutos.</p>
      </div>
    </div>
  )
}
