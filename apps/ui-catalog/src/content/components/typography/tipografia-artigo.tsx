'use client'

const METAS = [
  ['Atração → Qualificação', '12%', '18%'],
  ['Qualificação → Proposta', '45%', '55%'],
  ['Proposta → Fechamento', '28%', '35%'],
]

export default function TipografiaArtigo() {
  return (
    <article className="w-full max-w-2xl">
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Guia · 8 min de leitura</p>
      <h1 className="mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">Como estruturar um funil de vendas que converte</h1>
      <p className="mt-4 text-xl text-muted-foreground">Um passo a passo prático para transformar leads em clientes sem depender de sorte.</p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Por que o funil importa</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Sem um funil claro, cada vendedor inventa o próprio processo e a previsão de receita vira adivinhação. Um funil bem definido mostra onde os negócios travam, quanto tempo ficam em cada etapa e
        qual ação destrava a próxima.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">“O que não é medido não é gerenciado — e o funil é o seu instrumento de medição.”</blockquote>

      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">As quatro etapas</h3>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          <strong>Atração:</strong> conteúdo, anúncios e indicações trazem visitantes.
        </li>
        <li>
          <strong>Qualificação:</strong> formulário ou SDR separa curiosos de compradores.
        </li>
        <li>
          <strong>Proposta:</strong> apresentação, negociação e alinhamento de valor.
        </li>
        <li>
          <strong>Fechamento:</strong> contrato assinado e onboarding iniciado.
        </li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Acompanhe a taxa de conversão entre etapas. Um bom ponto de partida é criar o campo{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">etapa_atual</code> no CRM e revisar os números toda segunda-feira.
      </p>

      <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">Metas de referência</h4>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold">Passagem</th>
              <th className="border px-4 py-2 text-right font-bold">Média do mercado</th>
              <th className="border px-4 py-2 text-right font-bold">Meta</th>
            </tr>
          </thead>
          <tbody>
            {METAS.map(([p, m, meta]) => (
              <tr key={p} className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">{p}</td>
                <td className="border px-4 py-2 text-right tabular-nums">{m}</td>
                <td className="border px-4 py-2 text-right tabular-nums">{meta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-lg font-semibold">Resumo</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Defina as etapas, meça a passagem entre elas e automatize o que for repetitivo. Em poucas semanas o time passa a falar a mesma língua — e a previsão de fechamento deixa de ser um chute.
      </p>
      <p className="mt-8 text-sm leading-none font-medium">Escrito por Carla Mendes</p>
      <p className="mt-2 text-sm text-muted-foreground">Atualizado em 12 de outubro de 2026.</p>
    </article>
  )
}
