const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersJson = require('../utils/getTalkerJson');
const putTalkerJson = require('../utils/putTalkerJson');
const { validateToken, validadeRateUpId } = require('../middlewares/validateTalker');

dotenv.config();

const talkerRateRoute = Router();

const updateRateForId = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talkers = await getTalkersJson();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkers[talkerIndex].talk.rate = parseInt(rate, 10);
  await putTalkerJson(talkers);
  res.status(204).end();
};

talkerRateRoute.patch('/:id', validateToken, validadeRateUpId, updateRateForId);
module.exports = talkerRateRoute;