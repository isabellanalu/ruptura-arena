# RUPTURA ARENA

Jogo de luta e estratégia para navegador em que animais de fantasia se enfrentam numa arena. O jogador escolhe um personagem e luta contra um adversário controlado por uma **inteligência artificial escrita em JavaScript puro**.

Projeto escolar da turma do **1º ano do Ensino Médio Técnico em Informática**.

---

## Como jogar (rodar o projeto)

1. Baixe o repositório (botão verde **Code → Download ZIP**) ou clone com `git clone`.
2. Abra a pasta no **Visual Studio Code**.
3. Dê dois cliques no arquivo `index.html` (ou clique com o botão direito → *Open with Live Server*, se tiver a extensão).

Não precisa de internet, servidor, instalação ou banco de dados. O progresso (vitórias e nível) fica salvo no próprio navegador.

| Tecla | Ação |
|-------|------|
| **F** | Atacar |
| **G** (segurar) | Defender |
| **H** | Curar (1 vez a cada 10 segundos) |
| **R** | Ataque máximo (1 vez por partida) |

---

## Tecnologias

- HTML
- CSS
- JavaScript puro (sem frameworks, sem bibliotecas, sem banco de dados)

---

## Estrutura de pastas

```
ruptura-arena/
├── index.html            → estrutura de todas as telas
├── css/
│   ├── estilo.css        → visual geral, menu, telas, botões
│   ├── arena.css         → tela de batalha, barras de vida, animações
│   └── personagens.css   → aparência de cada personagem
├── js/
│   ├── dados.js          → configurações (CONFIG) e lista de personagens
│   ├── estado.js         → variáveis da sessão e da partida
│   ├── niveis.js         → sistema de níveis e desbloqueio
│   ├── interface.js      → troca de telas e atualização visual
│   ├── combate.js        → ataque, defesa, cura e ataque máximo
│   ├── ia.js             → inteligência artificial do adversário
│   ├── cronometro.js     → cronômetro de 2:30
│   ├── resultado.js      → fim de partida, vitória/derrota/empate
│   └── main.js           → teclado, botões e inicialização
├── docs/                 → documentação técnica (leia antes de programar!)
└── AGENTS.md             → regras do projeto para a IA (ChatGPT / Codex)
```

---

## Documentação técnica

Leia nesta ordem:

| # | Documento | Para quê |
|---|-----------|----------|
| 1 | [Requisitos](docs/01-requisitos.md) | O que o jogo **precisa** ter (e o que **não** pode ter) |
| 2 | [Arquitetura](docs/02-arquitetura.md) | Arquivos, variáveis e funções — o "contrato" entre os membros do grupo |
| 3 | [Regras de combate](docs/03-regras-de-combate.md) | Fórmulas de dano, defesa, cura, ataque máximo e cronômetro |
| 4 | [Personagens](docs/04-personagens.md) | Os 6 personagens com atributos e habilidades |
| 5 | [Inteligência artificial](docs/05-inteligencia-artificial.md) | Como o adversário decide o que fazer |
| 6 | [Interface](docs/06-interface.md) | Telas, IDs do HTML, classes CSS e animações |
| 7 | [Plano de trabalho](docs/07-plano-de-trabalho.md) | Divisão de tarefas e ordem de desenvolvimento |
| 8 | [Git e GitHub](docs/08-git-e-github.md) | Como versionar e trabalhar em grupo |
| 9 | [Usando IA para programar](docs/09-usando-ia.md) | Como pedir código ao ChatGPT/Codex do jeito certo |
| 10 | [Testes](docs/10-testes.md) | Os 20 testes obrigatórios e como fazê-los |

A ideia inicial do projeto está em `DESENVOLVIMENTO DO JOGO RUPTURA ARENA.pdf`. Quando ela for diferente da pasta `docs/`, vale o que está em `docs/`.

---

## Equipe

| Nome | Função |
|------|--------|
| Isabella Nalu | A definir |
| Sophia Couto | A definir |
| Beatriz Guadanhin | A definir |
| Eduardo Carvalho | A definir |
| Arthur Gonçalves | A definir |
