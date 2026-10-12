'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const INICIAIS = ['AS', 'BR', 'CM', 'DL', 'EF', 'GH']
const MIN = 1
const MAX = 50

const PLANOS = [
  { nome: 'Equipe', preco: 39, desc: 'Para times comerciais de até 20 pessoas.', recursos: ['Inbox e CRM completos', 'Automações ilimitadas', 'Relatórios por vendedor', 'Suporte por chat em horário comercial'] },
  { nome: 'Empresa', preco: 79, desc: 'Para operações com várias equipes e unidades.', recursos: ['Tudo do Equipe', 'SSO e permissões por unidade', 'API, webhooks e trilha de auditoria', 'Gerente de conta dedicado'], destaque: true },
]

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const descontoPorVolume = (assentos: number) => (assentos >= 25 ? 0.2 : assentos >= 10 ? 0.1 : 0)

export default function PricingParaEquipesPorAssento() {
  const [assentos, setAssentos] = useState(8)
  const [anual, setAnual] = useState(true)
  const desconto = descontoPorVolume(assentos)
  const fator = (1 - desconto) * (anual ? 0.8 : 1)
  const visiveis = INICIAIS.slice(0, Math.min(assentos, INICIAIS.length))
  const extras = assentos - visiveis.length

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Um preço por pessoa. Desconto por equipe.</h2>
          <p className="mt-3 text-muted-foreground">Escolha quantos assentos precisa agora e ajuste quando o time crescer. Cobramos só pelos ativos.</p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6 rounded-2xl border bg-card p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon-lg" aria-label="Remover assento" disabled={assentos <= MIN} onClick={() => setAssentos((a) => Math.max(MIN, a - 1))}>
              <Minus />
            </Button>
            <div className="w-24 text-center">
              <div className="text-4xl font-semibold tabular-nums">{assentos}</div>
              <div className="text-xs text-muted-foreground">{assentos === 1 ? 'assento' : 'assentos'}</div>
            </div>
            <Button variant="outline" size="icon-lg" aria-label="Adicionar assento" disabled={assentos >= MAX} onClick={() => setAssentos((a) => Math.min(MAX, a + 1))}>
              <Plus />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <AvatarGroup>
              <AnimatePresence initial={false}>
                {visiveis.map((n) => (
                  <motion.div key={n} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}>
                    <Avatar className="ring-2 ring-background">
                      <AvatarFallback>{n}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </AnimatePresence>
              {extras > 0 && <AvatarGroupCount>+{extras}</AvatarGroupCount>}
            </AvatarGroup>
            {desconto > 0 ? (
              <Badge variant="secondary">{Math.round(desconto * 100)}% de desconto por volume aplicado</Badge>
            ) : (
              <span className="text-xs text-muted-foreground">10% off a partir de 10 assentos · 20% a partir de 25</span>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Label htmlFor="cobranca-anual">Cobrança anual</Label>
          <Switch id="cobranca-anual" checked={anual} onCheckedChange={(v) => setAnual(v)} />
          <Badge variant="outline">2 meses grátis</Badge>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {PLANOS.map((p) => {
            const unitario = p.preco * fator
            const total = unitario * assentos
            return (
              <div key={p.nome} className={`flex flex-col rounded-2xl border bg-card p-6 sm:p-8 ${p.destaque ? 'border-primary ring-1 ring-primary' : ''}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{p.nome}</h3>
                  {p.destaque && <Badge>Recomendado</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tabular-nums">{brl(unitario)}</span>
                  <span className="text-sm text-muted-foreground">/assento/mês</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fator < 1 ? (
                    <>
                      <s>{brl(p.preco)}</s> de tabela
                    </>
                  ) : (
                    'preço de tabela, sem descontos'
                  )}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">
                    {brl(unitario)} × {assentos} {assentos === 1 ? 'assento' : 'assentos'}
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    {brl(total)}
                    <span className="text-xs font-normal text-muted-foreground">/mês</span>
                  </span>
                </div>
                <p className="mt-2 h-4 text-xs text-muted-foreground">{anual ? `${brl(total * 12)} cobrados por ano` : ''}</p>
                <Button className="mt-5" variant={p.destaque ? 'default' : 'outline'}>
                  Assinar o {p.nome} <ArrowRight data-icon="inline-end" />
                </Button>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.recursos.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
