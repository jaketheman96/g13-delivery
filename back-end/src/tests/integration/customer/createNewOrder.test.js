const chai = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { Sale, SaleProduct } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { newSaleBody } = require("../mocks/sales.mock");
const { JWT_VALID_VERIFY_CUSTOMER } = require("../mocks/utils.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de POST /sales", () => {
  afterEach(() => sinon.restore());

  describe("Quando o cadastro é feito com sucesso", () => {
    it("Retorna status 201 e o id da nova venda", async () => {
      const VALID_TOKEN = "validToken";

      sinon.stub(jwt, "verify").resolves(JWT_VALID_VERIFY_CUSTOMER);
      sinon.stub(Sale, "create").resolves({ id: 1 });
      sinon.stub(SaleProduct, "bulkCreate").resolves({ id: 1 });

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .post("/sales")
        .set("Authorization", VALID_TOKEN)
        .send(newSaleBody)

        expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal({ id: 1 });
    });
  });
});
