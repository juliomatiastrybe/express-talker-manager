const createToken = () => {
  const characters = 'abcdef0123456789';
  let token = '';
  for (let i = 0; i < 16; i += 1) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

console.log(createToken());

module.exports = createToken;