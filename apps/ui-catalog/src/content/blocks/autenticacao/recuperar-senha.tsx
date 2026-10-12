'use client'

import { useState } from 'react'
import { ArrowLeft, KeyRound, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('ana@nuvemfit.com.br')
  const [sent, setSent] = useState(false)

  return (
    <section className="flex w-full min-h-[560px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
        {sent ? (
          <div className="flex flex-col items-center text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <MailCheck className="size-6" />
            </div>
            <h1 className="mt-4 text-xl font-semibold tracking-tight">Verifique sua caixa de entrada</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviamos um link de redefinição para <span className="font-medium text-foreground">{email || 'seu e-mail'}</span>. Ele expira em 15 minutos.
            </p>
            <Button variant="outline" className="mt-6 w-full" onClick={() => setSent(false)}>
              Não recebi, reenviar
            </Button>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Voltar para o login
            </a>
          </div>
        ) : (
          <>
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
              <KeyRound className="size-6 text-muted-foreground" />
            </div>
            <h1 className="mt-4 text-xl font-semibold tracking-tight">Esqueceu a senha?</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sem problema. Informe seu e-mail e enviamos um link para criar uma nova.</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="rec-email">E-mail</Label>
                <Input id="rec-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@empresa.com" />
              </div>
              <Button type="submit" className="w-full">
                Enviar link de redefinição
              </Button>
            </form>
            <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Voltar para o login
            </a>
          </>
        )}
      </div>
    </section>
  )
}
