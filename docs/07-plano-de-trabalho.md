# 7. Plano de trabalho

## 7.1 Funções no grupo

A divisão abaixo é para um grupo de **5 alunos**. Com menos pessoas, juntem funções (sugestões entre parênteses).

| Função | Arquivos | Responsabilidade |
|--------|----------|------------------|
| **A — Integrador(a)** | `index.html`, `js/main.js`, `README.md` | Cria o repositório, monta o esqueleto, liga botões e teclado, aprova os *pull requests*, roda os testes finais |
| **B — Visual** | `css/estilo.css`, `css/arena.css`, `css/personagens.css` | Menu bonito, cartões, arena, barras de vida, animações, aparência dos personagens |
| **C — Dados e telas** | `js/dados.js`, `js/estado.js`, `js/niveis.js`, `js/interface.js` | Personagens, sistema de níveis, galeria, seleção, atualização da batalha |
| **D — Combate** | `js/combate.js`, `js/cronometro.js`, `js/resultado.js` | As 4 ações, fórmulas, cronômetro, fim de partida |
| **E — IA** | `js/ia.js` | Escolha de personagem e decisões da IA nos 3 níveis |

- 4 alunos: A também faz o papel de E.
- 3 alunos: A+E, B, C+D.

> **Por que cada um tem seus arquivos?** No Git, quando duas pessoas mudam **o mesmo trecho do mesmo arquivo**, acontece um **conflito**. Com cada um nos seus arquivos, isso quase não acontece.

---

## 7.2 Etapas

Cada etapa termina com algo **funcionando no navegador** e um commit. Não pule etapas: é muito mais fácil achar erros em pedaços pequenos.

### Etapa 0 — Preparação (Integrador, todos acompanham)
- [ ] Criar o repositório público no GitHub (ver [08-git-e-github.md](08-git-e-github.md)).
- [ ] Subir a pasta `docs/`, `README.md`, `AGENTS.md` e o PDF (ideia inicial, só como referência).
- [ ] Criar `index.html` com as 6 `<section>` e os `<script>` na ordem certa.
- [ ] Criar todos os arquivos `.css` e `.js` **vazios**, só com o comentário de cabeçalho.
- [ ] Todos clonam o repositório e conseguem abrir o `index.html`.

**Pronto quando:** a página abre sem erros no console (F12).

### Etapa 1 — Esqueleto navegável (A, B, C)
- [ ] HTML de todas as telas com os IDs de [06-interface.md](06-interface.md).
- [ ] `mostrarTela()` e botões do menu / voltar funcionando.
- [ ] CSS básico: fundo, botões, tela centralizada.

**Pronto quando:** dá para navegar Menu → Personagens → Menu → Como jogar → Menu → Jogar (seleção) → Menu.

### Etapa 2 — Dados, níveis e seleção (C, B)
- [ ] `CONFIG` e `PERSONAGENS` em `dados.js`.
- [ ] `sessao`, `criarLutador`, `criarPartida` em `estado.js`.
- [ ] Funções de `niveis.js`.
- [ ] Galeria e seleção com cartões; bloqueados em cinza.
- [ ] Menu mostra nível e vitórias.
- [ ] CSS dos 6 personagens.

**Pronto quando:** a galeria mostra os 6; a seleção deixa escolher só Faísca e Casco; no console, `sessao.vitorias = 4; renderizarSelecao()` libera todos.

### Etapa 3 — Combate do jogador e cronômetro (D, C, A)
- [ ] `iniciarBatalha()` monta a arena com o personagem escolhido e um adversário (pode ser fixo por enquanto).
- [ ] Ataque, defesa, cura e especial do jogador funcionando com botões e teclado.
- [ ] Barras de vida, indicadores e mensagens atualizando.
- [ ] Cronômetro de 2:30 descendo.
- [ ] `encerrarPartida()` + tela de resultado básica.

**Pronto quando:** dá para bater num adversário parado até ele chegar a 0 e ver a tela de vitória.

### Etapa 4 — Inteligência artificial (E)
- [ ] `escolherPersonagemIA()`.
- [ ] `turnoIA`, `decidirAcaoIA`, as 3 funções de decisão e as funções de ação.
- [ ] IA iniciada em `iniciarBatalha()` e parada em `encerrarPartida()`.

**Pronto quando:** a IA luta sozinha, cura com vida baixa, usa o especial só uma vez e para quando a partida acaba.

### Etapa 5 — Resultado e níveis (D, C)
- [ ] Tela de resultado completa (todos os campos de 6.7).
- [ ] Vitória soma, empate não soma, nível sobe com 2 e 4 vitórias.
- [ ] "Jogar novamente" e "Menu" funcionando sem recarregar a página.
- [ ] `salvarProgresso`, `carregarProgresso` e `zerarProgresso` + botão "Zerar progresso".

**Pronto quando:** dá para jogar 5 partidas seguidas, chegar ao nível 3, fechar e reabrir o jogo e continuar no nível 3.

### Etapa 6 — Visual e animações (B)
- [ ] Animações de ataque, dano, bloqueio, defesa, cura, especial e atordoado.
- [ ] Menu atraente, arena com cenário, cronômetro vermelho no final.
- [ ] Diferença clara entre jogador e IA.

### Etapa 7 — Testes e entrega (todos)
- [ ] Os 20 testes de [10-testes.md](10-testes.md), anotando quem testou.
- [ ] Remover `console.log` de depuração.
- [ ] Preencher o README com os nomes da equipe.
- [ ] Publicar no GitHub Pages (opcional).

---

## 7.3 Dependências entre as partes

```
Etapa 0 ─► Etapa 1 ─► Etapa 2 ─┬─► Etapa 3 ─┬─► Etapa 5 ─► Etapa 7
                               │            │
                               │            └─► Etapa 4 (IA precisa do combate)
                               └─► Etapa 6 (visual pode começar cedo e ir até o fim)
```

**Trabalho em paralelo é possível** porque os nomes de funções já estão definidos em [02-arquitetura.md](02-arquitetura.md). Exemplo: o aluno da IA pode escrever `decidirNivel1()` usando `curaDisponivel()` antes mesmo de o aluno do combate terminar essa função.

---

## 7.4 Quadro de tarefas

Usem a aba **Issues** do GitHub (uma issue por item das etapas, com o responsável em *Assignees*) **ou** um quadro simples na aba **Projects** com as colunas: *A fazer · Fazendo · Pronto*.

---

## 7.5 Prioridades

Se o tempo ficar curto:

1. **Primeiro funciona, depois fica bonito.** Etapas 0 a 5 antes da 6.
2. Animações complicadas → troquem por uma simples (`tremer`, `brilhar`).
3. Se algo travar por mais de 30 minutos, peçam ajuda ao professor ou simplifiquem a funcionalidade.
