const { CustomError } = require('../../../utils/CustomError');

const { loginSchema } = require('./loginSchema');

class LoginValidation {
  constructor(schema = loginSchema) {
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

const loginValidation = new LoginValidation(loginSchema);

module.exports = {
  loginValidation,
};
