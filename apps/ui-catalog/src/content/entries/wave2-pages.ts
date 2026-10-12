// Entradas de conteúdo (fragmento "wave2-pages" — segunda onda).
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  { file: 'pages/landing/landing-de-produto-de-ia.tsx', name: 'Landing de produto de IA', kind: 'PAGE', category: 'Landing', description: 'Hero com feixes, chat de IA, bento, pricing, FAQ e footer.', tags: ['landing', 'ia', 'saas'], featured: true, previewHeight: 900 },
  { file: 'pages/landing/landing-de-agencia.tsx', name: 'Landing de agência', kind: 'PAGE', category: 'Landing', description: 'Hero tipográfico, serviços, portfólio, processo e contato.', tags: ['landing', 'agencia'], previewHeight: 900 },
  { file: 'pages/landing/landing-de-ecommerce.tsx', name: 'Landing de e-commerce', kind: 'PAGE', category: 'Landing', description: 'Banner, categorias, produtos em destaque, ofertas e newsletter.', tags: ['landing', 'ecommerce'], featured: true, previewHeight: 900 },
  { file: 'pages/features/pagina-de-features-em-abas.tsx', name: 'Página de features em abas', kind: 'PAGE', category: 'Features', description: 'Abas trocam seções de recursos com mockups.', tags: ['features', 'tabs'], previewHeight: 900 },
  { file: 'pages/pricing/pagina-de-pricing-simples.tsx', name: 'Página de pricing simples', kind: 'PAGE', category: 'Pricing', description: 'Dois planos, tabela de recursos e depoimentos.', tags: ['pricing', 'planos'], previewHeight: 900 },
];
