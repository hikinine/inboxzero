'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, CreditCard, Lock, QrCode } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface Plano {
  id: string
  nome: string
  mensal: number
  descricao: string
  recursos: string[]
  popular?: boolean
}

const PLANOS: Plano[] = [
  { id: 'start', nome: 'Start', mensal: 49, descricao: 'Para quem vende sozinho.', recursos: ['1 usuário', 'Até 300 pedidos/mês', 'Pix e boleto'] },
  { id: 'pro', nome: 'Pro', mensal: 129, descricao: 'Para lojas em crescimento.', recursos: ['5 usuários', 'Pedidos ilimitados', 'Cartão em até 12x', 'Recuperação de carrinho'], popular: true },
  { id: 'escala', nome: 'Escala', mensal: 349, descricao: 'Para operações com time.', recursos: ['Usuários ilimitados', 'Split de pagamento', 'API e webhooks', 'Gerente de conta'] },
]

type Fase = 'dados' | 'processando' | 'aprovado'
const FASES: Fase[] = ['dados', 'processando', 'aprovado']
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

function CheckoutAnimado({ plano, anual }: { plano: Plano; anual: boolean }) {
  const [fase, setFase] = useState<Fase>('dados')
  const [metodo, setMetodo] = useState<'cartao' | 'pix'>('cartao')
  const total = anual ? plano.mensal * 12 * 0.8 : plano.mensal

  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i = (i + 1) % 6
      setFase(i < 3 ? 'dados' : i < 4 ? 'processando' : 'aprovado')
      if (i === 0) setMetodo((m) => (m === 'cartao' ? 'pix' : 'cartao'))
    }, 1100)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-emerald-500/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3" /> pagamento seguro
          </span>
          <span className="flex gap-1">
            {FASES.map((f) => (
              <span key={f} className={cn('h-1 w-5 rounded-full transition-colors', FASES.indexOf(f) <= FASES.indexOf(fase) ? 'bg-primary' : 'bg-muted')} />
            ))}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-muted-foreground">Plano {plano.nome}{anual ? ' · anual' : ' · mensal'}</p>
            <motion.p key={total} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-semibold tabular-nums">
              {brl(total)}
            </motion.p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-xs font-medium">
            {(['cartao', 'pix'] as const).map((m) => (
              <span key={m} className={cn('flex items-center justify-center gap-1.5 rounded-md py-1.5 transition-colors', metodo === m ? 'bg-background shadow-sm' : 'text-muted-foreground')}>
                {m === 'cartao' ? <CreditCard className="size-3.5" /> : <QrCode className="size-3.5" />}
                {m === 'cartao' ? 'Cartão' : 'Pix'}
              </span>
            ))}
          </div>

          <div className="relative mt-4 h-[168px]">
            <AnimatePresence mode="wait">
              {fase === 'aprovado' ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center text-center">
                  <svg viewBox="0 0 52 52" className="size-16" aria-hidden>
                    <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                    <motion.path d="M15 27 L23 34 L37 19" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                  </svg>
                  <p className="mt-3 font-medium">Pagamento aprovado</p>
                  <p className="text-xs text-muted-foreground">Bem-vinda ao {plano.nome}, Renata!</p>
                </motion.div>
              ) : metodo === 'cartao' ? (
                <motion.div key="cartao" initial={{ opacity: 0, rotateY: -30 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <div className="relative h-28 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 p-4 text-white">
                    <div className="h-6 w-8 rounded-md bg-gradient-to-br from-amber-200 to-amber-400" />
                    <p className="mt-4 font-mono text-sm tracking-widest">•••• •••• •••• 4821</p>
                    <div className="mt-1 flex justify-between text-[10px] text-white/60">
                      <span>RENATA A SOUZA</span>
                      <span>08/29</span>
                    </div>
                    {fase === 'processando' && (
                      <motion.div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ left: '-40%' }} animate={{ left: '110%' }} transition={{ duration: 0.9, repeat: Infinity }} />
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_72px] gap-2">
                    <div className="h-9 rounded-md border bg-background px-3 text-xs leading-9 text-muted-foreground">12x de {brl(total / 12)}</div>
                    <div className="h-9 rounded-md border bg-background text-center font-mono text-xs leading-9">•••</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="pix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full items-center gap-4">
                  <div className="relative grid size-32 shrink-0 grid-cols-8 gap-0.5 rounded-lg border bg-background p-2">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const r = Math.floor(i / 8)
                      const c = i % 8
                      const canto = (r < 3 && c < 3) || (r < 3 && c > 4) || (r > 4 && c < 3)
                      const cheio = canto ? !(r % 5 === 1 && c % 5 === 1) || (r === 1 && c === 1) : (i * 7 + 3) % 5 < 2
                      return <motion.span key={i} className={cn('rounded-[1px]', cheio ? 'bg-foreground' : 'bg-transparent')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (r + c) * 0.03 }} />
                    })}
                    {fase === 'processando' && <motion.div className="absolute inset-x-1 h-0.5 bg-primary" initial={{ top: '8%' }} animate={{ top: '90%' }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} />}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p className="font-medium">Escaneie com o app do banco</p>
                    <p className="text-muted-foreground">Expira em 29:41</p>
                    <p className="rounded-md bg-muted px-2 py-1 font-mono text-[10px]">00020126…5204</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={cn('mt-4 flex h-10 items-center justify-center rounded-md text-sm font-medium transition-colors', fase === 'aprovado' ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground')}>
            {fase === 'processando' ? (
              <motion.span className="size-4 rounded-full border-2 border-current border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
            ) : fase === 'aprovado' ? (
              'Tudo certo!'
            ) : (
              `Pagar ${brl(total)}`
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PricingComCheckoutAnimado() {
  const [selecionado, setSelecionado] = useState('pro')
  const [anual, setAnual] = useState(true)
  const plano = PLANOS.find((p) => p.id === selecionado) ?? PLANOS[1]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Planos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha o plano e comece a vender em 2 minutos</h2>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <Switch id="pca-anual" checked={anual} onCheckedChange={setAnual} />
              <label htmlFor="pca-anual">Cobrança anual</label>
              <Badge variant="secondary">20% off</Badge>
            </div>

            <div role="radiogroup" aria-label="Planos" className="mt-8 space-y-3">
              {PLANOS.map((p) => {
                const ativo = p.id === selecionado
                const preco = anual ? p.mensal * 0.8 : p.mensal
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={ativo}
                    onClick={() => setSelecionado(p.id)}
                    className={cn('flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors', ativo ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50')}
                  >
                    <span className={cn('mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border', ativo && 'border-primary bg-primary text-primary-foreground')}>{ativo && <Check className="size-3" />}</span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2 font-medium">
                        {p.nome}
                        {p.popular && <Badge className="h-5">Mais escolhido</Badge>}
                      </span>
                      <span className="block text-sm text-muted-foreground">{p.descricao}</span>
                      {ativo && (
                        <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 flex flex-wrap gap-x-4 gap-y-1 overflow-hidden text-xs">
                          {p.recursos.map((r) => (
                            <span key={r} className="flex items-center gap-1">
                              <Check className="size-3 text-emerald-500" /> {r}
                            </span>
                          ))}
                        </motion.span>
                      )}
                    </span>
                    <span className="text-right">
                      <span className="block text-xl font-semibold tabular-nums">{brl(preco).replace(',00', '')}</span>
                      <span className="text-xs text-muted-foreground">/mês</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <Button size="lg" className="mt-6 w-full sm:w-auto">
              Assinar o {plano.nome}
            </Button>
          </div>

          <CheckoutAnimado plano={plano} anual={anual} />
        </div>
      </div>
    </section>
  )
}
