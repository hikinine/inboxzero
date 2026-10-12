'use client'

import { useState } from 'react'
import { Check, Copy, Globe, Link2, Lock, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

const LINK = 'https://app.lumi.com.br/r/relatorio-q3-2026'

const PESSOAS = [
  { nome: 'Ana Souza', email: 'ana@lumi.com.br', papel: 'dona' },
  { nome: 'Bruno Rocha', email: 'bruno@lumi.com.br', papel: 'editar' },
  { nome: 'Carla Mendes', email: 'carla@lumi.com.br', papel: 'ver' },
] as const

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function CompartilharForm({ idPrefix }: { idPrefix: string }) {
  const [copiado, setCopiado] = useState(false)
  const [publico, setPublico] = useState(true)

  function copiar() {
    try {
      navigator.clipboard.writeText(LINK).catch(() => undefined)
    } catch {
      // clipboard indisponível no preview
    }
    setCopiado(true)
    window.setTimeout(() => setCopiado(false), 1800)
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-link`}>Link do relatório</Label>
        <InputGroup>
          <InputGroupAddon>
            <Link2 />
          </InputGroupAddon>
          <InputGroupInput id={`${idPrefix}-link`} readOnly value={LINK} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={copiar} aria-label="Copiar link">
              {copiado ? <Check className="text-emerald-500" /> : <Copy />}
              {copiado ? 'Copiado' : 'Copiar'}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex items-center gap-3 rounded-lg border p-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">{publico ? <Globe className="size-4" /> : <Lock className="size-4" />}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{publico ? 'Qualquer pessoa com o link' : 'Somente pessoas convidadas'}</p>
          <p className="text-xs text-muted-foreground">{publico ? 'Não precisa de conta para abrir.' : 'Precisa de login e de um convite.'}</p>
        </div>
        <NativeSelect size="sm" defaultValue="ver" disabled={!publico} aria-label="Permissão de quem tem o link" className="hidden sm:block">
          <NativeSelectOption value="ver">Pode ver</NativeSelectOption>
          <NativeSelectOption value="comentar">Pode comentar</NativeSelectOption>
          <NativeSelectOption value="editar">Pode editar</NativeSelectOption>
        </NativeSelect>
        <Switch checked={publico} onCheckedChange={setPublico} aria-label="Acesso por link" />
      </div>

      <Separator />

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Pessoas com acesso</p>
        <ul className="space-y-3">
          {PESSOAS.map((p) => (
            <li key={p.email} className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>{iniciais(p.nome)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.nome}</p>
                <p className="truncate text-xs text-muted-foreground">{p.email}</p>
              </div>
              {p.papel === 'dona' ? (
                <span className="text-xs text-muted-foreground">Proprietária</span>
              ) : (
                <NativeSelect size="sm" defaultValue={p.papel} aria-label={`Permissão de ${p.nome}`}>
                  <NativeSelectOption value="ver">Pode ver</NativeSelectOption>
                  <NativeSelectOption value="comentar">Pode comentar</NativeSelectOption>
                  <NativeSelectOption value="editar">Pode editar</NativeSelectOption>
                  <NativeSelectOption value="remover">Remover acesso</NativeSelectOption>
                </NativeSelect>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DialogoCompartilharLink() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diálogos</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Compartilhar link</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Link com botão de copiar, acesso geral com permissão e a lista de pessoas que já têm acesso ao relatório.</p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              <Share2 data-icon="inline-start" /> Compartilhar
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Compartilhar “Relatório Q3 2026”</DialogTitle>
                <DialogDescription>Controle quem pode ver, comentar ou editar.</DialogDescription>
              </DialogHeader>
              <CompartilharForm idPrefix="dlg" />
              <DialogFooter>
                <DialogClose render={<Button />}>Concluído</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-medium">Compartilhar “Relatório Q3 2026”</h3>
            <p className="text-sm text-muted-foreground">Controle quem pode ver, comentar ou editar.</p>
          </div>
          <CompartilharForm idPrefix="inl" />
          <div className="-mx-6 -mb-6 mt-6 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 px-6 py-4">
            <Button>Concluído</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
