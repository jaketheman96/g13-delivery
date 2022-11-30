const md5 = require('md5');

const hashGenerator = (data) => {
  const { password } = data;

  const hashedData = data;

  const userPassword = md5(password);

  hashedData.password = userPassword;

  return hashedData;
};

module.exports = {
  hashGenerator,
};