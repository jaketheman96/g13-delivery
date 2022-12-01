const { Op } = require('sequelize');
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

  async findUserByEmail({ email }) {
    return this.sequelizeUserModel.findOne({
      where: { email },
    }).then((user) => user);
  }

  async findUserByEmailAndName(email, name) {
    return this.sequelizeUserModel.findOne({
      where: { 
        [Op.or]: [
          { email },
          { name }, 
        ],
      },
    }).then((user) => user);
  }
  
  async registerCommonUser({ email, name, password, role }) {
    return this.sequelizeUserModel.create({ email, name, password, role })
    .then((user) => user);
  }
  
  async registerAdminUser({ email, name, password }) {
    return this.sequelizeUserModel.create({ email, name, password, role: 'administrator' })
    .then((user) => user);
  }
  
  async getAllCommonUsers() {
    return this.sequelizeUserModel.findAll({
      where: { role: { [Op.eq]: ['customer'] } },
    }).then((users) => users);
  }

  async findUserById(id) {
    return this.sequelizeUserModel.findByPk(id).then((user) => user);
  }

  async deleteUser(id) {
    return this.sequelizeUserModel.destroy({
      where: { id }, 
    }).then((user) => user);
  }
}

module.exports = { UsersImplementation };
