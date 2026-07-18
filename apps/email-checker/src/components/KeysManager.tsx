'use client';

import { useEffect, useState } from 'react';
import { KeyRound, Plus, Trash2, TriangleAlert } from 'lucide-react';
import { CopyButton } from './CopyButton';

type Key = {
  id: string;
  name: string;
  prefix: string;
  last4: string;
  revokedAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
};

export function KeysManager() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [secret, setSecret] = useState<{ name: string; value: string } | null>(null);

  async function load() {
    const res = await fetch('/api/keys');
    if (res.ok) setKeys((await res.json()).keys);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setSecret({ name: data.key.name, value: data.key.secret });
        setName('');
        load();
      }
    } finally {
      setCreating(false);
    }
  }

  async function revoke(id: string) {
    if (!confirm('Revogar esta chave? Aplicações que a usam vão parar de funcionar.')) return;
    await fetch(`/api/keys/${id}/revoke`, { method: 'POST' });
    load();
  }

  return (
    <section className="card p-5">
      <div className="flex items-center gap-2">
        <KeyRound size={18} className="text-brand" />
        <h2 className="font-semibold">API keys</h2>
      </div>

      <form onSubmit={create} className="mt-4 flex gap-2">
        <input className="input" placeholder="Nome da chave (ex.: Produção)" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn-primary shrink-0" disabled={creating}>
          <Plus size={16} /> Criar
        </button>
      </form>

      {secret && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
            <TriangleAlert size={16} /> Copie agora — a chave não será exibida de novo.
          </div>
          <div className="mt-2 flex items-center gap-2">
            <code className="mono flex-1 overflow-x-auto rounded bg-neutral-800 px-3 py-2 text-sm">{secret.value}</code>
            <CopyButton value={secret.value} />
          </div>
        </div>
      )}

      <div className="mt-4 divide-y" style={{ borderColor: 'var(--border)' }}>
        {loading ? (
          <p className="py-6 text-center text-sm text-neutral-400">Carregando…</p>
        ) : keys.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-400">Nenhuma chave ainda.</p>
        ) : (
          keys.map((k) => (
            <div key={k.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{k.name}</span>
                  {k.revokedAt ? (
                    <span className="badge bg-red-500/10 text-red-400">revogada</span>
                  ) : (
                    <span className="badge bg-emerald-500/10 text-emerald-400">ativa</span>
                  )}
                </div>
                <div className="mono mt-0.5 text-xs text-neutral-400">
                  {k.prefix}…{k.last4} · criada {new Date(k.createdAt).toLocaleDateString('pt-BR')}
                  {k.lastUsedAt ? ` · último uso ${new Date(k.lastUsedAt).toLocaleDateString('pt-BR')}` : ' · nunca usada'}
                </div>
              </div>
              {!k.revokedAt && (
                <button onClick={() => revoke(k.id)} className="btn-ghost px-2 py-1 text-xs text-red-400">
                  <Trash2 size={14} /> Revogar
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
