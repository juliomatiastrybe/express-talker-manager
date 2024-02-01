const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersJson = require('../utils/getTalkerJson');

dotenv.config();

const talkerRoute = Router();

const getTalkers = async (_req, res) => {
  const talkers = await getTalkersJson();

  if (Array.isArray(talkers) && talkers.length === 0) return res.status(200).json([]);

  res.status(200).json(talkers);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkersJson();
  const talker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
};

talkerRoute.get('/', getTalkers);
talkerRoute.get('/:id', getTalkerById);

module.exports = talkerRoute;