const { Router } = require('express');
const dotenv = require('dotenv');
const createToken = require('../utils/createToken');
const validateLogin = require('../middlewares/validateLogin');

dotenv.config();

const loginRoute = Router();

// O foco desse requisito 03 é retornar um token válido, 
// não sendo necessário implementar regras de negócio 
// e validação neste momento.
const postTokenLogin = (_req, res) => {
  const token = createToken();

  res.status(200).json({ token });
};

loginRoute.post('/', validateLogin, postTokenLogin);

module.exports = loginRoute;