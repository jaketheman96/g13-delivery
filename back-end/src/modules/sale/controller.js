const { StatusCodes } = require('http-status-codes');
const { SalesServices } = require('./service');

class SalesController {
  constructor() {
    this.salesService = new SalesServices();
  }

  async create(req, res) {
    return this.salesService.create(req.body)
      .then((sale) => res.status(StatusCodes.CREATED).json(sale));
  }

  async readAll(_req, res) {
    return this.salesService.readAll()
      .then((sales) => res.status(StatusCodes.OK).json(sales));
  }

  async readOne(req, res) {
    const { id } = req.params;
    return this.salesService.readOne(id)
      .then((sale) => res.status(StatusCodes.OK).json(sale));
  }

  async updateOne(req, res) {
    const { id } = req.params;
    return this.salesService.updateOne(id, req.body)
      .then(() => res.status(StatusCodes.OK).json('Successfully updated'));
  }

  async delete(req, res) {
    const { id } = req.params;
    return this.salesService.delete(id)
      .then(() => res.status(StatusCodes.OK).json('Successfully deleted'));
  }
}

module.exports = { salesController: new SalesController() };