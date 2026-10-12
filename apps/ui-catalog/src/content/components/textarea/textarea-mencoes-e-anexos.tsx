'use client'

import { useState } from 'react'
import { AtSign, FileText, Image, Paperclip, Send, Smile, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const PESSOAS = [
  { ini: 'AS', nome: 'Ana Souza', cargo: 'Vendas' },
  { ini: 'BR', nome: 'Bruno Rocha', cargo: 'Sucesso do cliente' },
  { ini: 'CM', nome: 'Carla Mendes', cargo: 'Financeiro' },
  { ini: 'DL', nome: 'Diego Lima', cargo: 'Engenharia' },
]

const ANEXOS_POSSIVEIS = [
  { nome: 'proposta-kavo-v2.pdf', tamanho: '1,8 MB', Icon: FileText },
  { nome: 'print-erro-checkout.png', tamanho: '420 KB', Icon: Image },
]

const MAX = 500

const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

export default function TextareaMencoesEAnexos() {
  const [texto, setTexto] = useState('Pessoal, revisei a proposta. @Br')
  const [anexos, setAnexos] = useState([ANEXOS_POSSIVEIS[0]!])
  const [enviados, setEnviados] = useState(0)

  const mencao = texto.match(/@([\p{L}]*)$/u)
  const sugestoes = mencao ? PESSOAS.filter((p) => normalizar(p.nome).startsWith(normalizar(mencao[1] ?? ''))) : []
  const mencionados = PESSOAS.filter((p) => texto.includes(`@${p.nome}`))

  const inserir = (nome: string) => setTexto((t) => t.replace(/@[\p{L}]*$/u, `@${nome} `))
  const anexar = () => {
    const prox = ANEXOS_POSSIVEIS.find((a) => !anexos.some((x) => x.nome === a.nome))
    if (prox) setAnexos((l) => [...l, prox])
  }
  const enviar = () => {
    if (!texto.trim()) return
    setEnviados((n) => n + 1)
    setTexto('')
    setAnexos([])
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <Label htmlFor="ta-comentario">Comentário no negócio Kavo</Label>
      <InputGroup className="items-stretch">
        <InputGroupTextarea id="ta-comentario" rows={3} maxLength={MAX} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva um comentário… use @ para mencionar" />

        {sugestoes.length > 0 && (
          <InputGroupAddon align="block-end" className="border-t p-1">
            <ul className="w-full" role="listbox" aria-label="Pessoas para mencionar">
              {sugestoes.map((p, i) => (
                <li key={p.nome} role="option" aria-selected={i === 0}>
                  <button type="button" onClick={() => inserir(p.nome)} className={cn('flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent', i === 0 && 'bg-accent')}>
                    <Avatar size="sm">
                      <AvatarFallback>{p.ini}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{p.nome}</span>
                    <span className="text-xs text-muted-foreground">{p.cargo}</span>
                  </button>
                </li>
              ))}
            </ul>
          </InputGroupAddon>
        )}

        {anexos.length > 0 && (
          <InputGroupAddon align="block-end" className="flex-wrap gap-1.5 pb-1">
            {anexos.map((a) => (
              <span key={a.nome} className="inline-flex h-6 items-center gap-1.5 rounded-md border bg-muted/50 pr-1 pl-2 text-xs">
                <a.Icon className="size-3.5 text-muted-foreground" /> {a.nome}
                <span className="text-muted-foreground">{a.tamanho}</span>
                <button type="button" aria-label={`Remover ${a.nome}`} onClick={() => setAnexos((l) => l.filter((x) => x.nome !== a.nome))} className="flex size-4 items-center justify-center rounded-sm hover:bg-muted">
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </InputGroupAddon>
        )}

        <InputGroupAddon align="block-end" className="justify-between border-t">
          <div className="flex items-center gap-0.5">
            <InputGroupButton size="icon-xs" aria-label="Anexar arquivo" onClick={anexar} disabled={anexos.length >= ANEXOS_POSSIVEIS.length}>
              <Paperclip />
            </InputGroupButton>
            <InputGroupButton size="icon-xs" aria-label="Mencionar alguém" onClick={() => setTexto((t) => (t.endsWith(' ') || !t ? `${t}@` : `${t} @`))}>
              <AtSign />
            </InputGroupButton>
            <InputGroupButton size="icon-xs" aria-label="Inserir emoji" onClick={() => setTexto((t) => `${t}🙂`)}>
              <Smile />
            </InputGroupButton>
            <InputGroupText className={cn('ml-2 text-xs tabular-nums', texto.length > MAX - 50 && 'text-amber-600 dark:text-amber-400')}>
              {texto.length}/{MAX}
            </InputGroupText>
          </div>
          <InputGroupButton variant="default" onClick={enviar} disabled={!texto.trim()}>
            <Send data-icon="inline-start" /> Comentar
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex min-h-5 flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {mencionados.length > 0 ? (
          <>
            Vai notificar:
            {mencionados.map((p) => (
              <span key={p.nome} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                @{p.nome}
              </span>
            ))}
          </>
        ) : enviados > 0 ? (
          `${enviados} comentário${enviados > 1 ? 's' : ''} publicado${enviados > 1 ? 's' : ''}.`
        ) : (
          'Digite @ seguido do nome para mencionar alguém.'
        )}
      </div>
    </div>
  )
}
