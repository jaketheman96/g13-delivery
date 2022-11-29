import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';

function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isButtonDisabled,
    setIsButtonDisabled,
  } = useContext(DeliveryContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // email validator
  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(emailRegex)) return setIsButtonDisabled(false);
      return setIsButtonDisabled(true);
    };
    emailValidator();
  });

  // password validator
  useEffect(() => {
    const passwordValidation = () => {
      const six = 6;
      if (password.length > six) return setIsButtonDisabled(false);
      return setIsButtonDisabled(true);
    };
    passwordValidation();
  });

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
        disabled={ isButtonDisabled }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda nao tenho conta
      </button>
      <div data-testid="common_login__element-invalid-email">
        alo
      </div>
    </div>
  );
}

export default LoginPage;
