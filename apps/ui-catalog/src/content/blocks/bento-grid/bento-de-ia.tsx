'use client'

import type { ReactNode } from 'react'
import { BrainCircuit, Database, Gauge, Send, ShieldCheck, Sparkles, Workflow, Zap, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const MODELS = [
  { name: 'Rápido', ctx: '128k', latency: 30, cost: 'R$ 0,02 / 1k tokens' },
  { name: 'Equilibrado', ctx: '200k', latency: 55, cost: 'R$ 0,08 / 1k tokens' },
  { name: 'Raciocínio', ctx: '200k', latency: 90, cost: 'R$ 0,30 / 1k tokens' },
]
const FACTS = ['Prefere contato por WhatsApp', 'Comprou tênis 42 em agosto', 'Pediu nota fiscal em PJ']
const SCORES = [
  { label: 'Precisão', value: 96 },
  { label: 'Tom de voz', value: 91 },
  { label: 'Segurança', value: 99 },
]
const RULES = ['Não inventa prazos de entrega', 'Nunca compartilha dados de outros clientes', 'Escala para humano em reclamações']

function Cell({ Icon, title, text, glow, className, children }: { Icon: LucideIcon; title: string; text: string; glow: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('relative flex flex-col overflow-hidden rounded-xl border bg-card p-6', className)}>
      <div aria-hidden="true" className={cn('pointer-events-none absolute -right-12 -top-12 size-44 rounded-full blur-3xl', glow)} />
      <div className="relative">
        <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4" />
        </span>
        <h3 className="mt-4 font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
      <div className="relative mt-5 flex-1">{children}</div>
    </div>
  )
}

export default function BentoDeIa() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Badge variant="outline">
            <Sparkles data-icon="inline-start" /> IA aplicada
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Um assistente que conhece a sua loja</h2>
          <p className="mt-3 text-muted-foreground">Escolha o modelo, escreva o prompt uma vez e deixe as automações cuidarem do resto — com memória e limites claros.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Cell Icon={BrainCircuit} title="Modelos" text="Troque de modelo por tarefa, sem reescrever nada." glow="bg-violet-500/15" className="lg:col-span-2">
            <ul className="space-y-3">
              {MODELS.map((m) => (
                <li key={m.name} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      {m.name} <Badge variant="secondary">{m.ctx}</Badge>
                    </span>
                    <span className="text-xs text-muted-foreground">{m.cost}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-14">Latência</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <span className="block h-full rounded-full bg-violet-500" style={{ width: `${m.latency}%` }} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Cell>

          <Cell Icon={Sparkles} title="Prompts" text="Variáveis preenchidas com os dados do pedido." glow="bg-sky-500/15">
            <div className="rounded-lg border bg-background p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
              Olá <span className="rounded bg-sky-500/10 px-1 text-sky-600 dark:text-sky-400">{'{{nome}}'}</span>, seu pedido <span className="rounded bg-sky-500/10 px-1 text-sky-600 dark:text-sky-400">{'{{pedido}}'}</span> saiu para entrega e chega até <span className="rounded bg-sky-500/10 px-1 text-sky-600 dark:text-sky-400">{'{{prazo}}'}</span>. Responda com tom <span className="rounded bg-sky-500/10 px-1 text-sky-600 dark:text-sky-400">{'{{tom}}'}</span>.
            </div>
          </Cell>

          <Cell Icon={Workflow} title="Automações" text="Gatilho, decisão da IA e ação." glow="bg-emerald-500/15">
            <ol className="space-y-2 text-xs">
              {[
                { Icon: Zap, label: 'Novo lead no site' },
                { Icon: Sparkles, label: 'IA classifica a intenção' },
                { Icon: Send, label: 'Envia resposta no WhatsApp' },
              ].map((s, i) => (
                <li key={s.label} className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">{i + 1}</span>
                  <s.Icon className="size-3.5 text-emerald-600" />
                  {s.label}
                </li>
              ))}
            </ol>
          </Cell>

          <Cell Icon={Database} title="Memória" text="Contexto do cliente mantido entre conversas." glow="bg-amber-500/15" className="lg:col-span-2">
            <div className="flex items-center gap-6">
              <svg viewBox="0 0 80 80" className="size-24 shrink-0" role="img" aria-label="Contexto usado: 64%">
                <circle cx="40" cy="40" r="32" fill="none" strokeWidth="8" className="stroke-muted" />
                <circle cx="40" cy="40" r="32" fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-amber-500" strokeDasharray={`${0.64 * 2 * Math.PI * 32} ${2 * Math.PI * 32}`} transform="rotate(-90 40 40)" />
                <text x="40" y="44" textAnchor="middle" className="fill-foreground text-sm font-semibold">64%</text>
              </svg>
              <ul className="space-y-2 text-sm">
                {FACTS.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Cell>

          <Cell Icon={Gauge} title="Avaliação" text="Respostas revisadas por amostragem." glow="bg-rose-500/15">
            <div className="text-3xl font-semibold tabular-nums">94%</div>
            <div className="text-xs text-muted-foreground">de respostas aprovadas</div>
            <ul className="mt-3 space-y-2 text-xs">
              {SCORES.map((s) => (
                <li key={s.label}>
                  <div className="flex justify-between">
                    <span>{s.label}</span>
                    <span className="tabular-nums">{s.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-rose-500" style={{ width: `${s.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Cell>

          <Cell Icon={ShieldCheck} title="Guardrails" text="Regras que a IA não ultrapassa." glow="bg-primary/15">
            <ul className="space-y-2 text-sm">
              {RULES.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {r}
                </li>
              ))}
            </ul>
          </Cell>
        </div>
      </div>
    </section>
  )
}
