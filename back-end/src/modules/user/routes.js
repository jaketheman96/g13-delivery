const express = require('express');
const { usersController } = require('./controller');
const {
  commonRegValidation } = require('../../middlewares/commonRegValidation/commonRegValidation');
const { adminValidation } = require('../../middlewares/adminValidation/adminValidation');
const { loginValidation } = require('../../middlewares/loginValidation/loginValidation');
const { tokenAuth } = require('../../middlewares/tokenAuth');

const userRoutes = express.Router();

userRoutes.post(
  '/login',
  (req, res, next) => loginValidation.validate(req, res, next),
  (req, res) => usersController.loginUser(req, res),
)
  .get(
    '/customer/orders/:id',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => usersController.getOrdersByCustomerId(req, res),
  )
  .get('/users', (req, res) => usersController.getAllUsers(req, res))
  .get('/users/common', (req, res) => usersController.getAllCommonUsers(req, res))
  .get('/users/sellers', (req, res) => usersController.getAllSellerUsers(req, res))
    .delete(
    '/users/:userId',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => usersController.deleteUser(req, res),
  )
  .post(
    '/users/register/admin',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res, next) => adminValidation.validate(req, res, next),
    (req, res) => usersController.registerAdminUser(req, res),
)

  .post(
    '/users/register',
    (req, res, next) => commonRegValidation.validate(req, res, next),
    (req, res) => usersController.registerCommonUser(req, res),
  );

  module.exports = {
    userRoutes,
  };