const { CustomError } = require('../../../utils/CustomError');

const { commonRegSchema } = require('./commonRegSchema');

class CommonRegisterValidation {
  constructor(schema = commonRegSchema) {
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

const commonRegValidation = new CommonRegisterValidation(commonRegSchema);

module.exports = {
  commonRegValidation,
};
