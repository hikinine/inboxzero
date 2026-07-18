'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FlaskConical, Play } from 'lucide-react';
import { ResultBadge } from './ResultBadge';

type Outcome = {
  email: string;
  isValid: boolean;
  isDisposable: boolean;
  domain: string | null;
  confidence: number;
  reason: string | null;
};
type Summary = { total: number; valid: number; invalid: number; disposable: number; creditsCharged: number; creditsRemaining: number };

export function Playground() {
  const router = useRouter();
  const [text, setText] = useState('contato@gmail.com\nteste@mailinator.com\nsem-arroba\nfulano@dominio-que-nao-existe-123.com');
  const [mx, setMx] = useState(true);
  const [smtp, setSmtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Outcome[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    const emails = text
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (emails.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emails.length === 1 ? { email: emails[0], mx, smtp } : { emails, mx, smtp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message ?? 'Erro ao validar.');
        return;
      }
      // A rota /api/playground sempre devolve { results, summary }.
      setResults(data.results);
      setSummary(data.summary);
      router.refresh(); // atualiza o saldo de créditos no layout
    } catch {
      setError('Falha de rede.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card p-5">
      <div className="flex items-center gap-2">
        <FlaskConical size={18} className="text-brand" />
        <h2 className="font-semibold">Playground</h2>
        <span className="ml-auto text-xs text-neutral-400">1 crédito por e-mail</span>
      </div>

      <textarea
        className="input mono mt-4 h-28 resize-y"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Um e-mail por linha (ou separados por vírgula)"
      />

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input type="checkbox" checked={mx} onChange={(e) => setMx(e.target.checked)} />
            Checar domínio (MX) — recomendado
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input type="checkbox" checked={smtp} onChange={(e) => setSmtp(e.target.checked)} />
            Verificar caixa (SMTP) — pega e-mail inexistente, mas é mais lento
          </label>
        </div>
        <button className="btn-primary shrink-0" onClick={run} disabled={loading}>
          <Play size={16} /> {loading ? 'Validando…' : 'Validar'}
        </button>
      </div>

      {error && <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

      {summary && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="badge bg-neutral-800 text-neutral-300">total {summary.total}</span>
          <span className="badge bg-emerald-500/10 text-emerald-400">válidos {summary.valid - summary.disposable}</span>
          <span className="badge bg-amber-500/10 text-amber-400">descartáveis {summary.disposable}</span>
          <span className="badge bg-red-500/10 text-red-400">inválidos {summary.invalid}</span>
          <span className="badge bg-white/5 text-brand">−{summary.creditsCharged} créditos</span>
        </div>
      )}

      {results && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-neutral-400">
                <th className="py-2">E-mail</th>
                <th className="py-2">Domínio</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {results.map((r, i) => (
                <tr key={i}>
                  <td className="mono py-2">{r.email || <span className="text-neutral-500">(vazio)</span>}</td>
                  <td className="mono py-2 text-neutral-400">{r.domain ?? '—'}</td>
                  <td className="py-2">
                    <ResultBadge isValid={r.isValid} isDisposable={r.isDisposable} reason={r.reason} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
