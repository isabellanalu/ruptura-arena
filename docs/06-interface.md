# 6. Interface: telas, IDs e animações

Os **IDs** abaixo são o contrato entre quem faz o HTML/CSS e quem faz o JavaScript. O JavaScript procura os elementos com `document.getElementById("...")`. **Se um ID mudar, o jogo quebra.**

---

## 6.1 Troca de telas

Todas as telas têm a classe `tela`. Só uma fica visível; as outras têm `escondida`.

```css
.escondida { display: none !important; }
```

```js
function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(t => t.classList.add("escondida"));
  document.getElementById(idTela).classList.remove("escondida");
}
```

---

## 6.2 Tela: Menu (`tela-menu`)

```
┌────────────────────────────────────────┐
│            RUPTURA ARENA               │
│   "Quando a lua se partiu em dois..."  │
│                                        │
│   Nível 1 — Iniciante  ·  0 vitórias   │
│                                        │
│            [  JOGAR  ]                 │
│            [ PERSONAGENS ]             │
│            [ COMO JOGAR ]              │
│                                        │
│                     (zerar progresso)  │
└────────────────────────────────────────┘
```

| ID | Elemento | Conteúdo |
|----|----------|----------|
| `menu-historia` | `<p>` | História curta do universo |
| `menu-nivel` | `<span>` | "Nível 1 — Iniciante" |
| `menu-vitorias` | `<span>` | "0 vitórias" |
| `btn-jogar` | `<button>` | Vai para `tela-selecao` |
| `btn-personagens` | `<button>` | Vai para `tela-personagens` |
| `btn-como-jogar` | `<button>` | Vai para `tela-como-jogar` |
| `btn-zerar-progresso` | `<button>` (pequeno, discreto) | Pergunta `confirm("Apagar todo o progresso?")`; se sim, `zerarProgresso()` e `atualizarMenu()` |

## 6.3 Tela: Personagens (`tela-personagens`)

Galeria com **todos** os personagens (inclusive bloqueados, com um cadeado 🔒 e "Libera no nível X"). Mostra nome, título, emoji, tipo, vida, ataque, defesa, personalidade, história e ataque máximo.

| ID | Elemento |
|----|----------|
| `lista-personagens` | `<div>` onde os cartões são inseridos pelo JS |
| `btn-voltar-personagens` | `<button>` → menu |

## 6.4 Tela: Como jogar (`tela-como-jogar`)

Texto fixo (pode ser escrito direto no HTML): objetivo, controles F/G/H/R, regra da cura (10 s), ataque máximo (1×), tempo de 2:30, como vencer, sistema de níveis.

| ID | Elemento |
|----|----------|
| `btn-voltar-como-jogar` | `<button>` → menu |

## 6.5 Tela: Seleção (`tela-selecao`)

Cartões dos personagens. Os liberados são clicáveis; os bloqueados ficam cinza (classe `bloqueado`) e não fazem nada ao clicar. Clicar num liberado chama `iniciarBatalha(personagem.id)`.

| ID | Elemento |
|----|----------|
| `selecao-nivel` | `<span>` "Seu nível: 1 — Iniciante" |
| `lista-selecao` | `<div>` onde os cartões são inseridos |
| `btn-voltar-selecao` | `<button>` → menu |

### Cartão de personagem (gerado pelo JS)

```html
<div class="cartao">                      <!-- + "bloqueado" se não liberado -->
  <div class="figura personagem-faisca">🦊</div>
  <h3>Faísca</h3>
  <p class="cartao-titulo">Raposa de Fogo · Equilibrado</p>
  <ul class="cartao-atributos">
    <li>❤️ Vida: 100</li>
    <li>⚔️ Ataque: 12</li>
    <li>🛡️ Defesa: 9</li>
  </ul>
  <p class="cartao-especial"><strong>Explosão de Brasas:</strong> Causa o triplo do dano...</p>
</div>
```

> Dica: além do número, mostre os atributos como **barrinhas** (`width` proporcional) para ficar fácil comparar.

## 6.6 Tela: Batalha (`tela-batalha`)

```
┌──────────────────────────────────────────────────────────┐
│  Nível 2 — Intermediário              ⏱ 2:30             │
│                                                          │
│  VOCÊ                                  IA (COMPUTADOR)   │
│  Faísca                                Bruma             │
│  [██████████░░] 80/100                 [████████████]    │
│  💚 Cura pronta   ⭐ Especial pronto    💚 Cura em 6s     │
│                                                          │
│      ┌─────┐                              ┌─────┐        │
│      │ 🦊  │                              │ 🐺  │        │
│      └─────┘                              └─────┘        │
│ ─────────────────── chão da arena ───────────────────────│
│  [F Atacar] [G Defender] [H Curar] [R Ataque máximo]     │
│  > Faísca atacou e causou 9 de dano!                     │
│  > Bruma defendeu!                                       │
└──────────────────────────────────────────────────────────┘
```

