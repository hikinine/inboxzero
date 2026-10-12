'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const VARIANTS = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const SIZES = ['xs', 'sm', 'default', 'lg'] as const
const ICON_SIZES = ['icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const

export default function BotoesMatriz() {
  return (
    <div className="w-full max-w-2xl overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-24 pb-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
              variant
            </th>
            {SIZES.map((s) => (
              <th key={s} scope="col" className="pb-3 text-left font-mono text-xs font-normal text-muted-foreground">
                size="{s}"
              </th>
            ))}
            <th scope="col" className="pb-3 text-left font-mono text-xs font-normal text-muted-foreground">
              icon
            </th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map((v, i) => (
            <tr key={v} className={i % 2 ? undefined : 'bg-muted/40'}>
              <th scope="row" className="rounded-l-lg py-2 pl-3 text-left font-mono text-xs font-normal text-muted-foreground">
                {v}
              </th>
              {SIZES.map((s) => (
                <td key={s} className="py-2 pr-3">
                  <Button variant={v} size={s}>
                    Salvar
                  </Button>
                </td>
              ))}
              <td className="rounded-r-lg py-2 pr-3">
                <Button variant={v} size="icon" aria-label={`Adicionar (${v})`}>
                  <Plus />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="py-2 pl-3 text-left font-mono text-xs font-normal text-muted-foreground">
              disabled
            </th>
            {SIZES.map((s) => (
              <td key={s} className="py-2 pr-3">
                <Button size={s} disabled>
                  Salvar
                </Button>
              </td>
            ))}
            <td className="py-2 pr-3">
              <Button size="icon" disabled aria-label="Adicionar (desabilitado)">
                <Plus />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
        <span className="mr-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">só ícone</span>
        {ICON_SIZES.map((s) => (
          <span key={s} className="flex flex-col items-center gap-1">
            <Button variant="outline" size={s} aria-label={`Adicionar (${s})`}>
              <Plus />
            </Button>
            <span className="font-mono text-[10px] text-muted-foreground">{s}</span>
          </span>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">6 variantes × 4 tamanhos + 4 tamanhos de ícone</span>
      </div>
    </div>
  )
}
