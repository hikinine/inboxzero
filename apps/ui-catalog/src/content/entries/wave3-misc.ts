// Entradas de conteúdo (fragmento "wave3-misc" — terceira onda).
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Button ──
  { file: 'components/button/botoes-animados-shimmer-borda.tsx', name: 'Botões animados com shimmer e borda', kind: 'COMPONENT', category: 'Button', description: 'Shimmer que atravessa o botão, borda em gradiente cônico girando, botão magnético que segue o mouse e ripple no clique.', tags: ['button', 'animado', 'motion', 'shimmer'], featured: true },
  { file: 'components/button/botoes-feedback-de-acao.tsx', name: 'Botões com feedback de ação', kind: 'COMPONENT', category: 'Button', description: 'Copiar com troca para “Copiado ✓”, envio que passa por carregando e sucesso, e exclusão que só confirma segurando.', tags: ['button', 'feedback', 'loading', 'motion'] },
  // ── Date Picker ──
  { file: 'components/date-picker/date-picker-data-hora-presets.tsx', name: 'Seletor de data e hora com presets', kind: 'COMPONENT', category: 'Date Picker', description: 'Popover com atalhos (“Amanhã às 9h”, “Sexta às 14h”), calendário em pt-BR e grade de horários, mais a versão inline.', tags: ['date-picker', 'horario', 'presets', 'agendamento'], featured: true },
  // ── Input ──
  { file: 'components/input/inputs-mascara-brasileira.tsx', name: 'Inputs com máscara brasileira', kind: 'COMPONENT', category: 'Input', description: 'CPF, CNPJ, CEP com busca de endereço, telefone fixo/celular e valor em R$, com validação visual campo a campo.', tags: ['input', 'mascara', 'cpf', 'validacao'] },
  // ── List ──
  { file: 'components/list/lista-ordenavel-com-alca.tsx', name: 'Lista ordenável com alça', kind: 'COMPONENT', category: 'List', description: 'Prioridades do sprint reordenadas com Reorder do motion pela alça ou pelas setas do teclado, e chips de colunas na horizontal.', tags: ['list', 'drag-and-drop', 'reorder', 'teclado'] },
  // ── Badge ──
  { file: 'components/badge/badges-animados-status.tsx', name: 'Badges animados de status', kind: 'COMPONENT', category: 'Badge', description: 'Pontos pulsando por serviço, contadores com número que rola ao incrementar e status que troca de etapa sozinho.', tags: ['badge', 'status', 'animado', 'contador'] },
  // ── Card ──
  { file: 'components/card/cards-hover-3d-brilho.tsx', name: 'Cards com hover 3D e brilho', kind: 'COMPONENT', category: 'Card', description: 'Cartão que inclina em 3D seguindo o mouse com reflexo de luz, e cards com spotlight na borda e no fundo.', tags: ['card', '3d', 'hover', 'spotlight'], featured: true },
  // ── Tabs ──
  { file: 'components/tabs/tabs-indicador-deslizante.tsx', name: 'Tabs com indicador deslizante', kind: 'COMPONENT', category: 'Tabs', description: 'Indicador que desliza entre as abas com layoutId: pill, sublinhado com contador e bloco com ícone e conteúdo animado.', tags: ['tabs', 'layoutid', 'motion', 'indicador'] },
  // ── Accordion ──
  { file: 'components/accordion/accordion-altura-animada.tsx', name: 'Accordion com animação de altura e ícone girando', kind: 'COMPONENT', category: 'Accordion', description: 'Altura animada com mola: FAQ com “+” que gira até virar “×” e configurações com chevron girando e opções em cascata.', tags: ['accordion', 'motion', 'animado', 'faq'] },
  // ── Progress ──
  { file: 'components/progress/progress-etapas-confete.tsx', name: 'Progress com etapas animadas e confete simples', kind: 'COMPONENT', category: 'Progress', description: 'Configuração de loja em cinco etapas com porcentagem que conta, linha que preenche, etapa atual pulsando e confete ao concluir.', tags: ['progress', 'etapas', 'confete', 'motion'] },
  // ── Tooltip ──
  { file: 'components/tooltip/tooltip-rico-midia-acoes.tsx', name: 'Tooltip rico com mídia e ações', kind: 'COMPONENT', category: 'Tooltip', description: 'Tooltips em formato de cartão: perfil com capa e botões, prévia de vídeo com ações e arquivo com miniatura e atalho.', tags: ['tooltip', 'hover', 'preview', 'perfil'] },
  // ── Avatar ──
  { file: 'components/avatar/avatares-empilhados-expansao.tsx', name: 'Avatares empilhados com expansão no hover', kind: 'COMPONENT', category: 'Avatar', description: 'Pilha que abre em leque no hover, efeito dock com nome do avatar em destaque e contador +N que expande o grupo.', tags: ['avatar', 'grupo', 'hover', 'motion'] },
  // ── Páginas · Landing ──
  { file: 'pages/landing/landing-de-restaurante.tsx', name: 'Landing de restaurante', kind: 'PAGE', category: 'Landing', description: 'Restaurante brasileiro com prato ilustrado e vapor animado, cardápio em abas, reserva com data e pessoas, depoimentos, mapa em SVG e footer.', tags: ['landing', 'restaurante', 'reservas', 'cardapio'], featured: true, previewHeight: 900 },
  { file: 'pages/landing/landing-de-agente-de-ia.tsx', name: 'Landing de agente de IA', kind: 'PAGE', category: 'Landing', description: 'Agente que vende no WhatsApp: hero com chat animado executando ferramentas, casos de uso interativos, órbita de integrações, preços e FAQ.', tags: ['landing', 'ia', 'agente', 'chat'], previewHeight: 900 },
  { file: 'pages/landing/landing-de-app-de-financas.tsx', name: 'Landing de app de finanças', kind: 'PAGE', category: 'Landing', description: 'Conta digital com três celulares em leque, features em cards de gradiente, faixa escura de segurança, depoimentos em masonry e download com QR code.', tags: ['landing', 'financas', 'app', 'mobile'], previewHeight: 900 },
  // ── Páginas · App ──
  { file: 'pages/dashboard/plataforma-de-cursos.tsx', name: 'Plataforma de cursos', kind: 'PAGE', category: 'Dashboard', description: 'App de cursos (LMS) com trilho de ícones, próxima aula em destaque, cursos com progresso filtrados por abas, meta semanal, aulas ao vivo e certificados.', tags: ['dashboard', 'lms', 'cursos', 'progresso'], previewHeight: 900 },
  { file: 'pages/autenticacao/pagina-verificacao-email.tsx', name: 'Página de verificação de e-mail', kind: 'PAGE', category: 'Autenticação', description: 'Verificação por código de 6 dígitos com envelope animado, erro com tremida, reenvio liberado por timer circular e tela de sucesso.', tags: ['autenticacao', 'otp', 'verificacao', 'email'], previewHeight: 900 },
];
