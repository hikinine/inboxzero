'use client'

import { ArrowRight, Bot, ChartLine, Check, Inbox, SquareKanban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ABAS = [
  {
    value: 'inbox',
    Icon: Inbox,
    label: 'Inbox',
    titulo: 'Responda tudo de um lugar só',
    texto: 'WhatsApp, Instagram, e-mail e webchat na mesma tela, com o histórico do cliente ao lado da conversa.',
    bullets: ['Fila justa por rodízio ou habilidade', 'Respostas rápidas e notas internas', 'Transferência com contexto'],
  },
  {
    value: 'crm',
    Icon: SquareKanban,
    label: 'CRM',
    titulo: 'Um pipeline por produto, metas por pessoa',
    texto: 'Arraste o negócio de etapa, veja o valor em cada coluna e descubra onde o funil está vazando.',
    bullets: ['Campos personalizados por pipeline', 'Previsão de fechamento', 'Motivos de perda obrigatórios'],
  },
  {
    value: 'automacoes',
    Icon: Bot,
    label: 'Automações',
    titulo: 'Ligue, configure e esqueça',
    texto: 'Modelos prontos para as rotinas que mais consomem o time: boas-vindas, carrinho abandonado e reativação.',
    bullets: ['Editor visual sem código', 'Pausa automática quando o humano responde', 'Relatório de conversão por fluxo'],
  },
  {
    value: 'relatorios',
    Icon: ChartLine,
    label: 'Relatórios',
    titulo: 'Números que o diretor entende',
    texto: 'Painéis prontos por origem, vendedor e produto. Compartilhe por link ou agende o envio toda segunda.',
    bullets: ['Atribuição por campanha', 'Metas versus realizado', 'Exportação para Sheets e Power BI'],
  },
]

const COLUNAS = [
  { nome: 'Novo', cards: [{ nome: 'Studio Pilates Flor', valor: 'R$ 1.290' }, { nome: 'Dr. Henrique Sá', valor: 'R$ 3.400' }] },
  { nome: 'Proposta', cards: [{ nome: 'Clínica Vida', valor: 'R$ 12.400' }, { nome: 'Padaria Dona Nena', valor: 'R$ 3.900' }] },
  { nome: 'Fechado', cards: [{ nome: 'Lumi Tecnologia', valor: 'R$ 28.000' }] },
]

const FLUXOS = [
  { nome: 'Boas-vindas', detalhe: 'WhatsApp · imediato', ativo: true },
  { nome: 'Carrinho abandonado', detalhe: 'WhatsApp · 2h depois', ativo: true },
  { nome: 'Reativação 30 dias', detalhe: 'E-mail · sem compra há 30 dias', ativo: false },
]

export default function FeaturesComAbas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Quatro módulos, um só login</h2>
          <p className="mt-3 text-muted-foreground">Explore cada parte da plataforma. Tudo conversa entre si, sem integração para configurar.</p>
        </div>

        <Tabs defaultValue="inbox" className="mt-10 items-center">
          <TabsList className="h-auto flex-wrap justify-center">
            {ABAS.map((a) => (
              <TabsTrigger key={a.value} value={a.value} className="px-3 py-1.5">
                <a.Icon /> {a.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {ABAS.map((a) => (
            <TabsContent key={a.value} value={a.value} className="mt-8 w-full">
              <div className="grid items-center gap-10 rounded-3xl border bg-card p-6 sm:p-10 lg:grid-cols-2">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <a.Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">{a.titulo}</h3>
                  <p className="mt-3 text-muted-foreground">{a.texto}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {b}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8" variant="outline">
                    Conhecer o {a.label} <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>

                <div className="rounded-2xl bg-muted/50 p-4 sm:p-6">
                  {a.value === 'inbox' && (
                    <div className="overflow-hidden rounded-xl border bg-background">
                      <div className="flex items-center gap-3 border-b px-4 py-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">MC</span>
                        <div className="text-xs">
                          <div className="font-medium">Marina Castro</div>
                          <div className="text-muted-foreground">WhatsApp · atendida por Rafael</div>
                        </div>
                      </div>
                      <div className="space-y-3 p-4 text-sm">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">Oi! Consigo remarcar a consulta para quinta?</div>
                        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">Claro, Marina. Tenho 10h ou 15h30, qual prefere?</div>
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">15h30, por favor!</div>
                      </div>
                      <div className="flex items-center gap-2 border-t px-4 py-3">
                        <div className="h-8 flex-1 rounded-md bg-muted" />
                        <div className="size-8 rounded-md bg-primary" />
                      </div>
                    </div>
                  )}

                  {a.value === 'crm' && (
                    <div className="grid grid-cols-3 gap-3">
                      {COLUNAS.map((c) => (
                        <div key={c.nome} className="rounded-xl border bg-background p-2">
                          <div className="flex items-center justify-between px-1 text-[11px]">
                            <span className="font-medium">{c.nome}</span>
                            <span className="text-muted-foreground">{c.cards.length}</span>
                          </div>
                          <div className="mt-2 space-y-2">
                            {c.cards.map((card) => (
                              <div key={card.nome} className="rounded-lg border bg-card p-2">
                                <div className="truncate text-xs font-medium">{card.nome}</div>
                                <div className="mt-1 text-[11px] tabular-nums text-muted-foreground">{card.valor}</div>
                              </div>
                            ))}
                            <div className="h-6 rounded-lg border border-dashed" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {a.value === 'automacoes' && (
                    <ul className="divide-y overflow-hidden rounded-xl border bg-background">
                      {FLUXOS.map((f) => (
                        <li key={f.nome} className="flex items-center justify-between gap-4 px-4 py-3">
                          <div>
                            <div className="text-sm font-medium">{f.nome}</div>
                            <div className="text-xs text-muted-foreground">{f.detalhe}</div>
                          </div>
                          <Switch defaultChecked={f.ativo} aria-label={`Ativar ${f.nome}`} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {a.value === 'relatorios' && (
                    <div className="rounded-xl border bg-background p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border p-3">
                          <div className="text-xs text-muted-foreground">Receita</div>
                          <div className="text-lg font-semibold tabular-nums">R$ 184 mil</div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-xs text-muted-foreground">Conversão</div>
                          <div className="text-lg font-semibold tabular-nums">31%</div>
                        </div>
                      </div>
                      <svg viewBox="0 0 400 110" className="mt-4 h-24 w-full text-primary">
                        <defs>
                          <linearGradient id="fca-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
                            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0 90 C 40 85, 60 65, 100 68 S 160 45, 200 50 S 260 28, 300 26 S 360 15, 400 8 V 110 H 0 Z" fill="url(#fca-fill)" />
                        <path d="M0 90 C 40 85, 60 65, 100 68 S 160 45, 200 50 S 260 28, 300 26 S 360 15, 400 8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
