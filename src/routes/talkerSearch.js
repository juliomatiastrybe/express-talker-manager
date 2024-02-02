const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersJson = require('../utils/getTalkerJson');
const { validateToken, 
  validateRateParam, validateDateParam } = require('../middlewares/validateTalker');

dotenv.config();

const talkerSearchRoute = Router();

const searchTalker = async (req, res) => {
  const { q, rate, date } = req.query;
  let filteredTalkers = await getTalkersJson();
  // Aplicar filtros de acordo com os parâmetros de consulta
  if (q) {
    filteredTalkers = filteredTalkers
      .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
  }
  if (rate) {
    const numericRate = parseInt(rate, 10);
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.rate === numericRate);
  }
  if (date) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.watchedAt === date);
  }
  // Retorna a lista de palestrantes filtrada
  res.status(200).json(filteredTalkers);
};

talkerSearchRoute.get('/', validateToken, validateRateParam, validateDateParam, searchTalker);

module.exports = talkerSearchRoute;