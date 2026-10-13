'use client'

import { motion } from 'motion/react'
import { ArrowRight, LayoutTemplate } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tela = 'dashboard' | 'kanban' | 'checkout' | 'chat' | 'tabela' | 'perfil' | 'landing' | 'agenda'

interface Preview {
  nome: string
  tela: Tela
  tom: string
}

const LINHA_A: Preview[] = [
  { nome: 'Painel de vendas', tela: 'dashboard', tom: 'from-sky-500/15' },
  { nome: 'Quadro de tarefas', tela: 'kanban', tom: 'from-violet-500/15' },
  { nome: 'Checkout Pix', tela: 'checkout', tom: 'from-emerald-500/15' },
  { nome: 'Atendimento', tela: 'chat', tom: 'from-amber-500/15' },
  { nome: 'Pedidos', tela: 'tabela', tom: 'from-rose-500/15' },
]
const LINHA_B: Preview[] = [
  { nome: 'Perfil da conta', tela: 'perfil', tom: 'from-emerald-500/15' },
  { nome: 'Página de lançamento', tela: 'landing', tom: 'from-sky-500/15' },
  { nome: 'Agenda da clínica', tela: 'agenda', tom: 'from-rose-500/15' },
  { nome: 'Relatório mensal', tela: 'dashboard', tom: 'from-amber-500/15' },
  { nome: 'Suporte', tela: 'chat', tom: 'from-violet-500/15' },
]

function Linha({ className }: { className?: string }) {
  return <div className={cn('h-1.5 rounded-full bg-muted-foreground/25', className)} />
}

