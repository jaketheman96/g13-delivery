import React, { useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import Navbar from '../components/Navbar';
import getItensFromStorage from '../utils/getItensFromStorage';

function CheckoutPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getItensFromStorage('cart'));
  }, []);

  return (
    <>
      <Navbar />
      <CheckoutTable checkoutItens={ cart } />
    </>
  );
}

export default CheckoutPage;
