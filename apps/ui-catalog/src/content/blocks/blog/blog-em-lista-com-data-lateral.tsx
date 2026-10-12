'use client'

import { ArrowUpRight, Clock, Rss } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const POSTS = [
  { iso: '2026-10-10', dia: '10', mes: 'out', ano: '2026', cat: 'Relatório', titulo: 'O estado do atendimento digital no Brasil em 2026', resumo: '38 milhões de conversas analisadas: horários de pico, canais que mais convertem e o efeito real da IA no tempo de resposta.', autor: 'Mariana Duarte', leitura: '14 min' },
  { iso: '2026-10-02', dia: '02', mes: 'out', ano: '2026', cat: 'Jurídico', titulo: 'LGPD na prática: o que todo time de vendas precisa saber', resumo: 'Consentimento, base legal e retenção explicados sem juridiquês, com exemplos de mensagens que você pode copiar.', autor: 'Rafael Nogueira', leitura: '9 min' },
  { iso: '2026-09-25', dia: '25', mes: 'set', ano: '2026', cat: 'Produto', titulo: 'Automação sem perder o toque humano', resumo: 'Onde a IA entra, onde o atendente entra e como desenhar a passagem de bastão para o cliente nem perceber.', autor: 'Beatriz Carvalho', leitura: '5 min' },
  { iso: '2026-09-18', dia: '18', mes: 'set', ano: '2026', cat: 'Vendas', titulo: 'O script de qualificação que nosso time usa (e por quê)', resumo: 'Quatro perguntas, uma regra de desempate e o critério para encerrar a conversa sem queimar o lead.', autor: 'Diego Albuquerque', leitura: '7 min' },
  { iso: '2026-09-09', dia: '09', mes: 'set', ano: '2026', cat: 'Atendimento', titulo: 'Como reduzir o tempo de resposta no WhatsApp em 70%', resumo: 'Um roteiro de quatro semanas com as automações que mais funcionaram nos 312 times que acompanhamos.', autor: 'Mariana Duarte', leitura: '6 min' },
  { iso: '2026-08-28', dia: '28', mes: 'ago', ano: '2026', cat: 'Cultura', titulo: 'Por que toda sexta tem demo interna (e post-mortem sem culpados)', resumo: 'Os dois rituais que seguraram a qualidade enquanto o time triplicou de tamanho.', autor: 'Camila Ferreira', leitura: '4 min' },
]

export default function BlogEmListaComDataLateral() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Blog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Todos os artigos</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Rss className="size-4" /> Assinar o feed
          </a>
        </div>

        <ol className="mt-10 divide-y border-y">
          {POSTS.map((p) => (
            <li key={p.iso}>
              <a href="#" className="group grid grid-cols-[64px_1fr] gap-5 py-6 sm:grid-cols-[88px_1fr_auto] sm:gap-8">
                <time dateTime={p.iso} className="flex flex-col leading-none">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{p.dia}</span>
                  <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {p.mes} {p.ano}
                  </span>
                </time>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{p.cat}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {p.leitura}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:underline sm:text-xl">{p.titulo}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.resumo}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    por <span className="font-medium text-foreground">{p.autor}</span>
                  </p>
                </div>
                <ArrowUpRight className="hidden size-5 self-center text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex justify-center">
          <Button variant="outline">Carregar mais artigos</Button>
        </div>
      </div>
    </section>
  )
}
