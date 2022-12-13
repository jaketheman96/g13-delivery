const JWT_VALID_VERIFY_ADMIN = { data: { role: 'administrator', id: 1 } };
const JWT_VALID_VERIFY_SELLER = { data: { role: 'seller', id: 1 } };
const JWT_VALID_VERIFY_CUSTOMER = { data: { role: 'customer', id: 1 } };
const JWT_INVALID_VERIFY = { data: null };

module.exports = { 
    JWT_VALID_VERIFY_ADMIN,
    JWT_VALID_VERIFY_SELLER,
    JWT_VALID_VERIFY_CUSTOMER,
    JWT_INVALID_VERIFY
}