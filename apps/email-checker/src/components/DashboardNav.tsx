'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ClipboardList, KeyRound, LayoutDashboard, LogOut, ScrollText } from 'lucide-react';

const LINKS = [
  { href: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/dashboard/checks', label: 'Checagens', icon: ClipboardList },
  { href: '/dashboard/audit', label: 'Auditoria', icon: ScrollText },
  { href: '/docs', label: 'Documentação', icon: KeyRound },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              active ? 'bg-white/5 text-brand' : 'text-neutral-400 hover:bg-neutral-800'
            }`}
          >
            <l.icon size={16} />
            {l.label}
          </Link>
        );
      })}
      <button onClick={logout} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-neutral-800">
        <LogOut size={16} />
        Sair
      </button>
    </nav>
  );
}
