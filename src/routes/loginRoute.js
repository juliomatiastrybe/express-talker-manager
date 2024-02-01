const { Router } = require('express');
const dotenv = require('dotenv');
const createToken = require('../utils/createToken');

dotenv.config();

const loginRoute = Router();

// O foco desse requisito 03 é retornar um token válido, 
// não sendo necessário implementar regras de negócio 
// e validação neste momento.
const postTokenLogin = (_req, res) => {
  const token = createToken();

  res.status(200).json({ token });
};

loginRoute.post('/', postTokenLogin);

module.exports = loginRoute;