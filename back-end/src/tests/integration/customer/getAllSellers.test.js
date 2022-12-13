const chai = require("chai");
const sinon = require("sinon");
const { User } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { allSellers } = require("../mocks/users.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de GET /users/sellers", () => {
  after(() => sinon.restore());

  describe("Quando a listagem de todos os vendedores é feita com sucesso", () => {
    it("Retorna status 200 e uma lista de pessoas vendedoras", async () => {
      sinon.stub(User, "findAll").resolves(allSellers);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .get("/users/sellers");

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(allSellers);
    });
  });
});

