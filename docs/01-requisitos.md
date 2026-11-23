# 1. Requisitos do jogo

Este documento é a **referência oficial** do projeto. Ele partiu da ideia inicial descrita em `DESENVOLVIMENTO DO JOGO RUPTURA ARENA.pdf`, mas foi adaptado para o trabalho em grupo. **Quando o PDF e esta documentação forem diferentes, vale esta documentação.** Em caso de dúvida, o professor tem a palavra final.

---

## 1.1 Resumo em uma frase

Um jogo de luta **1 jogador × IA**, numa **única arena**, com **6 personagens animais de fantasia**, **4 ações** (atacar, defender, curar, ataque máximo), partidas de **2min30s** e **3 níveis** desbloqueados por vitórias.

## 1.2 História do universo (para o menu)

> Quando a lua se partiu em dois, uma fenda de energia se abriu no centro do mundo: a **Ruptura**. Dela nasceu uma arena de pedra flutuante, onde criaturas lendárias são chamadas para provar seu valor. Raposas de fogo, tartarugas de pedra, corujas de trovão e dragões ancestrais lutam pelo único título que importa: **Campeão da Ruptura**. Cada vitória abre novos portais e traz desafiantes mais poderosos. Você está pronto para entrar na arena?

O grupo pode reescrever a história, mas ela deve ser **curta** e aparecer no menu.

---

## 1.3 O que o jogo PRECISA ter

| # | Requisito | Onde está detalhado |
|---|-----------|---------------------|
| R1 | Menu principal com: **Jogar**, **Personagens**, **Como jogar**, nome do jogo, nível atual e vitórias da sessão | [06-interface](06-interface.md) |
| R2 | Pelo menos **6 personagens** com nome, aparência, história, personalidade, ataque, defesa, vida máxima e habilidade especial | [04-personagens](04-personagens.md) |
| R3 | Atributos diferentes: uns de **ataque**, outros de **defesa**, outros **equilibrados** | [04-personagens](04-personagens.md) |
| R4 | **3 níveis**: N1 (0–1 vitória), N2 (2–3 vitórias), N3 (4+ vitórias), atualizados automaticamente | [02-arquitetura](02-arquitetura.md) |
| R4b | **Progresso salvo** no navegador com `localStorage` (vitórias, derrotas, empates), com botão **Zerar progresso** no menu | [02-arquitetura](02-arquitetura.md) |
| R5 | Tela de **seleção de personagem** (só os desbloqueados podem ser escolhidos) | [06-interface](06-interface.md) |
| R6 | A IA também **escolhe um personagem** permitido pelo nível | [05-inteligencia-artificial](05-inteligencia-artificial.md) |
| R7 | **Ataque normal**, **Defesa**, **Cura** (1× a cada 10s) e **Ataque máximo** (1× por partida) | [03-regras-de-combate](03-regras-de-combate.md) |
| R8 | IA que **decide** de acordo com a situação (não só ataca em intervalo fixo), com dificuldade diferente por nível | [05-inteligencia-artificial](05-inteligencia-artificial.md) |
| R9 | Controles **F, G, H, R** + **botões na tela** que fazem a mesma coisa | [06-interface](06-interface.md) |
| R10 | **Cronômetro de 2:30** que diminui e para no fim da partida | [03-regras-de-combate](03-regras-de-combate.md) |
| R11 | Fim por vida zerada **ou** por tempo (vence quem tem mais vida; vida igual = empate) | [03-regras-de-combate](03-regras-de-combate.md) |
| R12 | Tela de resultado com: vitória/derrota/empate, nomes, vida restante, vitórias, nível, mensagem, **Jogar novamente** e **Menu** | [06-interface](06-interface.md) |
| R13 | Barras de vida animadas, animações simples de ataque/defesa/dano, efeito especial no ataque máximo | [06-interface](06-interface.md) |
| R14 | Indicadores: cura disponível (e quanto falta), ataque máximo usado, nível do jogador, mensagens de ação | [06-interface](06-interface.md) |
| R15 | Deve ficar claro **qual personagem é do jogador** e **qual é da IA** | [06-interface](06-interface.md) |

## 1.4 O que o jogo NÃO PODE ter

| Proibido | Motivo |
|----------|--------|
| ❌ Frameworks ou bibliotecas (React, jQuery, Phaser, Bootstrap...) | Exigência do projeto: só HTML, CSS e JS puro |
| ❌ Banco de dados, servidor, `fetch`, APIs | Deve funcionar offline, abrindo o `index.html` |
| ❌ APIs de IA (ChatGPT etc.) **dentro do jogo** | A IA do adversário deve ser programada por vocês, com `if`, variáveis e probabilidades |
| ❌ Login, cadastro, nome de usuário, senha | Fora do escopo |
| ❌ Cookies, `sessionStorage`, IndexedDB | O único armazenamento permitido é o `localStorage`, e só para o progresso |
| ❌ Imagens, fontes ou sons da internet | Tudo deve funcionar localmente |
| ❌ Gráficos 3D, sistemas de animação complexos | Prazo curto, foco em funcionar |
| ❌ Movimentação e sistema de distância | Personagens ficam parados; o dano **não** depende da distância |
| ❌ Troca de personagem durante a batalha | Proibido explicitamente |
| ❌ Mais de um modo de jogo, multiplayer | Só existe "Jogar contra a IA" |
| ❌ Funcionalidades não pedidas | "Não crie funcionalidades que não foram solicitadas" |

> **Atenção:** usar o ChatGPT **para ajudar a escrever o código** é permitido (é a ferramenta do projeto). O que é proibido é o **jogo** chamar uma IA externa para decidir as jogadas.

## 1.5 Decisões técnicas do projeto

| Decisão | Escolha | Por quê |
|---------|---------|---------|
| Um arquivo ou vários? | **Vários arquivos** (`index.html` + 3 CSS + 9 JS) | Como é um **grupo** usando Git, arquivos separados evitam que todos editem o mesmo arquivo ao mesmo tempo (conflitos). |
| Onde fica a IA? | Em `js/ia.js`, carregado pelo `index.html` | Fica separada do resto e é fácil de achar e testar. Continua sendo JavaScript local, sem serviços externos. |
| Como ligar os JS? | `<script src="...">` comum, **sem** `type="module"` | Módulos (`import/export`) não funcionam ao abrir o arquivo com dois cliques (`file://`). |
| Aparência dos personagens | **Emoji + cartão estilizado em CSS** (cores, gradiente, borda, brilho) | Funciona offline, sem imagens, e cada personagem tem identidade visual própria. |
| Números do combate | Todos num objeto `CONFIG` em `dados.js` | Para ajustar o equilíbrio do jogo mudando um único lugar. |
| Progresso | Objeto `sessao` salvo no `localStorage` após cada partida e carregado ao abrir o jogo | O jogador não perde o nível ao fechar a página. Não há login nem cadastro: o progresso é do navegador. |
