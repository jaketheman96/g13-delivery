import React, { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

function LoginPage() {
  const { setEmail, setPassword } = useContext(DeliveryContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Login"
        data-testid="common_login__input-email"
        onChange={ handleEmail }
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        data-testid="common_login__input-password"
        onChange={ handlePassword }
      />
      <br />
      <button
        type="button"
        data-testid="common_login__button-login"
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda nao tenho conta
      </button>
      <p data-testid="common_login__element-invalid-email">
        (elemento oculto)Mensagem de erro
      </p>
    </div>
  );
}

export default LoginPage;
