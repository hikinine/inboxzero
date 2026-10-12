'use client'

import { useState, type ReactNode } from 'react'
import { Check, Copy, Globe, Link2, Lock, Share2, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

type Acesso = 'restrito' | 'link'

const PESSOAS = [
  { nome: 'Ana Souza', email: 'ana@lumi.com.br', ini: 'AS', papel: 'dono' },
  { nome: 'Bruno Rocha', email: 'bruno@lumi.com.br', ini: 'BR', papel: 'editor' },
  { nome: 'Carla Mendes', email: 'carla@mendes.adv.br', ini: 'CM', papel: 'leitor' },
]

function Compartilhar({ p }: { p: string }) {
  const [copiado, setCopiado] = useState(false)
  const [acesso, setAcesso] = useState<Acesso>('restrito')
  const copiar = () => {
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }
  return (
    <div className="grid gap-4">
      <div className="space-y-1.5">
        <Label htmlFor={`${p}-convite`}>Convidar</Label>
        <InputGroup>
          <InputGroupAddon>
            <UserPlus />
          </InputGroupAddon>
          <InputGroupInput id={`${p}-convite`} type="email" placeholder="nome@empresa.com.br" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs" variant="default">
              Enviar
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-2">
        <Label>Pessoas com acesso</Label>
        <ul className="divide-y rounded-lg border">
          {PESSOAS.map((pessoa) => (
            <li key={pessoa.email} className="flex items-center gap-3 px-2.5 py-2">
              <Avatar size="sm">
                <AvatarFallback>{pessoa.ini}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{pessoa.nome}</div>
                <div className="truncate text-xs text-muted-foreground">{pessoa.email}</div>
              </div>
              {pessoa.papel === 'dono' ? (
                <span className="text-xs text-muted-foreground">Proprietária</span>
              ) : (
                <NativeSelect size="sm" defaultValue={pessoa.papel} aria-label={`Permissão de ${pessoa.nome}`}>
                  <NativeSelectOption value="editor">Editor</NativeSelectOption>
                  <NativeSelectOption value="leitor">Visualizador</NativeSelectOption>
                </NativeSelect>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${p}-acesso`}>Acesso geral</Label>
        <div className="flex items-center gap-3 rounded-lg border p-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">{acesso === 'link' ? <Globe className="size-4" /> : <Lock className="size-4" />}</div>
          <div className="min-w-0 flex-1">
            <NativeSelect id={`${p}-acesso`} size="sm" value={acesso} onChange={(e) => setAcesso(e.target.value as Acesso)} className="w-full">
              <NativeSelectOption value="restrito">Restrito</NativeSelectOption>
              <NativeSelectOption value="link">Qualquer pessoa com o link</NativeSelectOption>
            </NativeSelect>
            <div className="mt-1 text-xs text-muted-foreground">{acesso === 'link' ? 'Qualquer pessoa na internet com o link pode ver.' : 'Só as pessoas adicionadas podem abrir.'}</div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${p}-link`}>Link</Label>
        <InputGroup>
          <InputGroupAddon>
            <Link2 />
          </InputGroupAddon>
          <InputGroupInput id={`${p}-link`} readOnly value="https://app.lumi.com.br/p/relatorio-q3" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs" variant="secondary" onClick={copiar}>
              {copiado ? <Check /> : <Copy />} {copiado ? 'Copiado' : 'Copiar'}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}

export default function DialogDeCompartilhar() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Gatilho">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            <Share2 data-icon="inline-start" /> Compartilhar
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Compartilhar “Relatório Q3”</DialogTitle>
              <DialogDescription>Convide pessoas ou gere um link de acesso.</DialogDescription>
            </DialogHeader>
            <Compartilhar p="modal" />
            <DialogFooter>
              <DialogClose render={<Button />}>Concluído</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      <Demo title="Conteúdo (inline)">
        <div className="grid gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10">
          <div className="flex flex-col gap-2">
            <div className="font-heading text-base leading-none font-medium">Compartilhar “Relatório Q3”</div>
            <p className="text-sm text-muted-foreground">Convide pessoas ou gere um link de acesso.</p>
          </div>
          <Compartilhar p="inline" />
          <DialogFooter>
            <Button>Concluído</Button>
          </DialogFooter>
        </div>
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
