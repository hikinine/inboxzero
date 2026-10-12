'use client'

import type { ReactNode } from 'react'
import { Bell, CheckCircle2, ChevronRight, MessageSquare, TrendingUp, Users } from 'lucide-react'

const BENEFICIOS = ['Mensagens ilimitadas em todos os canais', 'Automações com IA incluídas', 'Suporte prioritário por WhatsApp', 'Relatórios avançados e exportação']

const PASSOS = [
  { titulo: 'Conecte seu WhatsApp', desc: 'Escaneie o QR code e pronto.' },
  { titulo: 'Importe os contatos', desc: 'CSV, Google Contacts ou integração.' },
  { titulo: 'Crie a primeira automação', desc: 'Use um modelo ou comece do zero.' },
]

const NOTIFICACOES = [
  { titulo: 'Novos leads', desc: 'Aviso a cada lead que entra no funil.', icon: Users, badge: 'E-mail' },
  { titulo: 'Mensagens', desc: 'Quando um cliente responde.', icon: MessageSquare, badge: 'Push' },
  { titulo: 'Resumo semanal', desc: 'Vendas, conversões e pendências.', icon: TrendingUp, badge: 'Segunda, 8h' },
  { titulo: 'Alertas de meta', desc: 'Quando você bate ou fica atrás da meta.', icon: Bell, badge: 'Desligado' },
]

export default function ListaComIcones() {
  return (
    <div className="grid w-full max-w-2xl gap-x-8 gap-y-6 sm:grid-cols-2">
      <Demo title="Com ícones">
        <ul className="space-y-2.5">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Demo>

      <Demo title="Numerada">
        <ol className="space-y-3">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground tabular-nums">{i + 1}</span>
              <div>
                <div className="text-sm font-medium leading-6">{p.titulo}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </Demo>

      <Demo title="Com descrição e divisores">
        <ul className="divide-y rounded-lg border">
          {NOTIFICACOES.map((n) => (
            <li key={n.titulo} className="flex items-center gap-3 px-3 py-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <n.icon className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{n.titulo}</div>
                <div className="truncate text-xs text-muted-foreground">{n.desc}</div>
              </div>
              <span className="text-xs text-muted-foreground">{n.badge}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </Demo>

      <Demo title="Marcadores e sublista">
        <ul className="list-disc space-y-1.5 pl-5 text-sm marker:text-muted-foreground">
          <li>Exportação em CSV respeitando os filtros ativos</li>
          <li>
            Nova aba de atividades no contato
            <ul className="mt-1 list-[circle] space-y-1 pl-5 text-muted-foreground">
              <li>Ligações, reuniões e notas na mesma linha do tempo</li>
              <li>Filtro por responsável</li>
            </ul>
          </li>
          <li>Correção no cálculo de comissão com desconto</li>
          <li>Atalho ⌘K em todas as telas</li>
        </ul>
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
