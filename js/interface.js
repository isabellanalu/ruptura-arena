// =============================================
// interface.js — telas, mensagens e atualização visual
// Responsável: (nome do aluno)
// =============================================

// Exibe a tela pedida e esconde as outras.
function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(function (tela) {
    tela.classList.add("escondida");
  });
  document.getElementById(idTela).classList.remove("escondida");
}
