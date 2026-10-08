'use client'

import { Bell, CreditCard, User } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function TabsSettings() {
  return (
    <Tabs defaultValue="conta" className="w-full max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="conta">
          <User data-icon="inline-start" /> Conta
        </TabsTrigger>
        <TabsTrigger value="notificacoes">
          <Bell data-icon="inline-start" /> Notificações
        </TabsTrigger>
        <TabsTrigger value="cobranca">
          <CreditCard data-icon="inline-start" /> Cobrança
        </TabsTrigger>
      </TabsList>
      <TabsContent value="conta">
        <Card>
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>Dados básicos do seu usuário.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="n">Nome</Label>
              <Input id="n" defaultValue="Ana Souza" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="u">Usuário</Label>
              <Input id="u" defaultValue="@anasouza" />
            </div>
            <Button size="sm">Salvar</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notificacoes">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Escolha o que chega até você.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Novo lead atribuído', 'Mensagem sem resposta há 10 min', 'Resumo diário por e-mail'].map((l, i) => (
              <div key={l} className="flex items-center justify-between text-sm">
                <span>{l}</span>
                <Switch defaultChecked={i < 2} />
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="cobranca">
        <Card>
          <CardHeader>
            <CardTitle>Cobrança</CardTitle>
            <CardDescription>Plano Pro · renova em 12/11/2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span>Visa terminando em 4242</span>
              <Button variant="outline" size="sm">
                Trocar cartão
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive">
              Cancelar assinatura
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
