'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

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

export default function CodehallCapacidades() {
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
