import { createHighlighter, type Highlighter } from 'shiki';
import { CopyButton } from './copy-button';

// Destaque de sintaxe no servidor (shiki, tema duplo claro/escuro via variáveis CSS — ver site.css).
const g = globalThis as unknown as { __shiki?: Promise<Highlighter> };
function highlighter() {
  g.__shiki ??= createHighlighter({ themes: ['github-light', 'github-dark'], langs: ['tsx', 'json', 'bash', 'ts'] });
  return g.__shiki;
}

export async function highlight(code: string, lang: 'tsx' | 'json' | 'bash' | 'ts' = 'tsx'): Promise<string> {
  const h = await highlighter();
  return h.codeToHtml(code, { lang, themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false });
}

export async function CodeBlock({
  code,
  lang = 'tsx',
  title,
  className = '',
  maxHeight,
}: {
  code: string;
  lang?: 'tsx' | 'json' | 'bash' | 'ts';
  title?: string;
  className?: string;
  maxHeight?: number | string;
}) {
  const html = await highlight(code, lang);
  return (
    <div className={`group/code relative overflow-hidden rounded-xl border bg-muted/30 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground">
          <span className="font-mono">{title}</span>
        </div>
      )}
      <div className="absolute right-2 top-2 z-10">
        <CopyButton value={code} iconOnly variant="ghost" className="opacity-60 group-hover/code:opacity-100" />
      </div>
      <div className="overflow-auto" style={{ maxHeight }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
