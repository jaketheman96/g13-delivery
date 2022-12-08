const chai = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { User } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { server } = require("../../../api/server");
const { customerUserDB, customerLogin } = require("../mocks/users.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de POST /login", () => {
  afterEach(() => sinon.restore());

  describe("Quando o login não recebe email e senha", () => {
    it("Retorna status 400 com uma mensagem de erro", async () => {
      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/login");

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: "Required" });
    });
  });

  describe("Quando o login recebe um email invalido", () => {
    it("Retorna status 400 e uma mensagem de erro", async () => {
      const INVALID_EMAIL = "algueminvalidoalguem.com";
      const VALID_PASSWORD = "secret_customer";
      sinon.stub(User, "findOne").resolves(null);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/login")
        .send({
          email: INVALID_EMAIL,
          password: VALID_PASSWORD,
        });

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: "You must provide a valid email address",
      });
    });
  });

  describe("Quando o login recebe um usuario invalido", () => {
    it("Retorna status 404 e uma mensagem de erro", async () => {
      const INVALID_USER_EMAIL = "algueminvalido@alguem.com";
      const INVALID_PASSWORD = "INVALID_PASSWORD";
      sinon.stub(User, "findOne").resolves(null);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/login")
        .send({
          email: INVALID_USER_EMAIL,
          password: INVALID_PASSWORD,
        });

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: "User not found" });
    });
  });

  describe("Quando o login é feito com sucesso", () => {
    it("Retorna status 200 e um usuario com seu token", async () => {
      const VALID_TOKEN = "validToken";
      const VALID_USER_EMAIL = "customer@customer.com";
      const VALID_PASSWORD = "secret_customer";
      sinon.stub(User, "findOne").resolves(customerUserDB);
      sinon.stub(jwt, "sign").resolves(VALID_TOKEN);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/login")
        .send({
          email: VALID_USER_EMAIL,
          password: VALID_PASSWORD,
        });

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(customerLogin);
    });
  });
});

