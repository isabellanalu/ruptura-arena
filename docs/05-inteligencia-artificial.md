# 5. Inteligência artificial do adversário

> **Requisito obrigatório:** a IA é programada **por vocês**, em JavaScript puro, com **funções, condições (`if`), variáveis e probabilidades (`Math.random`)**. Nada de APIs, bibliotecas ou internet.

A IA **não** é "um robô que ataca a cada 2 segundos". A cada turno ela **olha a situação da batalha** (vida dela, vida do jogador, cura disponível, ataque máximo disponível, se o jogador está defendendo, tempo restante) e **decide** a melhor ação conforme o nível.

---

## 5.1 Como a IA funciona (visão geral)

```
 a cada INTERVALO_IA_MS (1500 / 1100 / 800 ms conforme o nível)
           │
           ▼
      turnoIA()
           │  a IA pode agir? (podeAgir) ── não ──► espera o próximo turno
           │ sim
           ▼
   decidirAcaoIA()  ──►  "atacar" | "defender" | "curar" | "especial" | "esperar"
           │
           ▼
   executarAcaoIA(acao)
      ├─ "atacar"   → atacarJogador()
      ├─ "defender" → defenderIA(duração)
      ├─ "curar"    → curarIA()
      ├─ "especial" → usarAtaqueMaximoIA()
      └─ "esperar"  → não faz nada
```

**Separar decidir de executar** deixa o código mais fácil de entender e testar: dá para chamar `decidirAcaoIA()` no console e ver o que a IA escolheria.

A IA usa **as mesmas funções de combate do jogador** (`atacar`, `curar`, `usarEspecial`, `iniciarDefesa`). Por isso ela **não consegue** quebrar as regras: se a cura estiver em recarga, `curar()` simplesmente retorna `false`.

---

## 5.2 Escolha do personagem

```js
function escolherPersonagemIA(idJogador) {
  const disponiveis = personagensDisponiveis(nivelAtual());
  // tenta não escolher o mesmo personagem do jogador
  const outros = disponiveis.filter(p => p.id !== idJogador);
  const lista = outros.length > 0 ? outros : disponiveis;
  const sorteado = lista[Math.floor(Math.random() * lista.length)];
  return sorteado.id;
}
```

---

## 5.3 Funções auxiliares

```js
function percentualVida(lutador) {
  return (lutador.vida / lutador.dados.vidaMaxima) * 100;
}

function chance(probabilidade) {      // chance(0.3) é verdadeiro 30% das vezes
  return Math.random() < probabilidade;
}
```

---

## 5.4 Turno da IA

```js
function iniciarIA() {
  pararIA();
  const intervalo = CONFIG.INTERVALO_IA_MS[partida.nivel];
  partida.intervaloIA = setInterval(turnoIA, intervalo);
}

function pararIA() {
  if (partida && partida.intervaloIA) {
    clearInterval(partida.intervaloIA);
    partida.intervaloIA = null;
  }
}

function turnoIA() {
  if (!partida || !partida.ativa) return;
  if (!podeAgir(partida.ia)) return;
  const acao = decidirAcaoIA();
  executarAcaoIA(acao);
}

function decidirAcaoIA() {
  const ia = partida.ia;
  const jogador = partida.jogador;
  if (partida.nivel === 1) return decidirNivel1(ia, jogador);
  if (partida.nivel === 2) return decidirNivel2(ia, jogador);
  return decidirNivel3(ia, jogador);
}
```

---

## 5.5 Regras de decisão por nível

As regras são verificadas **de cima para baixo**: a **primeira** que for verdadeira decide a ação.

### Nível 1 — Iniciante (decisões simples, quase só ataca)

| Ordem | Condição | Ação |
|:-----:|----------|------|
| 1 | Especial disponível **e** `chance(0.10)` | `"especial"` |
| 2 | Vida da IA < 30% **e** cura disponível **e** `chance(0.50)` | `"curar"` |
| 3 | `chance(0.10)` | `"defender"` (1 s) |
| 4 | Caso contrário | `"atacar"` |

A IA iniciante usa o especial em momentos aleatórios (até no começo), cura só às vezes e quase não defende.

### Nível 2 — Intermediário (alterna ataque e defesa, cura quando precisa)

| Ordem | Condição | Ação |
|:-----:|----------|------|
| 1 | Vida da IA < 40% **e** cura disponível | `"curar"` |
| 2 | Especial disponível **e** jogador **não** defendendo **e** (vida do jogador < 50% **ou** `chance(0.15)`) | `"especial"` |
| 3 | `chance(0.30)` | `"defender"` (1,5 s) |
| 4 | Caso contrário | `"atacar"` |

### Nível 3 — Avançado (analisa a batalha)

Antes das regras, a IA calcula:

