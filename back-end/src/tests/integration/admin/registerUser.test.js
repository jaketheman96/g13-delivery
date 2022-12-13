const chai = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { User } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { customerUserDB, customerLogin } = require("../mocks/users.mock");
const { JWT_VALID_VERIFY_ADMIN } = require("../mocks/utils.mock");

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN = "validToken";

describe("Teste da rota de POST /users/register/admin", () => {
  afterEach(() => sinon.restore());

  describe("Quando não recebe algum atributo", () => {
    it("Retorna status 400 com uma mensagem de erro", async () => {
      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_ADMIN);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")
        .set("Authorization", VALID_TOKEN);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: "Required" });
    });
  });

  describe("Quando o registro recebe um email invalido", () => {
    it("Retorna status 400 e uma mensagem de erro", async () => {
      const INVALID_EMAIL = "algueminvalidoalguem.com";
      const VALID_PASSWORD = "secret_customer";
      const VALID_NAME = "Alguem do Brasil";

      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_ADMIN);
      sinon.stub(User, "findOne").resolves(null);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")
        .set("Authorization", VALID_TOKEN)
        .send({
          email: INVALID_EMAIL,
          password: VALID_PASSWORD,
          name: VALID_NAME,
          role: 'adminstrator'
        });

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: "You must provide a valid email address",
      });
    });
  });

  describe("Quando é cadastrado um usuario que ja existe", () => {
    it("Retorna status 409 e uma mensagem de conflito", async () => {
      const VALID_USER_EMAIL = "customer@customer.com";
      const VALID_PASSWORD = "secret_customer";
      const VALID_NAME = "Canarinho do hexa";
      const VALID_ROLE = 'customer';

      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_ADMIN);
      sinon.stub(User, "findOne").resolves(customerUserDB);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")
        .set("Authorization", VALID_TOKEN)
        .send({
          email: VALID_USER_EMAIL,
          password: VALID_PASSWORD,
          name: VALID_NAME,
          role: VALID_ROLE
        });

      expect(httpResponse.status).to.equal(409);
      expect(httpResponse.body).to.deep.equal({ message: "User already exists" });
    });
  });

  describe("Quando o cadastro é feito com sucesso", () => {
    it("Retorna status 201 e um usuario com seu token", async () => {
      const VALID_TOKEN = "validToken";
      const VALID_USER_EMAIL = "customer@customer.com";
      const VALID_PASSWORD = "secret_customer";
      const VALID_NAME = "Canarinho do hexa";
      const VALID_ROLE = 'customer';

      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_ADMIN);
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(User, "create").resolves(customerUserDB);
      sinon.stub(jwt, "sign").resolves(VALID_TOKEN);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")
        .set("Authorization", VALID_TOKEN)
        .send({
          email: VALID_USER_EMAIL,
          password: VALID_PASSWORD,
          name: VALID_NAME,
          role: VALID_ROLE
        });

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal(customerLogin);
    });
  });
});

