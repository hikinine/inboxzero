'use client'

import { useState } from 'react'
import { Eye, EyeOff, Github, Lock, ShieldCheck, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.3-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.3C.5 8.2 0 10.1 0 12s.5 3.8 1.3 5.4l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  )
}

function CofreLogo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className={`flex size-8 items-center justify-center rounded-lg ${dark ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'}`}>
        <Lock className="size-4" />
      </span>
      Cofre
    </a>
  )
}

const STATS: Array<[string, string]> = [
  ['R$ 2,4 bi', 'conciliados em 2026'],
  ['4.000+', 'empresas'],
  ['99,98%', 'de disponibilidade'],
]

function LoginForm() {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col px-6 py-8 sm:px-12">
      <CofreLogo />
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Bem-vindo de volta</h1>
        <p className="mt-2 text-sm text-muted-foreground">Entre para ver o caixa de hoje e o que vence esta semana.</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button variant="outline" type="button">
            <GoogleMark /> Google
          </Button>
          <Button variant="outline" type="button">
            <Github /> GitHub
          </Button>
        </div>
        <div className="relative my-6 text-center text-xs text-muted-foreground">
          <Separator className="absolute inset-x-0 top-1/2 h-px w-full" />
          <span className="relative bg-background px-3">ou com e-mail</span>
        </div>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Field>
            <FieldLabel htmlFor="login-email">E-mail</FieldLabel>
            <Input id="login-email" type="email" placeholder="voce@empresa.com.br" autoComplete="email" />
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="login-senha">Senha</FieldLabel>
              <a href="#" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                Esqueci a senha
              </a>
            </div>
            <InputGroup>
              <InputGroupInput id="login-senha" type={show ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShow((s) => !s)}>
                  {show ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="login-lembrar" defaultChecked />
            <FieldLabel htmlFor="login-lembrar" className="font-normal">
              Manter conectado por 30 dias
            </FieldLabel>
          </Field>
          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem conta?{' '}
          <a href="#" className="font-medium text-foreground underline underline-offset-4">
            Criar conta grátis
          </a>
        </p>
      </div>
      <p className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
        <span>© 2026 Cofre Financeiro</span>
        <a href="#" className="hover:text-foreground">
          Termos
        </a>
        <a href="#" className="hover:text-foreground">
          Privacidade
        </a>
      </p>
    </div>
  )
}

function LoginPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-foreground p-12 text-background lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-emerald-500/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-sky-500/25 blur-3xl" aria-hidden />
      <div className="relative flex items-center justify-between">
        <CofreLogo dark />
        <span className="flex items-center gap-1.5 rounded-full border border-background/20 px-3 py-1 text-xs">
          <ShieldCheck className="size-3.5" /> Dados criptografados
        </span>
      </div>
      <div className="relative max-w-md">
        <h2 className="text-4xl font-semibold leading-tight tracking-tight">Fechamento do mês em 20 minutos, não em 3 dias.</h2>
        <figure className="mt-10 rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur">
          <div className="flex gap-0.5 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-3 text-sm leading-relaxed text-background/90">“Conectei os três bancos, o Cofre categorizou tudo sozinho e pela primeira vez eu soube quanto a empresa tinha em caixa sem abrir planilha.”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-background/20 text-background">RA</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Renata Albuquerque</div>
              <div className="text-xs text-background/60">Sócia · Estúdio Mirante, Recife</div>
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="relative grid grid-cols-3 gap-6">
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div className="text-2xl font-semibold tabular-nums">{n}</div>
            <div className="text-xs text-background/60">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PaginaDeLogin() {
  return (
    <div className="grid w-full min-h-screen bg-background text-foreground lg:grid-cols-2">
      <LoginForm />
      <LoginPanel />
    </div>
  )
}
