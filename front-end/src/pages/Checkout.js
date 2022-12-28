import React, { useContext, useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import Navbar from '../components/Navbar';
import SellerForm from '../components/SellerForm';
import DeliveryContext from '../context/DeliveryContext';
import '../style/Checkout.style.css';

function CheckoutPage() {
  const { cart } = useContext(DeliveryContext);

  const [checkoutCart, setCheckoutCart] = useState();

  const handleTotal = () => {
    let total = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i += 1) {
        total += Number(cart[i].price * cart[i].quantity);
      }
      return JSON.stringify(total);
    }
  };

  useEffect(() => {
    const convertQuantity = () => {
      if (cart) {
        const obj = {
          products: cart.map((products) => ({
            id: products.id,
            name: products.name,
            price: products.price,
            SaleProduct: { quantity: products.quantity },
          })),
        };
        return setCheckoutCart(obj);
      }
    };
    convertQuantity();
  }, [cart, setCheckoutCart]);

  return (
    <>
      <Navbar />
      <section className="checkout-page">
        <h4>Finalizar Pedido</h4>
        {checkoutCart
       && <CheckoutTable infos={ checkoutCart.products } totalPrice={ handleTotal() } />}
        <h4>Detalhes e Endereço para Entrega</h4>
        <SellerForm />
      </section>
    </>
  );
}

export default CheckoutPage;
