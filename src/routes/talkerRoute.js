const { Router } = require('express');
const dotenv = require('dotenv');
const getTalkersJson = require('../utils/getTalkerJson');
const createTalkerId = require('../utils/createTalkerId');
const putTalkerJson = require('../utils/putTalkerJson');
const { 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRate } = require('../middlewares/validateTalker');

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
  await putTalkerJson(talkers);
  res.status(201).json(newTalker);
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkersJson();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  if (talkerIndex === -1) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  talkers[talkerIndex] = { id: parseInt(id, 10), name, age, talk };
  await putTalkerJson(talkers);
  res.status(200).json(talkers[talkerIndex]);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkersJson();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  if (talkerIndex === -1) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  talkers.splice(talkerIndex, 1);
  await putTalkerJson(talkers);
  res.status(204).end();
};

talkerRoute.get('/', getTalkers);
talkerRoute.get('/:id', getTalkerById);
talkerRoute.post('/', validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  createTalker);
talkerRoute.put('/:id', validateToken, 
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  updateTalker);
talkerRoute.delete('/:id', validateToken, deleteTalker);

module.exports = talkerRoute;