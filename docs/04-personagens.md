# 4. Personagens

Seis animais de fantasia, **dois por nível**. Os atributos são diferentes e foram pensados para que nenhum seja muito mais forte que os outros do mesmo nível. Os personagens do nível 3 são um pouco mais fortes, como recompensa.

O grupo pode mudar nomes, histórias e aparência. Se mudar **números**, teste algumas partidas para ver se continua equilibrado.

---

## 4.1 Tabela resumo

| # | Nome | Animal | Emoji | Nível | Tipo | Vida | Ataque | Defesa | Ataque máximo | Efeito |
|---|------|--------|:-----:|:-----:|------|:----:|:------:|:------:|---------------|--------|
| 1 | Faísca | Raposa de Fogo | 🦊 | 1 | Equilibrado | 100 | 12 | 9 | Explosão de Brasas (×3) | `nenhum` |
| 2 | Casco | Tartaruga de Pedra | 🐢 | 1 | Defesa | 130 | 8 | 14 | Muralha Viva (×2) | `escudo` |
| 3 | Zunido | Coruja do Trovão | 🦉 | 2 | Ataque | 85 | 16 | 6 | Relâmpago Noturno (×2,5) | `atordoar` |
| 4 | Bruma | Lobo da Névoa | 🐺 | 2 | Equilibrado | 105 | 13 | 10 | Uivo Sombrio (×2,5) | `ignoraDefesa` |
| 5 | Ignis | Dragão Rubro | 🐉 | 3 | Ataque | 95 | 17 | 7 | Chama Voraz (×2,5) | `rouboVida` |
| 6 | Cristalina | Unicórnio de Cristal | 🦄 | 3 | Defesa | 135 | 11 | 14 | Prisma Congelante (×2,5) | `bloqueiaCura` |

> Os emojis escolhidos existem há muitos anos e aparecem em qualquer Windows, Linux ou celular, sem internet.

---

## 4.2 Fichas

### 🦊 Faísca — Raposa de Fogo
- **Nível:** 1 (Iniciante) · **Tipo:** Equilibrado
- **Vida:** 100 · **Ataque:** 12 · **Defesa:** 9
- **Personalidade:** curiosa, rápida e um pouco impulsiva.
- **História:** nasceu de uma fagulha que caiu da Ruptura numa floresta de outono. Corre tão rápido que deixa rastros de brasa por onde passa e quer provar que até a menor chama pode virar um incêndio.
- **Ataque máximo — Explosão de Brasas:** causa o **triplo** do dano de um ataque normal.
- **Cores:** laranja e vermelho.

### 🐢 Casco — Tartaruga de Pedra
- **Nível:** 1 (Iniciante) · **Tipo:** Defesa
- **Vida:** 130 · **Ataque:** 8 · **Defesa:** 14
- **Personalidade:** calmo, paciente e teimoso.
- **História:** dormiu por trezentos anos no fundo de uma montanha, até que a Ruptura rachou a rocha sobre ele. Seu casco é feito da mesma pedra da arena, e ele acredita que quem resiste mais sempre vence no final.
- **Ataque máximo — Muralha Viva:** causa **2×** o dano e cria um **escudo** que reduz pela metade o dano recebido por **5 segundos**.
- **Cores:** verde-musgo e cinza-pedra.

### 🦉 Zunido — Coruja do Trovão
- **Nível:** 2 (Intermediário) · **Tipo:** Ataque
- **Vida:** 85 · **Ataque:** 16 · **Defesa:** 6
- **Personalidade:** orgulhosa, barulhenta e muito inteligente.
- **História:** vive no topo das nuvens de tempestade e caça relâmpagos à noite. Desceu até a arena porque ouviu dizer que ninguém consegue ser mais rápido que um trovão.
- **Ataque máximo — Relâmpago Noturno:** causa **2,5×** o dano e **atordoa** o adversário por **2 segundos** (ele não pode agir e perde a defesa).
- **Cores:** azul-escuro e amarelo-elétrico.

### 🐺 Bruma — Lobo da Névoa
- **Nível:** 2 (Intermediário) · **Tipo:** Equilibrado
- **Vida:** 105 · **Ataque:** 13 · **Defesa:** 10
- **Personalidade:** silencioso, leal e misterioso.
- **História:** líder de uma alcateia que desapareceu na névoa da Ruptura. Luta na arena na esperança de que o título de campeão abra o portal que leva de volta à sua família.
- **Ataque máximo — Uivo Sombrio:** causa **2,5×** o dano e **ignora completamente a defesa** do adversário.
- **Cores:** cinza-azulado e roxo.

### 🐉 Ignis — Dragão Rubro
- **Nível:** 3 (Avançado) · **Tipo:** Ataque
- **Vida:** 95 · **Ataque:** 17 · **Defesa:** 7
- **Personalidade:** arrogante, feroz e competitivo.
- **História:** o último dragão das Terras Vulcânicas. Diz que foi ele quem criou a Ruptura com um único sopro, e não aceita que ninguém mais use o título de campeão.
- **Ataque máximo — Chama Voraz:** causa **2,5×** o dano e Ignis **recupera metade do dano causado** como vida.
- **Cores:** vermelho-sangue e dourado.

