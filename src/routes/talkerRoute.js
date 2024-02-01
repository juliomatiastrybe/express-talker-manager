const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersJson = require('../utils/fs/getTalkerJson');
const createTalkerId = require('../utils/createTalkerId');

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

// {
//   "id": 1,
//   "name": "Danielle Santos",
//   "age": 56,
//   "talk": {
//     "watchedAt": "22/10/2019",
//     "rate": 5
//   }
// }

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkersJson();
  const verifyTalker = talkers.some((talker) => talker.name === name);

  if (verifyTalker) return res.status(409).json({ message: 'Pessoa palestrante já cadastrada' });
  const talkerId = createTalkerId(talkers);

  const newTalker = {
    id: talkerId,
    name,
    age,
    talk,
  };

  talkers.push(newTalker);
};

talkerRoute.get('/', getTalkers);
talkerRoute.get('/:id', getTalkerById);

module.exports = talkerRoute;