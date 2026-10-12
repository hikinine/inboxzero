'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Camera, Laptop, Smartphone, Tablet, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Sessao {
  id: number
  Icon: LucideIcon
  dispositivo: string
  local: string
  quando: string
  atual?: boolean
}

const SESSOES: Sessao[] = [
  { id: 1, Icon: Laptop, dispositivo: 'MacBook Pro · Chrome', local: 'São Paulo, SP', quando: 'agora', atual: true },
  { id: 2, Icon: Smartphone, dispositivo: 'iPhone 15 · App Lumi', local: 'São Paulo, SP', quando: 'há 2 h' },
  { id: 3, Icon: Tablet, dispositivo: 'iPad · Safari', local: 'Campinas, SP', quando: 'ontem' },
  { id: 4, Icon: Laptop, dispositivo: 'Windows · Edge', local: 'Rio de Janeiro, RJ', quando: 'há 3 dias' },
]

const NIVEIS = ['', 'Fraca', 'Razoável', 'Boa', 'Forte']
const CORES = ['', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-500']

export default function ConfiguracoesPerfilSenha() {
  const [nova, setNova] = useState('')
  const [sessoes, setSessoes] = useState(SESSOES)
  const forca = nova.length === 0 ? 0 : nova.length < 6 ? 1 : nova.length < 10 ? 2 : /[^a-zA-Z0-9]/.test(nova) ? 4 : 3

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Conta</h2>
          <p className="mt-1 text-muted-foreground">Seu perfil, sua senha e os dispositivos conectados.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Como você aparece para o time e para os clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback className="text-lg">AS</AvatarFallback>
              </Avatar>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Camera data-icon="inline-start" /> Alterar foto
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 data-icon="inline-start" /> Remover
                </Button>
              </div>
            </div>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="cf-nome">Nome</FieldLabel>
                <Input id="cf-nome" defaultValue="Ana" />
              </Field>
              <Field>
                <FieldLabel htmlFor="cf-sobrenome">Sobrenome</FieldLabel>
                <Input id="cf-sobrenome" defaultValue="Souza" />
              </Field>
              <Field>
                <FieldLabel htmlFor="cf-email">
                  E-mail <Badge variant="secondary">Verificado</Badge>
                </FieldLabel>
                <Input id="cf-email" type="email" defaultValue="ana@lumi.com.br" />
              </Field>
              <Field>
                <FieldLabel htmlFor="cf-cargo">Cargo</FieldLabel>
                <Input id="cf-cargo" defaultValue="Head de Vendas" />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end gap-2 border-t">
            <Button variant="ghost">Cancelar</Button>
            <Button>Salvar</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Senha</CardTitle>
            <CardDescription>Use pelo menos 10 caracteres com um símbolo. Você será desconectada dos outros dispositivos.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="cf-atual">Senha atual</FieldLabel>
                <Input id="cf-atual" type="password" autoComplete="current-password" />
              </Field>
              <Field>
                <FieldLabel htmlFor="cf-nova">Nova senha</FieldLabel>
                <Input id="cf-nova" type="password" autoComplete="new-password" value={nova} onChange={(e) => setNova(e.target.value)} />
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className={cn('h-1 flex-1 rounded-full bg-muted transition-colors', forca >= n && CORES[forca])} />
                    ))}
                  </div>
                  <span className="w-16 text-right text-xs text-muted-foreground">{NIVEIS[forca]}</span>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="cf-confirmar">Confirmar nova senha</FieldLabel>
                <Input id="cf-confirmar" type="password" autoComplete="new-password" />
                <FieldDescription>Precisa ser igual à nova senha.</FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-between gap-2 border-t">
            <Button variant="link" size="sm" className="px-0">
              Esqueci minha senha
            </Button>
            <Button disabled={forca < 3}>Atualizar senha</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sessões ativas</CardTitle>
            <CardDescription>Dispositivos conectados à sua conta neste momento.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y rounded-lg border">
              {sessoes.map((s) => (
                <li key={s.id} className="flex items-center gap-3 p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <s.Icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      {s.dispositivo}
                      {s.atual && <Badge variant="secondary">Este dispositivo</Badge>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.local} · {s.quando}
                    </p>
                  </div>
                  {!s.atual && (
                    <Button variant="outline" size="sm" onClick={() => setSessoes((prev) => prev.filter((x) => x.id !== s.id))}>
                      Encerrar
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-end border-t">
            <Button variant="destructive" disabled={sessoes.length <= 1} onClick={() => setSessoes((prev) => prev.filter((x) => x.atual))}>
              Encerrar todas as outras sessões
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
