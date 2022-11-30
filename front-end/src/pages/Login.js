import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  // const handleEmail = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePassword = (event) => {
  //   setPassword(event.target.value);
  // };

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
      login: () => {}, // fazer o login
    };
    buttons[option]();
  };

  // // email validator
  // useEffect(() => {
  //   const emailValidator = () => {
  //     const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //     if (email.match(emailRegex)) return setIsButtonDisabled(false);
  //     return setIsButtonDisabled(true);
  //   };
  //   emailValidator();
  // });

  // // password validator
  // useEffect(() => {
  //   const passwordValidation = () => {
  //     const MIN_PASSWORD_LENGTH = 6;
  //     if (password.length >= MIN_PASSWORD_LENGTH) return setIsButtonDisabled(false);
  //     return setIsButtonDisabled(true);
  //   };
  //   passwordValidation();
  // });

  // login button control
  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = email.match(emailRegex);
      console.log(isEmailValid);
      return isEmailValid;
    };
    const passwordValidation = () => {
      const MIN_PASSWORD_LENGTH = 6;
      const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
      console.log(isPasswordValid);
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
        // onChange={ handleEmail }
        name="email"
        onChange={ handleChange }
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        data-testid="common_login__input-password"
        // onChange={ handlePassword }
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
      <div data-testid="common_login__element-invalid-email">alo</div>
    </div>
  );
}

export default LoginPage;
