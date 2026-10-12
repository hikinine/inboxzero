'use client'

import { useState, type ReactNode } from 'react'
import { ArrowUpDown, Check, Columns3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const COLUNAS = [
  { key: 'cliente', label: 'Cliente' },
  { key: 'status', label: 'Status' },
  { key: 'valor', label: 'Valor' },
  { key: 'vencimento', label: 'Vencimento' },
  { key: 'responsavel', label: 'Responsável' },
] as const
type ColKey = (typeof COLUNAS)[number]['key']

const ORDENACOES = [
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'antigos', label: 'Mais antigos' },
  { value: 'valor', label: 'Maior valor' },
  { value: 'nome', label: 'Nome A–Z' },
] as const

export default function DropdownComCheckboxes() {
  const [visiveis, setVisiveis] = useState<Record<ColKey, boolean>>({ cliente: true, status: true, valor: true, vencimento: false, responsavel: true })
  const [ordem, setOrdem] = useState<string>('recentes')
  const alternar = (k: ColKey, v: boolean) => setVisiveis((prev) => ({ ...prev, [k]: v }))
  const ativas = COLUNAS.filter((c) => visiveis[c.key])
  const ordemLabel = ORDENACOES.find((o) => o.value === ordem)?.label ?? ''

  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Gatilhos (estado compartilhado com a prévia)">
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <Columns3 data-icon="inline-start" /> Colunas
              <span className="rounded-full bg-muted px-1.5 text-[10px] tabular-nums">{ativas.length}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48">
              <DropdownMenuLabel>Colunas visíveis</DropdownMenuLabel>
              {COLUNAS.map((c) => (
                <DropdownMenuCheckboxItem key={c.key} checked={visiveis[c.key]} onCheckedChange={(v) => alternar(c.key, v)} closeOnClick={false}>
                  {c.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <ArrowUpDown data-icon="inline-start" /> {ordemLabel}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-44">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={ordem} onValueChange={(v) => setOrdem(String(v))}>
                {ORDENACOES.map((o) => (
                  <DropdownMenuRadioItem key={o.value} value={o.value}>
                    {o.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <div className="px-1.5 py-1 text-xs text-muted-foreground">Aplica à tabela atual</div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border">
          <div className="grid gap-px bg-border" style={{ gridTemplateColumns: `repeat(${ativas.length}, minmax(0, 1fr))` }}>
            {ativas.map((c) => (
              <div key={c.key} className="bg-muted/60 px-2.5 py-1.5 text-xs font-medium">
                {c.label}
              </div>
            ))}
          </div>
          <div className="space-y-2 p-2.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${ativas.length}, minmax(0, 1fr))` }}>
                {ativas.map((c) => (
                  <div key={c.key} className={cn('h-2.5 rounded bg-muted-foreground/15', i === 1 && 'w-3/4')} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Demo>

      <Demo title="Conteúdo (inline, clicável)">
        <div className="flex flex-wrap gap-3">
          <div className="w-48 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <div className="px-1.5 py-1 text-xs font-medium text-muted-foreground">Colunas visíveis</div>
            {COLUNAS.map((c) => (
              <LinhaCheck key={c.key} label={c.label} marcado={visiveis[c.key]} onClick={() => alternar(c.key, !visiveis[c.key])} />
            ))}
          </div>
          <div className="w-44 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <div className="px-1.5 py-1 text-xs font-medium text-muted-foreground">Ordenar por</div>
            {ORDENACOES.map((o) => (
              <LinhaCheck key={o.value} label={o.label} marcado={ordem === o.value} onClick={() => setOrdem(o.value)} />
            ))}
          </div>
        </div>
      </Demo>
    </div>
  )
}

function LinhaCheck({ label, marcado, onClick }: { label: string; marcado: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="relative flex w-full items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground">
      {label}
      {marcado && <Check className="absolute right-2 size-4" />}
    </button>
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
