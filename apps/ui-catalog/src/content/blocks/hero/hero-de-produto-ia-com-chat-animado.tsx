'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUp, Paperclip, Sparkles, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PERGUNTA = 'Quais produtos mais venderam em setembro e o que devo repor?'
const RESPOSTA = 'Setembro fechou com R$ 182,4 mil (+18%). Os três campeões estão abaixo do estoque de segurança:'
const PRODUTOS = [
  { nome: 'Garrafa térmica 750 ml', vendas: 1240, estoque: 86, barra: 100 },
  { nome: 'Mochila urbana impermeável', vendas: 812, estoque: 41, barra: 66 },
  { nome: 'Kit marmita de vidro', vendas: 640, estoque: 22, barra: 52 },
]

// linha do tempo (em ticks de 100 ms)
const T_DIGITAR = 0
const T_ENVIAR = PERGUNTA.length / 2 + 6
const T_PENSAR = T_ENVIAR + 2
const T_RESPONDER = T_PENSAR + 14
const T_CARD = T_RESPONDER + RESPOSTA.length / 3 + 2
const T_FIM = T_CARD + 45

export default function HeroDeProdutoIaComChatAnimado() {
  const [t, setT] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setT((v) => (v >= T_FIM ? 0 : v + 1)), 100)
    return () => window.clearInterval(id)
  }, [])

  const digitado = t < T_ENVIAR ? PERGUNTA.slice(0, Math.max(0, (t - T_DIGITAR) * 2)) : ''
  const enviada = t >= T_ENVIAR
  const pensando = t >= T_PENSAR && t < T_RESPONDER
  const resposta = t >= T_RESPONDER ? RESPOSTA.slice(0, (t - T_RESPONDER) * 3) : ''
  const card = t >= T_CARD

  return (
    <section className="relative w-full overflow-hidden px-6 py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-[520px] rounded-full bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-transparent blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="size-3.5 text-primary" /> Novo: análises por conversa
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Pergunte para a sua loja. Ela responde com números.</h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            A Lia lê suas vendas, estoque e anúncios e responde em segundos, com gráficos e sugestões de ação. Sem montar relatório, sem planilha.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Testar com meus dados <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline">
              Ver exemplos de perguntas
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Conecta com Shopify, Nuvemshop, Tray e Mercado Livre.</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium">Lia</p>
                <p className="text-[11px] text-muted-foreground">{pensando ? 'analisando 4.812 pedidos…' : 'online'}</p>
              </div>
            </div>

            <div className="flex h-[360px] flex-col justify-end gap-3 p-4">
              <AnimatePresence>
                {enviada && (
                  <motion.div key="pergunta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    {PERGUNTA}
                  </motion.div>
                )}
                {pensando && (
                  <motion.div key="pensando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </motion.div>
                )}
                {resposta && (
                  <motion.div key="resposta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[90%] space-y-3">
                    <p className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm">{resposta}</p>
                    {card && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-background p-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Unidades vendidas · set/2026</span>
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3" /> 18%
                          </span>
                        </div>
                        <ul className="mt-3 space-y-2.5">
                          {PRODUTOS.map((p, i) => (
                            <li key={p.nome} className="text-xs">
                              <div className="flex justify-between gap-2">
                                <span className="truncate">{p.nome}</span>
                                <span className={cn('shrink-0 tabular-nums', p.estoque < 50 ? 'text-rose-600 dark:text-rose-400' : 'text-muted-foreground')}>{p.estoque} em estoque</span>
                              </div>
                              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                                <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${p.barra}%` }} transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }} />
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex gap-2">
                          <span className="rounded-md bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">Gerar pedido de compra</span>
                          <span className="rounded-md border px-2 py-1 text-[11px]">Ver relatório</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 border-t p-3">
              <Paperclip className="size-4 shrink-0 text-muted-foreground" />
              <p className={cn('min-w-0 flex-1 truncate text-sm', digitado ? 'text-foreground' : 'text-muted-foreground')}>
                {digitado || 'Pergunte sobre vendas, estoque ou clientes…'}
                {digitado && <motion.span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-foreground" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />}
              </p>
              <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full transition-colors', digitado ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                <ArrowUp className="size-4" />
              </span>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-5 -left-4 hidden rounded-xl border bg-card px-3 py-2 text-xs shadow-lg sm:block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-medium">2,3 s</span> <span className="text-muted-foreground">tempo médio de resposta</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
