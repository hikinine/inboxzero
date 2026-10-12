'use client'

import { useState } from 'react'
import { Eye, EyeOff, Hourglass, LogIn } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

export default function ErroDeSessaoExpirada() {
  const [show, setShow] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto min-h-[560px] max-w-5xl overflow-hidden rounded-2xl border bg-background">
        <div className="pointer-events-none absolute inset-0 select-none blur-[2px]" aria-hidden>
          <div className="flex h-12 items-center gap-3 border-b px-4">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="ml-auto size-7 rounded-full" />
          </div>
          <div className="grid grid-cols-[200px_1fr]">
            <div className="space-y-2 border-r p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-7 w-full" />
              ))}
            </div>
            <div className="p-6">
              <Skeleton className="h-6 w-48" />
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
              <Skeleton className="mt-6 h-48 w-full" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-background/60" aria-hidden />

        <div className="relative flex min-h-[560px] items-center justify-center p-6">
          <div className="w-full max-w-sm rounded-2xl border bg-card p-7 shadow-2xl" role="dialog" aria-labelledby="sessao-titulo">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Hourglass className="size-5" />
              </span>
              <div>
                <h1 id="sessao-titulo" className="text-lg font-semibold tracking-tight">
                  Sua sessão expirou
                </h1>
                <p className="text-xs text-muted-foreground">Inativa por 30 minutos</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Por segurança, desconectamos você. Seu rascunho foi salvo — entre de novo para continuar de onde parou.</p>

            <div className="mt-5 flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
              <Avatar>
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Ana Souza</p>
                <p className="truncate text-xs text-muted-foreground">ana@nuvemfit.com.br</p>
              </div>
            </div>

            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <Label htmlFor="sessao-senha">Senha</Label>
                <div className="relative">
                  <Input id="sessao-senha" type={show ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password" className="pr-9" />
                  <button type="button" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShow((v) => !v)} className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground">
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <LogIn data-icon="inline-start" /> Entrar de novo
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Entrar com outra conta
              </a>
              <a href="#" className="hover:text-foreground">
                Esqueci a senha
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
