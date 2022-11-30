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
          .usersService.registerCommonUser(userRegisterInformations);

      return res.status(StatusCodes.CREATED).json(commonUserResponse);
  }

  async registerAdminUser(req, res) {
      const userRegisterInformations = req.body;

      const commonUserResponse = await this
          .usersService.registerAdminUser(userRegisterInformations);

      return res.status(StatusCodes.CREATED).json(commonUserResponse);
  }

  async getAllCommonUsers(_req, res) {
      const allCommonUsers = await this.usersService.getAllCommonUsers();

      return res.status(StatusCodes.OK).json(allCommonUsers);
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