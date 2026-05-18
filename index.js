const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/text/:action', (req, res) => {
  const action = req.params.action;
  const input = req.body.input;

  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'O campo "input" deve ser uma string no corpo da requisição.' });
  }

  const actions = {
    lowercase: (text) => text.toLowerCase(),
    uppercase: (text) => text.toUpperCase(),
  };

  const handler = actions[action];

  if (!handler) {
    return res.status(400).json({ error: 'Ação inválida. Use "lowercase" ou "uppercase".' });
  }

  const output = handler(input);
  res.json({ output });
});

app.get('/number/:action', (req, res) => {
  const action = req.params.action;
  const input = req.query.input;

  if (typeof input !== 'string' || input.trim().length === 0) {
    return res.status(400).json({ error: 'O parâmetro de query "input" é obrigatório e deve conter números separados por vírgula.' });
  }

  const values = input.split(',').map((item) => item.trim()).filter(Boolean);
  if (values.length === 0) {
    return res.status(400).json({ error: 'Forneça pelo menos um número em "input".' });
  }

  const numbers = values.map((value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new Error(`Valor inválido: ${value}`);
    }
    return parsed;
  });

  const actions = {
    minimum: (nums) => Math.min(...nums),
    maximum: (nums) => Math.max(...nums),
  };

  const handler = actions[action];

  if (!handler) {
    return res.status(400).json({ error: 'Ação inválida. Use "minimum" ou "maximum".' });
  }

  try {
    const output = handler(numbers);
    res.json({ output });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'API de utilitários de texto e número está no ar.',
    routes: [
      'POST /text/:action  - corpo: { input: string }',
      'GET /number/:action?input=1,2,3  - query: input=1,2,3',
    ],
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
