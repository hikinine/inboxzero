'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { CopyButton } from './CopyButton';

const INSTALL = `/plugin marketplace add hikinine/inboxzero
/plugin install svg-catalog@clickmax`;

const MCP = `{
  "mcpServers": {
    "catalog": {
      "type": "http",
      "url": "https://hiki9.inboxzero.space/api/mcp",
      "headers": { "Authorization": "Bearer \${CATALOG_MCP_TOKEN}" }
    }
  }
}`;

// Painel de ajuda: como instalar as skills que criam/consomem estas telas.
export function SkillsHelp() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 transition hover:border-neutral-600 hover:text-white"
      >
        <Sparkles className="h-4 w-4 text-emerald-400" />
        Skills
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div ref={ref} className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-3">
              <h2 className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Skills do Claude Code
              </h2>
              <button onClick={() => setOpen(false)} className="text-neutral-500 hover:text-neutral-200">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 px-5 py-4 text-sm">
              <p className="text-neutral-400">
                Duas skills para trabalhar com este catálogo direto do Claude Code:{' '}
                <code className="rounded bg-neutral-800 px-1 text-emerald-300">svg-catalog-create</code> (criar
                ilustrações no padrão CX e publicar) e{' '}
                <code className="rounded bg-neutral-800 px-1 text-emerald-300">svg-catalog-use</code> (buscar e usar as
                que já existem).
              </p>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">1. Instalar</span>
                  <CopyButton value={INSTALL} />
                </div>
                <pre className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs leading-relaxed text-neutral-200">
                  {INSTALL}
                </pre>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Rode dentro do Claude Code, de qualquer projeto. Confira em <code>/plugin</code> → aba Installed.
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    2. Dar acesso ao catálogo (.mcp.json)
                  </span>
                  <CopyButton value={MCP} />
                </div>
                <pre className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs leading-relaxed text-neutral-200">
                  {MCP}
                </pre>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Exporte <code>CATALOG_MCP_TOKEN</code> (peça o token para o time) e{' '}
                  <strong className="text-neutral-400">reinicie o Claude Code</strong> — MCP só carrega no início da
                  sessão.
                </p>
              </div>

              <p className="border-t border-neutral-800 pt-4 text-xs text-neutral-500">
                Depois é só pedir naturalmente: <em>&ldquo;cria uns svgs de funil pro catálogo&rdquo;</em> ou{' '}
                <em>&ldquo;pega uma ilustração de dashboard da collection CX&rdquo;</em>. Para atualizar as skills:{' '}
                <code>/plugin marketplace update clickmax</code>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
