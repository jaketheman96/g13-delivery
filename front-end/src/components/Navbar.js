import React, { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

function Navbar() {
  const { userInfos } = useContext(DeliveryContext);

  return (
    <header>
      <button
        data-testid="customer_products__element_navbar-user-full-name"
        type="button"
      >
        Produtos

      </button>
      <button
        data-testid="customer_products__element_navbar-link-orders"
        type="button"
      >
        Meus pedidos

      </button>
      <h3 data-testid="customer_products__element_navbar-user-full-name">
        {userInfos && userInfos.name}
      </h3>
      <button
        data-testid="customer_products__element_navbar-link-logout"
        type="button"
      >
        Sair

      </button>
    </header>
  );
}

export default Navbar;
