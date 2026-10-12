'use client'

import { CheckCircle2, Circle, CircleDot } from 'lucide-react'

type Status = 'feito' | 'andamento' | 'planejado'

const STATUS: Record<Status, { label: string; dot: string; badge: string; Icon: typeof Circle; icon: string }> = {
  feito: { label: 'Concluído', dot: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', Icon: CheckCircle2, icon: 'text-emerald-500' },
  andamento: { label: 'Em andamento', dot: 'bg-amber-500', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', Icon: CircleDot, icon: 'text-amber-500' },
  planejado: { label: 'Planejado', dot: 'bg-muted-foreground/40', badge: 'bg-muted text-muted-foreground', Icon: Circle, icon: 'text-muted-foreground/50' },
}

const QUARTERS: Array<{ q: string; status: Status; items: Array<{ t: string; s: Status }> }> = [
  { q: '1º tri 2026', status: 'feito', items: [{ t: 'Inbox unificado', s: 'feito' }, { t: 'Importação de contatos por CSV', s: 'feito' }, { t: 'App para iOS', s: 'feito' }] },
  { q: '2º tri 2026', status: 'feito', items: [{ t: 'Automações com IA', s: 'feito' }, { t: 'Relatórios por canal', s: 'feito' }, { t: 'SSO com Google e Microsoft', s: 'feito' }] },
  { q: '3º tri 2026', status: 'andamento', items: [{ t: 'Assistente de IA 2.0', s: 'feito' }, { t: 'Integração com Shopify', s: 'andamento' }, { t: 'API pública v2', s: 'andamento' }] },
  { q: '4º tri 2026', status: 'planejado', items: [{ t: 'Chamadas de voz no inbox', s: 'planejado' }, { t: 'Marketplace de apps', s: 'planejado' }, { t: 'App para Android', s: 'planejado' }] },
]

export default function TimelineDeRoadmap() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Roadmap público</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O que vem por aí em 2026</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${STATUS[s].dot}`} /> {STATUS[s].label}
              </span>
            ))}
          </div>
        </div>
        <ol className="mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {QUARTERS.map((qt, i) => {
            const st = STATUS[qt.status]
            return (
              <li key={qt.q} className="relative">
                <div className="flex items-center gap-3">
                  <span className={`size-3.5 shrink-0 rounded-full ring-4 ring-background ${st.dot} ${qt.status === 'andamento' ? 'animate-pulse' : ''}`} aria-hidden="true" />
                  <span className={`hidden h-px flex-1 lg:block ${qt.status === 'feito' ? 'bg-emerald-500' : 'bg-border'}`} aria-hidden="true" />
                  {qt.status === 'andamento' && <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Agora</span>}
                </div>
                <div className="mt-4 rounded-xl border bg-card p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{qt.q}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${st.badge}`}>{st.label}</span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {qt.items.map((it) => {
                      const Icon = STATUS[it.s].Icon
                      return (
                        <li key={it.t} className="flex items-start gap-2 text-sm">
                          <Icon className={`mt-0.5 size-4 shrink-0 ${STATUS[it.s].icon}`} />
                          <span className={it.s === 'planejado' ? 'text-muted-foreground' : ''}>{it.t}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                {i < QUARTERS.length - 1 && <span className="absolute top-[26px] left-[6px] h-[calc(100%+2rem)] w-px bg-border lg:hidden" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
