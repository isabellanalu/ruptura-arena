# 3. Regras de combate

Todas as regras valem **igualmente** para o jogador e para a IA. Os números vêm do objeto `CONFIG` (em `dados.js`). Para equilibrar o jogo, mude os valores no `CONFIG`, **não** dentro das funções.

---

## 3.1 Quando um lutador pode agir?

```js
function podeAgir(lutador) {
  if (!partida || !partida.ativa) return false;
  const agora = Date.now();
  if (agora < lutador.ocupadoAte) return false;     // ainda "se recuperando" da última ação
  if (agora < lutador.atordoadoAte) return false;   // atordoado
  if (lutador.defendendo) return false;             // enquanto defende, não faz outra coisa
  return true;
}
```

Isso garante que **ninguém faz duas ações ao mesmo tempo** (regra que vale para a IA e para o jogador). Também impede que o jogador vença só apertando F muito rápido.

---

## 3.2 Ataque normal (tecla F)

**Fórmula do dano:**

```
danoBase = ataque do atacante + sorteio(0, VARIACAO_DANO)
dano     = danoBase − arredondar_para_baixo(defesa do alvo ÷ 2)
dano     = no mínimo DANO_MINIMO
se o alvo está defendendo → aplica a redução da defesa (3.3)
se o alvo está com escudo → dano ÷ 2
dano final = arredondado, no mínimo 1
```

**Em código:**

```js
function calcularDano(atacante, alvo, multiplicador, ignoraDefesa) {
  let dano = (atacante.dados.ataque + sorteio(0, CONFIG.VARIACAO_DANO)) * multiplicador;

  if (!ignoraDefesa) {
    dano = dano - Math.floor(alvo.dados.defesa / 2);
    dano = Math.max(dano, CONFIG.DANO_MINIMO);

    if (alvo.defendendo) {
      const reducao = Math.min(
        CONFIG.REDUCAO_DEFESA_BASE + alvo.dados.defesa * CONFIG.REDUCAO_DEFESA_POR_PONTO,
        CONFIG.REDUCAO_DEFESA_MAX
      );
      dano = dano * (1 - reducao / 100);
    }
  }

  if (escudoAtivo(alvo)) {
    dano = dano / 2;
  }

  return Math.max(Math.round(dano), 1);
}
```

**Passos da função `atacar(atacante, alvo)`:**

1. Se `!podeAgir(atacante)` → retorna `false`.
2. `dano = calcularDano(atacante, alvo, 1, false)`.
3. `atacante.ocupadoAte = Date.now() + CONFIG.RECARGA_ATAQUE_MS`.
4. Animação `animar-ataque` no atacante e `animar-dano` no alvo (ou `animar-bloqueio` se ele estava defendendo).
5. Mensagem: *"Faísca atacou e causou 9 de dano!"* (se o alvo defendeu: *"Casco defendeu! Recebeu só 4 de dano."*)
6. `aplicarDano(alvo, dano)`.
7. `atualizarBatalha()` e retorna `true`.

**Exemplo:** Faísca (ataque 12) ataca Casco (defesa 14), sorteio deu 2 → `12 + 2 − 7 = 7` de dano. Se Casco estiver defendendo: redução `20 + 14×3 = 62%` → `7 × 0,38 = 2,66` → **3** de dano.

---

## 3.3 Defesa (tecla G — segurar)

- **Jogador:** a defesa fica ativa **enquanto a tecla G (ou o botão Defender) estiver pressionada**. Ao soltar, a defesa acaba.
- **IA:** defende por um tempo definido (ex.: 1,5 s) e depois solta sozinha.
- Enquanto defende, o lutador **não** pode atacar, curar nem usar o ataque máximo.
- A defesa **reduz** o dano, mas **nunca** zera (máximo de 70%).

**Redução quando defendendo:**

```
redução (%) = mínimo entre (20 + defesa × 3) e 70
```

| Defesa do personagem | Redução |
|---|---|
| 6 | 38% |
| 9 | 47% |
| 10 | 50% |
| 14 | 62% |
| 17 ou mais | 70% (máximo) |

**Funções:**

```js
function iniciarDefesa(lutador) {
  if (!podeAgir(lutador)) return false;
  lutador.defendendo = true;
  // adiciona classe CSS "defendendo" na figura, mostra mensagem, atualizarBatalha()
  return true;
}

function pararDefesa(lutador) {
  if (!lutador.defendendo) return false;
  lutador.defendendo = false;
  // remove classe CSS "defendendo", atualizarBatalha()
  return true;
}
```

---

## 3.4 Cura (tecla H)

- Recupera **20% da vida máxima** (`CONFIG.CURA_PERCENTUAL`), arredondado.
- A vida **nunca** passa de `vidaMaxima`.
- Só pode ser usada **uma vez a cada 10 segundos** (`CONFIG.RECARGA_CURA_MS`).
- Começa a partida **disponível**.
- A interface mostra **"Cura pronta"** ou **"Cura em 7s"**.

**Passos da função `curar(lutador)`:**

1. Se `!podeAgir(lutador)` ou `!curaDisponivel(lutador)` → retorna `false`.
2. `quantidade = Math.round(lutador.dados.vidaMaxima * CONFIG.CURA_PERCENTUAL)`.
3. `lutador.vida = Math.min(lutador.vida + quantidade, lutador.dados.vidaMaxima)`.
4. `lutador.proximaCuraEm = Date.now() + CONFIG.RECARGA_CURA_MS`.
5. `lutador.ocupadoAte = Date.now() + CONFIG.TEMPO_ACAO_CURA_MS`.
6. Animação `animar-cura`, mensagem *"Casco se curou e recuperou 26 de vida!"*, `atualizarBatalha()`.

