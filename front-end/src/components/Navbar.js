import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

function Navbar() {
  const { userInfos, setUserInfos } = useContext(DeliveryContext);

  const history = useHistory();

  useEffect(() => {
    const getItensFromStorage = () => {
      const userData = localStorage.getItem('user');
      if (userData) setUserInfos(JSON.parse(userData));
    };
    getItensFromStorage();
  }, [setUserInfos]);

  const handleClick = ({ target }) => {
    const option = target.name;
    const input = {
      products: () => history.push(`/${userInfos.role}/products`),
      orders: () => history.push(`/${userInfos.role}/orders`),
      logout: () => {
        localStorage.removeItem('user');
        setUserInfos(null);
        history.push('/login');
      },
    };
    input[option]();
  };

  return (
    <header>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
        name="products"
        onClick={ handleClick }
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        name="orders"
        onClick={ handleClick }
      >
        Meus pedidos
      </button>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        {userInfos && userInfos.name}
      </h3>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        name="logout"
        onClick={ handleClick }
      >
        Sair
      </button>
    </header>
  );
}

export default Navbar;
