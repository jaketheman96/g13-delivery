const chai = require("chai");
const sinon = require("sinon");
const { Sale } = require("../../../database/models");
const chaiHttp = require("chai-http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { sale } = require("../mocks/sales.mock");

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de PUT /sales/:id", () => {
  afterEach(() => sinon.restore());

  describe("Quando o update é feito com sucesso", () => {
    it("Retorna status 200 e uma mensagem de sucesso", async () => {
      sinon.stub(Sale, "findOne").resolves(sale);
      sinon.stub(Sale, "update").resolves(1);

      const httpResponse = await chai
        .request(`http://localhost:${PORT}`)
        .put("/sales/1")
        .send({ status: 'Concluído' })

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal('Successfully updated');
    });
  });

});
