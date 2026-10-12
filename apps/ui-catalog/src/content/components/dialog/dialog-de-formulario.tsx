'use client'

import type { ReactNode } from 'react'
import { Pencil, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'

// `p` prefixa os ids: o conteúdo inline e o do modal podem estar montados ao mesmo tempo.
function CamposPerfil({ p }: { p: string }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Button size="xs" variant="outline">
            Trocar foto
          </Button>
          <Button size="xs" variant="ghost">
            Remover
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${p}-nome`}>Nome</Label>
          <Input id={`${p}-nome`} defaultValue="Ana" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${p}-sobrenome`}>Sobrenome</Label>
          <Input id={`${p}-sobrenome`} defaultValue="Souza" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${p}-usuario`}>Nome de usuário</Label>
        <Input id={`${p}-usuario`} defaultValue="anasouza" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${p}-cargo`}>Cargo</Label>
          <Input id={`${p}-cargo`} defaultValue="Head de Vendas" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${p}-equipe`}>Equipe</Label>
          <NativeSelect id={`${p}-equipe`} defaultValue="vendas" className="w-full">
            <NativeSelectOption value="vendas">Vendas</NativeSelectOption>
            <NativeSelectOption value="cs">Sucesso do cliente</NativeSelectOption>
            <NativeSelectOption value="mkt">Marketing</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${p}-bio`}>Bio</Label>
        <Textarea id={`${p}-bio`} rows={2} defaultValue="Cuido do time de vendas enterprise. Café, pipeline e follow-up." />
      </div>
    </div>
  )
}

function CamposContato({ p }: { p: string }) {
  return (
    <div className="grid gap-4">
      <div className="space-y-1.5">
        <Label htmlFor={`${p}-nome`}>Nome completo</Label>
        <Input id={`${p}-nome`} placeholder="Bruno Rocha" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${p}-email`}>E-mail</Label>
          <Input id={`${p}-email`} type="email" placeholder="bruno@empresa.com.br" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${p}-tel`}>Telefone</Label>
          <Input id={`${p}-tel`} inputMode="tel" placeholder="(11) 91234-5678" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${p}-origem`}>Origem</Label>
        <NativeSelect id={`${p}-origem`} defaultValue="site" className="w-full">
          <NativeSelectOption value="site">Formulário do site</NativeSelectOption>
          <NativeSelectOption value="indicacao">Indicação</NativeSelectOption>
          <NativeSelectOption value="evento">Evento</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}

export default function DialogDeFormulario() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Gatilhos">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Pencil data-icon="inline-start" /> Editar perfil
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>Essas informações aparecem para o seu time e para os clientes.</DialogDescription>
              </DialogHeader>
              <CamposPerfil p="modal" />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
                <Button>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              <UserPlus data-icon="inline-start" /> Novo contato
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo contato</DialogTitle>
                <DialogDescription>Adicione uma pessoa ao seu CRM.</DialogDescription>
              </DialogHeader>
              <CamposContato p="modal" />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
                <Button>Adicionar contato</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Demo>

      <Demo title="Conteúdo (inline)">
        <div className="grid gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10">
          <div className="flex flex-col gap-2">
            <div className="font-heading text-base leading-none font-medium">Editar perfil</div>
            <p className="text-sm text-muted-foreground">Essas informações aparecem para o seu time e para os clientes.</p>
          </div>
          <CamposPerfil p="inline" />
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar alterações</Button>
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
