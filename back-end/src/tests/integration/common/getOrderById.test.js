const chai = require("chai");
const sinon = require("sinon");
const { Sale } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { sale } = require("../mocks/sales.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de GET /sales/:id", () => {
  afterEach(() => sinon.restore());

  describe("Quando a busca é feita com sucesso", () => {
    it("Retorna status 200 e uma lista de vendas", async () => {
      sinon.stub(Sale, "findOne").resolves(sale);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .get("/sales/1")

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal(sale);
    });
  });

  describe("Quando busca uma venda inexistente", () => {
    it("Retorna status 404 e uma mensagem de erro", async () => {
      sinon.stub(Sale, "findOne").resolves(null);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .get("/sales/1")

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Sale not found' });
    });
  });
});
