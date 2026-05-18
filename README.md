@ -1,102 +0,0 @@
# Web API de Utilitários

Este projeto fornece um servidor HTTP com utilitários de texto e número.

## Descrição

A API implementa dois utilitários:

- **Utilitário de Texto**: recebe uma ação via rota e um texto via corpo da requisição (`POST`), retornando o texto transformado.
- **Utilitário de Número**: recebe uma ação via rota e valores numéricos via query string (`GET`), retornando o mínimo ou máximo.

---

## Rotas

### Utilitário de Texto

- `POST /text/lowercase`
- `POST /text/uppercase`

Corpo JSON:
```json
{
  "input": "Lorem Ipsum"
}
```

Exemplos de uso:

- `POST /text/lowercase` com `Lorem Ipsum` retorna:
```json
{
  "output": "lorem ipsum"
}
```

- `POST /text/uppercase` com `Lorem Ipsum` retorna:
```json
{
  "output": "LOREM IPSUM"
}
```

#### Prints de validação

- Print 1: requisição `POST /text/lowercase`
- Print 2: requisição `POST /text/uppercase`

<img width="1002" height="352" alt="image" src="https://github.com/user-attachments/assets/8edb685a-a2a2-46ab-959c-e712724ab907" />

---

### Utilitário de Número

- `GET /number/minimum?input=10,1,100`
- `GET /number/maximum?input=10,1,100`

Exemplos de uso:

- `GET /number/minimum?input=10,1,100` retorna:
```json
{
  "output": 1
}
```

- `GET /number/maximum?input=10,1,100` retorna:
```json
{
  "output": 100
}
```

#### Prints de validação

- Print 3: requisição `GET /number/minimum?input=10,1,100`
- Print 4: requisição `GET /number/maximum?input=10,1,100`

  <img width="991" height="326" alt="image" src="https://github.com/user-attachments/assets/a04da792-330f-4c50-b64e-7c4ba28d8853" />

---

## Como testar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

3. Teste as rotas com um cliente HTTP (Thunder Client, Postman, curl, etc.).

---

## Observações

- Para `POST /text/:action`, o corpo deve ser JSON com a chave `input`.
- Para `GET /number/:action`, o parâmetro `input` deve ser uma lista de números separados por vírgula.
