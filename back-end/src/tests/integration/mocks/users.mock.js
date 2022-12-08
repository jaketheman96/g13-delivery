const adminUserDB = {
    id: 1,
    username: 'username',
    email: 'admin@admin.com',
    password: 'secret_admin',
    role: 'admin',
};

const customerUserDB = 	{
    id: 1,
    username: 'username',
    email: 'customer@customer.com',
    password: 'secret_customer',
    role: "customer"
};

const userLogin = 	{
    id: 1,
    email: 'customer@customer.com',
    role: "customer",
    token: 'validToken'
};

module.exports ={
    adminUserDB,
    customerUserDB,
    userLogin
}