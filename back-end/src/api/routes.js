const express = require('express');
const { userRoutes } = require('../modules/user/routes');
const { productRoutes } = require('../modules/product/routes');
const { salesRoutes } = require('../modules/sale/routes');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/sales', salesRoutes);

module.exports = {
    routes,
};
