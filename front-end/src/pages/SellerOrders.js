import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import DeliveryContext from '../context/DeliveryContext';
import getFetch from '../utils/getFetch';
import formatDate from '../utils/formatDate';

function SellerPage() {
  const { userInfos } = useContext(DeliveryContext);
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getSellerOrders = async () => {
      if (userInfos) {
        const response = await getFetch(`seller/orders/${userInfos.id}`, userInfos.token);
        if (isMounted) setSellerOrders(response);
      }
    };
    getSellerOrders();
    return () => { isMounted = false; };
  }, [userInfos]);

  return (
    <>
      <Navbar />
      {sellerOrders
      && sellerOrders.map((order) => (
        <OrderCard
          key={ order.id }
          id={ order.id }
          price={ order.totalPrice }
          date={ formatDate(order.saleDate) }
          status={ order.status }
          address={ order.deliveryAddress }
          deliveryNumber={ order.deliveryNumber }
        />
      ))}
    </>
  );
}

export default SellerPage;
