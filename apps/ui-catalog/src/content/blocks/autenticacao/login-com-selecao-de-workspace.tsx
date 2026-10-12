'use client'

import { useState } from 'react'
import { Check, ChevronRight, Plus, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface Workspace {
  id: string
  nome: string
  ini: string
  cor: string
  membros: number
  papel: 'Admin' | 'Membro' | 'Convidado'
  convite?: boolean
}

const WORKSPACES: Workspace[] = [
  { id: 'nuvemfit', nome: 'Nuvem Fit', ini: 'NF', cor: 'bg-emerald-500', membros: 14, papel: 'Admin' },
  { id: 'casaprisma', nome: 'Casa Prisma', ini: 'CP', cor: 'bg-sky-500', membros: 6, papel: 'Membro' },
  { id: 'donaflor', nome: 'Dona Flor Confeitaria', ini: 'DF', cor: 'bg-rose-500', membros: 3, papel: 'Membro' },
  { id: 'trilha', nome: 'Trilha Educação', ini: 'TE', cor: 'bg-violet-500', membros: 22, papel: 'Convidado', convite: true },
]

export default function LoginComSelecaoDeWorkspace() {
  const [sel, setSel] = useState('nuvemfit')
  const [entrando, setEntrando] = useState(false)
  const atual = WORKSPACES.find((w) => w.id === sel) ?? WORKSPACES[0]!

  return (
    <section className="flex w-full min-h-[600px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Entrando como</p>
            <p className="truncate text-sm font-medium">ana@nuvemfit.com.br</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            Trocar
          </Button>
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Escolha um workspace</h1>
        <p className="mt-1 text-sm text-muted-foreground">Você faz parte de {WORKSPACES.length} workspaces. Dá para alternar depois, no menu da conta.</p>

        <ul className="mt-6 space-y-2" role="radiogroup" aria-label="Workspaces">
          {WORKSPACES.map((w) => {
            const isSel = w.id === sel
            return (
              <li key={w.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSel}
                  disabled={entrando}
                  onClick={() => setSel(w.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border bg-card p-3 text-left transition-all',
                    isSel ? 'border-primary ring-2 ring-primary/20' : 'hover:border-foreground/20 hover:bg-muted/40',
                    entrando && 'opacity-60',
                  )}
                >
                  <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white', w.cor)}>{w.ini}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{w.nome}</span>
                      {w.convite && <Badge variant="secondary">Convite</Badge>}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="size-3" /> {w.membros} membros · {w.papel}
                    </span>
                  </span>
                  {isSel ? (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  ) : (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <Button className="mt-5 w-full" disabled={entrando} onClick={() => setEntrando(true)}>
          {entrando ? (
            <>
              <Spinner data-icon="inline-start" aria-label="Carregando" /> Entrando em {atual.nome}…
            </>
          ) : atual.convite ? (
            `Aceitar convite e entrar em ${atual.nome}`
          ) : (
            `Continuar em ${atual.nome}`
          )}
        </Button>

        <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <Plus className="size-4" /> Criar um novo workspace
        </button>
      </div>
    </section>
  )
}
