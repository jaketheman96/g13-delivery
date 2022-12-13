const { StatusCodes } = require('http-status-codes');
const { UsersImplementation } = require('./implementation');
const { token } = require('../../../utils/Token');
const { CustomError } = require('../../../utils/customError');
const { hashGenerator } = require('../../../utils/hashGenerator');

class UsersService {
  constructor(userImplementation = new UsersImplementation()) {
      this.userImplementation = userImplementation;
  }

  async loginUser(userInfo) {
      const hashedUser = hashGenerator(userInfo);

      const foundUser = await this.userImplementation.loginUser(hashedUser);

      if (!foundUser) {
          throw new CustomError(404, 'User not found');
      }

      const { name, email, role, id } = foundUser;

      const userToken = await token.generate({ ...hashedUser, id, role });

      return {
          id,
          name,
          email,
          role,
          token: userToken,
      };
  }

  async registerUser(userRegistrationInfo, role) {
      const hashedUser = hashGenerator(userRegistrationInfo);

      await this.userImplementation
        .findUserByEmailAndName(userRegistrationInfo.email, userRegistrationInfo.name)
            .then((user) => {
        if (user) throw new CustomError(StatusCodes.CONFLICT, 'User already exists');
      });

      const createdUser = await this.userImplementation.registerUser({ ...hashedUser, role });

      const newUserToken = await token.generate(hashedUser);

      return {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          token: newUserToken,
      };
  }

  async getAllUsers() {
      const allUsers = await this.userImplementation.getAllUsers();

      return allUsers;
  }

//   async getAllCommonUsers() {
//       const allCommonUsers = await this.userImplementation.getAllCommonUsers();

//       return allCommonUsers;
//   }

  async getAllSellerUsers() {
      const allSellerUsers = await this.userImplementation.getAllSellerUsers();

      return allSellerUsers;
  }

  async getOrdersByCustomerId(customerId) {
      const orders = await this.userImplementation.getOrdersByCustomerId(customerId);

      return orders;
  }

  async getOrdersBySellerId(customerId) {
      const orders = await this.userImplementation.getOrdersBySellerId(customerId);

      return orders;
  }
  
  async deleteUser(userId) {
      const foundUser = await this.userImplementation.findUserById(userId);

      if (!foundUser) {
          throw new CustomError(404, 'User not found');
      }

      await this.userImplementation.deleteUser(userId);
  }
}

module.exports = {
  UsersService,
};