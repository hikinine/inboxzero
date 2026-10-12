'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const COLUNAS = ['Pedido', 'Cliente', 'Status', 'Data', 'Total']
const LARGURAS = ['w-24', 'w-32', 'w-20', 'w-28', 'w-16']
const BARRAS = [30, 50, 40, 70, 60, 85, 55, 95]

export default function SkeletonTabela() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Cards de métricas</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3 rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="size-4 rounded-full" />
              </div>
              <Skeleton className="h-7 w-28" />
              <div className="flex h-8 items-end gap-1">
                {BARRAS.map((h, j) => (
                  <Skeleton key={j} className="w-full rounded-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Tabela</p>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b p-3">
            <Skeleton className="h-8 w-56" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 pl-3">
                  <Skeleton className="size-4" />
                </TableHead>
                {COLUNAS.map((c) => (
                  <TableHead key={c} className={c === 'Total' ? 'pr-3 text-right' : ''}>
                    {c}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {LARGURAS.map((w, r) => (
                <TableRow key={r}>
                  <TableCell className="pl-3">
                    <Skeleton className="size-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3.5 w-16" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-6 rounded-full" />
                      <Skeleton className={`h-3.5 ${w}`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3.5 w-20" />
                  </TableCell>
                  <TableCell className="pr-3">
                    <Skeleton className="ml-auto h-3.5 w-16" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t p-3">
            <Skeleton className="h-3 w-32" />
            <div className="flex gap-1">
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
