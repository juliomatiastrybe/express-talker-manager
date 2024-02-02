const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersJson = require('../utils/getTalkerJson');
const { validateToken } = require('../middlewares/validateTalker');

dotenv.config();

const talkerSearchRoute = Router();

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkersJson();
  const talker = talkers.filter((t) => t.name.includes(q));
  if (!q) return res.status(200).json(talkers);
  if (!talker) return res.status(200).json([]);
  res.status(200).json(talker);
};

talkerSearchRoute.get('/', validateToken, searchTalker);

module.exports = talkerSearchRoute;