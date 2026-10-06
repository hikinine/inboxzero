'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isRegister ? { email, password, name } : { email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message ?? 'Erro ao autenticar.');
        return;
      }
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Falha de rede.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <Link href="/" className="mb-6 flex items-center justify-center gap-2 font-bold">
        <BrandMark size={20} /> MX Check
      </Link>
      <div className="card p-6">
        <h1 className="text-xl font-bold">{isRegister ? 'Criar conta' : 'Entrar'}</h1>
        <p className="mt-1 text-sm text-neutral-400">
          {isRegister ? 'Ganhe créditos de teste ao se cadastrar.' : 'Acesse seu dashboard e suas API keys.'}
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          {isRegister && (
            <div>
              <label className="label">Nome (opcional)</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
            </div>
          )}
          <div>
            <label className="label">E-mail</label>
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@empresa.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label">Senha</label>
            <input
              className="input"
              type="password"
              required
              minLength={isRegister ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? 'mínimo 8 caracteres' : '••••••••'}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

          <button className="btn-primary w-full py-2.5" disabled={loading}>
            {loading ? 'Aguarde…' : isRegister ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-400">
          {isRegister ? (
            <>
              Já tem conta?{' '}
              <Link href="/login" className="font-semibold text-brand">
                Entrar
              </Link>
            </>
          ) : (
            <>
              Não tem conta?{' '}
              <Link href="/register" className="font-semibold text-brand">
                Criar conta
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
