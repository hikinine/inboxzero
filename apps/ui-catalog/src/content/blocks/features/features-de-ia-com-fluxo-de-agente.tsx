'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bot, Brain, CircleCheck, Database, MessageSquare, Package, Send, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Etapa {
  Icon: LucideIcon
  titulo: string
  recurso: string
  texto: string
  log: string
}

const ETAPAS: Etapa[] = [
  { Icon: MessageSquare, titulo: 'Entende o pedido', recurso: 'Compreensão de intenção', texto: 'Lê a mensagem, o histórico e identifica o que o cliente realmente quer, mesmo com erro de digitação.', log: 'intenção: trocar_tamanho · confiança 0,97' },
  { Icon: Brain, titulo: 'Planeja os passos', recurso: 'Planejamento em etapas', texto: 'Quebra a tarefa em passos verificáveis antes de agir, e pede confirmação quando há valor envolvido.', log: 'plano: 1) achar pedido 2) checar estoque 3) gerar troca' },
  { Icon: Wrench, titulo: 'Usa ferramentas', recurso: 'Ações no seu sistema', texto: 'Consulta pedidos, estoque e frete pelas integrações, com permissões que você define por ferramenta.', log: 'buscar_pedido(#5531) ✓ · estoque(tênis 42) = 6 ✓' },
  { Icon: Send, titulo: 'Responde e registra', recurso: 'Resposta com auditoria', texto: 'Envia a resposta no canal certo e deixa um registro completo de cada decisão para o time revisar.', log: 'troca #T-2209 criada · resposta enviada no WhatsApp' },
]

const FERRAMENTAS = [
  { Icon: Package, nome: 'Pedidos' },
  { Icon: Database, nome: 'Estoque' },
  { Icon: Send, nome: 'Frete' },
]

export default function FeaturesDeIaComFluxoDeAgente() {
  const [passo, setPasso] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setPasso((p) => (p + 1) % ETAPAS.length), 2600)
    return () => window.clearInterval(id)
  }, [auto])

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Badge variant="outline" className="gap-1.5">
            <Bot className="size-3.5" /> Agente de atendimento
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Um agente que resolve, não só responde</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Veja o que acontece nos 4 segundos entre a mensagem do cliente e a troca já registrada.</p>

          <ol className="mt-8 space-y-1">
            {ETAPAS.map((e, i) => {
              const ativo = i === passo
              return (
                <li key={e.titulo}>
                  <button
                    type="button"
                    onClick={() => {
                      setPasso(i)
                      setAuto(false)
                    }}
                    className={cn('relative w-full rounded-xl px-4 py-3 text-left transition-colors', ativo ? 'bg-muted' : 'hover:bg-muted/50')}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors', ativo ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                        <e.Icon className="size-4" />
                      </span>
                      <span className="font-medium">{e.recurso}</span>
                    </span>
                    <AnimatePresence initial={false}>
                      {ativo && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-11 text-sm text-muted-foreground">
                          <span className="block pt-1">{e.texto}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {ativo && auto && (
                      <motion.span key={passo} className="absolute bottom-0 left-4 h-0.5 rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: 'calc(100% - 2rem)' }} transition={{ duration: 2.6, ease: 'linear' }} />
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="relative rounded-2xl border bg-muted/30 p-5 sm:p-8">
          <div className="rounded-xl border bg-card p-3 text-sm shadow-sm">
            <p className="text-xs text-muted-foreground">Cliente · WhatsApp</p>
            <p className="mt-1">Oi! O tênis do pedido 5531 ficou apertado, dá pra trocar pelo 42?</p>
          </div>

          <div className="relative mt-2 ml-7 border-l border-dashed py-2 pl-8">
            {ETAPAS.map((e, i) => {
              const feito = i < passo
              const ativo = i === passo
              return (
                <div key={e.titulo} className="relative py-2.5">
                  <span
                    className={cn(
                      'absolute top-1/2 -left-[45px] flex size-6 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-background transition-colors',
                      ativo ? 'border-primary' : feito ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-border',
                    )}
                  >
                    {feito ? <CircleCheck className="size-3.5" /> : ativo ? <motion.span className="size-2 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1, repeat: Infinity }} /> : null}
                  </span>
                  <div className={cn('rounded-lg border bg-card px-3 py-2 transition-all', ativo ? 'border-primary/50 shadow-md' : 'opacity-60')}>
                    <p className="text-sm font-medium">{e.titulo}</p>
                    {i === 2 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {FERRAMENTAS.map((f, k) => (
                          <motion.span
                            key={f.nome}
                            className={cn("inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-[11px] text-muted-foreground", ativo && "border-primary/40 text-foreground")}
                            animate={ativo ? { y: [0, -3, 0] } : { y: 0 }}
                            transition={{ duration: 0.6, delay: k * 0.3, repeat: ativo ? Infinity : 0, repeatDelay: 0.6 }}
                          >
                            <f.Icon className="size-3" /> {f.nome}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-2 overflow-hidden rounded-lg bg-foreground px-3 py-2.5 font-mono text-[11px] text-background">
            <AnimatePresence mode="wait">
              <motion.p key={passo} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="truncate">
                <span className="text-emerald-400">›</span> {ETAPAS[passo].log}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
