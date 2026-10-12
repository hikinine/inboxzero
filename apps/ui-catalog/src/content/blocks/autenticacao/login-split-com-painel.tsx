'use client'

import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, ShieldCheck, Star, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const STATS = [
  { icon: Users, value: '2.400+', label: 'equipes ativas' },
  { icon: Star, value: '4,8/5', label: 'nota média' },
  { icon: ShieldCheck, value: '99,9%', label: 'de uptime' },
] as const

export default function LoginSplitComPainel() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="grid w-full min-h-[680px] lg:grid-cols-[1fr_1.1fr]">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs text-primary-foreground">A</span>
            Acme
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Entre para acompanhar o pipeline de hoje.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="lsp-email">E-mail</Label>
              <Input id="lsp-email" type="email" placeholder="voce@empresa.com" defaultValue="ana@nuvemfit.com.br" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="lsp-senha">Senha</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Esqueci a senha
                </a>
              </div>
              <div className="relative">
                <Input id="lsp-senha" type={showPassword ? 'text' : 'password'} placeholder="••••••••" defaultValue="minhasenha123" className="pr-9" />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <Label className="font-normal">
              <Checkbox defaultChecked /> Manter conectado por 30 dias
            </Label>
            <Button type="submit" className="w-full">
              Entrar <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" /> ou continue com <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Microsoft</Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{' '}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">
              Criar grátis
            </a>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-zinc-950 p-12 text-zinc-50 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="relative flex items-center gap-2 text-sm text-zinc-400">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Todos os sistemas operando
        </div>
        <figure className="relative">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight xl:text-3xl">
            “Trocamos três ferramentas por uma. O time de vendas ganhou seis horas por semana só em follow-up.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-zinc-800 text-zinc-100">RA</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">Rafael Andrade</div>
              <div className="text-xs text-zinc-400">CEO · Loja Integrada Sul</div>
            </div>
          </figcaption>
        </figure>
        <div className="relative grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon className="size-4 text-zinc-500" />
              <div className="mt-2 text-xl font-semibold">{value}</div>
              <div className="text-xs text-zinc-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
