const validarEmail = (email) => {
  // Expressão regular para validar o formato do email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailIsValid = validarEmail(email);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};

module.exports = validateLogin;