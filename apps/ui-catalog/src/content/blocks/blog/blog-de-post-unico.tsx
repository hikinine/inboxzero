'use client'

import { useState } from 'react'
import { Bookmark, Check, Clock, Link2, Linkedin, Twitter } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const TAGS = ['WhatsApp', 'Automação', 'Métricas', 'Atendimento']

export default function BlogDePostUnico() {
  const [copiado, setCopiado] = useState(false)
  const [salvo, setSalvo] = useState(false)

  const copiar = () => {
    setCopiado(true)
    window.setTimeout(() => setCopiado(false), 1600)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge>Atendimento</Badge>
            <span>·</span>
            <time dateTime="2026-10-08">8 de outubro de 2026</time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> 6 min de leitura
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Como reduzir o tempo de resposta no WhatsApp em 70%</h1>
          <p className="mt-4 text-lg text-muted-foreground">Um roteiro de quatro semanas, com as automações que mais funcionaram nos 312 times que acompanhamos em 2026.</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y py-4">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Mariana Duarte</p>
                <p className="text-xs text-muted-foreground">CEO · escreve sobre operações de atendimento</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={copiar}>
                {copiado ? <Check data-icon="inline-start" className="text-emerald-500" /> : <Link2 data-icon="inline-start" />}
                {copiado ? 'Copiado' : 'Copiar link'}
              </Button>
              <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label="Compartilhar no LinkedIn">
                <Linkedin />
              </Button>
              <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label="Compartilhar no X">
                <Twitter />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label={salvo ? 'Remover dos salvos' : 'Salvar artigo'} aria-pressed={salvo} onClick={() => setSalvo((v) => !v)}>
                <Bookmark className={salvo ? 'fill-current' : ''} />
              </Button>
            </div>
          </div>
        </header>

        <figure className="mt-8">
          <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
            <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/25" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <rect key={i} x={30 + i * 56} y={260 - i * 22} width="30" height="300" rx="8" fill="currentColor" />
              ))}
            </svg>
          </div>
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">Fila de atendimento de uma rede de farmácias antes e depois da automação. Dados anonimizados.</figcaption>
        </figure>

        <div className="mt-10 space-y-6 text-base leading-relaxed sm:text-lg [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight">
          <p>Em 2026 acompanhamos 312 times de atendimento, de clínicas com dois atendentes a varejistas com 140 lojas. Todos tinham a mesma dor: o cliente manda mensagem no WhatsApp e espera. Em média, 23 minutos. O que separa os times que caíram para menos de cinco minutos não foi contratar mais gente. Foram quatro semanas de ajustes, nesta ordem.</p>

          <h2>Semana 1: meça antes de automatizar</h2>
          <p>Nenhum time que começou pela automação chegou ao fim das quatro semanas. Os que começaram medindo, sim. Três números bastam para o diagnóstico:</p>
          <ul className="list-disc space-y-2 pl-6 marker:text-muted-foreground">
            <li>Tempo até a primeira resposta, por hora do dia e dia da semana.</li>
            <li>Quantas conversas por dia terminam sem resposta humana.</li>
            <li>As dez perguntas mais repetidas, copiadas e coladas pelos atendentes.</li>
          </ul>

          <blockquote className="border-l-2 border-primary pl-5 text-xl font-medium italic leading-snug">“Resposta rápida não é responder tudo em dez segundos. É nunca deixar alguém esperando sem saber o que está acontecendo.”</blockquote>

          <h2>Semana 2: respostas automáticas para as dez perguntas</h2>
          <p>Com a lista em mãos, cada pergunta vira uma resposta automática com um botão de escape: “falar com uma pessoa”. Nos times que acompanhamos, essas dez respostas resolveram entre 28% e 41% das conversas sem ninguém tocar no teclado, e o tempo médio da fila caiu pela metade já na primeira semana.</p>

          <div className="rounded-xl border bg-muted/40 p-5 text-base">
            <p className="text-sm font-semibold">Na prática</p>
            <p className="mt-1 text-sm text-muted-foreground">Baixe a planilha com as dez perguntas mais comuns por segmento e as respostas que usamos como ponto de partida.</p>
            <Button size="sm" className="mt-3">
              Baixar planilha
            </Button>
          </div>

          <h2>Semanas 3 e 4: roteamento e IA</h2>
          <p>Só agora entra a parte sofisticada: distribuir conversas por fila e assunto, e deixar a IA sugerir a resposta para o atendente revisar. A ordem importa. Quem ligou a IA antes de arrumar a fila só ficou mais rápido em responder errado. Quem seguiu as quatro semanas chegou, em média, a 4 minutos e 12 segundos de tempo de resposta, uma queda de 70% em relação ao ponto de partida.</p>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Tags:</span>
          {TAGS.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center">
          <Avatar className="size-14">
            <AvatarFallback className="text-base">MD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">Mariana Duarte</p>
            <p className="mt-1 text-sm text-muted-foreground">Fundadora e CEO. Dez anos operando atendimento no varejo antes de construir software para isso.</p>
          </div>
          <Button variant="outline" size="sm" className="w-fit">
            Seguir
          </Button>
        </div>

        <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Outros artigos">
          <a href="#" className="rounded-xl border p-4 transition-colors hover:bg-muted/40">
            <span className="text-xs text-muted-foreground">← Anterior</span>
            <span className="mt-1 block font-medium leading-snug">LGPD na prática: o que todo time de vendas precisa saber</span>
          </a>
          <a href="#" className="rounded-xl border p-4 text-right transition-colors hover:bg-muted/40">
            <span className="text-xs text-muted-foreground">Próximo →</span>
            <span className="mt-1 block font-medium leading-snug">Automação sem perder o toque humano</span>
          </a>
        </nav>
      </article>
    </section>
  )
}
