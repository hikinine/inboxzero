'use client'

import { Quote, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const EMPRESAS = [
  {
    id: 'araucaria',
    logo: 'Araucária',
    estilo: 'font-serif',
    setor: 'Varejo de móveis',
    tamanho: '120 funcionários',
    cidade: 'Curitiba, PR',
    texto: 'Cada pedido vira uma conversa com contexto. O vendedor abre o chat e já sabe o que a pessoa comprou, o que devolveu e o que está esperando.',
    nome: 'Carla Mendes',
    cargo: 'Diretora Comercial',
    resultado: '+42% em vendas no trimestre',
  },
  {
    id: 'nuvem',
    logo: 'nuvem.co',
    estilo: 'font-mono',
    setor: 'Software B2B',
    tamanho: '38 funcionários',
    cidade: 'São Paulo, SP',
    texto: 'Ligamos o produto ao CRM por webhook em uma tarde. Hoje o time de vendas vê o uso do trial em tempo real e liga na hora certa.',
    nome: 'Rafael Monteiro',
    cargo: 'CEO e fundador',
    resultado: 'Ciclo de venda 11 dias menor',
  },
  {
    id: 'kavo',
    logo: 'KAVO',
    estilo: 'font-black tracking-tight',
    setor: 'Moda e e-commerce',
    tamanho: '64 funcionários',
    cidade: 'Belo Horizonte, MG',
    texto: 'A recuperação de carrinho pelo WhatsApp paga a ferramenta sozinha. O resto — fila, relatórios, automações — é lucro.',
    nome: 'Bruno Rocha',
    cargo: 'Head de Growth',
    resultado: '32% dos carrinhos recuperados',
  },
  {
    id: 'trilha',
    logo: 'Trilha',
    estilo: 'font-semibold tracking-tight',
    setor: 'Educação',
    tamanho: '210 funcionários',
    cidade: 'Recife, PE',
    texto: 'Migramos três ferramentas para uma e a equipe de suporte caiu de 9 para 5 pessoas sem piorar o tempo de resposta.',
    nome: 'Fábio Nunes',
    cargo: 'COO',
    resultado: 'R$ 18 mil por mês economizados',
  },
]

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function DepoimentosComLogosDeEmpresas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Clientes</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem já trocou a planilha pela Rotina</h2>
        </div>

        <Tabs defaultValue="araucaria" className="mt-10 items-center">
          <TabsList variant="line" className="h-auto flex-wrap justify-center gap-2 sm:gap-6">
            {EMPRESAS.map((e) => (
              <TabsTrigger key={e.id} value={e.id} className={`h-auto px-4 py-2 text-lg ${e.estilo}`}>
                {e.logo}
              </TabsTrigger>
            ))}
          </TabsList>

          {EMPRESAS.map((e) => (
            <TabsContent key={e.id} value={e.id} className="mt-8 w-full">
              <div className="grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-[1fr_280px]">
                <figure className="p-8 sm:p-12">
                  <Quote className="size-8 text-muted-foreground/40" />
                  <blockquote className="mt-5 text-xl font-medium leading-snug tracking-tight sm:text-2xl">“{e.texto}”</blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                    <Avatar size="lg">
                      <AvatarFallback>{iniciais(e.nome)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{e.nome}</div>
                      <div className="text-muted-foreground">
                        {e.cargo} · {e.logo}
                      </div>
                    </div>
                    <Badge variant="outline" className="gap-1.5 sm:ml-auto">
                      <TrendingUp className="text-emerald-500" /> {e.resultado}
                    </Badge>
                  </figcaption>
                </figure>
                <div className="flex flex-col items-center justify-center gap-4 border-t bg-muted/50 p-8 text-center lg:border-t-0 lg:border-l">
                  <span className={`text-4xl text-foreground ${e.estilo}`}>{e.logo}</span>
                  <ul className="space-y-0.5 text-xs text-muted-foreground">
                    <li>{e.setor}</li>
                    <li>{e.tamanho}</li>
                    <li>{e.cidade}</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
