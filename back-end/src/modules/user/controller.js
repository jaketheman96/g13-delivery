const { StatusCodes } = require('http-status-codes');
const { UsersService } = require('./service');

class UsersController {
  constructor(usersService = new UsersService()) {
      this.usersService = usersService;
  }

  async loginUser(req, res) {
      const userInfo = req.body;

      const userLoginResponse = await this.usersService.loginUser(userInfo);

      return res.status(StatusCodes.OK).json(userLoginResponse);
  }

  async registerCommonUser(req, res) {
      const userRegisterInformations = req.body;

      const commonUserResponse = await this
          .usersService.registerUser(userRegisterInformations, 'customer');

      return res.status(StatusCodes.CREATED).json(commonUserResponse);
  }

  async registerAdminUser(req, res) {
      const { role, ...userRegisterInformations } = req.body;

      const commonUserResponse = await this
          .usersService.registerUser(userRegisterInformations, role);

      return res.status(StatusCodes.CREATED).json(commonUserResponse);
  }

  async getAllUsers(_req, res) {
      const allUsers = await this.usersService.getAllUsers();

      return res.status(StatusCodes.OK).json(allUsers);
  }

  async getAllCommonUsers(_req, res) {
      const allCommonUsers = await this.usersService.getAllCommonUsers();

      return res.status(StatusCodes.OK).json(allCommonUsers);
  }

  async getAllSellerUsers(_req, res) {
      const allSellerUsers = await this.usersService.getAllSellerUsers();

      return res.status(StatusCodes.OK).json(allSellerUsers);
  }

  async getOrdersByCustomerId(req, res) {
        const { id } = req.params;

      const orders = await this.usersService.getOrdersByCustomerId(id);

      return res.status(StatusCodes.OK).json(orders);
  }
  
  async getOrdersBySellerId(req, res) {
        const { id } = req.user;

      const orders = await this.usersService.getOrdersBySellerId(id);

      return res.status(StatusCodes.OK).json(orders);
  }

  async deleteUser(req, res) {
      const { userId } = req.params;

      await this.usersService.deleteUser(userId);
      return res.status(StatusCodes.OK).end();
  }
}

const usersController = new UsersController();

module.exports = {
  usersController,
};