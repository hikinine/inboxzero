'use client'

import { ArrowRight, ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CASES = [
  { cliente: 'Loja Bem-te-vi', iniciais: 'BV', tone: 'from-rose-500 to-orange-400', setor: 'Varejo', servico: 'E-commerce', ano: '2026', metrica: 'conversão no checkout', valor: '+38%', sobe: true },
  { cliente: 'Clínica Vitalis', iniciais: 'CV', tone: 'from-sky-500 to-cyan-400', setor: 'Saúde', servico: 'App mobile', ano: '2026', metrica: 'agendamentos online', valor: '+62%', sobe: true },
  { cliente: 'Banco Horizonte', iniciais: 'BH', tone: 'from-violet-600 to-indigo-400', setor: 'Fintech', servico: 'Portal do cliente', ano: '2025', metrica: 'chamados no suporte', valor: '−41%', sobe: false },
  { cliente: 'Transportadora Rota Sul', iniciais: 'RS', tone: 'from-slate-600 to-zinc-400', setor: 'Logística', servico: 'Sistema com IA', ano: '2025', metrica: 'gasto com combustível', valor: '−18%', sobe: false },
  { cliente: 'Escola Novo Saber', iniciais: 'NS', tone: 'from-emerald-500 to-lime-400', setor: 'Educação', servico: 'Matrícula online', ano: '2025', metrica: 'tempo de matrícula', valor: '−73%', sobe: false },
  { cliente: 'Café Mirante', iniciais: 'CM', tone: 'from-amber-500 to-yellow-300', setor: 'Alimentação', servico: 'Branding', ano: '2024', metrica: 'ticket médio', valor: '+21%', sobe: true },
]

const COLUNAS = 'md:grid-cols-[2fr_1.1fr_1fr_0.6fr_1.4fr_1.5rem]'

export default function PortfolioEmListaComResultados() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Resultados</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O que mudou depois do projeto</h2>
            <p className="mt-3 text-muted-foreground">Uma linha por cliente, um número por linha. Sem print de tela: só o indicador que combinamos mover.</p>
          </div>
          <Button variant="outline" className="w-fit">
            Todos os cases <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border bg-card">
          <div className={`hidden gap-4 border-b bg-muted/40 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid ${COLUNAS}`}>
            <span>Cliente</span>
            <span>Serviço</span>
            <span>Setor</span>
            <span>Ano</span>
            <span>Resultado</span>
            <span />
          </div>
          <ul className="divide-y">
            {CASES.map((c) => (
              <li key={c.cliente}>
                <a href="#" className={`group grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40 ${COLUNAS}`}>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white ${c.tone}`}>{c.iniciais}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{c.cliente}</span>
                      <span className="block truncate text-xs text-muted-foreground md:hidden">
                        {c.servico} · {c.setor} · {c.ano}
                      </span>
                    </span>
                  </span>
                  <span className="hidden md:block">
                    <Badge variant="secondary">{c.servico}</Badge>
                  </span>
                  <span className="hidden text-sm text-muted-foreground md:block">{c.setor}</span>
                  <span className="hidden text-sm tabular-nums text-muted-foreground md:block">{c.ano}</span>
                  <span className="text-right md:text-left">
                    <span className={`inline-flex items-center gap-1 text-2xl font-semibold tracking-tight tabular-nums ${c.sobe ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'}`}>
                      {c.sobe ? <TrendingUp className="size-5" /> : <TrendingDown className="size-5" />}
                      {c.valor}
                    </span>
                    <span className="block text-xs text-muted-foreground">{c.metrica}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Resultados medidos seis meses após a entrega, comparados com o mesmo período do ano anterior.</p>
      </div>
    </section>
  )
}
