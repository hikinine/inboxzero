'use client'

// GERADO por scripts/compose-landing.ts a partir de: blocks/navbar/codehall-navbar.tsx, blocks/hero/codehall-hero.tsx, blocks/features/codehall-areas.tsx, blocks/features/codehall-capacidades.tsx, blocks/processo/codehall-processo.tsx, blocks/pricing/codehall-contratacao.tsx, blocks/features/codehall-principios.tsx, blocks/faq/codehall-faq.tsx, blocks/cta/codehall-cta.tsx, blocks/footer/codehall-footer.tsx
import { ArrowUpRight, Building2, Check, Factory, FileText, GraduationCap, Headset, Landmark, Menu, Scale, ShieldCheck, ShoppingBag, Sparkles, Sprout, Stethoscope, Truck, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { motion } from 'motion/react'
import { Switch } from '@/components/ui/switch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const CH_NAV_LINKS = ['Áreas', 'Capacidades', 'Processo', 'Contratação', 'FAQ']

function CodehallNavbar() {
  return (
    <header className="w-full border-b bg-background [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-(--acc) text-base font-black text-(--on-acc)">C</span>
          <span className="leading-tight">
            <b className="block text-[15px] font-bold">Codehall</b>
            <small className="block text-xs text-muted-foreground">Software house · IA aplicada</small>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {CH_NAV_LINKS.map((l) => (
            <a key={l} href="#" className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="hidden items-center gap-1.5 rounded-full bg-(--acc) px-4 py-2 text-sm font-semibold text-(--on-acc) transition hover:brightness-105 md:inline-flex">
          Falar com a gente <ArrowUpRight className="size-4" />
        </a>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Codehall</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {CH_NAV_LINKS.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
              <a href="#" className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-(--acc) px-4 py-2 text-sm font-semibold text-(--on-acc)">
                Falar com a gente <ArrowUpRight className="size-4" />
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
const CH_HERO_FACTS: Array<[string, string]> = [
  ['12', 'setores de atuação'],
  ['8', 'capacidades de IA'],
  ['100%', 'do código é seu'],
]
const CH_HERO_STACK = ['Claude', 'OpenAI', 'Gemini', 'Llama', 'AWS', 'Google Cloud', 'Cloudflare', 'PostgreSQL', 'WhatsApp', 'Microsoft 365']

function CodehallHero() {
  return (
    <section className="w-full bg-foreground text-background [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)] [clip-path:polygon(0_0,calc(100%-72px)_0,100%_72px,100%_100%,0_100%)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm">
            <span className="text-background/70">Software house</span>
            <span className="rounded-full border-[1.5px] border-(--acc) px-2.5 py-0.5 text-xs font-semibold text-(--acc)">IA aplicada</span>
          </p>
          <h1 className="mt-5 text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            <span className="block font-light">IA que entra em</span>
            <span className="block font-light">produção,</span>
            <strong className="block font-extrabold">não em slide.</strong>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/75">
            Projetamos, construímos e operamos software com inteligência artificial no centro — agentes que executam tarefas, automação de documentos, visão computacional e voz — para empresas que querem resultado medido, não demonstração.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-(--acc) px-6 py-3 text-base font-semibold text-(--on-acc) shadow-[0_0_40px_-8px_var(--acc)] transition hover:brightness-105">
              Agendar diagnóstico <ArrowUpRight className="size-5" />
            </a>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-background/80 underline-offset-4 hover:underline">
              Ver o que entregamos <ArrowUpRight className="size-4" />
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-8">
            {CH_HERO_FACTS.map(([n, l]) => (
              <li key={l}>
                <b className="block text-3xl font-extrabold tracking-[-0.04em]">{n}</b>
                <span className="text-sm text-background/60">{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Palco com mockups */}
        <div className="relative min-h-[420px]" aria-hidden>
          <div className="absolute inset-[8%_4%_4%_10%] rounded-full bg-(--acc) opacity-20 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute left-0 top-0 w-[72%] rounded-2xl border border-background/15 bg-background text-foreground shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-(--acc) text-xs font-black text-(--on-acc)">C</span>
              <div className="leading-tight">
                <b className="block text-sm">Agente de atendimento</b>
                <small className="flex items-center gap-1 text-xs text-muted-foreground">
                  <i className="size-1.5 rounded-full bg-emerald-500" /> online · WhatsApp
                </small>
              </div>
            </div>
            <div className="space-y-2.5 p-4 text-sm">
              <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">Oi! Quero trocar o tamanho do meu pedido #4821.</p>
              <div className="flex flex-wrap gap-1.5">
                {['crm.buscarPedido', 'estoque.consultar'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    <Check className="size-3 text-emerald-500" /> {t}
                  </span>
                ))}
              </div>
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-(--acc) px-3 py-2 text-(--on-acc)">Encontrei seu pedido. O tamanho G está disponível — posso gerar a etiqueta de troca agora?</p>
              <p className="flex gap-1 pl-1">
                {[0, 1, 2].map((i) => (
                  <motion.i key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="absolute right-0 top-[38%] w-[62%] rounded-2xl border border-background/15 bg-background p-4 text-foreground shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <b className="block text-sm">NF-e recebida</b>
                <small className="block text-xs text-muted-foreground">via e-mail · extração automática</small>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">Validada</span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {[
                ['Fornecedor', 'Distribuidora Alfa'],
                ['Valor', 'R$ 12.480,00'],
                ['Vencimento', '15/11/2026'],
                ['Destino', 'Lançado no ERP'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-[6%] flex w-[64%] items-center gap-3 rounded-2xl border border-background/15 bg-background p-3 text-foreground shadow-2xl"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--acc) text-(--on-acc)">
              <ShieldCheck className="size-4" />
            </span>
            <Switch defaultChecked size="sm" />
            <div className="min-w-0 leading-tight">
              <b className="block text-sm">Humano no loop</b>
              <small className="block truncate text-xs text-muted-foreground">Reembolsos acima de R$ 500 pedem aprovação.</small>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <p className="text-sm text-background/60">Trabalhamos com os melhores modelos e a infraestrutura que você já usa.</p>
        <div className="mt-4 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)' }}>
          <motion.div className="flex w-max gap-10" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
            {[...CH_HERO_STACK, ...CH_HERO_STACK].map((n, i) => (
              <span key={`${n}-${i}`} className="text-lg font-semibold tracking-tight text-background/50">
                {n}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
const CH_AREAS = [
  { Icon: Stethoscope, k: 'Saúde', t: 'Prontuário que se escreve sozinho.', d: 'Transcrição de consulta, pré-atendimento e auditoria de contas médicas.' },
  { Icon: Scale, k: 'Jurídico', t: 'Contratos lidos em minutos.', d: 'Análise, comparação e pesquisa de jurisprudência com citação da fonte.', alt: true },
  { Icon: ShoppingBag, k: 'Varejo', t: 'Vendas que não dormem.', d: 'Atendimento no WhatsApp, catálogo enriquecido e previsão de demanda.', alt: true },
  { Icon: Factory, k: 'Indústria', t: 'Qualidade inspecionada na linha.', d: 'Visão computacional, manutenção preditiva e copiloto de manuais.' },
  { Icon: Truck, k: 'Logística', t: 'Entregas que se explicam.', d: 'Leitura de canhotos e CT-e, roteirização e rastreio proativo.' },
  { Icon: Landmark, k: 'Finanças', t: 'Conciliação sem planilha.', d: 'Extração de notas e boletos, crédito assistido e detecção de anomalias.', alt: true },
  { Icon: GraduationCap, k: 'Educação', t: 'Um tutor para cada aluno.', d: 'Tutores sobre o seu material, correção assistida e trilhas adaptativas.', alt: true },
  { Icon: Building2, k: 'Imobiliário', t: 'O imóvel certo, mais rápido.', d: 'Qualificação de leads, leitura de matrículas e avaliação comparativa.' },
  { Icon: Sprout, k: 'Agro', t: 'Lavoura vista de perto.', d: 'Pragas por imagem, estimativa de safra e assistente técnico de campo.' },
  { Icon: Headset, k: 'Atendimento', t: 'Fila zero, qualidade total.', d: 'Agentes de voz e texto, roteamento por intenção e QA de toda conversa.', alt: true },
  { Icon: Zap, k: 'Energia', t: 'Faturas e ativos sob controle.', d: 'Leitura de faturas, previsão de consumo e inspeção de ativos por imagem.', alt: true },
  { Icon: Users, k: 'RH & operações', t: 'Backoffice no piloto automático.', d: 'Triagem auditável, onboarding e base de conhecimento interna.' },
]

function CodehallAreas() {
  return (
    <section className="w-full bg-muted/40 px-6 py-24 [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4" /> Áreas de atuação
            </p>
            <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
              <span className="font-light">IA aplicada onde o seu</span> <strong className="font-extrabold">negócio já opera.</strong>
            </h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Saúde, jurídico, varejo, indústria ou finanças: o padrão se repete. Todo processo repetitivo, com regra clara e muito volume, pode virar um sistema que se resolve sozinho — com uma pessoa revisando o que importa.</p>
            <p className="font-semibold text-foreground">Doze setores em que a gente já sabe por onde começar.</p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CH_AREAS.map((a) => (
            <article key={a.k} className={`rounded-[20px] border p-5 ${a.alt ? 'border-transparent bg-muted' : 'bg-card'}`}>
              <header className="flex items-center gap-2.5">
                <span className={`flex size-9 items-center justify-center rounded-xl border ${a.alt ? 'border-transparent bg-(--acc) text-(--on-acc)' : 'bg-background'}`}>
                  <a.Icon className="size-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{a.k}</span>
              </header>
              <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight">{a.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
const CH_CAPS = [
  { n: '01', k: 'Automação', t: 'Agentes que executam tarefas', c: '3–6 semanas', d: 'Agentes que operam sistemas reais — ERP, CRM, e-mail, planilhas — com permissões controladas e aprovação humana onde o erro custa caro.', chips: ['Tool use', 'MCP', 'Filas', 'Workflows'] },
  { n: '02', k: 'Conhecimento', t: 'Copilotos sobre seus documentos', c: '2–4 semanas', d: 'Busca semântica e respostas sobre as bases internas da empresa, sempre com citação da fonte e respeitando quem pode ver o quê.', chips: ['RAG', 'pgvector', 'Rerank', 'SSO'] },
  { n: '03', k: 'Documentos', t: 'Extração estruturada de documentos', c: '2–5 semanas', d: 'Notas fiscais, contratos, laudos, boletos e formulários viram dados validados por regra de negócio e entram direto nos seus sistemas.', chips: ['OCR', 'Modelos multimodais', 'Validação'] },
  { n: '04', k: 'Imagem e vídeo', t: 'Visão computacional', c: '4–8 semanas', d: 'Detecção, classificação, contagem e inspeção — na nuvem ou no edge, ao lado da câmera, funcionando mesmo sem internet.', chips: ['YOLO', 'VLMs', 'Edge'] },
  { n: '05', k: 'Voz', t: 'Agentes de voz e transcrição', c: '3–6 semanas', d: 'URA inteligente, transcrição e atendimento por voz em tempo real, integrados à telefonia que você já usa.', chips: ['STT / TTS', 'SIP', 'WebRTC'] },
  { n: '06', k: 'Dados', t: 'Modelos preditivos', c: '3–8 semanas', d: 'Previsão de demanda, churn, risco e anomalias. Quando um modelo clássico resolve melhor e mais barato que um LLM, é ele que usamos.', chips: ['Python', 'Gradient boosting', 'Séries temporais'] },
  { n: '07', k: 'Conversação', t: 'Atendimento e vendas no WhatsApp', c: '2–4 semanas', d: 'Atendimento omnichannel com memória, integração ao CRM e passagem suave para uma pessoa quando a conversa pede.', chips: ['WhatsApp API', 'Instagram', 'CRM'] },
  { n: '08', k: 'Produto', t: 'Produto digital completo', c: '6–16 semanas', d: 'Web, mobile, backoffice e integrações em volta da IA. Entregamos o produto inteiro, não só o modelo.', chips: ['TypeScript', 'React', 'React Native', 'PostgreSQL'] },
]

function CodehallCapacidades() {
  return (
    <section className="w-full bg-muted/40 px-6 py-24 [--acc:var(--brand,#d7ff4f)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-4xl tracking-[-0.03em] sm:text-5xl">
            <span className="font-light">O que a gente</span> <strong className="font-extrabold">entrega.</strong>
          </h2>
          <p className="text-muted-foreground">Oito capacidades técnicas que combinamos em cada projeto. Os ciclos são referência depois do diagnóstico — o escopo real define o prazo.</p>
        </div>
        <Accordion className="mt-10 overflow-hidden rounded-[20px] border bg-card" defaultValue={['01']}>
          {CH_CAPS.map((c) => (
            <AccordionItem key={c.n} value={c.n} className="px-5">
              <AccordionTrigger className="py-5 hover:no-underline">
                <span className="grid w-full grid-cols-[32px_1fr_auto] items-center gap-4 text-left">
                  <span className="text-sm font-extrabold text-muted-foreground">{c.n}</span>
                  <span className="leading-tight">
                    <small className="block text-xs text-muted-foreground">{c.k}</small>
                    <b className="block text-base font-bold sm:text-lg">{c.t}</b>
                  </span>
                  <span className="hidden text-right leading-tight sm:block">
                    <small className="block text-xs text-muted-foreground">Ciclo típico</small>
                    <b className="block text-sm font-bold">{c.c}</b>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-[48px]">
                <p className="max-w-2xl text-muted-foreground">{c.d}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.chips.map((ch) => (
                    <span key={ch} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                      {ch}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
const CH_STEPS = [
  { n: '01', tag: '1–2 semanas', t: 'Diagnóstico', d: 'Mapeamos o processo, os dados disponíveis, o retorno esperado e os riscos.', out: 'Viabilidade e backlog priorizado' },
  { n: '02', tag: '~2 semanas', t: 'Protótipo', d: 'Prova de conceito com dados reais. Os critérios de avaliação vêm antes do código.', out: 'PoC e métricas de base' },
  { n: '03', tag: '4–8 semanas', t: 'MVP', d: 'Em produção com usuários reais, observabilidade e custo por operação medido.', out: 'Sistema no ar e painel' },
  { n: '04', tag: 'Contínuo', t: 'Escala', d: 'Integrações, SSO, trilha de auditoria, segurança e SLAs.', out: 'Pronto para a empresa toda' },
  { n: '05', tag: 'Contínuo', t: 'Operação', d: 'Monitoramento de qualidade, reavaliação a cada novo modelo e otimização de custo.', out: 'Melhora mês a mês' },
]

function CodehallProcesso() {
  return (
    <section className="w-full bg-foreground px-6 py-24 text-background [--acc:var(--brand,#d7ff4f)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-(--acc)">
              <Sparkles className="size-4" /> Como trabalhamos
            </p>
            <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
              <span className="font-light">Do diagnóstico à operação,</span> <strong className="font-extrabold">com métrica em cada etapa.</strong>
            </h2>
          </div>
          <p className="text-background/70">Nada de projeto que some por meses. Você vê algo funcionando em semanas, e cada decisão é tomada com dado — inclusive a de não seguir.</p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CH_STEPS.map((s) => (
            <li key={s.n} className="group flex min-h-[280px] flex-col gap-3 rounded-[20px] border border-background/10 bg-background/5 p-6 transition hover:-translate-y-1 hover:border-(--acc)/40">
              <span className="text-5xl font-extralight leading-none tracking-[-0.06em] text-(--acc)">{s.n}</span>
              <span className="w-fit rounded-full bg-background/10 px-2.5 py-0.5 text-xs font-medium text-background/70">{s.tag}</span>
              <h3 className="text-xl font-bold tracking-tight">{s.t}</h3>
              <p className="text-sm text-background/70">{s.d}</p>
              <p className="mt-auto border-t border-background/10 pt-3 text-xs font-semibold text-background/80">{s.out}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
const CH_PLANS = [
  { tag: 'Recomendado para começar', t: 'Sprint de diagnóstico', d: 'Escopo e preço fechados. Duas semanas para sair com viabilidade, arquitetura e estimativa.', items: ['Entrevistas e análise de dados', 'Protótipo navegável', 'ROI e custo de IA estimados'], featured: true },
  { tag: 'Produto definido', t: 'Escopo fechado', d: 'Marcos, entregas e critérios de aceite claros. Ideal logo depois do diagnóstico.', items: ['Demo a cada quinze dias', 'Garantia pós-entrega', 'Código e documentação entregues'] },
  { tag: 'Roadmap contínuo', t: 'Squad dedicado', d: 'Engenharia, IA, produto e design alocados ao seu roadmap, com cadência semanal.', items: ['Time multidisciplinar', 'Escala conforme a demanda', 'Relatório mensal de métricas'] },
  { tag: 'Já está no ar', t: 'Operação e sustentação', d: 'Monitoramento, evolução e SLA para sistemas em produção — nossos ou de terceiros.', items: ['Plantão e SLA', 'Alertas de regressão de qualidade', 'Otimização de custo de IA'] },
]

function CodehallContratacao() {
  return (
    <section className="w-full bg-muted/40 px-6 py-24 [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4" /> Modelos de contratação
            </p>
            <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
              <span className="font-light">Quatro formas de</span> <strong className="font-extrabold">começar.</strong>
            </h2>
          </div>
          <p className="text-muted-foreground">Comece pequeno, com escopo e preço fechados. Se fizer sentido, a gente segue junto no formato que encaixar melhor no seu momento.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {CH_PLANS.map((p) => (
            <article key={p.t} className={`flex flex-col gap-4 rounded-[20px] border p-6 ${p.featured ? 'border-foreground bg-foreground text-background' : 'bg-card'}`}>
              <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${p.featured ? 'bg-(--acc) text-(--on-acc)' : 'bg-muted text-muted-foreground'}`}>{p.tag}</span>
              <h3 className="text-2xl font-bold tracking-tight">{p.t}</h3>
              <p className={`text-sm ${p.featured ? 'text-background/70' : 'text-muted-foreground'}`}>{p.d}</p>
              <ul className={`space-y-2 border-t pt-4 text-sm ${p.featured ? 'border-background/15' : ''}`}>
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? 'text-(--acc)' : 'text-emerald-500'}`} /> {i}
                  </li>
                ))}
              </ul>
              {p.featured && (
                <a href="#" className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-(--acc) px-4 py-2 text-sm font-semibold text-(--on-acc)">
                  Quero começar <ArrowUpRight className="size-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
const CH_PRINCIPLES: Array<[string, string]> = [
  ['Avaliação antes de feature', 'Toda resposta de modelo tem métrica e conjunto de teste versionado.'],
  ['Pessoas onde importa', 'Aprovação, revisão e reversão fazem parte do produto.'],
  ['Sem dependência de fornecedor', 'Trocar de modelo é configuração, não reescrita.'],
  ['Custo visível', 'Você sabe quanto custa cada tarefa executada pela IA.'],
  ['LGPD desde o desenho', 'Minimização, anonimização, retenção configurável e DPA.'],
  ['Tudo é seu', 'Código, dados, prompts e modelos treinados pertencem ao cliente.'],
  ['Observabilidade total', 'Cada chamada de modelo é rastreada e pode ser reproduzida.'],
  ['Segurança de verdade', 'Segredos em cofre, controle de acesso e defesa contra prompt injection.'],
]

function CodehallPrincipios() {
  return (
    <section className="w-full bg-foreground px-6 py-24 text-background [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-(--acc)">
            <Sparkles className="size-4" /> Engenharia
          </p>
          <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
            <span className="font-light">Princípios que</span> <strong className="font-extrabold">não negociamos.</strong>
          </h2>
          <p className="mt-5 text-background/70">IA em produção é engenharia, não mágica. Esses são os cuidados que acompanham todo projeto, do primeiro protótipo à operação.</p>
        </div>
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {CH_PRINCIPLES.map(([t, d]) => (
            <li key={t} className="flex gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-(--acc) text-(--on-acc)">
                <Check className="size-3.5" />
              </span>
              <div>
                <b className="block font-bold">{t}</b>
                <span className="text-sm text-background/70">{d}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
const CH_FAQ: Array<[string, string]> = [
  ['Vocês só fazem IA?', 'Não. Construímos o produto inteiro — backend, frontend, mobile, integrações e infraestrutura. A IA é o núcleo, não um enfeite colado em cima.'],
  ['Meus dados vão treinar modelos de terceiros?', 'Não. Usamos APIs com contrato de não treinamento e retenção mínima, ou modelos open-source rodando na sua infraestrutura quando o requisito exige.'],
  ['Qual modelo vocês usam?', 'O que tiver o melhor resultado, custo e latência para o seu caso. Medimos antes de escolher e reavaliamos a cada nova geração de modelos.'],
  ['Quanto custa um projeto?', 'Depende do escopo. O Sprint de diagnóstico tem preço fechado e termina com uma estimativa detalhada do restante — inclusive o custo mensal de IA em produção.'],
  ['Quanto tempo até estar em produção?', 'Como referência, um MVP entra no ar entre 4 e 8 semanas depois do diagnóstico. Casos simples, como um copiloto sobre documentos, podem ser mais rápidos.'],
  ['Integra com nosso ERP, CRM ou sistema legado?', 'Sim. Via API quando existe; via banco de dados, filas, arquivos ou automação de interface quando não existe.'],
  ['E se a IA errar?', 'Ela vai errar às vezes — por isso desenhamos limites de confiança, revisão humana nos pontos críticos e monitoramento contínuo de qualidade.'],
]

function CodehallFaq() {
  return (
    <section className="w-full bg-muted/40 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4" /> Perguntas frequentes
          </p>
          <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
            <span className="font-light">Respostas</span> <strong className="font-extrabold">diretas.</strong>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Não encontrou o que procurava?{' '}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">
              Fale com a gente
            </a>{' '}
            — quem responde é quem constrói.
          </p>
        </div>
        <Accordion className="rounded-[20px] border bg-card px-5">
          {CH_FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-4 text-base font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
const CH_CTA_ITEMS = ['Conversa técnica desde o primeiro contato', 'NDA antes de qualquer detalhe sensível', 'Sem compromisso']

function CodehallCta() {
  return (
    <section className="w-full bg-(--acc) px-6 py-24 text-(--on-acc) [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)] [clip-path:polygon(0_0,calc(100%-72px)_0,100%_72px,100%_100%,0_100%)]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 className="text-4xl tracking-[-0.03em] sm:text-5xl">
            <span className="font-light">Tem um processo que deveria</span> <strong className="font-extrabold">se resolver sozinho?</strong>
          </h2>
          <p className="mt-5 max-w-xl opacity-80">Conte o problema em poucas linhas. A gente responde com as perguntas certas e, se fizer sentido, uma proposta de diagnóstico.</p>
        </div>
        <div className="space-y-5">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-foreground py-3 pl-6 pr-2 text-base font-semibold text-background transition hover:opacity-90">
            Escrever para a Codehall
            <span className="flex size-8 items-center justify-center rounded-full bg-(--acc) text-(--on-acc)">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
          <ul className="space-y-2 text-sm">
            {CH_CTA_ITEMS.map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="size-4" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
const CH_FOOTER_LINKS = ['Áreas', 'Capacidades', 'Processo', 'FAQ', 'Contato']

function CodehallFooter() {
  return (
    <footer className="w-full border-t bg-background px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>Codehall. Software com IA que funciona.</p>
        <nav className="flex flex-wrap justify-center gap-5">
          {CH_FOOTER_LINKS.map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <p>© 2026 Codehall</p>
      </div>
    </footer>
  )
}

export default function CodehallLanding() {
  return (
    <div className="w-full bg-background text-foreground">
      <CodehallNavbar />
      <CodehallHero />
      <CodehallAreas />
      <CodehallCapacidades />
      <CodehallProcesso />
      <CodehallContratacao />
      <CodehallPrincipios />
      <CodehallFaq />
      <CodehallCta />
      <CodehallFooter />
    </div>
  )
}
