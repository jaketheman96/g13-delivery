const { Router } = require('express');
const { salesController } = require('./controller');
const { tokenAuth } = require('../../middlewares/tokenAuth');

const salesRoutes = Router();

salesRoutes
  .get('/', (req, res) => salesController.readAll(req, res))
  .get('/:id', (req, res) => salesController.readOne(req, res))
  .post(
    '/',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.create(req, res),
  )
  .put('/:id', (req, res) => salesController.updateOne(req, res))
  .delete('/:id', (req, res) => salesController.delete(req, res));

module.exports = { salesRoutes };
