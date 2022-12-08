const adminUserDB = {
  id: 1,
  username: "username",
  email: "admin@admin.com",
  password: "secret_admin",
  role: "admin",
};

const customerUserDB = {
  id: 1,
  username: "username",
  email: "customer@customer.com",
  password: "secret_customer",
  role: "customer",
};

const customerLogin = {
  id: 1,
  email: "customer@customer.com",
  role: "customer",
  token: "validToken",
};

const adminLogin = {
    id: 1,
    email: "admin@admin.com",
    role: "admin",
    token: "validToken",
};

const sellerLogin = {
    id: 1,
    email: "seller@seller.com",
    role: "seller",
    token: "validToken",
};

module.exports = {
  adminUserDB,
  customerUserDB,
  customerLogin,
  adminLogin,
  sellerLogin,
};
