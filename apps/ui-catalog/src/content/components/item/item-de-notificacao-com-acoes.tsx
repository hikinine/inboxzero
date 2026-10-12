'use client'

import { useState } from 'react'
import { AtSign, Bell, Check, CheckCheck, MessageSquare, UserPlus, X, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item'
import { cn } from '@/lib/utils'

type Tipo = 'convite' | 'mencao' | 'mensagem'

interface Notificacao {
  id: number
  tipo: Tipo
  ini: string
  titulo: string
  desc: string
  quando: string
  lida: boolean
}

const ICONE: Record<Tipo, LucideIcon> = { convite: UserPlus, mencao: AtSign, mensagem: MessageSquare }

const INICIAL: Notificacao[] = [
  { id: 1, tipo: 'convite', ini: 'BR', titulo: 'Bruno Rocha convidou você', desc: 'Para o projeto “Lançamento Pulse” como editora.', quando: 'há 5 min', lida: false },
  { id: 2, tipo: 'mencao', ini: 'CM', titulo: 'Carla Mendes mencionou você', desc: '“@ana consegue revisar a proposta da Kavo até sexta?”', quando: 'há 40 min', lida: false },
  { id: 3, tipo: 'mensagem', ini: 'DL', titulo: 'Diego Lima respondeu', desc: 'No negócio Nuvem Fit — “Fechado, segue o contrato.”', quando: 'ontem, 17:20', lida: true },
]

export default function ItemDeNotificacaoComAcoes() {
  const [itens, setItens] = useState<Notificacao[]>(INICIAL)
  const [convite, setConvite] = useState<'pendente' | 'aceito' | 'recusado'>('pendente')
  const naoLidas = itens.filter((n) => !n.lida).length

  const marcar = (id: number) => setItens((l) => l.map((n) => (n.id === id ? { ...n, lida: true } : n)))
  const remover = (id: number) => setItens((l) => l.filter((n) => n.id !== id))

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Lista com não lidas e ações por item</p>
          <Button variant="ghost" size="xs" disabled={naoLidas === 0} onClick={() => setItens((l) => l.map((n) => ({ ...n, lida: true })))}>
            <CheckCheck data-icon="inline-start" /> Marcar todas
          </Button>
        </div>
        <ItemGroup className="gap-0 overflow-hidden rounded-xl border bg-card">
          {itens.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-sm text-muted-foreground">
              <Bell className="size-5" /> Tudo em dia por aqui.
            </div>
          )}
          {itens.map((n, i) => {
            const Icone = ICONE[n.tipo]
            return (
              <div key={n.id}>
                {i > 0 && <ItemSeparator className="my-0" />}
                <Item className={cn('rounded-none', !n.lida && 'bg-primary/[0.04] dark:bg-primary/[0.08]')}>
                  <ItemMedia>
                    <span className="relative">
                      <Avatar>
                        <AvatarFallback>{n.ini}</AvatarFallback>
                      </Avatar>
                      <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-background ring-1 ring-border">
                        <Icone className="size-2.5 text-muted-foreground" />
                      </span>
                    </span>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {n.titulo}
                      {!n.lida && <span className="size-1.5 rounded-full bg-primary" aria-label="Não lida" />}
                    </ItemTitle>
                    <ItemDescription>{n.desc}</ItemDescription>
                    <span className="text-xs text-muted-foreground">{n.quando}</span>
                  </ItemContent>
                  <ItemActions className="self-start">
                    {!n.lida && (
                      <Button size="icon-xs" variant="ghost" aria-label="Marcar como lida" onClick={() => marcar(n.id)}>
                        <Check />
                      </Button>
                    )}
                    <Button size="icon-xs" variant="ghost" aria-label="Dispensar" onClick={() => remover(n.id)}>
                      <X />
                    </Button>
                  </ItemActions>
                </Item>
              </div>
            )
          })}
        </ItemGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Card com cabeçalho e rodapé de ações</p>
        <Item variant="outline" className="flex-col items-stretch gap-3 p-4">
          <ItemHeader>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <UserPlus className="size-3" />
              </span>
              Lumi CRM · Convite de equipe
            </span>
            <span className="text-xs text-muted-foreground">há 2 h</span>
          </ItemHeader>
          <div className="flex items-start gap-3">
            <Avatar size="lg">
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <ItemContent>
              <ItemTitle>Eduardo Farias quer adicionar você ao workspace Kavo</ItemTitle>
              <ItemDescription>Você passa a ver os 48 negócios do pipeline comercial e recebe as tarefas atribuídas a você.</ItemDescription>
            </ItemContent>
          </div>
          <ItemFooter className="border-t pt-3">
            {convite === 'pendente' ? (
              <>
                <span className="text-xs text-muted-foreground">Expira em 7 dias</span>
                <span className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setConvite('recusado')}>
                    Recusar
                  </Button>
                  <Button size="sm" onClick={() => setConvite('aceito')}>
                    Aceitar convite
                  </Button>
                </span>
              </>
            ) : (
              <>
                <span className={cn('flex items-center gap-1.5 text-xs', convite === 'aceito' ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>
                  {convite === 'aceito' ? <Check className="size-3.5" /> : <X className="size-3.5" />} Convite {convite}
                </span>
                <Button size="xs" variant="ghost" onClick={() => setConvite('pendente')}>
                  Desfazer
                </Button>
              </>
            )}
          </ItemFooter>
        </Item>
      </div>
    </div>
  )
}
