# 9. Usando IA (ChatGPT / Codex) para programar

A IA é uma **ferramenta**, como uma calculadora: ajuda muito, mas **vocês** são responsáveis pelo código. Vocês precisam **entender** o que estão colando no projeto — o professor pode pedir para explicar qualquer função.

---

## 9.1 O problema: a IA não conhece o projeto

O ChatGPT não vê o repositório. Se vocês pedirem só *"faz o combate do meu jogo"*, ele vai inventar nomes de funções, variáveis e IDs diferentes dos que o grupo usa, e o código não vai se encaixar.

**Solução:** sempre dar o **contexto** antes do pedido.

---

## 9.2 Como começar cada conversa no ChatGPT

1. Abra uma **conversa nova** para cada tarefa (conversas muito longas fazem a IA "esquecer" o começo).
2. **Anexe** (ícone de clipe 📎) ou **cole** o conteúdo destes arquivos:
   - `AGENTS.md` (regras gerais — **sempre**)
   - O documento da sua parte (ex.: `docs/03-regras-de-combate.md`)
   - `docs/02-arquitetura.md` se a tarefa usar funções de outros arquivos
   - O **conteúdo atual** do arquivo que você vai alterar
3. Depois, faça o pedido usando um dos modelos abaixo.

---

## 9.3 Modelos de pedido (prompts)

### Criar um arquivo novo

```
Estou desenvolvendo o jogo Ruptura Arena com meu grupo. Anexei o AGENTS.md
(regras do projeto) e a documentação da minha parte.

Minha tarefa: criar o arquivo js/combate.js.

Requisitos:
- Implemente exatamente as funções listadas na seção 2.7 da arquitetura,
  com esses nomes e parâmetros.
- Use as fórmulas do documento 03-regras-de-combate.md e os valores do CONFIG.
- Pode chamar estas funções de outros arquivos, que já existem:
  atualizarBatalha(), mostrarMensagem(), animar(), encerrarPartida().
- JavaScript puro, sem import/export, sem bibliotecas.
- Comente cada função em português, de forma simples, para alunos do 1º ano.

Entregue o arquivo completo e, depois, explique em poucas linhas o que cada
função faz.
```

### Adicionar algo a um arquivo existente

```
Segue o conteúdo atual do meu arquivo js/ia.js (colado abaixo).
Quero adicionar a função decidirNivel3(ia, jogador) seguindo a tabela da
seção 5.5 do documento anexado.

Não altere as outras funções. Mostre só a função nova e diga onde colocá-la.

[cole o arquivo aqui]
```

### Corrigir um erro

```
Meu jogo Ruptura Arena está com um problema.

O que eu fiz: cliquei em Jogar, escolhi a Faísca e apertei F.
O que eu esperava: a barra de vida da IA diminuir.
O que aconteceu: nada mudou.
Erro no console (F12):
  Uncaught TypeError: Cannot read properties of null (reading 'style')
  at atualizarBarraVida (interface.js:58)

Segue o arquivo interface.js e o trecho do index.html da tela de batalha.
Explique a causa do erro e mostre só o que precisa mudar.

[cole os arquivos aqui]
```

### Entender um código

```
Explique linha por linha, de forma simples para um aluno do 1º ano,
o que esta função faz:

[cole a função]
```

### Revisar antes do Pull Request

```
Revise este arquivo procurando: erros de sintaxe, variáveis não declaradas,
nomes diferentes dos definidos na arquitetura anexada, ações que podem
acontecer depois do fim da partida e setInterval que não é parado.
Liste os problemas encontrados antes de corrigir qualquer coisa.

[cole o arquivo]
```

---

## 9.4 Regras para pedidos melhores

| Faça | Evite |
|------|-------|
| Uma tarefa pequena por vez (uma função, uma tela) | "Faz o jogo inteiro" |
| Dizer os nomes exatos de funções, variáveis e IDs | Deixar a IA inventar nomes |
| Colar o código atual do arquivo | Pedir para mudar um código que a IA não viu |
| Colar a mensagem de erro **completa** do console | "Não funciona" |
| Pedir "mostre só o que muda" para arquivos grandes | Substituir o arquivo inteiro sem conferir |
| Pedir explicação do código | Colar sem entender |

---

## 9.5 Confira SEMPRE o código que a IA entregou

Antes de colar no projeto, verifique:

- [ ] Não tem `import`, `export` nem `type="module"`.
- [ ] Não usa bibliotecas (`<script src="https://...">`, jQuery `$()`, React...).
- [ ] Não usa `sessionStorage`, `fetch` ou cookies. O `localStorage` só aparece nas 3 funções de progresso do `estado.js`.
- [ ] Não usa imagens, fontes ou links da internet.
- [ ] Os nomes das funções e IDs são **os da documentação**.
- [ ] Usa `const`/`let`, não `var`.
- [ ] Não criou funcionalidades que não pedimos (sons, placar online, multiplayer, movimentação...).
- [ ] Ações de combate verificam se a partida está ativa.

Depois de colar:

1. Salve e **recarregue** a página (`F5`).
2. Abra o **console** (`F12` → aba *Console*). **Erros em vermelho** precisam ser resolvidos antes de seguir.
3. Teste a funcionalidade nova **e** as antigas (a IA às vezes quebra o que já funcionava).
4. Funcionou? **Commit!** Assim, se a próxima mudança der errado, dá para voltar.

---

## 9.6 Usando o Codex (se estiver disponível)

O Codex consegue **ler e editar os arquivos do repositório** diretamente. Ele lê automaticamente o arquivo `AGENTS.md` da raiz do projeto, onde estão as regras. Mesmo assim:

- Peça **uma tarefa por vez**, citando o documento: *"Implemente a Etapa 3 do docs/07-plano-de-trabalho.md, seguindo docs/03-regras-de-combate.md"*.
- Trabalhe numa **branch** própria; o Codex pode abrir um Pull Request.
- **Revise o diff** (as linhas alteradas) antes de aceitar. Recuse mudanças em arquivos que não são da tarefa.
- Teste no navegador antes de juntar na `main`.

---

## 9.7 Erros comuns e o que significam

| Erro no console | Causa provável |
|-----------------|----------------|
| `X is not defined` | Função/variável com nome errado, ou o arquivo não foi carregado / está na ordem errada no `index.html` |
| `Cannot read properties of null (reading ...)` | O `getElementById` não achou o elemento: ID errado ou diferente do HTML |
| `Cannot read properties of undefined` | Objeto não existe ainda (ex.: usar `partida.jogador` antes de criar a partida) |
| `Unexpected token` / `SyntaxError` | Falta ou sobra `}`, `)`, `,` ou aspas |
| `Identifier 'X' has already been declared` | A mesma variável/constante foi criada em dois arquivos |
| Tempo correndo 2× mais rápido | `setInterval` antigo não foi parado antes de criar outro |
| Ações continuam depois do fim | Falta checar `partida.ativa` |
