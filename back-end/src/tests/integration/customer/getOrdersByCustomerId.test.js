const jwt = require("jsonwebtoken");
const chai = require("chai");
const sinon = require("sinon");
const { Sale } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { JWT_VALID_VERIFY_CUSTOMER } = require("../mocks/utils.mock");
const { allSales } = require("../mocks/sales.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de GET /customer/orders/:id", () => {
  afterEach(() => sinon.restore());

  describe("Quando a busca é feita com sucesso", () => {
    it("Retorna status 200 com uma lista de vendas", async () => {
      const VALID_TOKEN = "VALID_TOKEN";
      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_CUSTOMER);
      sinon.stub(Sale, "findAll").resolves(allSales);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .get("/customer/orders/1")
        .set("Authorization", VALID_TOKEN);

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal(allSales);
    });
  });
});
