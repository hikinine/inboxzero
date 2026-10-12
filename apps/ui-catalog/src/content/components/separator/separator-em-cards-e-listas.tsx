'use client'

import { ArrowUpRight, Mail, MessageSquare, Phone } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const KPIS = [
  ['Receita', 'R$ 184 mil', '+18%'],
  ['Negócios', '48', '+6'],
  ['Conversão', '31%', '+2 pp'],
]

const GRUPOS = [
  {
    dia: 'Hoje',
    itens: [
      { ini: 'AS', nome: 'Ana Souza', acao: 'ligou para Kavo Ltda', Icon: Phone, hora: '09:40' },
      { ini: 'BR', nome: 'Bruno Rocha', acao: 'enviou proposta à Lumi', Icon: Mail, hora: '08:15' },
    ],
  },
  {
    dia: 'Ontem',
    itens: [{ ini: 'CM', nome: 'Carla Mendes', acao: 'respondeu no WhatsApp', Icon: MessageSquare, hora: '17:52' }],
  },
]

export default function SeparatorEmCardsEListas() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Vertical entre métricas</p>
        <div className="flex items-center rounded-xl border bg-card p-4">
          {KPIS.map(([l, v, d], i) => (
            <div key={l} className="flex flex-1 items-center">
              {i > 0 && <Separator orientation="vertical" className="mx-4 h-10 self-center" />}
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">{l}</div>
                <div className="text-lg font-semibold tabular-nums tracking-tight">{v}</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Cabeçalho, conteúdo e rodapé</p>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="text-sm font-medium">Plano Pro</div>
            <span className="text-xs text-muted-foreground">Renova em 12/11</span>
          </div>
          <Separator />
          <div className="space-y-1 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">5 usuários</span>
              <span className="tabular-nums">R$ 149,00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Módulo WhatsApp</span>
              <span className="tabular-nums">R$ 49,00</span>
            </div>
          </div>
          <Separator className="data-horizontal:w-auto mx-4" />
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium">Total mensal</span>
            <span className="text-sm font-semibold tabular-nums">R$ 198,00</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Lista com recuo e divisor de dia</p>
        <div className="rounded-xl border bg-card py-2">
          {GRUPOS.map((g, gi) => (
            <div key={g.dia}>
              {gi > 0 && (
                <div className="flex items-center gap-3 px-4 py-2">
                  <Separator className="flex-1" />
                  <span className="text-[11px] font-medium text-muted-foreground">{g.dia}</span>
                  <Separator className="flex-1" />
                </div>
              )}
              {gi === 0 && <div className="px-4 pb-1 text-[11px] font-medium text-muted-foreground">{g.dia}</div>}
              {g.itens.map((it, i) => (
                <div key={it.nome + it.hora}>
                  {i > 0 && <Separator className="ml-14 w-auto" />}
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar>
                      <AvatarFallback>{it.ini}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium">{it.nome}</span> <span className="text-muted-foreground">{it.acao}</span>
                    </div>
                    <it.Icon className="size-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground tabular-nums">{it.hora}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Ações separadas em linha</p>
        <div className="rounded-xl border bg-card p-4">
          <div className="text-sm font-medium">Kavo Ltda</div>
          <p className="mt-1 text-xs text-muted-foreground">Negociação · R$ 12.500 · fecha em 5 dias</p>
          <div className="mt-3 flex h-7 items-center gap-3 text-sm">
            <Button variant="link" size="xs" className="h-auto p-0">
              Abrir negócio <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Separator orientation="vertical" />
            <Button variant="link" size="xs" className="h-auto p-0 text-muted-foreground">
              Agendar
            </Button>
            <Separator orientation="vertical" />
            <Button variant="link" size="xs" className="h-auto p-0 text-muted-foreground">
              Enviar proposta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
