const dotenv = require('dotenv');
const connection = require('../db/connection');

dotenv.config();

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

module.exports = getTalkersFromDB;