import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes na pagina de produtos', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />)

    history.push('/customer/products')
  })

  afterEach(() => jest.clearAllMocks());

  test('Testa se os botoes e navbar estao presentes na tela', () => {
    const productsButton = screen.getByTestId('customer_products__element-navbar-link-products')
    const ordersButton = screen.getByTestId('customer_products__element-navbar-link-orders')
    const userName = screen.getByTestId('customer_products__element-navbar-user-full-name')
    const logoutButton = screen.getByTestId('customer_products__element-navbar-link-logout')
    const cartButton = screen.getByTestId('customer_products__button-cart')
    const totalValue = screen.getByTestId('customer_products__checkout-bottom-value')

    expect(productsButton).toBeInTheDocument()
    expect(ordersButton).toBeInTheDocument()
    expect(userName).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
    expect(cartButton).toBeInTheDocument()
    expect(totalValue).toBeInTheDocument()
  })
})

