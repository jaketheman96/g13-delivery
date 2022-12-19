import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import '../style/Navbar.style.css';

function Navbar() {
  const {
    userInfos,
    setUserInfos,
    btnActive,
    setBtnActive,
  } = useContext(DeliveryContext);

  const history = useHistory();

  const handleClick = ({ target }) => {
    const option = target.name;
    const input = {
      products: () => {
        setBtnActive('Products');
        history.push('/customer/products');
      },
      orders: () => {
        setBtnActive('Orders');
        history.push(`/${userInfos.role}/orders`);
      },
      logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
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
      className="navbar_header"
    >
      <div className="navbar__product_button">
        <button
          className={ btnActive === 'Products' ? 'btn active' : 'btn' }
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          hidden={ userInfos?.role !== 'customer' }
          name="products"
          onClick={ handleClick }
        >
          Produtos
        </button>
      </div>
      <div className="navbar__orders_button">
        <button
          className={ btnActive === 'Orders' ? 'btn active' : 'btn' }
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          hidden={ userInfos?.role in ['customer', 'seller'] }
          name="orders"
          onClick={ handleClick }
        >
          {handleNavbar(userInfos?.role)}
        </button>
      </div>
      <div className="navbar__user_name">
        <p data-testid="customer_products__element-navbar-user-full-name">
          {userInfos && userInfos.name}
        </p>
      </div>
      <div className="navbar__logout_button">
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          name="logout"
          onClick={ handleClick }
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Navbar;
