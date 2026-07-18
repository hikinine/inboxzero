'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { looksLikeSvg, svgToDataUri } from '@/lib/svg';
import { createScreenAction, type NewScreenState } from './actions';

export default function NewScreenPage() {
  const [state, action] = useActionState<NewScreenState, FormData>(createScreenAction, {});
  const [svg, setSvg] = useState('');
  const valid = looksLikeSvg(svg);

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-200">
        <ArrowLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <h1 className="text-xl font-semibold">Nova tela</h1>

      <form action={action} className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Field label="Nome *">
            <input name="name" required className={inputCls} placeholder="Ex: Dashboard — visão geral" />
          </Field>

          <Field label="Descrição">
            <input name="description" className={inputCls} placeholder="Opcional" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Coleção">
              <input name="collection" className={inputCls} placeholder="Ex: Tasky" />
            </Field>
            <Field label="Status">
              <select name="status" defaultValue="PUBLISHED" className={inputCls}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </Field>
          </div>

          <Field label="Tags (separadas por vírgula)">
            <input name="tags" className={inputCls} placeholder="Ex: mobile, dark, onboarding" />
          </Field>

          <Field label="SVG *">
            <textarea
              name="svg"
              required
              value={svg}
              onChange={(e) => setSvg(e.target.value)}
              rows={12}
              className={`${inputCls} font-mono text-xs`}
              placeholder="<svg viewBox='0 0 …'>…</svg>"
            />
          </Field>

          {state.error && (
            <p className="rounded-md border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300">{state.error}</p>
          )}

          <SubmitButton />
        </div>

        <div className="space-y-2">
          <span className="text-sm text-neutral-400">Preview</span>
          <div className="checkerboard flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg border border-neutral-800 p-6">
            {valid ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={svgToDataUri(svg)} alt="preview" className="max-h-[60vh] max-w-full object-contain" />
            ) : (
              <span className="text-sm text-neutral-600">Cole um SVG válido para pré-visualizar</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  'w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-600';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-neutral-400">{label}</span>
      {children}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
    >
      {pending ? 'Salvando…' : 'Adicionar ao catálogo'}
    </button>
  );
}
