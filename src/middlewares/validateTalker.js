const validateData = require('../utils/validateData');
// const getTalkersJson = require('../utils/getTalkerJson');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (typeof age !== 'number' || age < 18 || age % 1 !== 0) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const isValid = validateData(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!isValid) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const verifyRateNumber = (rate) => {
  if (rate === undefined || rate === null || rate === '' || Number.isNaN()) {
    return false;
  }
  return true;
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const isRateNumber = verifyRateNumber(rate);
  // Verifica se o campo 'rate' é obrigatório
  if (!isRateNumber) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  // Verifica se o campo 'rate' é um número inteiro entre 1 e 5
  if (rate % 1 !== 0 || rate <= 0 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validadeRateUpId = (req, res, next) => {
  const { rate } = req.body;
  const isRateNumber = verifyRateNumber(rate);
  // Verifica se o campo 'rate' é obrigatório
  if (!isRateNumber) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  // Verifica se o campo 'rate' é um número inteiro entre 1 e 5
  if (rate % 1 !== 0 || rate <= 0 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validateRateParam = (req, res, next) => {
  const { rate } = req.query;
  if (!rate) {
    return next();
  }

  if (rate % 1 !== 0 || rate <= 0 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validateDateParam = (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    return next();
  }
  const isValid = validateData(date);
  
  if (!isValid) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = { 
  validateToken, 
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateRateParam,
  validateDateParam,
  validadeRateUpId };