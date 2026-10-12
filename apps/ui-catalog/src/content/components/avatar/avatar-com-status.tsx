'use client'

import type { ReactNode } from 'react'
import { BadgeCheck, Moon } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'

const STATUS = {
  online: { label: 'Online', cor: 'bg-emerald-500' },
  ausente: { label: 'Ausente', cor: 'bg-amber-500' },
  ocupado: { label: 'Ocupado', cor: 'bg-rose-500' },
  offline: { label: 'Offline', cor: 'bg-muted-foreground/50' },
} as const
type Status = keyof typeof STATUS
const CHAVES = Object.keys(STATUS) as Status[]

const EQUIPE: { nome: string; cargo: string; status: Status }[] = [
  { nome: 'Ana Souza', cargo: 'Atendimento', status: 'online' },
  { nome: 'Bruno Rocha', cargo: 'Vendas', status: 'ausente' },
  { nome: 'Carla Mendes', cargo: 'Suporte N2', status: 'ocupado' },
  { nome: 'Diego Lima', cargo: 'Financeiro', status: 'offline' },
]

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function AvatarComStatus() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Indicadores de presença</Legenda>
        <div className="flex items-center gap-5">
          {CHAVES.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Avatar size="lg">
                <AvatarFallback>{iniciais(EQUIPE[i]?.nome ?? 'A S')}</AvatarFallback>
                <AvatarBadge className={STATUS[s].cor} />
              </Avatar>
              <span className="text-[11px] text-muted-foreground">{STATUS[s].label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Legenda>Badge com ícone ou contagem</Legenda>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary text-primary-foreground">AS</AvatarFallback>
              <AvatarBadge className="bg-sky-500 text-white">
                <BadgeCheck />
              </AvatarBadge>
            </Avatar>
            <span className="text-[11px] text-muted-foreground">Verificado</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback>BR</AvatarFallback>
              <AvatarBadge className="bg-amber-500 text-white">
                <Moon />
              </AvatarBadge>
            </Avatar>
            <span className="text-[11px] text-muted-foreground">Não perturbe</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback>CM</AvatarFallback>
              <AvatarBadge className="-right-1 -bottom-1 size-4! bg-emerald-500 text-[9px] font-semibold text-white">3</AvatarBadge>
            </Avatar>
            <span className="text-[11px] text-muted-foreground">3 novas</span>
          </div>
        </div>
      </div>

      <div>
        <Legenda>Lista da equipe</Legenda>
        <ul className="divide-y rounded-xl border">
          {EQUIPE.map((p) => (
            <li key={p.nome} className="flex items-center gap-3 px-3 py-2.5">
              <Avatar>
                <AvatarFallback>{iniciais(p.nome)}</AvatarFallback>
                <AvatarBadge className={STATUS[p.status].cor} />
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.nome}</div>
                <div className="truncate text-xs text-muted-foreground">{p.cargo}</div>
              </div>
              <span className="text-xs text-muted-foreground">{STATUS[p.status].label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
