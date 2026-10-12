'use client'

import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const TOTAL = 24
const POR_PAGINA = 25
const ITENS = 587

const limitar = (p: number) => Math.max(1, Math.min(TOTAL, p))

export default function PaginacaoIrParaPagina() {
  const [a, setA] = useState(7)
  const [rascunho, setRascunho] = useState('7')
  const [b, setB] = useState(3)
  const [c, setC] = useState(12)

  const irA = (p: number) => {
    const n = limitar(p)
    setA(n)
    setRascunho(String(n))
  }

  return (
    <div className="w-full max-w-lg space-y-7">
      <Demo title="Página atual editável no meio">
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text="Anterior"
                aria-label="Página anterior"
                className={cn(a === 1 && 'pointer-events-none opacity-50')}
                onClick={(e) => {
                  e.preventDefault()
                  irA(a - 1)
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <form
                className="flex items-center gap-1.5 text-sm"
                onSubmit={(e) => {
                  e.preventDefault()
                  irA(Number(rascunho) || 1)
                }}
              >
                <Label htmlFor="pg-atual" className="sr-only">
                  Página
                </Label>
                <Input id="pg-atual" inputMode="numeric" value={rascunho} onChange={(e) => setRascunho(e.target.value.replace(/\D/g, ''))} onBlur={() => irA(Number(rascunho) || a)} className="h-8 w-12 text-center font-medium tabular-nums" />
                <span className="text-muted-foreground">de {TOTAL}</span>
              </form>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                text="Próxima"
                aria-label="Próxima página"
                className={cn(a === TOTAL && 'pointer-events-none opacity-50')}
                onClick={(e) => {
                  e.preventDefault()
                  irA(a + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Demo title="Seleção direta da página">
        <nav aria-label="Paginação" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-sm">
          <span className="text-muted-foreground tabular-nums">
            {(b - 1) * POR_PAGINA + 1}–{Math.min(b * POR_PAGINA, ITENS)} de {ITENS} contatos
          </span>
          <div className="flex items-center gap-2">
            <NativeSelect size="sm" value={b} onChange={(e) => setB(Number(e.target.value))} aria-label="Ir para a página">
              {Array.from({ length: TOTAL }, (_, i) => (
                <NativeSelectOption key={i + 1} value={i + 1}>
                  Página {i + 1}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <ButtonGroup>
              <Button size="icon-sm" variant="outline" aria-label="Página anterior" disabled={b === 1} onClick={() => setB((p) => limitar(p - 1))}>
                <ChevronLeft />
              </Button>
              <Button size="icon-sm" variant="outline" aria-label="Próxima página" disabled={b === TOTAL} onClick={() => setB((p) => limitar(p + 1))}>
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </div>
        </nav>
      </Demo>

      <Demo title="Com teclado (foque e use as setas)">
        <nav
          aria-label="Paginação"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setC((p) => limitar(p - 1))
            if (e.key === 'ArrowRight') setC((p) => limitar(p + 1))
            if (e.key === 'Home') setC(1)
            if (e.key === 'End') setC(TOTAL)
          }}
          className="flex flex-wrap items-center gap-3 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ButtonGroup>
            <Button size="icon-sm" variant="outline" aria-label="Primeira página" disabled={c === 1} onClick={() => setC(1)}>
              <ChevronsLeft />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Página anterior" disabled={c === 1} onClick={() => setC((p) => limitar(p - 1))}>
              <ChevronLeft />
            </Button>
            <Button size="sm" variant="outline" className="pointer-events-none w-24 font-normal tabular-nums">
              {c} / {TOTAL}
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Próxima página" disabled={c === TOTAL} onClick={() => setC((p) => limitar(p + 1))}>
              <ChevronRight />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Última página" disabled={c === TOTAL} onClick={() => setC(TOTAL)}>
              <ChevronsRight />
            </Button>
          </ButtonGroup>
          <span className="ml-auto hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <Kbd>←</Kbd>
            <Kbd>→</Kbd> navegar · <Kbd>Home</Kbd>
            <Kbd>End</Kbd> extremos
          </span>
        </nav>
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
