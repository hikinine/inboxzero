'use client'

import { Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Status = 'Paga' | 'Pendente' | 'Vencida' | 'Cancelada'

interface Fatura {
  numero: string
  emissao: string
  vencimento: string
  valor: number
  status: Status
}

const FATURAS: Fatura[] = [
  { numero: 'FAT-2026-0142', emissao: '01/10/2026', vencimento: '10/10/2026', valor: 1290, status: 'Paga' },
  { numero: 'FAT-2026-0141', emissao: '01/09/2026', vencimento: '10/09/2026', valor: 1290, status: 'Paga' },
  { numero: 'FAT-2026-0137', emissao: '15/08/2026', vencimento: '25/08/2026', valor: 349.9, status: 'Pendente' },
  { numero: 'FAT-2026-0130', emissao: '01/08/2026', vencimento: '10/08/2026', valor: 2480, status: 'Vencida' },
  { numero: 'FAT-2026-0126', emissao: '15/07/2026', vencimento: '25/07/2026', valor: 99, status: 'Cancelada' },
]

const PONTO: Record<Status, string> = {
  Paga: 'bg-emerald-500',
  Pendente: 'bg-amber-500',
  Vencida: 'bg-rose-500',
  Cancelada: 'bg-muted-foreground/50',
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const TOTAL = FATURAS.filter((f) => f.status !== 'Cancelada').reduce((a, f) => a + f.valor, 0)

export default function TabelaFaturas() {
  return (
    <div className="w-full max-w-2xl rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div>
          <h3 className="text-sm font-medium">Faturas</h3>
          <p className="text-xs text-muted-foreground">Histórico de cobranças do plano Pro.</p>
        </div>
        <Button variant="outline" size="sm">
          <Download data-icon="inline-start" /> Exportar
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Nº</TableHead>
            <TableHead>Emissão</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-12 pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {FATURAS.map((f) => (
            <TableRow key={f.numero}>
              <TableCell className="pl-4 font-mono text-xs">{f.numero}</TableCell>
              <TableCell className="text-muted-foreground">{f.emissao}</TableCell>
              <TableCell className={f.status === 'Vencida' ? 'text-destructive' : 'text-muted-foreground'}>{f.vencimento}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span className={`size-1.5 rounded-full ${PONTO[f.status]}`} aria-hidden /> {f.status}
                </Badge>
              </TableCell>
              <TableCell className={`text-right tabular-nums ${f.status === 'Cancelada' ? 'text-muted-foreground line-through' : ''}`}>{brl.format(f.valor)}</TableCell>
              <TableCell className="pr-4 text-right">
                <Button variant="ghost" size="icon-sm" aria-label={`Baixar ${f.numero}`} disabled={f.status === 'Cancelada'}>
                  <Download />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="pl-4">
              Total do período
            </TableCell>
            <TableCell className="text-right tabular-nums">{brl.format(TOTAL)}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
