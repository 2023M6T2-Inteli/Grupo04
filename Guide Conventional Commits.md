<h1 align="center">
📄<br>Padrões de commits 
</h1>

<h1 align="center">
  <img src="https://github.com/iuricode/padroes-de-commits/blob/main/gitcommit.png">
</h1>

De acordo com a documentação do **Conventional Commits**, Commits Semânticos são uma convenção simples para ser utilizada nas mensagens de commit. Essa convenção define um conjunto de regras para criar um histórico de commit explícito, o que facilita a criação de ferramentas automatizadas.

Esses commits auxiliarão você e sua equipe a entenderem de forma facilitada quais alterações foram realizadas no trecho de código que foi commitado.

Essa identificação ocorre por meio de uma palavra e emoji que identifica se aquele commit realizado se trata de uma alteração de código, atualização de pacotes, documentação, alteração de visual, teste...

link para o site do **Conventional Commits**: https://www.conventionalcommits.org/en/v1.0.0/

## 🦄 Tipo e Descrição

O commit semântico possui os elementos estruturais abaixo (tipos), que informam a intenção do seu commit ao utilizador(a) de seu código.

- `feat`- Commits do tipo feat indicam que seu trecho de código está incluindo um **novo recurso** (se relaciona com o MINOR do versionamento semântico).

- `fix` - Commits do tipo fix indicam que seu trecho de código commitado está **solucionando um problema** (bug fix), (se relaciona com o PATCH do versionamento semântico).

- `docs` - Commits do tipo docs indicam que houveram **mudanças na documentação**, como por exemplo no Readme do seu repositório. (Não inclui alterações em código).

- `test` - Commits do tipo test são utilizados quando são realizadas **alterações em testes**, seja criando, alterando ou excluindo testes unitários. (Não inclui alterações em código)

- `build` - Commits do tipo build são utilizados quando são realizadas modificações em **arquivos de build e dependências**.

- `perf` - Commits do tipo perf servem para identificar quaisquer alterações de código que estejam relacionadas a **performance**.

- `style` - Commits do tipo style indicam que houveram alterações referentes a **formatações de código**, semicolons, trailing spaces, lint... (Não inclui alterações em código).

- `refactor` - Commits do tipo refactor referem-se a mudanças devido a **refatorações que não alterem sua funcionalidade**, como por exemplo, uma alteração no formato como é processada determinada parte da tela, mas que manteve a mesma funcionalidade, ou melhorias de performance devido a um code review.

- `chore` - Commits do tipo chore indicam **atualizações de tarefas** de build, configurações de administrador, pacotes... como por exemplo adicionar um pacote no gitignore. (Não inclui alterações em código)

- `ci` - Commits do tipo ci indicam mudanças relacionadas a **integração contínua** (_continuous integration_).

## ☑️ Recomendações e Considerações

- Adicione um título consistente com o título do conteúdo;
- Recomendamos que na primeira linha deve ter no máximo 4 palavras;
- Para descrever com detalhes, usar a descrição do commit;

## Criar uma branch:
Em seu terminal git digite o comando:

``$ git checkout -b <nome da branch>``

<br>
A seguinte mensagem deverá ser exibida:

``Switched to a new branch '<nome da branch>'``

<br>


## Nome para a branch:
O nome da branch deve ser o mesmo nome do tipo de commit que será realizado e também seguir os tipos de commits estabeleciod pela **Conventional Commits**, por exemplo: 

``$ git checkout -b feat: adding-new-front-end-features``

<br>

Dessa forma, fica mais fácil identificar qual o tipo de commit que será realizado e até mesmo na hora de buscar posteriormente.

<br>

## Exemplos de nomes para branch:
<table>
  <thead>
    <tr>
      <th>Comando git</th>
      <th>Resultado no GitHub</th>
    </tr>
  </thead>
 <tbody>
    <tr>
      <td>
        <code>git checkout -b feat: nem-feature</code>
      </td>
      <td>feat: nem-feature</td>
    </tr>
    <tr>
      <td>
        <code>git checkout -b fix: front-end bug</code>
      </td>
      <td>fix: front-end bug</td>
    </tr>
    <tr>
      <td>
        <code>git checkout -b docs: new topic</code>
      </td>
      <td>docs: new topic</td>
    </tr>
  </tbody>
</table>

<br>

## 🍧 Descrição de Commits

- **Titulo:** deve ser escrito em letras minúsculas e no imperativo, ou seja, deve ser escrito como se fosse uma ordem, por exemplo: "feat: adiciona nova funcionalidade", "fix: atualiza biblioteca", "fix: corrige bug" e etc.
- **Descrições**:  uma descrição sucinta da mudança
  Exemplo: alteração da função buscar no arquivo script.js para buscar por nome e sobrenome.

<br>

## 💻 Exemplos de commits

<table>
  <thead>
    <tr>
      <th>Comando git</th>
      <th>Resultado no GitHub</th>
    </tr>
  </thead>
 <tbody>
    <tr>
      <td>
        <code>git commit -m "Commit inicial"</code>
      </td>
      <td>Commit inicial</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "docs: Atualizaçao do README"</code>
      </td>
      <td>docs: Atualizaçao do README</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "fix: Loop infinito na linha 50"</code>
      </td>
      <td>fix: Loop infinito na linha 50</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "feat: Pagina de login"</code>
      </td>
      <td> feat: Pagina de login</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "ci: Modificaçao no Dockerfile"</code>
      </td>
      <td> ci: Modificaçao no Dockerfile</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "refactor: Passando para arrow functions"</code>
      </td>
      <td> refactor: Passando para arrow functions</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "perf: Melhoria no tempo de resposta"</code>
      </td>
      <td> perf: Melhoria no tempo de resposta</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "fix: Revertendo mudanças ineficientes"</code>
      </td>
      <td> fix: Revertendo mudanças ineficientes</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "feat: Estilizaçao CSS do formulario"</code>
      </td>
      <td> feat: Estilizaçao CSS do formulario</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "test: Criando novo teste"</code>
      </td>
      <td> test: Criando novo teste</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "docs: Comentários sobre a função LoremIpsum( )"</code>
      </td>
      <td> docs: Comentários sobre a função LoremIpsum( )</td>
    </tr>
  </tbody>
</table>
