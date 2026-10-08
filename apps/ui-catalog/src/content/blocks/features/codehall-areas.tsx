'use client'

import { Building2, Factory, GraduationCap, Headset, Landmark, Scale, ShoppingBag, Sparkles, Sprout, Stethoscope, Truck, Users, Zap } from 'lucide-react'

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

export default function CodehallAreas() {
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
