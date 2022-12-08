const chai = require("chai");
const sinon = require("sinon");
const { Product } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { allProducts } = require("../mocks/products.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de GET /products", () => {
  after(() => sinon.restore());

  describe("Quando a listagem de todos os produtos é feita com sucesso", () => {
    it("Retorna status 200 e uma lista de produtos", async () => {
      sinon.stub(Product, "findAll").resolves(allProducts);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .get("/products");

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(allProducts);
    });
  });
});

