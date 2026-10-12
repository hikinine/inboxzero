'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Bot, CreditCard, MessageSquare, Plug, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface Categoria {
  id: string
  label: string
  Icon: LucideIcon
  desc: string
  items: Array<{ q: string; a: string }>
}

const CATEGORIAS: Categoria[] = [
  {
    id: 'comecando',
    label: 'Começando',
    Icon: MessageSquare,
    desc: 'Primeiros passos, importação e conexão dos canais.',
    items: [
      { q: 'Quanto tempo leva para começar a usar?', a: 'Menos de 10 minutos. Você conecta o número, importa os contatos e já responde pela plataforma. O histórico migra em segundo plano.' },
      { q: 'Posso usar meu número atual de WhatsApp?', a: 'Sim. Conectamos via API oficial, mantendo número, selo verificado e conversas antigas.' },
      { q: 'Como importo meus contatos?', a: 'Por CSV, pela integração com o seu CRM ou direto do Google Contatos. Tags e campos personalizados vêm junto.' },
      { q: 'Funciona no celular?', a: 'Sim. App para iOS e Android com notificações, respostas rápidas e transferência de conversa.' },
    ],
  },
  {
    id: 'planos',
    label: 'Planos e cobrança',
    Icon: CreditCard,
    desc: 'Valores, formas de pagamento e mudanças de plano.',
    items: [
      { q: 'Como funciona a cobrança?', a: 'Mensal ou anual, no cartão, Pix ou boleto. O plano anual tem dois meses de desconto e nota fiscal automática.' },
      { q: 'Posso mudar de plano a qualquer momento?', a: 'Sim. O upgrade vale na hora, com valor proporcional. O downgrade entra na próxima renovação.' },
      { q: 'O que acontece se eu passar do limite de conversas?', a: 'Nada para. Cobramos R$ 0,19 por conversa excedente e avisamos quando você chega a 80% do limite.' },
    ],
  },
  {
    id: 'integracoes',
    label: 'Integrações',
    Icon: Plug,
    desc: 'CRMs, lojas, planilhas e API.',
    items: [
      { q: 'Quais integrações já existem?', a: 'RD Station, Pipedrive, HubSpot, Shopify, Nuvemshop, Bling, Google Sheets e mais de 300 apps via Zapier.' },
      { q: 'Tem API e webhooks?', a: 'Sim. API REST documentada, webhooks por evento e chaves separadas para teste e produção.' },
      { q: 'Consigo integrar com um sistema interno?', a: 'Consegue. O time de implantação ajuda a mapear os campos e a montar o fluxo de sincronização.' },
    ],
  },
  {
    id: 'ia',
    label: 'Assistente de IA',
    Icon: Bot,
    desc: 'O que a IA faz, o que ela não faz e como treinar.',
    items: [
      { q: 'A IA responde sozinha?', a: 'Só o que você autorizar: dúvidas frequentes, qualificação e agendamento. Vendas e exceções vão para uma pessoa.' },
      { q: 'Como ensino a IA sobre o meu negócio?', a: 'Suba documentos, cole FAQs e aprove respostas no painel. Ela usa só o que estiver na sua base.' },
      { q: 'Ela fala em outros idiomas?', a: 'Sim: português, espanhol e inglês, detectando automaticamente o idioma do cliente.' },
    ],
  },
  {
    id: 'seguranca',
    label: 'Segurança e LGPD',
    Icon: ShieldCheck,
    desc: 'Hospedagem, permissões e conformidade.',
    items: [
      { q: 'Onde os dados ficam hospedados?', a: 'Em datacenters no Brasil (São Paulo), com backups diários e replicação em outra zona.' },
      { q: 'Como funcionam as permissões?', a: 'Perfis de administrador, gestor e atendente, com controle por canal e por fila. Todo acesso fica na trilha de auditoria.' },
      { q: 'Tem autenticação em dois fatores?', a: 'Sim, por aplicativo autenticador ou SMS, e SSO com Google e Microsoft nos planos Business e Enterprise.' },
    ],
  },
]

export default function FaqComCategoriasLaterais() {
  const [active, setActive] = useState('comecando')
  const current = CATEGORIAS.find((c) => c.id === active) ?? CATEGORIAS[0]!

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Perguntas frequentes</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo o que perguntam antes de assinar</h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="Categorias" className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:overflow-visible lg:px-0">
            <ul className="flex gap-2 lg:flex-col lg:gap-1">
              {CATEGORIAS.map((c) => {
                const isActive = c.id === active
                return (
                  <li key={c.id} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActive(c.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors lg:border-transparent',
                        isActive ? 'border-foreground/20 bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                      )}
                    >
                      <c.Icon className="size-4 shrink-0" />
                      <span className="whitespace-nowrap">{c.label}</span>
                      <span className="ml-auto hidden rounded-full bg-background px-1.5 text-[11px] text-muted-foreground tabular-nums lg:inline">{c.items.length}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 hidden rounded-xl border bg-muted/40 p-4 lg:block">
              <p className="text-sm font-medium">Não achou?</p>
              <p className="mt-1 text-xs text-muted-foreground">Mande sua pergunta e respondemos em até 1 hora útil.</p>
              <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-medium hover:underline">
                Abrir chamado <ArrowRight className="size-3" />
              </a>
            </div>
          </nav>

          <motion.div key={current.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <current.Icon className="size-5 text-muted-foreground" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{current.label}</h3>
                <p className="text-sm text-muted-foreground">{current.desc}</p>
              </div>
            </div>
            <Accordion className="mt-6" defaultValue={[`${current.id}-0`]}>
              {current.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${current.id}-${i}`}>
                  <AccordionTrigger className="py-4 text-base">{item.q}</AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