| ID | Conteúdo |
|----|----------|
| `batalha-nivel` | "Nível 2 — Intermediário" |
| `cronometro` | "2:30" (classe `tempo-acabando` nos últimos 30 s) |
| `jogador-nome` | Nome do personagem do jogador |
| `jogador-figura` | `<div class="figura personagem-xxx">` com o emoji |
| `jogador-vida-barra` | Preenchimento da barra (muda o `width`) |
| `jogador-vida-texto` | "80 / 100" |
| `jogador-cura` | "💚 Cura pronta" ou "💚 Cura em 6s" |
| `jogador-especial` | "⭐ Especial pronto" ou "⭐ Especial usado" |
| `ia-nome`, `ia-figura`, `ia-vida-barra`, `ia-vida-texto`, `ia-cura`, `ia-especial` | O mesmo, para a IA |
| `btn-atacar` | "⚔️ Atacar (F)" |
| `btn-defender` | "🛡️ Defender (G)" |
| `btn-curar` | "💚 Curar (H)" |
| `btn-especial` | "⭐ Ataque máximo (R)" |
| `mensagens` | Lista das últimas mensagens de ação (máximo 4–5 linhas) |

**Identificação clara jogador × IA (requisito R15):** rótulo "VOCÊ" sobre o jogador, "IA" sobre o adversário, cores de borda diferentes (ex.: azul para o jogador, vermelho para a IA) e a figura da IA espelhada (`transform: scaleX(-1)`) para olhar para o jogador.

### Barra de vida animada

```html
<div class="barra-vida">
  <div id="jogador-vida-barra" class="barra-vida-preenchimento"></div>
</div>
```

```css
.barra-vida { width: 100%; height: 20px; background: #333; border-radius: 10px; overflow: hidden; }
.barra-vida-preenchimento { height: 100%; width: 100%; background: #3ecf5a; transition: width 0.4s ease, background-color 0.4s; }
.barra-vida-preenchimento.media { background: #f0c330; }   /* até 50% */
.barra-vida-preenchimento.baixa { background: #e53935; }   /* até 25% */
```

```js
function atualizarBarraVida(lutador, prefixo) {
  const pct = (lutador.vida / lutador.dados.vidaMaxima) * 100;
  const barra = document.getElementById(prefixo + "-vida-barra");
  barra.style.width = pct + "%";
  barra.classList.toggle("media", pct <= 50 && pct > 25);
  barra.classList.toggle("baixa", pct <= 25);
  document.getElementById(prefixo + "-vida-texto").textContent =
    lutador.vida + " / " + lutador.dados.vidaMaxima;
}
```

### Botões habilitados / desabilitados

Em `atualizarBatalha()`, desabilite os botões quando a ação não for possível:

```js
document.getElementById("btn-curar").disabled = !curaDisponivel(partida.jogador) || !partida.ativa;
document.getElementById("btn-especial").disabled = partida.jogador.especialUsado || !partida.ativa;
```

### Mensagens de ação

```js
function mostrarMensagem(texto, tipo) {
  const caixa = document.getElementById("mensagens");
  const linha = document.createElement("p");
  linha.textContent = texto;
  linha.className = "msg msg-" + tipo;   // msg-jogador (azul), msg-ia (vermelho), msg-sistema (amarelo)
  caixa.prepend(linha);                  // mais recente em cima
  while (caixa.children.length > 5) caixa.lastChild.remove();
}
```

## 6.7 Tela: Resultado (`tela-resultado`)

| ID | Conteúdo |
|----|----------|
| `resultado-titulo` | "VITÓRIA!" / "DERROTA" / "EMPATE" (classe `vitoria`, `derrota` ou `empate` para mudar a cor) |
| `resultado-mensagem` | Ex.: "Faísca venceu Bruma por tempo!" + "🎉 Você subiu para o Nível 2! Novos personagens liberados." se subiu |
| `resultado-jogador` | "Você (Faísca): 42 / 100 de vida" |
| `resultado-ia` | "IA (Bruma): 0 / 105 de vida" |
| `resultado-vitorias` | "Vitórias na sessão: 3" |
| `resultado-nivel` | "Nível atual: 2 — Intermediário" |
| `btn-jogar-novamente` | → `tela-selecao` (com `renderizarSelecao()`) |
| `btn-menu` | → `tela-menu` (com `atualizarMenu()`) |

