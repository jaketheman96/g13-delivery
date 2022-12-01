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

  async registerCommonUser({ name, email, password, role }) {
    return this.sequelizeUserModel.create({
      name,
      email,
      password,
      role,
    });
  }
}

module.exports = { UsersImplementation };
