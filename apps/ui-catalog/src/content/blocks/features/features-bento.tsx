'use client'

import { Bot, Inbox, KanbanSquare, LineChart, ShieldCheck, Workflow } from 'lucide-react'

const ITEMS = [
  { Icon: Inbox, title: 'Inbox unificado', text: 'WhatsApp, Instagram, e-mail e webchat numa fila só, com distribuição automática.', span: 'lg:col-span-2' },
  { Icon: Bot, title: 'IA que qualifica', text: 'Responde, pontua e passa pro humano na hora certa.' },
  { Icon: KanbanSquare, title: 'CRM visual', text: 'Pipelines por produto, metas por vendedor.' },
  { Icon: Workflow, title: 'Automações', text: 'Gatilhos de webinar, carrinho abandonado e follow-up — sem código.', span: 'lg:col-span-2' },
  { Icon: LineChart, title: 'Relatórios', text: 'Funil, origem e ROI por campanha.' },
  { Icon: ShieldCheck, title: 'LGPD por padrão', text: 'Consentimento, retenção e auditoria.' },
]

export default function FeaturesBento() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que o comercial precisa. Nada que ele não usa.</h2>
          <p className="mt-3 text-muted-foreground">Seis módulos que conversam entre si. Comece por um, ligue os outros quando fizer sentido.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <div key={it.title} className={`rounded-xl border bg-card p-5 ${it.span ?? ''}`}>
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <it.Icon className="size-4" />
              </span>
              <h3 className="mt-4 font-medium">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
