'use client'

import { useState } from 'react'
import { Check, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const PLANOS = [
  {
    id: 'starter',
    nome: 'Starter',
    mensal: 0,
    anual: 0,
    descricao: 'Para organizar o funil sozinho.',
    atual: true,
    recursos: ['1 usuário', 'Até 500 contatos', 'WhatsApp com 1 número', 'Relatórios básicos'],
  },
  {
    id: 'pro',
    nome: 'Pro',
    mensal: 149,
    anual: 119,
    descricao: 'Para times que precisam escalar.',
    atual: false,
    recursos: ['Até 10 usuários', 'Contatos ilimitados', 'WhatsApp, Instagram e e-mail', 'Automações com IA', 'Relatórios avançados', 'Suporte prioritário'],
  },
]

function UpgradeConteudo() {
  const [anual, setAnual] = useState(true)
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1 text-sm">
        <button type="button" onClick={() => setAnual(false)} className={cn('flex-1 rounded-md px-3 py-1.5 font-medium transition-colors', !anual ? 'bg-background shadow-sm' : 'text-muted-foreground')}>
          Mensal
        </button>
        <button type="button" onClick={() => setAnual(true)} className={cn('flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 font-medium transition-colors', anual ? 'bg-background shadow-sm' : 'text-muted-foreground')}>
          Anual <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">-20%</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLANOS.map((p) => {
          const preco = anual ? p.anual : p.mensal
          return (
            <div key={p.id} className={cn('relative rounded-xl border p-5', !p.atual && 'border-primary ring-1 ring-primary')}>
              {!p.atual && (
                <Badge className="absolute -top-2.5 left-5 gap-1">
                  <Sparkles className="size-3" /> Recomendado
                </Badge>
              )}
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold">{p.nome}</h4>
                {p.atual && <Badge variant="outline">Plano atual</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">R$ {preco}</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.recursos.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check className={cn('mt-0.5 size-4 shrink-0', p.atual ? 'text-muted-foreground' : 'text-emerald-500')} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground">{anual ? 'Cobrado R$ 1.428,00 por ano. Cancele quando quiser.' : 'Cobrado mensalmente. Mude para anual e economize R$ 360,00.'}</p>
    </div>
  )
}

export default function DialogoUpgradePlano() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Diálogos</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Upgrade de plano</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Dois planos lado a lado, toggle mensal/anual e um CTA claro. O modal real abre pelo botão; o card é a versão inline.</p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Zap data-icon="inline-start" /> Fazer upgrade
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Desbloqueie o plano Pro</DialogTitle>
                <DialogDescription>Você atingiu o limite de 500 contatos do Starter. Faça upgrade para continuar importando.</DialogDescription>
              </DialogHeader>
              <UpgradeConteudo />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Agora não</DialogClose>
                <Button>
                  <Zap data-icon="inline-start" /> Fazer upgrade para o Pro
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-medium">Desbloqueie o plano Pro</h3>
            <p className="text-sm text-muted-foreground">Você atingiu o limite de 500 contatos do Starter. Faça upgrade para continuar importando.</p>
          </div>
          <UpgradeConteudo />
          <div className="-mx-6 -mb-6 mt-6 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 px-6 py-4 sm:flex-row sm:justify-end">
            <Button variant="outline">Agora não</Button>
            <Button>
              <Zap data-icon="inline-start" /> Fazer upgrade para o Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
