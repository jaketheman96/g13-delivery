const { expect } = require("chai");
const sinon = require("sinon");
const jwt = require('jsonwebtoken');
const { User, Sale } = require("../../../database/models");
const {
  UsersImplementation,
} = require("../../../../src/modules/user/implementation");
const { UsersService } = require("../../../../src/modules/user/service");

const usersImplementation = new UsersImplementation();
const usersService = new UsersService(usersImplementation);

const { commonUsers, sellersUsers, ordersByUser, userLogin, user, newUser } = require("./mocks/user.mock");

describe("Verificando camada de service user", function () {
  afterEach(function () {
    sinon.restore();
  });

  describe("Cadastrando um novo usuario na aplicação", function () {
    it("cadastrando um usuário existente", async function () {
      const INVALID_NEW_USER = {
        email: 'customer@email.com',
        password: '12345',
        name: 'Cliente Zé Birita'
      }
      sinon.stub(User, "findOne").resolves(user)
      try {
        await usersService.registerUser(INVALID_NEW_USER, 'customer');
      } catch (error) {
        expect(error.message).to.be.equal("User already exists");
        expect(error.status).to.be.equal(409);
      }
    });
    it("cadastrando um usuário válido", async function () {
      const VALID_NEW_USER = {
        email: 'customer@email.com',
        password: '12345',
        name: 'Cliente Zé Birita'
      }
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(jwt, "sign").resolves('VALID_TOKEN');
      sinon.stub(User, "create").resolves(user);

      const registerUser = await usersService.registerUser(VALID_NEW_USER, 'customer');

      expect(registerUser).to.be.deep.equal(newUser);
    });
  });
  
  describe("Fazendo login na aplicação", function () {
    it("com um usuário invalido", async function () {
      const INVALID_USER = {
        email: 'INVALID_USER_EMAIL',
        password: 'INVALID_PASSWORD'
      }
      sinon.stub(User, "findOne").resolves(null);

      try {
        await usersService.loginUser(INVALID_USER);
      } catch (error) {
        expect(error.message).to.be.equal("User not found");
        expect(error.status).to.be.equal(404);
      }
    });
    it("com um usuário válido", async function () {
      const VALID_USER = {
        email: 'customer@email.com',
        password: '12345'
      }
      sinon.stub(User, "findOne").resolves(user);
      sinon.stub(jwt, "sign").resolves('VALID_TOKEN');

      const login = await usersService.loginUser(VALID_USER);

      expect(login).to.be.deep.equal(userLogin);
    });
  });



  // describe("Buscando todos os usuarios que não são admin", function () {
  //   it("com sucesso", async function () {
  //     sinon.stub(User, "findAll").resolves(commonUsers);

  //     const users = await usersService.getAllCommonUsers();

  //     expect(users).to.equal(commonUsers);
  //   });
  // });

  describe("Buscando todos os pedidos de um usuario pelo seu id", function () {
    it("com sucesso", async function () {
      const VALID_USER_ID = 1;
      sinon.stub(Sale, "findAll").resolves(ordersByUser);

      const orders = await usersService.getOrdersByCustomerId(VALID_USER_ID);

      expect(orders).to.equal(ordersByUser);
    });
  });

  describe("Buscando todos os vendedores", function () {
    it("com sucesso", async function () {
      sinon.stub(User, "findAll").resolves(sellersUsers);

      const users = await usersService.getAllSellerUsers();

      expect(users).to.equal(sellersUsers);
    });
  });

  describe("deletar usuarios", function () {
    it("se o id não existir no banco de dados", async function () {
      const INVALID_USER_ID = 50;

      sinon.stub(User, "findByPk").resolves(null);

      try {
        await usersService.deleteUser(INVALID_USER_ID);
      } catch (error) {
        expect(error.message).to.be.equal("User not found");
        expect(error.status).to.be.equal(404);
      }
    });
  });
});
