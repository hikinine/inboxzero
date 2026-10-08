'use client'

const STATS = [
  { value: '2.400+', label: 'equipes ativas' },
  { value: '38 mi', label: 'mensagens por mês' },
  { value: '99,98%', label: 'uptime nos últimos 12 meses' },
  { value: '< 2 s', label: 'tempo médio da IA' },
]

export default function StatsFaixa() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-2xl border bg-card px-6 py-10">
        <dl className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="text-4xl font-semibold tracking-tight tabular-nums">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
