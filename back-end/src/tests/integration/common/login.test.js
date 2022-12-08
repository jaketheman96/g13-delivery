const chai = require("chai");
const sinon = require("sinon");
const jwt = require('jsonwebtoken');
// const { User, Sale } = require("../../../database/models");
const chaiHttp = require('chai-http');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const { server } = require('../../../api/server');
// const app = new App();

// import { Model } from 'sequelize';
// import user from './mocks/login.mock';
// import * as jwt from 'jsonwebtoken';
// import { JWT_VALID_VERIFY, VALID_TOKEN } from './mocks/utils.mock';


chai.use(chaiHttp);

const { expect } = chai;

const VALID_EMAIL = 'valid@email.com';
const INVALID_EMAIL = '12345';
const VALID_PASSWORD = 'VALID_PASSWORD'
const INVALID_PASSWORD = 'INVALID_PASSWORD'


describe.only('Teste da rota de POST /login', () => {
  describe('Quando o login não recebe email e senha', () => {
    it('Retorna uma mensagem de erro com status 400', async () => {
      const httpResponse = await chai.request(`http://localhost:${PORT}`).post('/login')
      // console.log(app.address);
      // console.log(httpResponse);
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: "Required" });
    });

  })

  // describe('Quando o login recebe um email invalido', () => {  

  //   beforeEach(() => sinon.stub(Model, 'findOne').resolves(null))
  //   afterEach(() => sinon.restore())

  //   it('Retorna status 401', async () => {
  //     const httpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({email: INVALID_EMAIL, password: VALID_PASSWORD})

  //     expect(httpResponse.status).to.equal(401);
  //   });

  //   it('Retorna uma mensagem de erro', async () => {
  //     const httpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({email: INVALID_EMAIL, password: VALID_PASSWORD})

  //     expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"});
  //   });
  // })

  // describe('Quando o login recebe uma senha invalida', () => {
  
  //   beforeEach(() => {
  //     sinon.stub(Model, 'findOne').resolves(user)
  //     sinon.stub(bcrypt, 'compareSync').resolves(false);
  //   })
  //   afterEach(() => sinon.restore())

  //   it('Retorna uma mensagem de erro', async () => {
  //     const httpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({email: VALID_EMAIL, password: INVALID_PASSWORD})

  //     expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"});
  //   });
  // })

  // describe('Quando o login é feito com sucesso', () => {

  //   beforeEach(() => {
  //     sinon.stub(Model, 'findOne').resolves(user)
  //     sinon.stub(bcrypt, 'compareSync').resolves(true);
  //     sinon.stub(jwt, 'sign').resolves(VALID_TOKEN);
  //   })
  //   afterEach(() => sinon.restore())

  //   it('Retorna status 200', async () => {
  //     const httpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: VALID_EMAIL,
  //     password: "VALID_PASSWORD"})

  //     expect(httpResponse.status).to.equal(200);
  //   });

  //   it('Retorna um token', async () => {
  //     const httpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({email: VALID_EMAIL, password: VALID_PASSWORD})

  //     expect(httpResponse.body).to.deep.equal({token: VALID_TOKEN});
  //   });
  // })
});

// describe('Teste da rota de GET /login/validate', () => {

//   describe('Quando tem sucesso', () => {
//     beforeEach(() => {
//       sinon.stub(jwt, 'verify').resolves(JWT_VALID_VERIFY);
//     });  
//     afterEach(() => sinon.restore());

//     it('Retorna status 200', async () => {
//       const httpResponse = await chai.request(app)
//       .get('/login/validate')
//       .set('Authorization', VALID_TOKEN)

//       expect(httpResponse.status).to.equal(200);
//     });

//     it('Retorna uma mensagem com a role do usuario logado', async () => {
//       const httpResponse = await chai.request(app)
//       .get('/login/validate')
//       .set('Authorization', VALID_TOKEN)

//       expect(httpResponse.body).to.deep.equal({ role: "admin" });
//     });
//   })
// })

// describe('Teste do erro 500 na aplicação', () => {

//   beforeEach(() => {
//     sinon.stub(Model, 'findOne').rejects(user as User)
//   })
//   afterEach(() => sinon.restore())

//   it('Retorna status 500', async () => {
//     const httpResponse = await chai
//     .request(app)
//     .post('/login')
//     .send({email: VALID_EMAIL, password: INVALID_PASSWORD})

//     expect(httpResponse.status).to.equal(500);
//   });

//   it('Retorna uma mensagem de erro', async () => {
//     const httpResponse = await chai
//     .request(app)
//     .post('/login')
//     .send({email: VALID_EMAIL, password: INVALID_PASSWORD})

//     expect(httpResponse.body).to.deep.equal({message: "Internal server error"});
//   });
// })