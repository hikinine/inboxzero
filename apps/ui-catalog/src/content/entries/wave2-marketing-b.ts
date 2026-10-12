// Entradas de conteúdo (fragmento "wave2-marketing-b" — segunda onda). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Hero ──
  { file: 'blocks/hero/hero-com-beam-de-integracoes.tsx', name: 'Hero com beam de integrações', kind: 'BLOCK', category: 'Hero', description: 'Título central e, abaixo, seis logos textuais ligados por feixes de luz animados a um núcleo pulsante (SVG + motion).', tags: ['hero', 'beam', 'integracoes', 'motion'], featured: true },
  { file: 'blocks/hero/hero-com-pill-de-novidade-e-screenshot.tsx', name: 'Hero com pill de novidade e screenshot', kind: 'BLOCK', category: 'Hero', description: 'Pill "Novo · Versão 2.0", título com trecho em gradiente e screenshot de app (tabela de pedidos) com borda, brilho e corte na base.', tags: ['hero', 'pill', 'screenshot', 'gradiente'] },
  { file: 'blocks/hero/hero-com-busca-de-marketplace.tsx', name: 'Hero com busca de marketplace', kind: 'BLOCK', category: 'Hero', description: 'Barra de busca grande com serviço e cidade, chips de buscas populares que preenchem o campo e quatro cards de categoria.', tags: ['hero', 'busca', 'marketplace', 'interativo'] },
  { file: 'blocks/hero/hero-com-grid-de-stats-e-video.tsx', name: 'Hero com grid de stats e vídeo', kind: 'BLOCK', category: 'Hero', description: 'Texto e grade 2x2 de estatísticas à esquerda; player escuro com legenda, capítulos e botão de play pulsante à direita.', tags: ['hero', 'stats', 'video', 'player'] },
  { file: 'blocks/hero/hero-para-app-com-avaliacao-das-lojas.tsx', name: 'Hero para app com avaliação das lojas', kind: 'BLOCK', category: 'Hero', description: 'Nota 4,9 com estrelas, selos App Store e Google Play e dois celulares inclinados cortados na base da seção.', tags: ['hero', 'app', 'mobile', 'lojas'] },

  // ── Features ──
  { file: 'blocks/features/features-com-orbit.tsx', name: 'Features com orbit', kind: 'BLOCK', category: 'Features', description: 'Lista de três recursos à esquerda e, à direita, ícones de integrações orbitando um núcleo em dois anéis com velocidades opostas.', tags: ['features', 'orbit', 'integracoes', 'motion'], featured: true },
  { file: 'blocks/features/features-em-accordion-com-mockup.tsx', name: 'Features em accordion com mockup', kind: 'BLOCK', category: 'Features', description: 'Accordion controlado de quatro recursos de loja virtual; abrir um item troca o mockup ao lado com transição.', tags: ['features', 'accordion', 'mockup', 'interativo'] },
  { file: 'blocks/features/features-em-grade-com-icones-coloridos.tsx', name: 'Features em grade com ícones coloridos', kind: 'BLOCK', category: 'Features', description: 'Oito recursos em quatro colunas com divisórias finas e ícones em caixas de cores semânticas distintas.', tags: ['features', 'grade', 'icones', 'cores'] },
  { file: 'blocks/features/features-com-comparativo-de-antes-e-depois.tsx', name: 'Features com comparativo de antes e depois', kind: 'BLOCK', category: 'Features', description: 'Toggle animado alterna o mockup entre planilha cheia de erros e painel conciliado; métricas ao lado destacam o lado ativo.', tags: ['features', 'antes-depois', 'toggle', 'mockup'] },

  // ── Pricing ──
  { file: 'blocks/pricing/pricing-com-calculadora-de-volume.tsx', name: 'Pricing com calculadora de volume', kind: 'BLOCK', category: 'Pricing', description: 'Campo numérico de mensagens por mês com presets; tabela de faixas progressivas preenchidas em tempo real e resumo do total.', tags: ['pricing', 'calculadora', 'volume', 'interativo'] },
  { file: 'blocks/pricing/pricing-para-equipes-por-assento.tsx', name: 'Pricing para equipes por assento', kind: 'BLOCK', category: 'Pricing', description: 'Stepper de assentos com avatares que aparecem, switch de cobrança anual e dois planos com total calculado por pessoa.', tags: ['pricing', 'assentos', 'stepper', 'equipes'] },
  { file: 'blocks/pricing/pricing-com-recursos-em-accordion.tsx', name: 'Pricing com recursos em accordion', kind: 'BLOCK', category: 'Pricing', description: 'Três planos empilhados em accordion; cada um expande recursos agrupados por área com o que entra e o que fica de fora.', tags: ['pricing', 'accordion', 'recursos', 'lista'] },

  // ── Depoimentos ──
  { file: 'blocks/depoimentos/depoimentos-em-marquee.tsx', name: 'Depoimentos em marquee', kind: 'BLOCK', category: 'Depoimentos', description: 'Duas faixas de cards rolando em sentidos opostos com fade nas bordas, estrelas, citação e autor com avatar.', tags: ['depoimentos', 'marquee', 'motion', 'faixa'], featured: true },
  { file: 'blocks/depoimentos/depoimento-com-video-mockup.tsx', name: 'Depoimento com vídeo mockup', kind: 'BLOCK', category: 'Depoimentos', description: 'Player escuro com silhueta, play pulsante e barra de progresso ao lado de uma citação grande com autor e três resultados.', tags: ['depoimentos', 'video', 'case', 'mockup'] },
  { file: 'blocks/depoimentos/depoimentos-com-logos-de-empresas.tsx', name: 'Depoimentos com logos de empresas', kind: 'BLOCK', category: 'Depoimentos', description: 'Tabs com logos textuais de quatro empresas; cada aba mostra citação, autor, resultado em badge e o logo grande num painel lateral.', tags: ['depoimentos', 'logos', 'tabs', 'empresas'] },

  // ── CTA ──
  { file: 'blocks/cta/cta-com-contagem-regressiva.tsx', name: 'CTA com contagem regressiva', kind: 'BLOCK', category: 'CTA', description: 'Card dividido: oferta de lançamento com cupom à esquerda; contagem regressiva em quatro caixas e barra de vagas à direita.', tags: ['cta', 'contagem', 'oferta', 'urgencia'] },
  { file: 'blocks/cta/cta-com-avatares-e-prova-social.tsx', name: 'CTA com avatares e prova social', kind: 'BLOCK', category: 'CTA', description: 'Avatares coloridos flutuando ao redor de um título central, grupo de avatares com contador, nota em estrelas e garantias.', tags: ['cta', 'avatares', 'prova-social', 'motion'] },
  { file: 'blocks/cta/cta-em-faixa-escura-com-beam.tsx', name: 'CTA em faixa escura com beam', kind: 'BLOCK', category: 'CTA', description: 'Faixa de largura total em fundo escuro com feixes de luz percorrendo linhas ao fundo, título grande, dois botões e logos.', tags: ['cta', 'beam', 'escuro', 'motion'] },
];
