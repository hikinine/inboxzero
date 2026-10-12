'use client'

import { useState } from 'react'
import { Send, UserPlus, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'

const CONVIDADOS = [
  { nome: 'Bruno Rocha', email: 'bruno@lumi.com.br', papel: 'Administrador', status: 'Aceito' },
  { nome: 'Carla Mendes', email: 'carla@lumi.com.br', papel: 'Editor', status: 'Aceito' },
  { nome: 'Diego Lima', email: 'diego@lumi.com.br', papel: 'Visualizador', status: 'Pendente' },
] as const

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function ConvidarForm({ idPrefix }: { idPrefix: string }) {
  const [emails, setEmails] = useState<string[]>(['fernanda@lumi.com.br', 'joao.pedro@lumi.com.br'])
  const [valor, setValor] = useState('')

  function adicionar() {
    const e = valor.trim().toLowerCase().replace(/,$/, '')
    if (e && !emails.includes(e)) setEmails([...emails, e])
    setValor('')
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-email`}>E-mails</Label>
        <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-input px-2 py-1.5 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30">
          {emails.map((e) => (
            <Badge key={e} variant="secondary" className="gap-1 pr-1">
              {e}
              <button type="button" aria-label={`Remover ${e}`} onClick={() => setEmails(emails.filter((x) => x !== e))} className="rounded-sm p-0.5 hover:bg-foreground/10">
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          <input
            id={`${idPrefix}-email`}
            value={valor}
            onChange={(ev) => setValor(ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ',') {
                ev.preventDefault()
                adicionar()
              }
            }}
            onBlur={adicionar}
            placeholder="nome@empresa.com.br"
            className="min-w-40 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <p className="text-xs text-muted-foreground">Pressione Enter ou vírgula para adicionar vários de uma vez.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1.5">
          <Label htmlFor={`${idPrefix}-papel`}>Papel</Label>
          <NativeSelect id={`${idPrefix}-papel`} defaultValue="editor" className="w-full">
            <NativeSelectOption value="admin">Administrador — gerencia tudo</NativeSelectOption>
            <NativeSelectOption value="editor">Editor — cria e edita</NativeSelectOption>
            <NativeSelectOption value="viewer">Visualizador — só leitura</NativeSelectOption>
          </NativeSelect>
        </div>
        <Button disabled={emails.length === 0}>
          <Send data-icon="inline-start" /> Enviar {emails.length > 0 ? `${emails.length} convite${emails.length > 1 ? 's' : ''}` : 'convites'}
        </Button>
      </div>

      <Separator />

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Já convidados</p>
        <ul className="space-y-3">
          {CONVIDADOS.map((c) => (
            <li key={c.email} className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>{iniciais(c.nome)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{c.nome}</p>
                <p className="truncate text-xs text-muted-foreground">{c.email}</p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:inline">{c.papel}</span>
              <Badge variant={c.status === 'Aceito' ? 'secondary' : 'outline'}>{c.status}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DialogoConvidarMembros() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diálogos</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Convidar membros</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">E-mails em chips, papel por convite e a lista de quem já está dentro. O botão abre o modal real; o card abaixo é a versão inline.</p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <UserPlus data-icon="inline-start" /> Convidar membros
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Convidar para Lumi Tecnologia</DialogTitle>
                <DialogDescription>Quem receber o convite entra direto no workspace com o papel escolhido.</DialogDescription>
              </DialogHeader>
              <ConvidarForm idPrefix="dlg" />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Fechar</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-medium">Convidar para Lumi Tecnologia</h3>
            <p className="text-sm text-muted-foreground">Quem receber o convite entra direto no workspace com o papel escolhido.</p>
          </div>
          <ConvidarForm idPrefix="inl" />
        </div>
      </div>
    </section>
  )
}
