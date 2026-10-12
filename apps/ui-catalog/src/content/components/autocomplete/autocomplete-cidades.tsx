'use client'

import { useMemo, useState, type KeyboardEvent } from 'react'
import { MapPin, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Cidade {
  nome: string
  uf: string
}

const CIDADES: Cidade[] = [
  { nome: 'São Paulo', uf: 'SP' },
  { nome: 'Rio de Janeiro', uf: 'RJ' },
  { nome: 'Belo Horizonte', uf: 'MG' },
  { nome: 'Curitiba', uf: 'PR' },
  { nome: 'Porto Alegre', uf: 'RS' },
  { nome: 'Salvador', uf: 'BA' },
  { nome: 'Recife', uf: 'PE' },
  { nome: 'Fortaleza', uf: 'CE' },
  { nome: 'Brasília', uf: 'DF' },
  { nome: 'Florianópolis', uf: 'SC' },
  { nome: 'Goiânia', uf: 'GO' },
  { nome: 'Campinas', uf: 'SP' },
  { nome: 'São Luís', uf: 'MA' },
  { nome: 'São José dos Campos', uf: 'SP' },
  { nome: 'São Bernardo do Campo', uf: 'SP' },
  { nome: 'Manaus', uf: 'AM' },
  { nome: 'Belém', uf: 'PA' },
  { nome: 'Vitória', uf: 'ES' },
  { nome: 'Natal', uf: 'RN' },
  { nome: 'Maceió', uf: 'AL' },
]

// Remove acentos e caixa para comparar "sao" com "São".
const dobrar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function Destaque({ texto, busca }: { texto: string; busca: string }) {
  const alvo = dobrar(busca.trim())
  const chars = Array.from(texto)
  const i = alvo ? chars.map(dobrar).join('').indexOf(alvo) : -1
  if (i < 0) return <>{texto}</>
  const n = Array.from(alvo).length
  return (
    <>
      {chars.slice(0, i).join('')}
      <mark className="rounded-sm bg-primary/15 font-medium text-foreground">{chars.slice(i, i + n).join('')}</mark>
      {chars.slice(i + n).join('')}
    </>
  )
}

export default function AutocompleteCidades() {
  const [busca, setBusca] = useState('São')
  const [aberto, setAberto] = useState(true)
  const [ativo, setAtivo] = useState(0)
  const [selecionada, setSelecionada] = useState<Cidade | null>(null)

  const resultados = useMemo(() => {
    const q = dobrar(busca.trim())
    const lista = q ? CIDADES.filter((c) => dobrar(c.nome).includes(q)) : CIDADES
    return lista.slice(0, 6)
  }, [busca])

  function escolher(c: Cidade) {
    setSelecionada(c)
    setBusca(c.nome)
    setAberto(false)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAberto(true)
      setAtivo((i) => Math.min(i + 1, resultados.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setAtivo((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const c = resultados[ativo]
      if (aberto && c) {
        e.preventDefault()
        escolher(c)
      }
    } else if (e.key === 'Escape') {
      setAberto(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Label htmlFor="cidade" className="mb-1.5">
        Cidade
      </Label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="cidade"
          role="combobox"
          aria-expanded={aberto}
          aria-controls="cidades-lista"
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Digite o nome da cidade"
          className="pl-8 pr-8"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value)
            setAberto(true)
            setAtivo(0)
            setSelecionada(null)
          }}
          onFocus={() => setAberto(true)}
          onBlur={() => setAberto(false)}
          onKeyDown={onKeyDown}
        />
        {busca && (
          <button
            type="button"
            aria-label="Limpar busca"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setBusca('')
              setSelecionada(null)
              setAtivo(0)
              setAberto(true)
            }}
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {aberto ? (
        <div className="mt-1.5 overflow-hidden rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <ul id="cidades-lista" role="listbox" aria-label="Cidades" className="p-1">
            {resultados.length === 0 && <li className="px-2 py-4 text-center text-muted-foreground">Nenhuma cidade encontrada.</li>}
            {resultados.map((c, i) => (
              <li
                key={c.nome}
                role="option"
                aria-selected={i === ativo}
                onMouseEnter={() => setAtivo(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => escolher(c)}
                className={`flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 ${i === ativo ? 'bg-accent text-accent-foreground' : ''}`}
              >
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">
                  <Destaque texto={c.nome} busca={busca} />
                </span>
                <span className="text-xs text-muted-foreground">{c.uf}</span>
              </li>
            ))}
          </ul>
          <div className="border-t px-3 py-1.5 text-[11px] text-muted-foreground">↑ ↓ para navegar · Enter para escolher</div>
        </div>
      ) : (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {selecionada ? `Selecionada: ${selecionada.nome} – ${selecionada.uf}` : 'Comece a digitar para ver sugestões.'}
        </p>
      )}
    </div>
  )
}
