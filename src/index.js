const express = require('express');
const talkerRoute = require('./routes/talkerRoute');
const talkerRouteDB = require('./routes/talkerRouteDB');
const loginRoute = require('./routes/loginRoute');
const talkerSearchRoute = require('./routes/talkerSearch');
const talkerRateRoute = require('./routes/talkerRate');
require('express-async-errors');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker/db', talkerRouteDB);
app.use('/talker/rate', talkerRateRoute);
app.use('/talker/search', talkerSearchRoute);
app.use('/talker', talkerRoute);
app.use('/login', loginRoute);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;