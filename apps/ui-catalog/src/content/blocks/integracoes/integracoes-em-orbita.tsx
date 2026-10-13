'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Integracao {
  nome: string
  categoria: string
  descricao: string
  estilo: string
}

const INTERNO: Integracao[] = [
  { nome: 'Pix', categoria: 'Pagamentos', descricao: 'Cobranças com QR dinâmico e baixa automática.', estilo: 'font-bold tracking-tight' },
  { nome: 'WhatsApp', categoria: 'Mensagens', descricao: 'Envio de status do pedido e recuperação de carrinho.', estilo: 'font-semibold' },
  { nome: 'Bling', categoria: 'ERP', descricao: 'Estoque, notas fiscais e pedidos sincronizados.', estilo: 'font-mono font-medium' },
]
const EXTERNO: Integracao[] = [
  { nome: 'Nuvemshop', categoria: 'Loja', descricao: 'Produtos e pedidos em tempo real.', estilo: 'italic font-light' },
  { nome: 'Correios', categoria: 'Frete', descricao: 'Cotação, etiqueta e rastreio.', estilo: 'font-extrabold uppercase tracking-widest text-[10px]' },
  { nome: 'RD Station', categoria: 'Marketing', descricao: 'Leads e segmentações automáticas.', estilo: 'font-serif' },
  { nome: 'Omie', categoria: 'Financeiro', descricao: 'Contas a receber conciliadas.', estilo: 'font-semibold lowercase' },
  { nome: 'Google Agenda', categoria: 'Agenda', descricao: 'Retiradas e visitas agendadas.', estilo: 'font-medium' },
]

function Anel({ itens, raio, duracao, sentido, ativo, onAtivar }: { itens: Integracao[]; raio: number; duracao: number; sentido: 1 | -1; ativo: string; onAtivar: (n: string) => void }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: raio * 2, height: raio * 2, marginLeft: -raio, marginTop: -raio }}
      animate={{ rotate: 360 * sentido }}
      transition={{ duration: duracao, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute inset-0 rounded-full border border-border" />
      {itens.map((it, i) => {
        const a = (i / itens.length) * Math.PI * 2 - Math.PI / 2
        return (
          <div key={it.nome} className="absolute top-1/2 left-1/2" style={{ transform: `translate(${Math.cos(a) * raio}px, ${Math.sin(a) * raio}px)` }}>
            <motion.button
              type="button"
              onClick={() => onAtivar(it.nome)}
              className={cn(
                '-translate-x-1/2 -translate-y-1/2 rounded-full border bg-card px-3 py-1.5 text-xs whitespace-nowrap shadow-sm transition-colors',
                ativo === it.nome ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted',
                it.estilo,
              )}
              animate={{ rotate: -360 * sentido }}
              transition={{ duration: duracao, repeat: Infinity, ease: 'linear' }}
            >
              {it.nome}
            </motion.button>
          </div>
        )
      })}
    </motion.div>
  )
}

export default function IntegracoesEmOrbita() {
  const [ativo, setAtivo] = useState('Pix')
  const todas = [...INTERNO, ...EXTERNO]

  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex justify-center max-sm:-my-14">
        <div className="relative size-[460px] shrink-0 max-sm:scale-[0.72]">
          <div aria-hidden className="absolute inset-[22%] rounded-full bg-primary/10 blur-2xl" />
          <div aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--muted)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(circle,black_40%,transparent_70%)]" />
          <Anel itens={INTERNO} raio={110} duracao={30} sentido={1} ativo={ativo} onAtivar={setAtivo} />
          <Anel itens={EXTERNO} raio={200} duracao={52} sentido={-1} ativo={ativo} onAtivar={setAtivo} />
          <div className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl border bg-card shadow-xl">
            <Layers className="size-7 text-primary" />
            <span className="mt-1 text-xs font-semibold tracking-tight">Vendaí</span>
          </div>
        </div>
        </div>

        <div>
          <Badge variant="outline">8 integrações nativas · +60 via API</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Seu e-commerce no centro, o resto gira em volta</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Conecte as ferramentas que a loja já usa. Clique em uma integração na órbita ou na lista para ver o que ela sincroniza.</p>

          <ul className="mt-8 divide-y rounded-xl border bg-card">
            {todas.map((it) => {
              const sel = ativo === it.nome
              return (
                <li key={it.nome}>
                  <button
                    type="button"
                    onClick={() => setAtivo(it.nome)}
                    className={cn('flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors', sel ? 'bg-muted' : 'hover:bg-muted/50')}
                  >
                    <span className={cn('size-1.5 shrink-0 rounded-full', INTERNO.includes(it) ? 'bg-primary' : 'bg-muted-foreground/40')} />
                    <span className="flex-1 text-sm font-medium">{it.nome}</span>
                    <span className="text-xs text-muted-foreground">{it.categoria}</span>
                  </button>
                  {sel && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden bg-muted px-4 pb-3 pl-8 text-sm text-muted-foreground">
                      {it.descricao}
                    </motion.p>
                  )}
                </li>
              )
            })}
          </ul>
          <Button variant="link" className="mt-4 px-0">
            Ver documentação da API <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}
