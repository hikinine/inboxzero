'use client'

import { Badge } from '@/components/ui/badge'

const MILESTONES = [
  { year: '2019', tag: 'Início', title: 'Fundação em Florianópolis', desc: 'Três pessoas, um número de WhatsApp e uma planilha. O primeiro cliente foi uma rede de farmácias com 12 lojas.' },
  { year: '2020', tag: 'Tração', title: 'Primeiros 100 clientes', desc: 'A pandemia multiplicou o atendimento por mensagem. Lançamos as respostas automáticas em três semanas.' },
  { year: '2021', tag: 'Investimento', title: 'Rodada seed de R$ 8 milhões', desc: 'Dobramos o time de engenharia e abrimos o escritório em São Paulo.' },
  { year: '2022', tag: 'Produto', title: 'App para iOS e Android', desc: 'Atendimento no bolso, com notificações e transferência de conversa entre atendentes.' },
  { year: '2024', tag: 'IA', title: 'IA generativa no produto', desc: 'Resumo de conversas, sugestão de resposta e triagem automática, com humano no comando.' },
  { year: '2026', tag: 'Hoje', title: '2.400 clientes em 12 países', desc: 'Expansão para América Latina e Portugal. 38 milhões de mensagens por mês.' },
]

export default function TimelineDeHistoriaDaEmpresa() {
  const last = MILESTONES.length - 1
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nossa história</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Sete anos em seis marcos</h2>
          <p className="mt-3 text-muted-foreground">De uma planilha compartilhada a 38 milhões de mensagens por mês.</p>
        </div>
        <ol className="relative mt-14 space-y-12 before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border lg:before:left-1/2 lg:before:-translate-x-px">
          {MILESTONES.map((m, i) => {
            const left = i % 2 === 0
            return (
              <li key={m.year} className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                <span className={`absolute top-1.5 left-4 size-3 -translate-x-1/2 rounded-full ring-4 ring-background lg:left-1/2 ${i === last ? 'bg-primary animate-pulse' : 'bg-primary'}`} aria-hidden="true" />
                <div className={left ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-2'}>
                  <div className={`flex items-center gap-2 ${left ? 'lg:justify-end' : ''}`}>
                    <span className="text-sm font-semibold tabular-nums text-primary">{m.year}</span>
                    <Badge variant="outline">{m.tag}</Badge>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
                <span className={`hidden text-6xl font-semibold tracking-tighter text-muted-foreground/15 tabular-nums lg:block ${left ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1 lg:text-right'}`} aria-hidden="true">
                  {m.year}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
