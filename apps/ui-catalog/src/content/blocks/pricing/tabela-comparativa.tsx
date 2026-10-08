'use client'

import { Check, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const PLANS = ['Starter', 'Pro', 'Scale']
const ROWS: Array<[string, Array<boolean | string>]> = [
  ['Números de WhatsApp', ['1', '3', 'Ilimitado']],
  ['Usuários', ['2', '10', 'Ilimitado']],
  ['Automações', [false, true, true]],
  ['IA de qualificação', [false, true, true]],
  ['Relatórios por origem', [false, true, true]],
  ['API e webhooks', [false, false, true]],
  ['SLA e gerente de conta', [false, false, true]],
]

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === 'string') return <span className="text-sm">{v}</span>
  return v ? <Check className="mx-auto size-4 text-emerald-500" /> : <Minus className="mx-auto size-4 text-muted-foreground/50" />
}

export default function TabelaComparativa() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">Compare os planos</h2>
        <div className="mt-10 overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 pl-5">Recurso</TableHead>
                {PLANS.map((p) => (
                  <TableHead key={p} className={`text-center ${p === 'Pro' ? 'text-foreground' : ''}`}>
                    {p}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map(([label, cells]) => (
                <TableRow key={label}>
                  <TableCell className="pl-5 font-medium">{label}</TableCell>
                  {cells.map((c, i) => (
                    <TableCell key={i} className={`text-center ${PLANS[i] === 'Pro' ? 'bg-muted/40' : ''}`}>
                      <Cell v={c} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="pl-5" />
                {PLANS.map((p) => (
                  <TableCell key={p} className={`text-center ${p === 'Pro' ? 'bg-muted/40' : ''}`}>
                    <Button size="sm" variant={p === 'Pro' ? 'default' : 'outline'}>
                      Assinar
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
