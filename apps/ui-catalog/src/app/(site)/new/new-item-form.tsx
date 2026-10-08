'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import type { ItemKind } from '@prisma/client';
import { KINDS } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useSiteTheme } from '@/components/site/use-site-theme';
import { createItemAction, type NewItemState } from './actions';

const SOURCE = 'ui-catalog';

const STARTER = `import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function HeroSimples() {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Novo</Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Seu título aqui
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Uma frase curta explicando o valor do produto.
        </p>
        <div className="flex gap-3">
          <Button>Começar <ArrowRight data-icon="inline-end" /></Button>
          <Button variant="outline">Saiba mais</Button>
        </div>
      </div>
    </section>
  )
}
`;

interface Check {
  ok: boolean;
  errors: string[];
  imports: string[];
  unsupported: string[];
  derived?: { dependencies: string[]; registryDependencies: string[] };
}

export function NewItemForm({ categories, collections }: { categories: Array<{ kind: ItemKind; slug: string; name: string }>; collections: Array<{ slug: string; name: string }> }) {
  const [state, action] = useActionState<NewItemState, FormData>(createItemAction, {});
  const [kind, setKind] = useState<ItemKind>('BLOCK');
  const [code, setCode] = useState(STARTER);
  const [check, setCheck] = useState<Check | null>(null);
  const [checking, setChecking] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const theme = useSiteTheme();
  const fit = kind === 'BLOCK' || kind === 'PAGE' ? 'full' : 'center';

  const sendCode = (c: string) => iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'code', code: c }, '*');

  // Envia o código ao preview (debounce) e valida na API.
  useEffect(() => {
    const t = setTimeout(async () => {
      sendCode(code);
      setChecking(true);
      try {
        const res = await fetch('/api/check', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code }) });
        setCheck((await res.json()) as Check);
      } finally {
        setChecking(false);
      }
    }, 450);
    return () => clearTimeout(t);
  }, [code]);

  // Quando o iframe (re)carrega, reenvia o código atual.
  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (e.data?.source === SOURCE && e.data?.type === 'ready' && e.source === iframeRef.current?.contentWindow) sendCode(code);
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, [code]);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'theme', theme }, '*');
  }, [theme]);

  const kindCategories = categories.filter((c) => c.kind === kind);

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
      <div className="space-y-4">
        <Field label="Nome *" htmlFor="name">
          <Input id="name" name="name" required placeholder="Ex: Hero centralizado com badge" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo" htmlFor="kind">
            <NativeSelect id="kind" name="kind" value={kind} onChange={(e) => setKind(e.target.value as ItemKind)}>
              {KINDS.map((k) => (
                <NativeSelectOption key={k.kind} value={k.kind}>
                  {k.singular}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Status" htmlFor="status">
            <NativeSelect id="status" name="status" defaultValue="PUBLISHED">
              <NativeSelectOption value="PUBLISHED">Publicado</NativeSelectOption>
              <NativeSelectOption value="DRAFT">Rascunho</NativeSelectOption>
              <NativeSelectOption value="ARCHIVED">Arquivado</NativeSelectOption>
            </NativeSelect>
          </Field>
        </div>

        <Field label="Categoria" htmlFor="category" hint="Vira seção/aba. Criada se não existir.">
          <Input id="category" name="category" list="categories" placeholder={kind === 'ILLUSTRATION' ? 'Ex: Beam, Orbit, Marquee' : 'Ex: Hero, Pricing, FAQ'} />
          <datalist id="categories">
            {kindCategories.map((c) => (
              <option key={c.slug} value={c.name} />
            ))}
          </datalist>
        </Field>

        <Field label="Descrição" htmlFor="description">
          <Input id="description" name="description" placeholder="Uma frase sobre o item" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Coleção" htmlFor="collection">
            <Input id="collection" name="collection" list="collections" placeholder="Opcional" />
            <datalist id="collections">
              {collections.map((c) => (
                <option key={c.slug} value={c.name} />
              ))}
            </datalist>
          </Field>
          <Field label="Tags" htmlFor="tags" hint="separadas por vírgula">
            <Input id="tags" name="tags" placeholder="saas, dark, animado" />
          </Field>
        </div>

        <Label className="flex items-center gap-2">
          <Checkbox name="featured" /> Destacar na home
        </Label>

        <div className="rounded-lg border p-3 text-xs">
          <div className="mb-1.5 flex items-center gap-2 font-medium">
            {checking ? <Loader2 className="size-3.5 animate-spin" /> : check?.ok ? <CheckCircle2 className="size-3.5 text-emerald-500" /> : <AlertTriangle className="size-3.5 text-amber-500" />}
            Validação
          </div>
          {check?.errors.map((e) => (
            <p key={e} className="text-destructive">
              {e}
            </p>
          ))}
          {check && check.ok && (
            <div className="flex flex-wrap gap-1">
              {check.derived?.registryDependencies.map((d) => (
                <Badge key={d} variant="outline">
                  {d}
                </Badge>
              ))}
              {check.derived?.dependencies.map((d) => (
                <Badge key={d} variant="secondary" className="font-mono">
                  {d}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {state.error && <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive whitespace-pre-wrap">{state.error}</p>}

        <SubmitButton disabled={!check?.ok} />
      </div>

      <div className="space-y-3">
        <Field label="Código TSX *" htmlFor="code" hint="um arquivo, export default, imports de @/components/ui/*">
          <Textarea id="code" name="code" value={code} onChange={(e) => setCode(e.target.value)} rows={18} spellCheck={false} className="font-mono text-xs leading-relaxed" />
        </Field>
        <div>
          <span className="text-sm text-muted-foreground">Preview ao vivo</span>
          <div className="mt-1.5 overflow-hidden rounded-xl border bg-muted/30 p-3">
            <iframe
              ref={iframeRef}
              src={`/preview/live?fit=${fit}&theme=${theme}`}
              title="Preview ao vivo"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              className="block h-[520px] w-full rounded-lg border-0 bg-background"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label} {hint && <span className="font-normal text-muted-foreground">· {hint}</span>}
      </Label>
      {children}
    </div>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : null}
      {pending ? 'Salvando…' : 'Adicionar ao catálogo'}
    </Button>
  );
}
