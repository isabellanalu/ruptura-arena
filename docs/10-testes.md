# 10. Testes obrigatórios

Antes de entregar, **todos os 20 testes** devem passar. Façam os testes em dupla: um joga, o outro confere e anota.

Copiem esta tabela para uma *issue* no GitHub chamada **"Testes finais"** e marquem conforme forem testando.

---

## 10.1 Atalhos para testar mais rápido

Use o **console** (F12) para não precisar jogar partidas inteiras:

| Para testar | Digite no console |
|-------------|-------------------|
| Liberar nível 2 | `sessao.vitorias = 2; salvarProgresso(); atualizarMenu()` |
| Liberar nível 3 | `sessao.vitorias = 4; salvarProgresso(); atualizarMenu()` |
| Ver o que está salvo | `localStorage.getItem("rupturaArena.progresso")` |
| Simular "primeira vez no jogo" | `localStorage.clear(); location.reload()` |
| Deixar a IA quase sem vida | `partida.ia.vida = 5; atualizarBatalha()` |
| Deixar o jogador quase sem vida | `partida.jogador.vida = 5; atualizarBatalha()` |
| Acabar o tempo rápido | `partida.tempoRestante = 5` |
| Empatar por tempo | `partida.jogador.vida = 50; partida.ia.vida = 50; partida.tempoRestante = 3` |
| Congelar a IA | `pararIA()` |
| Ver a decisão da IA | `decidirAcaoIA()` |

> Os atalhos servem só para testar. **Não** deixem botões de "trapaça" no jogo final.

---

## 10.2 Lista de testes

| # | Teste | Como testar | Resultado esperado | OK? |
|:-:|-------|-------------|--------------------|:---:|
| 1 | Menu principal funciona | Abrir o jogo e clicar em Jogar, Personagens e Como jogar (e voltar) | Cada botão abre a tela certa; voltar retorna ao menu | ☐ |
| 2 | Seleção de personagens funciona | Clicar em Jogar e escolher um personagem liberado; tentar clicar num bloqueado | Liberado inicia a batalha; bloqueado não faz nada | ☐ |
| 3 | Personagens têm atributos diferentes | Abrir a galeria | 6 personagens com vida/ataque/defesa diferentes e especiais diferentes | ☐ |
| 4 | IA escolhe um personagem | Iniciar 5 batalhas no nível 1 | IA sempre usa Faísca ou Casco; nunca um bloqueado | ☐ |
| 5 | IA executa ações automaticamente | Iniciar a batalha e não apertar nada | A IA ataca, defende e cura sozinha; mensagens aparecem | ☐ |
| 6 | IA respeita as regras | Observar uma partida inteira | IA nunca cura 2× em menos de 10 s, usa especial no máximo 1×, não faz 2 ações juntas | ☐ |
| 7 | Ataque causa dano | Apertar F (e clicar em Atacar) | Barra da IA diminui, animação de dano, mensagem | ☐ |
| 8 | Defesa reduz o dano | `pararIA()`; anotar o dano de vários ataques da IA com e sem G (ou comparar as mensagens) | Defendendo, o dano é menor, mas **não** é zero | ☐ |
| 9 | Cura recupera vida | Levar dano e apertar H | Vida aumenta, sem passar do máximo | ☐ |
| 10 | Cura respeita 10 s | Apertar H e tentar de novo logo depois | Segunda cura não acontece; indicador mostra a contagem; volta após 10 s | ☐ |
| 11 | Ataque máximo só 1× | Apertar R duas vezes | Primeiro funciona com efeito especial; depois o botão fica "Usado" e R não faz nada | ☐ |
| 12 | Cronômetro dura 2:30 | Iniciar e conferir com o relógio do celular | Começa em 2:30, desce 1 por segundo, chega a 0:00 em ~150 s | ☐ |
| 13 | Partida termina com vida 0 | Derrotar a IA (ou `partida.ia.vida = 5` e atacar) | Tela de resultado aparece na hora; cronômetro para | ☐ |
| 14 | Partida termina com tempo 0 | `partida.tempoRestante = 5` | Ao chegar a 0, vence quem tem mais vida; vida igual = empate | ☐ |
| 15 | Vitórias atualizam os níveis | Vencer 2 partidas | Nível 2 aparece no resultado e no menu; Zunido e Bruma liberados | ☐ |
| 16 | Nível 3 com 4 vitórias | Vencer 4 partidas | Nível 3; todos os personagens liberados | ☐ |
| 17 | Progresso é salvo | Ter vitórias, fechar o navegador e abrir o jogo de novo; depois clicar em "Zerar progresso" | Ao reabrir, nível e vitórias continuam iguais; ao zerar, volta ao Nível 1 com 0 vitórias (e continua zerado após F5) | ☐ |
| 18 | Botões e controles funcionam | Usar F, G (segurar), H, R e os 4 botões; testar com Caps Lock | Todos funcionam; nada funciona na tela de resultado | ☐ |
| 19 | Tela de resultado correta | Ver o resultado após vitória, derrota e empate | Mostra título, nomes, vidas, vitórias, nível e mensagem | ☐ |
| 20 | Nova partida sem atualizar | Clicar "Jogar novamente" e jogar outra | Vidas cheias, cronômetro em 2:30, cura e especial disponíveis, tempo não corre mais rápido | ☐ |

---

## 10.3 Testes extras (bugs comuns)

| Teste | Esperado |
|-------|----------|
| Segurar G e soltar o mouse fora do botão Defender | A defesa termina |
| Apertar teclas na tela do menu | Nada acontece, nenhum erro no console |
| Jogar 3 partidas seguidas e observar o cronômetro | Sempre desce 1 por segundo (não acelera) |
| Ficar atordoado pelo especial do Zunido | Não consegue agir por 2 s e perde a defesa |
| Usar a cura com vida quase cheia | A vida fica no máximo, não passa |
| Console (F12) durante uma partida inteira | **Nenhum** erro vermelho |
| Abrir o `index.html` com o Wi-Fi desligado | Tudo funciona igual |
| Escrever lixo no salvo: `localStorage.setItem("rupturaArena.progresso", "abc")` e dar F5 | O jogo abre normalmente no Nível 1 (sem erro) |
| Testar em outro navegador (Chrome, Edge, Firefox) | Funciona em todos |
