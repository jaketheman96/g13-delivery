const { expect } = require("chai");
const sinon = require("sinon");
const { User } = require("../../../database/models");
const { UsersImplementation } = require("../../../../src/modules/user/implementation");
const { UsersService } = require("../../../../src/modules/user/service");

const usersImplementation = new UsersImplementation();
const usersService = new UsersService(usersImplementation);

const { commonUsers } = require("./mocks/user.mock");

describe("Verificando camada de service user", function () {
  describe("Buscando todos os clientes", function () {
    it("com sucesso", async function () {
      sinon.stub(User, "findAll").resolves(commonUsers);

      const users = await usersService.getAllCommonUsers();

      expect(users).to.equal(commonUsers);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

});