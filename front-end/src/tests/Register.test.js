import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import registerMock from './mocks/registerMock';

const { userRegistered, invalidRegister } = registerMock;

describe('Testes na pagina de Registros', () => {

  beforeEach(() => {
    const { history } = renderWithRouter(<App />)
  
    history.push('/register')
  })

  afterEach(() => jest.clearAllMocks());

  
  test('Testa a presenca dos inputs e button', () => {

    const emailInput = screen.getByTestId('common_register__input-email')
    const passwordInput = screen.getByTestId('common_register__input-password')
    const nameInput = screen.getByTestId('common_register__input-name')
    const buttonRegister = screen.getByTestId('common_register__button-register')
  
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(buttonRegister).toBeInTheDocument()
  })

  test('Testa se o botao habilita quando possui informacoes validas', () => {

    const emailInput = screen.getByTestId('common_register__input-email')
    const passwordInput = screen.getByTestId('common_register__input-password')
    const nameInput = screen.getByTestId('common_register__input-name')
    const buttonRegister = screen.getByTestId('common_register__button-register')

    userEvent.type(emailInput, 'jaketheman96@gmail.com')
    userEvent.type(passwordInput, 'jakejakejakejake')
    userEvent.type(nameInput, 'jaketheman96796123')

    expect(buttonRegister).toBeEnabled()
  })

  test('Testa de o fetch eh chamado apos clicar no botao de registrar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(userRegistered),
    });

    const email = 'jaketheman96@gmail.com';
    const password = 'jakejakejakejake';
    const name = 'jaketheman96796123';

    const emailInput = screen.getByTestId('common_register__input-email')
    const passwordInput = screen.getByTestId('common_register__input-password')
    const nameInput = screen.getByTestId('common_register__input-name')
    const buttonRegister = screen.getByTestId('common_register__button-register')

    userEvent.type(emailInput, email)
    userEvent.type(passwordInput, password)
    userEvent.type(nameInput, name)

    expect(buttonRegister).toBeEnabled()

    userEvent.click(buttonRegister)

    await expect(global.fetch).toHaveBeenCalledTimes(1);
  })

  test('Testa o registro invalido em caso de usuario ja existente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidRegister),
    });

    const email = 'zebirita@email.com';
    const password = '$#zebirita#$';
    const name = 'Cliente Ze Birita';

    const emailInput = screen.getByTestId('common_register__input-email')
    const passwordInput = screen.getByTestId('common_register__input-password')
    const nameInput = screen.getByTestId('common_register__input-name')
    const buttonRegister = screen.getByTestId('common_register__button-register')

    userEvent.type(emailInput, email)
    userEvent.type(passwordInput, password)
    userEvent.type(nameInput, name)

    expect(buttonRegister).toBeEnabled()

    userEvent.click(buttonRegister)

    const registerInvalid = await screen.findByTestId('common_register__element-invalid_register')

    expect(registerInvalid).toBeInTheDocument()
  })
})