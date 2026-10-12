'use client'

import { useState } from 'react'
import { Gift, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const AMOUNTS = [50, 100, 200, 500] as const
const THEMES = [
  { id: 'aurora', label: 'Aurora', className: 'from-violet-600 via-fuchsia-500 to-orange-400' },
  { id: 'oceano', label: 'Oceano', className: 'from-sky-600 via-cyan-500 to-emerald-400' },
  { id: 'noite', label: 'Noite', className: 'from-neutral-700 via-neutral-900 to-black' },
] as const
const MAX_MESSAGE = 140

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function GiftCard() {
  const [amount, setAmount] = useState<number>(100)
  const [custom, setCustom] = useState('')
  const [to, setTo] = useState('Mariana')
  const [from, setFrom] = useState('Rafael')
  const [message, setMessage] = useState('Feliz aniversário! Escolhe o que quiser.')
  const [theme, setTheme] = useState<(typeof THEMES)[number]['id']>('aurora')

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0]
  const total = custom ? Number(custom) || 0 : amount
  const valid = total >= 20 && total <= 2000

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Vale-presente</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Presenteie com liberdade de escolha</h2>
          <p className="mt-3 max-w-md text-muted-foreground">Enviado por e-mail na hora ou na data que você escolher. Válido por 12 meses em toda a loja.</p>

          <div className={cn('relative mt-8 aspect-[1.6] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-xl transition-colors duration-500', current.className)}>
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10" aria-hidden="true" />
            <div className="absolute -bottom-16 left-10 size-48 rounded-full bg-white/10" aria-hidden="true" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium"><Gift className="size-4" /> Vale-presente</span>
                <span className="text-xs opacity-80">Aero Loja</span>
              </div>
              <div>
                <div className="text-4xl font-semibold tabular-nums">{brl(total)}</div>
                <div className="mt-1 text-sm opacity-90">
                  Para {to.trim() || 'alguém especial'}
                  {from.trim() && ` · de ${from.trim()}`}
                </div>
              </div>
              <p className="line-clamp-2 text-xs opacity-80">{message.trim() || 'Sua mensagem aparece aqui.'}</p>
            </div>
          </div>
        </div>

        <form className="rounded-2xl border bg-card p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <div className="text-sm font-medium">Valor</div>
            <ToggleGroup
              variant="outline"
              className="mt-2 flex-wrap"
              aria-label="Valor do vale-presente"
              value={custom ? [] : [String(amount)]}
              onValueChange={(v) => {
                const next = v[0]
                if (typeof next === 'string') {
                  setAmount(Number(next))
                  setCustom('')
                }
              }}
            >
              {AMOUNTS.map((a) => (
                <ToggleGroupItem key={a} value={String(a)} className="min-w-20 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">
                  R$ {a}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <InputGroup className="mt-3 max-w-xs">
              <InputGroupAddon>
                <InputGroupText>R$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput type="number" min={20} max={2000} step={10} placeholder="Outro valor (20 a 2.000)" value={custom} onChange={(e) => setCustom(e.target.value)} aria-label="Outro valor" />
            </InputGroup>
            {!valid && <p className="mt-1.5 text-xs text-destructive">Escolha um valor entre R$ 20 e R$ 2.000.</p>}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="gc-to">Nome de quem recebe</Label>
              <Input id="gc-to" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gc-email">E-mail de quem recebe</Label>
              <Input id="gc-email" type="email" placeholder="nome@exemplo.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gc-from">Seu nome</Label>
              <Input id="gc-from" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gc-date">Data de envio</Label>
              <Input id="gc-date" type="date" defaultValue="2026-10-20" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="gc-msg">Mensagem</Label>
              <span className="text-xs text-muted-foreground tabular-nums">{message.length}/{MAX_MESSAGE}</span>
            </div>
            <Textarea id="gc-msg" rows={3} maxLength={MAX_MESSAGE} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escreva algo carinhoso" />
          </div>

          <div className="mt-5">
            <div className="text-sm font-medium">Tema do cartão</div>
            <div className="mt-2 flex gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Tema ${t.label}`}
                  aria-pressed={theme === t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn('h-10 w-16 rounded-lg bg-gradient-to-br ring-2 ring-offset-2 ring-offset-background transition', t.className, theme === t.id ? 'ring-primary' : 'ring-transparent hover:ring-border')}
                />
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-8 w-full" disabled={!valid}>
            <Mail data-icon="inline-start" /> Comprar vale-presente · {brl(total)}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Sem taxas. O saldo pode ser usado em várias compras.</p>
        </form>
      </div>
    </section>
  )
}
