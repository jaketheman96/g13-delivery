const { StatusCodes } = require('http-status-codes');
const { SalesServices } = require('./service');

class SalesController {
  constructor() {
    this.salesService = new SalesServices();
  }

  async create(req, res) {
    return this.salesService.create(req.body)
      .then((sale) => res.status(StatusCodes.CREATED).json({ id: sale }));
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

  async readAllById(req, res) {
    const { id, role } = req.user;
    return this.salesService.readAllById(id, role)
      .then((sales) => res.status(StatusCodes.OK).json(sales));
  }

  async updateOne(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    return this.salesService.updateOne(id, status)
      .then(() => res.status(StatusCodes.OK).json('Successfully updated'));
  }

  async delete(req, res) {
    const { id } = req.params;
    await this.salesService.delete(id);
    return res.status(StatusCodes.OK).json('Successfully deleted');
  }
}

module.exports = { salesController: new SalesController() };
