import React from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import salesMock from '../backend_mock/sales.mock';

function Pedidos() {
  const formatDate = (date) => {
    const dataFormatada = `
      ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
    `;
    return dataFormatada;
  };

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
            date={ formatDate(sale.saleDate) }
          />
        ))}
      </section>
    </>
  );
}

export default Pedidos;
