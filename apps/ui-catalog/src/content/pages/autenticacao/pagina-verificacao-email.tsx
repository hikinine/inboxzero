'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import { ArrowLeft, ArrowRight, CircleAlert, CircleCheck, Loader, Mail, Pencil, RotateCw, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'

const CODIGO_CERTO = '428913'
const ESPERA = 45

type Estado = 'digitando' | 'verificando' | 'erro' | 'ok'

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ShieldCheck className="size-4" />
      </span>
      Contábil<span className="text-muted-foreground">Fácil</span>
    </a>
  )
}

function Envelope({ ok }: { ok: boolean }) {
  return (
    <div className="relative mx-auto h-28 w-36">
      <svg viewBox="0 0 144 112" className="absolute inset-0 size-full" aria-hidden>
        <rect x="12" y="38" width="120" height="70" rx="10" className="fill-muted stroke-border" strokeWidth="2" />
        <motion.g initial={{ y: 26 }} animate={{ y: ok ? -6 : [26, 4, 8] }} transition={{ duration: ok ? 0.5 : 1.2, ease: 'easeOut' }}>
          <rect x="30" y="18" width="84" height="70" rx="6" className="fill-card stroke-border" strokeWidth="2" />
          <rect x="42" y="32" width="44" height="6" rx="3" className="fill-primary/70" />
          <rect x="42" y="46" width="60" height="4" rx="2" className="fill-muted-foreground/25" />
          <rect x="42" y="56" width="52" height="4" rx="2" className="fill-muted-foreground/25" />
        </motion.g>
        <path d="M12 48 L72 84 L132 48 L132 98 Q132 108 122 108 L22 108 Q12 108 12 98 Z" className="fill-card stroke-border" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 108 L58 74 M132 108 L86 74" className="stroke-border" strokeWidth="2" />
      </svg>
      <AnimatePresence>
        {ok && (
          <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.25 }} className="absolute -top-1 -right-1 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-background">
            <CircleCheck className="size-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function Timer({ restante }: { restante: number }) {
  const c = 2 * Math.PI * 9
  return (
    <svg viewBox="0 0 24 24" className="size-5 -rotate-90" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" className="stroke-muted" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="9" fill="none" className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-linear" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - restante / ESPERA)} />
    </svg>
  )
}

export default function PaginaVerificacaoEmail() {
  const [codigo, setCodigo] = useState('')
  const [estado, setEstado] = useState<Estado>('digitando')
  const [tentativas, setTentativas] = useState(0)
  const [restante, setRestante] = useState(ESPERA)
  const [reenvios, setReenvios] = useState(0)
  const [escopo, animar] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    if (restante <= 0 || estado === 'ok') return
    const t = setTimeout(() => setRestante((r) => r - 1), 1000)
    return () => clearTimeout(t)
  }, [restante, estado])

  useEffect(() => {
    if (estado !== 'verificando') return
    const t = setTimeout(() => {
      if (codigo === CODIGO_CERTO) setEstado('ok')
      else {
        setEstado('erro')
        setTentativas((n) => n + 1)
        if (escopo.current) animar(escopo.current, { x: [0, -10, 10, -6, 6, 0] }, { duration: 0.4 })
      }
    }, 900)
    return () => clearTimeout(t)
  }, [estado, codigo, animar, escopo])

  function onChange(v: string) {
    setCodigo(v)
    if (estado === 'erro') setEstado('digitando')
    if (v.length === 6) setEstado('verificando')
  }

  function reenviar() {
    setRestante(ESPERA)
    setReenvios((n) => n + 1)
    setCodigo('')
    setEstado('digitando')
  }

  const mm = String(Math.floor(restante / 60)).padStart(2, '0')
  const ss = String(restante % 60).padStart(2, '0')

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-foreground">
      <header className="flex h-16 items-center justify-between px-6">
        <Logo />
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
          Precisa de ajuda?
        </a>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-10 shadow-sm sm:px-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent" aria-hidden />
            <div className="relative">
              <Envelope ok={estado === 'ok'} />

              <AnimatePresence mode="wait" initial={false}>
                {estado === 'ok' ? (
                  <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">E-mail confirmado!</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Tudo certo, Marina. Sua conta está ativa e o período de teste de 14 dias já começou.</p>
                    <Button className="mt-8 w-full" size="lg">
                      Ir para o painel <ArrowRight data-icon="inline-end" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="mt-8">
                    <div className="text-center">
                      <h1 className="text-2xl font-semibold tracking-tight">Confira seu e-mail</h1>
                      <p className="mt-2 text-sm text-muted-foreground">Enviamos um código de 6 dígitos para</p>
                      <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium">
                        marina.alves@contabilfacil.com.br
                        <button type="button" aria-label="Alterar e-mail" className="rounded p-0.5 text-muted-foreground hover:text-foreground">
                          <Pencil className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <div ref={escopo} className="mt-8 flex justify-center">
                      <InputOTP maxLength={6} value={codigo} onChange={onChange} disabled={estado === 'verificando'} aria-label="Código de verificação">
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              aria-invalid={estado === 'erro'}
                              className={cn('size-12 rounded-xl border bg-background text-lg font-semibold first:rounded-xl last:rounded-xl sm:size-14', estado === 'verificando' && 'border-primary/40')}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className="mt-3 flex h-5 items-center justify-center text-sm">
                      {estado === 'verificando' && (
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Loader className="size-4 animate-spin" /> Verificando…
                        </span>
                      )}
                      {estado === 'erro' && (
                        <span className="flex items-center gap-1.5 text-destructive">
                          <CircleAlert className="size-4" /> Código incorreto. {Math.max(0, 5 - tentativas)} tentativas restantes.
                        </span>
                      )}
                      {estado === 'digitando' && <span className="text-xs text-muted-foreground">Na demonstração, o código é {CODIGO_CERTO.slice(0, 3)} {CODIGO_CERTO.slice(3)}</span>}
                    </div>

                    <div className="mt-8 rounded-2xl border bg-muted/40 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm">
                          <div className="font-medium">Não recebeu?</div>
                          <div className="text-xs text-muted-foreground">Olhe a pasta de spam ou promoções.</div>
                        </div>
                        {restante > 0 ? (
                          <span className="flex items-center gap-2 text-sm tabular-nums text-muted-foreground" aria-live="polite">
                            <Timer restante={restante} />
                            {mm}:{ss}
                          </span>
                        ) : (
                          <Button size="sm" variant="outline" onClick={reenviar}>
                            <RotateCw data-icon="inline-start" /> Reenviar
                          </Button>
                        )}
                      </div>
                      <AnimatePresence>
                        {reenvios > 0 && restante > ESPERA - 6 && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-xs text-emerald-600 dark:text-emerald-400">
                            <span className="block pt-2">Novo código enviado. O anterior deixou de valer.</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Mail data-icon="inline-start" /> Abrir Gmail
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Mail data-icon="inline-start" /> Abrir Outlook
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <a href="#" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Voltar para o login
          </a>
        </div>
      </main>

      <footer className="flex flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
        <span>© 2026 ContábilFácil Tecnologia Ltda.</span>
        <span className="flex gap-4">
          <a href="#" className="hover:text-foreground">
            Termos
          </a>
          <a href="#" className="hover:text-foreground">
            Privacidade
          </a>
          <a href="#" className="hover:text-foreground">
            Status
          </a>
        </span>
      </footer>
    </div>
  )
}
