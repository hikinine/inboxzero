'use client'

import { useState } from 'react'
import { ArrowRight, CalendarDays, ChevronDown, Clock, PlayCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const PASSOS = [
  { id: 'conta', titulo: 'Crie sua conta', descricao: 'Feito! Seu workspace Lumi Tecnologia está no ar.', tempo: '1 min', cta: 'Ver workspace' },
  { id: 'whatsapp', titulo: 'Conecte o WhatsApp', descricao: 'Escaneie o QR code para receber as mensagens direto no inbox.', tempo: '2 min', cta: 'Conectar número' },
  { id: 'contatos', titulo: 'Importe seus contatos', descricao: 'Suba uma planilha ou conecte o Google Contatos. A gente remove duplicados automaticamente.', tempo: '3 min', cta: 'Importar CSV' },
  { id: 'time', titulo: 'Convide seu time', descricao: 'Vendedores e atendentes entram como editores e já veem o pipeline.', tempo: '1 min', cta: 'Enviar convites' },
  { id: 'automacao', titulo: 'Crie sua primeira automação', descricao: 'Comece pelo modelo “Boas-vindas a novos leads” — ele já vem pronto.', tempo: '5 min', cta: 'Usar modelo' },
]

export default function OnboardingChecklist() {
  const [feitos, setFeitos] = useState<string[]>(['conta', 'whatsapp'])
  const [aberto, setAberto] = useState<string | null>('contatos')
  const progresso = Math.round((feitos.length / PASSOS.length) * 100)

  function marcar(id: string, v: boolean) {
    setFeitos((prev) => (v ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id)))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Primeiros passos</p>
                <h2 className="mt-1 text-xl font-semibold">Configure sua conta</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-lg font-semibold text-foreground">{feitos.length}</span> de {PASSOS.length} concluídos
              </p>
            </div>
            <Progress value={progresso} className="mt-4" aria-label="Progresso do checklist" />
          </div>
          <ol className="divide-y">
            {PASSOS.map((p, i) => {
              const feito = feitos.includes(p.id)
              const expandido = aberto === p.id
              return (
                <li key={p.id} className={cn('transition-colors', expandido && 'bg-muted/40')}>
                  <div className="flex items-center gap-3 px-5 py-3">
                    <Checkbox checked={feito} onCheckedChange={(v) => marcar(p.id, v)} aria-label={`Marcar “${p.titulo}” como concluído`} />
                    <button type="button" onClick={() => setAberto(expandido ? null : p.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left" aria-expanded={expandido}>
                      <span className={cn('truncate text-sm font-medium', feito && 'text-muted-foreground line-through')}>
                        {i + 1}. {p.titulo}
                      </span>
                      <span className="ml-auto hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                        <Clock className="size-3" /> {p.tempo}
                      </span>
                      <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', expandido && 'rotate-180')} />
                    </button>
                  </div>
                  {expandido && (
                    <div className="px-5 pb-4 pl-12">
                      <p className="text-sm text-muted-foreground">{p.descricao}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => marcar(p.id, true)}>
                          {p.cta} <ArrowRight data-icon="inline-end" />
                        </Button>
                        {!feito && (
                          <Button size="sm" variant="ghost" onClick={() => setAberto(PASSOS[i + 1]?.id ?? null)}>
                            Pular por enquanto
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Renata Martins</p>
                <p className="text-xs text-muted-foreground">Sua especialista de onboarding</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Quer que eu configure com você? Em 30 minutos deixamos o pipeline e o WhatsApp prontos.</p>
            <Button className="mt-4 w-full" variant="outline">
              <CalendarDays data-icon="inline-start" /> Agendar onboarding
            </Button>
          </div>
          <div className="rounded-xl border bg-gradient-to-br from-muted to-muted-foreground/10 p-5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-background shadow-sm">
              <PlayCircle className="size-5" />
            </div>
            <p className="mt-3 text-sm font-medium">Tour de 4 minutos</p>
            <p className="text-xs text-muted-foreground">Veja o inbox, o pipeline e as automações em ação.</p>
            <Button size="sm" variant="link" className="mt-2 px-0">
              Assistir agora <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}
