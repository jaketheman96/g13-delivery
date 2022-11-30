const express = require('express');

const { productsController } = require('./controller');

const productRoutes = express.Router();

productRoutes.post('/', (req, res) => productsController.createProduct(req, res));
productRoutes.get('/', (req, res) => productsController.getAllProducts(req, res));
productRoutes.get('/:id', (req, res) => productsController.getProductById(req, res));
productRoutes.put('/:id', (req, res) => productsController.updateProduct(req, res));
productRoutes.delete('/:id', (req, res) => productsController.deleteProduct(req, res));

module.exports = {
  productRoutes,
};
