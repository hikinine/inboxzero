'use client'

import { useMemo, useState } from 'react'
import { Check, Eye, EyeOff, LockKeyhole, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const RULES = [
  { id: 'len', label: 'Pelo menos 8 caracteres', test: (v: string) => v.length >= 8 },
  { id: 'upper', label: 'Uma letra maiúscula', test: (v: string) => /[A-Z]/.test(v) },
  { id: 'num', label: 'Um número', test: (v: string) => /\d/.test(v) },
  { id: 'sym', label: 'Um símbolo (!@#$…)', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const

const LEVELS = [
  { label: 'Digite uma senha', bar: 'bg-muted', text: 'text-muted-foreground' },
  { label: 'Fraca', bar: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  { label: 'Média', bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  { label: 'Boa', bar: 'bg-sky-500', text: 'text-sky-600 dark:text-sky-400' },
  { label: 'Forte', bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
] as const

export default function RedefinirSenhaComForca() {
  const [senha, setSenha] = useState('Clickmax2026')
  const [confirma, setConfirma] = useState('')
  const [show, setShow] = useState(false)

  const passed = useMemo(() => RULES.filter((r) => r.test(senha)).length, [senha])
  const level = LEVELS[passed] ?? LEVELS[0]
  const match = confirma.length > 0 && confirma === senha
  const canSubmit = passed === RULES.length && match

  return (
    <section className="flex w-full min-h-[640px] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <LockKeyhole className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-2">Crie uma nova senha</CardTitle>
          <CardDescription>Ela precisa ser diferente das últimas três que você usou.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="rsf-senha">Nova senha</Label>
            <div className="relative">
              <Input id="rsf-senha" type={show ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} className="pr-9" autoComplete="new-password" />
              <button
                type="button"
                aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                onClick={() => setShow((v) => !v)}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden>
              {RULES.map((r, i) => (
                <div key={r.id} className={cn('h-1.5 rounded-full bg-muted transition-colors duration-300', i < passed && level.bar)} />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Força da senha</span>
              <span className={cn('font-medium', level.text)}>{level.label}</span>
            </div>
          </div>

          <ul className="grid gap-1.5 rounded-lg border bg-muted/40 p-3 text-xs sm:grid-cols-2">
            {RULES.map((r) => {
              const ok = r.test(senha)
              return (
                <li key={r.id} className={cn('flex items-center gap-2', ok ? 'text-foreground' : 'text-muted-foreground')}>
                  <span className={cn('flex size-4 items-center justify-center rounded-full', ok ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground')}>
                    {ok ? <Check className="size-3" /> : <X className="size-3" />}
                  </span>
                  {r.label}
                </li>
              )
            })}
          </ul>

          <div className="space-y-1.5">
            <Label htmlFor="rsf-confirma">Confirmar senha</Label>
            <Input
              id="rsf-confirma"
              type={show ? 'text' : 'password'}
              value={confirma}
              onChange={(e) => setConfirma(e.target.value)}
              placeholder="Repita a nova senha"
              autoComplete="new-password"
              aria-invalid={confirma.length > 0 && !match ? true : undefined}
            />
            {confirma.length > 0 && !match && <p className="text-xs text-destructive">As senhas não coincidem.</p>}
            {match && <p className="text-xs text-emerald-600 dark:text-emerald-400">Senhas conferem.</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3 border-t">
          <Button className="w-full" disabled={!canSubmit}>
            Redefinir senha
          </Button>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Voltar para o login
          </a>
        </CardFooter>
      </Card>
    </section>
  )
}
