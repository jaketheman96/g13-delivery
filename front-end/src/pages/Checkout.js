import React from 'react';
import checkoutItens from '../backend_mock/checkout.mock';
import CheckoutTable from '../components/CheckoutTable';
import Navbar from '../components/Navbar';

function CheckoutPage() {
  console.log(checkoutItens.cart);
  return (
    <>
      <Navbar />
      <CheckoutTable checkoutItens={ checkoutItens } />
    </>
  );
}

export default CheckoutPage;