function Conteudo({ tela }: { tela: Tela }) {
  switch (tela) {
    case 'dashboard':
      return (
        <div className="flex h-full flex-col gap-2">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1 rounded-md border bg-background p-1.5">
                <Linha className="w-2/3" />
                <div className="h-2 w-1/2 rounded-sm bg-foreground/60" />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 120 40" className="flex-1 text-primary" preserveAspectRatio="none" aria-hidden>
            <path d="M0 32 L15 26 L30 29 L45 18 L60 22 L75 12 L90 16 L105 6 L120 9 L120 40 L0 40Z" fill="currentColor" opacity="0.12" />
            <path d="M0 32 L15 26 L30 29 L45 18 L60 22 L75 12 L90 16 L105 6 L120 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )
    case 'kanban':
      return (
        <div className="grid h-full grid-cols-3 gap-1.5">
          {[3, 2, 1].map((n, c) => (
            <div key={c} className="space-y-1.5 rounded-md bg-muted/70 p-1.5">
              <Linha className="w-1/2" />
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="space-y-1 rounded border bg-background p-1">
                  <Linha />
                  <Linha className="w-1/2 bg-muted-foreground/15" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    case 'checkout':
      return (
        <div className="grid h-full grid-cols-[1fr_70px] gap-2">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-4 rounded border bg-background" />
            ))}
            <div className="h-5 rounded bg-primary" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-md border bg-background p-1.5">
            <div className="grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={cn('size-1.5 rounded-[1px]', [0, 3, 5, 6, 9, 12, 15, 10].includes(i) ? 'bg-foreground' : 'bg-muted')} />
              ))}
            </div>
            <Linha className="w-3/4" />
          </div>
        </div>
      )
    case 'chat':
      return (
        <div className="flex h-full flex-col justify-end gap-1.5">
          <div className="w-2/3 rounded-lg rounded-bl-sm bg-muted p-1.5">
            <Linha />
          </div>
          <div className="ml-auto w-1/2 rounded-lg rounded-br-sm bg-primary p-1.5">
            <div className="h-1.5 rounded-full bg-primary-foreground/60" />
          </div>
          <div className="w-3/5 space-y-1 rounded-lg rounded-bl-sm bg-muted p-1.5">
            <Linha />
            <Linha className="w-2/3" />
          </div>
          <div className="h-4 rounded-full border bg-background" />
        </div>
      )
    case 'tabela':
      return (
        <div className="h-full overflow-hidden rounded-md border bg-background">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={cn('grid grid-cols-[1fr_1fr_24px] items-center gap-2 border-b px-1.5 py-1.5 last:border-0', i === 0 && 'bg-muted')}>
              <Linha />
              <Linha className="w-2/3" />
              <div className={cn('h-2 rounded-full', i === 0 ? 'bg-muted-foreground/25' : i % 2 ? 'bg-emerald-500/50' : 'bg-amber-500/50')} />
            </div>
          ))}
        </div>
      )
    case 'perfil':
      return (
        <div className="flex h-full flex-col items-center gap-1.5 pt-1">
          <div className="size-8 rounded-full bg-gradient-to-br from-primary/70 to-primary/20" />
          <div className="h-2 w-16 rounded-full bg-foreground/50" />
          <Linha className="w-12" />
          <div className="mt-auto grid w-full grid-cols-2 gap-1.5">
            <div className="h-4 rounded border bg-background" />
            <div className="h-4 rounded bg-foreground/80" />
          </div>
        </div>
      )
    case 'landing':
      return (
        <div className="flex h-full flex-col items-center gap-1.5 pt-1">
          <div className="h-1.5 w-10 rounded-full bg-primary/50" />
          <div className="h-2.5 w-3/4 rounded-sm bg-foreground/60" />
          <div className="h-2.5 w-1/2 rounded-sm bg-foreground/60" />
          <Linha className="w-2/3" />
          <div className="flex gap-1">
            <div className="h-3.5 w-10 rounded bg-foreground/80" />
            <div className="h-3.5 w-10 rounded border bg-background" />
          </div>
          <div className="mt-auto h-6 w-full rounded-t-md border border-b-0 bg-background" />
        </div>
      )
    case 'agenda':
      return (
        <div className="grid h-full grid-cols-5 gap-1">
          {Array.from({ length: 5 }).map((_, c) => (
            <div key={c} className="relative rounded bg-muted/60">
              <div
                className={cn('absolute inset-x-0.5 rounded-sm', c % 2 ? 'bg-primary/40' : 'bg-emerald-500/40')}
                style={{ top: `${10 + ((c * 23) % 50)}%`, height: `${18 + ((c * 11) % 20)}%` }}
              />
            </div>
          ))}
        </div>
      )
  }
}

function CardPreview({ p }: { p: Preview }) {
  return (
    <div className="w-60 shrink-0 overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-1 border-b px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-rose-500/70" />
        <span className="size-1.5 rounded-full bg-amber-500/70" />
        <span className="size-1.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 truncate text-[10px] text-muted-foreground">{p.nome}</span>
      </div>
      <div className={cn('h-32 bg-gradient-to-br to-transparent p-2.5', p.tom)}>
        <Conteudo tela={p.tela} />
      </div>
    </div>
  )
}

function Esteira({ itens, reverso, duracao }: { itens: Preview[]; reverso?: boolean; duracao: number }) {
  const dobrado = [...itens, ...itens]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4 pr-4"
        animate={{ x: reverso ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: duracao, ease: 'linear', repeat: Infinity }}
      >
        {dobrado.map((p, i) => (
          <CardPreview key={`${p.nome}-${i}`} p={p} />
        ))}
      </motion.div>
    </div>
  )
}

export default function HeroComEsteiraDePreviews() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <LayoutTemplate className="size-3.5" /> 340 telas prontas para copiar
        </Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Do rascunho à tela pronta em uma tarde.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Painéis, checkouts, chats e agendas montados com os mesmos componentes do seu produto. Copie, ajuste o texto e publique.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Explorar a biblioteca <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="ghost">
            Ver novidades da semana
          </Button>
        </div>
      </div>

      <div className="relative mt-16 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Esteira itens={LINHA_A} duracao={38} />
        <Esteira itens={LINHA_B} duracao={44} reverso />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
