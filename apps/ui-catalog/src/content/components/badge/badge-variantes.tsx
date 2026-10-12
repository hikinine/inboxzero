'use client'

import { useState, type ReactNode } from 'react'
import { Bell, Inbox, ShieldCheck, Sparkles, Star, X, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const
const TAGS_INICIAIS = ['Lead quente', 'Black Friday', 'Indicação', 'Recorrente']

export default function BadgeVariantes() {
  const [tags, setTags] = useState<string[]>(TAGS_INICIAIS)
  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Variantes</Legenda>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Legenda>Com ícone</Legenda>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Sparkles data-icon="inline-start" /> Novo
          </Badge>
          <Badge variant="secondary">
            <Star data-icon="inline-start" /> Favorito
          </Badge>
          <Badge variant="outline">
            <ShieldCheck data-icon="inline-start" /> Verificado
          </Badge>
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400">
            <Zap data-icon="inline-start" /> Pro
          </Badge>
          <Badge variant="outline">
            Beta <Sparkles data-icon="inline-end" />
          </Badge>
        </div>
      </div>

      <div>
        <Legenda>Pílula de contagem</Legenda>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="min-w-5 justify-center px-1 tabular-nums">3</Badge>
          <Badge variant="secondary" className="min-w-5 justify-center px-1 tabular-nums">
            12
          </Badge>
          <Badge variant="destructive" className="min-w-5 justify-center px-1 tabular-nums">
            99+
          </Badge>
          <Button variant="outline" size="sm">
            <Inbox data-icon="inline-start" /> Inbox
            <Badge className="min-w-5 justify-center px-1 tabular-nums">8</Badge>
          </Button>
          <Button variant="ghost" size="icon" aria-label="4 notificações não lidas" className="relative">
            <Bell />
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
              4
            </span>
          </Button>
        </div>
      </div>

      <div>
        <Legenda>Removível</Legenda>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <Badge key={t} variant="secondary" className="pr-1">
              {t}
              <button
                type="button"
                aria-label={`Remover ${t}`}
                onClick={() => setTags((a) => a.filter((x) => x !== t))}
                className="ml-0.5 flex size-3.5 items-center justify-center rounded-full hover:bg-foreground/10"
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
          {tags.length < TAGS_INICIAIS.length && (
            <Button variant="ghost" size="xs" onClick={() => setTags(TAGS_INICIAIS)}>
              Restaurar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
