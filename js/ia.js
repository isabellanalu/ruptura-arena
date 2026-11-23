// =============================================
// ia.js — escolha do personagem e decisões da IA
// Responsável: (nome do aluno)
// =============================================

// Sorteia um personagem liberado, priorizando os diferentes do jogador.
function escolherPersonagemIA(idJogador) {
  const disponiveis = personagensDisponiveis(nivelAtual());
  const outros = disponiveis.filter(function (personagem) {
    return personagem.id !== idJogador;
  });
  const lista = outros.length > 0 ? outros : disponiveis;
  return lista[sorteio(0, lista.length - 1)].id;
}

// Inicia os turnos da IA na frequência do nível da partida.
function iniciarIA() {
  if (!partida || !partida.ativa) return;
  pararIA();
  partida.intervaloIA = setInterval(turnoIA, CONFIG.INTERVALO_IA_MS[partida.nivel]);
}

// Para os turnos da IA e limpa o identificador do intervalo.
function pararIA() {
  if (!partida || partida.intervaloIA === null) return;
  clearInterval(partida.intervaloIA);
  partida.intervaloIA = null;
}

// Decide e executa a próxima ação quando a IA pode agir.
function turnoIA() {
  if (!partida || !podeAgir(partida.ia)) return;
  executarAcaoIA(decidirAcaoIA());
}

// Escolhe a regra de decisão adequada ao nível atual da luta.
function decidirAcaoIA() {
  if (!partida || !partida.ativa) return "esperar";
  const ia = partida.ia;
  const jogador = partida.jogador;
  if (partida.nivel === 1) return decidirNivel1(ia, jogador);
  if (partida.nivel === 2) return decidirNivel2(ia, jogador);
  return decidirNivel3(ia, jogador);
}

// No nível 1, a IA costuma atacar e faz outras ações por sorteio.
function decidirNivel1(ia, jogador) {
  if (especialDisponivel(ia) && chance(CONFIG.CHANCE_ESPECIAL_IA[1])) return "especial";
  if (percentualVida(ia) < CONFIG.CURA_IA_PERCENTUAL[1] &&
      curaDisponivel(ia) && chance(CONFIG.CHANCE_CURA_IA_NIVEL_1)) return "curar";
  if (chance(CONFIG.CHANCE_DEFESA_IA[1])) return "defender";
  return "atacar";
}

// No nível 2, a IA cura quando precisa e evita gastar o especial na defesa.
function decidirNivel2(ia, jogador) {
  if (percentualVida(ia) < CONFIG.CURA_IA_PERCENTUAL[2] && curaDisponivel(ia)) return "curar";
  if (especialDisponivel(ia) && !jogador.defendendo &&
      (percentualVida(jogador) < CONFIG.ESPECIAL_IA_PERCENTUAL[2] ||
        chance(CONFIG.CHANCE_ESPECIAL_IA[2]))) return "especial";
  if (chance(CONFIG.CHANCE_DEFESA_IA[2])) return "defender";
  return "atacar";
}

// No nível 3, a IA também considera a vantagem e o tempo restante.
function decidirNivel3(ia, jogador) {
  const minhaVida = percentualVida(ia);
  const vidaJogador = percentualVida(jogador);
  const danoEspecial = ia.dados.ataque * ia.dados.especial.multiplicador - Math.floor(jogador.dados.defesa / 2);
  const estouGanhando = minhaVida > vidaJogador;
  const tempoAcabando = partida.tempoRestante <= CONFIG.TEMPO_FINAL_IA_S;

  if (especialDisponivel(ia) && !jogador.defendendo && danoEspecial >= jogador.vida) return "especial";

  if (minhaVida < CONFIG.CURA_IA_PERCENTUAL[3]) {
    if (curaDisponivel(ia)) return "curar";
    if (chance(CONFIG.CHANCE_DEFESA_IA_SEM_CURA)) return "defender";
  }

  if (tempoAcabando && estouGanhando) return "defender";
  if (jogador.defendendo) {
    if (minhaVida < CONFIG.CURA_IA_COM_JOGADOR_DEFENDENDO_PERCENTUAL && curaDisponivel(ia)) return "curar";
    if (chance(CONFIG.CHANCE_ESPERA_IA)) return "esperar";
  }
  if (especialDisponivel(ia) && !jogador.defendendo && vidaJogador < CONFIG.ESPECIAL_IA_PERCENTUAL[3]) return "especial";
  if (!estouGanhando && chance(CONFIG.CHANCE_DEFESA_IA[3])) return "defender";
  return "atacar";
}

// Encaminha a decisão para a ação correspondente.
function executarAcaoIA(acao) {
  if (!partida || !partida.ativa) return;
  if (acao === "atacar") atacarJogador();
  else if (acao === "defender") defenderIA(CONFIG.DEFESA_IA_MS[partida.nivel]);
  else if (acao === "curar") curarIA();
  else if (acao === "especial") usarAtaqueMaximoIA();
}

// Usa o ataque normal da IA contra o jogador.
function atacarJogador() {
  if (!partida || !partida.ativa) return false;
  return atacar(partida.ia, partida.jogador);
}

// Defende por um tempo e solta a defesa se ainda estiver na mesma luta.
function defenderIA(duracaoMs) {
  if (!partida || !partida.ativa) return false;
  const estaPartida = partida;
  if (!iniciarDefesa(estaPartida.ia)) return false;
  setTimeout(function () {
    if (partida === estaPartida && partida.ativa) pararDefesa(estaPartida.ia);
  }, duracaoMs);
  return true;
}

// Usa a cura da IA seguindo a recarga do combate.
function curarIA() {
  if (!partida || !partida.ativa) return false;
  return curar(partida.ia);
}

// Usa o especial da IA se ainda estiver disponível.
function usarAtaqueMaximoIA() {
  if (!partida || !partida.ativa) return false;
  return usarEspecial(partida.ia, partida.jogador);
}

// Calcula a porcentagem de vida restante de um lutador.
function percentualVida(lutador) {
  return (lutador.vida / lutador.dados.vidaMaxima) * 100;
}

// Sorteia se um evento acontece de acordo com a probabilidade dada.
function chance(probabilidade) {
  return Math.random() < probabilidade;
}
