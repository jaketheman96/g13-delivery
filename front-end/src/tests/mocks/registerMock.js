const userRegistered = {
  id: 4,
  email: 'jaketheman96@gmail.com',
  name: 'jaketheman96796123',
  role: 'customer',
  token: 'token',
};

const invalidRegister = {
  status: 409,
  message: 'User already exists',
};

export default { userRegistered, invalidRegister };
