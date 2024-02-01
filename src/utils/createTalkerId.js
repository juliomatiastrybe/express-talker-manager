const createTalkerId = (talkers) => {
  const maxId = talkers.reduce((max, talker) => Math.max(max, talker.id), 0);
  return maxId + 1;
};

module.exports = createTalkerId;