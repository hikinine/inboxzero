'use client'

import { useState, type ReactNode } from 'react'
import { FilterX, Search, SearchX, X } from 'lucide-react'
import { badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const SUGESTOES = ['relatório', 'Q3', 'financeiro']

export default function EmptyDeBuscaSemResultados() {
  const [busca, setBusca] = useState('relatório Q3 2025')
  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Busca sem resultados">
        <div className="rounded-xl border bg-card">
          <div className="border-b p-3">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar arquivos, pessoas, projetos…" aria-label="Buscar" />
              {busca && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" aria-label="Limpar busca" onClick={() => setBusca('')}>
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>
          {busca ? (
            <Empty className="py-10">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="size-12 rounded-xl [&_svg]:size-5">
                  <SearchX />
                </EmptyMedia>
                <EmptyTitle>Nenhum resultado para “{busca}”</EmptyTitle>
                <EmptyDescription>Verifique a ortografia ou tente termos mais gerais. Dica: busque por uma palavra de cada vez.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {SUGESTOES.map((s) => (
                    <button key={s} type="button" onClick={() => setBusca(s)} className={cn(badgeVariants({ variant: 'outline' }), 'hover:bg-muted')}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBusca('')}>
                    <X data-icon="inline-start" /> Limpar busca
                  </Button>
                  <Button variant="ghost" size="sm">
                    Buscar em todos os workspaces
                  </Button>
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="py-10 text-center text-sm text-muted-foreground">Digite algo para buscar.</div>
          )}
        </div>
      </Demo>

      <Demo title="Filtros sem correspondência (compacto)">
        <Empty className="flex-row items-center justify-start gap-3 border border-dashed p-4 text-left">
          <EmptyMedia variant="icon" className="mb-0">
            <FilterX />
          </EmptyMedia>
          <EmptyHeader className="items-start gap-0.5">
            <EmptyTitle>Nenhum pedido com esses filtros</EmptyTitle>
            <EmptyDescription>Status: Cancelado · Período: Hoje</EmptyDescription>
          </EmptyHeader>
          <Button variant="ghost" size="sm" className="ml-auto shrink-0">
            Limpar filtros
          </Button>
        </Empty>
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
