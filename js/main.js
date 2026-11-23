// =============================================
// main.js — inicialização, botões e teclado
// Responsável: (nome do aluno)
// =============================================

// Liga os botões de navegação às telas do jogo.
function configurarBotoes() {
  document.getElementById("btn-jogar").addEventListener("click", function () {
    renderizarSelecao();
    mostrarTela("tela-selecao");
  });
  document.getElementById("btn-personagens").addEventListener("click", function () {
    renderizarGaleria();
    mostrarTela("tela-personagens");
  });
  document.getElementById("btn-como-jogar").addEventListener("click", function () {
    mostrarTela("tela-como-jogar");
  });

  const botoesVoltar = ["btn-voltar-personagens", "btn-voltar-como-jogar", "btn-voltar-selecao", "btn-menu"];
  botoesVoltar.forEach(function (idBotao) {
    document.getElementById(idBotao).addEventListener("click", function () {
      atualizarMenu();
      mostrarTela("tela-menu");
    });
  });
  document.getElementById("btn-jogar-novamente").addEventListener("click", function () {
    renderizarSelecao();
    mostrarTela("tela-selecao");
  });
  document.getElementById("btn-atacar").addEventListener("click", jogadorAtacar);
  document.getElementById("btn-curar").addEventListener("click", jogadorCurar);
  document.getElementById("btn-especial").addEventListener("click", jogadorEspecial);

  const btnDefender = document.getElementById("btn-defender");
  btnDefender.addEventListener("pointerdown", jogadorDefender);
  btnDefender.addEventListener("pointerup", jogadorSoltarDefesa);
  btnDefender.addEventListener("pointerleave", jogadorSoltarDefesa);
  btnDefender.addEventListener("pointercancel", jogadorSoltarDefesa);
}

// Monta a luta com um adversário parado e inicia a contagem.
function iniciarBatalha(idPersonagemJogador) {
  const personagem = buscarPersonagem(idPersonagemJogador);
  if (!personagem || !personagemLiberado(personagem, nivelAtual())) return;
  if (partida && partida.ativa) return;

  // Faísca e Casco já estão disponíveis no primeiro nível.
  const idIA = idPersonagemJogador === "casco" ? "faisca" : "casco";
  pararCronometro();
  criarPartida(idPersonagemJogador, idIA);
  mostrarTela("tela-batalha");
  montarArena();
  iniciarCronometro();
}

// Liga as teclas às mesmas ações dos botões da arena.
function configurarTeclado() {
  document.addEventListener("keydown", function (evento) {
    if (!partida || !partida.ativa) return;
    const tecla = evento.key.toLowerCase();
    if (tecla === "f") jogadorAtacar();
    if (tecla === "g" && !evento.repeat) jogadorDefender();
    if (tecla === "h") jogadorCurar();
    if (tecla === "r") jogadorEspecial();
  });

  document.addEventListener("keyup", function (evento) {
    if (evento.key.toLowerCase() === "g") jogadorSoltarDefesa();
  });
  window.addEventListener("blur", jogadorSoltarDefesa);
}

// Prepara a navegação e abre o menu quando o HTML estiver pronto.
function inicializar() {
  configurarBotoes();
  configurarTeclado();
  atualizarMenu();
  mostrarTela("tela-menu");
}

document.addEventListener("DOMContentLoaded", inicializar);
