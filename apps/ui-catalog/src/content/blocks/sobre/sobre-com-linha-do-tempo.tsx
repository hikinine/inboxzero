'use client'

import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MARCOS: Array<{ ano: string; titulo: string; texto: string; tag: string | null }> = [
  { ano: '2019', titulo: 'Três pessoas e uma planilha', texto: 'Começamos dentro de uma operação de varejo que respondia 4 mil mensagens por dia na mão.', tag: 'Fundação' },
  { ano: '2020', titulo: 'Os primeiros 100 clientes', texto: 'A pandemia multiplicou o atendimento por mensagem. Lançamos as respostas automáticas em três semanas.', tag: null },
  { ano: '2021', titulo: 'Rodada seed de R$ 8 milhões', texto: 'Dobramos a engenharia e abrimos o escritório em São Paulo.', tag: 'Investimento' },
  { ano: '2023', titulo: 'App para iOS e Android', texto: 'Atendimento no bolso, com fila, transferência e notificações.', tag: null },
  { ano: '2024', titulo: 'IA no centro do produto', texto: 'Resumo de conversas, sugestão de resposta e triagem automática, com humano no comando.', tag: 'Produto' },
  { ano: 'Hoje', titulo: '2.400 clientes em 12 países', texto: '38 milhões de mensagens por mês e um time de 140 pessoas em cinco cidades.', tag: 'Agora' },
]

const NUMEROS = [
  { valor: '7', rotulo: 'anos de estrada' },
  { valor: '140', rotulo: 'pessoas no time' },
]

export default function SobreComLinhaDoTempo() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sobre nós</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Sete anos respondendo mais rápido</h2>
          <p className="mt-5 text-muted-foreground">Nascemos de uma dor concreta: uma fila de WhatsApp que ninguém dava conta. Cada marco ao lado foi uma resposta a um problema que um cliente nos trouxe.</p>
          <p className="mt-4 text-muted-foreground">A missão não mudou desde a planilha: fazer cada conversa valer o tempo de quem está dos dois lados dela.</p>
          <dl className="mt-8 flex gap-10">
            {NUMEROS.map((n) => (
              <div key={n.rotulo}>
                <dd className="text-3xl font-semibold tracking-tight tabular-nums">{n.valor}</dd>
                <dt className="text-sm text-muted-foreground">{n.rotulo}</dt>
              </div>
            ))}
          </dl>
          <Button variant="outline" className="mt-8">
            Conheça o time <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <ol className="border-l pl-8">
          {MARCOS.map((m, i) => {
            const ultimo = i === MARCOS.length - 1
            return (
              <li key={m.ano} className="relative pb-10 last:pb-0">
                <span className={cn('absolute top-1 -left-[41px] flex size-[18px] items-center justify-center rounded-full border-2 bg-background', ultimo ? 'border-primary' : 'border-border')} aria-hidden="true">
                  <span className={cn('size-2 rounded-full', ultimo ? 'bg-primary' : 'bg-muted-foreground/40')} />
                  {ultimo && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('font-mono text-sm', ultimo ? 'text-primary' : 'text-muted-foreground')}>{m.ano}</span>
                  {m.tag && <Badge variant={ultimo ? 'default' : 'outline'}>{m.tag}</Badge>}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold">{m.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.texto}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
