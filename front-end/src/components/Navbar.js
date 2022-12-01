import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

function Navbar() {
  const { userInfos, setUserInfos } = useContext(DeliveryContext);

  const history = useHistory();

  const handleClick = () => {
    localStorage.removeItem('user');
    setUserInfos(null);
    history.push('/login');
  };

  return (
    <header>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
      >
        Produtos

      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
      >
        Meus pedidos

      </button>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        {userInfos && userInfos.name}
      </h3>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleClick }
      >
        Sair

      </button>
    </header>
  );
}

export default Navbar;
