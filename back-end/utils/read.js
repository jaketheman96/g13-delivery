const fs = require('fs');

const read = () => {
  const data = fs.readFileSync('jwt.evaluation.key', 'utf8');

  return data;
};

module.exports = {
  read,
};