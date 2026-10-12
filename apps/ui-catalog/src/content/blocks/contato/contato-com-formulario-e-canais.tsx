'use client'

import { useState } from 'react'
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'

const CHANNELS = [
  { Icon: Mail, label: 'E-mail', value: 'contato@acme.com.br', hint: 'Resposta em até 1 dia útil' },
  { Icon: Phone, label: 'Telefone', value: '(11) 4002-8922', hint: 'Seg. a sex., 9h às 18h' },
  { Icon: MapPin, label: 'Endereço', value: 'Av. Paulista, 1578 · Bela Vista', hint: 'São Paulo, SP · 01310-200' },
  { Icon: Clock, label: 'Suporte', value: 'Chat 24/7 para clientes', hint: 'Tempo médio de resposta: 4 min' },
]

export default function ContatoComFormularioECanais() {
  const [sent, setSent] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contato</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Fale com a gente</h2>
          <p className="mt-3 text-muted-foreground">Dúvida sobre o produto, proposta comercial ou parceria: escolha o canal que preferir. Quem responde é gente do time, não robô.</p>
          <ul className="mt-10 space-y-6">
            {CHANNELS.map(({ Icon, label, value, hint }) => (
              <li key={label} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 font-medium">{value}</p>
                  <p className="text-sm text-muted-foreground">{hint}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form
          className="rounded-xl border bg-card p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Check className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Mensagem enviada</h3>
              <p className="mt-1 text-sm text-muted-foreground">Respondemos em até 1 dia útil no e-mail informado.</p>
              <Button type="button" variant="outline" className="mt-6" onClick={() => setSent(false)}>
                Enviar outra mensagem
              </Button>
            </div>
          ) : (
            <FieldGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="ct-nome">Nome</FieldLabel>
                  <Input id="ct-nome" placeholder="Ana Souza" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ct-email">E-mail</FieldLabel>
                  <Input id="ct-email" type="email" placeholder="ana@empresa.com.br" required />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="ct-assunto">Assunto</FieldLabel>
                <NativeSelect id="ct-assunto" className="w-full" defaultValue="vendas">
                  <NativeSelectOption value="vendas">Quero conhecer o produto</NativeSelectOption>
                  <NativeSelectOption value="suporte">Preciso de suporte</NativeSelectOption>
                  <NativeSelectOption value="parcerias">Parcerias</NativeSelectOption>
                  <NativeSelectOption value="imprensa">Imprensa</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="ct-mensagem">Mensagem</FieldLabel>
                <Textarea id="ct-mensagem" placeholder="Conte um pouco sobre sua operação: canais, volume de conversas e o que você quer melhorar." className="min-h-28" required />
              </Field>
              <div className="flex items-start gap-2.5">
                <Checkbox id="ct-lgpd" defaultChecked className="mt-0.5" />
                <Label htmlFor="ct-lgpd" className="text-sm font-normal leading-snug text-muted-foreground">
                  Autorizo o uso dos meus dados para responder a esta mensagem, conforme a Política de Privacidade.
                </Label>
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Enviar mensagem <Send data-icon="inline-end" />
              </Button>
            </FieldGroup>
          )}
        </form>
      </div>
    </section>
  )
}
