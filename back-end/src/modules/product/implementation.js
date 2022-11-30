const { CustomError } = require('../../../utils/CustomError');
const Products = require('../../database/models/Products');

class ProductsImplementation {
  constructor(sequelizeProductModel = Products) {
    this.sequelizeProductModel = sequelizeProductModel;
  }

  async createProduct(productInfo) {
    const alreadyExists = await this.sequelizeProductModel
      .findOne({ where: { name: productInfo.name } });

    if (alreadyExists) throw new CustomError(409, 'Product already exists');

    const createdProduct = await this.sequelizeProductModel.create(productInfo);
    return createdProduct;
  }

  async findAllProducts() {
    const productsList = await this.sequelizeProductModel.findAll();
    return productsList;
  }

  async findProductById(productId) {
    const foundProduct = await this.sequelizeProductModel.findByPk(productId);
    return foundProduct;
  }

  async updateById(productId, productUpdate) {
    await this.sequelizeProductModel.update(productUpdate, { where: { id: productId } });
  }

  async deleteProduct(productId) {
    await this.sequelizeProductModel.destroy({ where: { id: productId } });
  }
}

module.exports = {
  ProductsImplementation,
};