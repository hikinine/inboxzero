import { ChecksTable } from '@/components/ChecksTable';

export const dynamic = 'force-dynamic';

export default function ChecksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Checagens</h1>
        <p className="text-sm text-neutral-400">Histórico auditável de todo e-mail validado na sua conta.</p>
      </div>
      <ChecksTable />
    </div>
  );
}
