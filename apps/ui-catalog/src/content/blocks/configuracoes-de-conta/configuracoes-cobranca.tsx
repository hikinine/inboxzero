'use client'

import { CreditCard, Download, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const FATURAS = [
  { id: 'LUMI-2026-010', data: '12 out 2026', valor: 'R$ 149,00', status: 'Paga' },
  { id: 'LUMI-2026-009', data: '12 set 2026', valor: 'R$ 149,00', status: 'Paga' },
  { id: 'LUMI-2026-008', data: '12 ago 2026', valor: 'R$ 198,00', status: 'Paga' },
  { id: 'LUMI-2026-007', data: '12 jul 2026', valor: 'R$ 149,00', status: 'Falhou' },
  { id: 'LUMI-2026-006', data: '12 jun 2026', valor: 'R$ 149,00', status: 'Paga' },
] as const

export default function ConfiguracoesCobranca() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Plano e cobrança</h2>
          <p className="mt-1 text-muted-foreground">Gerencie sua assinatura, o cartão e o histórico de faturas.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Plano atual <Badge>Pro</Badge>
              </CardTitle>
              <CardDescription>Renova automaticamente em 12 nov 2026.</CardDescription>
              <CardAction>
                <div className="text-right">
                  <p className="text-2xl font-semibold tracking-tight">R$ 149</p>
                  <p className="text-xs text-muted-foreground">por mês</p>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={70} max={100} aria-label="Usuários utilizados">
                <ProgressLabel>Usuários</ProgressLabel>
                <span className="ml-auto text-sm text-muted-foreground tabular-nums">7 de 10</span>
              </Progress>
              <Progress value={60}>
                <ProgressLabel>Números de WhatsApp</ProgressLabel>
                <span className="ml-auto text-sm text-muted-foreground tabular-nums">3 de 5</span>
              </Progress>
              <Progress value={42}>
                <ProgressLabel>Mensagens de IA</ProgressLabel>
                <ProgressValue />
              </Progress>
            </CardContent>
            <CardFooter className="justify-between border-t">
              <Button variant="link" size="sm" className="px-0 text-destructive">
                Cancelar assinatura
              </Button>
              <Button variant="outline">Mudar de plano</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forma de pagamento</CardTitle>
              <CardDescription>Cobramos neste cartão a cada renovação.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="relative flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-foreground to-foreground/70">
                  <span className="absolute left-4 size-5 rounded-full bg-rose-500/90" />
                  <span className="absolute left-7 size-5 rounded-full bg-amber-400/90" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    Mastercard •••• 4242 <Badge variant="secondary">Padrão</Badge>
                  </p>
                  <p className="text-xs text-muted-foreground">Expira em 09/2028 · Ana C Souza</p>
                </div>
                <Button variant="outline" size="sm">
                  Alterar
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
                <CreditCard className="size-4" /> Nenhum cartão reserva cadastrado.
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Plus data-icon="inline-start" /> Adicionar
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t text-xs text-muted-foreground">Dados do cartão protegidos pelo nosso processador de pagamentos. Não armazenamos o número completo.</CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Faturas</CardTitle>
            <CardDescription>Histórico dos últimos 12 meses.</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">
                <Download data-icon="inline-start" /> Exportar tudo
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fatura</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FATURAS.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-mono text-xs">{f.id}</TableCell>
                    <TableCell>{f.data}</TableCell>
                    <TableCell className="tabular-nums">{f.valor}</TableCell>
                    <TableCell>
                      <Badge variant={f.status === 'Paga' ? 'secondary' : 'destructive'}>{f.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon-sm" aria-label={`Baixar fatura ${f.id}`}>
                        <Download />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
