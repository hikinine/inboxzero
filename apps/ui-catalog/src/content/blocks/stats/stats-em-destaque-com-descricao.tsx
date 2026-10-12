'use client'

import { motion } from 'motion/react'

const DESTAQUES = [
  { numero: '38', unidade: 'mi', titulo: 'mensagens por mês', texto: 'Cada uma passa por fila, roteamento e IA em menos de dois segundos. É mais volume do que a maior rede de farmácias do país recebe em um ano inteiro.', fonte: 'Média de janeiro a setembro de 2026' },
  { numero: '1:42', unidade: 'min', titulo: 'de tempo médio até a primeira resposta', texto: 'Contando filas cheias de segunda-feira e madrugadas de Black Friday. Antes da plataforma, a média dos mesmos clientes era de 23 minutos.', fonte: 'Mediana de 2.400 contas ativas' },
  { numero: '94', unidade: '%', titulo: 'de retenção líquida de receita', texto: 'Quem fica gasta mais ao longo do tempo: abre novos canais, adiciona atendentes e liga a IA. O churn anual está abaixo de 6%.', fonte: 'Últimos 12 meses' },
]

export default function StatsEmDestaqueComDescricao() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Três números</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O que a escala muda na prática</h2>
        </div>
        <ol className="mt-6 divide-y">
          {DESTAQUES.map((d, i) => (
            <motion.li key={d.titulo} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="grid gap-4 py-10 sm:py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center md:gap-12">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <p className="text-7xl font-semibold tracking-tighter tabular-nums sm:text-8xl lg:text-9xl">
                  {d.numero}
                  <span className="ml-1 text-2xl font-medium tracking-normal text-muted-foreground sm:text-3xl">{d.unidade}</span>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{d.titulo}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{d.texto}</p>
                <p className="mt-3 text-xs text-muted-foreground/70">{d.fonte}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
