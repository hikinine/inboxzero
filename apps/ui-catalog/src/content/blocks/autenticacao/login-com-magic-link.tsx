'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Mail, MailCheck, WandSparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginComMagicLink() {
  const [email, setEmail] = useState('ana@nuvemfit.com.br')
  const [sent, setSent] = useState(false)
  const [wait, setWait] = useState(0)

  useEffect(() => {
    if (!sent || wait <= 0) return
    const id = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(id)
  }, [sent, wait])

  const enviar = () => {
    setSent(true)
    setWait(30)
  }

  const iconBox = 'relative flex size-16 items-center justify-center rounded-2xl bg-background shadow-md ring-1 ring-foreground/10'

  return (
    <section className="flex w-full min-h-[560px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:18px_18px] opacity-70" aria-hidden />
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span key="enviado" initial={{ scale: 0.8, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className={iconBox}>
                <MailCheck className="size-7 text-primary" />
              </motion.span>
            ) : (
              <motion.span key="link" initial={{ scale: 0.8, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className={iconBox}>
                <WandSparkles className="size-7 text-primary" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="p-7">
          {sent ? (
            <>
              <h1 className="text-xl font-semibold tracking-tight">Confira seu e-mail</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enviamos um link de acesso para <span className="font-medium text-foreground">{email}</span>. Ele vale por 10 minutos e só funciona neste navegador.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button variant="outline" nativeButton={false} render={<a href="#" />}>
                  Abrir Gmail
                </Button>
                <Button variant="outline" nativeButton={false} render={<a href="#" />}>
                  Abrir Outlook
                </Button>
              </div>
              <Button variant="ghost" className="mt-3 w-full" disabled={wait > 0} onClick={() => setWait(30)}>
                {wait > 0 ? `Reenviar em ${wait}s` : 'Reenviar link'}
              </Button>
              <button type="button" onClick={() => setSent(false)} className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-4" /> Usar outro e-mail
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold tracking-tight">Entrar sem senha</h1>
              <p className="mt-1 text-sm text-muted-foreground">Digite seu e-mail e mandamos um link mágico. Um clique e você está dentro.</p>
              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  enviar()
                }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="ml-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="ml-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@empresa.com.br" className="pl-8" />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  <WandSparkles data-icon="inline-start" /> Enviar link mágico
                </Button>
              </form>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Prefere o jeito clássico?{' '}
                <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Entrar com senha
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
