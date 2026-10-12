'use client'

import { Bell, Save, Settings, Share2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const LADOS = [
  { side: 'top', label: 'Topo' },
  { side: 'right', label: 'Direita' },
  { side: 'bottom', label: 'Baixo' },
  { side: 'left', label: 'Esquerda' },
] as const

const ICONES = [
  { Icon: Bell, label: 'Notificações', tone: '' },
  { Icon: Settings, label: 'Configurações', tone: '' },
  { Icon: Trash2, label: 'Excluir conversa', tone: 'text-destructive' },
]

export default function TooltipVariantes() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Quatro lados</p>
        <div className="flex flex-wrap gap-2">
          {LADOS.map((l) => (
            <Tooltip key={l.side}>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>{l.label}</TooltipTrigger>
              <TooltipContent side={l.side}>Aparece {l.side === 'top' ? 'acima' : l.side === 'bottom' ? 'abaixo' : `à ${l.label.toLowerCase()}`}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com atalho de teclado</p>
        <div className="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger render={<Button size="sm" />}>
              <Save data-icon="inline-start" /> Salvar
            </TooltipTrigger>
            <TooltipContent>
              Salvar alterações <Kbd>⌘S</Kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button size="sm" variant="outline" />}>
              <Share2 data-icon="inline-start" /> Compartilhar
            </TooltipTrigger>
            <TooltipContent>
              Copiar link <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>C</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Em botões de ícone</p>
        <div className="flex gap-1">
          {ICONES.map((i) => (
            <Tooltip key={i.label}>
              <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={i.label} className={i.tone} />}>
                <i.Icon />
              </TooltipTrigger>
              <TooltipContent>{i.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Aparência (inline)</p>
        <div className="flex flex-wrap items-end gap-6 pt-1">
          <div data-slot="tooltip-content" className="relative inline-flex w-fit items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 pr-1.5 text-xs text-background">
            Salvar alterações <Kbd>⌘S</Kbd>
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[2px] bg-foreground" aria-hidden />
          </div>
          <div className="relative inline-flex w-fit max-w-56 items-center rounded-md bg-foreground px-3 py-1.5 text-xs text-background">
            Este contato não tem e-mail cadastrado; adicione um antes de enviar a proposta.
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[2px] bg-foreground" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  )
}
