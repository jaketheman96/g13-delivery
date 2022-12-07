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

  useEffect(() => {

  }, []);

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

  const handleNavbar = (userRole) => {
    switch (userRole) {
    case 'customer':
      return 'Meus pedidos';
    case 'administrator':
      return 'Gerenciar usuários';
    default:
      return 'Pedidos';
    }
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
        hidden={ userInfos?.role !== 'customer' }
        name="products"
        onClick={ handleClick }
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        hidden={ userInfos?.role in ['customer', 'seller'] }
        name="orders"
        onClick={ handleClick }
      >
        { handleNavbar(userInfos?.role) }
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
