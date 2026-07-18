import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';

export const dynamic = 'force-dynamic';

function Code({ children }: { children: string }) {
  return (
    <div className="relative mt-2">
      <div className="absolute right-2 top-2">
        <CopyButton value={children} />
      </div>
      <pre className="mono overflow-x-auto rounded-lg bg-gray-950 p-4 text-xs leading-relaxed text-gray-100">{children}</pre>
    </div>
  );
}

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <ShieldCheck className="text-brand" size={20} /> Email Checker
        </Link>
        <Link href="/dashboard" className="btn-ghost">
          Dashboard
        </Link>
      </div>

      <h1 className="mt-8 text-3xl font-extrabold">Documentação da API</h1>
      <p className="mt-2 text-neutral-400">
        Valide e-mails via HTTP: <strong>formato</strong> + <strong>domínio descartável</strong> + <strong>MX do domínio</strong>.
        Cada e-mail consome <strong>1 crédito</strong>.
      </p>

      <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
        <p className="font-semibold text-amber-300">O que a API entrega — e o que ela não entrega</p>
        <p className="mt-1 text-neutral-300">
          Ela confirma que o e-mail tem <strong>formato válido</strong>, que o domínio <strong>não é descartável</strong>
          (mailinator, 10minutemail…) e que o domínio <strong>tem servidor de e-mail (MX)</strong>. Isso pega e-mails
          malformados, domínios falsos/com typo e caixas temporárias.
        </p>
        <p className="mt-2 text-neutral-300">
          Ela <strong>não</strong> confirma se a caixa específica existe. Provedores como Gmail/Outlook aceitam qualquer
          endereço no SMTP (anti-harvesting), então <code className="mono">qualquercoisa@gmail.com</code> aparece como
          <code className="mono"> válido</code>. Para garantir que a pessoa existe, use <strong>double opt-in</strong>
          (envie um link de confirmação).
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-neutral-400">
              <th className="py-2">status</th>
              <th className="py-2">Significa</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {[
              ['valid', 'Formato ok + domínio recebe e-mail + não descartável'],
              ['disposable', 'Domínio descartável/temporário'],
              ['no_mx', 'Domínio não existe / não tem servidor de e-mail'],
              ['invalid_format', 'Não é um e-mail bem-formado'],
            ].map((r) => (
              <tr key={r[0]}>
                <td className="mono py-2 text-emerald-400">{r[0]}</td>
                <td className="py-2 text-neutral-300">{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Autenticação</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Crie uma chave em <Link href="/dashboard" className="text-brand">Dashboard → API keys</Link> e envie no header{' '}
          <code className="mono rounded bg-neutral-800 px-1">Authorization: Bearer &lt;sua_chave&gt;</code> (ou{' '}
          <code className="mono rounded bg-neutral-800 px-1">x-api-key</code>).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Verificar um e-mail</h2>
        <p className="mt-1 text-sm text-neutral-400">
          <code className="mono rounded bg-neutral-800 px-1">POST /api/v1/verify</code>
        </p>
        <Code>{`curl -X POST https://<host>/api/v1/verify \\
  -H "Authorization: Bearer ek_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{ "email": "contato@mailinator.com" }'`}</Code>
        <p className="mt-4 text-sm font-semibold text-neutral-300">Resposta</p>
        <Code>{`{
  "email": "contato@mailinator.com",
  "status": "disposable",
  "isValid": true,
  "isDisposable": true,
  "domain": "mailinator.com",
  "confidence": 100,
  "reason": "dominio_descartavel",
  "mxChecked": false,
  "hasMx": null,
  "creditsRemaining": 499
}`}</Code>
        <p className="mt-3 text-sm text-neutral-400">
          O MX é checado por padrão. Passe <code className="mono rounded bg-neutral-800 px-1">"mx": false</code> para pular
          (mais rápido, mas não detecta domínio inexistente).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Verificar em batch</h2>
        <p className="mt-1 text-sm text-neutral-400">Envie um array em <code className="mono rounded bg-neutral-800 px-1">emails</code> (até 1000 por requisição).</p>
        <Code>{`curl -X POST https://<host>/api/v1/verify \\
  -H "Authorization: Bearer ek_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{ "emails": ["a@gmail.com", "b@10minutemail.com"], "mx": false }'`}</Code>
        <p className="mt-4 text-sm font-semibold text-neutral-300">Resposta</p>
        <Code>{`{
  "results": [
    { "email": "a@gmail.com", "isValid": true, "isDisposable": false, "domain": "gmail.com", "reason": null },
    { "email": "b@10minutemail.com", "isValid": true, "isDisposable": true, "domain": "10minutemail.com", "reason": "dominio_descartavel" }
  ],
  "summary": { "total": 2, "valid": 2, "invalid": 0, "disposable": 1, "creditsCharged": 2, "creditsRemaining": 497 }
}`}</Code>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Checagem de MX</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Ligada por padrão: domínios sem servidor de e-mail (inexistentes/typo) voltam com{' '}
          <code className="mono rounded bg-neutral-800 px-1">status: "no_mx"</code> e{' '}
          <code className="mono rounded bg-neutral-800 px-1">hasMx: false</code>. Envie{' '}
          <code className="mono rounded bg-neutral-800 px-1">"mx": false</code> para desligar.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Saldo de créditos</h2>
        <p className="mt-1 text-sm text-neutral-400">
          <code className="mono rounded bg-neutral-800 px-1">GET /api/v1/me</code>
        </p>
        <Code>{`curl https://<host>/api/v1/me -H "Authorization: Bearer ek_live_xxx"
# → { "email": "...", "credits": 497, "totalChecks": 3, "memberSince": "..." }`}</Code>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Erros</h2>
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-neutral-400">
              <th className="py-2">HTTP</th>
              <th className="py-2">code</th>
              <th className="py-2">Quando</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {[
              ['401', 'missing_api_key / invalid_api_key', 'Chave ausente, inválida ou revogada'],
              ['400', 'invalid_body / invalid_json', 'Corpo malformado ou sem email/emails'],
              ['402', 'insufficient_credits', 'Créditos insuficientes para a requisição'],
              ['500', 'internal_error', 'Falha inesperada ao validar'],
            ].map((r) => (
              <tr key={r[1]}>
                <td className="mono py-2">{r[0]}</td>
                <td className="mono py-2 text-neutral-400">{r[1]}</td>
                <td className="py-2 text-neutral-400">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="mt-12 border-t py-6 text-center text-sm text-neutral-400" style={{ borderColor: 'var(--border)' }}>
        <Link href="/dashboard" className="text-brand">
          Voltar ao dashboard
        </Link>
      </footer>
    </main>
  );
}
