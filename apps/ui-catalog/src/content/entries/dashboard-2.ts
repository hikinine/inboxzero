// Entradas de conteúdo (fragmento "dashboard-2"). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Diálogos ──
  { file: 'blocks/dialogos/dialogo-criar-projeto.tsx', name: 'Diálogo de criar projeto', kind: 'BLOCK', category: 'Diálogos', description: 'Nome, descrição e visibilidade em radio cards; gatilho real e versão inline do modal.', tags: ['dialog', 'form', 'projeto'] },
  { file: 'blocks/dialogos/dialogo-convidar-membros.tsx', name: 'Diálogo de convidar membros', kind: 'BLOCK', category: 'Diálogos', description: 'E-mails em chips com Enter/vírgula, papel por convite e lista de quem já foi convidado.', tags: ['dialog', 'convite', 'equipe'] },
  { file: 'blocks/dialogos/dialogo-compartilhar-link.tsx', name: 'Diálogo de compartilhar link', kind: 'BLOCK', category: 'Diálogos', description: 'Link com botão de copiar, acesso geral com switch e permissão, e pessoas com acesso.', tags: ['dialog', 'compartilhar', 'permissoes'] },
  { file: 'blocks/dialogos/dialogo-upgrade-plano.tsx', name: 'Diálogo de upgrade de plano', kind: 'BLOCK', category: 'Diálogos', description: 'Starter × Pro lado a lado, toggle mensal/anual e CTA de upgrade.', tags: ['dialog', 'upgrade', 'pricing'] },
  // ── Dropdowns ──
  { file: 'blocks/dropdowns/dropdown-usuario.tsx', name: 'Dropdown de usuário', kind: 'BLOCK', category: 'Dropdowns', description: 'Avatar com status, e-mail, grupos de ações com atalhos em Kbd e sair em destaque; menu real na topbar.', tags: ['dropdown', 'usuario', 'menu'] },
  { file: 'blocks/dropdowns/dropdown-notificacoes.tsx', name: 'Dropdown de notificações', kind: 'BLOCK', category: 'Dropdowns', description: 'Sino com contador, lista com avatar ou ícone, tempo relativo, ponto de não lida e marcar todas.', tags: ['dropdown', 'notificacoes', 'inbox'] },
  { file: 'blocks/dropdowns/dropdown-filtros.tsx', name: 'Dropdown de filtros', kind: 'BLOCK', category: 'Dropdowns', description: 'Checkboxes de status, prioridade e responsável, chips dos filtros ativos e aplicar com contagem.', tags: ['dropdown', 'filtros', 'checkbox'] },
  // ── Formulário multi-etapas ──
  { file: 'blocks/formulario-multi-etapas/multi-etapas-onboarding.tsx', name: 'Multi-etapas de onboarding', kind: 'BLOCK', category: 'Formulário multi-etapas', description: 'Stepper de 3 passos (perfil, empresa, convidar) com Progress, navegação e tela de conclusão.', tags: ['stepper', 'onboarding', 'form'] },
  { file: 'blocks/formulario-multi-etapas/multi-etapas-checkout.tsx', name: 'Multi-etapas de checkout', kind: 'BLOCK', category: 'Formulário multi-etapas', description: 'Endereço → pagamento (cartão, Pix, boleto) → revisão, com stepper lateral e resumo do pedido.', tags: ['stepper', 'checkout', 'pagamento'] },
  // ── Layout de formulário ──
  { file: 'blocks/layout-de-formulario/formulario-duas-colunas.tsx', name: 'Formulário em duas colunas', kind: 'BLOCK', category: 'Layout de formulário', description: 'Field/FieldGroup em grade de duas colunas num card, com campos largos e rodapé de ações.', tags: ['form', 'layout', 'field'] },
  { file: 'blocks/layout-de-formulario/formulario-em-secoes.tsx', name: 'Formulário em seções', kind: 'BLOCK', category: 'Layout de formulário', description: 'Título e descrição à esquerda, campos à direita, seções separadas por divisórias.', tags: ['form', 'layout', 'secoes'] },
  // ── Configurações de conta ──
  { file: 'blocks/configuracoes-de-conta/configuracoes-perfil-senha.tsx', name: 'Configurações de perfil e senha', kind: 'BLOCK', category: 'Configurações de conta', description: 'Cards de perfil com avatar, senha com medidor de força e sessões ativas com encerrar.', tags: ['settings', 'perfil', 'senha'] },
  { file: 'blocks/configuracoes-de-conta/configuracoes-notificacoes.tsx', name: 'Configurações de notificações', kind: 'BLOCK', category: 'Configurações de conta', description: 'Matriz de Switch e-mail/push por evento, agrupada, com pausar tudo e alternar coluna.', tags: ['settings', 'notificacoes', 'switch'] },
  { file: 'blocks/configuracoes-de-conta/configuracoes-cobranca.tsx', name: 'Configurações de cobrança', kind: 'BLOCK', category: 'Configurações de conta', description: 'Plano atual com uso, cartão cadastrado e histórico de faturas em tabela.', tags: ['settings', 'cobranca', 'faturas'] },
  // ── Upload ──
  { file: 'blocks/upload/upload-dropzone.tsx', name: 'Upload com dropzone', kind: 'BLOCK', category: 'Upload', description: 'Área tracejada com estado de arrasto, tipos aceitos, lista dos selecionados e botão.', tags: ['upload', 'dropzone', 'arquivos'] },
  { file: 'blocks/upload/upload-lista-progresso.tsx', name: 'Upload com lista de progresso', kind: 'BLOCK', category: 'Upload', description: 'Lista de arquivos com Progress animado, tamanho, concluído, erro com tentar de novo e cancelar.', tags: ['upload', 'progress', 'arquivos'] },
  // ── Onboarding ──
  { file: 'blocks/onboarding/onboarding-checklist.tsx', name: 'Onboarding checklist', kind: 'BLOCK', category: 'Onboarding', description: 'Cinco passos com Checkbox e progresso, um expandido com CTA, mais card da especialista.', tags: ['onboarding', 'checklist', 'progress'] },
  { file: 'blocks/onboarding/onboarding-dicas.tsx', name: 'Onboarding com dicas', kind: 'BLOCK', category: 'Onboarding', description: 'Feed de cards de dicas com ícone, texto, ação e dispensar animado; restaurar quando vazio.', tags: ['onboarding', 'dicas', 'motion'] },
  // ── Estado vazio ──
  { file: 'blocks/estado-vazio/estado-vazio-inbox.tsx', name: 'Estado vazio de inbox', kind: 'BLOCK', category: 'Estado vazio', description: 'Painel de app com pastas à esquerda e Empty com ícone, texto e ações na área principal.', tags: ['empty', 'inbox', 'app'] },
  { file: 'blocks/estado-vazio/estado-vazio-ilustracao.tsx', name: 'Estado vazio com ilustração', kind: 'BLOCK', category: 'Estado vazio', description: 'Caixa aberta com documentos flutuando em SVG animado, título, texto, botões e modelos.', tags: ['empty', 'ilustracao', 'motion'] },
  // ── Inbox ──
  { file: 'blocks/inbox/inbox-emails.tsx', name: 'Inbox de e-mails', kind: 'BLOCK', category: 'Inbox', description: 'Lista com remetente, assunto, prévia, hora e não lido à esquerda; leitura com ações, anexos e resposta à direita.', tags: ['inbox', 'email', 'app'], featured: true, previewHeight: 820 },
  // ── Kanban ──
  { file: 'blocks/kanban/quadro-kanban.tsx', name: 'Quadro kanban', kind: 'BLOCK', category: 'Kanban', description: 'Quatro colunas com contagem, cards com tags, prazo, comentários e avatar; mover e adicionar cartão.', tags: ['kanban', 'tarefas', 'board'], featured: true, previewHeight: 820 },
  // ── Calendário ──
  { file: 'blocks/calendario/calendario-mensal-eventos.tsx', name: 'Calendário mensal de eventos', kind: 'BLOCK', category: 'Calendário', description: 'Grade do mês com eventos coloridos, hoje em destaque, navegação entre meses e “+n mais”.', tags: ['calendario', 'eventos', 'agenda'], previewHeight: 860 },
  // ── Workflow ──
  { file: 'blocks/workflow/construtor-workflow.tsx', name: 'Construtor de workflow', kind: 'BLOCK', category: 'Workflow', description: 'Nós de gatilho, condição e ações ligados por curvas SVG com Sim/Não, e painel de propriedades do nó selecionado.', tags: ['workflow', 'automacao', 'builder'], featured: true, previewHeight: 760 },
  // ── Multi view ──
  { file: 'blocks/multi-view/alternancia-lista-grade.tsx', name: 'Alternância lista e grade', kind: 'BLOCK', category: 'Multi view', description: 'ToggleGroup lista/grade/tabela trocando a visualização das mesmas campanhas.', tags: ['toggle-group', 'lista', 'grade', 'tabela'] },
  // ── Gantt ──
  { file: 'blocks/gantt/gantt-projeto.tsx', name: 'Gantt de projeto', kind: 'BLOCK', category: 'Gantt', description: 'Tarefas agrupadas com barras por semana e progresso interno, marco em losango e linha de hoje.', tags: ['gantt', 'cronograma', 'projeto'], previewHeight: 760 },
  // ── Mapa ──
  { file: 'blocks/mapa/mapa-com-pins.tsx', name: 'Mapa com pins', kind: 'BLOCK', category: 'Mapa', description: 'Mapa SVG estilizado com rotas, pins pulsando em motion e cards de unidades que selecionam o pin.', tags: ['mapa', 'pins', 'motion'], previewHeight: 760 },
];
