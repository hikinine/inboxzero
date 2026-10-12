'use client'

import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Bot, Calendar, CreditCard, Database, FileSpreadsheet, Globe, Mail, MessageCircle, Smartphone, Webhook, Zap, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const BARS = [38, 52, 44, 61, 58, 72, 66, 80, 74, 88, 82, 95]
const INTEGRATIONS: Array<{ Icon: LucideIcon; label: string }> = [
  { Icon: Mail, label: 'E-mail' },
  { Icon: MessageCircle, label: 'WhatsApp' },
  { Icon: Calendar, label: 'Agenda' },
  { Icon: CreditCard, label: 'Pagamentos' },
  { Icon: FileSpreadsheet, label: 'Planilhas' },
  { Icon: Webhook, label: 'Webhooks' },
  { Icon: Database, label: 'Banco' },
  { Icon: Smartphone, label: 'SMS' },
  { Icon: Globe, label: 'Site' },
]
const AUTOMATIONS = [
  { label: 'Lead novo → enviar WhatsApp', on: true },
  { label: 'Carrinho abandonado → e-mail em 1h', on: true },
  { label: 'NPS baixo → abrir ticket', on: false },
]
const CHANNELS = [
  { label: 'Instagram', value: 42 },
  { label: 'Google', value: 31 },
  { label: 'Indicação', value: 18 },
]

function Cell({ title, text, className, children }: { title: string; text: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('flex flex-col overflow-hidden rounded-xl border bg-card', className)}>
      <div className="p-6 pb-0">
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
      <div className="relative mt-5 flex-1">{children}</div>
    </div>
  )
}

export default function BentoDeProdutoSaas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Plataforma</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que a sua loja precisa, em um painel só</h2>
          <p className="mt-3 text-muted-foreground">Vendas, atendimento, integrações e automações conversando entre si — sem planilha paralela.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Cell title="Painel em tempo real" text="Receita, pedidos e conversão atualizados a cada minuto." className="md:col-span-2 lg:row-span-2">
            <div className="mx-6 rounded-t-xl border border-b-0 bg-background p-5 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Receita no mês</div>
                  <div className="text-2xl font-semibold tabular-nums">R$ 48.250</div>
                </div>
                <Badge variant="secondary" className="text-emerald-600">
                  <ArrowUpRight data-icon="inline-start" /> +12,4%
                </Badge>
              </div>
              <div className="mt-6 flex h-36 items-end gap-2">
                {BARS.map((h, i) => (
                  <div key={i} className={cn('flex-1 rounded-t-sm', i === BARS.length - 1 ? 'bg-primary' : 'bg-primary/25')} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>1 out</span>
                <span>15 out</span>
                <span>31 out</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4 text-xs">
                {[
                  ['Pedidos', '1.284'],
                  ['Ticket médio', 'R$ 37,60'],
                  ['Conversão', '3,8%'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-muted-foreground">{k}</div>
                    <div className="mt-0.5 font-medium tabular-nums">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Cell>

          <Cell title="Atendimento no chat" text="IA responde e passa para o humano na hora certa.">
            <div className="mx-6 space-y-2 pb-6 text-xs">
              <div className="flex items-end gap-2">
                <Avatar size="sm">
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="rounded-xl rounded-bl-sm bg-muted px-3 py-2">Meu pedido ainda não chegou.</div>
              </div>
              <div className="flex items-end justify-end gap-2">
                <div className="max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">Já localizei: sai hoje da transportadora e chega amanhã até 18h.</div>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-3.5" />
                </span>
              </div>
              <div className="flex items-end gap-2">
                <Avatar size="sm">
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 rounded-xl rounded-bl-sm bg-muted px-3 py-2.5">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
                </div>
              </div>
            </div>
          </Cell>

          <Cell title="Integrações" text="Mais de 120 apps conectados em um clique.">
            <div className="mx-6 mb-6 grid grid-cols-3 gap-2">
              {INTEGRATIONS.map((it) => (
                <div key={it.label} className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border bg-background text-[10px] text-muted-foreground">
                  <it.Icon className="size-4 text-foreground" />
                  {it.label}
                </div>
              ))}
            </div>
          </Cell>

          <Cell title="Automações" text="Gatilho, condição e ação — sem código." className="md:col-span-2">
            <div className="mx-6 mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 font-medium">
                  <Zap className="size-3.5 text-amber-500" /> Pedido pago
                </span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
                <span className="rounded-full border bg-background px-3 py-1.5">Valor &gt; R$ 500?</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
                <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-medium text-primary-foreground">
                  <MessageCircle className="size-3.5" /> Enviar cupom VIP
                </span>
              </div>
              <ul className="mt-4 divide-y rounded-lg border bg-background text-sm">
                {AUTOMATIONS.map((a) => (
                  <li key={a.label} className="flex items-center justify-between px-3 py-2">
                    <span className="truncate">{a.label}</span>
                    <Switch defaultChecked={a.on} aria-label={`Ativar automação: ${a.label}`} />
                  </li>
                ))}
              </ul>
            </div>
          </Cell>

          <Cell title="Relatórios" text="Conversão por canal, sem exportar nada.">
            <div className="mx-6 mb-6 space-y-3">
              {CHANNELS.map((c) => (
                <div key={c.label} className="text-xs">
                  <div className="flex justify-between">
                    <span>{c.label}</span>
                    <span className="font-medium tabular-nums">{c.value}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${c.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  )
}
