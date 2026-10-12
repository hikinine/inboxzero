// Taxonomia do catálogo: categorias por tipo, com grupo (ver src/lib/groups.ts), descrição e ordem.
// Espelha a organização do shadcnstudio (Marketing / Dashboard & App / E-commerce / Datatable / Bento
// para blocos; um card por primitivo para componentes; páginas de marketing e de app; famílias de
// ilustrações). O seed/publish faz upsert por (kind, slugify(name)).
import type { ItemKind } from '@prisma/client';

export interface CategoryDef {
  kind: ItemKind;
  name: string;
  description: string;
  order: number;
  group?: string; // slug de GROUPS[kind]
}

const B = (name: string, group: string, description: string, order: number): CategoryDef => ({ kind: 'BLOCK', name, group, description, order });
const C = (name: string, description: string, order: number): CategoryDef => ({ kind: 'COMPONENT', name, description, order });
const P = (name: string, group: string, description: string, order: number): CategoryDef => ({ kind: 'PAGE', name, group, description, order });
const I = (name: string, description: string, order: number): CategoryDef => ({ kind: 'ILLUSTRATION', name, description, order });

export const CATEGORIES: CategoryDef[] = [
  // ── Blocos · Marketing ──
  B('Hero', 'marketing', 'A primeira dobra: título, promessa e chamada para ação.', 10),
  B('Features', 'marketing', 'Grades, bentos e listas para apresentar funcionalidades.', 20),
  B('Pricing', 'marketing', 'Planos, comparativos e toggles mensal/anual.', 30),
  B('Depoimentos', 'marketing', 'Citações de clientes com avatar, cargo e nota.', 40),
  B('Prova social', 'marketing', 'Avaliações, números e logos que dão confiança.', 45),
  B('Portfólio', 'marketing', 'Grades de projetos, cases e trabalhos.', 50),
  B('Equipe', 'marketing', 'Membros do time com foto, cargo e redes.', 55),
  B('CTA', 'marketing', 'Chamadas finais e faixas de conversão.', 60),
  B('Logo Cloud', 'marketing', 'Faixas e grades de logos de clientes e integrações.', 65),
  B('FAQ', 'marketing', 'Perguntas frequentes em acordeão, colunas ou abas.', 70),
  B('Galeria', 'marketing', 'Imagens e mídias em grade, bento ou masonry.', 75),
  B('Blog', 'marketing', 'Listas de posts, destaques e cards de artigo.', 80),
  B('Sobre', 'marketing', 'Missão, história, números e valores da empresa.', 85),
  B('Contato', 'marketing', 'Formulários de contato, endereços e canais.', 90),
  B('Download', 'marketing', 'Chamadas para baixar o app nas lojas.', 95),
  B('Timeline', 'marketing', 'Linhas do tempo de história, roadmap e marcos.', 100),
  B('Processo', 'marketing', 'Etapas, metodologia e como funciona.', 105),
  B('Stats', 'marketing', 'Números que vendem: métricas em destaque.', 110),
  B('Navbar', 'marketing', 'Cabeçalhos e barras de navegação.', 115),
  B('Footer', 'marketing', 'Rodapés com colunas de links, newsletter e social.', 120),
  B('Autenticação', 'marketing', 'Login, cadastro, recuperação de senha, OTP e 2FA.', 125),
  B('Integrações', 'marketing', 'Grades e listas de apps conectados.', 130),
  B('Cookies', 'marketing', 'Banners e modais de consentimento.', 135),
  B('Chat IA', 'marketing', 'Bolhas e widgets de chat com assistente.', 140),
  B('Comparativo', 'marketing', 'Nós vs. eles, antes e depois, planos lado a lado.', 145),
  B('Erro', 'marketing', '404, 500, manutenção e acesso negado.', 150),
  B('Agenda', 'marketing', 'Escolha de horários e agendamento.', 155),
  B('Videochamada', 'marketing', 'Salas de reunião e grades de participantes.', 160),
  B('Lista de espera', 'marketing', 'Waitlist com contador e formulário.', 165),
  B('Banner', 'marketing', 'Faixas de anúncio e promoção no topo.', 170),

  // ── Blocos · Dashboard & App ──
  B('Dashboard Shell', 'dashboard', 'Estrutura completa: sidebar, topbar e área de conteúdo.', 200),
  B('App Shell', 'dashboard', 'Shells de aplicação com navegação lateral ou em abas.', 205),
  B('Sidebar', 'dashboard', 'Menus laterais com grupos, badges e modo compacto.', 210),
  B('Header de app', 'dashboard', 'Topbars com busca, breadcrumb, ações e avatar.', 215),
  B('Footer de app', 'dashboard', 'Rodapés de aplicação com status e links.', 220),
  B('Widgets', 'dashboard', 'Cards de tarefas, calendário, metas e atividade.', 225),
  B('Estatísticas', 'dashboard', 'KPIs com variação, sparklines e comparativos.', 230),
  B('Gráficos', 'dashboard', 'Área, barras, linha, donut, radar e radial com recharts.', 235),
  B('Diálogos', 'dashboard', 'Modais de criar, convidar, compartilhar e upgrade.', 240),
  B('Dropdowns', 'dashboard', 'Menus de usuário, notificações e filtros.', 245),
  B('Formulário multi-etapas', 'dashboard', 'Steppers de onboarding, checkout e cadastro.', 250),
  B('Layout de formulário', 'dashboard', 'Formulários em colunas e seções.', 255),
  B('Configurações de conta', 'dashboard', 'Perfil, senha, notificações e cobrança.', 260),
  B('Upload', 'dashboard', 'Dropzones e listas de arquivos com progresso.', 265),
  B('Onboarding', 'dashboard', 'Checklists, feeds de dicas e primeiros passos.', 270),
  B('Estado vazio', 'dashboard', 'Telas vazias com ilustração e ação.', 275),
  B('Inbox', 'dashboard', 'Caixas de entrada com lista e leitura.', 280),
  B('Kanban', 'dashboard', 'Quadros de colunas e cards arrastáveis.', 285),
  B('Calendário', 'dashboard', 'Agendas mensais, semanais e de eventos.', 290),
  B('Workflow', 'dashboard', 'Construtores de fluxo com nós e conexões.', 295),
  B('Multi view', 'dashboard', 'Alternância lista/grade/tabela.', 300),
  B('Gantt', 'dashboard', 'Cronogramas em barras.', 305),
  B('Mapa', 'dashboard', 'Mapas estilizados com pins e áreas.', 310),

  // ── Blocos · E-commerce ──
  B('Produto', 'ecommerce', 'Visão geral com galeria, variantes e compra.', 400),
  B('Quick view', 'ecommerce', 'Modal rápido de produto.', 405),
  B('Categoria de produto', 'ecommerce', 'Listagem com filtros laterais.', 410),
  B('Lista de produtos', 'ecommerce', 'Grades e linhas de produtos.', 415),
  B('Carrinho', 'ecommerce', 'Carrinhos laterais e de página.', 420),
  B('Oferta', 'ecommerce', 'Modais de cupom e promoção.', 425),
  B('Checkout', 'ecommerce', 'Pagamento em etapas ou página única.', 430),
  B('Avaliações', 'ecommerce', 'Notas, distribuição e lista de reviews.', 435),
  B('Resumo do pedido', 'ecommerce', 'Itens, totais e entrega.', 440),
  B('Filtros', 'ecommerce', 'Chips, sidebars e barras de filtro.', 445),
  B('Mega footer', 'ecommerce', 'Rodapés de loja com categorias e selos.', 450),
  B('Gift card', 'ecommerce', 'Cartões-presente e vouchers.', 455),
  B('Banner de loja', 'ecommerce', 'Promoções, frete grátis e anúncios.', 460),

  // ── Blocos · Datatable ──
  B('Datatable', 'datatable', 'Tabelas de dados com ordenação e paginação.', 500),
  B('Colunas', 'datatable', 'Colunas ocultáveis, fixas e redimensionáveis.', 505),
  B('Filtros de tabela', 'datatable', 'Busca, facetas e filtros por coluna.', 510),
  B('Edição', 'datatable', 'Edição inline e em lote.', 515),
  B('Agrupamento', 'datatable', 'Linhas agrupadas e expansíveis.', 520),
  B('Exportação', 'datatable', 'Exportar CSV/PDF e seleção.', 525),
  B('Arrastar e soltar', 'datatable', 'Reordenar linhas e colunas.', 530),

  // ── Blocos · Bento ──
  B('Bento Grid', 'bento', 'Grades bento para features, produtos e IA.', 600),

  // ── Componentes (um card por primitivo, em ordem alfabética) ──
  C('Accordion', 'Painéis expansíveis para FAQ, configurações e listas.', 10),
  C('Alert', 'Avisos informativos, de sucesso, alerta e erro.', 20),
  C('Alert Dialog', 'Confirmações que interrompem o fluxo.', 30),
  C('Aspect Ratio', 'Mídias em proporção fixa.', 40),
  C('Autocomplete', 'Sugestões enquanto digita.', 50),
  C('Avatar', 'Fotos, iniciais, grupos e status.', 60),
  C('Badge', 'Rótulos de status, contadores e tags.', 70),
  C('Breadcrumb', 'Trilhas de navegação.', 80),
  C('Button', 'Variantes, tamanhos, ícones, estados e loading.', 90),
  C('Button Group', 'Grupos de botões segmentados e com dropdown.', 100),
  C('Calendar', 'Calendários de data única, intervalo e presets.', 110),
  C('Card', 'Cards de conteúdo, métricas, produto e perfil.', 120),
  C('Carousel', 'Carrosséis de imagens, cards e depoimentos.', 130),
  C('Chart', 'Gráficos com recharts e tokens do tema.', 140),
  C('Checkbox', 'Listas, cards selecionáveis e estados.', 150),
  C('Code Block', 'Blocos de código com título, linhas e copiar.', 160),
  C('Collapsible', 'Seções recolhíveis.', 170),
  C('Combobox', 'Seleção com busca e múltipla.', 180),
  C('Command', 'Paletas de comandos e busca global.', 190),
  C('Context Menu', 'Menus de clique direito.', 200),
  C('Data Table', 'Tabelas com ordenação, seleção e ações.', 210),
  C('Date Picker', 'Seleção de datas em popover.', 220),
  C('Dialog', 'Modais de formulário, confirmação e conteúdo.', 230),
  C('Drawer', 'Painéis deslizantes inferiores e laterais.', 240),
  C('Dropdown Menu', 'Menus de ações, usuário e seleção.', 250),
  C('Empty', 'Estados vazios com ícone, texto e ação.', 260),
  C('Field', 'Campos com rótulo, descrição e erro.', 270),
  C('Form', 'Formulários completos com validação visual.', 280),
  C('Hover Card', 'Cartões ao passar o mouse.', 290),
  C('Input', 'Campos de texto: variantes, ícones, estados e validação.', 300),
  C('Input Group', 'Inputs com prefixo, sufixo, botões e addons.', 310),
  C('Input OTP', 'Códigos de verificação.', 320),
  C('Item', 'Linhas de lista com mídia, título, descrição e ações.', 330),
  C('Kanban', 'Colunas e cards de quadro.', 340),
  C('Kbd', 'Atalhos de teclado.', 350),
  C('Label', 'Rótulos com obrigatoriedade e ajuda.', 360),
  C('List', 'Listas simples, ordenadas e com ícones.', 370),
  C('Menubar', 'Barras de menu estilo desktop.', 380),
  C('Navigation Menu', 'Menus de navegação com submenus.', 390),
  C('Pagination', 'Paginação numérica, compacta e com tamanho de página.', 400),
  C('Phone Input', 'Telefone com código de país.', 410),
  C('Popover', 'Conteúdo flutuante ancorado.', 420),
  C('Progress', 'Barras, anéis e passos de progresso.', 430),
  C('Radio Group', 'Opções exclusivas em lista e cards.', 440),
  C('Rating', 'Avaliação por estrelas.', 450),
  C('Resizable', 'Painéis redimensionáveis.', 460),
  C('Scroll Area', 'Áreas roláveis com barra customizada.', 470),
  C('Select', 'Seleções simples, com grupos e ícones.', 480),
  C('Separator', 'Divisores com e sem texto.', 490),
  C('Sheet', 'Painéis laterais.', 500),
  C('Sidebar', 'Sidebars de aplicação.', 510),
  C('Skeleton', 'Esqueletos de carregamento.', 520),
  C('Slider', 'Controles deslizantes simples e de intervalo.', 530),
  C('Spinner', 'Indicadores de carregamento.', 540),
  C('Stepper', 'Passos horizontais e verticais.', 550),
  C('Switch', 'Interruptores com rótulo e descrição.', 560),
  C('Table', 'Tabelas simples com status e ações.', 570),
  C('Tabs', 'Abas em linha, pills, verticais e com ícones.', 580),
  C('Textarea', 'Áreas de texto com contador e auto-altura.', 590),
  C('Timeline', 'Linhas do tempo de atividades.', 600),
  C('Toast', 'Notificações temporárias.', 610),
  C('Toggle', 'Botões de alternância.', 620),
  C('Toggle Group', 'Grupos de alternância simples e múltiplos.', 630),
  C('Tooltip', 'Dicas ao passar o mouse.', 640),
  C('Typography', 'Títulos, parágrafos, listas e citações.', 650),

  // ── Páginas · Marketing ──
  P('Landing', 'marketing', 'Landing pages completas, compostas por blocos do catálogo.', 5),
  P('Features', 'marketing', 'Páginas de funcionalidades.', 10),
  P('Pricing', 'marketing', 'Páginas de preços e planos.', 15),
  P('Sobre', 'marketing', 'Páginas institucionais.', 20),
  P('Blog', 'marketing', 'Listagens e posts de blog.', 25),
  P('Contato', 'marketing', 'Páginas de contato.', 30),
  P('FAQ', 'marketing', 'Centrais de perguntas.', 35),
  P('Integrações', 'marketing', 'Diretórios de integrações.', 40),
  P('Erro', 'marketing', '404, 500 e manutenção.', 45),
  P('Changelog', 'marketing', 'Notas de versão.', 50),

  // ── Páginas · Aplicação ──
  P('Dashboard', 'app', 'Visões gerais com KPIs, gráficos e listas.', 100),
  P('Settings', 'app', 'Páginas de configurações e perfil.', 105),
  P('Autenticação', 'app', 'Login, cadastro e recuperação em página inteira.', 110),
  P('Inbox', 'app', 'Caixas de entrada e mensagens.', 115),
  P('Kanban', 'app', 'Quadros de tarefas em página inteira.', 120),
  P('Onboarding', 'app', 'Fluxos de primeiros passos.', 125),
  P('Checkout', 'app', 'Páginas de pagamento.', 130),

  // ── Ilustrações ──
  I('Beam', 'Feixes de luz percorrendo conectores entre nós — integrações, pipelines e fluxos de IA.', 10),
  I('Orbit', 'Elementos orbitando um núcleo — ecossistemas e integrações.', 20),
  I('Chat', 'Conversas e bolhas de mensagem animadas.', 30),
  I('Marquee', 'Faixas rolantes de logos, tags e mensagens.', 40),
  I('Card Stack', 'Pilhas de cards em camadas, com entrada e troca animadas.', 50),
  I('Text', 'Animações de texto: typewriter, troca de palavras, revelação.', 60),
  I('Ripple', 'Ondas e pulsos expandindo a partir de um ponto.', 70),
  I('Diversos', 'Globos, terminais, anéis, engrenagens e outras composições animadas.', 80),
];

export function categoryNames(kind: ItemKind): string[] {
  return CATEGORIES.filter((c) => c.kind === kind).map((c) => c.name);
}
