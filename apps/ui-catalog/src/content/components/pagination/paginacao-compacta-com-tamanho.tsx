'use client'

import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

const TOTAL = 97
const TAMANHOS = [10, 25, 50, 100]

export default function PaginacaoCompactaComTamanho() {
  const [tamanho, setTamanho] = useState(10)
  const [pagina, setPagina] = useState(1)
  const [irPara, setIrPara] = useState('1')

  const paginas = Math.max(1, Math.ceil(TOTAL / tamanho))
  const atual = Math.min(pagina, paginas)
  const inicio = (atual - 1) * tamanho + 1
  const fim = Math.min(atual * tamanho, TOTAL)
  const ir = (p: number) => setPagina(Math.max(1, Math.min(paginas, p)))

  const Setas = ({ ghost }: { ghost?: boolean }) => {
    const variant = ghost ? 'ghost' : 'outline'
    return (
      <div className="flex items-center gap-1">
        {!ghost && (
          <Button size="icon-sm" variant={variant} aria-label="Primeira página" disabled={atual === 1} onClick={() => ir(1)}>
            <ChevronsLeft />
          </Button>
        )}
        <Button size="icon-sm" variant={variant} aria-label="Página anterior" disabled={atual === 1} onClick={() => ir(atual - 1)}>
          <ChevronLeft />
        </Button>
        <Button size="icon-sm" variant={variant} aria-label="Próxima página" disabled={atual === paginas} onClick={() => ir(atual + 1)}>
          <ChevronRight />
        </Button>
        {!ghost && (
          <Button size="icon-sm" variant={variant} aria-label="Última página" disabled={atual === paginas} onClick={() => ir(paginas)}>
            <ChevronsRight />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Rodapé de tabela com tamanho de página">
        <nav aria-label="Paginação" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-sm">
          <div className="flex items-center gap-2">
            <Label htmlFor="pg-tamanho" className="text-muted-foreground">
              Itens por página
            </Label>
            <NativeSelect
              id="pg-tamanho"
              size="sm"
              value={tamanho}
              onChange={(e) => {
                setTamanho(Number(e.target.value))
                setPagina(1)
              }}
            >
              {TAMANHOS.map((t) => (
                <NativeSelectOption key={t} value={t}>
                  {t}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground tabular-nums">
              {inicio}–{fim} de {TOTAL}
            </span>
            <Setas />
          </div>
        </nav>
      </Demo>

      <Demo title="Minimalista">
        <nav aria-label="Paginação" className="flex items-center justify-center gap-2 text-sm">
          <Setas ghost />
          <span className="text-muted-foreground tabular-nums">
            Página <span className="font-medium text-foreground">{atual}</span> de {paginas}
          </span>
        </nav>
      </Demo>

      <Demo title="Com salto para página">
        <nav aria-label="Paginação" className="flex flex-wrap items-center gap-3 rounded-lg border bg-card px-3 py-2 text-sm">
          <Setas />
          <form
            className="ml-auto flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              ir(Number(irPara) || 1)
            }}
          >
            <Label htmlFor="pg-ir" className="text-muted-foreground">
              Ir para
            </Label>
            <Input id="pg-ir" type="number" min={1} max={paginas} value={irPara} onChange={(e) => setIrPara(e.target.value)} className="h-7 w-16 text-center tabular-nums" />
            <span className="text-muted-foreground">de {paginas}</span>
            <Button size="sm" variant="secondary" type="submit">
              Ir
            </Button>
          </form>
        </nav>
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
