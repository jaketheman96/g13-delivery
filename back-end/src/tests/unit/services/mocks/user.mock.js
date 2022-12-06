const commonUsers = [
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
  {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer",
  },
];

const sellersUsers = [
  {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer",
  },
];

const ordersByUser = [
  {
    id: 1,
    totalPrice: "34.95",
    status: "Pendente",
    saleDate: "2022-12-10T19:11:19.000Z",
  },
  {
    id: 2,
    totalPrice: "50.00",
    status: "Concluído",
    saleDate: "2022-12-06T18:11:27.000Z",
  },
];

const user = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "customer@email.com",
  role: "customer",
  senha: '12345'
};

const userLogin = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "customer@email.com",
  role: "customer",
  token: 'VALID_TOKEN'
};
const newUser = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "customer@email.com",
  role: "customer",
  token: 'VALID_TOKEN'
};

module.exports = {
  commonUsers,
  sellersUsers,
  ordersByUser,
  user,
  userLogin,
  newUser,
};
