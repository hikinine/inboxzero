'use client'

import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

type Pagina = number | '…'

// Janela de páginas com reticências: sempre a primeira, a última e as vizinhas da atual.
function janela(atual: number, total: number, vizinhas = 1): Pagina[] {
  if (total <= 5 + vizinhas * 2) return Array.from({ length: total }, (_, i) => i + 1)
  const paginas = new Set<number>([1, total])
  for (let p = atual - vizinhas; p <= atual + vizinhas; p++) if (p >= 1 && p <= total) paginas.add(p)
  if (atual <= 2 + vizinhas) for (let p = 2; p <= 3 + vizinhas; p++) paginas.add(p)
  if (atual >= total - 1 - vizinhas) for (let p = total - 2 - vizinhas; p < total; p++) paginas.add(p)
  const ordenadas = [...paginas].sort((a, b) => a - b)
  const out: Pagina[] = []
  ordenadas.forEach((p, i) => {
    if (i > 0 && p - ordenadas[i - 1] > 1) out.push('…')
    out.push(p)
  })
  return out
}

function Numeros({ atual, total, onChange, size }: { atual: number; total: number; onChange: (p: number) => void; size?: 'icon' | 'icon-sm' }) {
  return (
    <>
      {janela(atual, total).map((p, i) =>
        p === '…' ? (
          <PaginationItem key={`e${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              size={size}
              isActive={p === atual}
              onClick={(e) => {
                e.preventDefault()
                onChange(p)
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ),
      )}
    </>
  )
}

export default function PaginacaoNumerica() {
  const [a, setA] = useState(5)
  const [b, setB] = useState(1)
  const [c, setC] = useState(3)
  const TOTAL_A = 24
  const TOTAL_B = 9
  const TOTAL_C = 12
  const POR_PAGINA = 20
  const TOTAL_ITENS = 237

  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Completa (anterior / próxima com texto)">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text="Anterior"
                aria-label="Página anterior"
                aria-disabled={a === 1}
                className={cn(a === 1 && 'pointer-events-none opacity-50')}
                onClick={(e) => {
                  e.preventDefault()
                  setA((p) => Math.max(1, p - 1))
                }}
              />
            </PaginationItem>
            <Numeros atual={a} total={TOTAL_A} onChange={setA} />
            <PaginationItem>
              <PaginationNext
                href="#"
                text="Próxima"
                aria-label="Próxima página"
                aria-disabled={a === TOTAL_A}
                className={cn(a === TOTAL_A && 'pointer-events-none opacity-50')}
                onClick={(e) => {
                  e.preventDefault()
                  setA((p) => Math.min(TOTAL_A, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Demo title="Compacta (só ícones)">
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon-sm"
                aria-label="Página anterior"
                className={cn(b === 1 && 'pointer-events-none opacity-50')}
                onClick={(e) => {
                  e.preventDefault()
                  setB((p) => Math.max(1, p - 1))
                }}
              >
                <ChevronLeft />
              </PaginationLink>
            </PaginationItem>
            <Numeros atual={b} total={TOTAL_B} onChange={setB} size="icon-sm" />
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon-sm"
                aria-label="Próxima página"
                className={cn(b === TOTAL_B && 'pointer-events-none opacity-50')}
                onClick={(e) => {
                  e.preventDefault()
                  setB((p) => Math.min(TOTAL_B, p + 1))
                }}
              >
                <ChevronRight />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Demo title="Com resumo dos resultados">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2">
          <span className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium text-foreground tabular-nums">{(c - 1) * POR_PAGINA + 1}–{Math.min(c * POR_PAGINA, TOTAL_ITENS)}</span> de <span className="font-medium text-foreground tabular-nums">{TOTAL_ITENS}</span> contatos
          </span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="icon-sm"
                  aria-label="Página anterior"
                  className={cn(c === 1 && 'pointer-events-none opacity-50')}
                  onClick={(e) => {
                    e.preventDefault()
                    setC((p) => Math.max(1, p - 1))
                  }}
                >
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
              <Numeros atual={c} total={TOTAL_C} onChange={setC} size="icon-sm" />
              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="icon-sm"
                  aria-label="Próxima página"
                  className={cn(c === TOTAL_C && 'pointer-events-none opacity-50')}
                  onClick={(e) => {
                    e.preventDefault()
                    setC((p) => Math.min(TOTAL_C, p + 1))
                  }}
                >
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
