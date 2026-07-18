import { AuditTable } from '@/components/AuditTable';

export const dynamic = 'force-dynamic';

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Auditoria</h1>
        <p className="text-sm text-neutral-400">Eventos da conta: logins, chaves e checagens.</p>
      </div>
      <AuditTable />
    </div>
  );
}
