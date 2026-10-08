// Análise estática do código TSX de um item: compila com sucrase (mesmo compilador do sandbox),
// lista os imports e confere se todos são suportados no preview. Roda no servidor (MCP/API) e no
// cliente (formulário de novo item).
import { transform } from 'sucrase';
import { UI_MODULE_NAMES } from '@/sandbox/generated/ui-module-names';
import { LIB_MODULE_NAMES } from '@/sandbox/module-list';

export const SUPPORTED_MODULES: readonly string[] = [...LIB_MODULE_NAMES, ...UI_MODULE_NAMES];

export interface CodeCheck {
  ok: boolean;
  errors: string[];
  imports: string[];
  unsupported: string[];
  hasDefaultExport: boolean;
  compiled?: string;
}

// ESM → CJS (require) com JSX automático. `imports` é o que permite resolver módulos em runtime.
export function compileTsx(code: string, filePath = 'component.tsx'): string {
  return transform(code, {
    transforms: ['typescript', 'jsx', 'imports'],
    jsxRuntime: 'automatic',
    production: true,
    filePath,
    // Mantém `require` como chamada simples para o nosso resolvedor síncrono.
    preserveDynamicImport: false,
  }).code;
}

export function extractRequires(compiled: string): string[] {
  const out = new Set<string>();
  for (const m of compiled.matchAll(/require\(\s*(['"])(.+?)\1\s*\)/g)) out.add(m[2]!);
  return [...out];
}

export function checkCode(code: string, opts: { withCompiled?: boolean } = {}): CodeCheck {
  const errors: string[] = [];
  if (!code.trim()) return { ok: false, errors: ['Código vazio.'], imports: [], unsupported: [], hasDefaultExport: false };

  let compiled = '';
  try {
    compiled = compileTsx(code);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, errors: [`Erro de sintaxe: ${msg}`], imports: [], unsupported: [], hasDefaultExport: false };
  }

  const imports = extractRequires(compiled);
  const unsupported = imports.filter((s) => !SUPPORTED_MODULES.includes(s));
  if (unsupported.length) {
    errors.push(`Imports não suportados no preview: ${unsupported.join(', ')}. Use list_supported_modules para ver a lista.`);
  }

  // Sucrase emite `exports. default =` (com espaço, para preservar colunas) ou `exports.default =`.
  const hasDefaultExport = /exports\.\s*default\s*=/.test(compiled);
  if (!hasDefaultExport) errors.push('O arquivo precisa ter `export default` com o componente a renderizar.');

  if (/\bprocess\.env\b/.test(code)) errors.push('`process.env` não existe no preview — não use variáveis de ambiente.');

  return { ok: errors.length === 0, errors, imports, unsupported, hasDefaultExport, ...(opts.withCompiled ? { compiled } : {}) };
}

// Dependências derivadas dos imports (para o registry): pacotes npm e itens do registry shadcn.
const BASE_DEPS = new Set(['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'cn', 'class-variance-authority', 'lucide-react']);

export function deriveDeps(code: string): { dependencies: string[]; registryDependencies: string[] } {
  const specs = new Set<string>();
  for (const m of code.matchAll(/from\s+(['"])([^'"]+)\1/g)) specs.add(m[2]!);
  for (const m of code.matchAll(/import\s+(['"])([^'"]+)\1/g)) specs.add(m[2]!);

  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  for (const s of specs) {
    if (s.startsWith('@/components/ui/')) registryDependencies.add(s.slice('@/components/ui/'.length));
    else if (s === '@/lib/utils') registryDependencies.add('utils');
    else if (s === '@/hooks/use-mobile') registryDependencies.add('use-mobile');
    else if (s.startsWith('@/') || s.startsWith('next/') || s.startsWith('.')) continue;
    else {
      // pacote npm: "motion/react" → "motion"; "@base-ui/react/button" → "@base-ui/react"
      const pkg = s.startsWith('@') ? s.split('/').slice(0, 2).join('/') : s.split('/')[0]!;
      if (!BASE_DEPS.has(pkg)) dependencies.add(pkg);
    }
  }
  return { dependencies: [...dependencies].sort(), registryDependencies: [...registryDependencies].sort() };
}
