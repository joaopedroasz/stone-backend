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

### Como rodar o projeto:

Existem duas formas de rodar o projeto:

- Com o NodeJS do docker:

  Basta rodar o comando:

  ```bash
  yarn server:dev:up
  ```

  Esse comando já irá subir o container de banco de dados (redis) e o servidor (node).

  Para derrubar o container, basta rodar o comando:

  ```bash
  yarn down
  ```

- Com NodeJS da máquina:

  Primeiramente rode o banco de dados que está no docker com o comando:

  ```bash
  yarn db:dev:up
  ```

  Obrigatório NodeJS versão 16 ou superior.

  Para rodar o projeto, basta rodar o comando:

  ```bash
  yarn dev:server
  ```

  Para desligar o banco de dados, basta rodar o comando:

  ```bash
  yarn db:down
  ```

### Como rodar os testes automatizados:

Para rodar os testes, primeiro é necessário subir o banco de dados de teste com o comando:

```bash
yarn db:test:up
```

Para rodar os testes, basta rodar o comando:

```bash
yarn test
```

Esse comando irá rodar **todos** os testes da aplicação, de unitários a de integração.

Para pegar a cobertura de testes, basta rodar o comando: (Com o banco de dados de teste rodando)

```bash
yarn test:coverage
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

`/GET /customers`

---

Autor: João Pedro

[LinkedIn](https://www.linkedin.com/in/joaopedroasz/)
