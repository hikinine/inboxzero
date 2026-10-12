'use client'

import { useState } from 'react'
import { BellOff, Mail, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type Canal = 'email' | 'push'

interface Evento {
  id: string
  nome: string
  descricao: string
}

const GRUPOS: { titulo: string; eventos: Evento[] }[] = [
  {
    titulo: 'Vendas',
    eventos: [
      { id: 'lead', nome: 'Novo lead', descricao: 'Quando um contato entra pelo site, WhatsApp ou formulário.' },
      { id: 'ganho', nome: 'Negócio ganho', descricao: 'Quando um negócio é marcado como fechado.' },
      { id: 'perdido', nome: 'Negócio perdido', descricao: 'Inclui o motivo informado pelo vendedor.' },
    ],
  },
  {
    titulo: 'Atendimento',
    eventos: [
      { id: 'mensagem', nome: 'Nova mensagem', descricao: 'Em conversas atribuídas a você.' },
      { id: 'atribuida', nome: 'Conversa atribuída', descricao: 'Quando alguém transfere uma conversa para você.' },
      { id: 'sla', nome: 'SLA estourando', descricao: '10 minutos antes do prazo de resposta.' },
    ],
  },
  {
    titulo: 'Conta',
    eventos: [
      { id: 'fatura', nome: 'Fatura disponível', descricao: 'Todo dia 12, com o PDF anexado.' },
      { id: 'resumo', nome: 'Resumo semanal', descricao: 'Segunda-feira às 8h: pipeline e metas.' },
    ],
  },
]

type Prefs = Record<string, Record<Canal, boolean>>

const INICIAL: Prefs = {
  lead: { email: true, push: true },
  ganho: { email: true, push: true },
  perdido: { email: true, push: false },
  mensagem: { email: false, push: true },
  atribuida: { email: true, push: true },
  sla: { email: false, push: true },
  fatura: { email: true, push: false },
  resumo: { email: true, push: false },
}

const TODOS = GRUPOS.flatMap((g) => g.eventos.map((e) => e.id))

export default function ConfiguracoesNotificacoes() {
  const [prefs, setPrefs] = useState<Prefs>(INICIAL)
  const [pausado, setPausado] = useState(false)

  function alternar(id: string, canal: Canal, valor: boolean) {
    setPrefs((p) => ({ ...p, [id]: { ...p[id], [canal]: valor } }))
  }
  function alternarColuna(canal: Canal) {
    const todosLigados = TODOS.every((id) => prefs[id][canal])
    setPrefs((p) => Object.fromEntries(TODOS.map((id) => [id, { ...p[id], [canal]: !todosLigados }])))
  }

  const ligados = TODOS.reduce((n, id) => n + (prefs[id].email ? 1 : 0) + (prefs[id].push ? 1 : 0), 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Escolha o que chega por e-mail e o que chega como push no app. {ligados} de {TODOS.length * 2} ativas.</CardDescription>
            <CardAction>
              <Label htmlFor="cn-pausar" className="gap-2 text-xs font-normal text-muted-foreground">
                <BellOff className="size-3.5" /> Pausar tudo
                <Switch id="cn-pausar" checked={pausado} onCheckedChange={setPausado} />
              </Label>
            </CardAction>
          </CardHeader>
          <CardContent className={cn('transition-opacity', pausado && 'pointer-events-none opacity-50')}>
            <div className="grid grid-cols-[1fr_72px_72px] items-end border-b pb-2 text-xs font-medium text-muted-foreground">
              <span>Evento</span>
              <button type="button" onClick={() => alternarColuna('email')} className="flex flex-col items-center gap-1 rounded-md py-1 hover:text-foreground">
                <Mail className="size-4" /> E-mail
              </button>
              <button type="button" onClick={() => alternarColuna('push')} className="flex flex-col items-center gap-1 rounded-md py-1 hover:text-foreground">
                <Smartphone className="size-4" /> Push
              </button>
            </div>
            {GRUPOS.map((g) => (
              <div key={g.titulo}>
                <p className="pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.titulo}</p>
                <div className="divide-y rounded-lg border">
                  {g.eventos.map((e) => (
                    <div key={e.id} className="grid grid-cols-[1fr_72px_72px] items-center px-3 py-2.5">
                      <div className="min-w-0 pr-4">
                        <p className="text-sm font-medium">{e.nome}</p>
                        <p className="text-xs text-muted-foreground">{e.descricao}</p>
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={prefs[e.id].email} onCheckedChange={(v) => alternar(e.id, 'email', v)} disabled={pausado} aria-label={`${e.nome} por e-mail`} />
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={prefs[e.id].push} onCheckedChange={(v) => alternar(e.id, 'push', v)} disabled={pausado} aria-label={`${e.nome} por push`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 border-t sm:flex-row sm:items-center sm:justify-between">
            <Label htmlFor="cn-resumo" className="gap-3 text-sm font-normal text-muted-foreground">
              Agrupar pushes em um resumo a cada
              <NativeSelect id="cn-resumo" size="sm" defaultValue="0">
                <NativeSelectOption value="0">Enviar na hora</NativeSelectOption>
                <NativeSelectOption value="15">15 minutos</NativeSelectOption>
                <NativeSelectOption value="60">1 hora</NativeSelectOption>
              </NativeSelect>
            </Label>
            <Button>Salvar preferências</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
