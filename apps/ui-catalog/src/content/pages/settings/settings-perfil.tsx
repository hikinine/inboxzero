'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

const MENU = ['Perfil', 'Conta', 'Notificações', 'Integrações', 'Cobrança', 'Equipe']

export default function SettingsPerfil() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
      <p className="text-sm text-muted-foreground">Gerencie sua conta e as preferências do workspace.</p>
      <Separator className="my-6" />
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <nav className="flex flex-col gap-0.5 text-sm">
          {MENU.map((m, i) => (
            <a key={m} href="#" className={`rounded-md px-3 py-1.5 ${i === 0 ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted/60'}`}>
              {m}
            </a>
          ))}
        </nav>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações pessoais</CardTitle>
              <CardDescription>Visíveis para o seu time.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="n">Nome</Label>
                <Input id="n" defaultValue="Ana Souza" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="e">E-mail</Label>
                <Input id="e" type="email" defaultValue="ana@empresa.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t">Telefone</Label>
                <Input id="t" defaultValue="(11) 99999-0000" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c">Cargo</Label>
                <Input id="c" defaultValue="Head de Vendas" />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button>Salvar</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>Como o produto se comporta para você.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {[
                ['Atribuir conversas automaticamente', 'Entra na fila justa quando online.', true],
                ['Resumo da IA no card', 'Mostra sentimento e próximo passo.', true],
                ['Som de nova mensagem', 'Toca um aviso curto.', false],
              ].map(([t, d, on]) => (
                <div key={String(t)} className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-xs text-muted-foreground">{d}</div>
                  </div>
                  <Switch defaultChecked={Boolean(on)} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle>Zona de perigo</CardTitle>
              <CardDescription>Ações irreversíveis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Excluir minha conta</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
