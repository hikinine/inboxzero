import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BrandMark } from '@/components/BrandMark';
import { DashboardNav } from '@/components/DashboardNav';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-6">
      <aside className="hidden w-56 shrink-0 flex-col sm:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2 font-bold">
          <BrandMark size={18} /> MX Check
        </Link>
        <DashboardNav />
        <div className="mt-auto rounded-lg border p-3 text-sm" style={{ borderColor: 'var(--border)' }}>
          <div className="text-xs text-neutral-400">Créditos</div>
          <div className="text-2xl font-bold text-brand">{user.credits.toLocaleString('pt-BR')}</div>
          <div className="mt-1 truncate text-xs text-neutral-400">{user.email}</div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
