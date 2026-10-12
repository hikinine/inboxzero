'use client'

import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Maximize2, Minus, Plus, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/components/ui/button-group'

const TOTAL = 12
const ZOOMS = [50, 75, 100, 125, 150, 200]
const PRECO = 189.9
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Janela de páginas: sempre a primeira, a última e as vizinhas da atual, com reticências entre saltos.
function janela(atual: number, total: number): (number | '…')[] {
  const base = new Set<number>([1, total, atual - 1, atual, atual + 1])
  const nums = [...base].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out: (number | '…')[] = []
  nums.forEach((n, i) => {
    const anterior = nums[i - 1]
    if (i > 0 && anterior !== undefined && n - anterior > 1) out.push('…')
    out.push(n)
  })
  return out
}

export default function ButtonGroupPaginacaoZoom() {
  const [pagina, setPagina] = useState(3)
  const [zoom, setZoom] = useState(100)
  const [qtd, setQtd] = useState(2)
  const idx = ZOOMS.indexOf(zoom)

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Paginação</Legenda>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Primeira página" disabled={pagina === 1} onClick={() => setPagina(1)}>
              <ChevronsLeft />
            </Button>
            <Button variant="outline" size="icon" aria-label="Página anterior" disabled={pagina === 1} onClick={() => setPagina((p) => p - 1)}>
              <ChevronLeft />
            </Button>
            {janela(pagina, TOTAL).map((p, i) =>
              p === '…' ? (
                <ButtonGroupText key={`e${i}`} className="w-8 justify-center px-0 text-muted-foreground">
                  …
                </ButtonGroupText>
              ) : (
                <Button
                  key={p}
                  variant={p === pagina ? 'default' : 'outline'}
                  size="icon"
                  aria-current={p === pagina ? 'page' : undefined}
                  aria-label={`Página ${p}`}
                  className="tabular-nums"
                  onClick={() => setPagina(p)}
                >
                  {p}
                </Button>
              ),
            )}
            <Button variant="outline" size="icon" aria-label="Próxima página" disabled={pagina === TOTAL} onClick={() => setPagina((p) => p + 1)}>
              <ChevronRight />
            </Button>
            <Button variant="outline" size="icon" aria-label="Última página" disabled={pagina === TOTAL} onClick={() => setPagina(TOTAL)}>
              <ChevronsRight />
            </Button>
          </ButtonGroup>
          <span className="text-xs text-muted-foreground tabular-nums">
            Página {pagina} de {TOTAL}
          </span>
        </div>
      </div>

      <div>
        <Legenda>Zoom com valor fixo no meio</Legenda>
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Diminuir zoom" disabled={idx <= 0} onClick={() => setZoom(ZOOMS[idx - 1] ?? zoom)}>
            <ZoomOut />
          </Button>
          <ButtonGroupText className="w-16 justify-center tabular-nums">{zoom}%</ButtonGroupText>
          <Button variant="outline" size="icon" aria-label="Aumentar zoom" disabled={idx >= ZOOMS.length - 1} onClick={() => setZoom(ZOOMS[idx + 1] ?? zoom)}>
            <ZoomIn />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="outline" onClick={() => setZoom(100)}>
            <Maximize2 data-icon="inline-start" /> Ajustar
          </Button>
        </ButtonGroup>
        <div className="mt-3 flex h-28 items-center justify-center overflow-hidden rounded-xl border bg-muted/40" aria-hidden>
          <div className="flex w-40 flex-col gap-2 rounded-lg border bg-card p-3 shadow-sm transition-transform" style={{ transform: `scale(${zoom / 100})` }}>
            <div className="h-2 w-20 rounded bg-foreground/70" />
            <div className="h-2 w-28 rounded bg-muted-foreground/30" />
            <div className="h-2 w-24 rounded bg-muted-foreground/30" />
            <div className="mt-1 h-5 w-16 rounded bg-primary" />
          </div>
        </div>
      </div>

      <div>
        <Legenda>Quantidade (stepper)</Legenda>
        <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Fone Bluetooth Pulse X</div>
            <div className="text-xs text-muted-foreground">{brl(PRECO)} cada</div>
          </div>
          <ButtonGroup>
            <Button variant="outline" size="icon-sm" aria-label="Diminuir quantidade" disabled={qtd <= 1} onClick={() => setQtd((q) => q - 1)}>
              <Minus />
            </Button>
            <ButtonGroupText className="w-10 justify-center text-sm tabular-nums">{qtd}</ButtonGroupText>
            <Button variant="outline" size="icon-sm" aria-label="Aumentar quantidade" disabled={qtd >= 10} onClick={() => setQtd((q) => q + 1)}>
              <Plus />
            </Button>
          </ButtonGroup>
          <div className="w-24 text-right text-sm font-semibold tabular-nums">{brl(PRECO * qtd)}</div>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
