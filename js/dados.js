// =============================================
// dados.js — configurações e lista de personagens
// Responsável: (nome do aluno)
// =============================================

const CONFIG = {
  TEMPO_ACABANDO_S: 30,
  VIDA_MEDIA_PERCENTUAL: 50,
  VIDA_BAIXA_PERCENTUAL: 25,
  LIMITE_MENSAGENS: 5,
  DURACAO_PARTIDA_S: 150,          // 2 minutos e 30 segundos

  RECARGA_ATAQUE_MS: 1000,         // tempo entre um ataque e a próxima ação
  TEMPO_ACAO_CURA_MS: 600,         // tempo "ocupado" depois de curar
  TEMPO_ACAO_ESPECIAL_MS: 1500,    // tempo "ocupado" depois do ataque máximo

  VARIACAO_DANO: 4,                // dano extra aleatório de 0 a 4
  DANO_MINIMO: 3,                  // nenhum golpe causa menos que isso

  REDUCAO_DEFESA_BASE: 20,         // % de redução da defesa (base)
  REDUCAO_DEFESA_POR_PONTO: 3,     // % a mais por ponto de defesa
  REDUCAO_DEFESA_MAX: 70,          // a defesa nunca bloqueia mais que 70%

  CURA_PERCENTUAL: 0.20,           // cura 20% da vida máxima
  RECARGA_CURA_MS: 10000,          // cura 1 vez a cada 10 segundos

  DURACAO_ESCUDO_MS: 5000,         // efeito especial "escudo"
  DURACAO_ATORDOAR_MS: 2000,       // efeito especial "atordoar"

  INTERVALO_IA_MS: { 1: 1500, 2: 1100, 3: 800 },  // a IA "pensa" a cada X ms

  DEFESA_IA_MS: { 1: 1000, 2: 1500, 3: 2000 },
  TEMPO_FINAL_IA_S: 20,
  CURA_IA_PERCENTUAL: { 1: 30, 2: 40, 3: 35 },
  CURA_IA_COM_JOGADOR_DEFENDENDO_PERCENTUAL: 70,
  ESPECIAL_IA_PERCENTUAL: { 2: 50, 3: 45 },
  CHANCE_ESPECIAL_IA: { 1: 0.10, 2: 0.15 },
  CHANCE_CURA_IA_NIVEL_1: 0.50,
  CHANCE_DEFESA_IA: { 1: 0.10, 2: 0.30, 3: 0.35 },
  CHANCE_DEFESA_IA_SEM_CURA: 0.60,
  CHANCE_ESPERA_IA: 0.50,

  VITORIAS_NIVEL_2: 2,
  VITORIAS_NIVEL_3: 4
};

const PERSONAGENS = [
  {
    id: "faisca", nome: "Faísca", titulo: "Raposa de Fogo", emoji: "🦊",
    nivelMinimo: 1, tipo: "Equilibrado",
    vidaMaxima: 100, ataque: 12, defesa: 9,
    personalidade: "Curiosa, rápida e um pouco impulsiva.",
    historia: "Nasceu de uma fagulha que caiu da Ruptura numa floresta de outono. Quer provar que até a menor chama pode virar um incêndio.",
    especial: { nome: "Explosão de Brasas", descricao: "Causa o triplo do dano de um ataque normal.", multiplicador: 3, efeito: "nenhum" }
  },
  {
    id: "casco", nome: "Casco", titulo: "Tartaruga de Pedra", emoji: "🐢",
    nivelMinimo: 1, tipo: "Defesa",
    vidaMaxima: 130, ataque: 8, defesa: 14,
    personalidade: "Calmo, paciente e teimoso.",
    historia: "Dormiu trezentos anos no fundo de uma montanha até a Ruptura rachar a rocha. Acredita que quem resiste mais sempre vence no final.",
    especial: { nome: "Muralha Viva", descricao: "Causa 2x o dano e reduz pela metade o dano recebido por 5 segundos.", multiplicador: 2, efeito: "escudo" }
  },
  {
    id: "zunido", nome: "Zunido", titulo: "Coruja do Trovão", emoji: "🦉",
    nivelMinimo: 2, tipo: "Ataque",
    vidaMaxima: 85, ataque: 16, defesa: 6,
    personalidade: "Orgulhosa, barulhenta e muito inteligente.",
    historia: "Vive no topo das nuvens de tempestade e caça relâmpagos à noite. Veio provar que ninguém é mais rápido que um trovão.",
    especial: { nome: "Relâmpago Noturno", descricao: "Causa 2,5x o dano e atordoa o adversário por 2 segundos.", multiplicador: 2.5, efeito: "atordoar" }
  },
  {
    id: "bruma", nome: "Bruma", titulo: "Lobo da Névoa", emoji: "🐺",
    nivelMinimo: 2, tipo: "Equilibrado",
    vidaMaxima: 105, ataque: 13, defesa: 10,
    personalidade: "Silencioso, leal e misterioso.",
    historia: "Líder de uma alcateia que sumiu na névoa da Ruptura. Luta para abrir o portal que o leva de volta à sua família.",
    especial: { nome: "Uivo Sombrio", descricao: "Causa 2,5x o dano e ignora a defesa do adversário.", multiplicador: 2.5, efeito: "ignoraDefesa" }
  },
  {
    id: "ignis", nome: "Ignis", titulo: "Dragão Rubro", emoji: "🐉",
    nivelMinimo: 3, tipo: "Ataque",
    vidaMaxima: 95, ataque: 17, defesa: 7,
    personalidade: "Arrogante, feroz e competitivo.",
    historia: "O último dragão das Terras Vulcânicas. Diz que criou a Ruptura com um único sopro e não aceita outro campeão.",
    especial: { nome: "Chama Voraz", descricao: "Causa 2,5x o dano e recupera metade do dano como vida.", multiplicador: 2.5, efeito: "rouboVida" }
  },
  {
    id: "cristalina", nome: "Cristalina", titulo: "Unicórnio de Cristal", emoji: "🦄",
    nivelMinimo: 3, tipo: "Defesa",
    vidaMaxima: 135, ataque: 11, defesa: 14,
    personalidade: "Elegante, sábia e fria nas batalhas.",
    historia: "Guardiã das cavernas de gelo. Entrou na arena para impedir que a energia da Ruptura caia em mãos erradas.",
    especial: { nome: "Prisma Congelante", descricao: "Causa 2,5x o dano e coloca a cura do adversário em recarga por 10 segundos.", multiplicador: 2.5, efeito: "bloqueiaCura" }
  }
];

// Procura um personagem pelo ID.
function buscarPersonagem(id) {
  return PERSONAGENS.find(function (personagem) {
    return personagem.id === id;
  });
}