```js
const minhaVida = percentualVida(ia);
const vidaJogador = percentualVida(jogador);
const danoEspecial = ia.dados.ataque * ia.dados.especial.multiplicador - Math.floor(jogador.dados.defesa / 2);
const estouGanhando = minhaVida > vidaJogador;
const tempoAcabando = partida.tempoRestante <= 20;
```

| Ordem | Condição | Ação | Por quê |
|:-----:|----------|------|---------|
| 1 | Especial disponível **e** jogador não defendendo **e** `danoEspecial >= jogador.vida` | `"especial"` | Finalizar a luta |
| 2 | `minhaVida < 35` **e** cura disponível | `"curar"` | Sobreviver |
| 3 | `minhaVida < 35` **e** cura **não** disponível **e** `chance(0.60)` | `"defender"` (2 s) | Ganhar tempo até a cura voltar |
| 4 | `tempoAcabando` **e** `estouGanhando` | `"defender"` (2 s) | Segurar a vantagem até o fim |
| 5 | Jogador **defendendo** **e** `minhaVida < 70` **e** cura disponível | `"curar"` | Aproveitar que o jogador não está atacando |
| 6 | Jogador **defendendo** **e** `chance(0.50)` | `"esperar"` | Não gastar ataque num jogador protegido |
| 7 | Especial disponível **e** jogador não defendendo **e** `vidaJogador < 45` | `"especial"` | Golpe forte na hora certa |
| 8 | `!estouGanhando` **e** `chance(0.35)` | `"defender"` (1,5 s) | Cautela quando está perdendo |
| 9 | Caso contrário | `"atacar"` | — |

### Exemplo de código (nível 2)

```js
function decidirNivel2(ia, jogador) {
  if (percentualVida(ia) < 40 && curaDisponivel(ia)) {
    return "curar";
  }
  if (especialDisponivel(ia) && !jogador.defendendo &&
      (percentualVida(jogador) < 50 || chance(0.15))) {
    return "especial";
  }
  if (chance(0.30)) {
    return "defender";
  }
  return "atacar";
}
```

---

## 5.6 Execução das ações

As funções de ação da IA:

```js
function executarAcaoIA(acao) {
  if (acao === "atacar") atacarJogador();
  else if (acao === "defender") defenderIA(1500);   // a duração pode variar conforme a regra
  else if (acao === "curar") curarIA();
  else if (acao === "especial") usarAtaqueMaximoIA();
  // "esperar" → não faz nada
}

function atacarJogador()      { return atacar(partida.ia, partida.jogador); }
function curarIA()            { return curar(partida.ia); }
function usarAtaqueMaximoIA() { return usarEspecial(partida.ia, partida.jogador); }

function defenderIA(duracaoMs) {
  const ia = partida.ia;
  if (!iniciarDefesa(ia)) return false;
  const estaPartida = partida;              // guarda qual partida é esta
  setTimeout(function () {
    if (partida === estaPartida && partida.ativa) {
      pararDefesa(ia);
    }
  }, duracaoMs);
  return true;
}
```

> **Dica para a duração da defesa:** em vez de uma string, `decidirNivelX` pode retornar um objeto `{ acao: "defender", duracao: 2000 }`. Se preferirem manter simples, usem 1000 ms no nível 1, 1500 ms no nível 2 e 2000 ms no nível 3.

---

## 5.7 Por que isso atende aos requisitos

| Requisito | Como foi atendido |
|------------------|-------------------|
| Atacar, defender, curar, usar ataque máximo | `executarAcaoIA` com as 4 ações |
| Respeitar 10 s de cura e 1 ataque máximo | A IA usa as mesmas funções de combate, que bloqueiam |
| Não fazer várias ações ao mesmo tempo | `podeAgir()` + `ocupadoAte` |
| Escolher personagem permitido | `escolherPersonagemIA` usa `personagensDisponiveis` |
| Decidir conforme a situação | Regras usam vida, cura, especial, defesa do jogador e tempo |
| Dificuldade por nível | 3 funções de decisão + IA mais rápida em níveis maiores |
| Funções `decidirAcaoIA`, `atacarJogador`, `defenderIA`, `curarIA`, `usarAtaqueMaximoIA` | Todas existem com esses nomes |

---

## 5.8 Testando a IA pelo console (F12)

Durante uma batalha, abra o console e digite:

```js
decidirAcaoIA()                 // mostra o que a IA faria agora
partida.ia.vida = 20            // deixa a IA com pouca vida → ela deve curar
partida.jogador.vida = 10       // no nível 3, a IA deve usar o especial para finalizar
pararIA()                       // congela a IA (para testar o jogador sozinho)
```

Para ver as decisões acontecendo, coloque temporariamente em `turnoIA()`:

```js
console.log("IA decidiu:", acao);
```

(Remova antes da entrega.)
