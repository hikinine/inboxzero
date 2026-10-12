'use client'

import { useState } from 'react'
import { Ellipsis, LayoutGrid, List, Search, Table2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type Visao = 'lista' | 'grade' | 'tabela'
type Status = 'Ativa' | 'Pausada' | 'Rascunho'

interface Campanha {
  id: number
  nome: string
  canal: string
  status: Status
  orcamento: string
  conversoes: number
  resp: string
  cor: string
}

const CAMPANHAS: Campanha[] = [
  { id: 1, nome: 'Black Friday antecipada', canal: 'WhatsApp', status: 'Ativa', orcamento: 'R$ 12.000', conversoes: 348, resp: 'AS', cor: 'from-amber-500/40 to-amber-500/5' },
  { id: 2, nome: 'Reativação de inativos', canal: 'E-mail', status: 'Ativa', orcamento: 'R$ 2.400', conversoes: 126, resp: 'BR', cor: 'from-sky-500/40 to-sky-500/5' },
  { id: 3, nome: 'Lançamento do app', canal: 'Instagram', status: 'Pausada', orcamento: 'R$ 8.500', conversoes: 92, resp: 'CM', cor: 'from-rose-500/40 to-rose-500/5' },
  { id: 4, nome: 'Indicação premiada', canal: 'WhatsApp', status: 'Ativa', orcamento: 'R$ 1.800', conversoes: 211, resp: 'DL', cor: 'from-emerald-500/40 to-emerald-500/5' },
  { id: 5, nome: 'Webinar de automações', canal: 'E-mail', status: 'Rascunho', orcamento: 'R$ 0', conversoes: 0, resp: 'AS', cor: 'from-violet-500/40 to-violet-500/5' },
  { id: 6, nome: 'Remarketing de carrinho', canal: 'Instagram', status: 'Ativa', orcamento: 'R$ 5.200', conversoes: 174, resp: 'BR', cor: 'from-teal-500/40 to-teal-500/5' },
]

const STATUS: Record<Status, 'default' | 'secondary' | 'outline'> = { Ativa: 'default', Pausada: 'secondary', Rascunho: 'outline' }

export default function AlternanciaListaGrade() {
  const [visao, setVisao] = useState<Visao>('grade')

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Campanhas</h2>
            <p className="text-sm text-muted-foreground">{CAMPANHAS.length} campanhas · 4 ativas</p>
          </div>
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar campanha" className="pl-8" aria-label="Buscar campanha" />
          </div>
          <ToggleGroup
            variant="outline"
            spacing={0}
            value={[visao]}
            onValueChange={(v) => {
              const proxima = v[0]
              if (proxima === 'lista' || proxima === 'grade' || proxima === 'tabela') setVisao(proxima)
            }}
            aria-label="Modo de visualização"
          >
            <ToggleGroupItem value="lista" aria-label="Lista">
              <List />
            </ToggleGroupItem>
            <ToggleGroupItem value="grade" aria-label="Grade">
              <LayoutGrid />
            </ToggleGroupItem>
            <ToggleGroupItem value="tabela" aria-label="Tabela">
              <Table2 />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {visao === 'lista' && (
          <ItemGroup className="gap-2">
            {CAMPANHAS.map((c) => (
              <Item key={c.id} variant="outline">
                <ItemMedia>
                  <span className={cn('block size-10 rounded-md bg-gradient-to-br', c.cor)} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{c.nome}</ItemTitle>
                  <ItemDescription>
                    {c.canal} · {c.orcamento} · {c.conversoes} conversões
                  </ItemDescription>
                </ItemContent>
                <Badge variant={STATUS[c.status]}>{c.status}</Badge>
                <Avatar size="sm">
                  <AvatarFallback>{c.resp}</AvatarFallback>
                </Avatar>
                <ItemActions>
                  <Button variant="ghost" size="icon-sm" aria-label={`Ações de ${c.nome}`}>
                    <Ellipsis />
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        )}

        {visao === 'grade' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPANHAS.map((c) => (
              <article key={c.id} className="overflow-hidden rounded-xl border bg-card">
                <div className={cn('flex h-24 items-start justify-between bg-gradient-to-br p-3', c.cor)}>
                  <Badge variant={STATUS[c.status]}>{c.status}</Badge>
                  <Button variant="ghost" size="icon-sm" aria-label={`Ações de ${c.nome}`}>
                    <Ellipsis />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{c.nome}</h3>
                  <p className="text-sm text-muted-foreground">{c.canal}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Conversões</p>
                      <p className="text-lg font-semibold tabular-nums">{c.conversoes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Orçamento</p>
                      <p className="text-sm font-medium tabular-nums">{c.orcamento}</p>
                    </div>
                    <Avatar size="sm">
                      <AvatarFallback>{c.resp}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {visao === 'tabela' && (
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campanha</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Orçamento</TableHead>
                  <TableHead className="text-right">Conversões</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {CAMPANHAS.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.nome}</TableCell>
                    <TableCell>{c.canal}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS[c.status]}>{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{c.orcamento}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.conversoes}</TableCell>
                    <TableCell>
                      <Avatar size="sm">
                        <AvatarFallback>{c.resp}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm" aria-label={`Ações de ${c.nome}`}>
                        <Ellipsis />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  )
}
