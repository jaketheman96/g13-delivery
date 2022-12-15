import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import userMock from './mocks/userMocks';
import postFetch from '../utils/postFetch';
import { act } from 'react-dom/test-utils';

afterEach(() => jest.clearAllMocks())

describe('Testes na tela de login', () => {
  test('Verifica se possui os campos para o login', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/login/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveProperty('type', 'text');

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveProperty('type', 'password');
  });

  test('Verifica se possui os botoes na pagina de login', () => {
    renderWithRouter(<App />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /ainda nao tenho conta/i });

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('Testa o caso de erro de login', async () => {
    renderWithRouter(<App />);

    const EMAIL_USER = 'user@user.com'
    const PASSWORD_USER = 'user@123121233'

    const inputEmail = screen.getByPlaceholderText(/login/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(inputEmail, EMAIL_USER);
    userEvent.type(inputPassword, PASSWORD_USER);

    expect(inputEmail).toBeInTheDocument(EMAIL_USER);
    expect(inputPassword).toBeInTheDocument(PASSWORD_USER);

    userEvent.click(loginButton)

    const invalidLogin = await screen.findByText(/senha ou email invalidos/i)

    expect(invalidLogin).toBeInTheDocument()
  });

  test('Testa o caso de sucesso no login', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(userMock);

    const { history } = renderWithRouter(<App />)

    const EMAIL_USER = 'zebirita@email.com';
    const PASSWORD_USER = '$#zebirita#$';

    const inputEmail = screen.getByPlaceholderText(/login/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(inputEmail, EMAIL_USER);
    userEvent.type(inputPassword, PASSWORD_USER);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/customer/products');
    });

  });

  test('Testa o redirecionamento para a tela de registro', () => {
    renderWithRouter(<App />);

    const registerButton = screen.getByRole('button', { name: /ainda nao tenho conta/i });

    expect(registerButton).toBeInTheDocument();

    userEvent.click(registerButton)

    const userNameInput = screen.getByPlaceholderText(/nome/i)

    expect(userNameInput).toBeInTheDocument()
  });
});