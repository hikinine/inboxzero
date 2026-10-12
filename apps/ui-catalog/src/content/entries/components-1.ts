// Entradas de conteúdo (fragmento "components-1"). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Accordion ──
  { file: 'components/accordion/accordion-faq.tsx', name: 'Accordion de FAQ', kind: 'COMPONENT', category: 'Accordion', description: 'Perguntas frequentes com um painel aberto por vez e variação com vários abertos (multiple).', tags: ['accordion', 'faq'] },
  { file: 'components/accordion/accordion-com-icones.tsx', name: 'Accordion com ícones', kind: 'COMPONENT', category: 'Accordion', description: 'Ícone lucide em caixa com título e descrição por item, e versão compacta com ícone à esquerda.', tags: ['accordion', 'icones'] },
  { file: 'components/accordion/accordion-em-cards.tsx', name: 'Accordion em cards', kind: 'COMPONENT', category: 'Accordion', description: 'Cada item num card com borda; o aberto ganha borda primária ou fundo, com badge de status.', tags: ['accordion', 'cards'] },
  // ── Alert ──
  { file: 'components/alert/alert-com-acoes.tsx', name: 'Alert com ações', kind: 'COMPONENT', category: 'Alert', description: 'Alertas com botão de desfazer (interativo), link de detalhes e ações no rodapé.', tags: ['alert', 'acoes', 'feedback'] },
  { file: 'components/alert/alert-com-lista.tsx', name: 'Alert com lista', kind: 'COMPONENT', category: 'Alert', description: 'Erro com lista de problemas, pendências numeradas e resumo de importação em lista.', tags: ['alert', 'lista', 'erro'] },
  // ── Alert Dialog ──
  { file: 'components/alert-dialog/alert-dialog-exclusao.tsx', name: 'Alert dialog de exclusão', kind: 'COMPONENT', category: 'Alert Dialog', description: 'Gatilhos de excluir e cancelar assinatura, mais a versão inline de como o diálogo aparece.', tags: ['alert-dialog', 'exclusao', 'confirmacao'] },
  // ── Aspect Ratio ──
  { file: 'components/aspect-ratio/aspect-ratio-midia.tsx', name: 'Aspect ratio de mídia', kind: 'COMPONENT', category: 'Aspect Ratio', description: 'Vídeo 16:9 com play, foto 4:3 e perfil 1:1 com placeholders em gradiente.', tags: ['aspect-ratio', 'midia', 'video'] },
  // ── Autocomplete ──
  { file: 'components/autocomplete/autocomplete-cidades.tsx', name: 'Autocomplete de cidades', kind: 'COMPONENT', category: 'Autocomplete', description: 'Input que filtra cidades brasileiras ignorando acentos, com destaque do trecho digitado e navegação por teclado.', tags: ['autocomplete', 'busca', 'cidades'] },
  // ── Avatar ──
  { file: 'components/avatar/avatar-tamanhos-grupos.tsx', name: 'Avatar tamanhos e grupos', kind: 'COMPONENT', category: 'Avatar', description: 'Tamanhos sm/default/lg, fallbacks com iniciais, ícone e gradiente, e grupos com contagem.', tags: ['avatar', 'grupo', 'tamanhos'], featured: true },
  { file: 'components/avatar/avatar-com-status.tsx', name: 'Avatar com status', kind: 'COMPONENT', category: 'Avatar', description: 'AvatarBadge de presença (online, ausente, ocupado, offline), badge com ícone ou contagem e lista da equipe.', tags: ['avatar', 'status', 'presenca'] },
  // ── Badge ──
  { file: 'components/badge/badge-variantes.tsx', name: 'Badge variantes', kind: 'COMPONENT', category: 'Badge', description: 'Todas as variantes, com ícone, pílulas de contagem em botões e tags removíveis.', tags: ['badge', 'variantes', 'contador'] },
  // ── Breadcrumb ──
  { file: 'components/breadcrumb/breadcrumb-com-dropdown.tsx', name: 'Breadcrumb com dropdown', kind: 'COMPONENT', category: 'Breadcrumb', description: 'Caminho recolhido em reticências com DropdownMenu, item do meio com menu de irmãos e versão com ícones e barra.', tags: ['breadcrumb', 'dropdown', 'navegacao'] },
  // ── Button ──
  { file: 'components/button/botoes-icones-loading.tsx', name: 'Botões com ícones e loading', kind: 'COMPONENT', category: 'Button', description: 'Ícone no início e no fim, só ícone em quatro tamanhos, loading com Spinner (com simulação ao clicar) e desabilitados.', tags: ['button', 'icones', 'loading'], featured: true },
  { file: 'components/button/botoes-sociais.tsx', name: 'Botões sociais', kind: 'COMPONENT', category: 'Button', description: 'Google, GitHub, Apple e X com SVG inline: largura total, compactos e com divisor “ou”.', tags: ['button', 'social', 'login'] },
  // ── Button Group ──
  { file: 'components/button-group/button-group-segmentado.tsx', name: 'Button group segmentado', kind: 'COMPONENT', category: 'Button Group', description: 'Segmentos Dia/Semana/Mês/Ano com ativo, visualização com ícones, texto fixo e versão vertical.', tags: ['button-group', 'segmentado', 'toggle'] },
  { file: 'components/button-group/button-group-com-dropdown.tsx', name: 'Button group com dropdown', kind: 'COMPONENT', category: 'Button Group', description: 'Ação principal com seta que abre DropdownMenu: salvar, exportar e mesclar com separador.', tags: ['button-group', 'dropdown', 'split-button'] },
  // ── Calendar ──
  { file: 'components/calendar/calendar-intervalo.tsx', name: 'Calendar de intervalo', kind: 'COMPONENT', category: 'Calendar', description: 'Seleção de período (mode="range") em dois meses, com contagem de dias e ações.', tags: ['calendar', 'range', 'periodo'] },
  { file: 'components/calendar/calendar-com-presets.tsx', name: 'Calendar com presets', kind: 'COMPONENT', category: 'Calendar', description: 'Atalhos Hoje, Próximos 7 dias, Este mês e outros ao lado do calendário de intervalo.', tags: ['calendar', 'presets', 'periodo'] },
  // ── Card ──
  { file: 'components/card/card-notificacao.tsx', name: 'Card de notificação', kind: 'COMPONENT', category: 'Card', description: 'Mensagem, pagamento confirmado (fechável) e convite com aceitar/recusar, cada um com ícone, texto e ações.', tags: ['card', 'notificacao', 'feedback'] },
  { file: 'components/card/card-pedido.tsx', name: 'Card de pedido', kind: 'COMPONENT', category: 'Card', description: 'Pedido com etapas de entrega, itens, totais, código de rastreio copiável e status em badge.', tags: ['card', 'pedido', 'ecommerce'] },
  { file: 'components/card/card-plano.tsx', name: 'Card de plano', kind: 'COMPONENT', category: 'Card', description: 'Dois planos com preço, lista de benefícios e botão; o Pro em destaque com badge.', tags: ['card', 'plano', 'pricing'] },
  // ── Carousel ──
  { file: 'components/carousel/carousel-imagens.tsx', name: 'Carousel de imagens', kind: 'COMPONENT', category: 'Carousel', description: 'Slides em gradiente com legenda, contador, setas internas e indicadores clicáveis sincronizados com a API.', tags: ['carousel', 'imagens', 'indicadores'] },
  { file: 'components/carousel/carousel-cards.tsx', name: 'Carousel de cards', kind: 'COMPONENT', category: 'Carousel', description: 'Produtos em cards com três visíveis por vez (basis-1/3) e setas fora do trilho.', tags: ['carousel', 'cards', 'produtos'] },
  // ── Chart ──
  { file: 'components/chart/grafico-pizza.tsx', name: 'Gráfico de pizza', kind: 'COMPONENT', category: 'Chart', description: 'Donut de leads por canal com total no centro, tooltip e legenda com valores e percentuais.', tags: ['chart', 'pizza', 'recharts'] },
  { file: 'components/chart/grafico-linha-simples.tsx', name: 'Gráfico de linha simples', kind: 'COMPONENT', category: 'Chart', description: 'Uma série de visitas por dia com tooltip, badge de variação e nota de rodapé.', tags: ['chart', 'linha', 'recharts'] },
  // ── Checkbox ──
  { file: 'components/checkbox/checkbox-lista-tarefas.tsx', name: 'Checkbox lista de tarefas', kind: 'COMPONENT', category: 'Checkbox', description: 'Lista com riscado ao marcar, barra de progresso e itens com descrição e prazo.', tags: ['checkbox', 'tarefas', 'todo'] },
  { file: 'components/checkbox/checkbox-em-cards.tsx', name: 'Checkbox em cards', kind: 'COMPONENT', category: 'Checkbox', description: 'Add-ons e grade de interesses em cards selecionáveis com borda ativa.', tags: ['checkbox', 'cards', 'selecao'] },
  // ── Code Block ──
  { file: 'components/code-block/code-block-com-titulo.tsx', name: 'Code block com título', kind: 'COMPONENT', category: 'Code Block', description: 'Bloco com cabeçalho (arquivo, linguagem, copiar), linhas numeradas, destaque de linhas e tokens coloridos sem lib; mais um terminal.', tags: ['code', 'codigo', 'copiar'], featured: true },
  // ── Collapsible ──
  { file: 'components/collapsible/collapsible-detalhes.tsx', name: 'Collapsible de detalhes', kind: 'COMPONENT', category: 'Collapsible', description: 'Mostrar mais em texto, lista com itens ocultos e detalhes técnicos recolhíveis.', tags: ['collapsible', 'mostrar-mais'] },
  // ── Combobox ──
  { file: 'components/combobox/combobox-com-busca.tsx', name: 'Combobox com busca', kind: 'COMPONENT', category: 'Combobox', description: 'Campo com busca e avatares nos itens, e botão com campo de busca dentro do popup.', tags: ['combobox', 'busca', 'select'] },
  { file: 'components/combobox/combobox-multiplo.tsx', name: 'Combobox múltiplo', kind: 'COMPONENT', category: 'Combobox', description: 'Seleção múltipla em chips removíveis, com contagem e variação com iniciais.', tags: ['combobox', 'multiplo', 'chips'] },
];
