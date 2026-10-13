'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  BotMessageSquare,
  CalendarCheck,
  Check,
  Database,
  HandCoins,
  Headset,
  Instagram,
  Loader,
  Mail,
  Megaphone,
  MessageCircle,
  Package,
  QrCode,
  Receipt,
  Sheet,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-8 items-center justify-center rounded-md bg-emerald-500 text-white">
        <BotMessageSquare className="size-4" />
      </span>
      faro<span className="text-emerald-600 dark:text-emerald-400">.ai</span>
    </a>
  )
}

function Navbar() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-8 px-6">
        <Logo />
        <nav className="hidden flex-1 items-center gap-6 text-sm text-muted-foreground md:flex">
          {['Casos de uso', 'Integrações', 'Preços', 'FAQ'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Entrar
          </Button>
          <Button size="sm">
            Criar meu agente <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </header>
  )
}

type Passo =
  | { tipo: 'cliente'; texto: string }
  | { tipo: 'agente'; texto: string }
  | { tipo: 'ferramenta'; Icon: LucideIcon; texto: string }
  | { tipo: 'pix' }

const ROTEIRO: Passo[] = [
  { tipo: 'cliente', texto: 'Oi! Tem o tênis Corre 2 no tamanho 41?' },
  { tipo: 'ferramenta', Icon: Database, texto: 'Consultando estoque · Loja Pinheiros' },
  { tipo: 'agente', texto: 'Tem sim, Lucas! Restam 3 pares no 41, na cor grafite. Quer que eu separe um?' },
  { tipo: 'cliente', texto: 'Quero! Pode mandar o Pix?' },
  { tipo: 'ferramenta', Icon: QrCode, texto: 'Gerando cobrança Pix · R$ 349,90' },
  { tipo: 'pix' },
]

