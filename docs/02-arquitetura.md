# 2. Arquitetura do código

Este é o documento **mais importante** para o trabalho em grupo. Ele define os **nomes** de arquivos, variáveis e funções. Se todos seguirem esses nomes, o código de cada um vai se encaixar no código dos outros.

> **Regra de ouro:** não renomeie funções ou variáveis desta lista sem combinar com o grupo e atualizar este documento.

---

## 2.1 Visão geral

```
                ┌──────────────┐
                │  index.html  │  (todas as telas, escondidas/mostradas)
                └──────┬───────┘
                       │ carrega na ordem:
   dados.js → estado.js → niveis.js → interface.js → combate.js
            → ia.js → cronometro.js → resultado.js → main.js
```

Cada arquivo JS cuida de **uma parte** do jogo:

| Arquivo | Responsabilidade | Depende de |
|---------|------------------|-----------|
| `dados.js` | `CONFIG` (números do jogo) e `PERSONAGENS` (lista) | — |
| `estado.js` | Variáveis `sessao` e `partida`; cria lutadores e partidas | dados |
| `niveis.js` | Calcula nível pelas vitórias; filtra personagens liberados | dados, estado |
| `interface.js` | Mostra telas, desenha cartões, barras, mensagens, animações | todos os dados |
| `combate.js` | Regras das 4 ações (valem para jogador **e** IA) | estado, interface |
| `ia.js` | Escolha de personagem e decisões da IA | combate |
| `cronometro.js` | Contagem regressiva de 2:30 | estado, interface |
| `resultado.js` | Encerra partida, define vencedor, atualiza vitórias/nível | todos |
| `main.js` | Liga botões e teclado às funções; inicia o jogo | todos |

## 2.2 O `index.html`

Todas as telas ficam **no mesmo HTML**, cada uma numa `<section>`. Só uma aparece por vez (as outras têm a classe `escondida`).

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ruptura Arena</title>
  <link rel="stylesheet" href="css/estilo.css">
  <link rel="stylesheet" href="css/arena.css">
  <link rel="stylesheet" href="css/personagens.css">
</head>
<body>
  <section id="tela-menu" class="tela">...</section>
  <section id="tela-personagens" class="tela escondida">...</section>
  <section id="tela-como-jogar" class="tela escondida">...</section>
  <section id="tela-selecao" class="tela escondida">...</section>
  <section id="tela-batalha" class="tela escondida">...</section>
  <section id="tela-resultado" class="tela escondida">...</section>

  <!-- A ORDEM DOS SCRIPTS IMPORTA. Não use type="module". -->
  <script src="js/dados.js"></script>
  <script src="js/estado.js"></script>
  <script src="js/niveis.js"></script>
  <script src="js/interface.js"></script>
  <script src="js/combate.js"></script>
  <script src="js/ia.js"></script>
  <script src="js/cronometro.js"></script>
  <script src="js/resultado.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

A lista completa de IDs de cada tela está em [06-interface.md](06-interface.md).

### Por que não usar `import` / `export`?

Ao abrir o `index.html` com dois cliques, o navegador usa o endereço `file://`, e nele os módulos JavaScript são bloqueados por segurança. Com `<script src>` comum, **todas as funções e variáveis declaradas no topo de um arquivo ficam disponíveis para os outros arquivos**. É simples e funciona em qualquer computador.

---

## 2.3 Dados (`dados.js`)

### `CONFIG` — todos os números do jogo

```js
const CONFIG = {
  DURACAO_PARTIDA_S: 150,          // 2 minutos e 30 segundos

  RECARGA_ATAQUE_MS: 1000,         // tempo entre um ataque e a próxima ação
  TEMPO_ACAO_CURA_MS: 600,         // tempo "ocupado" depois de curar
  TEMPO_ACAO_ESPECIAL_MS: 1500,    // tempo "ocupado" depois do ataque máximo

  VARIACAO_DANO: 4,                // dano extra aleatório de 0 a 4
  DANO_MINIMO: 3,                  // nenhum golpe causa menos que isso

  REDUCAO_DEFESA_BASE: 20,         // % de redução da defesa (base)
  REDUCAO_DEFESA_POR_PONTO: 3,     // % a mais por ponto de defesa
  REDUCAO_DEFESA_MAX: 70,          // a defesa nunca bloqueia mais que 70%

  CURA_PERCENTUAL: 0.20,           // cura 20% da vida máxima
  RECARGA_CURA_MS: 10000,          // cura 1 vez a cada 10 segundos

  DURACAO_ESCUDO_MS: 5000,         // efeito especial "escudo"
  DURACAO_ATORDOAR_MS: 2000,       // efeito especial "atordoar"

  INTERVALO_IA_MS: { 1: 1500, 2: 1100, 3: 800 },  // a IA "pensa" a cada X ms

  VITORIAS_NIVEL_2: 2,
  VITORIAS_NIVEL_3: 4
};
```

