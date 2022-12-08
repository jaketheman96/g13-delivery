import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderDetails from '../components/OrderDetails';
import getFetch from '../utils/getFetch';

function DetalhesDoPedido() {
  const [orderDetailById, setOrderDetailById] = useState();

  const { params: { id } } = useRouteMatch();

  useEffect(() => {
    const getOrderDetail = async () => {
      const response = await getFetch(`sales/${id}`);
      setOrderDetailById(response);
    };
    getOrderDetail();
  }, [id]);

  return (
    <section>
      <Navbar />
      {orderDetailById && <OrderDetails
        id={ orderDetailById.id }
        seller={ orderDetailById.seller }
        saleDate={ orderDetailById.saleDate }
        status={ orderDetailById.status }
        products={ orderDetailById.products }
        totalPrice={ orderDetailById.totalPrice }
      />}
    </section>
  );
}

export default DetalhesDoPedido;
