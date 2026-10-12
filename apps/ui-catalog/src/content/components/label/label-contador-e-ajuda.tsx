'use client'

import { useState } from 'react'
import { CircleHelp, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const MAX_RESUMO = 160
const MAX_SLUG = 40

function corDoContador(restante: number) {
  if (restante < 0) return 'text-destructive'
  if (restante <= 20) return 'text-amber-600 dark:text-amber-400'
  return 'text-muted-foreground'
}

export default function LabelContadorEAjuda() {
  const [resumo, setResumo] = useState('CRM com WhatsApp integrado para times de vendas que precisam responder rápido e fechar mais.')
  const [slug, setSlug] = useState('lumi-crm')
  const restante = MAX_RESUMO - resumo.length

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Contador que vira barra e ajuda em popover</p>
        <Label htmlFor="lb-resumo" className="justify-between">
          <span className="inline-flex items-center gap-1.5">
            Resumo da empresa
            <Popover>
              <PopoverTrigger render={<Button variant="ghost" size="icon-xs" aria-label="Ajuda sobre o resumo" className="text-muted-foreground" />}>
                <CircleHelp />
              </PopoverTrigger>
              <PopoverContent side="top" align="start" className="w-64">
                <PopoverHeader>
                  <PopoverTitle>Onde isso aparece?</PopoverTitle>
                  <PopoverDescription>No perfil público e nas prévias de link compartilhadas no WhatsApp e no LinkedIn.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </span>
          <span className={cn('text-xs font-normal tabular-nums', corDoContador(restante))}>{restante < 0 ? `${-restante} a mais` : `${restante} restantes`}</span>
        </Label>
        <InputGroup className={cn(restante < 0 && 'border-destructive')}>
          <InputGroupTextarea id="lb-resumo" rows={3} value={resumo} onChange={(e) => setResumo(e.target.value)} aria-invalid={restante < 0} />
          <InputGroupAddon align="block-end" className="pt-0 pb-1.5">
            <span className="h-1 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
              <span className={cn('block h-full rounded-full transition-[width]', restante < 0 ? 'bg-destructive' : restante <= 20 ? 'bg-amber-500' : 'bg-primary')} style={{ width: `${Math.min(100, (resumo.length / MAX_RESUMO) * 100)}%` }} />
            </span>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Label lateral com descrição</p>
        <div className="grid gap-4 rounded-xl border bg-card p-4">
          <div className="grid grid-cols-[7rem_1fr] items-start gap-3">
            <div className="pt-1.5">
              <Label htmlFor="lb-nome-fantasia">Nome fantasia</Label>
              <p className="mt-1 text-xs text-muted-foreground">Como o cliente conhece.</p>
            </div>
            <Input id="lb-nome-fantasia" defaultValue="Lumi" />
          </div>
          <div className="grid grid-cols-[7rem_1fr] items-start gap-3">
            <div className="pt-1.5">
              <Label htmlFor="lb-razao">Razão social</Label>
              <p className="mt-1 text-xs text-muted-foreground">Sai na nota fiscal.</p>
            </div>
            <Input id="lb-razao" defaultValue="Lumi Tecnologia Ltda." />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Label embutida no campo, contador no canto</p>
        <InputGroup className="h-auto flex-col items-stretch">
          <InputGroupAddon align="block-start" className="pb-0">
            <Label htmlFor="lb-slug" className="text-[11px] font-medium text-muted-foreground">
              Endereço público
            </Label>
          </InputGroupAddon>
          <div className="flex items-center">
            <InputGroupText className="pl-2.5 text-sm text-muted-foreground">lumi.app/</InputGroupText>
            <InputGroupInput id="lb-slug" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, MAX_SLUG))} className="pl-0" />
            <InputGroupText className={cn('pr-2.5 text-xs tabular-nums', slug.length >= MAX_SLUG - 5 ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground')}>
              {slug.length}/{MAX_SLUG}
            </InputGroupText>
          </div>
        </InputGroup>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="size-3.5" /> Só letras minúsculas, números e hífen.
        </p>
      </div>
    </div>
  )
}
