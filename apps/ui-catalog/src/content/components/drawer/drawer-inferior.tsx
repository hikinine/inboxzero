'use client'

import { useState, type ReactNode } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'

const STATUS = ['Pago', 'Pendente', 'Enviado', 'Cancelado'] as const
const PERIODOS = ['Hoje', '7 dias', '30 dias', 'Este ano'] as const
type Status = (typeof STATUS)[number]
type Periodo = (typeof PERIODOS)[number]

// `p` prefixa os ids: a versão inline e a do drawer podem coexistir no DOM.
function Filtros({ p }: { p: string }) {
  const [status, setStatus] = useState<Status[]>(['Pago', 'Pendente'])
  const [periodo, setPeriodo] = useState<Periodo>('30 dias')
  const alternar = (s: Status, marcado: boolean) => setStatus((prev) => (marcado ? [...prev, s] : prev.filter((x) => x !== s)))
  return (
    <div className="grid gap-5">
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Status</div>
        <div className="grid grid-cols-2 gap-2">
          {STATUS.map((s) => (
            <div key={s} className="flex items-center gap-2 rounded-lg border px-2.5 py-2">
              <Checkbox id={`${p}-${s}`} checked={status.includes(s)} onCheckedChange={(v) => alternar(s, v)} />
              <Label htmlFor={`${p}-${s}`} className="font-normal">
                {s}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Período</div>
        <div className="flex flex-wrap gap-2">
          {PERIODOS.map((per) => (
            <Button key={per} size="sm" variant={periodo === per ? 'default' : 'outline'} onClick={() => setPeriodo(per)}>
              {per}
            </Button>
          ))}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        {status.length} status · {periodo}
      </div>
    </div>
  )
}

export default function DrawerInferior() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Gatilho (desliza de baixo)">
        <Drawer showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" />}>
            <SlidersHorizontal data-icon="inline-start" /> Filtrar pedidos
          </DrawerTrigger>
          <DrawerContent className="sm:mx-auto sm:max-w-md">
            <DrawerHeader>
              <DrawerTitle>Filtrar pedidos</DrawerTitle>
              <DrawerDescription>Refine a lista por status e período.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <Filtros p="drawer" />
            </div>
            <DrawerFooter>
              <Button>Aplicar filtros</Button>
              <DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Demo>

      <Demo title="Conteúdo (inline)">
        <div className="relative overflow-hidden rounded-xl border bg-muted/40 pt-12">
          <div className="absolute inset-x-4 top-4 flex items-center gap-2" aria-hidden>
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
            <div className="ml-auto h-3 w-10 rounded bg-muted-foreground/20" />
          </div>
          <div className="rounded-t-xl border-t bg-popover text-sm text-popover-foreground shadow-xl">
            <div className="flex h-3 w-full justify-center pt-2" aria-hidden>
              <div className="h-1 w-24 rounded-full bg-muted" />
            </div>
            <div className="flex flex-col gap-0.5 p-4 pb-0 text-center">
              <div className="font-heading text-base font-medium text-foreground">Filtrar pedidos</div>
              <div className="text-sm text-muted-foreground">Refine a lista por status e período.</div>
            </div>
            <div className="p-4">
              <Filtros p="inline" />
            </div>
            <div className="flex flex-col gap-2 p-4 pt-0">
              <Button>Aplicar filtros</Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </div>
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
