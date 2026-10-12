'use client'

import { Bell, Briefcase, FileText, Inbox, ListTodo, MessageSquare, Settings, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CONVERSAS = [
  { ini: 'CM', nome: 'Carla Mendes', texto: 'Vou alinhar com o financeiro e te retorno.', hora: '09:15', nova: true },
  { ini: 'DL', nome: 'Diego Lima', texto: 'Fechado, segue o contrato assinado.', hora: 'ontem', nova: true },
  { ini: 'EF', nome: 'Eduardo Farias', texto: 'Podemos marcar a demo para quinta?', hora: 'ontem', nova: false },
]
const NEGOCIOS = [
  { nome: 'Kavo — renovação anual', etapa: 'Negociação', valor: 'R$ 12.500' },
  { nome: 'Lumi — implantação CRM', etapa: 'Proposta', valor: 'R$ 24.000' },
  { nome: 'Nuvem Fit — módulo WhatsApp', etapa: 'Fechamento', valor: 'R$ 4.900' },
]
const TAREFAS = [
  { texto: 'Enviar contrato revisado para a Kavo', prazo: 'hoje', atrasada: true },
  { texto: 'Ligar para Nuvem Fit', prazo: 'amanhã', atrasada: false },
]

export default function TabsIconesEBadges() {
  return (
    <div className="w-full max-w-lg space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Variante line com ícones e contadores</p>
        <Tabs defaultValue="conversas">
          <TabsList variant="line" className="w-full justify-start border-b">
            <TabsTrigger value="conversas">
              <MessageSquare data-icon="inline-start" /> Conversas
              <Badge variant="secondary" className="ml-1 h-4 min-w-4 px-1 tabular-nums">
                12
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="negocios">
              <Briefcase data-icon="inline-start" /> Negócios
              <Badge className="ml-1 h-4 px-1.5 text-[10px]">3 novos</Badge>
            </TabsTrigger>
            <TabsTrigger value="tarefas" className="relative">
              <ListTodo data-icon="inline-start" /> Tarefas
              <span className="size-1.5 rounded-full bg-rose-500" aria-label="Há tarefas atrasadas" />
            </TabsTrigger>
            <TabsTrigger value="arquivos">
              <FileText data-icon="inline-start" /> Arquivos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conversas" className="divide-y rounded-xl border bg-card">
            {CONVERSAS.map((c) => (
              <div key={c.nome} className="flex items-center gap-3 px-3 py-2.5">
                <Avatar size="sm">
                  <AvatarFallback>{c.ini}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="flex items-center gap-2">
                    <span className={c.nova ? 'font-medium' : ''}>{c.nome}</span>
                    {c.nova && <span className="size-1.5 rounded-full bg-primary" aria-label="Nova" />}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{c.texto}</div>
                </div>
                <span className="text-xs text-muted-foreground">{c.hora}</span>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="negocios" className="divide-y rounded-xl border bg-card">
            {NEGOCIOS.map((n) => (
              <div key={n.nome} className="flex items-center gap-3 px-3 py-2.5">
                <span className="flex-1 truncate">{n.nome}</span>
                <Badge variant="outline">{n.etapa}</Badge>
                <span className="w-20 text-right text-xs tabular-nums">{n.valor}</span>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="tarefas" className="divide-y rounded-xl border bg-card">
            {TAREFAS.map((t) => (
              <div key={t.texto} className="flex items-center gap-3 px-3 py-2.5">
                <span className="flex-1">{t.texto}</span>
                <span className={`text-xs ${t.atrasada ? 'font-medium text-rose-600 dark:text-rose-400' : 'text-muted-foreground'}`}>{t.prazo}</span>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="arquivos" className="rounded-xl border bg-card px-3 py-8 text-center text-xs text-muted-foreground">
            Nenhum arquivo compartilhado ainda.
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Só ícones, com badge sobreposta</p>
        <Tabs defaultValue="inbox" className="rounded-xl border bg-card p-3">
          <TabsList>
            {[
              { v: 'inbox', Icon: Inbox, label: 'Inbox', n: 4 },
              { v: 'contatos', Icon: Users, label: 'Contatos' },
              { v: 'avisos', Icon: Bell, label: 'Avisos', n: 9 },
              { v: 'config', Icon: Settings, label: 'Configurações' },
            ].map((t) => (
              <TabsTrigger key={t.v} value={t.v} aria-label={t.label} className="relative size-8 px-0">
                <t.Icon />
                {t.n && <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground tabular-nums ring-2 ring-background">{t.n}</span>}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="inbox" className="pt-2 text-xs text-muted-foreground">
            4 conversas aguardando resposta.
          </TabsContent>
          <TabsContent value="contatos" className="pt-2 text-xs text-muted-foreground">
            1.284 contatos · 36 adicionados esta semana.
          </TabsContent>
          <TabsContent value="avisos" className="pt-2 text-xs text-muted-foreground">
            9 avisos novos, 2 sobre negócios parados.
          </TabsContent>
          <TabsContent value="config" className="pt-2 text-xs text-muted-foreground">
            Perfil, equipe, integrações e cobrança.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
