const { User } = require('../../database/models');

class UsersImplementation {
  constructor() {
    this.sequelizeUserModel = User;
  }

  async loginUser({ email, password }) {
    return this.sequelizeUserModel.findOne({
      where: { email, password },
    }).then((user) => user);
  }
}

module.exports = { UsersImplementation };
