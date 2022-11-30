require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { globalError } = require('../middlewares/globalError');
const { routes } = require('./routes');

const PORT = 3001;

class App {
  constructor(app = express()) {
    this.app = app;
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
    this.app.use(globalError.handle);
    this.app.use(express.static('public'));
  }

  startServer() {
    this.app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  }
}

// app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = {
  App,
};
