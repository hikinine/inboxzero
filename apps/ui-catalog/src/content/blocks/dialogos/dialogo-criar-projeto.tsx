'use client'

import { useState } from 'react'
import { FolderPlus, Globe, Lock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

const VISIBILIDADES = [
  { value: 'privado', Icon: Lock, titulo: 'Privado', descricao: 'Só você e quem for convidado.' },
  { value: 'equipe', Icon: Users, titulo: 'Equipe', descricao: 'Todos da Lumi Tecnologia podem ver.' },
  { value: 'publico', Icon: Globe, titulo: 'Público', descricao: 'Qualquer pessoa com o link.' },
] as const

type Visibilidade = (typeof VISIBILIDADES)[number]['value']

function ProjetoForm({ idPrefix }: { idPrefix: string }) {
  const [visibilidade, setVisibilidade] = useState<Visibilidade>('equipe')
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-nome`}>Nome do projeto</FieldLabel>
        <Input id={`${idPrefix}-nome`} placeholder="Ex.: Lançamento do app" defaultValue="Campanha Black Friday 2026" />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-descricao`}>Descrição</FieldLabel>
        <Textarea id={`${idPrefix}-descricao`} rows={3} placeholder="Qual é o objetivo deste projeto?" defaultValue="Ofertas, criativos e automações de WhatsApp para a Black Friday." />
        <FieldDescription>Opcional. Aparece no topo do projeto para todo o time.</FieldDescription>
      </Field>
      <FieldSet>
        <FieldLegend variant="label">Visibilidade</FieldLegend>
        <RadioGroup value={visibilidade} onValueChange={(v) => setVisibilidade(v as Visibilidade)}>
          {VISIBILIDADES.map((o) => (
            <FieldLabel key={o.value} htmlFor={`${idPrefix}-${o.value}`}>
              <Field orientation="horizontal">
                <o.Icon className="size-4 shrink-0 text-muted-foreground" />
                <FieldContent>
                  <FieldTitle>{o.titulo}</FieldTitle>
                  <FieldDescription>{o.descricao}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={o.value} id={`${idPrefix}-${o.value}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
  )
}

export default function DialogoCriarProjeto() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diálogos</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Criar projeto</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Nome, descrição e visibilidade num modal curto. Abaixo, o mesmo conteúdo renderizado inline.</p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <FolderPlus data-icon="inline-start" /> Novo projeto
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo projeto</DialogTitle>
                <DialogDescription>Você pode mudar tudo isso depois nas configurações do projeto.</DialogDescription>
              </DialogHeader>
              <ProjetoForm idPrefix="dlg" />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
                <Button>Criar projeto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mx-auto max-w-md rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-medium">Novo projeto</h3>
            <p className="text-sm text-muted-foreground">Você pode mudar tudo isso depois nas configurações do projeto.</p>
          </div>
          <ProjetoForm idPrefix="inl" />
          <div className="-mx-6 -mb-6 mt-6 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 px-6 py-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Criar projeto</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
