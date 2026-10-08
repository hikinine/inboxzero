'use client'

import { Check, Sparkles } from 'lucide-react'

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

export default function CodehallPrincipios() {
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
