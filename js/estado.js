// =============================================
// estado.js — estado da sessão, da partida e progresso
// Responsável: (nome do aluno)
// =============================================

const CHAVE_PROGRESSO = "rupturaArena.progresso";

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

// Salva apenas vitórias, derrotas e empates no navegador.
function salvarProgresso() {
  try {
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(sessao));
  } catch (erro) {
    // Se o navegador bloquear o armazenamento, a sessão continua em memória.
  }
}

// Carrega os totais salvos e descarta um registro inválido.
function carregarProgresso() {
  try {
    const texto = localStorage.getItem(CHAVE_PROGRESSO);
    if (texto === null) return;
    const salvo = JSON.parse(texto);
    if (!salvo || typeof salvo !== "object" || Array.isArray(salvo)) {
      zerarProgresso();
      return;
    }

    Object.keys(sessao).forEach(function (chave) {
      const total = Number(salvo[chave]);
      sessao[chave] = Number.isSafeInteger(total) && total >= 0 ? total : 0;
    });
  } catch (erro) {
    zerarProgresso();
  }
}

// Zera os totais em memória e apaga o progresso salvo.
function zerarProgresso() {
  sessao.vitorias = 0;
  sessao.derrotas = 0;
  sessao.empates = 0;

  try {
    localStorage.removeItem(CHAVE_PROGRESSO);
  } catch (erro) {
    // Os totais da sessão já estão zerados se o armazenamento estiver bloqueado.
  }
}