### `PERSONAGENS` — lista de objetos

Cada personagem segue **exatamente** este formato (os valores estão em [04-personagens.md](04-personagens.md)):

```js
const PERSONAGENS = [
  {
    id: "faisca",                    // texto sem espaço/acento; usado em classes CSS
    nome: "Faísca",
    titulo: "Raposa de Fogo",
    emoji: "🦊",
    nivelMinimo: 1,                  // 1, 2 ou 3
    tipo: "Equilibrado",             // "Ataque", "Defesa" ou "Equilibrado"
    vidaMaxima: 100,
    ataque: 12,
    defesa: 9,
    personalidade: "Curiosa, rápida e um pouco impulsiva.",
    historia: "Nasceu numa fogueira...",
    especial: {
      nome: "Explosão de Brasas",
      descricao: "Causa o triplo do dano de um ataque normal.",
      multiplicador: 3,
      efeito: "nenhum"               // ver tabela de efeitos em 03-regras-de-combate.md
    }
  },
  // ... outros 5 personagens
];
```

### Função auxiliar

```js
function buscarPersonagem(id)  // retorna o objeto do personagem com esse id (ou undefined)
```

---

## 2.4 Estado (`estado.js`)

O **estado** são as variáveis que guardam "como está o jogo agora".

### `sessao` — o progresso do jogador (salvo no `localStorage`)

```js
const sessao = {
  vitorias: 0,
  derrotas: 0,
  empates: 0
};
```

O **nível não é guardado**: ele é sempre calculado a partir de `sessao.vitorias` com `calcularNivel()`. Assim nunca fica desatualizado.

### Salvando o progresso com `localStorage`

O `localStorage` guarda **texto** no navegador, e esse texto continua lá depois que a página é fechada. Para guardar um objeto, ele é transformado em texto com `JSON.stringify` e, na leitura, volta a ser objeto com `JSON.parse`.

**Só o `estado.js` mexe no `localStorage`**, usando estas três funções:

```js
const CHAVE_PROGRESSO = "rupturaArena.progresso";

// Salva vitórias, derrotas e empates no navegador
function salvarProgresso() {
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(sessao));
}

// Lê o progresso salvo (se existir) e coloca no objeto sessao
function carregarProgresso() {
  const texto = localStorage.getItem(CHAVE_PROGRESSO);
  if (texto === null) return;              // primeira vez: nada salvo ainda
  try {
    const salvo = JSON.parse(texto);
    sessao.vitorias = Number(salvo.vitorias) || 0;
    sessao.derrotas = Number(salvo.derrotas) || 0;
    sessao.empates = Number(salvo.empates) || 0;
  } catch (erro) {
    zerarProgresso();                      // texto estragado: começa do zero
  }
}

// Volta tudo a zero e apaga o que estava salvo
function zerarProgresso() {
  sessao.vitorias = 0;
  sessao.derrotas = 0;
  sessao.empates = 0;
  localStorage.removeItem(CHAVE_PROGRESSO);
}
```

Quando cada uma é chamada:

| Função | Quem chama | Quando |
|--------|-----------|--------|
| `carregarProgresso()` | `inicializar()` em `main.js` | Ao abrir o jogo, **antes** de `atualizarMenu()` |
| `salvarProgresso()` | `registrarResultado()` em `resultado.js` | Depois de cada partida |
| `zerarProgresso()` | Botão **Zerar progresso** do menu | Depois de `confirm("Tem certeza?")` |

> Para ver o que está salvo: F12 → aba **Application** (Chrome/Edge) ou **Armazenamento** (Firefox) → *Local Storage*.

### `partida` — criada a cada nova batalha

```js
let partida = null;   // null = nenhuma partida acontecendo
```

Quando uma batalha começa, `partida` recebe:

