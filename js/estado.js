// =============================================
// estado.js — estado da sessão, da partida e progresso
// Responsável: (nome do aluno)
// =============================================

// Guarda o progresso da sessão e a partida atual.
const sessao = {
  vitorias: 0,
  derrotas: 0,
  empates: 0
};

let partida = null;

// Cria um lutador com vida cheia e ações disponíveis.
function criarLutador(personagem, controle) {
  return {
    dados: personagem,
    controle: controle,
    vida: personagem.vidaMaxima,
    defendendo: false,
    especialUsado: false,
    proximaCuraEm: 0,
    ocupadoAte: 0,
    atordoadoAte: 0,
    escudoAte: 0
  };
}

// Cria e guarda uma partida nova com os dois lutadores.
function criarPartida(idJogador, idIA) {
  partida = {
    ativa: true,
    nivel: nivelAtual(),
    tempoRestante: CONFIG.DURACAO_PARTIDA_S,
    jogador: criarLutador(buscarPersonagem(idJogador), "jogador"),
    ia: criarLutador(buscarPersonagem(idIA), "ia"),
    intervaloCronometro: null,
    intervaloIA: null
  };
  return partida;
}
