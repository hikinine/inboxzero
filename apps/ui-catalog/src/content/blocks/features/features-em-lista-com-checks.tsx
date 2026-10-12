'use client'

import { ArrowRight, CircleCheck } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const ITENS = [
  { titulo: 'Metas por vendedor e por produto', texto: 'Veja o ritmo diário e quem precisa de ajuda antes do fim do mês.' },
  { titulo: 'Previsão de fechamento', texto: 'Probabilidade por etapa e por histórico, não por achismo.' },
  { titulo: 'Alertas de risco', texto: 'Negócio parado há 5 dias? O gestor recebe um aviso no WhatsApp.' },
  { titulo: 'Comissões automáticas', texto: 'Regras por plano, produto e meta batida. Sem planilha no fim do mês.' },
  { titulo: 'Ranking da semana', texto: 'Placar na TV da sala. Funciona mais do que parece.' },
  { titulo: 'Exportação em um clique', texto: 'CSV, Google Sheets e Power BI com os filtros que você já usa.' },
]

const METAS = [
  { nome: 'Novos clientes', atual: 'R$ 164 mil', meta: 'de R$ 200 mil', pct: 82, cor: 'bg-emerald-500' },
  { nome: 'Receita recorrente', atual: 'R$ 96 mil', meta: 'de R$ 150 mil', pct: 64, cor: 'bg-sky-500' },
  { nome: 'Retenção', atual: '91%', meta: 'de 95%', pct: 96, cor: 'bg-violet-500' },
]

export default function FeaturesEmListaComChecks() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Gestão comercial</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O gestor enxerga o mês inteiro antes de ele acabar</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Tudo que você montava em planilha na sexta à noite, pronto e atualizado a cada negócio movido.</p>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {ITENS.map((i) => (
              <li key={i.titulo} className="flex gap-3">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                <div>
                  <div className="text-sm font-medium">{i.titulo}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{i.texto}</div>
                </div>
              </li>
            ))}
          </ul>
          <Button className="mt-8">
            Ver o painel do gestor <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="relative isolate">
          <div className="absolute -inset-3 -z-10 rotate-2 rounded-3xl bg-muted" />
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Metas do trimestre</div>
                <div className="text-xs text-muted-foreground">Time comercial · 4º tri</div>
              </div>
              <Badge variant="secondary">No ritmo</Badge>
            </div>
            <ul className="mt-6 space-y-5">
              {METAS.map((m) => (
                <li key={m.nome}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span>{m.nome}</span>
                    <span className="tabular-nums">
                      <strong className="font-medium">{m.atual}</strong> <span className="text-muted-foreground">{m.meta}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div className={`h-full rounded-full ${m.cor}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
              <AvatarGroup>
                {['RC', 'AS', 'BM', 'DL'].map((n) => (
                  <Avatar key={n} size="sm">
                    <AvatarFallback>{n}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span>Atualizado há 2 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
