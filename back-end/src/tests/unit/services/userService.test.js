const { expect } = require("chai");
const sinon = require("sinon");
const { User } = require("../../../database/models");
const { UsersImplementation } = require("../../../../src/modules/user/implementation");
const { UsersService } = require("../../../../src/modules/user/service");

const usersImplementation = new UsersImplementation();
const usersService = new UsersService(usersImplementation);

const { commonUsers } = require("./mocks/user.mock");

describe("Verificando camada de service user", function () {
  afterEach(function () {
    sinon.restore();
  });
  describe("Buscando todos os clientes", function () {
    it("com sucesso", async function () {
      sinon.stub(User, "findAll").resolves(commonUsers);

      const users = await usersService.getAllCommonUsers();

      expect(users).to.equal(commonUsers);
    });

  });

  describe("deletar usuarios", function () {
    it("se o id não existir no banco de dados", async function () {

const USER_INVALID = 50;

sinon.stub(User, "findByPk").resolves(null)

try {
   await usersService.deleteUser(USER_INVALID);
 
} catch (error) {
  expect((error).message).to.be.equal('User not found');
  expect((error).status).to.be.equal(404);
}
    })
  })
});