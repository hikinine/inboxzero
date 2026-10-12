// Entradas de conteúdo (fragmento "marketing-2"). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Equipe ──
  { file: 'blocks/equipe/equipe-em-grade-com-redes.tsx', name: 'Equipe em grade com redes', kind: 'BLOCK', category: 'Equipe', description: 'Oito membros em cards com avatar de iniciais em gradiente, cargo e ícones de LinkedIn, X e GitHub.', tags: ['equipe', 'time', 'grid', 'social'] },
  { file: 'blocks/equipe/equipe-em-lista-com-bio.tsx', name: 'Equipe em lista com bio', kind: 'BLOCK', category: 'Equipe', description: 'Título fixo à esquerda e quatro lideranças em linhas com avatar quadrado, cargo em badge, bio curta e links.', tags: ['equipe', 'lideranca', 'lista', 'bio'] },
  // ── Portfólio ──
  { file: 'blocks/portfolio/portfolio-em-grade-de-cases.tsx', name: 'Portfólio em grade de cases', kind: 'BLOCK', category: 'Portfólio', description: 'Seis cases em cards com capa em gradiente e mockup (web ou mobile), cliente, tags e resultado em número.', tags: ['portfolio', 'cases', 'grid', 'resultados'] },
  { file: 'blocks/portfolio/portfolio-em-masonry.tsx', name: 'Portfólio em masonry', kind: 'BLOCK', category: 'Portfólio', description: 'Colunas CSS com alturas variadas, filtro por categoria em chips e legenda sobre gradiente escuro no hover.', tags: ['portfolio', 'masonry', 'filtro', 'galeria'] , featured: true },
  // ── Galeria ──
  { file: 'blocks/galeria/galeria-em-bento.tsx', name: 'Galeria em bento', kind: 'BLOCK', category: 'Galeria', description: 'Grade bento de seis mídias com cenas SVG sobre gradientes, numeração e legenda que sobe no hover.', tags: ['galeria', 'bento', 'midia', 'hover'], featured: true },
  { file: 'blocks/galeria/galeria-com-legendas.tsx', name: 'Galeria com legendas', kind: 'BLOCK', category: 'Galeria', description: 'Três colunas de fotos com número, categoria, título e local em figcaption.', tags: ['galeria', 'legendas', 'fotos', 'grid'] },
  // ── Blog ──
  { file: 'blocks/blog/blog-em-tres-cards.tsx', name: 'Blog em três cards', kind: 'BLOCK', category: 'Blog', description: 'Três artigos com capa, badge de categoria, título, resumo, autor com avatar, data e tempo de leitura.', tags: ['blog', 'cards', 'artigos'] },
  { file: 'blocks/blog/blog-com-destaque-e-lista.tsx', name: 'Blog com destaque e lista', kind: 'BLOCK', category: 'Blog', description: 'Um post grande em destaque à esquerda e lista de quatro artigos com miniatura à direita.', tags: ['blog', 'destaque', 'lista', 'artigos'], featured: true },
  // ── Sobre ──
  { file: 'blocks/sobre/sobre-com-missao-e-numeros.tsx', name: 'Sobre com missão e números', kind: 'BLOCK', category: 'Sobre', description: 'Texto de missão com quatro números em grade e foto placeholder com card flutuante do time.', tags: ['sobre', 'missao', 'numeros', 'empresa'] },
  { file: 'blocks/sobre/sobre-com-valores-em-cards.tsx', name: 'Sobre com valores em cards', kind: 'BLOCK', category: 'Sobre', description: 'Seis valores da empresa em cards numerados com ícone, título e descrição.', tags: ['sobre', 'valores', 'cultura', 'cards'] },
  // ── Contato ──
  { file: 'blocks/contato/contato-com-formulario-e-canais.tsx', name: 'Contato com formulário e canais', kind: 'BLOCK', category: 'Contato', description: 'Canais (e-mail, telefone, endereço, suporte) à esquerda e formulário com nome, e-mail, assunto e mensagem, com estado de enviado.', tags: ['contato', 'formulario', 'canais', 'form'] },
  { file: 'blocks/contato/contato-com-mapa-estilizado.tsx', name: 'Contato com mapa estilizado', kind: 'BLOCK', category: 'Contato', description: 'Mapa abstrato em SVG (quadras, avenida, rio e parque) com pin pulsante e card de endereço sobreposto.', tags: ['contato', 'mapa', 'endereco', 'svg'] , featured: true },
  // ── FAQ ──
  { file: 'blocks/faq/faq-em-duas-colunas.tsx', name: 'FAQ em duas colunas', kind: 'BLOCK', category: 'FAQ', description: 'Oito perguntas divididas em dois acordeões lado a lado e faixa de "ainda com dúvida" no fim.', tags: ['faq', 'acordeao', 'colunas'] },
  { file: 'blocks/faq/faq-com-abas-por-tema.tsx', name: 'FAQ com abas por tema', kind: 'BLOCK', category: 'FAQ', description: 'Tabs Geral, Cobrança e Segurança com ícone, cada uma com acordeão de quatro perguntas.', tags: ['faq', 'tabs', 'acordeao', 'temas'] },
  // ── Logo Cloud ──
  { file: 'blocks/logo-cloud/logo-cloud-em-marquee.tsx', name: 'Logo cloud em marquee', kind: 'BLOCK', category: 'Logo Cloud', description: 'Duas faixas de chips de integrações rolando em sentidos opostos com fade nas bordas (motion).', tags: ['logos', 'marquee', 'integracoes', 'animado'] },
  { file: 'blocks/logo-cloud/logo-cloud-com-frase-de-confianca.tsx', name: 'Logo cloud com frase de confiança', kind: 'BLOCK', category: 'Logo Cloud', description: 'Avatares, frase "usado por 2.000+ times", estrelas e oito wordmarks tipográficos em grade.', tags: ['logos', 'prova-social', 'confianca'] },
  // ── Stats ──
  { file: 'blocks/stats/stats-em-cards-com-icones.tsx', name: 'Stats em cards com ícones', kind: 'BLOCK', category: 'Stats', description: 'Quatro KPIs em cards com ícone, valor grande e badge de variação positiva ou negativa.', tags: ['stats', 'kpi', 'cards', 'variacao'] },
  { file: 'blocks/stats/stats-com-grafico-de-barras.tsx', name: 'Stats com gráfico de barras', kind: 'BLOCK', category: 'Stats', description: 'Três números à esquerda e gráfico de barras mensal feito com divs, com troca de ano, projeção e tooltip no hover.', tags: ['stats', 'grafico', 'barras', 'interativo'] },
  // ── Timeline ──
  { file: 'blocks/timeline/timeline-de-historia-da-empresa.tsx', name: 'Timeline de história da empresa', kind: 'BLOCK', category: 'Timeline', description: 'Linha vertical alternada com seis marcos por ano, badge de fase e ano em marca-d\'água.', tags: ['timeline', 'historia', 'marcos', 'empresa'] , featured: true },
  { file: 'blocks/timeline/timeline-de-roadmap.tsx', name: 'Timeline de roadmap', kind: 'BLOCK', category: 'Timeline', description: 'Quatro trimestres em linha horizontal com status concluído, em andamento e planejado, e itens com ícone de estado.', tags: ['timeline', 'roadmap', 'status', 'produto'] },
  // ── Processo ──
  { file: 'blocks/processo/processo-em-quatro-etapas-horizontais.tsx', name: 'Processo em quatro etapas horizontais', kind: 'BLOCK', category: 'Processo', description: 'Quatro etapas em cards com ícone e setas entre elas; clicar numa etapa mostra os detalhes abaixo.', tags: ['processo', 'etapas', 'passos', 'interativo'] , featured: true },
  // ── Download ──
  { file: 'blocks/download/download-com-lojas-de-apps.tsx', name: 'Download com lojas de apps', kind: 'BLOCK', category: 'Download', description: 'Texto, botões App Store e Google Play em SVG, QR code e mockup de celular flutuante com app de atendimento.', tags: ['download', 'app', 'mockup', 'lojas'] },
  // ── Navbar ──
  { file: 'blocks/navbar/navbar-com-mega-menu.tsx', name: 'Navbar com mega menu', kind: 'BLOCK', category: 'Navbar', description: 'Logo, links e item Produto que abre um mega menu de três colunas com ícones e faixa de novidade; menu lateral no mobile.', tags: ['navbar', 'mega-menu', 'header', 'navegacao'], featured: true },
  { file: 'blocks/navbar/navbar-centralizada-com-cta.tsx', name: 'Navbar centralizada com CTA', kind: 'BLOCK', category: 'Navbar', description: 'Barra flutuante com links centralizados em pill, link ativo, CTA à direita e menu mobile que expande.', tags: ['navbar', 'header', 'cta', 'responsivo'] },
  // ── Footer ──
  { file: 'blocks/footer/footer-simples-com-social.tsx', name: 'Footer simples com social', kind: 'BLOCK', category: 'Footer', description: 'Uma linha com logo, links e ícones de redes, mais barra com copyright, status do sistema e legal.', tags: ['footer', 'social', 'simples'] },
  { file: 'blocks/footer/footer-mega-com-newsletter.tsx', name: 'Footer mega com newsletter', kind: 'BLOCK', category: 'Footer', description: 'Faixa de newsletter, cinco colunas de links e barra inferior com idioma, seletor de tema e redes.', tags: ['footer', 'newsletter', 'colunas', 'tema'] },
];
