'use client'

import { Bell, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'

const DIMENSOES = [
  ['largura', 'Largura', '100%'],
  ['largura-max', 'Largura máx.', '640px'],
  ['altura', 'Altura', '320px'],
  ['altura-max', 'Altura máx.', 'auto'],
] as const

const AVISOS = [
  ['Novo lead atribuído', true],
  ['Proposta visualizada', true],
  ['Resumo semanal', false],
] as const

function DimensoesForm({ prefix }: { prefix: string }) {
  return (
    <div className="grid gap-2">
      {DIMENSOES.map(([id, label, value]) => (
        <div key={id} className="grid grid-cols-3 items-center gap-3">
          <Label htmlFor={`${prefix}-${id}`} className="text-xs">
            {label}
          </Label>
          <Input id={`${prefix}-${id}`} defaultValue={value} className="col-span-2 h-7 font-mono text-xs" />
        </div>
      ))}
    </div>
  )
}

function AvisosForm({ prefix }: { prefix: string }) {
  return (
    <div className="grid gap-3">
      {AVISOS.map(([label, on]) => (
        <div key={label} className="flex items-center justify-between gap-3">
          <Label htmlFor={`${prefix}-${label}`} className="text-xs font-normal">
            {label}
          </Label>
          <Switch id={`${prefix}-${label}`} size="sm" defaultChecked={on} />
        </div>
      ))}
    </div>
  )
}

export default function PopoverConfiguracoes() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Gatilhos</p>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <Settings2 data-icon="inline-start" /> Dimensões
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 gap-3 p-4">
              <PopoverHeader>
                <PopoverTitle>Dimensões</PopoverTitle>
                <PopoverDescription>Ajuste o tamanho da camada selecionada.</PopoverDescription>
              </PopoverHeader>
              <DimensoesForm prefix="pop" />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <Bell data-icon="inline-start" /> Avisos
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 gap-3 p-4">
              <PopoverHeader>
                <PopoverTitle>Avisos</PopoverTitle>
                <PopoverDescription>O que deve chegar até você.</PopoverDescription>
              </PopoverHeader>
              <AvisosForm prefix="pop" />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Conteúdo (inline)</p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="space-y-3 rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <div className="space-y-0.5">
              <p className="font-medium">Dimensões</p>
              <p className="text-muted-foreground">Ajuste o tamanho da camada selecionada.</p>
            </div>
            <DimensoesForm prefix="inline" />
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm">
                Redefinir
              </Button>
              <Button size="sm">Aplicar</Button>
            </div>
          </div>
          <div className="w-full space-y-3 rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 sm:w-56">
            <div className="space-y-0.5">
              <p className="font-medium">Avisos</p>
              <p className="text-muted-foreground">O que deve chegar até você.</p>
            </div>
            <AvisosForm prefix="inline" />
          </div>
        </div>
      </div>
    </div>
  )
}