**Segundos que faltam para a cura** (para mostrar na tela):

```js
const faltam = Math.ceil((lutador.proximaCuraEm - Date.now()) / 1000);
```

---

## 3.5 Ataque máximo (tecla R)

- Habilidade especial **muito poderosa**, própria de cada personagem.
- **Uma única vez por partida** (`especialUsado` vira `true` e não volta).
- Causa **mais dano que o ataque normal** (multiplicador de 2× a 3×).
- Tem **efeito visual especial** (classe `animar-especial` + mensagem destacada).
- Depois de usado, o botão fica desabilitado com o texto "Usado".

**Passos da função `usarEspecial(atacante, alvo)`:**

1. Se `!podeAgir(atacante)` ou `atacante.especialUsado` → retorna `false`.
2. `atacante.especialUsado = true`.
3. `ignora = atacante.dados.especial.efeito === "ignoraDefesa"`.
4. `dano = calcularDano(atacante, alvo, atacante.dados.especial.multiplicador, ignora)`.
5. `atacante.ocupadoAte = Date.now() + CONFIG.TEMPO_ACAO_ESPECIAL_MS`.
6. Animações e mensagem: *"⚡ ZUNIDO USOU RELÂMPAGO NOTURNO! 31 de dano!"*
7. `aplicarDano(alvo, dano)`.
8. Se a partida **ainda** estiver ativa: `aplicarEfeitoEspecial(atacante, alvo, dano)`.
9. `atualizarBatalha()` e retorna `true`.

### Efeitos especiais (`especial.efeito`)

| Efeito | O que faz | Código |
|--------|-----------|--------|
| `"nenhum"` | Só o dano | — |
| `"escudo"` | O atacante recebe metade do dano por 5 s | `atacante.escudoAte = Date.now() + CONFIG.DURACAO_ESCUDO_MS` |
| `"atordoar"` | O alvo não pode agir por 2 s e perde a defesa | `alvo.atordoadoAte = Date.now() + CONFIG.DURACAO_ATORDOAR_MS; alvo.defendendo = false` |
| `"ignoraDefesa"` | O dano ignora a defesa do alvo (passo 3 acima) | — |
| `"rouboVida"` | O atacante recupera 50% do dano causado (sem passar do máximo) | `atacante.vida = Math.min(atacante.vida + Math.round(dano / 2), atacante.dados.vidaMaxima)` |
| `"bloqueiaCura"` | A cura do alvo volta a ficar 10 s em recarga | `alvo.proximaCuraEm = Date.now() + CONFIG.RECARGA_CURA_MS` |

Use um `switch` em `aplicarEfeitoEspecial`:

```js
function aplicarEfeitoEspecial(atacante, alvo, dano) {
  switch (atacante.dados.especial.efeito) {
    case "escudo":
      atacante.escudoAte = Date.now() + CONFIG.DURACAO_ESCUDO_MS;
      break;
    case "atordoar":
      // ...
      break;
    // ... demais efeitos
  }
}
```

---

## 3.6 Aplicando dano e fim por vida

```js
function aplicarDano(alvo, dano) {
  alvo.vida = Math.max(alvo.vida - dano, 0);   // vida nunca fica negativa
  if (alvo.vida === 0) {
    encerrarPartida("vida");                    // a partida termina IMEDIATAMENTE
  }
}
```

---

## 3.7 Cronômetro e fim por tempo

- A partida dura **exatamente 150 segundos** (2:30).
- O cronômetro começa quando a batalha começa e aparece no formato `m:ss`.
- Diminui 1 a cada segundo com `setInterval(tickCronometro, 1000)`.
- Quando chega a **0** → `encerrarPartida("tempo")`.
- Quando a partida termina (por qualquer motivo) → `clearInterval`.

```js
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return min + ":" + String(seg).padStart(2, "0");
}
```

> **Dica:** nos últimos 30 segundos, adicione a classe `tempo-acabando` no cronômetro (fica vermelho piscando).

---

## 3.8 Quem venceu?

```js
function definirResultado() {
  const j = partida.jogador.vida;
  const ia = partida.ia.vida;
  if (j > ia) return "vitoria";
  if (ia > j) return "derrota";
  return "empate";
}
```

Esta regra serve **para os dois casos**: se alguém chegou a 0, o outro tem mais vida; se o tempo acabou, vence quem tem mais vida; vida igual = empate.

| Resultado | O que acontece com `sessao` |
|-----------|----------------------------|
| Vitória | `vitorias + 1` (o nível pode subir) |
| Derrota | `derrotas + 1` |
| Empate | `empates + 1` — **nenhuma vitória contada** |

```js
function registrarResultado(resultado) {
  const nivelAntes = nivelAtual();
  if (resultado === "vitoria") sessao.vitorias++;
  else if (resultado === "derrota") sessao.derrotas++;
  else sessao.empates++;
  salvarProgresso();                  // guarda no localStorage
  return nivelAtual() > nivelAntes;   // true = subiu de nível
}
```

---

## 3.9 Regras de proteção (evitam os bugs mais comuns)

1. **Toda ação** começa com `podeAgir()` (ou checa `partida.ativa`).
2. `encerrarPartida()` sai na hora se a partida já foi encerrada.
3. Ao encerrar: `clearInterval` do cronômetro **e** da IA.
4. Ao iniciar uma nova partida: pare intervalos antigos **antes** de criar novos (senão o tempo corre 2× mais rápido).
5. Os `setTimeout` da IA (ex.: soltar defesa) devem checar se a partida ainda é a mesma e está ativa.
6. Vida sempre entre `0` e `vidaMaxima` (`Math.max` / `Math.min`).
