'use client'

import { useState } from 'react'
import { Pin, Plus, StickyNote, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Cor = 'amber' | 'sky' | 'emerald' | 'rose' | 'violet'

interface Nota {
  id: number
  texto: string
  cor: Cor
  fixada: boolean
  quando: string
}

const FUNDO: Record<Cor, string> = {
  amber: 'bg-amber-100 text-amber-950 dark:bg-amber-500/15 dark:text-amber-50',
  sky: 'bg-sky-100 text-sky-950 dark:bg-sky-500/15 dark:text-sky-50',
  emerald: 'bg-emerald-100 text-emerald-950 dark:bg-emerald-500/15 dark:text-emerald-50',
  rose: 'bg-rose-100 text-rose-950 dark:bg-rose-500/15 dark:text-rose-50',
  violet: 'bg-violet-100 text-violet-950 dark:bg-violet-500/15 dark:text-violet-50',
}
const BOLINHA: Record<Cor, string> = { amber: 'bg-amber-400', sky: 'bg-sky-400', emerald: 'bg-emerald-400', rose: 'bg-rose-400', violet: 'bg-violet-400' }
const CORES: Cor[] = ['amber', 'sky', 'emerald', 'rose', 'violet']
const NOMES: Record<Cor, string> = { amber: 'âmbar', sky: 'azul', emerald: 'verde', rose: 'rosa', violet: 'violeta' }

const INICIAIS: Nota[] = [
  { id: 1, texto: 'Ligar para a Marina (Clínica Vida) antes das 15h e confirmar o prazo de 21 dias.', cor: 'amber', fixada: true, quando: 'há 20 min' },
  { id: 2, texto: 'Revisar a proposta v2 do Bistrô Oliva: incluir o treinamento da equipe da cozinha.', cor: 'emerald', fixada: true, quando: 'ontem' },
  { id: 3, texto: 'Ideia: automação de boas-vindas com cupom de 10% para quem chega pelo Instagram.', cor: 'violet', fixada: false, quando: 'há 2 h' },
  { id: 4, texto: 'A senha do Wi-Fi da sala de reunião mudou. Perguntar ao Diego.', cor: 'sky', fixada: false, quando: 'ontem' },
  { id: 5, texto: 'Comprar café e filtro para o escritório.', cor: 'rose', fixada: false, quando: 'há 3 dias' },
]

export default function WidgetNotasRapidas() {
  const [notas, setNotas] = useState<Nota[]>(INICIAIS)
  const [texto, setTexto] = useState('')
  const [cor, setCor] = useState<Cor>('amber')
  const [proximoId, setProximoId] = useState(100)
  const ordenadas = [...notas].sort((a, b) => Number(b.fixada) - Number(a.fixada))

  function adicionar() {
    const t = texto.trim()
    if (!t) return
    setNotas((prev) => [{ id: proximoId, texto: t, cor, fixada: false, quando: 'agora' }, ...prev])
    setProximoId((n) => n + 1)
    setTexto('')
  }
  function fixar(id: number) {
    setNotas((prev) => prev.map((n) => (n.id === id ? { ...n, fixada: !n.fixada } : n)))
  }
  function remover(id: number) {
    setNotas((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="size-4 text-muted-foreground" /> Notas rápidas
            </CardTitle>
            <CardDescription>Lembretes só seus. Fixe as importantes para mantê-las no topo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border bg-muted/30 p-3">
              <Textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) adicionar()
                }}
                rows={2}
                placeholder="Escreva uma nota… (⌘ + Enter para salvar)"
                aria-label="Nova nota"
                className="min-h-0 resize-none border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
              />
              <div className="mt-2 flex items-center gap-1.5">
                {CORES.map((c) => (
                  <button key={c} type="button" onClick={() => setCor(c)} aria-label={`Cor ${NOMES[c]}`} aria-pressed={cor === c} className={cn('size-5 rounded-full transition-transform', BOLINHA[c], cor === c ? 'scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background' : 'hover:scale-110')} />
                ))}
                <Button size="sm" className="ml-auto" onClick={adicionar} disabled={!texto.trim()}>
                  <Plus data-icon="inline-start" /> Adicionar
                </Button>
              </div>
            </div>

            {ordenadas.length ? (
              <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
                {ordenadas.map((n) => (
                  <article key={n.id} className={cn('group/nota relative mb-3 break-inside-avoid rounded-lg p-3 text-sm shadow-sm transition-shadow hover:shadow-md', FUNDO[n.cor])}>
                    <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 transition-opacity group-hover/nota:opacity-100 focus-within:opacity-100">
                      <button type="button" onClick={() => fixar(n.id)} aria-label={n.fixada ? 'Desafixar nota' : 'Fixar nota'} aria-pressed={n.fixada} className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10">
                        <Pin className={cn('size-3.5', n.fixada && 'fill-current')} />
                      </button>
                      <button type="button" onClick={() => remover(n.id)} aria-label="Excluir nota" className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    {n.fixada && <Pin className="mb-1.5 size-3.5 fill-current opacity-70" aria-label="Nota fixada" />}
                    <p className="pr-6 leading-relaxed">{n.texto}</p>
                    <p className="mt-2 text-[11px] opacity-60">{n.quando}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma nota por aqui. Escreva a primeira acima.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
