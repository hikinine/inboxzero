'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Layers, CreditCard, FileText, Package, Truck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const limpo = 'data-active:bg-transparent dark:data-active:bg-transparent data-active:shadow-none dark:data-active:border-transparent after:hidden'
const mola = { type: 'spring', stiffness: 420, damping: 34 } as const

function PillDeslizante() {
  const abas = ['Dia', 'Semana', 'Mês', 'Ano'] as const
  const [ativa, setAtiva] = useState<string>('Semana')
  return (
    <Tabs value={ativa} onValueChange={(v) => setAtiva(String(v))}>
      <TabsList className="h-10 rounded-full p-1">
        {abas.map((a) => (
          <TabsTrigger key={a} value={a} className={cn('h-8 rounded-full px-4', limpo)}>
            {ativa === a && <motion.span layoutId="tabs-pill" transition={mola} className="absolute inset-0 rounded-full bg-background shadow-sm dark:bg-input/40" />}
            <span className="relative z-10">{a}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function Sublinhado() {
  const abas = [
    { v: 'visao', label: 'Visão geral', n: 0 },
    { v: 'pedidos', label: 'Pedidos', n: 12 },
    { v: 'clientes', label: 'Clientes', n: 3 },
    { v: 'config', label: 'Configurações', n: 0 },
  ]
  const [ativa, setAtiva] = useState('pedidos')
  return (
    <Tabs value={ativa} onValueChange={(v) => setAtiva(String(v))} className="w-full">
      <TabsList variant="line" className="h-auto w-full justify-start gap-0 border-b p-0">
        {abas.map((a) => (
          <TabsTrigger key={a.v} value={a.v} className={cn('h-10 flex-none rounded-none px-3', limpo)}>
            {a.label}
            {a.n > 0 && <span className="rounded-full bg-muted px-1.5 text-[11px] tabular-nums text-muted-foreground">{a.n}</span>}
            {ativa === a.v && <motion.span layoutId="tabs-linha" transition={mola} className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

const ETAPAS = [
  { v: 'pedido', label: 'Pedido', Icon: FileText, titulo: 'Pedido #10482 recebido', texto: '3 itens · R$ 489,70 · cliente Rafael Moura, Recife/PE.' },
  { v: 'pagamento', label: 'Pagamento', Icon: CreditCard, titulo: 'Pix confirmado', texto: 'Pago às 14:32 pelo Banco do Brasil. Nota fiscal emitida.' },
  { v: 'separacao', label: 'Separação', Icon: Package, titulo: 'Em separação no CD Cajamar', texto: 'Previsão de despacho até amanhã às 11h.' },
  { v: 'entrega', label: 'Entrega', Icon: Truck, titulo: 'Saiu para entrega', texto: 'Transportadora Jadlog · código JD7740921BR.' },
] as const

function ComConteudo() {
  const [ativa, setAtiva] = useState<string>('pagamento')
  const [dir, setDir] = useState(1)
  const idx = ETAPAS.findIndex((e) => e.v === ativa)

  return (
    <Tabs
      value={ativa}
      onValueChange={(v) => {
        const novo = ETAPAS.findIndex((e) => e.v === v)
        setDir(novo > idx ? 1 : -1)
        setAtiva(String(v))
      }}
      className="w-full gap-3"
    >
      <TabsList className="grid h-auto w-full grid-cols-4 rounded-xl p-1">
        {ETAPAS.map((e) => (
          <TabsTrigger key={e.v} value={e.v} className={cn('h-14 flex-col gap-1 rounded-lg text-xs', limpo, 'data-active:text-primary-foreground dark:data-active:text-primary-foreground')}>
            {ativa === e.v && <motion.span layoutId="tabs-bloco" transition={mola} className="absolute inset-0 rounded-lg bg-primary" />}
            <e.Icon className="relative z-10 size-4" />
            <span className="relative z-10">{e.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="relative overflow-hidden rounded-xl border bg-card">
        <AnimatePresence mode="popLayout" initial={false}>
          {ETAPAS.filter((e) => e.v === ativa).map((e) => (
            <TabsContent key={e.v} value={e.v} keepMounted render={<motion.div initial={{ x: 40 * dir, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40 * dir, opacity: 0 }} transition={{ duration: 0.22 }} />} className="p-4">
              <div className="font-medium">{e.titulo}</div>
              <p className="mt-1 text-muted-foreground">{e.texto}</p>
            </TabsContent>
          ))}
        </AnimatePresence>
      </div>
    </Tabs>
  )
}

export default function TabsIndicadorDeslizante() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Pill deslizante">
        <PillDeslizante />
      </Demo>
      <Demo title="Sublinhado com contador">
        <Sublinhado />
      </Demo>
      <Demo title="Bloco com ícone e conteúdo animado">
        <ComConteudo />
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Layers className="size-3" /> {title}
      </div>
      {children}
    </div>
  )
}
