import React from 'react';
import PropTypes from 'prop-types';

function Navbar({ userName }) {
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
      <h3
        data-testid="customer_products__element_navbar-user-full-name"
      >
        { userName }

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

Navbar.propTypes = {
  userName: PropTypes.string.isRequired,
};
