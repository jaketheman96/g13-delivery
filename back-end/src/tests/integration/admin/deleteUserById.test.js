const jwt = require("jsonwebtoken");
const chai = require("chai");
const sinon = require("sinon");
const { User } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { JWT_VALID_VERIFY_ADMIN } = require("../mocks/utils.mock");
const { customerUserDB } = require("../mocks/users.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de DELETE /users/:id", () => {
  afterEach(() => sinon.restore());

  describe("Quando a deleção de um usuario é feita com sucesso", () => {
    it("Retorna status 204", async () => {
      const VALID_TOKEN = "VALID_TOKEN";
      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_ADMIN);
      sinon.stub(User, "findOne").resolves(customerUserDB);
      sinon.stub(User, "destroy").resolves(1);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .delete("/users/1")
        .set("Authorization", VALID_TOKEN);

      expect(httpResponse.status).to.equal(204);
    });
  });

  describe("Quando tenta deletar um usuario inexistente", () => {
    it("Retorna status 404 e uma mensagem de erro", async () => {
      const VALID_TOKEN = "VALID_TOKEN";
      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_ADMIN);
      sinon.stub(User, "findOne").resolves(null);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .delete("/users/1")
        .set("Authorization", VALID_TOKEN);

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.be.deep.equal({message: 'User not found'});
    });
  });
});
