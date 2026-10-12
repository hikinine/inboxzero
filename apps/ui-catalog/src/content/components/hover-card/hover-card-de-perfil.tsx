'use client'

import { useState, type ReactNode } from 'react'
import { CalendarDays, MapPin, MessageSquare } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface Perfil {
  nome: string
  handle: string
  ini: string
  cargo: string
  bio: string
  cidade: string
  seguidores: string
  seguindo: string
  desde: string
}

const PERFIS: Record<string, Perfil> = {
  anasouza: { nome: 'Ana Souza', handle: 'anasouza', ini: 'AS', cargo: 'Head de Vendas · Lumi', bio: 'Pipeline, café e follow-up. Escrevo sobre vendas B2B e liderança de times comerciais.', cidade: 'São Paulo, SP', seguidores: '2,4 mil', seguindo: '312', desde: 'mar. 2021' },
  brunorocha: { nome: 'Bruno Rocha', handle: 'brunorocha', ini: 'BR', cargo: 'Engenheiro de Software', bio: 'Construindo o CRM da Lumi. TypeScript, Postgres e muita automação.', cidade: 'Florianópolis, SC', seguidores: '987', seguindo: '140', desde: 'jul. 2022' },
}

function CardPerfil({ p, compacto }: { p: Perfil; compacto?: boolean }) {
  const [seguindo, setSeguindo] = useState(false)
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <Avatar size="lg">
          <AvatarFallback>{p.ini}</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
        <div className="flex gap-1.5">
          {compacto && (
            <Button size="icon-xs" variant="outline" aria-label="Enviar mensagem">
              <MessageSquare />
            </Button>
          )}
          <Button size="xs" variant={seguindo ? 'outline' : 'default'} onClick={() => setSeguindo((s) => !s)}>
            {seguindo ? 'Seguindo' : 'Seguir'}
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-sm font-medium">{p.nome}</div>
        <div className="text-xs text-muted-foreground">
          @{p.handle} · {p.cargo}
        </div>
      </div>
      {!compacto && <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>}
      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">{p.seguidores}</span> seguidores
        </span>
        <span>
          <span className="font-medium text-foreground">{p.seguindo}</span> seguindo
        </span>
      </div>
      {!compacto && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {p.cidade}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" /> Desde {p.desde}
          </span>
        </div>
      )}
    </div>
  )
}

function Mencao({ id }: { id: keyof typeof PERFIS }) {
  const p = PERFIS[id]
  return (
    <HoverCard>
      <HoverCardTrigger href="#" delay={200} className="font-medium text-primary underline-offset-4 hover:underline">
        @{p.handle}
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-4" align="start">
        <CardPerfil p={p} />
      </HoverCardContent>
    </HoverCard>
  )
}

export default function HoverCardDePerfil() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Gatilho (passe o mouse na menção)">
        <div className="flex gap-3 rounded-xl border bg-card p-4 text-sm">
          <Avatar>
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-medium">Carla Mendes</span>
              <span className="text-xs text-muted-foreground">há 12 min</span>
            </div>
            <p className="mt-1 leading-relaxed">
              Proposta revisada por <Mencao id="anasouza" /> e <Mencao id="brunorocha" />. Podemos enviar para o cliente ainda hoje?
            </p>
          </div>
        </div>
      </Demo>

      <Demo title="Conteúdo (inline)">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <CardPerfil p={PERFIS.anasouza} />
          </div>
          <div className="self-start rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <CardPerfil p={PERFIS.brunorocha} compacto />
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
