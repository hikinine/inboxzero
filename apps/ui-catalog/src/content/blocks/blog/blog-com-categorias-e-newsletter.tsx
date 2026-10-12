'use client'

import { useState } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const CATEGORIAS = [
  { nome: 'Todos', n: 48 },
  { nome: 'Atendimento', n: 17 },
  { nome: 'Vendas', n: 12 },
  { nome: 'Produto', n: 9 },
  { nome: 'Jurídico', n: 6 },
  { nome: 'Cultura', n: 4 },
]

const TAGS = ['WhatsApp', 'IA', 'LGPD', 'Automação', 'CRM', 'Métricas', 'Onboarding']

const POSTS = [
  { cat: 'Atendimento', titulo: 'Como reduzir o tempo de resposta no WhatsApp em 70%', resumo: 'Um roteiro prático de quatro semanas, com as automações que mais funcionaram nos times que acompanhamos em 2026.', data: '8 out 2026', leitura: '6 min', tone: 'from-emerald-400 to-teal-600' },
  { cat: 'Jurídico', titulo: 'LGPD na prática: o que todo time de vendas precisa saber', resumo: 'Consentimento, base legal e retenção explicados sem juridiquês, com exemplos de mensagens para copiar.', data: '2 out 2026', leitura: '9 min', tone: 'from-violet-500 to-indigo-600' },
  { cat: 'Produto', titulo: 'Automação sem perder o toque humano', resumo: 'Onde a IA entra, onde o atendente entra e como desenhar a passagem de bastão sem o cliente perceber.', data: '25 set 2026', leitura: '5 min', tone: 'from-amber-400 to-orange-500' },
  { cat: 'Vendas', titulo: 'O script de qualificação que nosso time usa', resumo: 'Quatro perguntas, uma regra de desempate e o critério para encerrar a conversa sem queimar o lead.', data: '18 set 2026', leitura: '7 min', tone: 'from-rose-400 to-pink-600' },
]

const MAIS_LIDOS = ['Como reduzir o tempo de resposta no WhatsApp em 70%', 'O script de qualificação que nosso time usa', 'O estado do atendimento digital no Brasil em 2026']

export default function BlogComCategoriasENewsletter() {
  const [cat, setCat] = useState('Todos')
  const [inscrito, setInscrito] = useState(false)
  const visiveis = cat === 'Todos' ? POSTS : POSTS.filter((p) => p.cat === cat)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Blog</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Artigos para quem atende e vende</h2>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <ul className="space-y-8">
              {visiveis.map((p) => (
                <li key={p.titulo}>
                  <article className="group grid gap-5 sm:grid-cols-[200px_1fr]">
                    <a href="#" className={`relative block aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${p.tone}`} aria-label={p.titulo}>
                      <svg viewBox="0 0 200 125" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/25 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
                        <circle cx="150" cy="35" r="38" fill="currentColor" />
                        <rect x="-20" y="80" width="150" height="90" rx="20" fill="currentColor" transform="rotate(-12 55 125)" />
                      </svg>
                    </a>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary">{p.cat}</Badge>
                        <span>{p.data}</span>
                        <span>·</span>
                        <span>{p.leitura} de leitura</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold leading-snug">
                        <a href="#" className="group-hover:underline">
                          {p.titulo}
                        </a>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.resumo}</p>
                      <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm font-medium">
                        Ler artigo <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </article>
                </li>
              ))}
              {visiveis.length === 0 && <li className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">Nenhum artigo em {cat} por enquanto.</li>}
            </ul>

            <nav className="mt-10 flex items-center justify-between border-t pt-6" aria-label="Paginação">
              <Button variant="ghost" size="sm" disabled>
                Anterior
              </Button>
              <div className="flex items-center gap-1">
                {['1', '2', '3'].map((n, i) => (
                  <Button key={n} variant={i === 0 ? 'outline' : 'ghost'} size="icon-sm" aria-current={i === 0 ? 'page' : undefined}>
                    {n}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm">
                Próxima
              </Button>
            </nav>
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold">Categorias</h3>
              <ul className="mt-3 space-y-0.5">
                {CATEGORIAS.map((c) => (
                  <li key={c.nome}>
                    <button
                      type="button"
                      onClick={() => setCat(c.nome)}
                      aria-pressed={cat === c.nome}
                      className={cn('flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors', cat === c.nome ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground')}
                    >
                      {c.nome}
                      <span className="text-xs tabular-nums text-muted-foreground">{c.n}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Tags populares</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {TAGS.map((t) => (
                  <a key={t} href="#" className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
                    #{t}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-4" />
              </span>
              <h3 className="mt-3 font-semibold">Newsletter semanal</h3>
              <p className="mt-1 text-sm text-muted-foreground">Um e-mail por semana com o melhor do blog. 9.400 pessoas já assinam.</p>
              {inscrito ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <Check className="size-4" /> Inscrição confirmada
                </p>
              ) : (
                <form
                  className="mt-4 space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setInscrito(true)
                  }}
                >
                  <Label htmlFor="bl-email" className="sr-only">
                    E-mail
                  </Label>
                  <Input id="bl-email" type="email" placeholder="voce@empresa.com.br" required />
                  <Button type="submit" className="w-full">
                    Assinar
                  </Button>
                </form>
              )}
              <p className="mt-3 text-xs text-muted-foreground">Sem spam. Cancele quando quiser.</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Mais lidos</h3>
              <ol className="mt-3 space-y-3">
                {MAIS_LIDOS.map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                    <a href="#" className="text-sm font-medium leading-snug hover:underline">
                      {t}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
