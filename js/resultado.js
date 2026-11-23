// =============================================
// resultado.js — encerramento e registro do resultado
// Responsável: (nome do aluno)
// =============================================

// Encerra a luta uma vez, para os intervalos e mostra o resultado.
function encerrarPartida(motivo) {
  if (!partida || !partida.ativa) return;
  partida.ativa = false;
  pararCronometro();
  clearInterval(partida.intervaloIA);
  partida.intervaloIA = null;
  partida.jogador.defendendo = false;
  partida.ia.defendendo = false;
  const resultado = definirResultado();
  const subiuDeNivel = registrarResultado(resultado);
  mostrarTelaResultado(resultado, subiuDeNivel);
}

// Compara a vida restante dos dois lutadores.
function definirResultado() {
  if (partida.jogador.vida > partida.ia.vida) return "vitoria";
  if (partida.ia.vida > partida.jogador.vida) return "derrota";
  return "empate";
}

// Atualiza o placar da sessão e informa se houve subida de nível.
function registrarResultado(resultado) {
  const nivelAntes = nivelAtual();
  if (resultado === "vitoria") sessao.vitorias++;
  else if (resultado === "derrota") sessao.derrotas++;
  else sessao.empates++;
  return nivelAtual() > nivelAntes;
}
