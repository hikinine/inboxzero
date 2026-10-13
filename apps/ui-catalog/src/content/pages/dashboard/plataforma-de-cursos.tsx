'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Award,
  Bell,
  BookOpen,
  Bookmark,
  Calendar,
  CircleCheck,
  Clock,
  Compass,
  Download,
  Flame,
  GraduationCap,
  House,
  MessagesSquare,
  Play,
  Search,
  Settings,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const RAIL: Array<{ Icon: LucideIcon; label: string; ativo?: boolean }> = [
  { Icon: House, label: 'Início', ativo: true },
  { Icon: BookOpen, label: 'Meus cursos' },
  { Icon: Compass, label: 'Explorar' },
  { Icon: Calendar, label: 'Agenda' },
  { Icon: MessagesSquare, label: 'Comunidade' },
  { Icon: Award, label: 'Certificados' },
]

function Rail() {
  return (
    <aside className="hidden w-[72px] shrink-0 flex-col items-center gap-2 border-r bg-muted/30 py-4 md:flex">
      <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-orange-500 text-white">
        <GraduationCap className="size-5" />
      </span>
      {RAIL.map((r) => (
        <Tooltip key={r.label}>
          <TooltipTrigger
            render={
              <button
                type="button"
                aria-label={r.label}
                className={cn('relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground', r.ativo && 'bg-background text-foreground shadow-sm ring-1 ring-border')}
              />
            }
          >
            {r.ativo && <span className="absolute -left-4 h-5 w-1 rounded-r-full bg-orange-500" />}
            <r.Icon className="size-5" />
          </TooltipTrigger>
          <TooltipContent side="right">{r.label}</TooltipContent>
        </Tooltip>
      ))}
      <div className="mt-auto flex flex-col items-center gap-2">
        <button type="button" aria-label="Configurações" className="flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted">
          <Settings className="size-5" />
        </button>
        <Avatar>
          <AvatarFallback className="bg-orange-500/15 text-orange-700 dark:text-orange-300">RS</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  )
}

interface Curso {
  id: string
  titulo: string
  instrutor: string
  aulas: number
  feitas: number
  cor: string
  categoria: string
  status: 'andamento' | 'concluido' | 'salvo'
}

const CURSOS: Curso[] = [
  { id: 'c1', titulo: 'React do zero ao deploy', instrutor: 'Ana Beatriz Lopes', aulas: 48, feitas: 31, cor: 'from-sky-500 to-indigo-600', categoria: 'Front-end', status: 'andamento' },
  { id: 'c2', titulo: 'SQL para análise de dados', instrutor: 'Carlos Henrique', aulas: 32, feitas: 9, cor: 'from-emerald-500 to-teal-600', categoria: 'Dados', status: 'andamento' },
  { id: 'c3', titulo: 'Design de interfaces no Figma', instrutor: 'Mariana Duarte', aulas: 26, feitas: 22, cor: 'from-fuchsia-500 to-rose-500', categoria: 'Design', status: 'andamento' },
  { id: 'c4', titulo: 'Git e GitHub na prática', instrutor: 'Pedro Sampaio', aulas: 18, feitas: 18, cor: 'from-zinc-600 to-zinc-800', categoria: 'Ferramentas', status: 'concluido' },
  { id: 'c5', titulo: 'TypeScript avançado', instrutor: 'Ana Beatriz Lopes', aulas: 36, feitas: 0, cor: 'from-blue-500 to-cyan-500', categoria: 'Front-end', status: 'salvo' },
]

