import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import Loading from './Loading';

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
      products: () => history.push('/customer/products'),
      orders: () => history.push('/customer/orders'),
      logout: () => {
        localStorage.removeItem('user');
        setUserInfos(null);
        history.push('/login');
      },
    };
    input[option]();
  };

  return (
    <header
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
        flexWrap: 'wrap',
        alignItems: 'center',
      } }
    >
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
        {userInfos ? userInfos.name : <Loading />}
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
