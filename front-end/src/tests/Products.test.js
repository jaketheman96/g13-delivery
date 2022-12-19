import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import productsMock from './mocks/productsMock';
import user from './mocks/userMocks';
import userEvent from '@testing-library/user-event';

describe('Testes na pagina de produtos', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(user));
  });

  afterEach(() => jest.clearAllMocks());

  test('Testa se os botoes e navbar estao presentes na tela', () => {
    const { history } = renderWithRouter(<App />)

    history.push('/customer/products')

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

  test('Testa se os produtos aparecem na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(productsMock),
    });

    const { history } = renderWithRouter(<App />)

    history.push('/customer/products')

    const firstProduct = await screen.findByTestId('customer_products__element-card-title-1')
    const lastProduct = await screen.findByTestId('customer_products__element-card-title-11')
    const firstProductPrice = await screen.findByTestId('customer_products__element-card-price-1')

    expect(firstProduct).toBeInTheDocument()
    expect(lastProduct).toBeInTheDocument()
    expect(firstProduct).toHaveTextContent(/skol lata 250ml/i)
    expect(firstProductPrice).toHaveTextContent('2,20')
  })

  test('Testa o cart button, add item e remove item', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(productsMock),
    });

    const { history } = renderWithRouter(<App />)
    
    history.push('/customer/products')
    
    const addItem = await screen.findByTestId('customer_products__button-card-add-item-1')
    const removeItem = await screen.findByTestId('customer_products__button-card-rm-item-1')
    const cartButton = screen.getByTestId('customer_products__button-cart')
    const itemQuantity = await screen.findByTestId('customer_products__input-card-quantity-1')
    expect(cartButton).not.toBeEnabled()

    userEvent.click(addItem)
    userEvent.click(removeItem)
    userEvent.type(itemQuantity, 'a')

    expect(itemQuantity.value).toEqual('1')

    userEvent.click(removeItem)
    userEvent.type(itemQuantity, '2')

    expect(itemQuantity.value).toBe('2')

    userEvent.click(removeItem)
    userEvent.click(removeItem)
    userEvent.click(removeItem)

    expect(itemQuantity.value).toEqual('0')

    userEvent.click(addItem)
    userEvent.click(cartButton)
    expect(history.location.pathname).toEqual('/customer/checkout')
  })
})

