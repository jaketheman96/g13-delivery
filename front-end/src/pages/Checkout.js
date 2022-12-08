import React from 'react';
import CheckoutTable from '../components/CheckoutTable';
import Navbar from '../components/Navbar';
import SellerForm from '../components/SellerForm';
import getItensFromStorage from '../utils/getItensFromStorage';

function CheckoutPage() {
  const getStorage = getItensFromStorage('cart');
  const handleTotal = () => {
    let total = 0;
    if (getStorage) {
      for (let i = 0; i < getStorage.length; i += 1) {
        total += Number(getStorage[i].price * getStorage[i].quantity);
      }
      return JSON.stringify(total);
    }
  };
  const convertQuantity = () => {
    if (getStorage) {
      const obj = {
        products: getStorage.map((products) => ({
          id: products.id,
          name: products.name,
          price: products.price,
          SaleProduct: { quantity: products.quantity },
        })),
      };
      return obj;
    }
  };

  return (
    <>
      <Navbar />
      <CheckoutTable infos={ convertQuantity().products } totalPrice={ handleTotal() } />
      <SellerForm />
    </>
  );
}

export default CheckoutPage;
