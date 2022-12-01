import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import loginFetch from '../utils/userFetch';

function LoginPage() {
  const {
    isButtonDisabled,
    setIsButtonDisabled,
  } = useContext(DeliveryContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const [showLoginError, setShowLoginError] = useState(false);

  const handleChange = (event) => {
    const option = event.target.name;
    const inputs = {
      email: () => setEmail(event.target.value),
      password: () => setPassword(event.target.value),
    };
    inputs[option]();
  };

  const handleClick = (event) => {
    const option = event.target.name;
    const buttons = {
      register: () => history.push('/register'),
      login: async () => {
        const response = await loginFetch({ email, password }, 'login');
        if (response.message) return setShowLoginError(true);
        localStorage.setItem('user', JSON.stringify(response));
        history.push('/customer/products');
      },
    };
    buttons[option]();
  };

  // login button control
  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = email.match(emailRegex);
      return isEmailValid;
    };
    const passwordValidation = () => {
      const MIN_PASSWORD_LENGTH = 6;
      const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
      return isPasswordValid;
    };
    const loginButtonControl = () => {
      const isEmailValid = emailValidator();
      const isPasswordValid = passwordValidation();
      if (isEmailValid && isPasswordValid) return setIsButtonDisabled(false);
      return setIsButtonDisabled(true);
    };
    loginButtonControl();
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Login"
        data-testid="common_login__input-email"
        name="email"
        onChange={ handleChange }
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        data-testid="common_login__input-password"
        name="password"
        onChange={ handleChange }
      />
      <br />
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ isButtonDisabled }
        name="login"
        onClick={ handleClick }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        name="register"
        onClick={ handleClick }
      >
        Ainda nao tenho conta
      </button>
      <div data-testid="common_login__element-invalid-email">
        {showLoginError && <p> Senha ou email invalidos </p>}
      </div>
    </div>
  );
}

export default LoginPage;
