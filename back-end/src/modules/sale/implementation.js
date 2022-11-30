const { Sale, User } = require('../../database/models');

class SalesImplementation {
  constructor() {
    this.sequelizeSaleModel = Sale;
    this.sequelizeUserModel = User;
  }

  async create(sale) {
    return this.sequelizeSaleModel.create(sale).then((newSale) => newSale);
  }

  async readAll() {
    return this.sequelizeSaleModel.findAll({
      include: [
        { model: this.sequelizeUserModel, as: 'buyer', attributes: { exclude: ['password'] } },
        { model: this.sequelizeUserModel, as: 'seller', attributes: { exclude: ['password'] } },
      ],
      attributes: { exclude: ['userId', 'sellerId'] },
    }).then((sales) => sales);
  }

  async readOne(id) {
    return this.sequelizeSaleModel.findByPk(id, {
      include: [
        { model: this.sequelizeUserModel, as: 'buyer', attributes: { exclude: ['password'] } },
        { model: this.sequelizeUserModel, as: 'seller', attributes: { exclude: ['password'] } },
      ],
      attributes: { exclude: ['userId', 'SellerId'] },
    }).then((sale) => sale);
  }

  async updateOne(id, sale) {
    await this.sequelizeSaleModel.update(sale, { where: { id } });
  }

  async delete(id) {
    await this.sequelizeSaleModel.destroy({ where: { id } });
  }
}

module.exports = { SalesImplementation };
