const { Router } = require('express');
const { salesController } = require('./controller');

const salesRoutes = Router();

salesRoutes
  .get('/', (req, res) => salesController.readAll(req, res))
  .get('/:id', (req, res) => salesController.readOne(req, res))
  .post('/', (req, res) => salesController.create(req, res))
  .put('/:id', (req, res) => salesController.updateOne(req, res))
  .delete('/:id', (req, res) => salesController.delete(req, res));

module.exports = { salesRoutes };
