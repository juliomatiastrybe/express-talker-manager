const createToken = () => {
  const token = Math.random().toString(16).slice(2).padStart(16, '0');
  return token;
};

module.exports = createToken;