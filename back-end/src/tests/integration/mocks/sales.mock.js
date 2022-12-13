const allSales = [
  {
    id: 1,
    totalPrice: "47.50",
    deliveryAddress: "Rua dos bobos numero 0",
    deliveryNumber: "1",
    saleDate: "2022-12-13T17:10:21.000Z",
    status: "Pendente",
    buyer: {
      id: 3,
      name: "Cliente Zé Birita",
      email: "zebirita@email.com",
      role: "customer",
    },
    seller: {
      id: 2,
      name: "Fulana Pereira",
      email: "fulana@deliveryapp.com",
      role: "seller",
    },
    products: [
      {
        id: 2,
        name: "Heineken 600ml",
        price: "7.50",
        urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
        SaleProduct: {
          quantity: 3,
        },
      },
      {
        id: 3,
        name: "Antarctica Pilsen 300ml",
        price: "2.49",
        urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
        SaleProduct: {
          quantity: 5,
        },
      },
    ],
  },
];

const sale = {
  id: 1,
  totalPrice: "47.50",
  deliveryAddress: "Rua dos bobos numero 0",
  deliveryNumber: "1",
  saleDate: "2022-12-13T17:10:21.000Z",
  status: "Pendente",
  buyer: {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer",
  },
  seller: {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
  products: [
    {
      id: 2,
      name: "Heineken 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
      SaleProduct: {
        quantity: 3,
      },
    },
    {
      id: 3,
      name: "Antarctica Pilsen 300ml",
      price: "2.49",
      urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
      SaleProduct: {
        quantity: 5,
      },
    },
  ],
};

const newSaleBody = {
  userId: 3,
  sellerId: 2,
  products: [
    {
      id: 2,
      quantity: 3,
    },
    {
      id: 3,
      quantity: 5,
    },
  ],
  totalPrice: 47.5,
  deliveryAddress: "Rua dos bobos numero 0",
  deliveryNumber: 1,
};

module.exports = {
  allSales,
  newSaleBody,
  sale,
};
