// Entradas de conteúdo (fragmento "marketing-3"). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Autenticação ──
  { file: 'blocks/autenticacao/login-split-com-painel.tsx', name: 'Login split com painel', kind: 'BLOCK', category: 'Autenticação', description: 'Formulário à esquerda e painel escuro com depoimento, brilhos em gradiente e três métricas à direita.', tags: ['login', 'auth', 'split', 'depoimento'], featured: true },
  { file: 'blocks/autenticacao/login-com-codigo-otp.tsx', name: 'Login com código OTP', kind: 'BLOCK', category: 'Autenticação', description: 'Card com InputOTP de 6 dígitos em dois grupos, botão que habilita ao completar e reenvio com contador.', tags: ['login', 'otp', 'sms', 'auth'] },
  { file: 'blocks/autenticacao/cadastro-em-duas-etapas.tsx', name: 'Cadastro em duas etapas', kind: 'BLOCK', category: 'Autenticação', description: 'Stepper de dados pessoais e empresa com barra de progresso, navegação entre etapas e estado de sucesso.', tags: ['cadastro', 'stepper', 'auth', 'form'] },
  { file: 'blocks/autenticacao/recuperar-senha.tsx', name: 'Recuperar senha', kind: 'BLOCK', category: 'Autenticação', description: 'Card minimalista com campo de e-mail, link de voltar e estado de e-mail enviado com reenvio.', tags: ['senha', 'recuperacao', 'auth'] },
  { file: 'blocks/autenticacao/redefinir-senha-com-forca.tsx', name: 'Redefinir senha com força', kind: 'BLOCK', category: 'Autenticação', description: 'Medidor de força em quatro barras coloridas e checklist de requisitos reagindo ao que é digitado.', tags: ['senha', 'forca', 'auth', 'form'] },
  { file: 'blocks/autenticacao/verificar-e-mail.tsx', name: 'Verificar e-mail', kind: 'BLOCK', category: 'Autenticação', description: 'Faixa em gradiente com envelope sobreposto, OTP de slots grandes separados e reenvio com contagem.', tags: ['e-mail', 'otp', 'verificacao', 'auth'] },
  { file: 'blocks/autenticacao/autenticacao-em-dois-fatores.tsx', name: 'Autenticação em dois fatores', kind: 'BLOCK', category: 'Autenticação', description: 'Escolha entre app autenticador e SMS em cards de RadioGroup, código OTP e opção de confiar no dispositivo.', tags: ['2fa', 'otp', 'radio', 'auth'] },

  // ── Integrações ──
  { file: 'blocks/integracoes/integracoes-em-grade-com-toggle.tsx', name: 'Integrações em grade com toggle', kind: 'BLOCK', category: 'Integrações', description: 'Oito apps em cards com ícone colorido, descrição, Switch de conexão e contador de conectadas no topo.', tags: ['integracoes', 'switch', 'grade'] },
  { file: 'blocks/integracoes/integracoes-com-busca-e-categorias.tsx', name: 'Integrações com busca e categorias', kind: 'BLOCK', category: 'Integrações', description: 'Busca por texto e navegação lateral por categoria (chips no mobile) filtrando uma lista de apps com contagem.', tags: ['integracoes', 'busca', 'filtro', 'lista'] },

  // ── Cookies ──
  { file: 'blocks/cookies/banner-de-cookies.tsx', name: 'Banner de cookies', kind: 'BLOCK', category: 'Cookies', description: 'Página simulada com barra de consentimento fixa no rodapé do bloco: aceitar, rejeitar e preferências, com animação de saída.', tags: ['cookies', 'consentimento', 'banner', 'lgpd'] },
  { file: 'blocks/cookies/modal-de-preferencias-de-cookies.tsx', name: 'Modal de preferências de cookies', kind: 'BLOCK', category: 'Cookies', description: 'Diálogo inline com switches por categoria (necessários sempre ativos), contagem de cookies e ações de salvar, aceitar e rejeitar.', tags: ['cookies', 'preferencias', 'switch', 'lgpd'] },

  // ── Chat IA ──
  { file: 'blocks/chat-ia/chat-ia-flutuante.tsx', name: 'Chat IA flutuante', kind: 'BLOCK', category: 'Chat IA', description: 'Janela de chat aberta no canto de uma página simulada, com histórico, sugestões em chips, resposta automática e botão flutuante.', tags: ['chat', 'ia', 'widget', 'flutuante'], featured: true },
  { file: 'blocks/chat-ia/widget-de-chat-ia-com-sugestoes.tsx', name: 'Widget de chat IA com sugestões', kind: 'BLOCK', category: 'Chat IA', description: 'Card central com cabeçalho do assistente, três sugestões em cards clicáveis, histórico curto e campo com microfone e enviar.', tags: ['chat', 'ia', 'sugestoes', 'assistente'] },

  // ── Comparativo ──
  { file: 'blocks/comparativo/comparativo-nos-vs-eles.tsx', name: 'Comparativo nós vs eles', kind: 'BLOCK', category: 'Comparativo', description: 'Tabela de recursos com a nossa coluna em destaque e badge, checks e X coloridos e valores em texto.', tags: ['comparativo', 'tabela', 'concorrentes'] },
  { file: 'blocks/comparativo/comparativo-antes-e-depois.tsx', name: 'Comparativo antes e depois', kind: 'BLOCK', category: 'Comparativo', description: 'Dois cards lado a lado: dores com X em card tracejado e ganhos com check em card destacado, seta entre eles.', tags: ['comparativo', 'antes-depois', 'beneficios'] },

  // ── Erro ──
  { file: 'blocks/erro/erro-404.tsx', name: 'Erro 404', kind: 'BLOCK', category: 'Erro', description: 'Número gigante em gradiente, mensagem, busca no site, botões de voltar e suporte e links populares.', tags: ['erro', '404', 'busca'] },
  { file: 'blocks/erro/erro-500.tsx', name: 'Erro 500', kind: 'BLOCK', category: 'Erro', description: 'Card com faixa de alerta, ID do erro em mono com copiar, botão tentar de novo com spinner e link para a página de status.', tags: ['erro', '500', 'status'] },
  { file: 'blocks/erro/pagina-em-manutencao.tsx', name: 'Página em manutenção', kind: 'BLOCK', category: 'Erro', description: 'Texto com previsão de retorno, progresso e campo de aviso ao lado de três engrenagens SVG girando em loop.', tags: ['erro', 'manutencao', 'svg', 'animado'] },

  // ── Agenda ──
  { file: 'blocks/agenda/agenda-de-horarios.tsx', name: 'Agenda de horários', kind: 'BLOCK', category: 'Agenda', description: 'Três colunas: anfitrião e detalhes, Calendar e slots de manhã e tarde com resumo, confirmação e estado agendado.', tags: ['agenda', 'calendario', 'horarios', 'agendamento'] },
  { file: 'blocks/agenda/agenda-semanal.tsx', name: 'Agenda semanal', kind: 'BLOCK', category: 'Agenda', description: 'Grade de sete dias por hora com eventos coloridos posicionados, dia atual destacado, linha de agora e alternador de visão.', tags: ['agenda', 'semana', 'calendario', 'eventos'] },

  // ── Videochamada ──
  { file: 'blocks/videochamada/videochamada-em-grade.tsx', name: 'Videochamada em grade', kind: 'BLOCK', category: 'Videochamada', description: 'Sala escura com seis participantes em grade, quem fala com anel e barras animadas, mudo, câmera off e barra de controles funcional.', tags: ['videochamada', 'reuniao', 'grade', 'controles'], featured: true },

  // ── Lista de espera ──
  { file: 'blocks/lista-de-espera/lista-de-espera-com-contador.tsx', name: 'Lista de espera com contador', kind: 'BLOCK', category: 'Lista de espera', description: 'Título, contador de inscritos animado com motion, formulário de e-mail com estado de sucesso e grupo de avatares.', tags: ['waitlist', 'contador', 'motion', 'newsletter'] },

  // ── Banner ──
  { file: 'blocks/banner/banner-de-anuncio-no-topo.tsx', name: 'Banner de anúncio no topo', kind: 'BLOCK', category: 'Banner', description: 'Três faixas empilhadas (novidade em primária, promoção em gradiente e aviso âmbar) com fechar animado e restaurar.', tags: ['banner', 'anuncio', 'topo', 'aviso'] },
  { file: 'blocks/banner/banner-de-promocao-com-contagem-regressiva.tsx', name: 'Banner de promoção com contagem regressiva', kind: 'BLOCK', category: 'Banner', description: 'Faixa escura com timer hh:mm:ss em caixas, CTA âmbar e navbar simulada abaixo para contexto de topo de página.', tags: ['banner', 'promocao', 'timer', 'countdown'] },
];
