'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';

export function DeleteScreenButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm(`Deletar "${name}"?\nEssa ação é irreversível.`)) return;
    setBusy(true);
    const res = await fetch(`/api/screens/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setBusy(false);
      alert('Falha ao deletar.');
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-900/60 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-950 disabled:opacity-50"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      Deletar
    </button>
  );
}
