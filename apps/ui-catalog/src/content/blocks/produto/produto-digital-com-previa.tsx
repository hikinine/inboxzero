'use client'

import { useEffect, useState } from 'react'
import { Award, BookOpen, Check, Clock, Download, Film, Infinity as InfinityIcon, Lock, Pause, Play, ShieldCheck, Smartphone, Star, Users } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface Lesson {
  id: string
  title: string
  duration: string
  free?: boolean
}
interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

const MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Fundamentos da luz natural',
    lessons: [
      { id: 'l1', title: 'Boas-vindas e o que você vai aprender', duration: '4:12', free: true },
      { id: 'l2', title: 'Luz dura × luz difusa', duration: '11:40', free: true },
      { id: 'l3', title: 'Lendo a direção da luz', duration: '9:05' },
    ],
  },
  {
    id: 'm2',
    title: 'Retratos na janela',
    lessons: [
      { id: 'l4', title: 'Posicionando o modelo', duration: '13:22' },
      { id: 'l5', title: 'Rebatedor caseiro com papel', duration: '7:48' },
      { id: 'l6', title: 'Exercício: três retratos em 20 minutos', duration: '15:30' },
    ],
  },
  {
    id: 'm3',
    title: 'Golden hour e contraluz',
    lessons: [
      { id: 'l7', title: 'Planejando o horário', duration: '6:15' },
      { id: 'l8', title: 'Medição de luz sem fotômetro', duration: '10:02' },
    ],
  },
  {
    id: 'm4',
    title: 'Edição leve no celular',
    lessons: [
      { id: 'l9', title: 'Curva de tons e balanço de branco', duration: '12:44' },
      { id: 'l10', title: 'Exportando para impressão', duration: '5:50' },
    ],
  },
]
const ALL = MODULES.flatMap((m) => m.lessons)
const PRICE = 197
const INCLUDES = [
  { Icon: Film, label: '2h10 de vídeo em 4K' },
  { Icon: BookOpen, label: '10 aulas em 4 módulos' },
  { Icon: Download, label: 'Apostila e presets em PDF' },
  { Icon: Smartphone, label: 'Assista no celular e na TV' },
  { Icon: Award, label: 'Certificado de conclusão' },
  { Icon: InfinityIcon, label: 'Acesso vitalício' },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ProdutoDigitalComPrevia() {
  const [currentId, setCurrentId] = useState('l1')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const current = ALL.find((l) => l.id === currentId) ?? ALL[0]!

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false)
          return 100
        }
        return p + 0.4
      })
    }, 100)
    return () => clearInterval(t)
  }, [playing])

  const play = (lesson: Lesson) => {
    if (!lesson.free) return
    if (lesson.id !== currentId) {
      setCurrentId(lesson.id)
      setProgress(0)
      setPlaying(true)
      return
    }
    if (progress >= 100) setProgress(0)
    setPlaying((p) => !p)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">Curso online</Badge>
          <span>Fotografia</span>
          <span aria-hidden="true">·</span>
          <span>Nível iniciante</span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Fotografia com luz natural</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Retratos profissionais com o que você já tem: uma janela, um papel branco e o celular. Assista às duas primeiras aulas gratuitamente.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-700 via-neutral-900 to-black text-white">
              <div className="absolute -right-10 -top-16 size-64 rounded-full bg-amber-400/30 blur-3xl" aria-hidden="true" />
              <div className="absolute bottom-10 left-16 size-40 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
              <div className="absolute left-5 top-5 flex items-center gap-2 text-sm">
                <Badge variant="secondary">{current.free ? 'Prévia gratuita' : 'Aula bloqueada'}</Badge>
                <span className="font-medium drop-shadow">{current.title}</span>
              </div>
              <button
                type="button"
                onClick={() => play(current)}
                aria-label={playing ? 'Pausar' : 'Reproduzir'}
                className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:scale-105 hover:bg-white/25"
              >
                {playing ? <Pause className="size-7 fill-white" /> : <Play className="ml-1 size-7 fill-white" />}
              </button>
              <div className="absolute inset-x-5 bottom-4">
                <div className="h-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white transition-[width] duration-100" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-white/80">
                  <span className="tabular-nums">{Math.floor((progress / 100) * 4)}:{String(Math.floor(((progress / 100) * 4 * 60) % 60)).padStart(2, '0')} / {current.duration}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {playing ? 'Reproduzindo' : progress >= 100 ? 'Concluída' : 'Pausado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h3 className="font-medium">Conteúdo do curso</h3>
              <span className="text-xs text-muted-foreground">4 módulos · 10 aulas · 2h10</span>
            </div>
            <Accordion defaultValue={['m1']} className="mt-2 rounded-xl border bg-card px-4">
              {MODULES.map((m, mi) => (
                <AccordionItem key={m.id} value={m.id}>
                  <AccordionTrigger className="text-sm">
                    <span className="flex items-center gap-3">
                      <span className="flex size-6 items-center justify-center rounded-md bg-muted text-xs font-semibold">{mi + 1}</span>
                      {m.title}
                      <span className="text-xs font-normal text-muted-foreground">{m.lessons.length} aulas</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 pb-1">
                      {m.lessons.map((l) => {
                        const active = l.id === currentId
                        return (
                          <li key={l.id}>
                            <button
                              type="button"
                              disabled={!l.free}
                              onClick={() => play(l)}
                              className={cn(
                                'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors',
                                l.free ? 'hover:bg-muted' : 'cursor-not-allowed text-muted-foreground',
                                active && 'bg-primary/5 text-primary',
                              )}
                            >
                              <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full border', active ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground')}>
                                {l.free ? active && playing ? <Pause className="size-3" /> : <Play className="size-3" /> : <Lock className="size-3" />}
                              </span>
                              <span className="flex-1 truncate">{l.title}</span>
                              {l.free && !active && <Badge variant="outline" className="text-[10px]">Prévia</Badge>}
                              <span className="text-xs tabular-nums text-muted-foreground">{l.duration}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums">{brl(PRICE)}</span>
                <span className="text-sm text-muted-foreground line-through tabular-nums">{brl(297)}</span>
                <Badge variant="secondary">-34%</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">ou 12x de {brl(PRICE / 12)} sem juros</p>
              <Button size="lg" className="mt-5 w-full">Comprar agora</Button>
              <Button size="lg" variant="outline" className="mt-2 w-full">Adicionar ao carrinho</Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" /> Garantia de 7 dias ou seu dinheiro de volta
              </p>

              <Separator className="my-5" />

              <div className="text-sm font-medium">Este curso inclui</div>
              <ul className="mt-3 space-y-2.5 text-sm">
                {INCLUDES.map((i) => (
                  <li key={i.label} className="flex items-center gap-2.5 text-muted-foreground">
                    <i.Icon className="size-4 shrink-0" /> {i.label}
                  </li>
                ))}
              </ul>

              <Separator className="my-5" />

              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-medium">Mariana Albuquerque</div>
                  <div className="text-xs text-muted-foreground">Fotógrafa de retrato · 14 anos de estúdio</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="flex items-center justify-center gap-1 font-semibold">
                    <Star className="size-3 fill-amber-500 text-amber-500" /> 4,9
                  </div>
                  <div className="text-muted-foreground">812 notas</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="flex items-center justify-center gap-1 font-semibold">
                    <Users className="size-3" /> 6.4 mil
                  </div>
                  <div className="text-muted-foreground">alunos</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="flex items-center justify-center gap-1 font-semibold">
                    <Check className="size-3" /> 92%
                  </div>
                  <div className="text-muted-foreground">concluem</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