```js
{
  ativa: true,               // false quando a partida termina
  nivel: 1,                  // nível do jogador no início da partida (define a dificuldade da IA)
  tempoRestante: 150,        // em segundos
  jogador: { ...lutador },   // ver abaixo
  ia: { ...lutador },
  intervaloCronometro: null, // id do setInterval do cronômetro
  intervaloIA: null          // id do setInterval da IA
}
```

### Lutador — um personagem **dentro** da batalha

O objeto do personagem (em `PERSONAGENS`) **nunca é alterado**. Na batalha, criamos um **lutador**, que guarda a vida atual e os estados:

```js
{
  dados: personagem,         // referência ao objeto de PERSONAGENS
  controle: "jogador",       // "jogador" ou "ia"
  vida: 100,                 // começa igual a dados.vidaMaxima
  defendendo: false,
  especialUsado: false,
  proximaCuraEm: 0,          // horário (Date.now()) em que a cura volta; 0 = já disponível
  ocupadoAte: 0,             // horário até quando não pode fazer outra ação
  atordoadoAte: 0,           // horário até quando está atordoado
  escudoAte: 0               // horário até quando o escudo está ativo
}
```

> **Por que usar horários (`Date.now()`) em vez de contadores?** `Date.now()` devolve o horário atual em milissegundos. Para saber se a cura está disponível basta comparar: `Date.now() >= lutador.proximaCuraEm`. Não é preciso nenhum `setInterval` extra para contar o tempo de recarga.

### Funções

```js
function criarLutador(personagem, controle)  // retorna um objeto lutador novo
function criarPartida(idJogador, idIA)       // cria e guarda o objeto em `partida`; retorna partida
function salvarProgresso()                   // grava `sessao` no localStorage
function carregarProgresso()                 // lê do localStorage para `sessao`
function zerarProgresso()                    // zera `sessao` e apaga o salvo
```

---

## 2.5 Níveis (`niveis.js`)

```js
function calcularNivel(vitorias)         // 0–1 → 1 | 2–3 → 2 | 4+ → 3
function nivelAtual()                    // atalho: calcularNivel(sessao.vitorias)
function nomeDoNivel(nivel)              // 1 → "Iniciante", 2 → "Intermediário", 3 → "Avançado"
function personagemLiberado(personagem, nivel)  // true se personagem.nivelMinimo <= nivel
function personagensDisponiveis(nivel)   // lista de PERSONAGENS liberados nesse nível
```

---

## 2.6 Interface (`interface.js`)

A interface **só mostra** o estado; ela **não decide regras**.

```js
function mostrarTela(idTela)            // esconde todas as .tela e mostra a do id
function atualizarMenu()                // escreve nível e vitórias no menu
function renderizarGaleria()            // cartões de TODOS os personagens (tela Personagens)
function renderizarSelecao()            // cartões para escolher (bloqueados não clicáveis)
function criarCartaoPersonagem(personagem, liberado)  // retorna um elemento HTML do cartão
function montarArena()                  // coloca nomes e figuras dos lutadores na arena
function atualizarBatalha()             // atualiza barras, cronômetro, indicadores e botões
function atualizarBarraVida(lutador, prefixo)  // prefixo = "jogador" ou "ia"
function mostrarMensagem(texto, tipo)   // tipo = "jogador", "ia" ou "sistema"
function limparMensagens()
function animar(lutador, classeAnimacao)       // aplica uma animação CSS à figura do lutador
function mostrarTelaResultado(resultado, subiuDeNivel)
```

---

## 2.7 Combate (`combate.js`)

As regras são **as mesmas** para jogador e IA. Por isso as funções recebem o lutador como parâmetro. Fórmulas em [03-regras-de-combate.md](03-regras-de-combate.md).

```js
// Utilitários
function sorteio(min, max)                // inteiro aleatório entre min e max (inclusive)
function adversarioDe(lutador)            // devolve o outro lutador da partida
function podeAgir(lutador)                // partida ativa, não ocupado, não atordoado, não defendendo
function curaDisponivel(lutador)          // Date.now() >= lutador.proximaCuraEm
function especialDisponivel(lutador)      // !lutador.especialUsado
function escudoAtivo(lutador)             // Date.now() < lutador.escudoAte

// Cálculo
function calcularDano(atacante, alvo, multiplicador, ignoraDefesa)  // retorna número
function aplicarDano(alvo, dano)          // tira vida (nunca abaixo de 0) e verifica fim

// As 4 ações (retornam true se a ação aconteceu, false se não pôde)
function atacar(atacante, alvo)
function iniciarDefesa(lutador)
function pararDefesa(lutador)
function curar(lutador)
function usarEspecial(atacante, alvo)
function aplicarEfeitoEspecial(atacante, alvo, dano)   // efeito próprio de cada personagem

// Atalhos para o jogador (chamados pelos botões e pelo teclado)
function jogadorAtacar()
function jogadorDefender()
function jogadorSoltarDefesa()
function jogadorCurar()
function jogadorEspecial()
```

