// Entradas de conteúdo (fragmento "wave2-marketing-c" — segunda onda). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── FAQ ──
  { file: 'blocks/faq/faq-com-busca-em-tempo-real.tsx', name: 'FAQ com busca em tempo real', kind: 'BLOCK', category: 'FAQ', description: 'Campo de busca que filtra as perguntas enquanto digita, destaca o termo encontrado nos cards e mostra estado vazio com ações.', tags: ['faq', 'busca', 'filtro', 'empty'], featured: true },
  { file: 'blocks/faq/faq-com-categorias-laterais.tsx', name: 'FAQ com categorias laterais', kind: 'BLOCK', category: 'FAQ', description: 'Menu lateral com ícones e contagem (chips roláveis no mobile) que troca o grupo de perguntas em acordeão, com card de contato.', tags: ['faq', 'categorias', 'acordeao', 'menu-lateral'] },

  // ── Logo Cloud ──
  { file: 'blocks/logo-cloud/logo-cloud-em-duas-faixas-opostas.tsx', name: 'Logo cloud em duas faixas opostas', kind: 'BLOCK', category: 'Logo Cloud', description: 'Faixa de wordmarks tipográficos rolando para um lado e faixa de tiles com marcas em SVG rolando para o outro, com fade nas bordas.', tags: ['logos', 'marquee', 'motion', 'clientes'] },
  { file: 'blocks/logo-cloud/logo-cloud-com-depoimento-curto.tsx', name: 'Logo cloud com depoimento curto', kind: 'BLOCK', category: 'Logo Cloud', description: 'Citação curta com estrelas e autor em card ao lado de uma grade de seis logos em tiles com hover.', tags: ['logos', 'depoimento', 'prova-social'] },

  // ── Navbar ──
  { file: 'blocks/navbar/navbar-com-busca-e-avatar.tsx', name: 'Navbar com busca e avatar', kind: 'BLOCK', category: 'Navbar', description: 'Busca central em pílula com atalho ⌘K em Kbd, sino com indicador e avatar que abre DropdownMenu de conta com atalhos.', tags: ['navbar', 'busca', 'kbd', 'dropdown'], featured: true },
  { file: 'blocks/navbar/navbar-transparente-sobre-hero.tsx', name: 'Navbar transparente sobre hero', kind: 'BLOCK', category: 'Navbar', description: 'Navbar sem fundo sobre um hero escuro com gradiente e grade, e um switch que simula a versão rolada com fundo e blur.', tags: ['navbar', 'hero', 'transparente', 'dark'], previewHeight: 720 },
  { file: 'blocks/navbar/navbar-com-barra-de-anuncio.tsx', name: 'Navbar com barra de anúncio', kind: 'BLOCK', category: 'Navbar', description: 'Faixa de anúncio em primária com três mensagens navegáveis por setas e contador, fechável, sobre a navegação com badge.', tags: ['navbar', 'anuncio', 'banner', 'carrossel'] },
  { file: 'blocks/navbar/navbar-de-documentacao.tsx', name: 'Navbar de documentação', kind: 'BLOCK', category: 'Navbar', description: 'Logo com sufixo Docs, seletor de versão, busca com ⌘K, GitHub e tema, mais linha de seções com sublinhado ativo e status da API.', tags: ['navbar', 'docs', 'versao', 'busca'] },

  // ── Footer ──
  { file: 'blocks/footer/footer-com-status-e-idioma.tsx', name: 'Footer com status e idioma', kind: 'BLOCK', category: 'Footer', description: 'Painel de status por serviço com ponto pulsante e uptime, três colunas de links e barra final com idioma em NativeSelect e tema.', tags: ['footer', 'status', 'idioma', 'tema'] },
  { file: 'blocks/footer/footer-centralizado-minimalista.tsx', name: 'Footer centralizado minimalista', kind: 'BLOCK', category: 'Footer', description: 'Marca, tagline, links e redes em botões redondos empilhados ao centro, com separador curto e linha legal discreta.', tags: ['footer', 'minimalista', 'centralizado'] },

  // ── Cookies ──
  { file: 'blocks/cookies/cookies-em-card-flutuante.tsx', name: 'Cookies em card flutuante', kind: 'BLOCK', category: 'Cookies', description: 'Card compacto no canto inferior esquerdo de um blog simulado, com dois botões, link de preferências e chip de estado após a escolha.', tags: ['cookies', 'card', 'consentimento', 'lgpd'] },

  // ── Comparativo ──
  { file: 'blocks/comparativo/comparativo-de-tres-opcoes-em-cards.tsx', name: 'Comparativo de três opções em cards', kind: 'BLOCK', category: 'Comparativo', description: 'Fazer por conta, agência e a nossa opção lado a lado com custo, prazo e recursos em três estados (sim, parcial, não), com o card recomendado elevado.', tags: ['comparativo', 'cards', 'agencia', 'diy'] },
  { file: 'blocks/comparativo/comparativo-com-slider-antes-e-depois.tsx', name: 'Comparativo com slider antes e depois', kind: 'BLOCK', category: 'Comparativo', description: 'Dois mockups de inbox sobrepostos revelados por arraste ou pelo Slider, com métricas que mudam de ênfase conforme a posição.', tags: ['comparativo', 'slider', 'antes-depois', 'interativo'], featured: true },

  // ── Banner ──
  { file: 'blocks/banner/banner-de-lancamento-com-gradiente.tsx', name: 'Banner de lançamento com gradiente', kind: 'BLOCK', category: 'Banner', description: 'Faixa alta em gradiente azul-violeta com brilhos animados, chamada de lançamento, dois CTAs e mini mockup da sugestão do copiloto.', tags: ['banner', 'lancamento', 'gradiente', 'motion'] },
  { file: 'blocks/banner/banner-de-aviso-de-manutencao.tsx', name: 'Banner de aviso de manutenção', kind: 'BLOCK', category: 'Banner', description: 'Aviso âmbar com contagem até a janela de manutenção, painel expansível com impacto por serviço e link para a página de status.', tags: ['banner', 'manutencao', 'aviso', 'countdown'] },

  // ── Agenda ──
  { file: 'blocks/agenda/agenda-com-fuso-horario-e-duracao.tsx', name: 'Agenda com fuso horário e duração', kind: 'BLOCK', category: 'Agenda', description: 'Duração (15, 30 ou 60 min) e fuso em NativeSelect que recalculam os horários disponíveis, faixa de dias e resumo com confirmação.', tags: ['agenda', 'fuso', 'duracao', 'agendamento'] },

  // ── Chat IA ──
  { file: 'blocks/chat-ia/chat-ia-com-historico-lateral.tsx', name: 'Chat IA com histórico lateral', kind: 'BLOCK', category: 'Chat IA', description: 'Lista de conversas agrupadas por dia com busca e nova conversa ao lado do chat, trocando o histórico ao clicar e aceitando novas mensagens.', tags: ['chat', 'ia', 'historico', 'sidebar'], previewHeight: 760 },
  { file: 'blocks/chat-ia/chat-ia-com-fontes-citadas.tsx', name: 'Chat IA com fontes citadas', kind: 'BLOCK', category: 'Chat IA', description: 'Resposta com citações numeradas inline que destacam os cards de fonte correspondentes ao passar o mouse ou clicar.', tags: ['chat', 'ia', 'citacoes', 'fontes'] },

  // ── Erro ──
  { file: 'blocks/erro/erro-de-acesso-negado-403.tsx', name: 'Erro de acesso negado 403', kind: 'BLOCK', category: 'Erro', description: 'Cadeado flutuando em anéis com borda girando, card com a conta atual e o papel exigido, e botão de solicitar acesso com estado enviado.', tags: ['erro', '403', 'permissao'] },
  { file: 'blocks/erro/erro-de-sessao-expirada.tsx', name: 'Erro de sessão expirada', kind: 'BLOCK', category: 'Erro', description: 'App desfocado ao fundo e card central com a conta reconhecida, campo de senha com mostrar/ocultar e reentrada rápida.', tags: ['erro', 'sessao', 'login', 'overlay'] },

  // ── Autenticação ──
  { file: 'blocks/autenticacao/login-com-magic-link.tsx', name: 'Login com magic link', kind: 'BLOCK', category: 'Autenticação', description: 'Card com topo em gradiente pontilhado e ícone animado, campo de e-mail e estado enviado com atalhos para Gmail e Outlook e reenvio com contagem.', tags: ['login', 'magic-link', 'auth', 'e-mail'] },
  { file: 'blocks/autenticacao/login-com-selecao-de-workspace.tsx', name: 'Login com seleção de workspace', kind: 'BLOCK', category: 'Autenticação', description: 'Lista de workspaces com avatar colorido, membros, papel e convite pendente; seleção com anel e botão que entra mostrando spinner.', tags: ['login', 'workspace', 'auth', 'radio'] },

  // ── Processo ──
  { file: 'blocks/processo/processo-em-timeline-vertical-com-icones.tsx', name: 'Processo em timeline vertical com ícones', kind: 'BLOCK', category: 'Processo', description: 'Linha vertical em gradiente com nós de ícone, marcador de dia, entregas em chips e card fixo com o resultado ao final de 30 dias.', tags: ['processo', 'timeline', 'etapas', 'implantacao'] },
];
