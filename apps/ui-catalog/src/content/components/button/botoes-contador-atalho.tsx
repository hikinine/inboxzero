'use client'

import { useState, type ReactNode } from 'react'
import { Bell, Bold, Heart, Italic, Link2, MessageSquare, Save, Search, Send, Star, Undo2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil` : String(n))

export default function BotoesContadorAtalho() {
  const [curtiu, setCurtiu] = useState(false)
  const [favoritou, setFavoritou] = useState(true)
  const [naoLidas, setNaoLidas] = useState(4)
  const curtidas = 127 + (curtiu ? 1 : 0)
  const estrelas = 2417 + (favoritou ? 1 : 0)

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Com contador</Legenda>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" aria-pressed={curtiu} onClick={() => setCurtiu((v) => !v)}>
            <Heart data-icon="inline-start" className={cn(curtiu && 'fill-rose-500 text-rose-500')} />
            Curtir
            <span className="ml-0.5 text-muted-foreground tabular-nums">{curtidas}</span>
          </Button>
          <Button variant="secondary">
            <MessageSquare data-icon="inline-start" /> Comentários
            <Badge className="min-w-5 justify-center px-1 tabular-nums">24</Badge>
          </Button>
          <ButtonGroup>
            <Button variant="outline" aria-pressed={favoritou} onClick={() => setFavoritou((v) => !v)}>
              <Star data-icon="inline-start" className={cn(favoritou && 'fill-amber-400 text-amber-400')} />
              {favoritou ? 'Favoritado' : 'Favoritar'}
            </Button>
            <ButtonGroupText className="tabular-nums">{fmt(estrelas)}</ButtonGroupText>
          </ButtonGroup>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={naoLidas ? `${naoLidas} notificações não lidas` : 'Notificações'}
            onClick={() => setNaoLidas(0)}
          >
            <Bell />
            {naoLidas > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-white tabular-nums">
                {naoLidas}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div>
        <Legenda>Com atalho de teclado</Legenda>
        <div className="flex flex-wrap items-center gap-2">
          <Button>
            <Send data-icon="inline-start" /> Enviar
            <Kbd className="bg-primary-foreground/20 text-primary-foreground">⌘↵</Kbd>
          </Button>
          <Button variant="outline">
            <Save data-icon="inline-start" /> Salvar
            <Kbd>⌘S</Kbd>
          </Button>
          <Button variant="outline" className="w-56 justify-start font-normal text-muted-foreground">
            <Search data-icon="inline-start" /> Buscar…
            <KbdGroup className="ml-auto">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
          <Button variant="ghost">
            <Undo2 data-icon="inline-start" /> Desfazer
            <Kbd>⌘Z</Kbd>
          </Button>
        </div>
      </div>

      <div>
        <Legenda>Só ícone com tooltip e atalho</Legenda>
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-1 rounded-lg border p-1">
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Negrito" />}>
                <Bold />
              </TooltipTrigger>
              <TooltipContent>
                Negrito <Kbd>⌘B</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Itálico" />}>
                <Italic />
              </TooltipTrigger>
              <TooltipContent>
                Itálico <Kbd>⌘I</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Inserir link" />}>
                <Link2 />
              </TooltipTrigger>
              <TooltipContent>
                Inserir link <Kbd>⌘K</Kbd>
              </TooltipContent>
            </Tooltip>
            <span className="ml-2 text-xs text-muted-foreground">passe o mouse</span>
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
