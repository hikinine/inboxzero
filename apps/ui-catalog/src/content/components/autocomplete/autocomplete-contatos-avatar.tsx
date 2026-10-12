'use client'

import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Clock, Mail, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Contato {
  nome: string
  email: string
  cor: string
  recente?: boolean
}

const CONTATOS: Contato[] = [
  { nome: 'Ana Souza', email: 'ana.souza@lumi.com.br', cor: 'bg-sky-500', recente: true },
  { nome: 'Bruno Rocha', email: 'bruno@rochaefilhos.com.br', cor: 'bg-emerald-500', recente: true },
  { nome: 'Carla Mendes', email: 'carla@mendesadv.com.br', cor: 'bg-violet-500' },
  { nome: 'Diego Lima', email: 'diego@studiolima.design', cor: 'bg-amber-500' },
  { nome: 'Elisa Prado', email: 'elisa.prado@lumi.com.br', cor: 'bg-rose-500' },
  { nome: 'Felipe Nunes', email: 'felipe@nuneslog.com.br', cor: 'bg-teal-500' },
  { nome: 'Gabriela Reis', email: 'gabi@reisarquitetura.com.br', cor: 'bg-indigo-500' },
]

// Remove acentos e caixa para comparar "joao" com "João".
const dobrar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const iniciais = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

export default function AutocompleteContatosAvatar() {
  const [busca, setBusca] = useState('')
  const [aberto, setAberto] = useState(true)
  const [ativo, setAtivo] = useState(0)
  const [selecionados, setSelecionados] = useState<Contato[]>(CONTATOS.slice(0, 1))
  const inputRef = useRef<HTMLInputElement>(null)

  const sugestoes = useMemo(() => {
    const q = dobrar(busca.trim())
    const livres = CONTATOS.filter((c) => !selecionados.some((s) => s.email === c.email))
    const lista = q
      ? livres.filter((c) => dobrar(c.nome).includes(q) || dobrar(c.email).includes(q))
      : [...livres.filter((c) => c.recente), ...livres.filter((c) => !c.recente)]
    return lista.slice(0, 5)
  }, [busca, selecionados])

  function adicionar(c: Contato) {
    setSelecionados((s) => [...s, c])
    setBusca('')
    setAtivo(0)
    inputRef.current?.focus()
  }
  function remover(email: string) {
    setSelecionados((s) => s.filter((c) => c.email !== email))
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAberto(true)
      setAtivo((i) => Math.min(i + 1, sugestoes.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setAtivo((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const c = sugestoes[ativo]
      if (aberto && c) {
        e.preventDefault()
        adicionar(c)
      }
    } else if (e.key === 'Backspace' && !busca && selecionados.length) {
      setSelecionados((s) => s.slice(0, -1))
    } else if (e.key === 'Escape') {
      setAberto(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border bg-card">
        <div className="flex items-center gap-2 border-b px-3 py-2 text-sm">
          <Mail className="size-4 text-muted-foreground" />
          <span className="font-medium">Nova mensagem</span>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-start gap-2">
            <Label htmlFor="para" className="mt-2 w-10 text-muted-foreground">
              Para
            </Label>
            <div className="min-w-0 flex-1">
              <div
                className="flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-transparent px-1 py-1 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
                onClick={() => inputRef.current?.focus()}
              >
                {selecionados.map((c) => (
                  <span key={c.email} className="flex h-6 items-center gap-1 rounded-full bg-muted py-0.5 pr-1 pl-0.5 text-xs">
                    <span className={cn('flex size-5 items-center justify-center rounded-full text-[9px] font-semibold text-white', c.cor)}>{iniciais(c.nome)}</span>
                    {c.nome}
                    <button
                      type="button"
                      aria-label={`Remover ${c.nome}`}
                      onClick={() => remover(c.email)}
                      className="flex size-4 items-center justify-center rounded-full hover:bg-foreground/10"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  id="para"
                  role="combobox"
                  aria-expanded={aberto}
                  aria-controls="contatos-lista"
                  aria-autocomplete="list"
                  autoComplete="off"
                  className="h-6 min-w-24 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={selecionados.length ? '' : 'Nome ou e-mail'}
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value)
                    setAberto(true)
                    setAtivo(0)
                  }}
                  onFocus={() => setAberto(true)}
                  onBlur={() => setAberto(false)}
                  onKeyDown={onKeyDown}
                />
              </div>
              {aberto && (
                <div className="mt-1 overflow-hidden rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
                  <ul id="contatos-lista" role="listbox" aria-label="Contatos" className="p-1">
                    {sugestoes.length === 0 && (
                      <li className="px-2 py-3 text-center text-muted-foreground">{busca ? 'Nenhum contato encontrado.' : 'Todos os contatos já foram adicionados.'}</li>
                    )}
                    {sugestoes.map((c, i) => (
                      <li
                        key={c.email}
                        role="option"
                        aria-selected={i === ativo}
                        onMouseEnter={() => setAtivo(i)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => adicionar(c)}
                        className={cn('flex cursor-default items-center gap-2.5 rounded-md px-2 py-1.5', i === ativo && 'bg-accent text-accent-foreground')}
                      >
                        <Avatar size="sm">
                          <AvatarFallback className={cn('text-[10px] font-semibold text-white', c.cor)}>{iniciais(c.nome)}</AvatarFallback>
                        </Avatar>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{c.nome}</span>
                          <span className="block truncate text-xs text-muted-foreground">{c.email}</span>
                        </span>
                        {c.recente && !busca && <Clock className="size-3.5 text-muted-foreground" aria-label="Recente" />}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-1 flex items-center gap-2 border-t pt-2">
            <Label htmlFor="assunto" className="w-10 font-normal text-muted-foreground">
              Assunto
            </Label>
            <input id="assunto" className="h-7 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Proposta revisada" />
          </div>
        </div>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {selecionados.length} destinatário{selecionados.length === 1 ? '' : 's'} · ↑ ↓ navega, Enter adiciona, Backspace remove o último
      </p>
    </div>
  )
}
