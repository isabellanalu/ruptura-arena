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
}

// Prepara a navegação e abre o menu quando o HTML estiver pronto.
function inicializar() {
  configurarBotoes();
  atualizarMenu();
  mostrarTela("tela-menu");
}

document.addEventListener("DOMContentLoaded", inicializar);
