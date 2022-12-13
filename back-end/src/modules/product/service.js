const { ProductsImplementation } = require('./implementation');
// const { CustomError } = require('../../../utils/customError');

class ProductsService {
  constructor(productImplementation = new ProductsImplementation()) {
    this.productImplementation = productImplementation;
  }

  // async createProduct(productInfo) {
  //   const createdProduct = await this.productImplementation.createProduct(productInfo);

  //   return {
  //     id: createdProduct.id,
  //     name: createdProduct.name,
  //     price: createdProduct.price,
  //     urlImage: createdProduct.urlImage,
  //   };
  // }

  async getAllProducts() {
    const allProducts = await this.productImplementation.findAllProducts();
    return allProducts;
  }

  async getProductById(productId) {
    const product = await this.productImplementation.findProductById(productId);
    return product;
  }

  // async updateProduct(productId, productInfo) {
  //   const foundProduct = await this.productImplementation.findProductById(productId);

  //   if (!foundProduct) {
  //     throw new CustomError(404, 'Product not found');
  //   }
  //   await this.productImplementation.updateById(productId, productInfo);
  // }

  // async deleteProduct(productId) {
  //   const foundProduct = await this.productImplementation.findProductById(productId);

  //   if (!foundProduct) {
  //     throw new CustomError(404, 'Product not found');
  //   }

  //   await this.productImplementation.deleteProduct(productId);
  // }
}

module.exports = { 
  ProductsService,
};
