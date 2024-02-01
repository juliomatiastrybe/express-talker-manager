const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersFromDB = require('../utils/db/getTalkerFromDB');

dotenv.config();

const talkerRouteDB = Router();

const getTalkersDB = async (_req, res) => {
  const talkersDB = await getTalkersFromDB();

  if (Array.isArray(talkersDB) && talkersDB.length === 0) return res.status(200).json([]);

  res.status(200).json(talkersDB);
};

talkerRouteDB.get('/', getTalkersDB);

module.exports = talkerRouteDB;