---

## 6.8 Animações (em `css/arena.css`)

Todas são animações CSS simples com `@keyframes`, aplicadas e removidas pelo JavaScript.

| Classe | Quando | Efeito sugerido |
|--------|--------|-----------------|
| `animar-ataque` | Quem ataca | Avança um pouco para frente e volta (`translateX`) |
| `animar-dano` | Quem recebe dano | Treme (`translateX` alternado) + fica avermelhado (`filter`) |
| `animar-bloqueio` | Recebe dano defendendo | Pisca azul |
| `defendendo` | **Enquanto** defende (fica ligada) | Borda/brilho azul, escudo 🛡️ com `::after` |
| `animar-cura` | Quem cura | Brilho verde pulsando |
| `animar-especial` | Quem usa o ataque máximo | Aumenta de tamanho, brilho forte, tela pisca |
| `atordoado` | Enquanto atordoado | Gira de leve, fica acinzentado, 💫 com `::after` |

**Atenção ao lado da IA:** como a figura da IA está espelhada, a animação de ataque deve avançar para a **esquerda**. Use uma classe diferente para cada lado ou coloque o espelhamento num elemento interno.

Exemplo:

```css
@keyframes tremer {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
.animar-dano { animation: tremer 0.3s; filter: drop-shadow(0 0 10px red); }
```

Função para aplicar uma animação **mesmo que ela já tenha acontecido antes** (o "truque" do `offsetWidth` reinicia a animação):

```js
function animar(lutador, classeAnimacao) {
  const prefixo = lutador.controle;                       // "jogador" ou "ia"
  const figura = document.getElementById(prefixo + "-figura");
  figura.classList.remove(classeAnimacao);
  void figura.offsetWidth;                                // força o navegador a reiniciar
  figura.classList.add(classeAnimacao);
  setTimeout(() => figura.classList.remove(classeAnimacao), 600);
}
```

---

## 6.9 Controles do teclado (em `main.js`)

```js
function configurarTeclado() {
  document.addEventListener("keydown", function (evento) {
    if (!partida || !partida.ativa) return;
    const tecla = evento.key.toLowerCase();          // funciona com Caps Lock ligado
    if (tecla === "f") jogadorAtacar();
    if (tecla === "g" && !evento.repeat) jogadorDefender();
    if (tecla === "h") jogadorCurar();
    if (tecla === "r") jogadorEspecial();
  });

  document.addEventListener("keyup", function (evento) {
    if (evento.key.toLowerCase() === "g") jogadorSoltarDefesa();
  });
}
```

**Botão Defender (segurar):**

```js
const btnDefender = document.getElementById("btn-defender");
btnDefender.addEventListener("mousedown", jogadorDefender);
btnDefender.addEventListener("mouseup", jogadorSoltarDefesa);
btnDefender.addEventListener("mouseleave", jogadorSoltarDefesa);   // se o mouse sair do botão
btnDefender.addEventListener("touchstart", jogadorDefender);
btnDefender.addEventListener("touchend", jogadorSoltarDefesa);
```

> **Cuidado com o foco:** depois de clicar num botão com o mouse, apertar Espaço/Enter "clica" nele de novo. Como os controles do jogo são F/G/H/R, isso não atrapalha, mas evite usar Espaço como tecla do jogo.

---

## 6.10 Estilo visual sugerido

- Fundo escuro (arena noturna) com gradiente roxo/azul — combina com a "Ruptura".
- Uma "fenda" brilhante no fundo da arena (uma `div` com gradiente e `box-shadow`).
- Fonte do sistema (`font-family: "Segoe UI", Arial, sans-serif`) — **não** use Google Fonts (precisa de internet).
- Botões grandes, com `:hover` e `:active` (afundar ao clicar) e estilo `:disabled` (cinza).
- Cores por função: vermelho = dano/IA, azul = defesa/jogador, verde = cura, dourado = especial.
- Defina as cores como variáveis CSS em `:root`:

```css
:root {
  --cor-fundo: #14101f;
  --cor-painel: #221a36;
  --cor-texto: #f2ecff;
  --cor-jogador: #3d8bff;
  --cor-ia: #ff4d5e;
  --cor-cura: #3ecf5a;
  --cor-especial: #ffc93c;
}
```
