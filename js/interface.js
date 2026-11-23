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
        iniciarBatalha(personagem.id);
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

// Prepara os nomes, as figuras e os indicadores da arena.
function montarArena() {
  document.getElementById("batalha-nivel").textContent =
    "Nível " + partida.nivel + " — " + nomeDoNivel(partida.nivel);

  [partida.jogador, partida.ia].forEach(function (lutador) {
    const prefixo = lutador.controle;
    document.getElementById(prefixo + "-nome").textContent = lutador.dados.nome;
    const figura = document.getElementById(prefixo + "-figura");
    figura.className = "figura personagem-" + lutador.dados.id;
    figura.textContent = lutador.dados.emoji;
  });

  limparMensagens();
  atualizarBatalha();
}

// Atualiza a vida, o tempo, as recargas e os controles da batalha.
function atualizarBatalha() {
  const cronometro = document.getElementById("cronometro");
  cronometro.textContent = formatarTempo(partida.tempoRestante);
  cronometro.classList.toggle("tempo-acabando", partida.tempoRestante <= CONFIG.TEMPO_ACABANDO_S);
  const agora = Date.now();

  [partida.jogador, partida.ia].forEach(function (lutador) {
    const prefixo = lutador.controle;
    atualizarBarraVida(lutador, prefixo);
    const faltam = Math.ceil((lutador.proximaCuraEm - agora) / 1000);
    document.getElementById(prefixo + "-cura").textContent =
      faltam > 0 ? "💚 Cura em " + faltam + "s" : "💚 Cura pronta";
    document.getElementById(prefixo + "-especial").textContent =
      lutador.especialUsado ? "⭐ Especial usado" : "⭐ Especial pronto";
    const figura = document.getElementById(prefixo + "-figura");
    figura.classList.toggle("defendendo", lutador.defendendo);
    figura.classList.toggle("atordoado", partida.ativa && agora < lutador.atordoadoAte);
  });

  const jogador = partida.jogador;
  document.getElementById("btn-curar").disabled = !partida.ativa || !curaDisponivel(jogador);
  const botaoEspecial = document.getElementById("btn-especial");
  botaoEspecial.disabled = !partida.ativa || jogador.especialUsado;
  botaoEspecial.textContent = jogador.especialUsado ? "Usado" : "Ataque máximo (R)";
}

// Atualiza o preenchimento, a cor e o texto da barra de vida.
function atualizarBarraVida(lutador, prefixo) {
  const percentual = (lutador.vida / lutador.dados.vidaMaxima) * 100;
  const barra = document.getElementById(prefixo + "-vida-barra");
  barra.style.width = percentual + "%";
  barra.classList.toggle("media", percentual <= CONFIG.VIDA_MEDIA_PERCENTUAL && percentual > CONFIG.VIDA_BAIXA_PERCENTUAL);
  barra.classList.toggle("baixa", percentual <= CONFIG.VIDA_BAIXA_PERCENTUAL);
  document.getElementById(prefixo + "-vida-texto").textContent =
    lutador.vida + " / " + lutador.dados.vidaMaxima;
}

// Exibe a mensagem mais recente e limita o histórico da luta.
function mostrarMensagem(texto, tipo) {
  const caixa = document.getElementById("mensagens");
  const linha = document.createElement("p");
  linha.textContent = texto;
  linha.className = "msg msg-" + tipo;
  caixa.prepend(linha);
  while (caixa.children.length > CONFIG.LIMITE_MENSAGENS) caixa.lastElementChild.remove();
}

// Limpa o histórico antes de começar outra luta.
function limparMensagens() {
  document.getElementById("mensagens").textContent = "";
}

// Reinicia a animação da figura mesmo quando o efeito se repete.
function animar(lutador, classeAnimacao) {
  const figura = document.getElementById(lutador.controle + "-figura");
  figura.classList.remove("animar-ataque", "animar-dano", "animar-bloqueio", "animar-cura", "animar-especial");
  void figura.offsetWidth;
  figura.classList.add(classeAnimacao);
}

// Preenche o resultado básico e mostra a tela de encerramento.
function mostrarTelaResultado(resultado, subiuDeNivel) {
  const titulo = document.getElementById("resultado-titulo");
  titulo.className = resultado;
  if (resultado === "vitoria") titulo.textContent = "VITÓRIA!";
  else if (resultado === "derrota") titulo.textContent = "DERROTA";
  else titulo.textContent = "EMPATE";

  const jogador = partida.jogador;
  const ia = partida.ia;
  const motivo = partida.tempoRestante === 0 ? "por tempo" : "por nocaute";
  let mensagem = "A partida terminou empatada.";
  if (resultado === "vitoria") mensagem = jogador.dados.nome + " venceu " + ia.dados.nome + " " + motivo + "!";
  if (resultado === "derrota") mensagem = ia.dados.nome + " venceu " + jogador.dados.nome + " " + motivo + "!";
  if (subiuDeNivel) mensagem += " Você subiu para o nível " + nivelAtual() + "!";
  document.getElementById("resultado-mensagem").textContent = mensagem;
  document.getElementById("resultado-jogador").textContent =
    "Você (" + jogador.dados.nome + "): " + jogador.vida + " / " + jogador.dados.vidaMaxima + " de vida";
  document.getElementById("resultado-ia").textContent =
    "IA (" + ia.dados.nome + "): " + ia.vida + " / " + ia.dados.vidaMaxima + " de vida";
  document.getElementById("resultado-vitorias").textContent = "Vitórias na sessão: " + sessao.vitorias;
  document.getElementById("resultado-nivel").textContent =
    "Nível atual: " + nivelAtual() + " — " + nomeDoNivel(nivelAtual());
  mostrarTela("tela-resultado");
}
