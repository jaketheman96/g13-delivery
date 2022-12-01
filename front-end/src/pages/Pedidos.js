import React from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import salesMock from '../backend_mock/sales.mock';

function Pedidos() {
  return (
    <>
      <Navbar />
      <section>
        {salesMock.map((sale) => (
          <OrderCard
            key={ sale.id }
            id={ sale.id }
            price={ sale.total_price }
            status={ sale.status }
            date={ sale.saleDate.toLocaleDateString() }
          />
        ))}
      </section>
    </>
  );
}

export default Pedidos;
