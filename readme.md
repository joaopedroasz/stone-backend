# Desafio BackEnd Stone Co.

Esse projeto tem como finalidade registrar meus avanços no desafio proposto pela Stone Co no cargo de BackEnd Developer.

### Sobre o projeto:

- Objetivo:

  Esse projeto tem como objetivo o cadastro, atualização e listagem de clientes.

- Conceitos utilizados:

  Nesse projeto, os seguintes conceitos foram utilizados:

  - Arquitetura limpa;
  - Design guiado pelo domínio;
  - Testes unitários;
  - Testes de integração;
  - Testes ponta a ponta;
  - SOLID;
  - Design Patterns;
  - Tratamento explícito de erros personalizados;

- Tecnologias utilizadas:
  - NodeJS;
  - Typescript;
  - Express;
  - Redis;
  - IoRedis;
  - Docker;
  - Jest;
  - Supertest;
  - Eslint;

### Configurações necessárias:

Antes de rodar o projeto, dois arquivos precisam ser criados na raiz do projeto:

- .env.dev

  ```env
  REDIS_PORT=6379
  ```

- .env.test

  ```env
  REDIS_PORT=6378
  ```

### Como rodar o projeto:

Existem duas formas de rodar o projeto:

- Com o NodeJS do docker:

  Basta rodar o comando: (Yarn ou NPM)

  ```bash
  yarn server:dev:up

  npm run server:dev:up
  ```

  Esse comando já irá subir o container de banco de dados (redis) e o servidor (node).

  Para derrubar o container, basta rodar o comando: (Yarn ou NPM)

  ```bash
  yarn down

  npm run down
  ```

- Com NodeJS da máquina:

  Esse comando irá rodar o servidor localmente.

  Instalando as dependências do projeto: (Yarn ou NPM)

  ```bash
  yarn

  npm install
  ```

  Rode o banco de dados que está no docker com o comando: (Yarn ou NPM)

  ```bash
  yarn db:dev:up

  npm run db:dev:up
  ```

  Obrigatório NodeJS versão 16 ou superior.

  Para rodar o projeto, basta rodar o comando: (Yarn ou NPM)

  ```bash
  yarn dev:server

  npm run dev:server
  ```

  Para desligar o banco de dados, basta rodar o comando: (Yarn ou NPM)

  ```bash
  yarn db:down

  npm run db:down
  ```

### Como rodar os testes automatizados:

Para rodar os testes, primeiro é necessário subir o banco de dados de teste com o comando: (Yarn ou NPM)

```bash
yarn db:test:up

npm run db:test:up
```

Para rodar os testes, basta rodar o comando: (Yarn ou NPM)

```bash
yarn test

npm run test
```

Esse comando irá rodar **todos** os testes da aplicação, de unitários a de integração.

Para pegar a cobertura de testes, basta rodar o comando: (Com o banco de dados de teste rodando) (Yarn ou NPM)

```bash
yarn test:coverage

npm run test:coverage
```

Será criada uma pasta `coverage` na raiz do projeto. Dentro dela, abra a pasta `lcov-report` e abra o arquivo `index.html` no seu navegador.

### Como testar a API:

Para testar a API, o servidor deve estar rodando, juntamente com o banco de dados.

Por padrão, a API irá rodar na porta 4001, então para testar, basta acessar a url `http://localhost:4001`.

As seguintes rotas estão disponíveis:

`/POST /customers`

Body:

```json
{
  {
	"name": "Qualquer nome",
	"document": 1234
}
}
```

Response:

```json
{
  "id": "uuid",
  "name": "Qualquer nome",
  "document": 1234
}
```

`/GET /customers/:id`

Response:

```json
{
  "id": "uuid",
  "name": "Qualquer nome",
  "document": 1234
}
```

`/PUT /customers/:id`

Nessa rota, todos os campos do body são opcionais. Caso não seja passado nenhum campo, o cliente não será atualizado. Caso seja passado apenas um campo, apenas esse campo será atualizado. Caso seja passado mais de um campo, todos os campos informados serão atualizados.

Body:

```json
{
  "newId": "any_id",
  "newName": "name",
  "newDocument": 2121
}
```

Response:

```json
{
  "id": "any_id",
  "name": "name",
  "document": 2121
}
```

### Nota sobre o desenvolvimento da parte de autenticação no projeto:

Essa parte **não** foi desenvolvida. Eu não consegui entender como seria a parte de validação do token que o serviço de SSO retorna. Eu achei que essa parte ficou confusa no documento de requisitos.

- Em um serviço de autenticação externa, eu implementaria da seguinte forma:

Iria criar um classe que encapsula a comunicação com alguma API externa (que eu faria com a biblioteca `axios`), e essa classe teria um método que chama a API externa. Essa classe seria injetada em outra do tipo `AuthenticationGateway`, na qual eu teria a lógica de saber se o token fornecido é válido ou não. Esse `Gateway` seria injetado em um **caso de uso**, algo como `AuthenticateUseCase`, que seria responsável retornar um `boolean` dizendo se o token é válido ou não. Esse _caso de uso_ não seria chamado por um `controller` convencional, mas seria chamado por uma classe `middleware`, na qual teria um adaptador **específico para o express**, que faria essa chamada todas as vezes que uma requisição fosse feita.

---

Autor: João Pedro Araujo

[LinkedIn](https://www.linkedin.com/in/joaopedroasz/)
