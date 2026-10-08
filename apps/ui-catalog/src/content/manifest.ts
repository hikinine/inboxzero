// Manifesto do conteúdo inicial do catálogo (seed local + publish-content para produção).
// Cada entrada aponta para um .tsx em src/content/<kind>/<category>/<slug>.tsx.
// Os arquivos são código real (type-checked pelo tsc do app) e também o texto salvo no banco.
import type { ItemKind } from '@prisma/client';

export interface ContentEntry {
  file: string; // relativo a src/content
  name: string;
  kind: ItemKind;
  category: string;
  description: string;
  tags: string[];
  featured?: boolean;
  previewHeight?: number;
}

export interface CategoryDef {
  kind: ItemKind;
  name: string;
  description: string;
  order: number;
}

export const CATEGORIES: CategoryDef[] = [
  // Blocos (marketing)
  { kind: 'BLOCK', name: 'Hero', description: 'A primeira dobra: título, promessa e chamada para ação.', order: 10 },
  { kind: 'BLOCK', name: 'Features', description: 'Grades e bentos para apresentar funcionalidades.', order: 20 },
  { kind: 'BLOCK', name: 'Pricing', description: 'Planos, comparativos e toggles mensal/anual.', order: 30 },
  { kind: 'BLOCK', name: 'Depoimentos', description: 'Prova social: citações, notas e logos.', order: 40 },
  { kind: 'BLOCK', name: 'Stats', description: 'Números que vendem: métricas em destaque.', order: 50 },
  { kind: 'BLOCK', name: 'FAQ', description: 'Perguntas frequentes em acordeão.', order: 60 },
  { kind: 'BLOCK', name: 'CTA', description: 'Chamadas finais e faixas de conversão.', order: 70 },
  { kind: 'BLOCK', name: 'Navbar', description: 'Cabeçalhos e barras de navegação.', order: 80 },
  { kind: 'BLOCK', name: 'Footer', description: 'Rodapés com colunas de links e newsletter.', order: 90 },
  { kind: 'BLOCK', name: 'Autenticação', description: 'Login, cadastro e recuperação de senha.', order: 100 },
  { kind: 'BLOCK', name: 'Logo Cloud', description: 'Faixas de logos de clientes e integrações.', order: 110 },
  // Componentes
  { kind: 'COMPONENT', name: 'Botões', description: 'Variantes, tamanhos, ícones, estados e grupos.', order: 5 },
  { kind: 'COMPONENT', name: 'Cards', description: 'Cards de conteúdo, métricas e produto.', order: 10 },
  { kind: 'COMPONENT', name: 'Formulários', description: 'Campos, grupos e layouts de formulário.', order: 20 },
  { kind: 'COMPONENT', name: 'Tabelas', description: 'Tabelas de dados com ações e status.', order: 30 },
  { kind: 'COMPONENT', name: 'Gráficos', description: 'Charts com recharts e tokens do tema.', order: 40 },
  { kind: 'COMPONENT', name: 'Navegação', description: 'Tabs, breadcrumbs, menus e comandos.', order: 50 },
  { kind: 'COMPONENT', name: 'Feedback', description: 'Alertas, estados vazios, toasts e diálogos.', order: 60 },
  // Páginas
  { kind: 'PAGE', name: 'Dashboard', description: 'Visões gerais com KPIs, gráficos e listas.', order: 10 },
  { kind: 'PAGE', name: 'Settings', description: 'Páginas de configurações e perfil.', order: 20 },
  // Ilustrações
  { kind: 'ILLUSTRATION', name: 'Beam', description: 'Feixes de luz percorrendo conectores entre nós — integrações, pipelines e fluxos de IA.', order: 10 },
  { kind: 'ILLUSTRATION', name: 'Orbit', description: 'Elementos orbitando um núcleo — ecossistemas e integrações.', order: 20 },
  { kind: 'ILLUSTRATION', name: 'Marquee', description: 'Faixas rolantes de logos, tags e mensagens.', order: 30 },
  { kind: 'ILLUSTRATION', name: 'Card Stack', description: 'Pilhas de cards em camadas, com entrada e troca animadas.', order: 40 },
  { kind: 'ILLUSTRATION', name: 'Ripple', description: 'Ondas e pulsos expandindo a partir de um ponto.', order: 50 },
  { kind: 'ILLUSTRATION', name: 'Chat', description: 'Conversas e bolhas de mensagem animadas.', order: 60 },
  { kind: 'ILLUSTRATION', name: 'Text', description: 'Animações de texto: typewriter, troca de palavras, revelação.', order: 70 },
];

