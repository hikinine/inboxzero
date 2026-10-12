'use client'

import { ArrowLeft, ArrowRight, Copy, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'

const SUMARIO = ['Visão geral', 'Autenticação', 'Parâmetros', 'Exemplo', 'Erros comuns']

const PARAMETROS = [
  { nome: 'url', tipo: 'string', desc: 'Endereço HTTPS que recebe o POST. Precisa responder 2xx em até 5 s.' },
  { nome: 'eventos', tipo: 'string[]', desc: 'Lista de eventos assinados, como negocio.criado ou pagamento.aprovado.' },
  { nome: 'segredo', tipo: 'string', desc: 'Usado para assinar o cabeçalho X-Lumi-Signature. Opcional, mas recomendado.' },
]

const CODIGO = [
  'curl -X POST https://api.lumi.app/v1/webhooks \\',
  '  -H "Authorization: Bearer $LUMI_TOKEN" \\',
  '  -d \'{ "url": "https://kavo.com.br/hooks/lumi",',
  '        "eventos": ["negocio.criado", "pagamento.aprovado"] }\'',
]

const ERROS = [
  ['401', 'Token ausente ou expirado. Gere um novo em Configurações → API.'],
  ['422', 'A URL não é HTTPS ou um dos eventos não existe.'],
  ['429', 'Mais de 60 criações por minuto. Aguarde e tente de novo.'],
]

export default function TipografiaDeDocumentacao() {
  return (
    <div className="grid w-full max-w-3xl gap-8 lg:grid-cols-[1fr_11rem]">
      <article className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">
          Documentação <span className="mx-1">/</span> API <span className="mx-1">/</span> <span className="text-foreground">Webhooks</span>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">Webhooks</h1>
        <p className="mt-3 text-lg text-muted-foreground">Receba um aviso HTTP sempre que algo acontecer na sua conta: negócio criado, etapa alterada, pagamento aprovado.</p>

        <h2 id="visao-geral" className="group mt-10 flex scroll-m-20 items-center gap-2 text-xl font-semibold tracking-tight">
          Visão geral
          <a href="#visao-geral" className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-label="Link para Visão geral">
            #
          </a>
        </h2>
        <p className="mt-3 leading-7">
          Cada webhook é um <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]">POST</code> com corpo JSON. Tentamos entregar até <strong>5 vezes</strong> com intervalo crescente antes de desativar a assinatura.
        </p>
        <div className="mt-4 flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="leading-relaxed">
            <span className="font-medium">Dica:</span> responda <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.875em]">200</code> imediatamente e processe o evento em segundo plano. Assim você evita reenvios duplicados.
          </p>
        </div>

        <h2 id="autenticacao" className="mt-10 scroll-m-20 text-xl font-semibold tracking-tight">
          Autenticação
        </h2>
        <p className="mt-3 leading-7">
          Use o token da conta no cabeçalho <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]">Authorization</code>. Para gerar um, abra <Kbd>⌘</Kbd> <Kbd>K</Kbd> e digite “tokens”.
        </p>

        <h2 id="parametros" className="mt-10 scroll-m-20 text-xl font-semibold tracking-tight">
          Parâmetros
        </h2>
        <dl className="mt-3 divide-y rounded-lg border">
          {PARAMETROS.map((p) => (
            <div key={p.nome} className="grid gap-1 p-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="flex items-baseline gap-2">
                <code className="font-mono text-sm font-medium">{p.nome}</code>
                <span className="text-[11px] text-muted-foreground">{p.tipo}</span>
              </dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{p.desc}</dd>
            </div>
          ))}
        </dl>

        <h2 id="exemplo" className="mt-10 scroll-m-20 text-xl font-semibold tracking-tight">
          Exemplo
        </h2>
        <div className="mt-3 overflow-hidden rounded-lg border bg-muted/40">
          <div className="flex items-center justify-between border-b px-3 py-1.5">
            <span className="font-mono text-xs text-muted-foreground">terminal</span>
            <Button variant="ghost" size="icon-xs" aria-label="Copiar comando">
              <Copy />
            </Button>
          </div>
          <pre className="overflow-x-auto p-3 font-mono text-xs leading-6">
            {CODIGO.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </pre>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">A resposta traz o id do webhook e a data de criação.</p>

        <h2 id="erros" className="mt-10 scroll-m-20 text-xl font-semibold tracking-tight">
          Erros comuns
        </h2>
        <ul className="mt-3 space-y-2">
          {ERROS.map(([cod, desc]) => (
            <li key={cod} className="flex gap-3 text-sm leading-relaxed">
              <code className="h-fit rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">{cod}</code>
              <span className="text-muted-foreground">{desc}</span>
            </li>
          ))}
        </ul>

        <hr className="mt-10" />
        <nav className="mt-4 flex justify-between text-sm" aria-label="Páginas vizinhas">
          <a href="#" className="group flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3" /> Anterior
            </span>
            <span className="font-medium group-hover:underline">Tokens de API</span>
          </a>
          <a href="#" className="group flex flex-col items-end gap-0.5 text-right">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Próxima <ArrowRight className="size-3" />
            </span>
            <span className="font-medium group-hover:underline">Eventos disponíveis</span>
          </a>
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">Atualizado em 12 de outubro de 2026 · Esta página foi útil?</p>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-4 space-y-2 border-l pl-4 text-sm">
          <p className="text-xs font-medium text-muted-foreground">Nesta página</p>
          <ul className="space-y-1.5">
            {SUMARIO.map((s, i) => (
              <li key={s}>
                <a href="#" className={i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}>
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
