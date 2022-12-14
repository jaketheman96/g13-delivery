const jwt = require("jsonwebtoken");
const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { JWT_INVALID_VERIFY } = require("../mocks/utils.mock");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

chai.use(chaiHttp);

const { expect } = chai;

describe("Testando o token de validação de usuario", () => {
  afterEach(() => sinon.restore());

  describe("Quando o token não é enviado na requisição", () => {
    it("Retorna status 404 e uma mensagem de erro", async () => {
      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.be.deep.equal({message: 'Token not found'});
    });
  });

  describe("Quando é enviado um token invalido na requisição", () => {
    it("Retorna status 500 e uma mensagem de erro", async () => {
      const INVALID_TOKEN = "INVALID_TOKEN";

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")
        .set("Authorization", INVALID_TOKEN);

      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.be.deep.equal({message: 'jwt malformed'});
    });
  });
  describe("Quando é enviado um token com um data invalido na requisição", () => {
    it("Retorna status 400 e uma mensagem de erro", async () => {
      const INVALID_TOKEN = "INVALID_TOKEN";

      sinon.stub(jwt, "verify").resolves(JWT_INVALID_VERIFY);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/users/register/admin")
        .set("Authorization", INVALID_TOKEN);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({message: 'Invalid or expired token'});
    });
  });
});
