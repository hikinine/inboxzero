'use client'

import { Bell, CreditCard, Plug, Shield, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const INTEGRACOES = [
  { nome: 'WhatsApp Business', conectado: true },
  { nome: 'Google Agenda', conectado: true },
  { nome: 'RD Station', conectado: false },
]

const NOTIFS = ['Novo lead atribuído', 'Mensagem sem resposta há 10 min', 'Resumo diário por e-mail']

const PERIODOS = [
  { v: 'semanal', label: 'Semanal', valor: 'R$ 42.300', delta: '+8,2% vs. semana anterior' },
  { v: 'mensal', label: 'Mensal', valor: 'R$ 184.320', delta: '+18,4% vs. mês anterior' },
  { v: 'anual', label: 'Anual', valor: 'R$ 1,9 mi', delta: '+31% vs. ano anterior' },
]

const PAINEL = 'min-h-52 flex-1 space-y-4 border-l pl-5'

export default function TabsVerticais() {
  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Lista à esquerda, variante line</p>
        <Tabs orientation="vertical" defaultValue="perfil" className="gap-4 rounded-xl border bg-card p-4">
          <TabsList variant="line" className="w-44 shrink-0 self-start">
            <TabsTrigger value="perfil">
              <User data-icon="inline-start" /> Perfil
            </TabsTrigger>
            <TabsTrigger value="seguranca">
              <Shield data-icon="inline-start" /> Segurança
            </TabsTrigger>
            <TabsTrigger value="notificacoes">
              <Bell data-icon="inline-start" /> Notificações
            </TabsTrigger>
            <TabsTrigger value="integracoes">
              <Plug data-icon="inline-start" /> Integrações
              <Badge variant="secondary" className="ml-auto">
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="cobranca">
              <CreditCard data-icon="inline-start" /> Cobrança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className={PAINEL}>
            <div>
              <h3 className="text-sm font-medium">Perfil</h3>
              <p className="text-xs text-muted-foreground">Como você aparece para a equipe.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tv-nome">Nome</Label>
                <Input id="tv-nome" defaultValue="Ana Souza" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tv-email">E-mail</Label>
                <Input id="tv-email" type="email" defaultValue="ana@acme.com.br" />
              </div>
            </div>
            <Button size="sm">Salvar</Button>
          </TabsContent>

          <TabsContent value="seguranca" className={PAINEL}>
            <div>
              <h3 className="text-sm font-medium">Segurança</h3>
              <p className="text-xs text-muted-foreground">Proteja o acesso à sua conta.</p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="tv-2fa" className="font-normal">
                Autenticação em dois fatores
              </Label>
              <Switch id="tv-2fa" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span>Sessões ativas em 3 dispositivos</span>
              <Button variant="outline" size="sm">
                Encerrar outras
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notificacoes" className={PAINEL}>
            <div>
              <h3 className="text-sm font-medium">Notificações</h3>
              <p className="text-xs text-muted-foreground">Escolha o que chega até você.</p>
            </div>
            <div className="space-y-3">
              {NOTIFS.map((n, i) => (
                <div key={n} className="flex items-center justify-between">
                  <Label htmlFor={`tv-n-${i}`} className="font-normal">
                    {n}
                  </Label>
                  <Switch id={`tv-n-${i}`} defaultChecked={i < 2} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integracoes" className={PAINEL}>
            <div>
              <h3 className="text-sm font-medium">Integrações</h3>
              <p className="text-xs text-muted-foreground">Apps conectados ao workspace.</p>
            </div>
            <div className="divide-y rounded-lg border">
              {INTEGRACOES.map((i) => (
                <div key={i.nome} className="flex items-center justify-between px-3 py-2">
                  <span>{i.nome}</span>
                  {i.conectado ? (
                    <Badge variant="outline">
                      <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden /> Conectado
                    </Badge>
                  ) : (
                    <Button variant="outline" size="xs">
                      Conectar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cobranca" className={PAINEL}>
            <div>
              <h3 className="text-sm font-medium">Cobrança</h3>
              <p className="text-xs text-muted-foreground">Plano Pro · R$ 149/mês · próxima cobrança em 12/11/2026.</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span>Visa terminando em 4242</span>
              <Button variant="outline" size="sm">
                Trocar cartão
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Lista em cartão, variante padrão</p>
        <Tabs orientation="vertical" defaultValue="mensal" className="gap-4">
          <TabsList className="w-36 shrink-0 self-start">
            {PERIODOS.map((p) => (
              <TabsTrigger key={p.v} value={p.v}>
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {PERIODOS.map((p) => (
            <TabsContent key={p.v} value={p.v} className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Receita {p.label.toLowerCase()}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{p.valor}</p>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{p.delta}</p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
