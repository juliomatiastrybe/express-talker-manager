const express = require('express');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

module.exports = app;