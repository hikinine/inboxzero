'use client'

import { Archive, Inbox, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ABAS = [
  { v: 'todas', label: 'Todas' },
  { v: 'abertas', label: 'Abertas' },
  { v: 'andamento', label: 'Em andamento' },
  { v: 'concluidas', label: 'Concluídas' },
]

const TICKETS = [
  { id: '#4821', titulo: 'Erro ao exportar relatório', quem: 'AS', status: 'abertas', prazo: 'hoje' },
  { id: '#4819', titulo: 'Integração com ERP Omie', quem: 'BR', status: 'andamento', prazo: 'amanhã' },
  { id: '#4815', titulo: 'Trocar logo no portal do cliente', quem: 'CM', status: 'concluidas', prazo: 'ontem' },
  { id: '#4812', titulo: 'Webhook duplicando eventos', quem: 'DL', status: 'andamento', prazo: 'sex.' },
  { id: '#4808', titulo: 'Limite de usuários no plano', quem: 'EF', status: 'abertas', prazo: 'seg.' },
]

const contar = (v: string) => (v === 'todas' ? TICKETS.length : TICKETS.filter((t) => t.status === v).length)

const PREENCHIDA = 'rounded-full border-transparent px-3 data-active:bg-primary data-active:text-primary-foreground dark:data-active:border-primary dark:data-active:bg-primary dark:data-active:text-primary-foreground'

export default function TabsPills() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Pills com contadores</p>
        <Tabs defaultValue="todas">
          <TabsList className="h-9 rounded-full p-1">
            {ABAS.map((a) => (
              <TabsTrigger key={a.v} value={a.v} className="rounded-full px-3">
                {a.label}
                <span className="rounded-full bg-muted-foreground/15 px-1.5 text-[10px] tabular-nums">{contar(a.v)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {ABAS.map((a) => (
            <TabsContent key={a.v} value={a.v} className="divide-y rounded-xl border bg-card">
              {TICKETS.filter((t) => a.v === 'todas' || t.status === a.v).map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span className="flex-1 truncate">{t.titulo}</span>
                  <span className="text-xs text-muted-foreground">{t.prazo}</span>
                  <Avatar size="sm">
                    <AvatarFallback>{t.quem}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Preenchida, sem fundo na lista</p>
        <Tabs defaultValue="7d">
          <TabsList className="gap-1 rounded-full bg-transparent p-0">
            {[
              ['24h', 'Últimas 24 h'],
              ['7d', '7 dias'],
              ['30d', '30 dias'],
              ['12m', '12 meses'],
            ].map(([v, l]) => (
              <TabsTrigger key={v} value={v} className={`border border-border ${PREENCHIDA}`}>
                {l}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Pequenas com ícones</p>
        <Tabs defaultValue="inbox">
          <TabsList className="h-7 rounded-full p-0.5">
            <TabsTrigger value="inbox" className="rounded-full px-2.5 text-xs">
              <Inbox data-icon="inline-start" /> Inbox
            </TabsTrigger>
            <TabsTrigger value="favoritas" className="rounded-full px-2.5 text-xs">
              <Star data-icon="inline-start" /> Favoritas
            </TabsTrigger>
            <TabsTrigger value="arquivadas" className="rounded-full px-2.5 text-xs">
              <Archive data-icon="inline-start" /> Arquivadas
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
