// Shim de next/navigation para o preview: hooks inertes (não há roteador no iframe).
const noop = () => {};

export function useRouter() {
  return { push: noop, replace: noop, back: noop, forward: noop, refresh: noop, prefetch: noop };
}
export function usePathname() {
  return '/';
}
export function useSearchParams() {
  return new URLSearchParams();
}
export function useParams() {
  return {} as Record<string, string>;
}
export function redirect() {}
export function notFound() {}
