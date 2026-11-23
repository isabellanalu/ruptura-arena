// =============================================
// cronometro.js — contagem regressiva da partida
// Responsável: (nome do aluno)
// =============================================

// Inicia a contagem regressiva da partida atual.
function iniciarCronometro() {
  pararCronometro();
  partida.intervaloCronometro = setInterval(tickCronometro, 1000);
}

// Passa um segundo e encerra a partida se o tempo acabar.
function tickCronometro() {
  if (!partida || !partida.ativa) return;
  partida.tempoRestante = Math.max(partida.tempoRestante - 1, 0);
  atualizarBatalha();
  if (partida.tempoRestante === 0) encerrarPartida("tempo");
}

// Para o intervalo e limpa seu identificador.
function pararCronometro() {
  if (!partida || partida.intervaloCronometro === null) return;
  clearInterval(partida.intervaloCronometro);
  partida.intervaloCronometro = null;
}

// Mostra minutos e segundos no formato m:ss.
function formatarTempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return minutos + ":" + String(resto).padStart(2, "0");
}
