'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Keyboard, MessageSquare, RotateCcw, Smartphone, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Dica {
  id: string
  Icon: LucideIcon
  cor: string
  titulo: string
  texto: string
  cta: string
}

const DICAS: Dica[] = [
  { id: 'atalhos', Icon: Keyboard, cor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', titulo: 'Navegue com atalhos', texto: 'Pressione ⌘K para buscar qualquer contato, negócio ou página sem tirar as mãos do teclado.', cta: 'Ver atalhos' },
  { id: 'ia', Icon: Sparkles, cor: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', titulo: 'Resuma conversas com IA', texto: 'Clique em “Resumir” no topo de uma conversa longa e veja os pontos principais em segundos.', cta: 'Testar agora' },
  { id: 'modelos', Icon: MessageSquare, cor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', titulo: 'Crie modelos de resposta', texto: 'Salve respostas frequentes e envie digitando “/” no campo de mensagem.', cta: 'Criar modelo' },
  { id: 'metas', Icon: Target, cor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', titulo: 'Defina metas do time', texto: 'Acompanhe o ritmo de cada vendedor em relação à meta do mês direto no painel.', cta: 'Definir metas' },
  { id: 'app', Icon: Smartphone, cor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', titulo: 'Leve o Lumi no bolso', texto: 'Baixe o app e responda clientes pelo celular com as mesmas automações.', cta: 'Baixar app' },
  { id: 'relatorios', Icon: TrendingUp, cor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400', titulo: 'Receba o resumo semanal', texto: 'Toda segunda às 8h: negócios ganhos, tempo de resposta e previsão do mês.', cta: 'Ativar resumo' },
]

export default function OnboardingDicas() {
  const [dispensadas, setDispensadas] = useState<string[]>([])
  const visiveis = DICAS.filter((d) => !dispensadas.includes(d.id))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dicas para começar bem</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tire mais do Lumi</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Seis hábitos que os times mais produtivos adotam na primeira semana. Dispense o que você já domina.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {visiveis.length} de {DICAS.length} dicas
            {dispensadas.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setDispensadas([])}>
                <RotateCcw data-icon="inline-start" /> Restaurar
              </Button>
            )}
          </div>
        </div>

        {visiveis.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed p-12 text-center">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Sparkles className="size-5" />
            </div>
            <p className="mt-3 text-sm font-medium">Você viu todas as dicas</p>
            <p className="mt-1 text-sm text-muted-foreground">Elas voltam a aparecer quando lançarmos novidades.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setDispensadas([])}>
              <RotateCcw data-icon="inline-start" /> Mostrar de novo
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {visiveis.map((d) => (
                <motion.div key={d.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }} className="relative flex flex-col rounded-xl border bg-card p-5">
                  <button type="button" aria-label={`Dispensar dica “${d.titulo}”`} onClick={() => setDispensadas((prev) => [...prev, d.id])} className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <X className="size-4" />
                  </button>
                  <div className={cn('flex size-10 items-center justify-center rounded-lg', d.cor)}>
                    <d.Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 pr-6 text-base font-semibold">{d.titulo}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{d.texto}</p>
                  <div className="mt-4">
                    <Button size="sm" variant="outline">
                      {d.cta} <ArrowRight data-icon="inline-end" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
