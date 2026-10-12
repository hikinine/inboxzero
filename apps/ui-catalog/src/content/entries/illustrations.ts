// Entradas de conteúdo (fragmento "illustrations"). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Beam ──
  { file: 'illustrations/beam/webhook-beam.tsx', name: 'Webhook Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Um evento passa pela fila e é entregue a três destinos; pulsos percorrem os caminhos e cada destino acusa o recebimento.', tags: ['beam', 'webhook', 'fila', 'animado'] },
  { file: 'illustrations/beam/multi-source-beam.tsx', name: 'Multi Source Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Cinco origens à esquerda convergem num nó de unificação e um único feixe segue para o CRM.', tags: ['beam', 'integracoes', 'dados', 'animado'] },
  { file: 'illustrations/beam/bidirectional-beam.tsx', name: 'Bidirectional Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'App e servidor trocam feixes em sentidos opostos: requisição por cima, resposta por baixo, em cores diferentes.', tags: ['beam', 'api', 'requisicao', 'animado'] },
  { file: 'illustrations/beam/grid-network-beam.tsx', name: 'Grid Network Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Grade 3x3 de nós com feixes de ritmo aleatório percorrendo as arestas e acendendo o nó de chegada.', tags: ['beam', 'rede', 'grade', 'animado'], featured: true },

  // ── Orbit ──
  { file: 'illustrations/orbit/tech-logos-orbit.tsx', name: 'Tech Logos Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Chips com ícones de tecnologia em dois anéis contra-rotativos, cada um com rastro de cometa no anel.', tags: ['orbit', 'tecnologia', 'stack', 'animado'] },
  { file: 'illustrations/orbit/planets-orbit.tsx', name: 'Planets Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Planetas com gradiente e rótulo percorrem órbitas elípticas ao redor de um sol, passando por trás dele com profundidade.', tags: ['orbit', 'planetas', 'eliptico', 'animado'] },
  { file: 'illustrations/orbit/triple-ring-orbit.tsx', name: 'Triple Ring Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Três anéis concêntricos com arcos e contas girando em velocidades e sentidos diferentes, com núcleo pulsando.', tags: ['orbit', 'aneis', 'geometrico', 'animado'] },

  // ── Chat ──
  { file: 'illustrations/chat/typing-bubbles-chat.tsx', name: 'Typing Bubbles Chat', kind: 'ILLUSTRATION', category: 'Chat', description: 'Duas pessoas conversam com avatares alternados; o indicador de digitação aparece do lado de quem vai falar.', tags: ['chat', 'digitando', 'avatares', 'animado'] },
  { file: 'illustrations/chat/ai-streaming-chat.tsx', name: 'AI Streaming Chat', kind: 'ILLUSTRATION', category: 'Chat', description: 'Pergunta do usuário em cima e resposta da IA chegando caractere a caractere com cursor, depois de "Pensando…".', tags: ['chat', 'ia', 'streaming', 'animado'], featured: true },
  { file: 'illustrations/chat/support-chat-notifications.tsx', name: 'Support Chat Notifications', kind: 'ILLUSTRATION', category: 'Chat', description: 'Janela de atendimento com conversas entrando por deslize e contador no sino subindo a cada chegada.', tags: ['chat', 'suporte', 'notificacoes', 'animado'] },

  // ── Marquee ──
  { file: 'illustrations/marquee/testimonial-marquee.tsx', name: 'Testimonial Marquee', kind: 'ILLUSTRATION', category: 'Marquee', description: 'Duas faixas de cards de depoimento (estrelas, citação, autor) rolando em sentidos opostos com fade nas bordas.', tags: ['marquee', 'depoimentos', 'animado'] },
  { file: 'illustrations/marquee/vertical-marquee.tsx', name: 'Vertical Marquee', kind: 'ILLUSTRATION', category: 'Marquee', description: 'Três colunas de eventos rolando verticalmente, a do meio em sentido contrário, com fade no topo e na base.', tags: ['marquee', 'vertical', 'eventos', 'animado'] },
  { file: 'illustrations/marquee/tilted-marquee.tsx', name: 'Tilted Marquee', kind: 'ILLUSTRATION', category: 'Marquee', description: 'Três faixas inclinadas de tags e chips rolando em sentidos alternados, recortadas por um quadro.', tags: ['marquee', 'tags', 'inclinado', 'animado'] },

  // ── Card Stack ──
  { file: 'illustrations/card-stack/payment-card-stack.tsx', name: 'Payment Card Stack', kind: 'ILLUSTRATION', category: 'Card Stack', description: 'Cartões de crédito com gradiente ciclando: o da frente cai para fora da pilha e um novo entra por trás.', tags: ['card-stack', 'cartoes', 'pagamento', 'animado'] },
  { file: 'illustrations/card-stack/ticket-stack.tsx', name: 'Ticket Stack', kind: 'ILLUSTRATION', category: 'Card Stack', description: 'Tickets de suporte em leque com status e prioridade; o da frente sai pela esquerda e um novo entra pela direita.', tags: ['card-stack', 'tickets', 'suporte', 'animado'] },
  { file: 'illustrations/card-stack/task-card-stack.tsx', name: 'Task Card Stack', kind: 'ILLUSTRATION', category: 'Card Stack', description: 'O card de tarefa da frente é concluído (check desenhado e título riscado) e vai para o fundo da pilha.', tags: ['card-stack', 'tarefas', 'concluir', 'animado'] },

  // ── Text ──
  { file: 'illustrations/text/gradient-text-reveal.tsx', name: 'Gradient Text Reveal', kind: 'ILLUSTRATION', category: 'Text', description: 'Título grande em degradê revelado letra a letra com desfoque e subida; some na mesma ordem e recomeça.', tags: ['text', 'reveal', 'degrade', 'animado'] },
  { file: 'illustrations/text/number-count-up.tsx', name: 'Number Count Up', kind: 'ILLUSTRATION', category: 'Text', description: 'Três métricas grandes (R$, % e x) contam do zero até o valor com barra sincronizada, em loop.', tags: ['text', 'numeros', 'metricas', 'animado'] },
  { file: 'illustrations/text/scramble-text.tsx', name: 'Scramble Text', kind: 'ILLUSTRATION', category: 'Text', description: 'Palavra embaralhada com símbolos que se resolve letra a letra, ciclando entre termos.', tags: ['text', 'scramble', 'monospace', 'animado'] },

  // ── Ripple ──
  { file: 'illustrations/ripple/audio-ripple.tsx', name: 'Audio Ripple', kind: 'ILLUSTRATION', category: 'Ripple', description: 'Microfone central com ondas circulares e equalizador radial de barras pulsando, com cronômetro de gravação.', tags: ['ripple', 'audio', 'microfone', 'animado'] },
  { file: 'illustrations/ripple/pulse-button-ripple.tsx', name: 'Pulse Button Ripple', kind: 'ILLUSTRATION', category: 'Ripple', description: 'Botão "AO VIVO" com anéis em formato de pílula pulsando para fora e contador de espectadores subindo.', tags: ['ripple', 'ao-vivo', 'botao', 'animado'] },

  // ── Diversos ──
  { file: 'illustrations/diversos/dotted-globe.tsx', name: 'Dotted Globe', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Globo de pontos em projeção ortográfica girando, com arcos de conexão entre cidades e pulsos nas rotas.', tags: ['globo', 'mapa', 'conexoes', 'animado'], featured: true },
  { file: 'illustrations/diversos/terminal-typing.tsx', name: 'Terminal Typing', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Janela de terminal que digita comandos e imprime as saídas linha a linha, em loop.', tags: ['terminal', 'codigo', 'typewriter', 'animado'] },
  { file: 'illustrations/diversos/progress-rings.tsx', name: 'Progress Rings', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Três anéis concêntricos preenchendo até os valores com legenda que conta junto.', tags: ['progresso', 'aneis', 'metricas', 'animado'] },
  { file: 'illustrations/diversos/spinning-gears.tsx', name: 'Spinning Gears', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Três engrenagens engrenadas girando em sentidos opostos, com velocidade proporcional ao número de dentes.', tags: ['engrenagens', 'mecanismo', 'svg', 'animado'] },
  { file: 'illustrations/diversos/confetti-burst.tsx', name: 'Confetti Burst', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Botão "Concluído" dispara uma explosão de confetes coloridos que sobem, giram e caem, em loop.', tags: ['confete', 'sucesso', 'celebracao', 'animado'] },
  { file: 'illustrations/diversos/loading-dots.tsx', name: 'Loading Dots', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Quatro loaders num grid: pontos saltando, barra indeterminada, anel girando e skeleton pulsando.', tags: ['loading', 'spinner', 'skeleton', 'animado'] },
];
