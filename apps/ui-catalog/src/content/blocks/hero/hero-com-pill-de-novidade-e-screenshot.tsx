'use client'

import { ArrowRight, Bell, Filter, Plus, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PEDIDOS = [
  { id: '#10482', cliente: 'Marina Castro', cidade: 'Curitiba, PR', status: 'Enviado', cor: 'bg-sky-500', valor: 'R$ 389,90', entrega: 'qui, 14 nov' },
  { id: '#10481', cliente: 'João Pedro Alves', cidade: 'Belo Horizonte, MG', status: 'Separando', cor: 'bg-amber-500', valor: 'R$ 1.249,00', entrega: 'sex, 15 nov' },
  { id: '#10480', cliente: 'Renata Assis', cidade: 'Recife, PE', status: 'Entregue', cor: 'bg-emerald-500', valor: 'R$ 212,50', entrega: 'ter, 12 nov' },
  { id: '#10479', cliente: 'Padaria Dona Nena', cidade: 'Porto Alegre, RS', status: 'Pago', cor: 'bg-violet-500', valor: 'R$ 2.980,00', entrega: 'seg, 18 nov' },
  { id: '#10478', cliente: 'Lumi Tecnologia', cidade: 'São Paulo, SP', status: 'Enviado', cor: 'bg-sky-500', valor: 'R$ 5.400,00', entrega: 'qua, 13 nov' },
]

const NAV = ['Pedidos', 'Produtos', 'Clientes', 'Relatórios']

export default function HeroComPillDeNovidadeEScreenshot() {
  return (
    <section className="w-full overflow-hidden px-6 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-sm shadow-sm transition-colors hover:bg-muted">
            <Badge>Novo</Badge>
            <span>Versão 2.0 com rastreio em tempo real</span>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </a>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Gestão de pedidos que{' '}
            <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">acompanha o seu ritmo</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Do pagamento à entrega, cada pedido no lugar certo. A Despacha organiza a fila, imprime etiquetas e avisa o cliente sem você precisar abrir outra aba.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              Criar conta grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              Falar com um especialista
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">14 dias grátis · sem cartão · migração assistida</p>
        </div>

        <div className="relative mt-16">
          <div aria-hidden className="pointer-events-none absolute inset-x-8 top-6 h-56 rounded-full bg-gradient-to-r from-sky-500/25 via-violet-500/25 to-fuchsia-500/25 blur-3xl" />
          <div className="relative max-h-[420px] overflow-hidden rounded-t-2xl border border-b-0 bg-card shadow-2xl ring-1 ring-foreground/5">
            {/* Barra superior do app */}
            <div className="flex items-center gap-4 border-b px-5 py-3">
              <span className="size-6 rounded-md bg-gradient-to-br from-sky-500 to-violet-500" />
              <nav className="hidden items-center gap-1 text-sm sm:flex">
                {NAV.map((n, i) => (
                  <span key={n} className={`rounded-md px-2.5 py-1 ${i === 0 ? 'bg-muted font-medium' : 'text-muted-foreground'}`}>
                    {n}
                  </span>
                ))}
              </nav>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden h-8 w-56 items-center gap-2 rounded-md border bg-background px-2.5 text-xs text-muted-foreground sm:flex">
                  <Search className="size-3.5" /> Buscar pedido, cliente ou NF
                </div>
                <Bell className="size-4 text-muted-foreground" />
                <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium">RA</span>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="px-5 pt-5 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold">Pedidos</h2>
                <Badge variant="secondary">128 hoje</Badge>
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Filter data-icon="inline-start" /> Filtros
                  </Button>
                  <Button size="sm">
                    <Plus data-icon="inline-start" /> Novo pedido
                  </Button>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border">
                <div className="grid grid-cols-[88px_1fr_110px_100px_110px] gap-3 border-b bg-muted/50 px-4 py-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:grid-cols-[96px_1.4fr_120px_110px_120px]">
                  <span>Pedido</span>
                  <span>Cliente</span>
                  <span>Status</span>
                  <span className="text-right">Valor</span>
                  <span className="hidden sm:block">Entrega</span>
                </div>
                {PEDIDOS.map((p) => (
                  <div key={p.id} className="grid grid-cols-[88px_1fr_110px_100px_110px] items-center gap-3 border-b px-4 py-2.5 text-sm last:border-b-0 sm:grid-cols-[96px_1.4fr_120px_110px_120px]">
                    <span className="font-medium tabular-nums">{p.id}</span>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{p.cliente}</div>
                      <div className="truncate text-xs text-muted-foreground">{p.cidade}</div>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className={`size-1.5 rounded-full ${p.cor}`} /> {p.status}
                    </span>
                    <span className="text-right tabular-nums">{p.valor}</span>
                    <span className="hidden text-xs text-muted-foreground sm:block">{p.entrega}</span>
                  </div>
                ))}
              </div>
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
