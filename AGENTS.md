# AGENTS.md — Regras do projeto Ruptura Arena

> Este arquivo é lido automaticamente pelo **Codex**. Para o **ChatGPT**, anexe ou cole este arquivo no início de toda conversa.

## Contexto

Ruptura Arena é um jogo de luta para navegador (1 jogador × IA) desenvolvido por alunos do **1º ano do Ensino Médio Técnico em Informática**. Os alunos sabem o básico de HTML, CSS e JavaScript. O código precisa ser **simples, legível e comentado em português**, para que eles consigam entender e explicar cada parte.

A documentação completa está em `docs/`. **Siga-a. Em caso de conflito, `docs/` tem prioridade sobre suposições suas e sobre o PDF** (o PDF é só a ideia inicial).

- Requisitos: `docs/01-requisitos.md`
- Arquivos, variáveis e funções (contrato): `docs/02-arquitetura.md`
- Fórmulas e regras: `docs/03-regras-de-combate.md`
- Personagens: `docs/04-personagens.md`
- IA do adversário: `docs/05-inteligencia-artificial.md`
- Telas, IDs e CSS: `docs/06-interface.md`
- Testes: `docs/10-testes.md`

## Regras obrigatórias

1. **Somente HTML, CSS e JavaScript puro.** Sem frameworks, bibliotecas, CDNs, npm, TypeScript ou ferramentas de build.
2. **Sem `import`/`export` e sem `type="module"`.** Os arquivos JS são carregados com `<script src>` comum, nesta ordem: `dados.js, estado.js, niveis.js, interface.js, combate.js, ia.js, cronometro.js, resultado.js, main.js`. O jogo precisa funcionar abrindo `index.html` com dois cliques (`file://`).
3. **Armazenamento só com `localStorage`, e só para o progresso** (objeto `sessao`: vitórias, derrotas, empates). Apenas as funções `salvarProgresso`, `carregarProgresso` e `zerarProgresso` (em `estado.js`) acessam o `localStorage`. Nada de `sessionStorage`, cookies, IndexedDB ou banco de dados.
4. **Sem internet:** nada de `fetch`, APIs, imagens, fontes ou sons externos. Os personagens são emojis + CSS.
5. **A IA do adversário é JavaScript puro** (condições, variáveis, `Math.random`). Nunca usar APIs ou modelos de IA no jogo.
6. **Use exatamente os nomes** de arquivos, funções, variáveis, IDs e classes CSS definidos em `docs/02-arquitetura.md` e `docs/06-interface.md`. Não renomeie nem crie alternativas.
7. **Números do jogo vêm do `CONFIG`** (`dados.js`). Não escreva valores fixos dentro das funções.
8. **Não crie funcionalidades que não estão na documentação** (sons, login, ranking, movimentação, multiplayer, troca de personagem durante a luta, configurações extras...).
9. Toda ação de combate verifica se a partida está ativa (`podeAgir()` ou `partida.ativa`). Todo `setInterval` é parado em `encerrarPartida()`.
10. Altere **somente os arquivos da tarefa pedida**.

## Estilo de código

- Nomes em português, sem acento, `camelCase`; constantes globais em MAIÚSCULAS.
- `const` e `let`, nunca `var`. Indentação de 2 espaços. Aspas duplas.
- Funções curtas, com um comentário de uma linha explicando o que fazem.
- Prefira `if/else`, `for`, `forEach`, `filter` simples. Evite truques avançados (encadeamentos longos, desestruturação complexa, classes, `async/await`, `?.`, `??`).
- Cabeçalho em cada arquivo JS:
  ```js
  // =============================================
  // nome-do-arquivo.js — o que este arquivo faz
  // Responsável: (nome do aluno)
  // =============================================
  ```

## Ao entregar código

- Entregue o arquivo completo **ou** indique exatamente onde inserir o trecho.
- Depois do código, explique em poucas linhas, em linguagem simples, o que foi feito.
- Diga como testar no navegador (o que clicar e o que deve acontecer).
- Antes de entregar, revise: sintaxe, nomes conforme a documentação, intervalos parados no fim da partida, ações bloqueadas após o fim, vida entre 0 e o máximo.
