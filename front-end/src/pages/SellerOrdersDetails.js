import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getFetch from '../utils/getFetch';
import OrderDetails from '../components/OrderDetails';
import Navbar from '../components/Navbar';

function SellerOrderDetails() {
  const [sellerOrderDetails, setSellerOrderDetails] = useState();

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const getSalesDetails = async () => {
      const response = await getFetch(`sales/${id}`);
      if (isMounted) setSellerOrderDetails(response);
    };
    getSalesDetails();
    return () => { isMounted = false; };
  }, [id]);

  return (
    <>
      <Navbar />
      <section>
        <h4>Detalhes do Pedido</h4>
        {sellerOrderDetails
        && <OrderDetails
          id={ sellerOrderDetails.id }
          seller={ sellerOrderDetails.seller }
          saleDate={ sellerOrderDetails.saleDate }
          status={ sellerOrderDetails.status }
          products={ sellerOrderDetails.products }
          totalPrice={ sellerOrderDetails.totalPrice }
        />}
      </section>
    </>
  );
}

export default SellerOrderDetails;
