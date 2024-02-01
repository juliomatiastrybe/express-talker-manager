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

talkerRoute.get('/', getTalkers);

module.exports = talkerRoute;