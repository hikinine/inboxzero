// Compila (sucrase) e avalia o TSX de um item dentro do iframe de preview, resolvendo imports
// pelo MODULE_LOADERS. O `require` é síncrono: todos os módulos são carregados antes de executar.
import type { ComponentType } from 'react';
import { compileTsx, extractRequires } from '@/lib/code';
import { MODULE_LOADERS } from './modules';

const cache = new Map<string, unknown>();

// Namespaces ESM do bundler já trazem __esModule; para o resto, monta um objeto compatível com os
// helpers de interop do sucrase (_interopRequireDefault / Wildcard).
function toCjs(ns: unknown): unknown {
  if (ns && typeof ns === 'object' && !('__esModule' in (ns as object))) {
    const o: Record<string, unknown> = { ...(ns as Record<string, unknown>) };
    if (!('default' in o)) o.default = o;
    Object.defineProperty(o, '__esModule', { value: true });
    return o;
  }
  return ns;
}

async function load(spec: string): Promise<void> {
  if (cache.has(spec)) return;
  const loader = MODULE_LOADERS[spec];
  if (!loader) throw new Error(`Módulo não suportado no preview: ${spec}`);
  cache.set(spec, toCjs(await loader()));
}

export interface Evaluated {
  Component: ComponentType;
  exportNames: string[];
}

export async function evaluate(code: string): Promise<Evaluated> {
  let compiled: string;
  try {
    compiled = compileTsx(code);
  } catch (e) {
    throw new Error(`Erro de sintaxe: ${e instanceof Error ? e.message : String(e)}`);
  }

  const specs = extractRequires(compiled);
  const missing = specs.filter((s) => !MODULE_LOADERS[s]);
  if (missing.length) throw new Error(`Módulo não suportado no preview: ${missing.join(', ')}`);
  await Promise.all(specs.map(load));

  const mod = { exports: {} as Record<string, unknown> };
  const fn = new Function('require', 'module', 'exports', compiled) as (
    r: (s: string) => unknown,
    m: typeof mod,
    e: typeof mod.exports,
  ) => void;
  fn((s) => cache.get(s), mod, mod.exports);

  const exp = mod.exports;
  const candidate = exp.default ?? Object.values(exp).find((v) => typeof v === 'function');
  if (typeof candidate !== 'function' && !(candidate && typeof candidate === 'object')) {
    throw new Error('Nenhum componente exportado — use `export default function …`.');
  }
  return { Component: candidate as ComponentType, exportNames: Object.keys(exp) };
}
