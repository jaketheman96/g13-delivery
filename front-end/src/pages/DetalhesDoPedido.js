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
      console.log(response);
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
      />}
    </section>
  );
}

export default DetalhesDoPedido;
