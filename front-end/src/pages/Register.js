import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import postFetch from '../utils/postFetch';
import '../style/Register.style.css';
import logo from '../images/g13delivery.gif';

function RegisterPage() {
  const {
    setUserInfos,
    isButtonDisabled,
    setIsButtonDisabled,
  } = useContext(DeliveryContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showRegisterError, setShowRegisterError] = useState(false);

  const history = useHistory();

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
      register: async () => {
        const response = await postFetch({ name, email, password }, 'users/register');
        if (response.message) return setShowRegisterError(true);
        localStorage.setItem('user', JSON.stringify(response));
        setUserInfos(response);
        history.push('/customer/products');
      },
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
    <div
      className="register_page"
    >
      <div className="logo_image">
        <img src={ logo } alt="G13 logo gif" width="400px" height="350px" />
      </div>
      <form>
        <p>Nome </p>
        <input
          type="text"
          placeholder="Nome"
          data-testid="common_register__input-name"
          name="name"
          onChange={ handleChange }
        />
        <p>Email</p>
        <input
          type="text"
          placeholder="Email"
          data-testid="common_register__input-email"
          name="email"
          onChange={ handleChange }
        />
        <p>Senha</p>
        <input
          type="password"
          placeholder="Password"
          data-testid="common_register__input-password"
          name="password"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ isButtonDisabled }
          name="register"
          onClick={ handleClick }
          className="register_page__button"
        >
          Registrar
        </button>
      </form>
      <div
        data-testid="common_register__element-invalid_register"
        className="invalid_register"
      >
        {showRegisterError && <p> Registro invalido </p>}
      </div>
    </div>
  );
}

export default RegisterPage;
