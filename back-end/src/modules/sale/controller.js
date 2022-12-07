const { StatusCodes } = require('http-status-codes');
const { SalesServices } = require('./service');

class SalesController {
  constructor() {
    this.salesService = new SalesServices();
  }

  create(req, res) {
    const { id } = req.user;
    return this.salesService.create(id, req.body)
      .then((sale) => res.status(StatusCodes.CREATED).json({ id: sale }));
  }

  readAll(_req, res) {
    return this.salesService.readAll()
      .then((sales) => res.status(StatusCodes.OK).json(sales));
  }

  readOne(req, res) {
    const { id } = req.params;
    return this.salesService.readOne(id)
      .then((sale) => res.status(StatusCodes.OK).json(sale));
  }

  readAllById(req, res) {
    const { id, role } = req.user;
    return this.salesService.readAllById(id, role)
      .then((sales) => res.status(StatusCodes.OK).json(sales));
  }

  updateOne(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    return this.salesService.updateOne(id, status)
      .then(() => res.status(StatusCodes.OK).json('Successfully updated'));
  }

  delete(req, res) {
    const { id } = req.params;
    return this.salesService.delete(id)
      .then(() => res.status(StatusCodes.OK).json('Successfully deleted'));
  }
}

module.exports = { salesController: new SalesController() };
