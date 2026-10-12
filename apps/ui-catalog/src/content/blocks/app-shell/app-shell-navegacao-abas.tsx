'use client'

import { Bell, LayoutDashboard, Receipt, Repeat, Search, Settings, Users, Wallet } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TABS = [
  { value: 'visao', label: 'Visão geral', Icon: LayoutDashboard },
  { value: 'transacoes', label: 'Transações', Icon: Receipt },
  { value: 'clientes', label: 'Clientes', Icon: Users },
  { value: 'assinaturas', label: 'Assinaturas', Icon: Repeat },
  { value: 'config', label: 'Configurações', Icon: Settings },
]
const STATS = [
  { label: 'Volume processado', value: 'R$ 1,24 mi', hint: '+14% vs. setembro' },
  { label: 'Transações', value: '8.412', hint: '96,8% aprovadas' },
  { label: 'Clientes ativos', value: '1.930', hint: '+128 este mês' },
]
const TX = [
  { id: 'TX-88412', client: 'Ana Souza', method: 'Pix', value: 'R$ 1.290,00', status: 'Aprovada' },
  { id: 'TX-88411', client: 'Kavo Ltda', method: 'Cartão', value: 'R$ 4.780,00', status: 'Aprovada' },
  { id: 'TX-88410', client: 'Bruno Rocha', method: 'Boleto', value: 'R$ 349,90', status: 'Pendente' },
  { id: 'TX-88409', client: 'Lumi Tecnologia', method: 'Cartão', value: 'R$ 2.150,00', status: 'Recusada' },
  { id: 'TX-88408', client: 'Carla Mendes', method: 'Pix', value: 'R$ 89,90', status: 'Aprovada' },
]
const TX_STATUS: Record<string, 'default' | 'outline' | 'destructive'> = { Aprovada: 'default', Pendente: 'outline', Recusada: 'destructive' }
const CLIENTS = [
  { name: 'Ana Souza', initials: 'AS', email: 'ana@exemplo.com.br', total: 'R$ 12.480', since: 'mar/2025' },
  { name: 'Kavo Ltda', initials: 'KL', email: 'financeiro@kavo.com.br', total: 'R$ 58.900', since: 'jan/2024' },
  { name: 'Bruno Rocha', initials: 'BR', email: 'bruno@exemplo.com.br', total: 'R$ 3.210', since: 'ago/2026' },
  { name: 'Lumi Tecnologia', initials: 'LT', email: 'contato@lumi.tec.br', total: 'R$ 27.300', since: 'out/2025' },
]
const PLANS = [
  { name: 'Starter', price: 'R$ 49', active: 412, mrr: 'R$ 20.188' },
  { name: 'Pro', price: 'R$ 149', active: 236, mrr: 'R$ 35.164' },
  { name: 'Business', price: 'R$ 399', active: 58, mrr: 'R$ 23.142' },
]

export default function AppShellNavegacaoAbas() {
  return (
    <Tabs defaultValue="visao" className="min-h-[640px] w-full gap-0 bg-background text-foreground">
      <header className="border-b">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Wallet className="size-4" />
            </span>
            Lumi Pay
          </a>
          <Badge variant="outline" className="hidden sm:inline-flex">Produção</Badge>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Buscar">
              <Search />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notificações">
              <Bell />
            </Button>
            <Avatar size="sm" className="ml-1">
              <AvatarFallback>BR</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <TabsList variant="line" className="h-10 w-full justify-start gap-1 overflow-x-auto rounded-none p-0 px-2 sm:px-4">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="flex-none px-3">
              <t.Icon /> {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <TabsContent value="visao" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <Card key={s.label} size="sm">
                <CardHeader>
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">{s.hint}</CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Últimas transações</CardTitle>
              <CardDescription>Hoje, 12 de outubro</CardDescription>
            </CardHeader>
            <CardContent className="divide-y">
              {TX.slice(0, 3).map((t) => (
                <div key={t.id} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className="w-20 font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span className="flex-1 truncate">{t.client}</span>
                  <span className="hidden text-muted-foreground sm:inline">{t.method}</span>
                  <span className="tabular-nums">{t.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transacoes">
          <Card>
            <CardHeader>
              <CardTitle>Transações</CardTitle>
              <CardDescription>8.412 no mês · 96,8% aprovadas</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-4 text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TX.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="pl-4 font-mono text-xs">{t.id}</TableCell>
                      <TableCell>{t.client}</TableCell>
                      <TableCell className="text-muted-foreground">{t.method}</TableCell>
                      <TableCell>
                        <Badge variant={TX_STATUS[t.status] ?? 'outline'}>{t.status}</Badge>
                      </TableCell>
                      <TableCell className="pr-4 text-right tabular-nums">{t.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>1.930 ativos</CardDescription>
            </CardHeader>
            <CardContent className="divide-y">
              {CLIENTS.map((c) => (
                <div key={c.name} className="flex items-center gap-3 py-3 text-sm">
                  <Avatar>
                    <AvatarFallback>{c.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{c.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{c.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="tabular-nums">{c.total}</div>
                    <div className="text-xs text-muted-foreground">desde {c.since}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assinaturas">
          <div className="grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <Card key={p.name}>
                <CardHeader>
                  <CardDescription>{p.name}</CardDescription>
                  <CardTitle className="text-2xl">
                    {p.price}
                    <span className="text-sm font-normal text-muted-foreground">/mês</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assinantes ativos</span>
                    <span className="tabular-nums">{p.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MRR</span>
                    <span className="tabular-nums">{p.mrr}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Gerenciar plano
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="config">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Dados da empresa</CardTitle>
              <CardDescription>Usados nos recibos e notas fiscais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="empresa">Razão social</Label>
                <Input id="empresa" defaultValue="Lumi Tecnologia Ltda." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email-cobranca">E-mail de cobrança</Label>
                <Input id="email-cobranca" type="email" defaultValue="financeiro@lumi.tec.br" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="recibo">Enviar recibo automaticamente</Label>
                  <p className="text-xs text-muted-foreground">Após cada pagamento aprovado.</p>
                </div>
                <Switch id="recibo" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost" size="sm">
                Cancelar
              </Button>
              <Button size="sm">Salvar alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </main>
    </Tabs>
  )
}
