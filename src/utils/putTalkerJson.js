const fs = require('fs').promises;
const path = require('path');

const putTalkerJson = async (talkers) => {
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(talkers));
};

module.exports = putTalkerJson;