'use client'

import type { LucideIcon } from 'lucide-react'
import { Archive, FileText, Inbox, Plug, Search, Send, ShieldAlert, Upload } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Pasta {
  Icon: LucideIcon
  nome: string
  qtd: number
  ativa?: boolean
}

const PASTAS: Pasta[] = [
  { Icon: Inbox, nome: 'Caixa de entrada', qtd: 0, ativa: true },
  { Icon: Send, nome: 'Enviadas', qtd: 12 },
  { Icon: FileText, nome: 'Rascunhos', qtd: 2 },
  { Icon: Archive, nome: 'Arquivadas', qtd: 48 },
  { Icon: ShieldAlert, nome: 'Spam', qtd: 3 },
]

export default function EstadoVazioInbox() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid min-h-[480px] overflow-hidden rounded-xl border bg-card md:grid-cols-[220px_1fr]">
          <aside className="border-b bg-muted/30 md:border-r md:border-b-0">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Vendas</p>
                <p className="text-xs text-muted-foreground">Caixa compartilhada</p>
              </div>
              <Badge variant="outline">3 online</Badge>
            </div>
            <nav className="px-2 pb-3">
              {PASTAS.map((p) => (
                <a key={p.nome} href="#" className={cn('flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted', p.ativa ? 'bg-muted font-medium' : 'text-muted-foreground')}>
                  <p.Icon className="size-4" />
                  <span className="flex-1">{p.nome}</span>
                  {p.qtd > 0 && <span className="text-xs tabular-nums">{p.qtd}</span>}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b px-4 py-2.5">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar conversas" className="pl-8" aria-label="Buscar conversas" />
              </div>
              <Button variant="outline" size="sm">
                Filtros
              </Button>
              <Button size="sm">Nova conversa</Button>
            </div>

            <Empty className="flex-1 border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="size-12 [&_svg:not([class*='size-'])]:size-6">
                  <Inbox />
                </EmptyMedia>
                <EmptyTitle className="text-base">Nenhuma conversa aberta</EmptyTitle>
                <EmptyDescription>Quando um cliente escrever pelo WhatsApp, Instagram ou e-mail, a conversa aparece aqui para o time responder.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button>
                    <Plug data-icon="inline-start" /> Conectar canal
                  </Button>
                  <Button variant="outline">
                    <Upload data-icon="inline-start" /> Importar contatos
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Você já conectou 2 de 3 canais do plano.</p>
              </EmptyContent>
            </Empty>
          </div>
        </div>
      </div>
    </section>
  )
}
