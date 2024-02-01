const { Router } = require('express');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
// const connection = require('../db/connection');

dotenv.config();

const talkerRoute = Router();

const getTalkersJson = async () => {
  const talkers = JSON.parse(
    await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8'),
  );
  return talkers;
};

// conexão com o banco de dados através do arquivo connection.js
// const getTalkersFromDB = async () => {
//   const [talkers] = await connection.execute('SELECT * FROM talkers');
//   return talkers;
// };

const getTalkers = async (_req, res) => {
  const talkers = await getTalkersJson();
  // const talkersDB = await getTalkersFromDB();
  // console.log('talkersDB:', talkersDB);

  if (Array.isArray(talkers) && talkers.length === 0) return res.status(200).json([]);

  res.status(200).json(talkers);
};

talkerRoute.get('/', getTalkers);

module.exports = talkerRoute;