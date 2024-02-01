const { Router } = require('express');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const talkerRoute = Router();

const getTalkersJson = async () => {
  const talkers = JSON.parse(
    await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8'),
  );
  return talkers;
};

const getTalkers = async (_req, res) => {
  const talkers = await getTalkersJson();

  if (Array.isArray(talkers) && talkers.length === 0) return res.status(200).json([]);

  res.status(200).json(talkers);
};

talkerRoute.get('/', getTalkers);

module.exports = talkerRoute;