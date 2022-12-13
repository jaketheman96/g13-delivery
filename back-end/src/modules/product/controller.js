const { StatusCodes } = require('http-status-codes');
const { ProductsService } = require('./service');

class ProductsController {
  constructor(productsService = new ProductsService()) {
    this.productsService = productsService;
  }

  // async createProduct(req, res) {
  //   const productInfo = req.body;

  //   const createdProduct = await this.productsService.createProduct(productInfo);

  //   return res.status(StatusCodes.CREATED).json(createdProduct);
  // }

  async getAllProducts(_req, res) {
    const allProducts = await this.productsService.getAllProducts();

    return res.status(StatusCodes.OK).json(allProducts);
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await this.productsService.getProductById(id);

    return res.status(StatusCodes.OK).json(product);
  }

  // async updateProduct(req, res) {
  //   const { id } = req.params;
  //   const productInfo = req.body;

  //   await this.productsService.updateProduct(id, productInfo);

  //   return res.status(StatusCodes.CREATED).end();
  // }

  // async deleteProduct(req, res) {
  //   const { id } = req.params;

  //   await this.productsService.deleteProduct(id);

  //   return res.status(StatusCodes.OK).end();
  // }
}

const productsController = new ProductsController();
module.exports = {
  productsController,
};