function ProximaAula() {
  const [concluida, setConcluida] = useState(false)
  return (
    <div className="grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[1.1fr_1fr]">
      <div className="relative aspect-video bg-gradient-to-br from-sky-500 to-indigo-700 lg:aspect-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgb(255_255_255/0.25),transparent_55%)]" />
        <div className="absolute top-4 left-4 rounded-md bg-black/40 px-2 py-1 font-mono text-[11px] text-white backdrop-blur">Módulo 5 · Aula 32</div>
        <pre className="absolute bottom-5 left-5 hidden font-mono text-[11px] leading-relaxed text-white/80 sm:block">
          {'const [itens, setItens] = useState([])\nuseEffect(() => {\n  buscarPedidos().then(setItens)\n}, [])'}
        </pre>
        <motion.button
          type="button"
          aria-label="Continuar aula"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-indigo-700 shadow-xl"
        >
          <Play className="ml-1 size-6 fill-current" />
        </motion.button>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div className="h-full w-[38%] bg-orange-400" />
        </div>
      </div>
      <div className="flex flex-col p-6">
        <span className="text-xs font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400">Continue de onde parou</span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">Buscando dados com useEffect e Suspense</h3>
        <p className="mt-1 text-sm text-muted-foreground">React do zero ao deploy · com Ana Beatriz Lopes</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> 18 min · faltam 11
          </span>
          <span className="flex items-center gap-1">
            <Download className="size-3.5" /> Material de apoio
          </span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            <Play data-icon="inline-start" /> Continuar aula
          </Button>
          <Button variant={concluida ? 'secondary' : 'outline'} onClick={() => setConcluida((c) => !c)}>
            <CircleCheck data-icon="inline-start" className={cn(concluida && 'text-emerald-500')} /> {concluida ? 'Concluída' : 'Marcar como vista'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function CardCurso({ c }: { c: Curso }) {
  const pct = Math.round((c.feitas / c.aulas) * 100)
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="group flex flex-col overflow-hidden rounded-2xl border bg-card">
      <div className={cn('relative h-24 bg-gradient-to-br', c.cor)}>
        <Badge className="absolute top-3 left-3 bg-black/30 text-white backdrop-blur">{c.categoria}</Badge>
        {c.status === 'concluido' && (
          <span className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-white text-emerald-600">
            <CircleCheck className="size-4" />
          </span>
        )}
        {c.status === 'salvo' && <Bookmark className="absolute top-3 right-3 size-5 fill-white text-white" />}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="font-medium leading-snug">{c.titulo}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{c.instrutor}</div>
        <div className="mt-auto pt-4">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted-foreground">
              {c.feitas}/{c.aulas} aulas
            </span>
            <span className="font-medium tabular-nums">{pct}%</span>
          </div>
          <Progress value={pct} className={cn(pct === 100 && '**:data-[slot=progress-indicator]:bg-emerald-500')} />
        </div>
      </div>
    </motion.div>
  )
}

const SEMANA = [
  ['S', 45],
  ['T', 30],
  ['Q', 70],
  ['Q', 20],
  ['S', 55],
  ['S', 90],
  ['D', 0],
] as const

const AO_VIVO = [
  { dia: '15', mes: 'out', titulo: 'Mentoria: revisão de portfólio', hora: '19h00', com: 'Mariana Duarte' },
  { dia: '17', mes: 'out', titulo: 'Live coding: API com Next.js', hora: '20h00', com: 'Ana Beatriz Lopes' },
  { dia: '22', mes: 'out', titulo: 'Plantão de dúvidas de SQL', hora: '18h30', com: 'Carlos Henrique' },
]

const CERTIFICADOS = [
  { titulo: 'Git e GitHub na prática', data: '02/09/2026', horas: '12h' },
  { titulo: 'Lógica de programação', data: '18/07/2026', horas: '20h' },
  { titulo: 'HTML e CSS modernos', data: '30/05/2026', horas: '24h' },
]

export default function PlataformaDeCursos() {
  const [filtro, setFiltro] = useState<Curso['status']>('andamento')
  const lista = CURSOS.filter((c) => c.status === filtro)
  const meta = 240
  const feito = SEMANA.reduce((a, [, m]) => a + m, 0)

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Rail />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center gap-4 border-b px-6">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar cursos, aulas e instrutores" className="pl-9" aria-label="Buscar" />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                <Flame className="size-4 fill-current" /> 12 dias
              </span>
              <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
                <Bell />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-orange-500" />
              </Button>
            </div>
          </header>

          <main className="grid flex-1 gap-6 p-6 xl:grid-cols-[1fr_320px]">
            <div className="min-w-0 space-y-6">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Bom dia, Rafaela</h1>
                <p className="text-sm text-muted-foreground">Você está a 2 aulas de terminar o módulo de hooks. Bora?</p>
              </div>

              <ProximaAula />

              <section>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold">Meus cursos</h2>
                  <Tabs value={filtro} onValueChange={(v) => setFiltro(v as Curso['status'])}>
                    <TabsList>
                      <TabsTrigger value="andamento">Em andamento</TabsTrigger>
                      <TabsTrigger value="concluido">Concluídos</TabsTrigger>
                      <TabsTrigger value="salvo">Salvos</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lista.map((c) => (
                    <CardCurso key={c.id} c={c} />
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Meta da semana</h2>
                  <span className="text-xs text-muted-foreground">
                    {feito} de {meta} min
                  </span>
                </div>
                <div className="mt-5 flex h-28 items-end justify-between gap-2">
                  {SEMANA.map(([d, m], i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                      <div className="flex h-24 w-full items-end rounded-md bg-muted">
                        <motion.div
                          className={cn('w-full rounded-md', i === 5 ? 'bg-orange-500' : 'bg-orange-500/40')}
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(m, 4)}%` }}
                          transition={{ delay: 0.05 * i, type: 'spring', stiffness: 120, damping: 18 }}
                        />
                      </div>
                      <span className={cn('text-[11px] text-muted-foreground', i === 5 && 'font-semibold text-foreground')}>{d}</span>
                    </div>
                  ))}
                </div>
                <Progress value={Math.min(100, Math.round((feito / meta) * 100))} className="mt-4" />
                <p className="mt-2 text-xs text-muted-foreground">Meta batida! Você estudou {feito - meta} min a mais.</p>
              </section>

              <section className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Ao vivo</h2>
                  <Video className="size-4 text-muted-foreground" />
                </div>
                <ul className="mt-4 space-y-3">
                  {AO_VIVO.map((a) => (
                    <li key={a.titulo} className="flex gap-3">
                      <span className="flex w-11 shrink-0 flex-col items-center rounded-lg border py-1 leading-none">
                        <span className="text-lg font-semibold">{a.dia}</span>
                        <span className="text-[10px] uppercase text-muted-foreground">{a.mes}</span>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{a.titulo}</span>
                        <span className="block text-xs text-muted-foreground">
                          {a.hora} · {a.com}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Certificados</h2>
                  <Badge variant="secondary">{CERTIFICADOS.length}</Badge>
                </div>
                <ul className="mt-4 divide-y">
                  {CERTIFICADOS.map((c) => (
                    <li key={c.titulo} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600">
                        <Award className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{c.titulo}</span>
                        <span className="block text-xs text-muted-foreground">
                          {c.data} · {c.horas}
                        </span>
                      </span>
                      <Button variant="ghost" size="icon-sm" aria-label={`Baixar certificado de ${c.titulo}`}>
                        <Download />
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
