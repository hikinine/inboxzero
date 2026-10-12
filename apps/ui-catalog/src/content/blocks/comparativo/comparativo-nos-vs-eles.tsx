'use client'

import { Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Cell = boolean | string

interface Row {
  feature: string
  us: Cell
  them: Cell
}

const ROWS: Row[] = [
  { feature: 'Inbox unificado (WhatsApp, Instagram, e-mail)', us: true, them: 'Só e-mail' },
  { feature: 'Qualificação de leads com IA', us: true, them: false },
  { feature: 'Usuários inclusos', us: 'Ilimitados', them: 'Até 3' },
  { feature: 'Automações por mês', us: 'Ilimitadas', them: '10' },
  { feature: 'WhatsApp oficial (API da Meta)', us: true, them: 'Via terceiros' },
  { feature: 'Suporte em português', us: '24/7, humano', them: 'Horário comercial' },
  { feature: 'Taxa de implantação', us: 'R$ 0', them: 'R$ 1.990,00' },
  { feature: 'Fidelidade', us: false, them: '12 meses' },
]

function CellValue({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <Check className="size-3.5" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <X className="size-3.5" />
      </span>
    )
  }
  return <span className={highlight ? 'font-medium text-foreground' : 'text-muted-foreground'}>{value}</span>
}

export default function ComparativoNosVsEles() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Comparativo</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Por que times trocam o CRM antigo pela Clickmax</h2>
          <p className="mt-3 text-muted-foreground">Sem letra miúda: o que vem incluso de verdade em cada opção.</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-14 w-1/2 pl-5 text-sm">Recurso</TableHead>
                <TableHead className="h-14 bg-primary/5 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <span className="size-4 rounded bg-primary" /> Clickmax
                    </span>
                    <Badge className="h-4 px-1.5 text-[10px]">Recomendado</Badge>
                  </div>
                </TableHead>
                <TableHead className="h-14 text-center text-sm">Outros CRMs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.feature}>
                  <TableCell className="py-3.5 pl-5 text-sm">{r.feature}</TableCell>
                  <TableCell className="bg-primary/5 py-3.5 text-center">
                    <CellValue value={r.us} highlight />
                  </TableCell>
                  <TableCell className="py-3.5 text-center">
                    <CellValue value={r.them} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <Button size="lg">Começar grátis por 14 dias</Button>
          <p className="text-xs text-muted-foreground">Comparação feita em outubro de 2026 com os planos de entrada mais vendidos.</p>
        </div>
      </div>
    </section>
  )
}
