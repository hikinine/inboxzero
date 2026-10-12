'use client'

import { useState } from 'react'
import { ArrowRight, Check, Copy, Share2, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const POSICAO_BASE = 1484
const PROXIMO_LOTE = 1000
const TOTAL_FILA = 12480
const SALTO = 100

interface Convite {
  nome: string
  iniciais: string
  aceito: boolean
}

const CONVITES_INICIAIS: Convite[] = [
  { nome: 'Ana Souza', iniciais: 'AS', aceito: true },
  { nome: 'Bruno Rocha', iniciais: 'BR', aceito: true },
  { nome: 'Carla Mendes', iniciais: 'CM', aceito: false },
]

export default function ListaDeEsperaComPosicaoNaFila() {
  const [inscrito, setInscrito] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [convites, setConvites] = useState<Convite[]>(CONVITES_INICIAIS)

  const aceitos = convites.filter((c) => c.aceito).length
  const posicao = Math.max(POSICAO_BASE - aceitos * SALTO, 1)
  const faltam = Math.max(posicao - PROXIMO_LOTE, 0)
  const progresso = Math.min(100, Math.round(((POSICAO_BASE - posicao) / (POSICAO_BASE - PROXIMO_LOTE)) * 100))
  const pendente = convites.find((c) => !c.aceito)
  const primeiroNome = pendente ? pendente.nome.split(' ')[0] : ''

  const copiar = () => {
    setCopiado(true)
    window.setTimeout(() => setCopiado(false), 1600)
  }
  const aceitarPendente = () => {
    if (!pendente) return
    const nome = pendente.nome
    setConvites((cs) => cs.map((c) => (c.nome === nome ? { ...c, aceito: true } : c)))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="secondary" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" /> Acesso antecipado · 2º lote
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Entre na fila do Flows e suba de posição convidando amigos</h2>
          <p className="mt-4 text-muted-foreground">Automações visuais para WhatsApp, Instagram e e-mail. Liberamos o acesso em lotes de mil pessoas; cada convite aceito sobe você {SALTO} posições.</p>

          {inscrito ? (
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="size-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">Você está na fila!</p>
                <p className="text-muted-foreground">Posição #{posicao.toLocaleString('pt-BR')}. Veja ao lado como subir.</p>
              </div>
            </div>
          ) : (
            <form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault()
                setInscrito(true)
              }}
            >
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="fila-nome">Nome</FieldLabel>
                    <Input id="fila-nome" placeholder="Paula Santos" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="fila-email">E-mail de trabalho</FieldLabel>
                    <Input id="fila-email" type="email" placeholder="paula@empresa.com.br" required />
                  </Field>
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Entrar na lista <ArrowRight data-icon="inline-end" />
                </Button>
              </FieldGroup>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">{TOTAL_FILA.toLocaleString('pt-BR')} pessoas na fila · sem spam, um único e-mail quando chegar a sua vez.</p>
        </div>

        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sua posição</p>
              <p className="mt-1 text-6xl font-semibold tracking-tighter tabular-nums">#{posicao.toLocaleString('pt-BR')}</p>
              <p className="mt-1 text-sm text-muted-foreground">de {TOTAL_FILA.toLocaleString('pt-BR')} na fila</p>
            </div>
            <Badge variant="outline" className="shrink-0">
              Lote 2 · nov 2026
            </Badge>
          </div>
          <Progress value={progresso} className="mt-6" aria-label="Progresso até o próximo lote" />
          <p className="mt-2 text-xs text-muted-foreground">{faltam > 0 ? `Faltam ${faltam.toLocaleString('pt-BR')} posições para entrar no próximo lote` : 'Você entrou no próximo lote!'}</p>

          <div className="mt-6 border-t pt-6">
            <p className="text-sm font-medium">Convide amigos e suba {SALTO} posições por convite aceito</p>
            <InputGroup className="mt-3">
              <InputGroupInput readOnly value="acme.com.br/flows?ref=PS7K2" aria-label="Seu link de convite" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={copiar} variant="secondary" aria-label="Copiar link de convite">
                  {copiado ? <Check className="text-emerald-500" /> : <Copy />} {copiado ? 'Copiado' : 'Copiar'}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Share2 data-icon="inline-start" /> Compartilhar
              </Button>
              <Button variant="ghost" size="sm" onClick={aceitarPendente} disabled={!pendente}>
                <UserPlus data-icon="inline-start" /> {pendente ? `Marcar ${primeiroNome} como aceito` : 'Todos os convites aceitos'}
              </Button>
            </div>
            <ul className="mt-5 space-y-2.5">
              {convites.map((c) => (
                <li key={c.nome} className="flex items-center gap-3 text-sm">
                  <Avatar size="sm">
                    <AvatarFallback>{c.iniciais}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate">{c.nome}</span>
                  <span className={cn('inline-flex items-center gap-1 text-xs', c.aceito ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>
                    {c.aceito ? (
                      <>
                        <Check className="size-3" /> Aceitou · −{SALTO}
                      </>
                    ) : (
                      'Convite enviado'
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
