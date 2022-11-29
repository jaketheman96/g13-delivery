import React from 'react';

function LoginPage() {
  return (
    <div>
      <input
        type="text"
        placeholder="Login"
        data-testid="common_login__input-email"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        data-testid="common_login__input-password"
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
