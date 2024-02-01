const fs = require('fs').promises;
const path = require('path');

const getTalkersJson = async () => {
  const talkers = JSON.parse(
    await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8'),
  );
  return talkers;
};

module.exports = getTalkersJson;