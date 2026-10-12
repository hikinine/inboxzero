'use client'

import { useState } from 'react'
import { Archive, Clock, Ellipsis, Forward, Paperclip, Reply, Search, Star, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Email {
  id: number
  remetente: string
  email: string
  iniciais: string
  assunto: string
  previa: string
  hora: string
  data: string
  lido: boolean
  etiqueta?: string
  anexos?: string[]
  corpo: string[]
}

const EMAILS: Email[] = [
  {
    id: 1,
    remetente: 'Marina Costa',
    email: 'marina@clinicavida.com.br',
    iniciais: 'MC',
    assunto: 'Proposta de implantação — dúvidas da diretoria',
    previa: 'Oi Ana, revisamos a proposta com a diretoria e ficaram três pontos…',
    hora: '09:42',
    data: 'Hoje, 09:42',
    lido: false,
    etiqueta: 'Cliente',
    anexos: ['proposta-clinica-vida-v2.pdf', 'cronograma.xlsx'],
    corpo: [
      'Oi Ana, tudo bem?',
      'Revisamos a proposta com a diretoria ontem à tarde e ficaram três pontos para alinhar antes da assinatura: o prazo de implantação (vocês falaram em 30 dias, conseguimos 21?), a quantidade de números de WhatsApp incluídos e se o treinamento das recepcionistas está contemplado.',
      'Se der, podemos fechar isso numa call de 20 minutos ainda esta semana. Quinta às 15h funciona para você?',
      'Abraço, Marina',
    ],
  },
  {
    id: 2,
    remetente: 'Rafael Nunes',
    email: 'rafael.nunes@totvs.com.br',
    iniciais: 'RN',
    assunto: 'Re: Integração com ERP',
    previa: 'Confirmando: a API de pedidos já está liberada no ambiente de homologação.',
    hora: '08:15',
    data: 'Hoje, 08:15',
    lido: false,
    etiqueta: 'Parceiro',
    corpo: ['Ana,', 'Confirmando: a API de pedidos já está liberada no ambiente de homologação. As credenciais foram enviadas para o time técnico de vocês por canal seguro.', 'Qualquer erro 4xx me avisa que olho na hora.', 'Rafael'],
  },
  {
    id: 3,
    remetente: 'Equipe Lumi',
    email: 'resumo@lumi.com.br',
    iniciais: 'L',
    assunto: 'Resumo semanal: 32 negócios movidos',
    previa: 'Seu time avançou 32 negócios, fechou R$ 84.300 e respondeu em 4 min em média.',
    hora: 'ontem',
    data: 'Ontem, 08:00',
    lido: true,
    corpo: ['Bom dia, Ana!', 'Na última semana o time avançou 32 negócios, fechou R$ 84.300,00 e manteve o tempo médio de primeira resposta em 4 minutos.', 'Destaque para Bruno Rocha, que fechou 3 contratos enterprise.'],
  },
  {
    id: 4,
    remetente: 'Juliana Alves',
    email: 'juliana@bistrooliva.com.br',
    iniciais: 'JA',
    assunto: 'Contrato assinado!',
    previa: 'Acabei de assinar pelo link. Quando começa o onboarding?',
    hora: 'ontem',
    data: 'Ontem, 17:21',
    lido: true,
    etiqueta: 'Cliente',
    corpo: ['Ana, acabei de assinar pelo link. Quando começa o onboarding? Quero deixar a equipe da cozinha preparada para usar o cardápio digital.', 'Obrigada!', 'Ju'],
  },
  {
    id: 5,
    remetente: 'Pedro Henrique',
    email: 'pedro@agenciapulso.com',
    iniciais: 'PH',
    assunto: 'Pode me ligar hoje à tarde?',
    previa: 'Surgiu um cliente querendo o Lumi para 3 lojas. Preciso de um preço de parceiro.',
    hora: 'seg',
    data: 'Segunda, 14:03',
    lido: false,
    corpo: ['Surgiu um cliente querendo o Lumi para 3 lojas. Preciso de um preço de parceiro para fechar ainda esta semana.', 'Me liga quando puder: (11) 99876-5432.'],
  },
  {
    id: 6,
    remetente: 'Pagar.me',
    email: 'financeiro@pagar.me',
    iniciais: 'P',
    assunto: 'Fatura #4821 disponível',
    previa: 'A fatura de outubro no valor de R$ 149,00 já está disponível para download.',
    hora: 'seg',
    data: 'Segunda, 06:00',
    lido: true,
    anexos: ['fatura-4821.pdf'],
    corpo: ['A fatura de outubro no valor de R$ 149,00 já está disponível. O pagamento será cobrado automaticamente no cartão terminado em 4242 em 12/10.'],
  },
  {
    id: 7,
    remetente: 'Fernanda Lima',
    email: 'fernanda@lumi.com.br',
    iniciais: 'FL',
    assunto: 'Pauta da reunião de quinta',
    previa: 'Segue a pauta: metas de Q4, novo fluxo de onboarding e contratação de SDR.',
    hora: 'dom',
    data: 'Domingo, 21:10',
    lido: true,
    corpo: ['Segue a pauta para quinta: metas de Q4, novo fluxo de onboarding e contratação de mais um SDR.', 'Se quiser incluir algo, me manda até quarta.'],
  },
]

export default function InboxEmails() {
  const [selecionado, setSelecionado] = useState(1)
  const [lidos, setLidos] = useState<number[]>(EMAILS.filter((e) => e.lido).map((e) => e.id).concat(1))
  const [estrelados, setEstrelados] = useState<number[]>([4])
  const atual = EMAILS.find((e) => e.id === selecionado) ?? EMAILS[0]
  const naoLidos = EMAILS.filter((e) => !lidos.includes(e.id)).length

  function abrir(id: number) {
    setSelecionado(id)
    setLidos((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-xl border bg-card md:h-[640px] md:grid-cols-[320px_1fr]">
          <div className="flex min-h-0 flex-col border-b md:border-r md:border-b-0">
            <div className="space-y-2 border-b p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Caixa de entrada</h2>
                {naoLidos > 0 && <Badge variant="secondary">{naoLidos} não lidos</Badge>}
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar e-mails" className="pl-8" aria-label="Buscar e-mails" />
              </div>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto">
              {EMAILS.map((e) => {
                const lido = lidos.includes(e.id)
                const ativo = e.id === selecionado
                return (
                  <li key={e.id}>
                    <button type="button" onClick={() => abrir(e.id)} className={cn('flex w-full gap-3 border-b px-3 py-3 text-left transition-colors hover:bg-muted/60', ativo && 'bg-muted')}>
                      <Avatar size="sm" className="mt-0.5">
                        <AvatarFallback>{e.iniciais}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={cn('truncate text-sm', !lido && 'font-semibold')}>{e.remetente}</span>
                          <span className="ml-auto shrink-0 text-xs text-muted-foreground">{e.hora}</span>
                        </div>
                        <p className={cn('truncate text-sm', !lido ? 'font-medium' : 'text-foreground/80')}>{e.assunto}</p>
                        <p className="truncate text-xs text-muted-foreground">{e.previa}</p>
                      </div>
                      <span className={cn('mt-2 size-2 shrink-0 rounded-full', lido ? 'bg-transparent' : 'bg-primary')} />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex min-h-0 flex-col">
            <div className="flex items-center gap-1 border-b px-3 py-2">
              <Button variant="ghost" size="icon-sm" aria-label="Arquivar">
                <Archive />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Excluir">
                <Trash2 />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Adiar">
                <Clock />
              </Button>
              <span className="mx-1 h-5 w-px bg-border" />
              <Button variant="ghost" size="icon-sm" aria-label="Responder">
                <Reply />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Encaminhar">
                <Forward />
              </Button>
              <span className="flex-1" />
              <Button variant="ghost" size="icon-sm" aria-label={estrelados.includes(atual.id) ? 'Remover estrela' : 'Marcar com estrela'} onClick={() => setEstrelados((prev) => (prev.includes(atual.id) ? prev.filter((x) => x !== atual.id) : [...prev, atual.id]))}>
                <Star className={cn(estrelados.includes(atual.id) && 'fill-amber-400 text-amber-400')} />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
                <Ellipsis />
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <h3 className="text-lg font-semibold">{atual.assunto}</h3>
              <div className="mt-4 flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>{atual.iniciais}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{atual.remetente}</span>
                    <span className="truncate text-xs text-muted-foreground">&lt;{atual.email}&gt;</span>
                    {atual.etiqueta && <Badge variant="outline">{atual.etiqueta}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">para mim · {atual.data}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm leading-relaxed">
                {atual.corpo.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {atual.anexos && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {atual.anexos.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs">
                      <Paperclip className="size-3.5 text-muted-foreground" /> {a}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t p-3">
              <Textarea rows={2} placeholder={`Responder para ${atual.remetente}…`} aria-label="Resposta" />
              <div className="mt-2 flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <Paperclip data-icon="inline-start" /> Anexar
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Forward data-icon="inline-start" /> Encaminhar
                  </Button>
                  <Button size="sm">
                    <Reply data-icon="inline-start" /> Responder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
