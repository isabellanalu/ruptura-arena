# 8. Git e GitHub

**Git** guarda o histórico de todas as mudanças do projeto (como um "salvar versão"). **GitHub** é o site onde o repositório fica, para todos do grupo trabalharem nele.

---

## 8.1 Configuração inicial (uma vez por computador)

No terminal do VS Code (**Terminal → New Terminal**):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email-do-github@exemplo.com"
```

> O repositório é **público**: não coloquem senhas, telefones, endereços ou outros dados pessoais em nenhum arquivo.

## 8.2 Criar o repositório (só o Integrador)

1. No GitHub: **New repository** → nome `ruptura-arena` → **Public** → *Create*.
2. Em **Settings → Collaborators**, adicione os colegas do grupo (e o professor).
3. No computador, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Estrutura inicial e documentação"
git branch -M main
git remote add origin https://github.com/USUARIO/ruptura-arena.git
git push -u origin main
```

## 8.3 Começar a trabalhar (cada aluno)

```bash
git clone https://github.com/USUARIO/ruptura-arena.git
cd ruptura-arena
code .
```

---

## 8.4 O ciclo de trabalho (use sempre)

Cada tarefa é feita numa **branch** (um "ramo" separado do projeto). Quando ela fica pronta, abrimos um **Pull Request** para juntar com a `main`.

```bash
# 1. Atualize sua cópia antes de começar
git checkout main
git pull

# 2. Crie uma branch para a tarefa
git checkout -b combate-ataque

# 3. Programe, teste no navegador... e salve versões pequenas
git add js/combate.js
git commit -m "Adiciona ataque normal com cálculo de dano"

# 4. Envie a branch para o GitHub
git push -u origin combate-ataque
```

5. No GitHub, clique em **Compare & pull request**, descreva o que fez e como testar.
6. O **Integrador** revisa, testa e clica em **Merge**.
7. Todos voltam ao passo 1 (`git checkout main` e `git pull`).

### Nomes de branch

Curto, sem acento e sem espaço: `menu-principal`, `dados-personagens`, `ia-nivel-2`, `animacao-dano`.

### Mensagens de commit

Comece com um verbo no presente e diga **o que** mudou:

- ✅ `Adiciona barra de vida animada`
- ✅ `Corrige cronômetro que não parava no fim`
- ❌ `mudanças`, `aaa`, `final2`, `agora vai`

### Regras do grupo

1. **Nunca** programe direto na `main`.
2. Faça **commits pequenos** (uma coisa por commit).
3. Só abra Pull Request de código que **abre sem erro no console**.
4. Antes de mexer num arquivo que **não é seu**, avise o dono.
5. Dê `git pull` na `main` todo começo de aula.

---

## 8.5 E se der conflito?

Conflito acontece quando duas pessoas mudaram a mesma linha. O VS Code mostra assim:

```
<<<<<<< HEAD
const DURACAO = 150;
=======
const DURACAO = 120;
>>>>>>> outra-branch
```

1. Escolha no VS Code: **Accept Current**, **Accept Incoming** ou **Accept Both** — ou edite à mão.
2. Apague as marcas `<<<<<<<`, `=======`, `>>>>>>>`.
3. Teste no navegador.
4. `git add arquivo` e `git commit`.

Na dúvida, **chame o Integrador ou o professor antes de apagar código de alguém**.

---

## 8.6 Comandos úteis

| Comando | Para quê |
|---------|----------|
| `git status` | Ver o que mudou e em que branch você está |
| `git log --oneline` | Ver o histórico de commits |
| `git diff` | Ver exatamente as linhas alteradas |
| `git checkout -- arquivo` | Desfazer mudanças **não salvas em commit** de um arquivo |
| `git branch` | Ver as branches |

O VS Code também tem tudo isso na aba **Source Control** (ícone de ramificação, `Ctrl+Shift+G`).

---

## 8.7 Publicar o jogo no GitHub Pages (opcional)

1. No repositório: **Settings → Pages**.
2. *Source*: **Deploy from a branch** → *Branch*: `main` → pasta `/ (root)` → **Save**.
3. Em alguns minutos o jogo fica disponível em `https://USUARIO.github.io/ruptura-arena/`.

Como o jogo é só HTML, CSS e JS, ele funciona no GitHub Pages sem nenhuma configuração extra.

---

## 8.8 O que NÃO enviar para o repositório

Crie um arquivo `.gitignore` (já incluído no projeto) para não enviar arquivos do sistema:

```
.DS_Store
Thumbs.db
desktop.ini
*.zip
```
