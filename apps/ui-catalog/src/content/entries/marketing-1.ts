// Entradas de conteúdo (fragmento "marketing-1"). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Hero ──
  { file: 'blocks/hero/hero-com-video-em-destaque.tsx', name: 'Hero com vídeo em destaque', kind: 'BLOCK', category: 'Hero', description: 'Título centralizado, dois CTAs e um player mockup com moldura de browser, cards flutuantes e botão de play.', tags: ['hero', 'video', 'mockup', 'saas'] },
  { file: 'blocks/hero/hero-com-captura-de-e-mail.tsx', name: 'Hero com captura de e-mail', kind: 'BLOCK', category: 'Hero', description: 'Split com texto, formulário de e-mail com estado de sucesso e avatares; à direita uma grade de mini-cards de métricas.', tags: ['hero', 'email', 'captura', 'formulario'] },
  { file: 'blocks/hero/hero-com-gradiente-de-fundo.tsx', name: 'Hero com gradiente de fundo', kind: 'BLOCK', category: 'Hero', description: 'Blobs de gradiente desfocados ao fundo, badge "Novo" em gradiente, título enorme com palavra em degradê e dois CTAs.', tags: ['hero', 'gradiente', 'saas', 'landing'], featured: true },
  { file: 'blocks/hero/hero-com-logos-de-clientes.tsx', name: 'Hero com logos de clientes', kind: 'BLOCK', category: 'Hero', description: 'Hero centralizado com faixa de seis logos textuais de clientes abaixo do CTA.', tags: ['hero', 'logos', 'prova-social'] },
  { file: 'blocks/hero/hero-com-mockup-mobile.tsx', name: 'Hero com mockup mobile', kind: 'BLOCK', category: 'Hero', description: 'Texto à esquerda e moldura de celular à direita com UI de app financeiro feita em divs, mais card flutuante de Pix.', tags: ['hero', 'mobile', 'mockup', 'app'] },
  { file: 'blocks/hero/hero-com-texto-rotativo.tsx', name: 'Hero com texto rotativo', kind: 'BLOCK', category: 'Hero', description: 'Headline alinhada à esquerda com palavra que troca (AnimatePresence), CTA e três estatísticas em faixa.', tags: ['hero', 'animado', 'motion', 'stats'] },
  { file: 'blocks/hero/hero-com-painel-de-dashboard.tsx', name: 'Hero com painel de dashboard', kind: 'BLOCK', category: 'Hero', description: 'Hero centralizado e, abaixo, mockup de dashboard com sidebar, KPIs e gráfico em leve perspectiva com fade.', tags: ['hero', 'dashboard', 'mockup', 'perspectiva'] },

  // ── Features ──
  { file: 'blocks/features/features-em-grade-com-icones.tsx', name: 'Features em grade com ícones', kind: 'BLOCK', category: 'Features', description: 'Grade 2x3 de recursos com ícone lucide em caixa, título, texto e link "Saiba mais".', tags: ['features', 'grade', 'icones'] },
  { file: 'blocks/features/features-alternadas-com-mockups.tsx', name: 'Features alternadas com mockups', kind: 'BLOCK', category: 'Features', description: 'Três linhas em zigue-zague de texto e mockup: inbox, fluxo de automação e relatório por origem.', tags: ['features', 'zigzag', 'mockup'] },
  { file: 'blocks/features/features-com-abas.tsx', name: 'Features com abas', kind: 'BLOCK', category: 'Features', description: 'Tabs trocam descrição e mockup: chat do inbox, kanban do CRM, automações com switches e relatório com sparkline.', tags: ['features', 'tabs', 'mockup', 'interativo'], featured: true },
  { file: 'blocks/features/features-em-cards-numerados.tsx', name: 'Features em cards numerados', kind: 'BLOCK', category: 'Features', description: 'Quatro cards com número grande em destaque, título, texto e link, com cabeçalho e CTA lado a lado.', tags: ['features', 'cards', 'numerados', 'etapas'] },
  { file: 'blocks/features/features-em-lista-com-checks.tsx', name: 'Features em lista com checks', kind: 'BLOCK', category: 'Features', description: 'Título e lista de checks em duas colunas à esquerda; à direita card de metas com barras de progresso.', tags: ['features', 'checks', 'lista', 'card'] },

  // ── Pricing ──
  { file: 'blocks/pricing/pricing-com-dois-planos.tsx', name: 'Pricing com dois planos', kind: 'BLOCK', category: 'Pricing', description: 'Dois planos lado a lado, o recomendado em card sólido na cor primária com "Tudo do Essencial, mais".', tags: ['pricing', 'planos', 'dois'] },
  { file: 'blocks/pricing/pricing-com-slider-de-uso.tsx', name: 'Pricing com slider de uso', kind: 'BLOCK', category: 'Pricing', description: 'Slider de contatos ativos recalcula o preço mensal e anual em tempo real; lista do que está incluído.', tags: ['pricing', 'slider', 'uso', 'interativo'] , featured: true },
  { file: 'blocks/pricing/pricing-com-plano-mais-popular-e-faq.tsx', name: 'Pricing com plano mais popular e FAQ', kind: 'BLOCK', category: 'Pricing', description: 'Três planos com o do meio elevado e marcado como mais popular, mais um mini FAQ em acordeão embaixo.', tags: ['pricing', 'planos', 'faq', 'accordion'] , featured: true },
  { file: 'blocks/pricing/pricing-unico-vitalicio.tsx', name: 'Pricing único vitalício', kind: 'BLOCK', category: 'Pricing', description: 'Um card grande com preço riscado, pagamento único, garantia de 30 dias e lista de benefícios.', tags: ['pricing', 'vitalicio', 'licenca'] },
  { file: 'blocks/pricing/pricing-em-tabela-compacta.tsx', name: 'Pricing em tabela compacta', kind: 'BLOCK', category: 'Pricing', description: 'Quatro planos em linha num container dividido, com toggle segmentado mensal/anual e plano popular destacado.', tags: ['pricing', 'tabela', 'compacto', 'toggle'] },

  // ── Depoimentos ──
  { file: 'blocks/depoimentos/depoimentos-em-carrossel.tsx', name: 'Depoimentos em carrossel', kind: 'BLOCK', category: 'Depoimentos', description: 'Carrossel embla com três cards por tela, setas no cabeçalho, contador e indicadores clicáveis.', tags: ['depoimentos', 'carousel', 'interativo'] },
  { file: 'blocks/depoimentos/depoimentos-com-estrelas.tsx', name: 'Depoimentos com estrelas', kind: 'BLOCK', category: 'Depoimentos', description: 'Três cards com nota em estrelas, citação, autor com avatar e logo textual da empresa.', tags: ['depoimentos', 'estrelas', 'rating'] },
  { file: 'blocks/depoimentos/depoimentos-em-mural.tsx', name: 'Depoimentos em mural', kind: 'BLOCK', category: 'Depoimentos', description: 'Masonry de posts estilo rede social com avatar, nome, @handle, selo de verificado, texto, data e curtidas.', tags: ['depoimentos', 'mural', 'social', 'masonry'], featured: true },

  // ── Prova social ──
  { file: 'blocks/prova-social/prova-social-com-avaliacoes.tsx', name: 'Prova social com avaliações', kind: 'BLOCK', category: 'Prova social', description: 'Três cards estilo G2/Capterra com nota grande, estrelas, número de avaliações e selo.', tags: ['prova-social', 'avaliacoes', 'reviews'] },
  { file: 'blocks/prova-social/prova-social-com-numeros-e-avatares.tsx', name: 'Prova social com números e avatares', kind: 'BLOCK', category: 'Prova social', description: 'Faixa compacta com grupo de avatares, nota 4,9/5, número de equipes, volume vendido e logos textuais.', tags: ['prova-social', 'numeros', 'avatares', 'faixa'] },

  // ── CTA ──
  { file: 'blocks/cta/cta-com-gradiente-e-dois-botoes.tsx', name: 'CTA com gradiente e dois botões', kind: 'BLOCK', category: 'CTA', description: 'Painel arredondado em gradiente violeta com brilhos desfocados, título grande e dois botões.', tags: ['cta', 'gradiente', 'botoes'] },
  { file: 'blocks/cta/cta-em-card-com-mockup.tsx', name: 'CTA em card com mockup', kind: 'BLOCK', category: 'CTA', description: 'Card dividido: texto, CTAs e bullets à esquerda; mini mockup de formulário de cobrança cortado na base à direita.', tags: ['cta', 'card', 'mockup'] },
  { file: 'blocks/cta/cta-de-newsletter-em-card.tsx', name: 'CTA de newsletter em card', kind: 'BLOCK', category: 'CTA', description: 'Card centralizado com ícone, campo de e-mail com botão embutido, nota de privacidade e avatares de leitores.', tags: ['cta', 'newsletter', 'email', 'formulario'] },
];
