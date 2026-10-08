// Módulos (além de @/components/ui/*) que o preview sabe resolver. Mantido como lista pura
// (sem imports dinâmicos) para poder ser usado no servidor (MCP check_code) e no cliente.
export const LIB_MODULE_NAMES: readonly string[] = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'lucide-react',
  'motion',
  'motion/react',
  'framer-motion',
  'recharts',
  'class-variance-authority',
  'cn',
  'cmdk',
  'date-fns',
  'react-day-picker',
  'embla-carousel-react',
  'input-otp',
  'react-resizable-panels',
  '@base-ui/react',
  '@base-ui/react/button',
  '@base-ui/react/dialog',
  '@base-ui/react/menu',
  '@base-ui/react/merge-props',
  '@base-ui/react/use-render',
  '@/lib/utils',
  '@/hooks/use-mobile',
  'next/link',
  'next/image',
  'next/navigation',
];

// Convenções de autoria — expostas no MCP (list_supported_modules) e na página /docs.
export const AUTHORING_RULES: readonly string[] = [
  'Um único arquivo .tsx auto-contido com `export default function NomeDoItem()` sem props obrigatórias.',
  'Importe primitivos de `@/components/ui/<nome>` (lista em list_supported_modules), ícones de `lucide-react`, animação de `motion/react`, gráficos de `recharts`.',
  'Estilize só com classes Tailwind v4 e tokens do shadcn (bg-background, text-muted-foreground, border-border, bg-primary…). Nada de cores hex hardcoded — o item precisa funcionar em claro e escuro.',
  'Sem `process.env`, sem fetch a APIs externas, sem imagens remotas que possam sumir (prefira SVG inline, gradientes ou placeholders).',
  'Blocos (BLOCK) ocupam a largura toda (`w-full`) com padding próprio (`py-16 px-6`); componentes e ilustrações têm tamanho natural e são centralizados pelo preview.',
  'Ilustrações: SVG inline + motion (`motion.path`, `animate`, `transition.repeat: Infinity`) e `currentColor`/tokens para herdar o tema.',
  'Dados de exemplo em pt-BR, realistas e curtos. Sem lorem ipsum.',
];
