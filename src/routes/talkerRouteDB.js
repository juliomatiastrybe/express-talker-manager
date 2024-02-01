const { Router } = require('express');
const dotenv = require('dotenv');
const connection = require('../db/connection');

dotenv.config();

const talkerRouteDB = Router();

// conexão com o banco de dados através do arquivo connection.js
const getTalkersFromDB = async () => {
  const [talkers] = await connection
    .execute(`
      SELECT 
        name,
        age,
        id,
        JSON_OBJECT(
          'watchedAt', talk_watched_at,
          'rate', talk_rate
        ) AS talk
      FROM talkers;`);
  return talkers;
};

const getTalkersDB = async (_req, res) => {
  const talkersDB = await getTalkersFromDB();

  if (Array.isArray(talkersDB) && talkersDB.length === 0) return res.status(200).json([]);

  res.status(200).json(talkersDB);
};

talkerRouteDB.get('/', getTalkersDB);

module.exports = talkerRouteDB;