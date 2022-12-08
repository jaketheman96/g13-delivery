const chai = require("chai");
const sinon = require("sinon");
const { User } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { allUsers } = require("../mocks/users.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de GET /users", () => {
  after(() => sinon.restore());

  describe("Quando a listagem de todos os usuarios é feita com sucesso", () => {
    it("Retorna status 200 e uma lista de usuarios", async () => {
      sinon.stub(User, "findAll").resolves(allUsers);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .get("/users");

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(allUsers);
    });
  });
});

