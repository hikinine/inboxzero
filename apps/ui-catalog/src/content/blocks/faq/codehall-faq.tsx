'use client'

import { Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const CH_FAQ: Array<[string, string]> = [
  ['Vocês só fazem IA?', 'Não. Construímos o produto inteiro — backend, frontend, mobile, integrações e infraestrutura. A IA é o núcleo, não um enfeite colado em cima.'],
  ['Meus dados vão treinar modelos de terceiros?', 'Não. Usamos APIs com contrato de não treinamento e retenção mínima, ou modelos open-source rodando na sua infraestrutura quando o requisito exige.'],
  ['Qual modelo vocês usam?', 'O que tiver o melhor resultado, custo e latência para o seu caso. Medimos antes de escolher e reavaliamos a cada nova geração de modelos.'],
  ['Quanto custa um projeto?', 'Depende do escopo. O Sprint de diagnóstico tem preço fechado e termina com uma estimativa detalhada do restante — inclusive o custo mensal de IA em produção.'],
  ['Quanto tempo até estar em produção?', 'Como referência, um MVP entra no ar entre 4 e 8 semanas depois do diagnóstico. Casos simples, como um copiloto sobre documentos, podem ser mais rápidos.'],
  ['Integra com nosso ERP, CRM ou sistema legado?', 'Sim. Via API quando existe; via banco de dados, filas, arquivos ou automação de interface quando não existe.'],
  ['E se a IA errar?', 'Ela vai errar às vezes — por isso desenhamos limites de confiança, revisão humana nos pontos críticos e monitoramento contínuo de qualidade.'],
]

export default function CodehallFaq() {
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
