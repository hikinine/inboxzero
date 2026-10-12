'use client'

import type { LucideIcon } from 'lucide-react'
import { Activity, Clock, Server } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const METRICS: { Icon: LucideIcon; label: string; value: string }[] = [
  { Icon: Activity, label: 'API', value: '142 ms' },
  { Icon: Server, label: 'Fila', value: '0 jobs' },
  { Icon: Clock, label: 'Sincronizado', value: 'há 2 min' },
]
const LINKS = ['Status', 'Documentação', 'Suporte', 'Changelog']

export default function FooterStatusSistema() {
  return (
    <footer className="w-full border-t bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-medium">Todos os sistemas operacionais</span>
          <Badge variant="outline" className="hidden sm:inline-flex">
            99,98% uptime
          </Badge>
        </div>
        <div className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
          {METRICS.map((m) => (
            <span key={m.label} className="flex items-center gap-1.5">
              <m.Icon className="size-3.5" /> {m.label} <span className="font-medium text-foreground tabular-nums">{m.value}</span>
            </span>
          ))}
        </div>
        <nav className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
          {LINKS.map((l) => (
            <a key={l} href="#" className="transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-xs text-muted-foreground sm:px-6">
        <span>© 2026 Fluxo Tecnologia Ltda.</span>
        <span className="hidden sm:inline">·</span>
        <span>Região: São Paulo (sa-east-1)</span>
        <span className="ml-auto flex items-center gap-2">
          Versão
          <Badge variant="secondary" className="font-mono">
            v2.14.3
          </Badge>
        </span>
      </div>
    </footer>
  )
}
