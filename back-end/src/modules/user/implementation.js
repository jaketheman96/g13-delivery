const { Op } = require('sequelize');
const { User, Sale } = require('../../database/models');

class UsersImplementation {
  constructor() {
    this.sequelizeUserModel = User;
    this.sequelizeSaleModel = Sale;
  }

  async loginUser({ email, password }) {
    return this.sequelizeUserModel.findOne({
      where: { email, password },
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
  
  async registerUser({ email, name, password, role }) {
    return this.sequelizeUserModel.create({ email, name, password, role })
    .then((user) => user);
  }
    
  async getAllUsers() {
    return this.sequelizeUserModel.findAll()
      .then((users) => users);
  }

  async getAllCommonUsers() {
    return this.sequelizeUserModel.findAll({
      where: { role: { [Op.or]: ['seller', 'customer'] } },
      attributes: { exclude: ['password'] },
    }).then((users) => users);
  }

  async getAllSellerUsers() {
    return this.sequelizeUserModel.findAll({
      where: { role: { [Op.eq]: ['seller'] } },
      attributes: { exclude: ['password'] },
    }).then((users) => users);
  }

  async getOrdersByCustomerId(id) {
    return this.sequelizeSaleModel.findAll({
      include: [
        { model: this.sequelizeUserModel, as: 'buyer', attributes: [] },
        { model: this.sequelizeUserModel, as: 'seller', attributes: [] },
      ],
      where: { userId: id },
      attributes: ['id', 'totalPrice', 'status', 'saleDate'],
    }).then((sales) => sales);
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
