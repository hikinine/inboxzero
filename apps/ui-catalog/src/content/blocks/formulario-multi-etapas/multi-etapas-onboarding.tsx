'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Camera, Check, PartyPopper } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const PASSOS = [
  { titulo: 'Seu perfil', descricao: 'Como o time vai te ver' },
  { titulo: 'Sua empresa', descricao: 'Segmento e tamanho' },
  { titulo: 'Convide o time', descricao: 'Trabalhem juntos desde já' },
]

const TAMANHOS = ['Só eu', '2–10', '11–50', '51–200', '200+']

export default function MultiEtapasOnboarding() {
  const [passo, setPasso] = useState(0)
  const [concluido, setConcluido] = useState(false)
  const [tamanho, setTamanho] = useState('11–50')
  const total = PASSOS.length
  const progresso = concluido ? 100 : Math.round((passo / total) * 100)

  function avancar() {
    if (passo < total - 1) setPasso(passo + 1)
    else setConcluido(true)
  }
  function reiniciar() {
    setConcluido(false)
    setPasso(0)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Bem-vinda ao Lumi</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Vamos configurar sua conta</h2>
          <p className="mt-2 text-muted-foreground">Leva menos de 2 minutos. Você pode mudar tudo depois.</p>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-6">
            <ol className="flex items-center">
              {PASSOS.map((p, i) => {
                const feito = concluido || i < passo
                const atual = !concluido && i === passo
                return (
                  <li key={p.titulo} className={cn('flex items-center gap-3', i < total - 1 && 'flex-1')}>
                    <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors', feito && 'border-primary bg-primary text-primary-foreground', atual && 'border-primary text-primary', !feito && !atual && 'text-muted-foreground')}>
                      {feito ? <Check className="size-4" /> : i + 1}
                    </div>
                    <div className="hidden min-w-0 sm:block">
                      <p className={cn('text-sm font-medium leading-tight', !feito && !atual && 'text-muted-foreground')}>{p.titulo}</p>
                      <p className="text-xs text-muted-foreground">{p.descricao}</p>
                    </div>
                    {i < total - 1 && <div className={cn('mx-3 h-px flex-1 bg-border', feito && 'bg-primary')} />}
                  </li>
                )
              })}
            </ol>
            <Progress value={progresso} className="mt-5" aria-label="Progresso do onboarding" />
          </div>

          <div className="p-6">
            {concluido ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <PartyPopper className="size-7" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Tudo pronto, Ana!</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">O workspace da Lumi Tecnologia está configurado e os convites foram enviados.</p>
                <div className="mt-6 flex gap-2">
                  <Button variant="ghost" onClick={reiniciar}>
                    Refazer
                  </Button>
                  <Button>
                    Ir para o painel <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </div>
            ) : passo === 0 ? (
              <FieldGroup>
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarFallback className="text-lg">AS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1.5">
                    <Button variant="outline" size="sm">
                      <Camera data-icon="inline-start" /> Enviar foto
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG ou PNG, até 2 MB.</p>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="ob-nome">Nome completo</FieldLabel>
                    <Input id="ob-nome" defaultValue="Ana Souza" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="ob-cargo">Cargo</FieldLabel>
                    <Input id="ob-cargo" defaultValue="Head de Vendas" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="ob-telefone">WhatsApp</FieldLabel>
                  <Input id="ob-telefone" type="tel" defaultValue="(11) 98765-4321" />
                  <FieldDescription>Usamos para avisos importantes, nunca para marketing.</FieldDescription>
                </Field>
              </FieldGroup>
            ) : passo === 1 ? (
              <FieldGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="ob-empresa">Nome da empresa</FieldLabel>
                    <Input id="ob-empresa" defaultValue="Lumi Tecnologia" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="ob-segmento">Segmento</FieldLabel>
                    <NativeSelect id="ob-segmento" defaultValue="saas" className="w-full">
                      <NativeSelectOption value="saas">SaaS / Tecnologia</NativeSelectOption>
                      <NativeSelectOption value="servicos">Serviços</NativeSelectOption>
                      <NativeSelectOption value="varejo">Varejo</NativeSelectOption>
                      <NativeSelectOption value="educacao">Educação</NativeSelectOption>
                      <NativeSelectOption value="saude">Saúde</NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </div>
                <FieldSet>
                  <FieldLegend variant="label">Tamanho do time</FieldLegend>
                  <div className="flex flex-wrap gap-2">
                    {TAMANHOS.map((t) => (
                      <button key={t} type="button" onClick={() => setTamanho(t)} aria-pressed={tamanho === t} className={cn('rounded-full border px-3 py-1.5 text-sm transition-colors', tamanho === t ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted')}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <FieldDescription>Ajuda a sugerir o plano certo para vocês.</FieldDescription>
                </FieldSet>
                <Field>
                  <FieldLabel htmlFor="ob-site">Site</FieldLabel>
                  <Input id="ob-site" type="url" placeholder="https://" defaultValue="https://lumi.com.br" />
                </Field>
              </FieldGroup>
            ) : (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="ob-convites">E-mails do time</FieldLabel>
                  <Textarea id="ob-convites" rows={4} defaultValue={'bruno@lumi.com.br\ncarla@lumi.com.br\ndiego@lumi.com.br'} />
                  <FieldDescription>Um por linha ou separados por vírgula. Todos entram como editores.</FieldDescription>
                </Field>
                <Label htmlFor="ob-whats" className="flex items-start gap-3 rounded-lg border p-3 font-normal">
                  <Checkbox id="ob-whats" defaultChecked className="mt-0.5" />
                  <span>
                    <span className="block text-sm font-medium">Também avisar pelo WhatsApp</span>
                    <span className="block text-xs text-muted-foreground">Mandamos uma mensagem curta com o link de acesso.</span>
                  </span>
                </Label>
              </FieldGroup>
            )}
          </div>

          {!concluido && (
            <div className="flex items-center justify-between border-t bg-muted/40 px-6 py-4">
              <Button variant="ghost" onClick={() => setPasso(Math.max(0, passo - 1))} disabled={passo === 0}>
                <ArrowLeft data-icon="inline-start" /> Voltar
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  Passo {passo + 1} de {total}
                </span>
                <Button onClick={avancar}>
                  {passo === total - 1 ? 'Concluir' : 'Continuar'} <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