---

## 2.8 Inteligência artificial (`ia.js`)

Detalhes em [05-inteligencia-artificial.md](05-inteligencia-artificial.md).

```js
function escolherPersonagemIA(idJogador)  // retorna o id de um personagem liberado
function iniciarIA()                      // cria o setInterval que chama turnoIA()
function pararIA()                        // clearInterval
function turnoIA()                        // a cada intervalo: se pode agir, decide e executa
function decidirAcaoIA()                  // retorna "atacar" | "defender" | "curar" | "especial" | "esperar"
function decidirNivel1(ia, jogador)
function decidirNivel2(ia, jogador)
function decidirNivel3(ia, jogador)
function executarAcaoIA(acao)
function atacarJogador()
function defenderIA(duracaoMs)
function curarIA()
function usarAtaqueMaximoIA()
function percentualVida(lutador)          // 0 a 100
function chance(probabilidade)            // true com a probabilidade dada (0.3 = 30%)
```

---

## 2.9 Cronômetro (`cronometro.js`)

```js
function iniciarCronometro()      // setInterval de 1 segundo que chama tickCronometro()
function tickCronometro()         // diminui tempoRestante, atualiza tela, encerra no zero
function pararCronometro()        // clearInterval
function formatarTempo(segundos)  // 150 → "2:30", 65 → "1:05", 9 → "0:09"
```

---

## 2.10 Resultado (`resultado.js`)

```js
function encerrarPartida(motivo)     // motivo: "vida" ou "tempo". Para TUDO e mostra resultado
function definirResultado()          // retorna "vitoria", "derrota" ou "empate"
function registrarResultado(resultado)  // atualiza sessao, chama salvarProgresso(); retorna true se subiu de nível
```

`encerrarPartida` é a **única** função que termina uma partida. Ela deve:

1. Sair imediatamente se `partida.ativa` já for `false` (evita encerrar duas vezes).
2. Colocar `partida.ativa = false`.
3. Chamar `pararCronometro()` e `pararIA()`.
4. Tirar a defesa dos dois lutadores.
5. Calcular o resultado, registrar e mostrar a tela de resultado.

---

## 2.11 Inicialização e controles (`main.js`)

```js
function iniciarBatalha(idPersonagemJogador)  // cria partida, escolhe IA, monta arena, inicia cronômetro e IA
function configurarBotoes()                   // addEventListener em todos os botões
function configurarTeclado()                  // keydown / keyup para F, G, H, R
function inicializar()                        // carregarProgresso(), configura botões/teclado, mostra o menu
document.addEventListener("DOMContentLoaded", inicializar);
```

---

## 2.12 Fluxo do jogo

```
[Menu] ──Jogar──► [Seleção] ──clica no cartão──► iniciarBatalha()
  │  ▲                                                │
  │  └──────────────── Menu ◄──┐                      ▼
  ├─Personagens─► [Galeria]    │                  [Batalha]
  └─Como jogar──► [Ajuda]      │                      │ vida 0 ou tempo 0
                               │                      ▼
                         [Resultado] ◄─────── encerrarPartida()
                               │
                               └── Jogar novamente ──► [Seleção]
```

"Jogar novamente" volta para a **seleção**, porque o nível pode ter mudado e novos personagens podem estar liberados.

---

## 2.13 Padrões de código

- Nomes em **português**, sem acento, em `camelCase`: `vidaMaxima`, `curaDisponivel`.
- Constantes globais em MAIÚSCULAS: `CONFIG`, `PERSONAGENS`.
- Use `const` e `let`. **Nunca** `var`.
- Indentação de **2 espaços**.
- Toda função tem um comentário de uma linha dizendo o que faz.
- Cada arquivo começa com um comentário de cabeçalho:

```js
// =============================================
// combate.js — regras de ataque, defesa, cura e ataque máximo
// Responsável: (nome do aluno)
// =============================================
```

- Toda ação de combate começa verificando se a partida está ativa:

```js
if (!partida || !partida.ativa) return false;
```
