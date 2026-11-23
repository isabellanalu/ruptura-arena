// =============================================
// combate.js — ataque, defesa, cura e ataque máximo
// Responsável: (nome do aluno)
// =============================================

// Sorteia um inteiro entre o mínimo e o máximo, inclusive.
function sorteio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Retorna o outro lutador da partida.
function adversarioDe(lutador) {
  if (lutador === partida.jogador) return partida.ia;
  return partida.jogador;
}

// Verifica se o lutador pode iniciar uma ação.
function podeAgir(lutador) {
  if (!partida || !partida.ativa) return false;
  const agora = Date.now();
  return agora >= lutador.ocupadoAte && agora >= lutador.atordoadoAte && !lutador.defendendo;
}

// Verifica se a recarga da cura já terminou.
function curaDisponivel(lutador) {
  return Date.now() >= lutador.proximaCuraEm;
}

// Verifica se o ataque máximo ainda pode ser usado.
function especialDisponivel(lutador) {
  return !lutador.especialUsado;
}

// Verifica se o escudo especial ainda protege o lutador.
function escudoAtivo(lutador) {
  return Date.now() < lutador.escudoAte;
}

// Calcula o dano considerando defesa, escudo e multiplicador.
function calcularDano(atacante, alvo, multiplicador, ignoraDefesa) {
  let dano = (atacante.dados.ataque + sorteio(0, CONFIG.VARIACAO_DANO)) * multiplicador;
  if (!ignoraDefesa) {
    dano = Math.max(dano - Math.floor(alvo.dados.defesa / 2), CONFIG.DANO_MINIMO);
    if (alvo.defendendo) {
      const reducao = Math.min(
        CONFIG.REDUCAO_DEFESA_BASE + alvo.dados.defesa * CONFIG.REDUCAO_DEFESA_POR_PONTO,
        CONFIG.REDUCAO_DEFESA_MAX
      );
      dano = dano * (1 - reducao / 100);
    }
  }
  if (escudoAtivo(alvo)) dano = dano / 2;
  return Math.max(Math.round(dano), 1);
}

// Retira vida sem passar de zero e encerra a partida por nocaute.
function aplicarDano(alvo, dano) {
  if (!partida || !partida.ativa) return;
  alvo.vida = Math.max(alvo.vida - dano, 0);
  if (alvo.vida === 0) encerrarPartida("vida");
}

// Executa um ataque normal e aplica a recarga da ação.
function atacar(atacante, alvo) {
  if (!podeAgir(atacante)) return false;
  const dano = calcularDano(atacante, alvo, 1, false);
  atacante.ocupadoAte = Date.now() + CONFIG.RECARGA_ATAQUE_MS;
  animar(atacante, "animar-ataque");
  if (alvo.defendendo) {
    animar(alvo, "animar-bloqueio");
    mostrarMensagem(alvo.dados.nome + " defendeu! Recebeu só " + dano + " de dano.", alvo.controle);
  } else {
    animar(alvo, "animar-dano");
    mostrarMensagem(atacante.dados.nome + " atacou e causou " + dano + " de dano!", atacante.controle);
  }
  aplicarDano(alvo, dano);
  atualizarBatalha();
  return true;
}

// Ativa a defesa enquanto o lutador mantiver a ação.
function iniciarDefesa(lutador) {
  if (!podeAgir(lutador)) return false;
  lutador.defendendo = true;
  mostrarMensagem(lutador.dados.nome + " se defendeu!", lutador.controle);
  atualizarBatalha();
  return true;
}

// Encerra a defesa de um lutador durante a partida.
function pararDefesa(lutador) {
  if (!partida || !partida.ativa || !lutador.defendendo) return false;
  lutador.defendendo = false;
  atualizarBatalha();
  return true;
}

// Recupera vida até o máximo e coloca a cura em recarga.
function curar(lutador) {
  if (!podeAgir(lutador) || !curaDisponivel(lutador)) return false;
  const vidaAnterior = lutador.vida;
  const quantidade = Math.round(lutador.dados.vidaMaxima * CONFIG.CURA_PERCENTUAL);
  lutador.vida = Math.min(lutador.vida + quantidade, lutador.dados.vidaMaxima);
  lutador.proximaCuraEm = Date.now() + CONFIG.RECARGA_CURA_MS;
  lutador.ocupadoAte = Date.now() + CONFIG.TEMPO_ACAO_CURA_MS;
  animar(lutador, "animar-cura");
  mostrarMensagem(lutador.dados.nome + " se curou e recuperou " + (lutador.vida - vidaAnterior) + " de vida!", lutador.controle);
  atualizarBatalha();
  return true;
}

// Executa o ataque máximo uma vez na partida.
function usarEspecial(atacante, alvo) {
  if (!podeAgir(atacante) || !especialDisponivel(atacante)) return false;
  atacante.especialUsado = true;
  const especial = atacante.dados.especial;
  const ignoraDefesa = especial.efeito === "ignoraDefesa";
  const dano = calcularDano(atacante, alvo, especial.multiplicador, ignoraDefesa);
  atacante.ocupadoAte = Date.now() + CONFIG.TEMPO_ACAO_ESPECIAL_MS;
  animar(atacante, "animar-especial");
  animar(alvo, "animar-dano");
  mostrarMensagem("⭐ " + atacante.dados.nome + " usou " + especial.nome + "! " + dano + " de dano!", "sistema");
  aplicarDano(alvo, dano);
  if (partida.ativa) aplicarEfeitoEspecial(atacante, alvo, dano);
  atualizarBatalha();
  return true;
}

// Aplica o efeito que acompanha o dano do ataque máximo.
function aplicarEfeitoEspecial(atacante, alvo, dano) {
  if (!partida || !partida.ativa) return;
  const agora = Date.now();
  switch (atacante.dados.especial.efeito) {
    case "escudo":
      atacante.escudoAte = agora + CONFIG.DURACAO_ESCUDO_MS;
      break;
    case "atordoar":
      alvo.atordoadoAte = agora + CONFIG.DURACAO_ATORDOAR_MS;
      alvo.defendendo = false;
      break;
    case "rouboVida":
      atacante.vida = Math.min(atacante.vida + Math.round(dano / 2), atacante.dados.vidaMaxima);
      break;
    case "bloqueiaCura":
      alvo.proximaCuraEm = agora + CONFIG.RECARGA_CURA_MS;
      break;
  }
}

// Encaminha o ataque do jogador para as regras de combate.
function jogadorAtacar() {
  if (!partida || !partida.ativa) return false;
  return atacar(partida.jogador, adversarioDe(partida.jogador));
}

// Encaminha o início da defesa do jogador.
function jogadorDefender() {
  if (!partida || !partida.ativa) return false;
  return iniciarDefesa(partida.jogador);
}

// Encerra a defesa quando o jogador solta o controle.
function jogadorSoltarDefesa() {
  if (!partida || !partida.ativa) return false;
  return pararDefesa(partida.jogador);
}

// Encaminha a cura do jogador.
function jogadorCurar() {
  if (!partida || !partida.ativa) return false;
  return curar(partida.jogador);
}

// Encaminha o ataque máximo do jogador.
function jogadorEspecial() {
  if (!partida || !partida.ativa) return false;
  return usarEspecial(partida.jogador, adversarioDe(partida.jogador));
}
