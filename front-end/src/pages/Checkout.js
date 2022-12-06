import React from 'react';
import CheckoutTable from '../components/CheckoutTable';
import Navbar from '../components/Navbar';
import SellerForm from '../components/SellerForm';

function CheckoutPage() {
  return (
    <>
      <Navbar />
      <CheckoutTable />
      <SellerForm />
    </>
  );
}

export default CheckoutPage;
