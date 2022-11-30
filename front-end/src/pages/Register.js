import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';

function RegisterPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    isButtonDisabled,
    setIsButtonDisabled,
  } = useContext(DeliveryContext);

  const handleChange = (event) => {
    const option = event.target.name;
    const inputs = {
      name: () => setName(event.target.value),
      email: () => setEmail(event.target.value),
      password: () => setPassword(event.target.value),
    };
    inputs[option]();
  };

  const handleClick = (event) => {
    const option = event.target.name;
    const buttons = {
      register: () => { }, // fazer o registro
    };
    buttons[option]();
  };

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
    const nameValidation = () => {
      const MIN_NAME_LENGTH = 12;
      const isNameValid = name.length >= MIN_NAME_LENGTH;
      return isNameValid;
    };
    const registerButtonControl = () => {
      const isEmailValid = emailValidator();
      const isPasswordValid = passwordValidation();
      const isNameValid = nameValidation();
      if (isEmailValid && isPasswordValid && isNameValid) {
        return setIsButtonDisabled(false);
      }
      return setIsButtonDisabled(true);
    };
    registerButtonControl();
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        data-testid="common_register__input-name"
        name="name"
        onChange={ handleChange }
      />
      <br />
      <input
        type="text"
        placeholder="Email"
        data-testid="common_register__input-email"
        name="email"
        onChange={ handleChange }
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        data-testid="common_register__input-password"
        name="password"
        onChange={ handleChange }
      />
      <br />
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ isButtonDisabled }
        name="register"
        onClick={ handleClick }
      >
        Registrar
      </button>
    </div>
  );
}

export default RegisterPage;
