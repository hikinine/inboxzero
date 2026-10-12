'use client'

import { useState, type ReactNode } from 'react'
import { Bell, ChevronsDownUp, ChevronsUpDown, Circle, CircleCheck, CreditCard, Lock, Users, type LucideIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type Tom = 'novo' | 'atencao' | 'ok'
interface Opcao {
  id: string
  label: string
  ativo: boolean
}
interface Secao {
  id: string
  icon: LucideIcon
  titulo: string
  descricao: string
  badge?: { label: string; tom: Tom }
  opcoes: Opcao[]
}

const SECOES: Secao[] = [
  {
    id: 'notificacoes',
    icon: Bell,
    titulo: 'Notificações',
    descricao: 'E-mail, push e resumo semanal',
    badge: { label: '3 novas', tom: 'novo' },
    opcoes: [
      { id: 'email', label: 'Novas mensagens por e-mail', ativo: true },
      { id: 'push', label: 'Push no celular', ativo: true },
      { id: 'resumo', label: 'Resumo semanal às segundas', ativo: false },
    ],
  },
  {
    id: 'seguranca',
    icon: Lock,
    titulo: 'Segurança',
    descricao: 'Senha, 2FA e sessões ativas',
    badge: { label: 'Atenção', tom: 'atencao' },
    opcoes: [
      { id: '2fa', label: 'Autenticação em duas etapas', ativo: false },
      { id: 'alerta', label: 'Avisar sobre login em novo dispositivo', ativo: true },
    ],
  },
  {
    id: 'cobranca',
    icon: CreditCard,
    titulo: 'Cobrança',
    descricao: 'Plano Pro · renova em 12/11',
    badge: { label: 'Em dia', tom: 'ok' },
    opcoes: [
      { id: 'recibo', label: 'Enviar recibo por e-mail', ativo: true },
      { id: 'nf', label: 'Emitir nota fiscal automaticamente', ativo: true },
    ],
  },
  {
    id: 'equipe',
    icon: Users,
    titulo: 'Equipe',
    descricao: '12 membros · 2 convites pendentes',
    opcoes: [
      { id: 'convidar', label: 'Membros podem convidar pessoas', ativo: false },
      { id: 'dominio', label: 'Entrar automaticamente com e-mail @lumi.com.br', ativo: true },
    ],
  },
]
const TODAS = SECOES.map((s) => s.id)

const TOM: Record<Tom, string> = {
  novo: 'bg-primary text-primary-foreground',
  atencao: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  ok: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
}

const CHECKLIST: { id: string; titulo: string; itens: [string, boolean][] }[] = [
  { id: 'conteudo', titulo: 'Conteúdo', itens: [['Página inicial revisada', true], ['Política de privacidade', true], ['FAQ atualizado', false]] },
  { id: 'tecnico', titulo: 'Técnico', itens: [['Domínio apontado', true], ['Certificado SSL ativo', true], ['Analytics instalado', true], ['Sitemap enviado', false]] },
  { id: 'marketing', titulo: 'Marketing', itens: [['E-mail de lançamento', false], ['Posts agendados', false]] },
]

export default function AccordionMultiplosBadges() {
  const [abertas, setAbertas] = useState<string[]>(['notificacoes', 'seguranca'])
  const [opcoes, setOpcoes] = useState<Record<string, boolean>>(() => Object.fromEntries(SECOES.flatMap((s) => s.opcoes.map((o) => [o.id, o.ativo]))))
  const todasAbertas = abertas.length === TODAS.length

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <div className="mb-2 flex items-end justify-between">
          <Legenda className="mb-0">Controlado · vários abertos</Legenda>
          <Button variant="ghost" size="xs" onClick={() => setAbertas(todasAbertas ? [] : TODAS)}>
            {todasAbertas ? <ChevronsDownUp data-icon="inline-start" /> : <ChevronsUpDown data-icon="inline-start" />}
            {todasAbertas ? 'Recolher tudo' : 'Expandir tudo'}
          </Button>
        </div>
        <Accordion multiple value={abertas} onValueChange={(v) => setAbertas(v.map(String))} className="rounded-xl border bg-card px-4">
          {SECOES.map((s) => {
            const ativas = s.opcoes.filter((o) => opcoes[o.id]).length
            return (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="flex flex-1 items-center gap-3 pr-2">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <s.icon className="size-4 text-muted-foreground" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{s.titulo}</span>
                      <span className="block text-xs font-normal text-muted-foreground">{s.descricao}</span>
                    </span>
                    {s.badge ? (
                      <Badge className={TOM[s.badge.tom]}>{s.badge.label}</Badge>
                    ) : (
                      <span className="text-xs font-normal text-muted-foreground tabular-nums">
                        {ativas}/{s.opcoes.length}
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <ul className="divide-y rounded-lg border">
                    {s.opcoes.map((o) => (
                      <li key={o.id} className="flex items-center justify-between gap-3 px-3 py-2">
                        <label htmlFor={`acc-${o.id}`} className="text-sm">
                          {o.label}
                        </label>
                        <Switch id={`acc-${o.id}`} size="sm" checked={!!opcoes[o.id]} onCheckedChange={(v) => setOpcoes((p) => ({ ...p, [o.id]: v }))} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <div>
        <Legenda>Compacto com contadores</Legenda>
        <Accordion multiple defaultValue={['tecnico']} className="rounded-xl border bg-card px-3">
          {CHECKLIST.map((g) => {
            const feitos = g.itens.filter((i) => i[1]).length
            const completo = feitos === g.itens.length
            return (
              <AccordionItem key={g.id} value={g.id}>
                <AccordionTrigger className="py-2.5">
                  <span className="flex flex-1 items-center gap-2 pr-2">
                    <span className={cn('size-2 rounded-full', completo ? 'bg-emerald-500' : feitos ? 'bg-amber-500' : 'bg-muted-foreground/40')} />
                    {g.titulo}
                    <Badge variant="outline" className="ml-auto tabular-nums">
                      {feitos}/{g.itens.length}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-2.5">
                  <ul className="space-y-1 pl-4 text-sm">
                    {g.itens.map(([label, ok]) => (
                      <li key={label} className={cn('flex items-center gap-2', ok && 'text-muted-foreground line-through')}>
                        {ok ? <CircleCheck className="size-3.5 text-emerald-500" /> : <Circle className="size-3.5 text-muted-foreground/60" />}
                        {label}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

function Legenda({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground', className)}>{children}</div>
}
