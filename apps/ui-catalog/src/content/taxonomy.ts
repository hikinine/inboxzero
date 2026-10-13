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
  intro?: string; // abertura da página de docs (/docs/components/<slug>); sem ela, usa a description
  faq?: Array<{ q: string; a: string }>; // perguntas frequentes da página de docs (crases viram <code>)
}

// Conteúdo das páginas de docs dos componentes mais usados (o resto cai no FAQ padrão gerado pela página).
// Também pode ser editado pelo MCP (upsert_category com intro/faq).
const COMPONENT_DOCS: Record<string, Pick<CategoryDef, 'intro' | 'faq'>> = {
  Button: {
    intro:
      'O Button é a ação principal de qualquer interface: enviar um formulário, abrir um diálogo, confirmar uma compra. Aqui estão variantes prontas sobre o primitivo do shadcn/ui (Base UI), com tamanhos, ícones, estados de carregamento e grupos, todas usando os tokens do tema e funcionando no claro e no escuro.',
    faq: [
      { q: 'Como uso o Button como link?', a: 'No estilo base-nova não existe `asChild`: passe o elemento em `render` e desligue o botão nativo, como em `<Button nativeButton={false} render={<Link href="/precos" />}>Ver planos</Button>`.' },
      { q: 'Como mostro um estado de carregamento?', a: 'Desabilite o botão com `disabled` enquanto a ação roda e coloque um `<Spinner data-icon="inline-start" />` antes do texto. O `data-icon` ajusta o espaçamento automaticamente.' },
      { q: 'Quais variantes e tamanhos existem?', a: 'O primitivo traz `default`, `secondary`, `outline`, `ghost`, `destructive` e `link`, e os tamanhos `xs`, `sm`, `default`, `lg` e as versões quadradas `icon-xs`, `icon-sm`, `icon` e `icon-lg`.' },
      { q: 'Posso criar uma variante própria?', a: 'Sim. As variantes vêm de `buttonVariants` (cva) em `components/ui/button.tsx`; adicione uma chave nova ali ou componha classes com `className` no uso, mantendo os tokens semânticos (`bg-primary`, `text-primary-foreground`).' },
    ],
  },
  Input: {
    intro:
      'O Input é o campo de texto básico de formulários. As variantes cobrem rótulo, ícones, prefixos, botões embutidos, contagem de caracteres, validação e estados desabilitado e somente leitura, sempre com foco visível e acessível.',
    faq: [
      { q: 'Como coloco um ícone dentro do campo?', a: 'Use o `InputGroup` com `InputGroupAddon` e `InputGroupInput`, ou posicione o ícone com `absolute` dentro de um wrapper `relative` e dê `pl-9` ao Input.' },
      { q: 'Como mostro um erro de validação?', a: 'Marque o campo com `aria-invalid` (o primitivo pinta a borda e o anel com `destructive`) e exiba a mensagem num `FieldError` ou num `<p>` ligado por `aria-describedby`.' },
      { q: 'Funciona com React Hook Form?', a: 'Sim. O Input repassa `ref` e as props nativas, então `{...register("email")}` ou o `Controller` funcionam sem adaptação.' },
    ],
  },
  Dialog: {
    intro:
      'O Dialog abre uma janela modal sobre a página para formulários curtos, confirmações e conteúdo que pede atenção total. O foco fica preso dentro do diálogo, Esc fecha e o conteúdo de fundo fica inerte, tudo vindo do primitivo do Base UI.',
    faq: [
      { q: 'Qual a diferença entre Dialog e Alert Dialog?', a: 'O Alert Dialog é para confirmações destrutivas: não fecha clicando fora e exige uma escolha explícita. O Dialog serve para todo o resto (formulários, detalhes, conteúdo).' },
      { q: 'Como controlo a abertura pelo estado?', a: 'Passe `open` e `onOpenChange` ao `Dialog`. Sem eles, o `DialogTrigger` controla a abertura sozinho.' },
      { q: 'Como uso um botão próprio como gatilho?', a: 'Em vez de `asChild`, use `render`: `<DialogTrigger render={<Button variant="outline" />}>Editar</DialogTrigger>`.' },
      { q: 'Dialog ou Sheet no mobile?', a: 'Para formulários longos no celular, prefira `Drawer` ou `Sheet`, que aproveitam melhor a altura da tela. O Dialog funciona melhor para conteúdo curto.' },
    ],
  },
  Card: {
    intro:
      'O Card agrupa conteúdo relacionado numa superfície com borda: métricas, produtos, perfis, planos, notificações. As variantes combinam `CardHeader`, `CardContent` e `CardFooter` com outros primitivos para os casos mais comuns de dashboards e páginas de marketing.',
    faq: [
      { q: 'Quais partes o Card tem?', a: '`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction` (ação no canto do cabeçalho), `CardContent` e `CardFooter`. Todas são opcionais.' },
      { q: 'Como deixo o card inteiro clicável?', a: 'Coloque um `Link` no título com um pseudo-elemento cobrindo o card (`after:absolute after:inset-0`) e `relative` no Card. Assim o link continua acessível e os botões internos seguem clicáveis com `relative z-10`.' },
      { q: 'Como faço uma grade de cards responsiva?', a: 'Use `grid gap-4 sm:grid-cols-2 lg:grid-cols-3` no contêiner. Para alturas iguais, os cards já esticam; use `mt-auto` no `CardFooter` para alinhar as ações.' },
    ],
  },
  Table: {
    intro:
      'O Table renderiza dados tabulares com marcação semântica (`table`, `thead`, `tbody`) e estilo do tema. As variantes trazem status com Badge, ações por linha, rodapé com totais e rolagem horizontal no mobile.',
    faq: [
      { q: 'Table ou Data Table?', a: 'O Table é só a apresentação. Para ordenação, filtros, paginação e seleção, veja a categoria Data Table, que combina o Table com o TanStack Table.' },
      { q: 'Como evito que a tabela quebre o layout no mobile?', a: 'O primitivo já envolve a tabela num contêiner com `overflow-x-auto`. Use `whitespace-nowrap` nas colunas que não devem quebrar linha.' },
      { q: 'Como alinho números à direita?', a: 'Aplique `text-right` no `TableHead` e no `TableCell` da coluna, e `tabular-nums` para os dígitos ficarem alinhados.' },
    ],
  },
  Tabs: {
    intro:
      'O Tabs alterna entre painéis de conteúdo no mesmo lugar, sem trocar de página. As variantes cobrem abas em linha, pills, verticais, com ícones e com contadores, todas navegáveis pelo teclado com as setas.',
    faq: [
      { q: 'Como deixo uma aba aberta por padrão?', a: 'Passe `defaultValue` ao `Tabs` com o `value` da aba. Para controlar pelo estado, use `value` e `onValueChange`.' },
      { q: 'Como faço abas verticais?', a: 'Use `orientation="vertical"` no `Tabs`; o `TabsList` passa a empilhar os gatilhos e as setas para cima/baixo navegam entre eles.' },
      { q: 'Tabs servem para navegação entre páginas?', a: 'Para rotas diferentes, prefira links (um Navigation Menu ou uma barra de links com estado ativo). Tabs são para painéis dentro da mesma página.' },
    ],
  },
  Select: {
    intro:
      'O Select escolhe uma opção numa lista fechada, com popup posicionado, grupos, separadores e ícones. Para listas grandes ou com busca, combine com o Combobox.',
    faq: [
      { q: 'Select, Native Select ou Combobox?', a: 'Use o Select para até umas 15 opções com visual próprio; o Native Select quando quer o seletor do sistema (bom no mobile); e o Combobox quando a lista é longa e precisa de busca.' },
      { q: 'Como mostro um placeholder?', a: 'Passe `placeholder` ao `SelectValue`; ele aparece enquanto nenhum valor estiver selecionado.' },
      { q: 'Como uso o Select num formulário?', a: 'Dê um `name` ao `Select` para enviar o valor num `<form>` nativo, ou controle com `value` e `onValueChange` (no React Hook Form, pelo `Controller`).' },
    ],
  },
  Accordion: {
    intro:
      'O Accordion empilha seções que abrem e fecham, ideal para FAQ, configurações e listas longas onde só parte do conteúdo importa de cada vez. A animação de altura e a navegação pelo teclado vêm do primitivo.',
    faq: [
      { q: 'Como permito várias seções abertas ao mesmo tempo?', a: 'No Base UI, passe `multiple` ao `Accordion`. Sem ele, abrir uma seção fecha a anterior.' },
      { q: 'Como deixo uma seção aberta por padrão?', a: 'Use `defaultValue` com uma lista dos `value` dos itens, por exemplo `defaultValue={["item-1"]}`.' },
      { q: 'Accordion ou Collapsible?', a: 'O Collapsible controla uma única área recolhível. O Accordion coordena várias seções e cuida da navegação entre os cabeçalhos.' },
    ],
  },
  Badge: {
    intro:
      'O Badge é um rótulo curto para status, categorias, contadores e tags. As variantes usam as cores do tema e combinam ícones, pontos de status e versões removíveis.',
    faq: [
      { q: 'Quais variantes o Badge tem?', a: '`default`, `secondary`, `outline`, `destructive`, `ghost` e `link`. Para cores de status (sucesso, aviso), use `className` com tokens ou classes de cor com transparência, como `bg-emerald-500/15 text-emerald-600`.' },
      { q: 'Como transformo o Badge em link?', a: 'Use `render`: `<Badge render={<Link href="/tags/react" />}>React</Badge>`.' },
      { q: 'Como coloco um ícone no Badge?', a: 'Coloque o ícone do lucide antes do texto com `data-icon="inline-start"`; o primitivo ajusta o tamanho e o espaçamento.' },
    ],
  },
  Avatar: {
    intro:
      'O Avatar mostra a foto de uma pessoa ou marca, com iniciais como fallback enquanto a imagem carrega ou quando ela falha. As variantes incluem tamanhos, indicador de status online e grupos sobrepostos com contador.',
    faq: [
      { q: 'O que aparece se a imagem não carregar?', a: 'O `AvatarFallback` (normalmente as iniciais) aparece enquanto a imagem carrega e fica no lugar se ela falhar.' },
      { q: 'Como faço um grupo de avatares sobrepostos?', a: 'Coloque os avatares num `flex -space-x-2` e dê `ring-2 ring-background` a cada um para separar as bordas. Feche com um avatar de contador (+3).' },
      { q: 'Como mudo o tamanho?', a: 'Use `size-8`, `size-10` etc. no `Avatar`. Para avatares quadrados, troque o arredondamento com `rounded-lg` no Avatar e na imagem.' },
    ],
  },
  Calendar: {
    intro:
      'O Calendar exibe um mês navegável para escolher uma data, um intervalo ou várias datas, construído sobre o react-day-picker com o visual do tema. Para seleção num campo de formulário, veja o Date Picker.',
    faq: [
      { q: 'Como seleciono um intervalo de datas?', a: 'Use `mode="range"` com `selected` e `onSelect` tipados como `DateRange`. Com `numberOfMonths={2}`, dois meses ficam lado a lado.' },
      { q: 'Como deixo o calendário em português?', a: 'Importe `ptBR` de `date-fns/locale` (ou `react-day-picker/locale`) e passe em `locale`. Os nomes de mês e dia da semana mudam junto.' },
      { q: 'Como desabilito datas passadas?', a: 'Passe `disabled={{ before: new Date() }}`. Também aceita funções e listas de datas.' },
    ],
  },
  Chart: {
    intro:
      'O Chart envolve o recharts com `ChartContainer`, tooltip e legenda no estilo do shadcn/ui, e as cores vêm de variáveis CSS (`--chart-1` a `--chart-5`), então os gráficos acompanham o tema claro e escuro. As variantes cobrem área, barras, linha, pizza, radar e radial.',
    faq: [
      { q: 'Como defino as cores das séries?', a: 'No `ChartConfig`, cada série recebe `color: "var(--chart-1)"`. Nos elementos do recharts, use `fill="var(--color-<chave>)"`, gerado pelo `ChartContainer`.' },
      { q: 'Por que meu gráfico não aparece?', a: 'O recharts precisa de altura: dê ao `ChartContainer` uma altura (`h-64`) ou uma proporção (`aspect-video`).' },
      { q: 'Preciso instalar o recharts?', a: 'Sim. O comando do CLI já instala o `recharts` e o primitivo `chart` do shadcn como dependências do item.' },
    ],
  },
};

const B = (name: string, group: string, description: string, order: number): CategoryDef => ({ kind: 'BLOCK', name, group, description, order });
const C = (name: string, description: string, order: number): CategoryDef => ({ kind: 'COMPONENT', name, description, order, ...COMPONENT_DOCS[name] });
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