export const CONTENT: ContentEntry[] = [
  // ── Ilustrações ──
  { file: 'illustrations/beam/data-flow-beam.tsx', name: 'Data Flow Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Feixes de luz percorrem os conectores entre prompt, modelo, API, banco, cache e resposta.', tags: ['beam', 'pipeline', 'ia', 'animado'], featured: true },
  { file: 'illustrations/beam/ai-hub-beam.tsx', name: 'AI Hub Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Um núcleo de IA recebe feixes de seis modelos ao redor, com pulso no centro.', tags: ['beam', 'ia', 'hub', 'animado'] },
  { file: 'illustrations/beam/pipeline-beam.tsx', name: 'Pipeline Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Origem → filtro → destino com barras que preenchem e taxa de transferência.', tags: ['beam', 'pipeline', 'dados', 'animado'] },
  { file: 'illustrations/orbit/integrations-orbit.tsx', name: 'Integrations Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Ícones de integrações orbitam um núcleo em dois anéis com velocidades opostas.', tags: ['orbit', 'integracoes', 'animado'], featured: true },
  { file: 'illustrations/marquee/logo-marquee.tsx', name: 'Logo Marquee', kind: 'ILLUSTRATION', category: 'Marquee', description: 'Duas faixas de logos rolando em sentidos opostos, com fade nas bordas.', tags: ['marquee', 'logos', 'animado'] },
  { file: 'illustrations/card-stack/notification-stack.tsx', name: 'Notification Stack', kind: 'ILLUSTRATION', category: 'Card Stack', description: 'Pilha de notificações que cicla: a do topo sai, uma nova entra por baixo.', tags: ['card-stack', 'notificacoes', 'animado'], featured: true },
  { file: 'illustrations/ripple/ripple-pulse.tsx', name: 'Ripple Pulse', kind: 'ILLUSTRATION', category: 'Ripple', description: 'Ondas concêntricas partem de um emissor central; contatos nas bordas pulsam.', tags: ['ripple', 'broadcast', 'animado'] },
  { file: 'illustrations/chat/chat-conversation.tsx', name: 'Chat Conversation', kind: 'ILLUSTRATION', category: 'Chat', description: 'Conversa que se escreve sozinha, com indicador de digitação, em loop.', tags: ['chat', 'atendimento', 'animado'] },
  { file: 'illustrations/text/typewriter-headline.tsx', name: 'Typewriter Headline', kind: 'ILLUSTRATION', category: 'Text', description: 'Título que digita e apaga uma lista de frases, com cursor piscando.', tags: ['text', 'typewriter', 'animado'] },
  { file: 'illustrations/text/word-rotate.tsx', name: 'Word Rotate', kind: 'ILLUSTRATION', category: 'Text', description: 'Uma palavra da frase troca com deslize vertical a cada 2 segundos.', tags: ['text', 'rotate', 'animado'] },
  // ── Blocos ──
  { file: 'blocks/hero/hero-centralizado.tsx', name: 'Hero centralizado', kind: 'BLOCK', category: 'Hero', description: 'Badge, título grande, subtítulo, dois CTAs e prova social com avatares.', tags: ['hero', 'saas', 'landing'], featured: true },
  { file: 'blocks/hero/hero-split-com-mockup.tsx', name: 'Hero split com mockup', kind: 'BLOCK', category: 'Hero', description: 'Texto à esquerda e um card de métricas com sparkline à direita.', tags: ['hero', 'saas', 'mockup'], featured: true },
  { file: 'blocks/features/features-bento.tsx', name: 'Features bento', kind: 'BLOCK', category: 'Features', description: 'Grade bento com seis módulos, dois deles em destaque duplo.', tags: ['features', 'bento'], featured: true },
  { file: 'blocks/features/features-tres-colunas.tsx', name: 'Features em três colunas', kind: 'BLOCK', category: 'Features', description: 'Três benefícios com ícone circular, título e descrição.', tags: ['features'] },
  { file: 'blocks/pricing/pricing-tres-planos.tsx', name: 'Pricing com três planos', kind: 'BLOCK', category: 'Pricing', description: 'Toggle mensal/anual, três planos com o do meio em destaque.', tags: ['pricing', 'planos', 'toggle'], featured: true },
  { file: 'blocks/depoimentos/depoimentos-grid.tsx', name: 'Depoimentos em grade', kind: 'BLOCK', category: 'Depoimentos', description: 'Seis citações em colunas tipo masonry, com avatar e cargo.', tags: ['depoimentos', 'prova-social'] },
  { file: 'blocks/stats/stats-faixa.tsx', name: 'Stats em faixa', kind: 'BLOCK', category: 'Stats', description: 'Quatro números grandes numa faixa com borda.', tags: ['stats', 'numeros'] },
  { file: 'blocks/faq/faq-acordeao.tsx', name: 'FAQ em acordeão', kind: 'BLOCK', category: 'FAQ', description: 'Título e CTA à esquerda, acordeão de perguntas à direita.', tags: ['faq', 'acordeao'] },
  { file: 'blocks/cta/cta-faixa.tsx', name: 'CTA em faixa', kind: 'BLOCK', category: 'CTA', description: 'Faixa de conversão em cor primária com campo de e-mail.', tags: ['cta', 'newsletter'] },
  { file: 'blocks/navbar/navbar-simples.tsx', name: 'Navbar simples', kind: 'BLOCK', category: 'Navbar', description: 'Logo, links, dois botões e menu lateral no mobile.', tags: ['navbar', 'header', 'responsivo'] },
  { file: 'blocks/footer/footer-colunas.tsx', name: 'Footer em colunas', kind: 'BLOCK', category: 'Footer', description: 'Newsletter, quatro colunas de links e barra inferior.', tags: ['footer', 'newsletter'] },
  { file: 'blocks/autenticacao/login-card.tsx', name: 'Login em card', kind: 'BLOCK', category: 'Autenticação', description: 'E-mail, senha, lembrar-me e login social num card centralizado.', tags: ['login', 'auth', 'form'] },
  { file: 'blocks/autenticacao/cadastro-split.tsx', name: 'Cadastro split', kind: 'BLOCK', category: 'Autenticação', description: 'Formulário de cadastro à esquerda e depoimento em painel à direita.', tags: ['cadastro', 'auth', 'form'] },
  { file: 'blocks/logo-cloud/logo-cloud-grid.tsx', name: 'Logo cloud em grade', kind: 'BLOCK', category: 'Logo Cloud', description: 'Oito logos em grade com divisórias finas.', tags: ['logos', 'integracoes'] },
  // ── Componentes ──
  { file: 'components/cards/card-metrica.tsx', name: 'Card de métrica', kind: 'COMPONENT', category: 'Cards', description: 'Três KPIs com variação e sparkline SVG.', tags: ['card', 'kpi', 'dashboard'], featured: true },
  { file: 'components/cards/card-produto.tsx', name: 'Card de produto', kind: 'COMPONENT', category: 'Cards', description: 'Imagem, desconto, avaliação, preço e botão de compra.', tags: ['card', 'ecommerce'] },
  { file: 'components/cards/card-perfil-equipe.tsx', name: 'Cards de equipe', kind: 'COMPONENT', category: 'Cards', description: 'Três membros com avatar, cargo, tags e ações.', tags: ['card', 'equipe', 'perfil'] },
  { file: 'components/formularios/form-perfil.tsx', name: 'Formulário de perfil', kind: 'COMPONENT', category: 'Formulários', description: 'Inputs, selects nativos, textarea e switch num card com rodapé de ações.', tags: ['form', 'perfil', 'settings'] },
  { file: 'components/tabelas/tabela-pedidos.tsx', name: 'Tabela de pedidos', kind: 'COMPONENT', category: 'Tabelas', description: 'Seleção, avatar, status em badge e menu de ações por linha.', tags: ['tabela', 'pedidos', 'ecommerce'], featured: true },
  { file: 'components/graficos/grafico-area.tsx', name: 'Gráfico de área', kind: 'COMPONENT', category: 'Gráficos', description: 'Receita × meta com recharts e tooltip do shadcn.', tags: ['chart', 'area', 'recharts'] },
  { file: 'components/graficos/grafico-barras.tsx', name: 'Gráfico de barras', kind: 'COMPONENT', category: 'Gráficos', description: 'Leads e vendas por canal, com legenda.', tags: ['chart', 'barras', 'recharts'] },
  { file: 'components/navegacao/tabs-settings.tsx', name: 'Tabs de configurações', kind: 'COMPONENT', category: 'Navegação', description: 'Três abas em linha com cards de conta, notificações e cobrança.', tags: ['tabs', 'settings'] },
  { file: 'components/feedback/estado-vazio.tsx', name: 'Estado vazio', kind: 'COMPONENT', category: 'Feedback', description: 'Ícone, título, descrição e duas ações.', tags: ['empty', 'feedback'] },
  { file: 'components/feedback/alertas-variantes.tsx', name: 'Alertas', kind: 'COMPONENT', category: 'Feedback', description: 'Informativo, sucesso e destrutivo.', tags: ['alert', 'feedback'] },
  { file: 'components/feedback/dialog-confirmacao.tsx', name: 'Diálogo de confirmação', kind: 'COMPONENT', category: 'Feedback', description: 'Ação destrutiva com confirmação por digitação.', tags: ['dialog', 'confirmacao'] },
  // ── Páginas ──
  { file: 'pages/dashboard/dashboard-visao-geral.tsx', name: 'Dashboard visão geral', kind: 'PAGE', category: 'Dashboard', description: 'Sidebar, header com busca, KPIs, gráfico de área e tabela de negócios.', tags: ['dashboard', 'crm', 'saas'], featured: true },
  { file: 'pages/settings/settings-perfil.tsx', name: 'Settings de perfil', kind: 'PAGE', category: 'Settings', description: 'Menu lateral e cards de informações, preferências e zona de perigo.', tags: ['settings', 'perfil'] },
  // ── Lote 2 ──
  { file: 'components/botoes/botoes-variantes.tsx', name: 'Botões: variantes e estados', kind: 'COMPONENT', category: 'Botões', description: 'Todas as variantes e tamanhos, ícones, loading, destrutivo e grupo de botões.', tags: ['button', 'variantes'], featured: true },
  { file: 'components/formularios/input-group-icones.tsx', name: 'Inputs com addons', kind: 'COMPONENT', category: 'Formulários', description: 'Busca com atalho, prefixo de URL, botão inline, senha com olho e textarea com contador.', tags: ['input', 'form', 'input-group'] },
  { file: 'components/feedback/badges-status.tsx', name: 'Badges de status', kind: 'COMPONENT', category: 'Feedback', description: 'Status com ponto, com ícone semântico e contadores.', tags: ['badge', 'status'] },
  { file: 'components/cards/card-progresso-meta.tsx', name: 'Card de metas com progresso', kind: 'COMPONENT', category: 'Cards', description: 'Três metas com barra, rótulo e valor; avatares do time no rodapé.', tags: ['card', 'progress', 'metas'] },
  { file: 'components/navegacao/command-palette.tsx', name: 'Command palette', kind: 'COMPONENT', category: 'Navegação', description: 'Paleta de comandos (cmdk) com grupos, ícones e atalhos.', tags: ['command', 'cmdk', 'busca'], featured: true },
  { file: 'components/navegacao/breadcrumb-paginacao.tsx', name: 'Breadcrumb e paginação', kind: 'COMPONENT', category: 'Navegação', description: 'Trilha com reticências e paginação com página ativa.', tags: ['breadcrumb', 'pagination'] },
  { file: 'components/cards/skeleton-loading.tsx', name: 'Skeleton de carregamento', kind: 'COMPONENT', category: 'Cards', description: 'Esqueleto de card e de lista com avatares.', tags: ['skeleton', 'loading'] },
  { file: 'components/formularios/calendario-agendamento.tsx', name: 'Calendário de agendamento', kind: 'COMPONENT', category: 'Formulários', description: 'Calendário com horários disponíveis e confirmação.', tags: ['calendar', 'agendamento', 'form'] },
  { file: 'components/cards/timeline-atividades.tsx', name: 'Timeline de atividades', kind: 'COMPONENT', category: 'Cards', description: 'Linha do tempo vertical com ícone por tipo de evento e avatar.', tags: ['timeline', 'atividades', 'crm'] },
  { file: 'components/navegacao/carousel-depoimentos.tsx', name: 'Carousel de depoimentos', kind: 'COMPONENT', category: 'Navegação', description: 'Carrossel (embla) de cards de depoimento com setas.', tags: ['carousel', 'depoimentos'] },
  { file: 'components/formularios/slider-switch-config.tsx', name: 'Sliders e switches de configuração', kind: 'COMPONENT', category: 'Formulários', description: 'Limites com slider e permissões com switch num card de configuração de IA.', tags: ['slider', 'switch', 'settings'] },
  { file: 'blocks/depoimentos/depoimento-destaque.tsx', name: 'Depoimento em destaque', kind: 'BLOCK', category: 'Depoimentos', description: 'Uma citação grande centralizada com autor.', tags: ['depoimento', 'prova-social'] },
  { file: 'blocks/features/como-funciona-passos.tsx', name: 'Como funciona em passos', kind: 'BLOCK', category: 'Features', description: 'Três passos numerados ligados por uma linha.', tags: ['passos', 'como-funciona'] },
  { file: 'blocks/pricing/tabela-comparativa.tsx', name: 'Tabela comparativa de planos', kind: 'BLOCK', category: 'Pricing', description: 'Recursos por plano com checks e coluna em destaque.', tags: ['pricing', 'tabela', 'comparativo'] },
  { file: 'illustrations/orbit/avatar-orbit.tsx', name: 'Avatar Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Contatos orbitam um centro de conversas em dois anéis.', tags: ['orbit', 'avatares', 'animado'] },
  { file: 'illustrations/beam/design-to-deploy-beam.tsx', name: 'Design to Deploy Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Pipeline Figma → Next.js → Claude → Deploy com feixes entre as etapas.', tags: ['beam', 'pipeline', 'deploy', 'animado'] },
  { file: 'illustrations/text/shimmer-text.tsx', name: 'Shimmer Text', kind: 'ILLUSTRATION', category: 'Text', description: 'Brilho atravessando o título em loop.', tags: ['text', 'shimmer', 'animado'] },
  { file: 'illustrations/ripple/map-pin-ripple.tsx', name: 'Map Pin Ripple', kind: 'ILLUSTRATION', category: 'Ripple', description: 'Pin principal emitindo ondas num mapa com pins secundários pulsando.', tags: ['ripple', 'mapa', 'animado'] },
];
