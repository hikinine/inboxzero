'use client'

import { useState } from 'react'
import { AlertCircle, Archive, ArchiveX, Clock, FileText, Forward, Inbox, MoreHorizontal, Paperclip, PenLine, Reply, Search, Send, Settings, Star, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Msg {
  id: number
  from: string
  email: string
  subject: string
  preview: string
  time: string
  unread: boolean
  starred: boolean
  label?: string
  body: string[]
  attachments?: Array<[string, string]>
}

const FOLDERS = [
  { Icon: Inbox, l: 'Entrada', n: 12, active: true },
  { Icon: Star, l: 'Marcados', n: 3 },
  { Icon: Send, l: 'Enviados' },
  { Icon: FileText, l: 'Rascunhos', n: 2 },
  { Icon: Archive, l: 'Arquivo' },
  { Icon: AlertCircle, l: 'Spam', n: 5 },
  { Icon: Trash2, l: 'Lixeira' },
]
const LABELS: Array<[string, string]> = [
  ['Clientes', 'bg-emerald-500'],
  ['Financeiro', 'bg-amber-500'],
  ['Suporte', 'bg-sky-500'],
  ['Pessoal', 'bg-rose-500'],
]

const MESSAGES: Msg[] = [
  { id: 1, from: 'Beatriz Nogueira', email: 'beatriz@lumi.com.br', subject: 'Proposta revisada — contrato anual', preview: 'Oi, Ana! Conforme conversamos, segue a proposta com o desconto de 12% para o plano anual…', time: '09:42', unread: true, starred: true, label: 'Clientes', body: ['Oi, Ana!', 'Conforme conversamos ontem, segue a proposta revisada com o desconto de 12% para o plano anual e a inclusão do módulo de relatórios sem custo adicional nos primeiros 3 meses.', 'O jurídico já validou as cláusulas de LGPD. Se estiver tudo certo, podemos assinar ainda esta semana e começar a implantação na segunda-feira.', 'Qualquer ajuste, é só me falar.', 'Abraço,\nBeatriz'], attachments: [['Proposta_Lumi_v3.pdf', '248 KB'], ['Minuta_contrato.docx', '96 KB']] },
  { id: 2, from: 'Nota fiscal · Nimbo', email: 'cobranca@nimbo.app', subject: 'Sua fatura de outubro está disponível', preview: 'A fatura no valor de R$ 399,00 referente ao plano Profissional foi emitida…', time: '08:15', unread: true, starred: false, label: 'Financeiro', body: ['Olá,', 'A fatura no valor de R$ 399,00 referente ao plano Profissional (outubro de 2026) foi emitida e vence em 20/10/2026.', 'O boleto e a NF-e estão em anexo. Se o pagamento já foi feito, desconsidere este aviso.'], attachments: [['NFe_10-2026.pdf', '112 KB']] },
  { id: 3, from: 'Rafael Nunes', email: 'rafael.nunes@kavo.com', subject: 'Re: integração com o ERP', preview: 'Consegui rodar a sincronização em homologação. Ficou faltando só o mapeamento de…', time: 'ontem', unread: false, starred: false, label: 'Suporte', body: ['Ana,', 'Consegui rodar a sincronização em homologação. Ficou faltando só o mapeamento do campo “centro de custo”, que no ERP é obrigatório.', 'Você consegue me dizer qual campo do Atende devo usar? Se não existir, podemos criar um campo personalizado.', 'Valeu!'] },
  { id: 4, from: 'Camila Rocha', email: 'camila@prismadados.com', subject: 'Feedback do piloto — semana 2', preview: 'O time adorou a fila automática. Dois pontos de atenção: notificações em excesso e…', time: 'ontem', unread: true, starred: false, label: 'Clientes', body: ['Oi, Ana.', 'O time adorou a fila automática — ninguém mais briga por conversa. Dois pontos de atenção: as notificações estão em excesso no horário de pico e o relatório semanal chegou sem o gráfico de SLA.', 'Podemos marcar 20 minutos na quinta para alinhar?'] },
  { id: 5, from: 'Equipe Atende', email: 'novidades@atende.app', subject: 'Novidades de outubro: respostas com IA e temas', preview: 'Agora o Atende sugere respostas com base no histórico da conversa e você pode…', time: 'seg.', unread: false, starred: true, body: ['Novidades do mês:', '• Sugestões de resposta com IA, baseadas no histórico da conversa.\n• Tema escuro automático.\n• Exportação de conversas em PDF.', 'Veja tudo no changelog.'] },
  { id: 6, from: 'Diego Lima', email: 'diego.lima@gmail.com', subject: 'Almoço na sexta?', preview: 'Vai dar pra sair 12h30? Tô pensando naquele japonês perto do escritório…', time: 'seg.', unread: false, starred: false, label: 'Pessoal', body: ['Vai dar pra sair 12h30? Tô pensando naquele japonês perto do escritório. Chamei a Lu também.'] },
  { id: 7, from: 'Suporte · Ponte', email: 'suporte@ponte.io', subject: 'Chamado #4821 resolvido', preview: 'O webhook de pagamento voltou a disparar normalmente após a correção de hoje…', time: 'dom.', unread: false, starred: false, label: 'Suporte', body: ['Olá, Ana.', 'O webhook de pagamento voltou a disparar normalmente após a correção publicada hoje às 14h. Reenviamos os 37 eventos que ficaram na fila.', 'Se notar qualquer diferença, responda este e-mail que o chamado reabre.'] },
]

const LABEL_TONE: Record<string, string> = Object.fromEntries(LABELS)
const ini = (s: string) => s.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

function IconAction({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label={label} />}>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export default function AppDeInbox() {
  const [sel, setSel] = useState(1)
  const [read, setRead] = useState<number[]>([1])
  const [tab, setTab] = useState<'todas' | 'nao-lidas'>('todas')
  const [q, setQ] = useState('')
  const [stars, setStars] = useState<number[]>(MESSAGES.filter((m) => m.starred).map((m) => m.id))

  const isUnread = (m: Msg) => m.unread && !read.includes(m.id)
  const list = MESSAGES.filter((m) => (tab === 'todas' || isUnread(m)) && (!q.trim() || (m.from + m.subject + m.preview).toLowerCase().includes(q.trim().toLowerCase())))
  const current = MESSAGES.find((m) => m.id === sel) ?? MESSAGES[0]
  const unreadCount = MESSAGES.filter(isUnread).length
  const open = (id: number) => {
    setSel(id)
    setRead((r) => (r.includes(id) ? r : [...r, id]))
  }
  const toggleStar = (id: number) => setStars((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <div className="flex h-screen min-h-[640px] w-full overflow-hidden bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-sidebar p-3 lg:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Inbox className="size-3.5" />
          </span>
          Atende
        </div>
        <Button className="mt-3 justify-start">
          <PenLine data-icon="inline-start" /> Escrever
        </Button>
        <nav className="mt-4 flex flex-col gap-0.5">
          {FOLDERS.map((f) => (
            <a key={f.l} href="#" className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${f.active ? 'bg-sidebar-accent font-medium' : 'text-muted-foreground hover:bg-sidebar-accent'}`}>
              <f.Icon className="size-4" />
              {f.l}
              {f.l === 'Entrada' ? <span className="ml-auto text-xs tabular-nums text-muted-foreground">{unreadCount}</span> : f.n ? <span className="ml-auto text-xs tabular-nums text-muted-foreground">{f.n}</span> : null}
            </a>
          ))}
        </nav>
        <div className="mt-6 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Marcadores</div>
        <nav className="mt-2 flex flex-col gap-0.5">
          {LABELS.map(([l, tone]) => (
            <a key={l} href="#" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent">
              <span className={`size-2 rounded-full ${tone}`} /> {l}
            </a>
          ))}
        </nav>
        <a href="#" className="mt-auto flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent">
          <Settings className="size-4" /> Configurações
        </a>
      </aside>

      <section className="flex w-full shrink-0 flex-col border-r md:w-80 xl:w-96">
        <div className="flex h-14 items-center justify-between border-b px-4">
          <h1 className="font-semibold">Entrada</h1>
          <div className="inline-flex rounded-lg bg-muted p-0.5 text-xs">
            {(
              [
                ['todas', 'Todas'],
                ['nao-lidas', 'Não lidas'],
              ] as const
            ).map(([k, l]) => (
              <button key={k} type="button" onClick={() => setTab(k)} className={`rounded-md px-2.5 py-1 transition-colors ${tab === k ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="border-b p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar mensagens" className="pl-8" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar mensagens" />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {list.length === 0 && <li className="p-8 text-center text-sm text-muted-foreground">Nenhuma mensagem por aqui.</li>}
          {list.map((m) => {
            const unread = isUnread(m)
            return (
              <li key={m.id}>
                <button type="button" onClick={() => open(m.id)} className={`flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors hover:bg-muted/50 ${sel === m.id ? 'bg-muted/60' : ''}`}>
                  <Avatar size="sm" className="mt-0.5">
                    <AvatarFallback>{ini(m.from)}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className={`truncate text-sm ${unread ? 'font-semibold' : 'font-medium'}`}>{m.from}</span>
                      <span className={`shrink-0 text-[11px] ${unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{m.time}</span>
                    </span>
                    <span className={`block truncate text-sm ${unread ? 'font-medium' : ''}`}>{m.subject}</span>
                    <span className="block truncate text-xs text-muted-foreground">{m.preview}</span>
                    {m.label && (
                      <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[10px] text-muted-foreground">
                        <span className={`size-1.5 rounded-full ${LABEL_TONE[m.label] ?? 'bg-muted-foreground'}`} /> {m.label}
                      </span>
                    )}
                  </span>
                  {unread && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <main className="hidden min-w-0 flex-1 flex-col md:flex">
        <div className="flex h-14 items-center gap-1 border-b px-3">
          <IconAction label="Arquivar">
            <Archive />
          </IconAction>
          <IconAction label="Marcar como spam">
            <ArchiveX />
          </IconAction>
          <IconAction label="Excluir">
            <Trash2 />
          </IconAction>
          <Separator orientation="vertical" className="mx-1 h-5 w-px self-center!" />
          <IconAction label="Adiar">
            <Clock />
          </IconAction>
          <div className="ml-auto flex items-center gap-1">
            <IconAction label="Responder">
              <Reply />
            </IconAction>
            <IconAction label="Encaminhar">
              <Forward />
            </IconAction>
            <Separator orientation="vertical" className="mx-1 h-5 w-px self-center!" />
            <IconAction label="Mais ações">
              <MoreHorizontal />
            </IconAction>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="border-b p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">{current.subject}</h2>
              <Button variant="ghost" size="icon-sm" aria-label={stars.includes(current.id) ? 'Remover marcação' : 'Marcar'} onClick={() => toggleStar(current.id)}>
                <Star className={stars.includes(current.id) ? 'fill-amber-400 text-amber-400' : ''} />
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{ini(current.from)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-sm">
                <div className="flex flex-wrap items-center gap-x-2">
                  <span className="font-medium">{current.from}</span>
                  <span className="text-muted-foreground">&lt;{current.email}&gt;</span>
                </div>
                <div className="text-xs text-muted-foreground">para mim · hoje, {current.time}</div>
              </div>
              {current.label && (
                <Badge variant="outline" className="gap-1.5">
                  <span className={`size-1.5 rounded-full ${LABEL_TONE[current.label] ?? 'bg-muted-foreground'}`} /> {current.label}
                </Badge>
              )}
            </div>
          </div>
          <div className="space-y-4 p-6 text-sm leading-relaxed">
            {current.body.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
            {current.attachments && (
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Paperclip className="size-3.5" /> {current.attachments.length} anexo(s)
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {current.attachments.map(([n, s]) => (
                    <a key={n} href="#" className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs hover:bg-muted/50">
                      <FileText className="size-4 text-muted-foreground" />
                      <span className="font-medium">{n}</span>
                      <span className="text-muted-foreground">{s}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <form className="border-t p-4" onSubmit={(e) => e.preventDefault()}>
          <Textarea placeholder={`Responder para ${current.from}…`} rows={3} className="resize-none" aria-label="Responder" />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <IconAction label="Anexar arquivo">
                <Paperclip />
              </IconAction>
              <IconAction label="Agendar envio">
                <Clock />
              </IconAction>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm">
                <Send data-icon="inline-start" /> Enviar
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
