const jwt = require('jsonwebtoken');
const { read } = require('./read');

class Token {
    constructor(secret = read()) {
        this.secret = secret;
    }

    generate(data) {
      const token = jwt.sign({ data }, this.secret);
      return token;
    }

    verify(token) {
      const decoded = jwt.verify(token, this.secret);

      return decoded;
    }
}

const token = new Token();

module.exports = {
  token,
};