// =============================================
// niveis.js — níveis e desbloqueio de personagens
// Responsável: (nome do aluno)
// =============================================

// Calcula o nível de acordo com o total de vitórias.
function calcularNivel(vitorias) {
  if (vitorias >= CONFIG.VITORIAS_NIVEL_3) return 3;
  if (vitorias >= CONFIG.VITORIAS_NIVEL_2) return 2;
  return 1;
}

// Calcula o nível atual do jogador.
function nivelAtual() {
  return calcularNivel(sessao.vitorias);
}

// Retorna o nome mostrado para cada nível.
function nomeDoNivel(nivel) {
  if (nivel === 3) return "Avançado";
  if (nivel === 2) return "Intermediário";
  return "Iniciante";
}

// Verifica se o nível permite escolher o personagem.
function personagemLiberado(personagem, nivel) {
  return personagem.nivelMinimo <= nivel;
}

// Retorna a lista de personagens permitidos no nível.
function personagensDisponiveis(nivel) {
  return PERSONAGENS.filter(function (personagem) {
    return personagemLiberado(personagem, nivel);
  });
}
