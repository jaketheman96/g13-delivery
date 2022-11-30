const { CustomError } = require('../../utils/CustomError');

class GlobalError {
  constructor(defaultStatus = 500) {
    this.defaultStatus = defaultStatus;
  }

  handle(error, _req, res, _next) {
    const errStatus = error.status || this.defaultStatus;
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res
      .status(errStatus)
      .json({ message: 'Internal Server Error' });
  }
}

const globalError = new GlobalError();

module.exports = {
  globalError,
};
