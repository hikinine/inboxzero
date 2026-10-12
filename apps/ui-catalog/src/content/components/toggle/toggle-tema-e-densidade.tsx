'use client'

import { useState } from 'react'
import { Focus, Monitor, Moon, Rows2, Rows3, Rows4, Sun, type LucideIcon } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

type Tema = 'claro' | 'escuro' | 'sistema'
type Densidade = 'confortavel' | 'padrao' | 'compacta'

const TEMAS: { id: Tema; label: string; Icon: LucideIcon }[] = [
  { id: 'claro', label: 'Claro', Icon: Sun },
  { id: 'escuro', label: 'Escuro', Icon: Moon },
  { id: 'sistema', label: 'Sistema', Icon: Monitor },
]
const DENSIDADES: { id: Densidade; label: string; Icon: LucideIcon; linha: string }[] = [
  { id: 'confortavel', label: 'Confortável', Icon: Rows2, linha: 'py-2.5 text-sm' },
  { id: 'padrao', label: 'Padrão', Icon: Rows3, linha: 'py-1.5 text-sm' },
  { id: 'compacta', label: 'Compacta', Icon: Rows4, linha: 'py-0.5 text-xs' },
]

const PALETA: Record<Tema, { fundo: string; texto: string; borda: string; suave: string; barra: string }> = {
  claro: { fundo: 'bg-white', texto: 'text-zinc-900', borda: 'border-zinc-200', suave: 'text-zinc-500', barra: 'bg-zinc-100' },
  escuro: { fundo: 'bg-zinc-950', texto: 'text-zinc-100', borda: 'border-zinc-800', suave: 'text-zinc-400', barra: 'bg-zinc-900' },
  sistema: { fundo: 'bg-background', texto: 'text-foreground', borda: 'border-border', suave: 'text-muted-foreground', barra: 'bg-muted' },
}

const LINHAS = [
  ['Kavo Ltda', 'Negociação', 'R$ 12.500'],
  ['Lumi Tecnologia', 'Proposta', 'R$ 24.000'],
  ['Nuvem Fit', 'Fechamento', 'R$ 4.900'],
  ['Prisma Dados', 'Qualificado', 'R$ 8.900'],
]

export default function ToggleTemaEDensidade() {
  const [tema, setTema] = useState<Tema>('sistema')
  const [densidade, setDensidade] = useState<Densidade>('padrao')
  const [foco, setFoco] = useState(false)
  const P = PALETA[tema]
  const D = DENSIDADES.find((d) => d.id === densidade)!

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Tema</p>
          <div className="flex gap-1 rounded-lg border p-1">
            {TEMAS.map((t) => (
              <Toggle key={t.id} size="sm" pressed={tema === t.id} onPressedChange={() => setTema(t.id)} aria-label={`Tema ${t.label}`} className="aria-pressed:bg-background aria-pressed:shadow-sm dark:aria-pressed:bg-muted">
                <t.Icon data-icon="inline-start" /> {t.label}
              </Toggle>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Densidade</p>
          <div className="flex gap-1 rounded-lg border p-1">
            {DENSIDADES.map((d) => (
              <Toggle key={d.id} size="sm" pressed={densidade === d.id} onPressedChange={() => setDensidade(d.id)} aria-label={d.label} className="aria-pressed:bg-background aria-pressed:shadow-sm dark:aria-pressed:bg-muted">
                <d.Icon />
              </Toggle>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Foco</p>
          <Toggle size="sm" variant="outline" pressed={foco} onPressedChange={setFoco} className="h-[calc(2.25rem)]">
            <Focus data-icon="inline-start" /> Modo foco
          </Toggle>
        </div>
      </div>

      <div className={cn('overflow-hidden rounded-xl border transition-colors', P.fundo, P.texto, P.borda)}>
        <div className={cn('flex items-center gap-2 border-b px-3 py-2 text-xs', P.borda, P.barra)}>
          <span className="size-2 rounded-full bg-rose-400" />
          <span className="size-2 rounded-full bg-amber-400" />
          <span className="size-2 rounded-full bg-emerald-400" />
          <span className={cn('ml-2', P.suave)}>Pipeline · {D.label}</span>
        </div>
        <div className={cn('grid', foco ? 'grid-cols-1' : 'grid-cols-[6.5rem_1fr]')}>
          {!foco && (
            <div className={cn('space-y-1 border-r p-2 text-xs', P.borda)}>
              {['Início', 'Pipeline', 'Contatos', 'Relatórios'].map((n, i) => (
                <div key={n} className={cn('rounded-md px-2 py-1', i === 1 ? cn('font-medium', P.barra) : P.suave)}>
                  {n}
                </div>
              ))}
            </div>
          )}
          <div className="p-2">
            <div className={cn('grid grid-cols-[1fr_auto_auto] gap-x-4 px-2 text-[11px] uppercase tracking-wider', P.suave)}>
              <span>Empresa</span>
              <span>Etapa</span>
              <span className="text-right">Valor</span>
            </div>
            {LINHAS.map(([e, et, v]) => (
              <div key={e} className={cn('grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b px-2 last:border-b-0', P.borda, D.linha)}>
                <span className="truncate">{e}</span>
                <span className={cn('rounded-full border px-1.5 text-[10px]', P.borda, P.suave)}>{et}</span>
                <span className="text-right tabular-nums">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
