'use client'

import { useState, type ReactNode } from 'react'
import { Bookmark, Clock, FileText, Link2, MapPin, MessageCircle, Play, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Troca o visual escuro padrão do TooltipContent por um cartão (inclusive a seta).
const rico = 'w-72 max-w-72 flex-col items-stretch gap-0 overflow-hidden rounded-xl bg-popover p-0 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 [&>:last-child]:bg-popover [&>:last-child]:fill-popover'

function CartaoPerfil() {
  const [seguindo, setSeguindo] = useState(false)
  return (
    <>
      <div className="h-14 bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-500" />
      <div className="px-4 pb-4">
        <Avatar size="lg" className="-mt-6 ring-4 ring-popover">
          <AvatarFallback className="bg-rose-100 font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-300">CR</AvatarFallback>
        </Avatar>
        <div className="mt-2 font-semibold">Camila Rocha</div>
        <div className="text-xs text-muted-foreground">Head de Design · Loft</div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Cuida do design system e das jornadas de compra. Fala sobre acessibilidade.</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" /> Florianópolis, SC
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button size="sm" variant={seguindo ? 'secondary' : 'default'} onClick={() => setSeguindo((s) => !s)}>
            <UserPlus data-icon="inline-start" /> {seguindo ? 'Seguindo' : 'Seguir'}
          </Button>
          <Button size="sm" variant="outline">
            <MessageCircle data-icon="inline-start" /> Mensagem
          </Button>
        </div>
      </div>
    </>
  )
}

function CartaoVideo() {
  return (
    <>
      <div className="relative aspect-video bg-gradient-to-br from-sky-500 to-indigo-700">
        <svg viewBox="0 0 160 90" className="absolute inset-0 size-full opacity-30" aria-hidden>
          <path d="M0 70 L40 40 L70 60 L110 25 L160 55 L160 90 L0 90 Z" fill="currentColor" className="text-white" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/90 text-indigo-700 shadow">
            <Play className="ml-0.5 size-4 fill-current" />
          </span>
        </span>
        <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">12:48</span>
      </div>
      <div className="space-y-2 p-3">
        <div className="font-medium leading-snug">Como montamos o checkout com Pix em 2 semanas</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" /> Publicado há 3 dias · 8,2 mil visualizações
        </div>
        <div className="flex gap-2">
          <Button size="xs" className="flex-1">
            <Play data-icon="inline-start" /> Assistir
          </Button>
          <Button size="xs" variant="outline" className="flex-1">
            <Bookmark data-icon="inline-start" /> Ver depois
          </Button>
        </div>
      </div>
    </>
  )
}

function CartaoArquivo() {
  return (
    <div className="flex gap-3 p-3">
      <div className="flex h-20 w-16 shrink-0 flex-col gap-1 rounded-md border bg-background p-1.5">
        <span className="h-1.5 w-3/4 rounded bg-rose-400/70" />
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={cn('h-1 rounded bg-muted-foreground/25', i % 3 === 2 ? 'w-1/2' : 'w-full')} />
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">Contrato-Prestação-2026.pdf</div>
        <div className="text-xs text-muted-foreground">PDF · 4 páginas · 312 KB</div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          Abrir rápido <Kbd>Espaço</Kbd>
        </div>
      </div>
    </div>
  )
}

export default function TooltipRicoMidiaAcoes() {
  return (
    <TooltipProvider delay={150}>
      <div className="w-full max-w-lg space-y-3">
        <Linha title="Perfil com ações">
          <p className="text-sm text-muted-foreground">
            Revisado por{' '}
            <Tooltip>
              <TooltipTrigger render={<a href="#" className="font-medium text-foreground underline decoration-dotted underline-offset-4" />}>@camila.rocha</TooltipTrigger>
              <TooltipContent side="bottom" className={rico}>
                <CartaoPerfil />
              </TooltipContent>
            </Tooltip>{' '}
            ontem às 18h.
          </p>
        </Linha>

        <Linha title="Prévia de vídeo">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>
              <Link2 data-icon="inline-start" /> youtu.be/checkout-pix
            </TooltipTrigger>
            <TooltipContent side="bottom" className={rico}>
              <CartaoVideo />
            </TooltipContent>
          </Tooltip>
        </Linha>

        <Linha title="Arquivo com atalho">
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Contrato em PDF" />}>
              <FileText />
            </TooltipTrigger>
            <TooltipContent side="right" className={rico}>
              <CartaoArquivo />
            </TooltipContent>
          </Tooltip>
          <span className="text-xs text-muted-foreground">Passe o mouse nos itens para abrir.</span>
        </Linha>

        <div className="rounded-xl border border-dashed p-3">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Prévia do cartão</div>
          <div className="mx-auto w-72 overflow-hidden rounded-xl bg-popover text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10">
            <CartaoPerfil />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function Linha({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3">
      <span className="w-32 shrink-0 text-xs font-medium text-muted-foreground">{title}</span>
      <div className="flex flex-1 items-center justify-end gap-3">{children}</div>
    </div>
  )
}
