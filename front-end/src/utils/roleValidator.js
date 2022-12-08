const roleValidator = (user) => {
  switch (user.role) {
  case 'administrator':
    return '/admin/manage';
  case 'seller':
    return '/seller/orders';
  default:
    return '/customer/products';
  }
};

export default roleValidator;
