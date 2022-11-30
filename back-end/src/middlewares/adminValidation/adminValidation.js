const { CustomError } = require('../../../utils/customError');

const { adminSchema } = require('./adminSchema');

class AdminValidation {
  constructor(schema) {
    this.schema = schema;
  }

  validate(req, _res, next) {
    const requestInformations = req.body;

    const result = this.schema.safeParse(requestInformations);

    if (result.success) return next();

    const { issues: [{ message }] } = result.error;

    throw new CustomError(400, message);
  }
}

const adminValidation = new AdminValidation(adminSchema);

module.exports = {
  adminValidation,
};
