const express = require('express');
const { usersController } = require('./controller');
const {
  commonRegValidation } = require('../../middlewares/commonRegValidation/commonRegValidation');
const { adminValidation } = require('../../middlewares/adminValidation/adminValidation');
const { loginValidation } = require('../../middlewares/loginValidation/loginValidation');
const { tokenAuth } = require('../../middlewares/tokenAuth');

const userRoutes = express.Router();

userRoutes
  .get('/', (req, res) => usersController.getAllCommonUsers(req, res))

  .delete(
    '/:userId',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => usersController.deleteUser(req, res),
  )

  .post(
    '/login',
    (req, res, next) => loginValidation.validate(req, res, next),
    (req, res) => usersController.loginUser(req, res),
  )

  .post(
    '/register/admin',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res, next) => adminValidation.validate(req, res, next),
    (req, res) => usersController.registerAdminUser(req, res),
)

  .post(
    '/register',
    (req, res, next) => commonRegValidation.validate(req, res, next),
    (req, res) => usersController.registerCommonUser(req, res),
  );

  module.exports = {
    userRoutes,
  };