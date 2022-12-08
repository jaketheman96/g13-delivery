import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import DeliveryContext from '../context/DeliveryContext';
import getFetch from '../utils/getFetch';

function Pedidos() {
  const { userInfos } = useContext(DeliveryContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      if (userInfos) {
        const response = await getFetch('customer/orders', userInfos.token);
        setOrders(response);
      }
    };
    getSales();
    return () => setOrders([]);
  }, [setOrders, userInfos]);

  const formatDate = (saleDate) => {
    const date = new Date(saleDate);
    const formatedDate = format(date, 'dd/MM/yyyy');
    return formatedDate;
  };

  return (
    <>
      <Navbar />
      <section>
        { orders && orders.map((sale) => (
          <OrderCard
            key={ sale.id }
            id={ sale.id }
            price={ sale.totalPrice }
            status={ sale.status }
            date={ formatDate(sale.saleDate) }
          />
        ))}
      </section>
    </>
  );
}

export default Pedidos;
