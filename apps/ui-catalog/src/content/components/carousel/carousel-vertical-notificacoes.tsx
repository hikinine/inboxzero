'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, CircleCheck, CreditCard, MessageSquare, Pause, Play, TriangleAlert, UserPlus, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, useCarousel, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Notificacao {
  id: number
  icon: LucideIcon
  classe: string
  titulo: string
  texto: string
  quando: string
}
const NOTIFICACOES: Notificacao[] = [
  { id: 1, icon: MessageSquare, classe: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', titulo: 'Ana Souza respondeu', texto: '“Conseguem enviar a proposta revisada até sexta?”', quando: 'há 2 min' },
  { id: 2, icon: CreditCard, classe: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', titulo: 'Pagamento confirmado', texto: 'Pedido #48213 · R$ 1.290,00 via Pix.', quando: 'há 25 min' },
  { id: 3, icon: UserPlus, classe: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', titulo: 'Novo membro na equipe', texto: 'Diego Lima aceitou o convite para Vendas · Sul.', quando: 'há 1 h' },
  { id: 4, icon: TriangleAlert, classe: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', titulo: 'Integração com problema', texto: 'O token do Google Agenda expirou. Reconecte para continuar.', quando: 'há 3 h' },
  { id: 5, icon: CircleCheck, classe: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', titulo: 'Automação concluída', texto: '“Boas-vindas” enviou 48 mensagens sem erros.', quando: 'ontem' },
]

function Controles({ atual, total, auto, onAuto }: { atual: number; total: number; auto: boolean; onAuto: () => void }) {
  const { scrollPrev, scrollNext } = useCarousel()
  return (
    <div className="flex items-center gap-0.5">
      <span className="mr-1 text-xs text-muted-foreground tabular-nums">
        {atual + 1}/{total}
      </span>
      <Button variant="ghost" size="icon-xs" aria-label="Anterior" onClick={scrollPrev}>
        <ChevronUp />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label="Próxima" onClick={scrollNext}>
        <ChevronDown />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label={auto ? 'Pausar rolagem automática' : 'Rolar automaticamente'} aria-pressed={auto} onClick={onAuto}>
        {auto ? <Pause /> : <Play />}
      </Button>
    </div>
  )
}

export default function CarouselVerticalNotificacoes() {
  const [api, setApi] = useState<CarouselApi>()
  const [atual, setAtual] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setAtual(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || !auto) return
    const t = setInterval(() => api.scrollNext(), 3000)
    return () => clearInterval(t)
  }, [api, auto])

  return (
    <Carousel setApi={setApi} orientation="vertical" opts={{ loop: true, align: 'start' }} className="w-full max-w-sm rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          Notificações
          <span className="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground tabular-nums">{NOTIFICACOES.length}</span>
        </div>
        <Controles atual={atual} total={NOTIFICACOES.length} auto={auto} onAuto={() => setAuto((v) => !v)} />
      </div>
      <CarouselContent className="-mt-0 h-[208px]">
        {NOTIFICACOES.map((n) => (
          <CarouselItem key={n.id} className="basis-1/2 pt-0">
            <div className="flex h-full items-start gap-3 border-b px-3 py-3">
              <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', n.classe)}>
                <n.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-medium">{n.titulo}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{n.quando}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.texto}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex gap-1" role="tablist" aria-label="Posição">
          {NOTIFICACOES.map((n, i) => (
            <button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={i === atual}
              aria-label={`Ir para a notificação ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn('h-1.5 rounded-full transition-all', i === atual ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70')}
            />
          ))}
        </div>
        <Button variant="link" size="xs" className="h-auto p-0">
          Ver todas
        </Button>
      </div>
    </Carousel>
  )
}
