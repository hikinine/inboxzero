'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Check, FileText, ShieldCheck } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

const CH_HERO_FACTS: Array<[string, string]> = [
  ['12', 'setores de atuação'],
  ['8', 'capacidades de IA'],
  ['100%', 'do código é seu'],
]
const CH_HERO_STACK = ['Claude', 'OpenAI', 'Gemini', 'Llama', 'AWS', 'Google Cloud', 'Cloudflare', 'PostgreSQL', 'WhatsApp', 'Microsoft 365']

export default function CodehallHero() {
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
