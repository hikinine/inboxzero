'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get('next');
      window.location.href = next?.startsWith('/') ? next : '/';
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error ?? 'Não deu para entrar.');
    setBusy(false);
  }

  return (
    <main className="login">
      <form className="login-card" onSubmit={submit}>
        <div className="brand">
          <img className="brand-mark" src="/icon.svg" alt="" />
          <span>Arquitetura</span>
        </div>
        <p className="muted">Maquetes 3D da sua casa a partir da planta, das fotos e das medidas.</p>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className="error">{error}</p>}
        <button className="btn primary" type="submit" disabled={busy || !password}>
          {busy ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
