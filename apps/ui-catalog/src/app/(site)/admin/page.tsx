import type { Metadata } from 'next';
import { isAdmin } from '@/lib/admin';
import { Button } from '@/components/ui/button';
import { logoutAction } from './actions';
import { AdminLoginForm } from './login-form';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin', robots: { index: false } };

// /admin — entra com o token do catálogo (o mesmo do MCP) para publicar, editar e excluir itens.
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const admin = await isAdmin();
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      {admin ? (
        <>
          <p className="text-sm text-muted-foreground">Você está autenticado: pode publicar, editar e excluir itens.</p>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              Sair
            </Button>
          </form>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">Publicar, editar e excluir exigem o token do catálogo (o mesmo do MCP, UI_CATALOG_MCP_TOKEN).</p>
          <AdminLoginForm next={next ?? '/'} />
        </>
      )}
    </div>
  );
}