### 🦄 Cristalina — Unicórnio de Cristal
- **Nível:** 3 (Avançado) · **Tipo:** Defesa
- **Vida:** 135 · **Ataque:** 11 · **Defesa:** 14
- **Personalidade:** elegante, sábia e fria nas batalhas.
- **História:** guardiã das cavernas de gelo, onde o chifre de cada unicórnio vira um cristal mágico. Entrou na arena para impedir que a energia da Ruptura caia em mãos erradas.
- **Ataque máximo — Prisma Congelante:** causa **2,5×** o dano e **congela a cura** do adversário: ela volta a ficar **10 segundos** em recarga.
- **Cores:** azul-gelo, branco e lilás.

---

## 4.3 Código pronto para `dados.js`

```js
const PERSONAGENS = [
  {
    id: "faisca", nome: "Faísca", titulo: "Raposa de Fogo", emoji: "🦊",
    nivelMinimo: 1, tipo: "Equilibrado",
    vidaMaxima: 100, ataque: 12, defesa: 9,
    personalidade: "Curiosa, rápida e um pouco impulsiva.",
    historia: "Nasceu de uma fagulha que caiu da Ruptura numa floresta de outono. Quer provar que até a menor chama pode virar um incêndio.",
    especial: { nome: "Explosão de Brasas", descricao: "Causa o triplo do dano de um ataque normal.", multiplicador: 3, efeito: "nenhum" }
  },
  {
    id: "casco", nome: "Casco", titulo: "Tartaruga de Pedra", emoji: "🐢",
    nivelMinimo: 1, tipo: "Defesa",
    vidaMaxima: 130, ataque: 8, defesa: 14,
    personalidade: "Calmo, paciente e teimoso.",
    historia: "Dormiu trezentos anos no fundo de uma montanha até a Ruptura rachar a rocha. Acredita que quem resiste mais sempre vence no final.",
    especial: { nome: "Muralha Viva", descricao: "Causa 2x o dano e reduz pela metade o dano recebido por 5 segundos.", multiplicador: 2, efeito: "escudo" }
  },
  {
    id: "zunido", nome: "Zunido", titulo: "Coruja do Trovão", emoji: "🦉",
    nivelMinimo: 2, tipo: "Ataque",
    vidaMaxima: 85, ataque: 16, defesa: 6,
    personalidade: "Orgulhosa, barulhenta e muito inteligente.",
    historia: "Vive no topo das nuvens de tempestade e caça relâmpagos à noite. Veio provar que ninguém é mais rápido que um trovão.",
    especial: { nome: "Relâmpago Noturno", descricao: "Causa 2,5x o dano e atordoa o adversário por 2 segundos.", multiplicador: 2.5, efeito: "atordoar" }
  },
  {
    id: "bruma", nome: "Bruma", titulo: "Lobo da Névoa", emoji: "🐺",
    nivelMinimo: 2, tipo: "Equilibrado",
    vidaMaxima: 105, ataque: 13, defesa: 10,
    personalidade: "Silencioso, leal e misterioso.",
    historia: "Líder de uma alcateia que sumiu na névoa da Ruptura. Luta para abrir o portal que o leva de volta à sua família.",
    especial: { nome: "Uivo Sombrio", descricao: "Causa 2,5x o dano e ignora a defesa do adversário.", multiplicador: 2.5, efeito: "ignoraDefesa" }
  },
  {
    id: "ignis", nome: "Ignis", titulo: "Dragão Rubro", emoji: "🐉",
    nivelMinimo: 3, tipo: "Ataque",
    vidaMaxima: 95, ataque: 17, defesa: 7,
    personalidade: "Arrogante, feroz e competitivo.",
    historia: "O último dragão das Terras Vulcânicas. Diz que criou a Ruptura com um único sopro e não aceita outro campeão.",
    especial: { nome: "Chama Voraz", descricao: "Causa 2,5x o dano e recupera metade do dano como vida.", multiplicador: 2.5, efeito: "rouboVida" }
  },
  {
    id: "cristalina", nome: "Cristalina", titulo: "Unicórnio de Cristal", emoji: "🦄",
    nivelMinimo: 3, tipo: "Defesa",
    vidaMaxima: 135, ataque: 11, defesa: 14,
    personalidade: "Elegante, sábia e fria nas batalhas.",
    historia: "Guardiã das cavernas de gelo. Entrou na arena para impedir que a energia da Ruptura caia em mãos erradas.",
    especial: { nome: "Prisma Congelante", descricao: "Causa 2,5x o dano e coloca a cura do adversário em recarga por 10 segundos.", multiplicador: 2.5, efeito: "bloqueiaCura" }
  }
];
```

---

## 4.4 Identidade visual

Cada personagem tem uma classe CSS com o seu `id`: `.personagem-faisca`, `.personagem-casco` etc. (em `css/personagens.css`). Ela define:

- **Fundo** em gradiente com as cores do personagem.
- **Borda** e **brilho** (`box-shadow`) da cor principal.
- O **emoji** grande no centro (`font-size: 5rem` ou mais).

```css
.personagem-faisca {
  background: radial-gradient(circle, #ffb347 0%, #ff5e3a 70%);
  border-color: #ff5e3a;
  box-shadow: 0 0 20px #ff5e3a88;
}
```

**Opcional (se sobrar tempo):** desenhar detalhes com CSS puro (`::before` e `::after`), como chamas atrás da Faísca ou raios ao redor do Zunido.
