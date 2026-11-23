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

// Exibe o nível e a quantidade de vitórias no menu.
function atualizarMenu() {
  const nivel = nivelAtual();
  document.getElementById("menu-nivel").textContent = "Nível " + nivel + " — " + nomeDoNivel(nivel);
  const palavra = sessao.vitorias === 1 ? " vitória" : " vitórias";
  document.getElementById("menu-vitorias").textContent = sessao.vitorias + palavra;
}

// Mostra as fichas de todos os personagens.
function renderizarGaleria() {
  const lista = document.getElementById("lista-personagens");
  const nivel = nivelAtual();
  lista.textContent = "";

  PERSONAGENS.forEach(function (personagem) {
    lista.append(criarCartaoPersonagem(personagem, personagemLiberado(personagem, nivel)));
  });
}

// Mostra os cartões com botão de escolha apenas para personagens liberados.
function renderizarSelecao() {
  const lista = document.getElementById("lista-selecao");
  const nivel = nivelAtual();
  lista.textContent = "";
  document.getElementById("selecao-nivel").textContent = "Seu nível: " + nivel + " — " + nomeDoNivel(nivel);

  PERSONAGENS.forEach(function (personagem) {
    const liberado = personagemLiberado(personagem, nivel);
    const cartao = criarCartaoPersonagem(personagem, liberado);
    if (liberado) {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.textContent = "Escolher " + personagem.nome;
      botao.addEventListener("click", function () {
        // A função que abre a batalha entra na próxima etapa.
        if (typeof iniciarBatalha === "function") iniciarBatalha(personagem.id);
      });
      cartao.append(botao);
    }
    lista.append(cartao);
  });
}

// Monta a ficha de um personagem e indica quando ele será liberado.
function criarCartaoPersonagem(personagem, liberado) {
  const cartao = document.createElement("div");
  cartao.className = "cartao";
  if (!liberado) cartao.classList.add("bloqueado");

  const figura = document.createElement("div");
  figura.className = "figura personagem-" + personagem.id;
  figura.textContent = personagem.emoji;
  figura.setAttribute("aria-hidden", "true");

  const nome = document.createElement("h3");
  nome.textContent = personagem.nome;

  const titulo = document.createElement("p");
  titulo.className = "cartao-titulo";
  titulo.textContent = personagem.titulo + " · " + personagem.tipo;

  const atributos = document.createElement("ul");
  atributos.className = "cartao-atributos";
  const valores = [
    "Vida: " + personagem.vidaMaxima,
    "Ataque: " + personagem.ataque,
    "Defesa: " + personagem.defesa
  ];
  valores.forEach(function (valor) {
    const item = document.createElement("li");
    item.textContent = valor;
    atributos.append(item);
  });

  const personalidade = document.createElement("p");
  personalidade.textContent = personagem.personalidade;
  const historia = document.createElement("p");
  historia.textContent = personagem.historia;

  const especial = document.createElement("p");
  especial.className = "cartao-especial";
  const nomeEspecial = document.createElement("strong");
  nomeEspecial.textContent = personagem.especial.nome + ": ";
  especial.append(nomeEspecial, personagem.especial.descricao);
  cartao.append(figura, nome, titulo, atributos, personalidade, historia, especial);

  if (!liberado) {
    const aviso = document.createElement("p");
    aviso.textContent = "🔒 Libera no nível " + personagem.nivelMinimo;
    cartao.append(aviso);
  }

  return cartao;
}