function Digitando() {
  return (
    <span className="inline-flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  )
}

function ChatAgente() {
  const [visiveis, setVisiveis] = useState(1)
  const [ferramentaOk, setFerramentaOk] = useState<number[]>([])

  useEffect(() => {
    if (visiveis > ROTEIRO.length) {
      const t = setTimeout(() => {
        setVisiveis(1)
        setFerramentaOk([])
      }, 3500)
      return () => clearTimeout(t)
    }
    const atual = ROTEIRO[visiveis - 1]
    if (atual?.tipo === 'ferramenta' && !ferramentaOk.includes(visiveis - 1)) {
      const t = setTimeout(() => setFerramentaOk((f) => [...f, visiveis - 1]), 1100)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisiveis((v) => v + 1), atual?.tipo === 'cliente' ? 900 : 1500)
    return () => clearTimeout(t)
  }, [visiveis, ferramentaOk])

  const proximo = ROTEIRO[visiveis]
  const agentePensando = visiveis <= ROTEIRO.length && proximo && proximo.tipo !== 'cliente' && ROTEIRO[visiveis - 1]?.tipo === 'cliente'

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-xl">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <span className="relative flex size-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <BotMessageSquare className="size-4" />
          <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
        </span>
        <div className="flex-1">
          <div className="text-sm font-medium">Bia · Agente da Passo Certo</div>
          <div className="text-xs text-muted-foreground">Respondendo no WhatsApp</div>
        </div>
        <Badge variant="outline" className="gap-1 font-mono text-[10px]">
          <Zap className="size-3 text-amber-500" /> 1,2 s
        </Badge>
      </div>
      <div className="flex h-[360px] flex-col justify-end gap-2.5 bg-muted/30 p-4">
        <AnimatePresence initial={false}>
          {ROTEIRO.slice(0, visiveis).map((p, i) => (
            <motion.div key={`${i}-${p.tipo}`} layout initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} className={cn('flex', p.tipo === 'cliente' ? 'justify-end' : 'justify-start')}>
              {p.tipo === 'cliente' && <span className="max-w-[80%] rounded-2xl rounded-br-sm bg-emerald-600 px-3 py-2 text-sm text-white">{p.texto}</span>}
              {p.tipo === 'agente' && <span className="max-w-[85%] rounded-2xl rounded-bl-sm border bg-background px-3 py-2 text-sm">{p.texto}</span>}
              {p.tipo === 'ferramenta' && (
                <span className="inline-flex items-center gap-2 rounded-md border border-dashed bg-background px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                  {ferramentaOk.includes(i) ? <Check className="size-3.5 text-emerald-500" /> : <Loader className="size-3.5 animate-spin" />}
                  <p.Icon className="size-3.5" />
                  {p.texto}
                </span>
              )}
              {p.tipo === 'pix' && (
                <div className="w-60 rounded-2xl rounded-bl-sm border bg-background p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 grid-cols-4 gap-0.5 rounded-md border p-1" aria-hidden>
                      {Array.from({ length: 16 }, (_, k) => (
                        <span key={k} className={cn('rounded-[1px]', [0, 2, 5, 7, 8, 11, 13, 14, 15].includes(k) ? 'bg-foreground' : 'bg-transparent')} />
                      ))}
                    </span>
                    <div>
                      <div className="font-medium">Pix · R$ 349,90</div>
                      <div className="text-xs text-muted-foreground">Expira em 30 min</div>
                    </div>
                  </div>
                  <Button size="xs" variant="secondary" className="mt-3 w-full">
                    Copiar código
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
          {agentePensando && (
            <motion.div key="digitando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Digitando />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <a href="#" className="inline-flex items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 text-xs">
            <Badge className="h-5 rounded-full bg-emerald-500 text-white">Novo</Badge> Agentes agora emitem nota fiscal <ArrowRight className="size-3" />
          </a>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Um agente de IA que <span className="bg-gradient-to-r from-emerald-500 to-lime-500 bg-clip-text text-transparent">resolve</span>, não só responde.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            O faro consulta estoque, agenda horários, gera Pix e atualiza seu CRM direto na conversa. Treinado com os seus dados, ligado nos seus sistemas, no ar em uma tarde.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">Criar agente grátis</Button>
            <Button size="lg" variant="outline">
              <Headset data-icon="inline-start" /> Falar com vendas
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {['Sem cartão de crédito', '14 dias grátis', 'Dados no Brasil (LGPD)'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-emerald-500" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ChatAgente />
        </div>
      </div>
    </section>
  )
}

const CASOS = [
  { id: 'vendas', Icon: HandCoins, titulo: 'Vendas no WhatsApp', resumo: 'Tira dúvidas, recomenda produtos e fecha o pedido com Pix.', passos: ['Entende o que o cliente procura', 'Consulta estoque e preço em tempo real', 'Gera Pix ou link de pagamento', 'Registra a venda no ERP'], metrica: '+38%', rotulo: 'conversão em conversas' },
  { id: 'agenda', Icon: CalendarCheck, titulo: 'Agendamentos', resumo: 'Marca, remarca e confirma horários sem ninguém no telefone.', passos: ['Mostra horários livres da agenda', 'Confirma e envia lembrete 24h antes', 'Remarca faltas automaticamente'], metrica: '−62%', rotulo: 'de faltas em clínicas' },
  { id: 'suporte', Icon: Headset, titulo: 'Suporte e pós-venda', resumo: 'Rastreia pedidos, troca produtos e abre chamados.', passos: ['Busca o pedido pelo CPF', 'Mostra rastreio da transportadora', 'Abre troca e gera etiqueta', 'Escala para humano quando precisa'], metrica: '81%', rotulo: 'resolvido sem humano' },
  { id: 'cobranca', Icon: Receipt, titulo: 'Cobrança', resumo: 'Lembra vencimentos e negocia parcelas com educação.', passos: ['Avisa antes do vencimento', 'Oferece acordo dentro da sua regra', 'Emite novo boleto ou Pix'], metrica: 'R$ 1,4 mi', rotulo: 'recuperados por clientes em 2026' },
]

function CasosDeUso() {
  const [ativo, setAtivo] = useState(CASOS[0].id)
  const caso = CASOS.find((c) => c.id === ativo) ?? CASOS[0]
  return (
    <section className="w-full border-t bg-muted/30 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Casos de uso</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Um agente para cada etapa da jornada</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-2">
            {CASOS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setAtivo(c.id)}
                className={cn('flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors', ativo === c.id ? 'border-emerald-500/50 bg-background shadow-sm' : 'border-transparent hover:bg-background/60')}
              >
                <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', ativo === c.id ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground')}>
                  <c.Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-medium">{c.titulo}</span>
                  <span className="block text-sm text-muted-foreground">{c.resumo}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border bg-background p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={caso.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-end justify-between gap-4 border-b pb-6">
                  <div>
                    <div className="text-sm text-muted-foreground">{caso.titulo}</div>
                    <div className="mt-1 text-5xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">{caso.metrica}</div>
                    <div className="text-sm text-muted-foreground">{caso.rotulo}</div>
                  </div>
                  <caso.Icon className="size-16 text-muted-foreground/20" />
                </div>
                <ol className="mt-6 space-y-4">
                  {caso.passos.map((p, i) => (
                    <motion.li key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }} className="flex items-center gap-3 text-sm">
                      <span className="flex size-6 items-center justify-center rounded-full border font-mono text-xs">{i + 1}</span>
                      {p}
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const INTEGRACOES: Array<{ Icon: LucideIcon; nome: string }> = [
  { Icon: MessageCircle, nome: 'WhatsApp' },
  { Icon: Instagram, nome: 'Instagram' },
  { Icon: Mail, nome: 'E-mail' },
  { Icon: CalendarCheck, nome: 'Agenda' },
  { Icon: Package, nome: 'ERP' },
  { Icon: Sheet, nome: 'Planilhas' },
  { Icon: QrCode, nome: 'Pix' },
  { Icon: Megaphone, nome: 'CRM' },
]

function Integracoes() {
  return (
    <section className="w-full px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Integrações</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Ligado em tudo que você já usa</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">Mais de 60 conectores prontos e uma API aberta para o resto. O agente só executa as ações que você liberar, com registro de cada uma.</p>
          <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {INTEGRACOES.slice(0, 6).map((i) => (
              <div key={i.nome} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
                <i.Icon className="size-4 text-muted-foreground" /> {i.nome}
                <Check className="ml-auto size-3.5 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <div className="absolute inset-[12%] rounded-full border border-dashed" />
          <div className="absolute inset-[30%] rounded-full border" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-24 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-[0_0_60px_-10px] shadow-emerald-500">
              <BotMessageSquare className="size-10" />
            </span>
          </div>
          <motion.div className="absolute inset-[12%]" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
            {INTEGRACOES.map((it, i) => {
              const ang = (i / INTEGRACOES.length) * Math.PI * 2
              return (
                <motion.div
                  key={it.nome}
                  className="absolute -mt-6 -ml-6"
                  style={{ left: `${50 + Math.cos(ang) * 50}%`, top: `${50 + Math.sin(ang) * 50}%` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="flex size-12 items-center justify-center rounded-xl border bg-card shadow-sm" title={it.nome}>
                    <it.Icon className="size-5" />
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const PLANOS = [
  { nome: 'Essencial', mensal: 297, conversas: '1.000 conversas/mês', itens: ['1 agente', 'WhatsApp e Instagram', 'Base de conhecimento', 'Relatórios básicos'] },
  { nome: 'Crescimento', mensal: 797, conversas: '5.000 conversas/mês', itens: ['5 agentes', 'Todas as integrações', 'Ações (Pix, agenda, ERP)', 'Passagem para humano', 'Suporte prioritário'], destaque: true },
  { nome: 'Escala', mensal: 1990, conversas: 'Conversas ilimitadas', itens: ['Agentes ilimitados', 'SSO e auditoria', 'Modelo dedicado', 'Gerente de sucesso'] },
]

const reais = (n: number) => n.toLocaleString('pt-BR')

function Precos() {
  const [anual, setAnual] = useState(true)
  return (
    <section className="w-full border-t bg-muted/30 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Preços</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Pague pelo que o agente resolve</h2>
          </div>
          <label className="flex items-center gap-3 rounded-full border bg-background px-4 py-2 text-sm">
            Mensal
            <Switch checked={anual} onCheckedChange={setAnual} aria-label="Cobrança anual" />
            Anual <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">−20%</Badge>
          </label>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PLANOS.map((p) => {
            const preco = anual ? Math.round(p.mensal * 0.8) : p.mensal
            return (
              <div key={p.nome} className={cn('flex flex-col rounded-2xl border bg-background p-6', p.destaque && 'border-emerald-500 ring-4 ring-emerald-500/10')}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{p.nome}</span>
                  {p.destaque && <Badge className="bg-emerald-500 text-white">Mais escolhido</Badge>}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={preco} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="text-4xl font-semibold tabular-nums tracking-tight">
                      {reais(preco)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{p.conversas}</div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.itens.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="size-4 text-emerald-500" /> {i}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6" variant={p.destaque ? 'default' : 'outline'}>
                  Começar com o {p.nome}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const FAQ = [
  ['O agente inventa respostas?', 'Ele responde apenas com base nos documentos, catálogos e sistemas que você conectar. Quando não sabe, diz que não sabe e chama alguém do time.'],
  ['Preciso saber programar?', 'Não. Você descreve o agente em português, sobe seus arquivos e liga as integrações com poucos cliques. A API existe para quem quiser ir além.'],
  ['Funciona com o WhatsApp oficial?', 'Sim, usamos a API oficial do WhatsApp Business, com número verificado e templates aprovados.'],
  ['Como fica a LGPD?', 'Dados armazenados no Brasil, criptografados, com contrato de operador e opção de apagar conversas automaticamente após X dias.'],
  ['Posso revisar antes de o agente enviar?', 'Pode. Ative o modo copiloto: o agente escreve, sua equipe aprova com um clique.'],
  ['O que conta como conversa?', 'Uma janela de 24 horas com o mesmo cliente, não importa quantas mensagens forem trocadas.'],
]

function Faq() {
  return (
    <section className="w-full px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">FAQ</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas que todo mundo faz</h2>
          <p className="mt-4 text-muted-foreground">Ainda com dúvida? Converse com o próprio agente no canto da tela.</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-500" /> SOC 2 Tipo II · ISO 27001
          </div>
        </div>
        <Accordion defaultValue={['item-0']} className="rounded-2xl border bg-card px-5">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`item-${i}`}>
              <AccordionTrigger className="py-4 text-[15px]">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-emerald-600 px-8 py-12 text-white sm:flex-row sm:items-center sm:px-12">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Seu primeiro agente no ar hoje.</h2>
          <p className="mt-2 text-white/80">Importamos seu catálogo e suas perguntas frequentes em minutos.</p>
        </div>
        <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
          <Sparkles data-icon="inline-start" /> Criar agente grátis
        </Button>
      </div>
    </section>
  )
}

function Footer() {
  const cols: Array<[string, string[]]> = [
    ['Produto', ['Agentes', 'Integrações', 'Preços', 'Novidades']],
    ['Recursos', ['Documentação', 'API', 'Blog', 'Status']],
    ['Empresa', ['Sobre', 'Carreiras', 'Privacidade', 'Termos']],
  ]
  return (
    <footer className="w-full border-t px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Agentes de IA que trabalham nos seus canais. Feito em Recife.</p>
        </div>
        {cols.map(([t, ls]) => (
          <FooterCol key={t} titulo={t}>
            {ls.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </FooterCol>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t pt-6 text-xs text-muted-foreground">© 2026 Faro Inteligência Artificial Ltda.</div>
    </footer>
  )
}

function FooterCol({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium">{titulo}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  )
}

export default function LandingDeAgenteDeIa() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <Hero />
      <CasosDeUso />
      <Integracoes />
      <Precos />
      <Faq />
      <Cta />
      <Footer />
    </div>
  )
}
