'use client'

import type { LucideIcon } from 'lucide-react'
import { Code, Megaphone, Palette } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Membro {
  nome: string
  cargo: string
  iniciais: string
  cidade: string
  desde: string
  online?: boolean
}

interface Departamento {
  valor: string
  nome: string
  Icon: LucideIcon
  cor: string
  lider: string
  descricao: string
  membros: Membro[]
}

const DEPARTAMENTOS: Departamento[] = [
  {
    valor: 'produto',
    nome: 'Produto',
    Icon: Palette,
    cor: 'bg-violet-500',
    lider: 'Beatriz Carvalho',
    descricao: 'Design, pesquisa e gestão de produto. Conversam com cinco clientes por semana, sem exceção.',
    membros: [
      { nome: 'Beatriz Carvalho', cargo: 'Head de Produto', iniciais: 'BC', cidade: 'São Paulo', desde: '2021', online: true },
      { nome: 'Larissa Pinto', cargo: 'Designer de Produto', iniciais: 'LP', cidade: 'Curitiba', desde: '2022', online: true },
      { nome: 'Henrique Sales', cargo: 'Product Manager', iniciais: 'HS', cidade: 'Recife', desde: '2023' },
      { nome: 'Juliana Reis', cargo: 'Pesquisadora UX', iniciais: 'JR', cidade: 'Belo Horizonte', desde: '2024', online: true },
    ],
  },
  {
    valor: 'engenharia',
    nome: 'Engenharia',
    Icon: Code,
    cor: 'bg-sky-500',
    lider: 'Rafael Nogueira',
    descricao: 'Plataforma, apps e IA. Deploy todo dia, incidente explicado em público e plano de rollback antes de qualquer release.',
    membros: [
      { nome: 'Rafael Nogueira', cargo: 'CTO', iniciais: 'RN', cidade: 'Florianópolis', desde: '2019', online: true },
      { nome: 'Thiago Moreira', cargo: 'Engenheiro de Plataforma', iniciais: 'TM', cidade: 'Florianópolis', desde: '2020', online: true },
      { nome: 'Gustavo Henrique', cargo: 'Engenheiro de IA', iniciais: 'GH', cidade: 'Belo Horizonte', desde: '2022' },
      { nome: 'Patrícia Lemos', cargo: 'Engenheira Mobile', iniciais: 'PL', cidade: 'Recife', desde: '2023', online: true },
      { nome: 'André Vasconcelos', cargo: 'SRE', iniciais: 'AV', cidade: 'Porto Alegre', desde: '2023' },
      { nome: 'Natália Campos', cargo: 'Engenheira Front-end', iniciais: 'NC', cidade: 'São Paulo', desde: '2025', online: true },
    ],
  },
  {
    valor: 'vendas',
    nome: 'Vendas',
    Icon: Megaphone,
    cor: 'bg-amber-500',
    lider: 'Diego Albuquerque',
    descricao: 'Pré-vendas, closers e parcerias. A demo boa é a que termina com o cliente usando o produto.',
    membros: [
      { nome: 'Diego Albuquerque', cargo: 'Head de Vendas', iniciais: 'DA', cidade: 'Recife', desde: '2022', online: true },
      { nome: 'Fernanda Castro', cargo: 'Executiva de Contas', iniciais: 'FC', cidade: 'São Paulo', desde: '2023' },
      { nome: 'Lucas Teixeira', cargo: 'SDR', iniciais: 'LT', cidade: 'Belo Horizonte', desde: '2024', online: true },
      { nome: 'Renata Guimarães', cargo: 'Parcerias', iniciais: 'RG', cidade: 'Curitiba', desde: '2025' },
    ],
  },
]

export default function EquipePorDepartamento() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Time</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem faz o quê</h2>
          <p className="mt-3 text-muted-foreground">Catorze pessoas em três departamentos, espalhadas por seis cidades. O ponto verde indica quem está online agora.</p>
        </div>

        <Tabs defaultValue="produto" className="mt-10 gap-8">
          <TabsList variant="line" className="w-full justify-start border-b pb-1.5">
            {DEPARTAMENTOS.map((d) => (
              <TabsTrigger key={d.valor} value={d.valor} className="flex-none px-3">
                <d.Icon /> {d.nome}
                <span className="rounded-full bg-muted px-1.5 text-[11px] tabular-nums text-muted-foreground">{d.membros.length}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {DEPARTAMENTOS.map((d) => (
            <TabsContent key={d.valor} value={d.valor}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">{d.descricao}</p>
                <p className="shrink-0 text-xs text-muted-foreground">
                  Liderado por <span className="font-medium text-foreground">{d.lider}</span>
                </p>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {d.membros.map((m) => (
                  <li key={m.nome} className="relative overflow-hidden rounded-xl border bg-card p-5">
                    <span className={`absolute inset-x-0 top-0 h-1 ${d.cor}`} aria-hidden="true" />
                    <div className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback>{m.iniciais}</AvatarFallback>
                        {m.online && <AvatarBadge className="bg-emerald-500" />}
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{m.nome}</p>
                        <p className="truncate text-sm text-muted-foreground">{m.cargo}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                      <span>{m.cidade}</span>
                      <span>desde {m.desde}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
