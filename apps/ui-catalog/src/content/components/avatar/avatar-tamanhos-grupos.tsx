'use client'

import type { ReactNode } from 'react'
import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'

const PESSOAS = [
  { nome: 'Ana Souza', cor: 'bg-sky-500/20 text-sky-700 dark:text-sky-300' },
  { nome: 'Bruno Rocha', cor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
  { nome: 'Carla Mendes', cor: 'bg-amber-500/20 text-amber-700 dark:text-amber-300' },
  { nome: 'Diego Lima', cor: 'bg-rose-500/20 text-rose-700 dark:text-rose-300' },
  { nome: 'Elisa Prado', cor: 'bg-violet-500/20 text-violet-700 dark:text-violet-300' },
]
const TAMANHOS = ['sm', 'default', 'lg'] as const
const iniciais = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function AvatarTamanhosGrupos() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Tamanhos</Legenda>
        <div className="flex items-end gap-4">
          {TAMANHOS.map((t) => (
            <div key={t} className="flex flex-col items-center gap-1.5">
              <Avatar size={t}>
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="text-[11px] text-muted-foreground">{t}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5">
            <Avatar className="size-14">
              <AvatarFallback className="text-base">AS</AvatarFallback>
            </Avatar>
            <span className="text-[11px] text-muted-foreground">size-14</span>
          </div>
        </div>
      </div>

      <div>
        <Legenda>Fallbacks</Legenda>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback className="bg-primary text-primary-foreground">BR</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback className="bg-gradient-to-br from-sky-500 to-indigo-500 text-white">CM</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          <Avatar size="lg" className="rounded-lg after:rounded-lg">
            <AvatarFallback className="rounded-lg">DL</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <Legenda>Grupo com contagem</Legenda>
        <AvatarGroup>
          {PESSOAS.slice(0, 4).map((p) => (
            <Avatar key={p.nome}>
              <AvatarFallback className={p.cor}>{iniciais(p.nome)}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+12</AvatarGroupCount>
        </AvatarGroup>
      </div>

      <div>
        <Legenda>Grupos grande e pequeno</Legenda>
        <div className="flex flex-wrap items-center gap-6">
          <AvatarGroup>
            {PESSOAS.slice(0, 3).map((p) => (
              <Avatar key={p.nome} size="lg">
                <AvatarFallback className={p.cor}>{iniciais(p.nome)}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
          <div className="flex items-center gap-2">
            <AvatarGroup>
              {PESSOAS.map((p) => (
                <Avatar key={p.nome} size="sm">
                  <AvatarFallback className={p.cor}>{iniciais(p.nome)}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <span className="text-xs text-muted-foreground">5 participantes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
