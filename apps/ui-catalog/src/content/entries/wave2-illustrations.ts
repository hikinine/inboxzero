// Entradas de conteúdo (fragmento "wave2-illustrations" — segunda onda). Cada entrada aponta para um .tsx em src/content/<kind>/<categoria>/.
import type { ContentEntry } from '../manifest';

export const ENTRIES: ContentEntry[] = [
  // ── Beam ──
  { file: 'illustrations/beam/gradient-beam.tsx', name: 'Gradient Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Feixe com degradê violeta→azul→verde nasce no nó de origem, percorre um conector em S sob um halo desfocado e acende o nó de chegada; partículas seguem o mesmo caminho.', tags: ['beam', 'degrade', 'particulas', 'animado'] },
  { file: 'illustrations/beam/status-pipeline-beam.tsx', name: 'Status Pipeline Beam', kind: 'ILLUSTRATION', category: 'Beam', description: 'Quatro etapas de pipeline trocando de status — pendente, executando, sucesso e erro — com trilhos que se preenchem, anel girando e check ou X animados; o deploy falha e é refeito.', tags: ['beam', 'pipeline', 'status', 'animado'] },

  // ── Orbit ──
  { file: 'illustrations/orbit/logo-orbit.tsx', name: 'Logo Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Wordmarks com monograma colorido orbitam a marca central em dois anéis contra-rotativos; passar o mouse desacelera até pausar e, ao sair, retoma sem salto.', tags: ['orbit', 'logos', 'hover', 'animado'] },
  { file: 'illustrations/orbit/satellite-orbit.tsx', name: 'Satellite Orbit', kind: 'ILLUSTRATION', category: 'Orbit', description: 'Satélite em órbita elíptica inclinada passa por trás do planeta, com rastro em três camadas, ondas de sinal e estação em terra pulsando sob um céu de estrelas que piscam.', tags: ['orbit', 'satelite', 'planeta', 'animado'], featured: true },

  // ── Chat ──
  { file: 'illustrations/chat/claude-chat.tsx', name: 'Claude Chat', kind: 'ILLUSTRATION', category: 'Chat', description: 'Conversa no estilo do assistente: pergunta em bolha discreta e resposta em markdown digitada bloco a bloco — título, lista com negrito e bloco de código colorido — com ações ao terminar.', tags: ['chat', 'ia', 'markdown', 'animado'] },
  { file: 'illustrations/chat/agent-steps-chat.tsx', name: 'Agent Steps Chat', kind: 'ILLUSTRATION', category: 'Chat', description: 'Agente mostra o raciocínio como linha do tempo — buscar, analisar, responder — com barra indeterminada no passo ativo, checks desenhados, tempos e resposta final com barras por canal.', tags: ['chat', 'agente', 'passos', 'animado'] },

  // ── Marquee ──
  { file: 'illustrations/marquee/chip-marquee.tsx', name: 'Chip Marquee', kind: 'ILLUSTRATION', category: 'Marquee', description: 'Três linhas retas de chips com ícone, rótulo e contagem, a do meio em sentido contrário, bordas esmaecidas por máscara e chips que sobem no hover.', tags: ['marquee', 'chips', 'tags', 'animado'] },
  { file: 'illustrations/marquee/avatar-marquee.tsx', name: 'Avatar Marquee', kind: 'ILLUSTRATION', category: 'Marquee', description: 'Faixa de pessoas em zigue-zague (avatar com iniciais em degradê, nome, área e status online) rolando para a esquerda, com uma fila de avatares pequenos rolando ao contrário.', tags: ['marquee', 'avatares', 'equipe', 'animado'] },

  // ── Card Stack ──
  { file: 'illustrations/card-stack/draggable-testimonial-stack.tsx', name: 'Draggable Testimonial Stack', kind: 'ILLUSTRATION', category: 'Card Stack', description: 'Depoimentos em leque com o card da frente arrastável (drag do motion): solte além do limiar e ele voa para o fundo; sem interação, um card é lançado sozinho a cada 3,8s.', tags: ['card-stack', 'depoimentos', 'drag', 'animado'], featured: true },
  { file: 'illustrations/card-stack/invoice-stack.tsx', name: 'Invoice Stack', kind: 'ILLUSTRATION', category: 'Card Stack', description: 'Faturas em aberto empilhadas: a da frente recebe um carimbo "PAGO" com mola, o status vira "Paga", ela sai voando e o total recebido no rodapé acumula.', tags: ['card-stack', 'faturas', 'carimbo', 'animado'] },

  // ── Text ──
  { file: 'illustrations/text/sparkles-text.tsx', name: 'Sparkles Text', kind: 'ILLUSTRATION', category: 'Text', description: 'Brilhos de quatro pontas em cores alternadas nascem, giram e somem em posições pseudo-aleatórias ao redor e por cima do título.', tags: ['text', 'sparkles', 'brilho', 'animado'] },
  { file: 'illustrations/text/highlight-text.tsx', name: 'Highlight Text', kind: 'ILLUSTRATION', category: 'Text', description: 'Marcador amarelo desenha da esquerda para a direita atrás de três trechos do parágrafo, um de cada vez, com o ícone do marcador balançando; depois apaga e recomeça.', tags: ['text', 'marcador', 'destaque', 'animado'] },

  // ── Ripple ──
  { file: 'illustrations/ripple/notification-bell-ripple.tsx', name: 'Notification Bell Ripple', kind: 'ILLUSTRATION', category: 'Ripple', description: 'Sino balança a cada toque enquanto três anéis se expandem, o badge incrementa com um pop e um aviso de notificação desliza por baixo.', tags: ['ripple', 'sino', 'notificacoes', 'animado'] },
  { file: 'illustrations/ripple/location-share-ripple.tsx', name: 'Location Share Ripple', kind: 'ILLUSTRATION', category: 'Ripple', description: 'Avatar no centro do mapa emite ondas contínuas enquanto pins de amigos caem um a um com mola, mostram a distância e se ligam a você por linhas pontilhadas.', tags: ['ripple', 'localizacao', 'mapa', 'animado'] },

  // ── Diversos ──
  { file: 'illustrations/diversos/cursor-collaboration.tsx', name: 'Cursor Collaboration', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Documento com três cursores nomeados: um seleciona um trecho arrastando (a seleção cresce junto), outro clica no botão de aprovar e o terceiro passeia; posições medidas do texto real.', tags: ['cursores', 'colaboracao', 'selecao', 'animado'], featured: true },
  { file: 'illustrations/diversos/waveform-player.tsx', name: 'Waveform Player', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Player de áudio com forma de onda de barras que pulsam, progresso recortando a camada colorida, cursor e tempo decorrido; play/pause, pular 15s e buscar clicando na onda.', tags: ['audio', 'player', 'waveform', 'animado'] },
  { file: 'illustrations/diversos/keyboard-typing.tsx', name: 'Keyboard Typing', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Teclado em SVG (três fileiras com ç e espaço) digitando frases em loop: a tecla da vez acende, afunda e apaga devagar, enquanto o campo acima mostra o texto com cursor.', tags: ['teclado', 'typewriter', 'svg', 'animado'] },
  { file: 'illustrations/diversos/file-sync.tsx', name: 'File Sync', kind: 'ILLUSTRATION', category: 'Diversos', description: 'Arquivos voam da pasta para a nuvem por um arco e voltam por outro, com barra, contagem e porcentagem avançando até o check de "tudo sincronizado"; ciclo de 5s.', tags: ['arquivos', 'nuvem', 'sincronizacao', 'animado'] },
];
