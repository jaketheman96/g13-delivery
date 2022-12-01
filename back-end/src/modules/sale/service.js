const { CustomError } = require('../../../utils/customError');
const { SalesImplementation } = require('./implementation');
const { SaleProduct } = require('../../database/models');

class SalesServices {
  constructor() {
    this.salesImplementation = new SalesImplementation();
    this.salesProductsModel = SaleProduct;
  }

  async create(saleData) {
    const { userId, sellerId, products, deliveryAddress, deliveryNumber } = saleData;

    const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const saleDate = new Date();
    const status = 'Pendente';

    return this.salesImplementation.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    }).then(async (newSale) => {
        await this.salesProductsModel
          .bulkCreate(products
            .map(({ id, quantity }) => ({ saleId: newSale.id, productId: id, quantity })));
        return newSale;
      });
  }

  async readAll() {
    return this.salesImplementation.readAll().then((sales) => sales);
  }

  async readOne(id) {
    return this.salesImplementation.readOne(id)
      .then((sale) => {
        if (!sale) throw new CustomError(404, 'Sale not found');
        return sale;
      });
  }

  async updateOne(id, sale) {
    await this.readOne(id);
    await this.salesImplementation.updateOne(id, sale);
  }

  async delete(id) {
    await this.readOne(id);
    await this.salesImplementation.delete(id);
  }
}

module.exports = { SalesServices };
