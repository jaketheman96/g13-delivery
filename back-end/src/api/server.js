// const port = process.env.PORT || 3001;
// const app = require('./app');

require('dotenv').config();
const { App } = require('./app');

// app.listen(port);
// console.log(`Api rodando na porta ${port}`);

const server = new App();
server.startServer();