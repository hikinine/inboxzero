import { CheckCircle2, Coins, Mail, Trash2 } from 'lucide-react';
import { KeysManager } from '@/components/KeysManager';
import { Playground } from '@/components/Playground';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getStats(userId: string) {
  const [credits, total, disposable, deliverable] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { credits: true } }),
    prisma.emailCheck.count({ where: { userId } }),
    prisma.emailCheck.count({ where: { userId, isDisposable: true } }),
    prisma.emailCheck.count({ where: { userId, isValid: true, isDisposable: false } }),
  ]);
  return { credits: credits?.credits ?? 0, total, disposable, deliverable };
}

export default async function DashboardOverview() {
  const user = (await getSessionUser())!;
  const stats = await getStats(user.id);

  const cards = [
    { icon: Coins, label: 'Créditos', value: stats.credits, color: 'text-brand' },
    { icon: Mail, label: 'Checagens', value: stats.total, color: 'text-neutral-300' },
    { icon: CheckCircle2, label: 'Válidos', value: stats.deliverable, color: 'text-emerald-400' },
    { icon: Trash2, label: 'Descartáveis', value: stats.disposable, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Olá{user.name ? `, ${user.name}` : ''} 👋</h1>
        <p className="text-sm text-neutral-400">Gerencie suas chaves, teste a validação e acompanhe o consumo.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-4">
            <c.icon size={18} className={c.color} />
            <div className="mt-2 text-2xl font-bold">{c.value.toLocaleString('pt-BR')}</div>
            <div className="text-xs text-neutral-400">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <KeysManager />
        <Playground />
      </div>
    </div>
  );
}
