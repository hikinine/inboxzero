'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Building2, Check, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 1, title: 'Seus dados', icon: User },
  { id: 2, title: 'Sua empresa', icon: Building2 },
] as const

export default function CadastroEmDuasEtapas() {
  const [step, setStep] = useState<1 | 2>(1)
  const [done, setDone] = useState(false)

  const progress = done ? '100%' : step === 1 ? '45%' : '85%'

  return (
    <section className="flex w-full min-h-[640px] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <ol className="grid grid-cols-2 gap-3">
            {STEPS.map((s) => {
              const Icon = s.icon
              const state = done || step > s.id ? 'done' : step === s.id ? 'current' : 'todo'
              return (
                <li
                  key={s.id}
                  className={cn('flex items-center gap-3 rounded-lg border p-3 transition-colors', state === 'current' && 'border-primary bg-primary/5', state === 'todo' && 'opacity-60')}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full border',
                      state === 'done' && 'border-primary bg-primary text-primary-foreground',
                      state === 'current' && 'border-primary text-primary',
                      state === 'todo' && 'text-muted-foreground',
                    )}
                  >
                    {state === 'done' ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Etapa {s.id} de 2</div>
                    <div className="truncate text-sm font-medium">{s.title}</div>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: progress }} />
          </div>
        </CardHeader>

        <CardContent>
          {done ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Check className="size-6" />
              </div>
              <h2 className="text-lg font-semibold">Conta criada!</h2>
              <p className="max-w-xs text-sm text-muted-foreground">Enviamos um e-mail de confirmação para ana@nuvemfit.com.br. Seu painel já está pronto para usar.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDone(false)
                  setStep(1)
                }}
              >
                Começar de novo
              </Button>
            </div>
          ) : step === 1 ? (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Crie sua conta</h2>
                <p className="text-sm text-muted-foreground">14 dias grátis, sem cartão de crédito.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="cde-nome">Nome</Label>
                  <Input id="cde-nome" placeholder="Ana" defaultValue="Ana" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cde-sobrenome">Sobrenome</Label>
                  <Input id="cde-sobrenome" placeholder="Souza" defaultValue="Souza" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cde-email">E-mail de trabalho</Label>
                <Input id="cde-email" type="email" placeholder="ana@empresa.com" defaultValue="ana@nuvemfit.com.br" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cde-senha">Senha</Label>
                <Input id="cde-senha" type="password" placeholder="mínimo 8 caracteres" />
              </div>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Sobre a empresa</h2>
                <p className="text-sm text-muted-foreground">Usamos isso para montar o painel do seu jeito.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cde-empresa">Nome da empresa</Label>
                <Input id="cde-empresa" placeholder="Nuvem Fit" defaultValue="Nuvem Fit" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cde-cnpj">CNPJ</Label>
                <Input id="cde-cnpj" placeholder="00.000.000/0001-00" defaultValue="12.345.678/0001-90" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="cde-tamanho">Tamanho do time</Label>
                  <NativeSelect id="cde-tamanho" defaultValue="11-50">
                    <NativeSelectOption value="1-10">1 a 10 pessoas</NativeSelectOption>
                    <NativeSelectOption value="11-50">11 a 50 pessoas</NativeSelectOption>
                    <NativeSelectOption value="51-200">51 a 200 pessoas</NativeSelectOption>
                    <NativeSelectOption value="200+">Mais de 200</NativeSelectOption>
                  </NativeSelect>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cde-segmento">Segmento</Label>
                  <NativeSelect id="cde-segmento" defaultValue="saude">
                    <NativeSelectOption value="varejo">Varejo</NativeSelectOption>
                    <NativeSelectOption value="saude">Saúde e bem-estar</NativeSelectOption>
                    <NativeSelectOption value="educacao">Educação</NativeSelectOption>
                    <NativeSelectOption value="servicos">Serviços</NativeSelectOption>
                  </NativeSelect>
                </div>
              </div>
            </form>
          )}
        </CardContent>

        {!done && (
          <CardFooter className="justify-between border-t">
            {step === 1 ? (
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Já tenho conta
              </a>
            ) : (
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft data-icon="inline-start" /> Voltar
              </Button>
            )}
            {step === 1 ? (
              <Button onClick={() => setStep(2)}>
                Continuar <ArrowRight data-icon="inline-end" />
              </Button>
            ) : (
              <Button onClick={() => setDone(true)}>
                Criar conta <Check data-icon="inline-end" />
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </section>
  )
}
