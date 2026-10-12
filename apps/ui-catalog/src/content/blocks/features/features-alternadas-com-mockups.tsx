'use client'

import { Check, Clock3, GitBranch, MessageSquare, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const LINHAS = [
  {
    tipo: 'inbox',
    eyebrow: 'Inbox unificado',
    titulo: 'Todas as conversas, uma fila só',
    texto: 'WhatsApp, Instagram e e-mail chegam na mesma lista, distribuídos por regra ou por rodízio. Ninguém fica sem resposta e ninguém briga por lead.',
    bullets: ['Distribuição automática por equipe', 'SLA por canal com alerta', 'Histórico completo no card do cliente'],
  },
  {
    tipo: 'fluxo',
    eyebrow: 'Automações',
    titulo: 'Fluxos que rodam enquanto você dorme',
    texto: 'Monte gatilho, condição e ação sem código. Carrinho abandonado, follow-up de proposta e reativação já vêm prontos.',
    bullets: ['Editor visual com ramificações', 'Espera por horas, dias ou evento', '40 modelos prontos para começar'],
  },
  {
    tipo: 'relatorio',
    eyebrow: 'Relatórios',
    titulo: 'Saiba de onde vem cada real',
    texto: 'Receita por origem, campanha e vendedor. Descubra qual canal paga a conta e realoque a verba no mesmo dia.',
    bullets: ['Atribuição por primeiro e último toque', 'Comparativo mês a mês', 'Exporta para Google Sheets e Power BI'],
  },
] as const

const CONVERSAS = [
  { ini: 'MC', nome: 'Marina Castro', canal: 'WhatsApp', previa: 'Consigo remarcar para quinta?', hora: '09:12', nova: true },
  { ini: 'JA', nome: 'João Pedro Alves', canal: 'Instagram', previa: 'Qual o valor do plano anual?', hora: '09:04', nova: true },
  { ini: 'RA', nome: 'Renata Assis', canal: 'E-mail', previa: 'Segue o contrato assinado, obrigada!', hora: 'ontem', nova: false },
]

const ORIGENS = [
  { nome: 'Instagram', pct: 42, valor: 'R$ 77,4 mil' },
  { nome: 'Google', pct: 28, valor: 'R$ 51,6 mil' },
  { nome: 'Indicação', pct: 18, valor: 'R$ 33,2 mil' },
  { nome: 'Outros', pct: 12, valor: 'R$ 22,1 mil' },
]

export default function FeaturesAlternadasComMockups() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Feito para o jeito que o time vende</h2>
          <p className="mt-3 text-muted-foreground">Três módulos, um só login. Cada um resolve uma dor real da rotina comercial.</p>
        </div>

        <div className="mt-16 space-y-20">
          {LINHAS.map((l, idx) => (
            <div key={l.tipo} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={idx % 2 === 1 ? 'lg:order-last' : ''}>
                <p className="text-xs font-medium tracking-wider text-primary uppercase">{l.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{l.titulo}</h3>
                <p className="mt-3 text-muted-foreground">{l.texto}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {l.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border bg-muted/30 p-4 sm:p-6">
                {l.tipo === 'inbox' && (
                  <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs">
                      <span className="font-medium">Conversas · Comercial</span>
                      <Badge variant="secondary">2 novas</Badge>
                    </div>
                    <ul className="divide-y">
                      {CONVERSAS.map((c) => (
                        <li key={c.nome} className="flex items-center gap-3 px-4 py-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{c.ini}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-sm font-medium">{c.nome}</span>
                              <span className="rounded-full bg-muted px-1.5 text-[10px] text-muted-foreground">{c.canal}</span>
                            </div>
                            <div className="truncate text-xs text-muted-foreground">{c.previa}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1 text-[11px] text-muted-foreground">
                            {c.hora}
                            {c.nova && <span className="size-2 rounded-full bg-primary" />}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {l.tipo === 'fluxo' && (
                  <div className="space-y-0">
                    <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <Zap className="size-4" />
                      </span>
                      <div>
                        <div className="text-[11px] text-muted-foreground">Gatilho</div>
                        <div className="text-sm font-medium">Lead preencheu o formulário</div>
                      </div>
                    </div>
                    <div className="ml-7 h-6 w-px bg-border" />
                    <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
                        <GitBranch className="size-4" />
                      </span>
                      <div>
                        <div className="text-[11px] text-muted-foreground">Condição</div>
                        <div className="text-sm font-medium">Orçamento acima de R$ 5 mil?</div>
                      </div>
                    </div>
                    <div className="ml-7 h-6 w-px bg-border" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border bg-card p-3">
                        <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Sim</div>
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <MessageSquare className="size-4 text-muted-foreground" /> Avisar Rafael no WhatsApp
                        </div>
                      </div>
                      <div className="rounded-xl border bg-card p-3">
                        <div className="text-[11px] font-medium text-muted-foreground">Não</div>
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <Clock3 className="size-4 text-muted-foreground" /> Esperar 2h e enviar catálogo
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {l.tipo === 'relatorio' && (
                  <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">Receita atribuída · setembro</div>
                        <div className="text-2xl font-semibold tabular-nums">R$ 184,3 mil</div>
                      </div>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+18,4%</span>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {ORIGENS.map((o) => (
                        <li key={o.nome}>
                          <div className="flex justify-between text-xs">
                            <span>{o.nome}</span>
                            <span className="tabular-nums text-muted-foreground">
                              {o.valor} · {o.pct}%
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${o.pct}%` }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
