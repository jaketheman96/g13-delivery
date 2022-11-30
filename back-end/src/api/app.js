require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { handleErrors } = require('../middlewares/handleErrors');
const { routes } = require('./routes');
require('dotenv').config();
// const PORT = 3001;
const PORT = process.env.PORT || 3001;

class App {
  constructor(app = express()) {
    this.app = app;
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
    this.app.use(handleErrors);
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
